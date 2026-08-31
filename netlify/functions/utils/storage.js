import fs from 'node:fs';
import path from 'node:path';
import { getStore } from '@netlify/blobs';

const LOCAL_STORAGE_DIR = path.join(process.cwd(), '.persistent-storage');
const SESSIONS_DIR = path.join(LOCAL_STORAGE_DIR, 'sessions');
const RECORDINGS_DIR = path.join(LOCAL_STORAGE_DIR, 'recordings');
const LOCKS_DIR = path.join(LOCAL_STORAGE_DIR, 'locks');

function ensureLocalDirs() {
  [SESSIONS_DIR, RECORDINGS_DIR, LOCKS_DIR].forEach(dir => {
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  });
}
ensureLocalDirs();

function isNetlifyProduction() {
  return Boolean(process.env.NETLIFY || process.env.NETLIFY_BLOBS_CONTEXT || process.env.SITE_ID);
}

function getSessionStore() {
  if (isNetlifyProduction()) {
    try {
      return getStore({ name: 'apology-sessions', consistency: 'strong' });
    } catch (e) {
      console.warn('[Storage] Netlify Blobs getStore fallback to disk:', e.message);
    }
  }
  return null;
}

function getAudioStore() {
  if (isNetlifyProduction()) {
    try {
      return getStore({ name: 'apology-recordings', consistency: 'strong' });
    } catch (e) {
      console.warn('[Storage] Netlify Blobs getStore fallback to disk:', e.message);
    }
  }
  return null;
}

export async function saveSession(sessionId, data) {
  if (!sessionId) return false;
  const store = getSessionStore();
  const serialized = JSON.stringify({
    ...data,
    uniqueSections: Array.from(data.uniqueSections || []),
    updatedAt: new Date().toISOString()
  });

  if (store) {
    try {
      await store.set(sessionId, serialized);
      return true;
    } catch (e) {
      console.warn('[Storage] Netlify Blobs saveSession error:', e.message);
    }
  }

  ensureLocalDirs();
  const filePath = path.join(SESSIONS_DIR, `${sessionId.replace(/[^a-zA-Z0-9_-]/g, '')}.json`);
  fs.writeFileSync(filePath, serialized, 'utf8');
  return true;
}

export async function getSession(sessionId) {
  if (!sessionId) return null;
  const store = getSessionStore();

  if (store) {
    try {
      const raw = await store.get(sessionId, { type: 'json' });
      if (raw) {
        return {
          ...raw,
          startTime: new Date(raw.startTime),
          lastActive: new Date(raw.lastActive),
          uniqueSections: new Set(raw.uniqueSections || [])
        };
      }
    } catch (e) {
      console.warn('[Storage] Netlify Blobs getSession error:', e.message);
    }
  }

  ensureLocalDirs();
  const filePath = path.join(SESSIONS_DIR, `${sessionId.replace(/[^a-zA-Z0-9_-]/g, '')}.json`);
  if (fs.existsSync(filePath)) {
    try {
      const raw = JSON.parse(fs.readFileSync(filePath, 'utf8'));
      return {
        ...raw,
        startTime: new Date(raw.startTime),
        lastActive: new Date(raw.lastActive),
        uniqueSections: new Set(raw.uniqueSections || [])
      };
    } catch (e) {
      console.error('[Storage] Error reading session JSON from disk:', e.message);
    }
  }
  return null;
}

export async function saveAudioBlob(sessionId, base64AudioData, mimeType = 'audio/webm') {
  if (!sessionId || !base64AudioData) return null;
  const cleanBase64 = base64AudioData.replace(/^data:audio\/[a-zA-Z0-9]+;base64,/, '');
  const buffer = Buffer.from(cleanBase64, 'base64');
  const store = getAudioStore();

  if (store) {
    try {
      await store.set(sessionId, buffer, {
        metadata: { mimeType, size: buffer.length, createdAt: new Date().toISOString() }
      });
    } catch (e) {
      console.warn('[Storage] Netlify Blobs saveAudioBlob error:', e.message);
    }
  }

  ensureLocalDirs();
  const audioFileName = `recording-${sessionId.replace(/[^a-zA-Z0-9_-]/g, '')}.webm`;
  const filePath = path.join(RECORDINGS_DIR, audioFileName);
  fs.writeFileSync(filePath, buffer);
  return { fileName: audioFileName, size: buffer.length };
}

export async function getAudioBlob(sessionId) {
  if (!sessionId) return null;
  const store = getAudioStore();

  if (store) {
    try {
      const blobBuffer = await store.get(sessionId, { type: 'arrayBuffer' });
      if (blobBuffer) return Buffer.from(blobBuffer);
    } catch (e) {
      console.warn('[Storage] Netlify Blobs getAudioBlob error:', e.message);
    }
  }

  ensureLocalDirs();
  const audioFileName = `recording-${sessionId.replace(/[^a-zA-Z0-9_-]/g, '')}.webm`;
  const filePath = path.join(RECORDINGS_DIR, audioFileName);
  if (fs.existsSync(filePath)) {
    return fs.readFileSync(filePath);
  }
  return null;
}

export async function acquireFinalizeLock(sessionId) {
  if (!sessionId) return false;
  ensureLocalDirs();
  const cleanId = sessionId.replace(/[^a-zA-Z0-9_-]/g, '');
  const lockFilePath = path.join(LOCKS_DIR, `${cleanId}.lock`);

  const store = getSessionStore();
  if (store) {
    try {
      const lockKey = `lock:${sessionId}`;
      const existing = await store.get(lockKey);
      if (existing) return false;
      await store.set(lockKey, JSON.stringify({ lockedAt: new Date().toISOString() }));
    } catch (e) {
      console.warn('[Storage] Blobs lock error, using file lock:', e.message);
    }
  }

  try {
    fs.writeFileSync(lockFilePath, JSON.stringify({ lockedAt: new Date().toISOString() }), { flag: 'wx' });
    return true;
  } catch (err) {
    if (err.code === 'EEXIST') {
      return false;
    }
    return false;
  }
}

export async function listAllSessions() {
  ensureLocalDirs();
  const sessions = [];
  const files = fs.readdirSync(SESSIONS_DIR);
  for (const file of files) {
    if (file.endsWith('.json')) {
      try {
        const raw = JSON.parse(fs.readFileSync(path.join(SESSIONS_DIR, file), 'utf8'));
        sessions.push({
          ...raw,
          startTime: new Date(raw.startTime),
          lastActive: new Date(raw.lastActive),
          uniqueSections: new Set(raw.uniqueSections || [])
        });
      } catch (e) {}
    }
  }
  return sessions;
}