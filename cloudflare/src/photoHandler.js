/**
 * Cloudflare Worker Secure Private Photo Handler
 *
 * Security Controls:
 * 1. Path traversal protection (blocks '..', '\', '%2e', etc.)
 * 2. Whitelist namespace enforcement ('memories/')
 * 3. Direct R2 binding access (no public URLs or R2.dev exposure)
 * 4. Content sniffing prevention headers
 */

export async function handlePhotoRequest(request, env) {
  if (request.method !== 'GET' && request.method !== 'HEAD') {
    return new Response('Method Not Allowed', { status: 405 });
  }

  const url = new URL(request.url);
  const rawKey = url.pathname.replace(/^\/api\/photo\//, '');
  const key = decodeURIComponent(rawKey);

  // Security Check 1: Length and non-empty
  if (!key || key.length > 256) {
    return new Response(JSON.stringify({ error: 'Invalid photo key' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  // Security Check 2: Path traversal and illegal characters
  if (
    key.includes('..') ||
    key.includes('\\') ||
    key.startsWith('/') ||
    key.includes('\0') ||
    /[<>"'|?*]/.test(key)
  ) {
    return new Response(JSON.stringify({ error: 'Access denied' }), {
      status: 403,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  // Security Check 3: Strict Whitelist Pattern (memories/photo-name.ext)
  const ALLOWED_PATTERN = /^memories\/[a-zA-Z0-9_\-.]+\.(jpg|jpeg|png|webp)$/i;
  if (!ALLOWED_PATTERN.test(key)) {
    return new Response(JSON.stringify({ error: 'Invalid or unauthorized photo path' }), {
      status: 403,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  // Check R2 bucket binding
  if (!env.PRIVATE_PHOTOS_BUCKET) {
    return new Response(JSON.stringify({ error: 'Private storage not configured' }), {
      status: 503,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  try {
    const object = await env.PRIVATE_PHOTOS_BUCKET.get(key);

    if (!object) {
      return new Response(JSON.stringify({ error: 'Photo not found' }), {
        status: 404,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    const headers = new Headers();
    object.writeHttpMetadata(headers);
    headers.set('etag', object.httpEtag);
    headers.set('Cache-Control', 'private, max-age=86400, no-transform');
    headers.set('X-Content-Type-Options', 'nosniff');

    if (!headers.get('Content-Type')) {
      if (key.endsWith('.png')) headers.set('Content-Type', 'image/png');
      else if (key.endsWith('.webp')) headers.set('Content-Type', 'image/webp');
      else headers.set('Content-Type', 'image/jpeg');
    }

    return new Response(object.body, {
      status: 200,
      headers
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: 'Failed to retrieve photo' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}
