import { handlePhotoRequest } from './photoHandler.js';
import { handleTrackRequest, handleSendMessage } from './trackerHandler.js';

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);

    // Route: GET /api/photo/*
    if (url.pathname.startsWith('/api/photo/')) {
      return handlePhotoRequest(request, env);
    }

    // Route: POST /api/track/*
    if (url.pathname.startsWith('/api/track/')) {
      return handleTrackRequest(request, env);
    }

    // Route: POST /api/send-message
    if (url.pathname === '/api/send-message') {
      return handleSendMessage(request, env);
    }

    // Route: GET /api/health
    if (url.pathname === '/api/health') {
      return new Response(JSON.stringify({ 
        status: 'ok', 
        service: 'apology-worker',
        timePKT: new Intl.DateTimeFormat('en-US', { timeZone: 'Asia/Karachi', dateStyle: 'full', timeStyle: 'long' }).format(new Date())
      }), {
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Static frontend assets passthrough for Cloudflare SPA deployment
    if (env.ASSETS) {
      return env.ASSETS.fetch(request);
    }

    return new Response('Not Found', { status: 404 });
  }
};
