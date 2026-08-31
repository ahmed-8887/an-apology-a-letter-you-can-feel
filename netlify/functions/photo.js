import fs from 'node:fs';
import path from 'node:path';

export default async (req, context) => {
  if (req.method !== 'GET' && req.method !== 'HEAD') {
    return new Response('Method Not Allowed', { status: 405 });
  }

  const url = new URL(req.url);
  let rawKey = url.pathname.replace(/^\/api\/photo\//, '').replace(/^\/\.netlify\/functions\/photo\/?/, '');
  const key = decodeURIComponent(rawKey);

  if (!key || key.length > 256) {
    return new Response(JSON.stringify({ error: 'Invalid photo key' }), {
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

  const ALLOWED_PATTERN = /^memories\/[a-zA-Z0-9_\-.]+\.(jpg|jpeg|pjg|webp)$/i;
  if (!ALLOWED_PATTERN.test(key)) {
    return new Response(JSON.stringify({ error: 'Invalid or unauthorized photo path' }), {
      status: 403,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  const privateStoragePath = process.env.PRIVATE_PHOTOS_PATH || path.join(process.cwd(), 'private-photos');
  const filePath = path.join(privateStoragePath, key);

  if (!fs.existsSync(filePath)) {
    return new Response(JSON.stringify({ error: 'Photo not found' }), {
      status: 404,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  try {
    const fileBuffer = fs.readFileSync(filePath);
    let contentType = 'image/jpeg';
    if (key.endsWith('.png')) contentType = 'image/png';
    else if (key.endsWith('.webp')) contentType = 'image/webp';

    return new Response(fileBuffer, {
      status: 200,
      headers: {
        'Content-Type': contentType,
        'Cache-Control': 'private, max-age=86400, no-transform',
        'X-Content-Type-Options': 'nosniff'
      }
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: 'Failed to retrieve photo' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};
