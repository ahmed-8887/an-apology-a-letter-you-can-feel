import { sendFinalSessionEmail } from './utils/mailer.js';
import { saveSession, getSession, acquireFinalizeLock, getAudioBlob } from './utils/storage.js';

const CANONICAL_SECTIONS = [
  { id: 'sec_1', title: 'Intro' },
  { id: 'sec_2', title: 'Before You Continue' },
  { id: 'sec_3', title: 'What I Need to Say' },
  { id: 'sec_4', title: 'The Moment I Realized' },
  { id: 'sec_5', title: 'What I Got Wrong' },
  { id: 'sec_6', title: 'What I Should Have Done' },
  { id: 'sec_7', title: 'Things I Remember' },
  { id: 'sec_8', title: "What I'm Actually Sorry For" },
  { id: 'sec_9', title: 'The Main Apology' },
  { id: 'sec_10', title: "I Don't Expect Anything" },
  { id: 'sec_11', title: 'Final Letter' },
  { id: 'sec_12', title: 'Final Choice' },
  { id: 'sec_13', title: 'End Experience' }
];

function formatPktTime(dateObj) {
  try {
    return new Intl.DateTimeFormat('en-US', {
      timeZone: 'Asia/Karachi',
      dateStyle: 'full',
      timeStyle: 'long',
      hour12: true
    }).format(dateObj);
  } catch (e) {
    return dateObj.toISOString() + ' (PKT/UTC+5)';
  }
}

function formatDuration(ms) {
  const totalSecs = Math.max(0, Math.floor(ms / 1000));
  const mins = Math.floor(totalSecs / 60);
  const secs = totalSecs % 60;
  if (mins === 0) return `${secs} sec${secs === 1 ? '' : 's'}`;
  return `${mins} min${mins === 1 ? '' : 's'} ${secs} sec${secs === 1 ? '' : 's'}`;
}

export async function finalizeSession(sessionId, reason = 'inactivity') {
  if (!sessionId) return false;

  const lockAcquired = await acquireFinalizeLock(sessionId);
  if (!lockAcquired) {
    return false;
  }


  const session = await getSession(sessionId);
  if (!session) return false;
  if (session.finalized || session.notificationSent) return false;

  session.finalized = true;
  session.notificationSent = true;
  session.finalizedReason = reason;


  const durationMs = session.lastActive.getTime() - session.startTime.getTime();
  const durationFormatted = formatDuration(durationMs);

  const visitedSectionTitles = [];
  CANONICAL_SECTIONS.forEach(s => {
    if (session.uniqueSections.has(s.id)) {
      visitedSectionTitles.push(s.title);
    }
  });


  let audioBuffer = null;
  if (session.voiceAudioBase64) {
    const cleanBase64 = session.voiceAudioBase64.replace(/^data:audio\/[a-zA-Z0-9]+;base64,/, '');
    audioBuffer = Buffer.from(cleanBase64, 'base64');
  } else {
    audioBuffer = await getAudioBlob(sessionId);
  }


  await saveSession(sessionId, session);


  try {
    await sendFinalSessionEmail({
      sessionId,
      startTimePkt: formatPktTime(session.startTime),
      lastActivePkt: formatPktTime(session.lastActive),
      durationFormatted,
      uniqueCount: session.uniqueSections.size,
      uniqueSectionTitles: visitedSectionTitles,
      journeyTimeline: session.journeyTimeline,
      textMessage: session.textMessage,
      voiceAudioBase64: session.voiceAudioBase64,
      audioBuffer,
      voiceDuration: session.voiceDuration
    });
    return true;
  } catch (e) {
    console.error('[�rack] Error dispatching final session email:', e);
    return false;
  }
}

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

  const { sessionId } = body;
  if (!sessionId) {
    return new Response(JSON.stringify({ error: 'sessionId required' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  const url = new URL(req.url);
  const path = url.pathname;
  const now = new Date();

  if (path.endsWith('/start') || path === '/api/track/start') {
    let session = await getSession(sessionId);
    const isNew = !session;
    if (isNew) {
      session = {
        id: sessionId,
        startTime: now,
        lastActive: now,
        userAgent: body.userAgent || req.headers.get('user-agent') || 'Unknown',
        country: context?.geo?.country?.name || req.headers.get('x-country') || 'Unknown',
        screen: body.screen || 'Unknown',
        referrer: body.referrer || 'direct',
        uniqueSections: new Set(['sec_1']),
        journeyTimeline: [{
          sectionId: 'sec_1',
          title: 'Intro',
          time: now.toISOString(),
          timePkt: formatPktTime(now)
        }],
        textMessage: null,
        voiceAudioBase64: null,
        voiceDuration: null,
        messageSubmitted: false,
        finalized: false,
        notificationSent: false
      };
      await saveSession(sessionId, session);
    }


    return new Response(JSON.stringify({
      status: 'session_started',
      sessionId,
      isNewSession: isNew
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  const session = await getSession(sessionId);
  if (!session) {
    return new Response(JSON.stringify({ status: 'session_not_found' }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  if (path.endsWith('/section') || path === '/api/track/section') {
    session.lastActive = now;
    const { sectionId, sectionTitle } = body;
    if (sectionId) {
      session.uniqueSections.add(sectionId);
      session.journeyTimeline.push({
        sectionId,
        title: sectionTitle || sectionId,
        time: now.toISOString(),
        timePkt: formatPktTime(now)
      });
      await saveSession(sessionId, session);
    }
    return new Response(JSON.stringify({
      status: 'section_tracked',
      uniqueCount: session.uniqueSections.size,
      totalCanonical: 13
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  if (path.endsWith('/event') || path === '/api/track/event') {
    session.lastActive = now;
    const { eventName, metadata } = body;
    if (eventName) {
      session.journeyTimeline.push({
        event: eventName,
        title: eventName,
        time: now.toISOString(),
        timePkt: formatPktTime(now),
        metadata: metadata || null
      });
      await saveSession(sessionId, session);
    }
    return new Response(JSON.stringify({ status: 'event_tracked' }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  if (path.endsWith('+heartbeat') || path === '/api/track/heartbeat') {
    session.lastActive = now;
    await saveSession(sessionId, session);
    return new Response(JSON.stringify({ status: 'heartbeat_acknowledged' }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  }


  if (path.endsWith('/end') || path.endsWith('/finalize') || path === '/api/track/end') {
    session.lastActive = now;
    await saveSession(sessionId, session);
    await finalizeSession(sessionId, 'explicit_end');
    return new Response(JSON.stringify({ status: 'session_finalized' }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  return new Response(JSON.stringify({ error: 'Endpoint not found' }), {
    status: 404,
    headers: { 'Content-Type': 'application/json' }
  });
};
