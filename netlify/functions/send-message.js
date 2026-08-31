import { getSession, saveSession, saveAudioBlob } from './utils/storage.js';

export default async (req, context) => {
  if (req.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Method Not Allowed' }), {
      status: 405,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  let body = {};
  try {
    body = await req.json();
  } catch (e) {
    return new Response(JSON.stringify({ error: 'Invalid JSON' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  const { sessionId, message, textMessage, voiceAudioBase64, voiceDuration } = body;
  const contentText = textMessage || message || null;


  if (!sessionId) {
    return new Response(JSON.stringify({ error: 'sessionId required' }), { 
      status: 400,
      headers: { 'Content-Type': 'application/json' }
    });
  }


  if (!contentText && !voiceAudioBase64) {
    return new Response(JSON.stringify({ error: 'Text message or voice recording is required.' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' }
    });
  }


  const now = new Date();
  const session = await getSession(sessionId);


  if (session) {
    session.textMessage = contentText;
    session.voiceAudioBase64 = voiceAudioBase64 || null;
    session.voiceDuration = voiceDuration || null;
    session.messageSubmitted = true;
    session.lastActive = now;
    await saveSession(sessionId, session);
  }


  if (voiceAudioBase64) {
    try {
      await saveAudioBlob(sessionId, voiceAudioBase64, 'audio/webm');
    } catch (e) {
      console.warn('[SendMessage] Warning: Could not save audio file persistently:', e.message);
    }
  }


  return new Response(JSON.stringify({
    status: 'success',
    message: 'Message recorded safely.'
  }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' }
  });
};
