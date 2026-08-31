import fs from 'node:fs';
import path from 'node:path';

export default async (req, context) => {
  if (req.method !== 'GET' && req.method !== 'HEAD') {
    return new Response('Method Not Allowed', { status: 405 });
  }

  const url = new URL(req.url);
  let rawKey = url.pathname.replace(/^\/api\/audio\//, '').replace(/^\/\.netlify\/functions\/audio\/?/, '');
  const key = decodeURIComponent(rawKey);

  if (!key || key.length > 256) {
    return new Response(JSON.stringify({ error: 'Invalid audio key' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  if (
    key.includes('..') ||
    key.includes('\\') ||
    key.startsWith('/') ||
    key.includes('\0') ||
    /[<>'|?*]/.test(key)
  ) {
    return new Response(JSON.stringify({ error: 'Access denied' }), {
      status: 403,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  const ALLOWED_PATTERN = /^recordings\/[a-zA-Z0-9_\-.]+\.(webm|mp3|ogg|wav|m4a)$/i;
  if (!ALLOWED_PATTERN.test(key)) {
    return new Response(JSON.stringify({ error: 'Invalid or unauthorized audio path' }), {
      status: 403,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  const fileName = key.replace(/^recordings\//, '');
  
  // Authorization check: Verify sessionId matches the requested recording
  const reqSessionId = url.searchParams.get('sessionId') || req.headers.get('x-session-id');
  const targetSessionIdMatch = fileName.match(/^recording-(.+?)\.(webm|mp3|ogg|wav|m4a)$/i);
  if (targetSessionIdMatch) {
    const expectedSessionId = targetSessionIdMatch[1];
    if (!reqSessionId || reqSessionId !== expectedSessionId) {
      return new Response(JSON.stringify({ error: 'Unauthorized: Audio access requires matching active sessionId' }), {
        status: 403,
        headers: { 'Content-Type': 'application/json' }
      });
    }
  }

  const privateAudioDir = process.env.PRIVATE_AUDIO_PATH || path.join(process.cwd(), '.persistent-storage', 'recordings');
  let filePath = path.join(privateAudioDir, fileName);

  if (!fs.existsSync(filePath)) {
    // Fallback to legacy private-recordings folder if exists
    const fallbackPath = path.join(process.cwd(), 'private-recordings', fileName);
    if (fs.existsSync(fallbackPath)) {
      filePath = fallbackPath;
    } else {
      return new Response(JSON.stringify({ error: 'Audio recording not found' }), {
        status: 404,
        headers: { 'Content-Type': 'application/json' }
      });
    }
  }


  try {
    const fileBuffer = fs.readFileSync(filePath);
    let contentType = 'audio/webm';
    if (key.endsWith('.mp3')) contentType = 'audio/mpeg';
    else if (key.endsWith('.ogg')) contentType = 'audio/ogg';
    else if (key.endsWith('.wav')) contentType = 'audio/wav';
    else if (key.endsWith('.m4a')) contentType = 'audio/mp4';

    return new Response(fileBuffer, {
      status: 200,
      headers: {
        'Content-Type': contentType,
        'Cache-Control': 'private, max-age=86400, no-transform',
        'X-Content-Type-Options': 'nosniff'
      }
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: 'Failed to retrieve audio recording' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};
