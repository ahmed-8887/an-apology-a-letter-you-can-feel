export default async (req, context) => {
  const timePKT = new Intl.DateTimeFormat('en-US', {
    timeZone: 'Asia/Karachi',
    dateStyle: 'full',
    timeStyle: 'long'
  }).format(new Date());

  return new Response(JSON.stringify({
    status: 'ok',
    service: 'apology-netlify-backend',
    timePKT
  }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' }
  });
};
