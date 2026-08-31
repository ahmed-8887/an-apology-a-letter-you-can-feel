import { listAllSessions } from './utils/storage.js';
import { finalizeSession } from './track.js';

export default async (req) => {
  console.log('[Sweeper] Running scheduled inactive session sweep...');
  try {
    const sessions = await listAllSessions();
    const now = Date.now();
    let finalizedCount = 0;

    for (const session of sessions) {
      if (!session.finalized && !session.notificationSent) {
        const inactiveDuration = now - session.lastActive.getTime();
        if (inactiveDuration >= 60000) {
          console.log(`[Sweeper] Finalizing inactive session: ${session.id} (inactive for ${Math.round(inactiveDuration/1000)}s)`);
          const success = await finalizeSession(session.id, 'scheduled_cron_sweeper');
          if (success) finalizedCount++;
        }
      }
    }

    return new Response(JSON.stringify({ status: 'sweep_complete', finalizedCount }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (err) {
    console.error('[Sweeper] Error in session sweep:', err);
    return new Response(JSON.stringify({ error: err.message }), { status: 500 });
  }
};

export const config = {
  schedule: '* * * * *'
};
