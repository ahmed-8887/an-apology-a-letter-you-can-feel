const sessions = new Map();

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

export async function handleTrackRequest(request, env) {
  const url = new URL(request.url);
  const path = url.pathname;

  if (request.method !== 'POST') {
    return new Response('Method Not Allowed', { status: 405 });
  }

  let body = {};
  try {
    body = await request.json();
  } catch (e) {
    return new Response(JSON.stringify({ error: 'Invalid JSON' }), { status: 400 });
  }

  const { sessionId } = body;
  if (!sessionId) {
    return new Response(JSON.stringify({ error: 'sessionId required' }), { status: 400 });
  }

  const now = new Date();

  if (path === '/api/track/start') {
    if (!sessions.has(sessionId)) {
      sessions.set(sessionId, {
        id: sessionId,
        startTime: now,
        lastActive: now,
        userAgent: body.userAgent || request.headers.get('User-Agent') || 'Unknown',
        country: request.headers.get('CF-IOCountry') || 'Unknown',
        screen: body.screen || 'Unknown',
        referrer: body.referrer || 'direct',
        uniqueSections: new Set(),
        journeyTimeline: [],
        messageSubmitted: false,
        messageContent: null,
        finalized: false
      });
    }
    return new Response(JSON.stringify({ status: 'session_started', sessionId }), {
      headers: { 'Content-Type': 'application/json' }
    });
  }

  const session = sessions.get(sessionId);
  if (!session) {
    return new Response(JSON.stringify({ status: 'session_not_found' }), { status: 200 });
  }

  if (path === '/api/track/section') {
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
    }
    return new Response(JSON.stringify({
      status: 'section_tracked',
      uniqueCount: session.uniqueSections.size,
      totalCanonical: 13
    }), {
      headers: { 'Content-Type': 'application/json' }
    });
  }

  if (path === '/api/track/heartbeat') {
    session.lastActive = now;
    return new Response(JSON.stringify({ status: 'heartbeat_acknowledged' }), {
      headers: { 'Content-Type': 'application/json' }
    });
  }

  return new Response('Not Found', { status: 404 });
}

export async function handleSendMessage(request, env) {
  if (request.method !== 'POST') {
    return new Response('Method Not Allowed', { status: 405 });
  }

  let body = {};
  try {
    body = await request.json();
  } catch (e) {
    return new Response(JSON.stringify({ error: 'Invalid JSON' }), { status: 400 });
  }

  const { sessionId, message } = body;
  if (!sessionId || !message) {
    return new Response(JSON.stringify({ error: 'sessionId and message required' }), { status: 400 });
  }

  const session = sessions.get(sessionId);
  if (session) {
    session.messageSubmitted = true;
    session.messageContent = message;
    session.lastActive = new Date();
  }

  return new Response(JSON.stringify({ status: 'success', message: 'Message recorded safely.' }), {
    headers: { 'Content-Type': 'application/json' }
  });
}
