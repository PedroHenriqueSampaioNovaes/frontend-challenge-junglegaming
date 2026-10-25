/**
 * Mocks are on by default (dev and demo build). Set VITE_ENABLE_MOCKS=false
 * to talk to a real API instead.
 */
export async function enableMocking() {
  if (import.meta.env.VITE_ENABLE_MOCKS === 'false') return;

  const { worker } = await import('./browser');
  const start = () =>
    worker.start({
      onUnhandledFrame: 'bypass',
      serviceWorker: { url: `${import.meta.env.BASE_URL}mockServiceWorker.js` },
    });

  await start();

  // MSW keeps its worker alive with a 5s timer, but browsers throttle timers
  // in background tabs. The idle worker is then killed and the restarted one
  // no longer intercepts, so /api requests hit the host (an HTML fallback).
  // When the tab is visible again, check interception and restart if needed.
  let recovering = false;
  document.addEventListener('visibilitychange', async () => {
    if (document.visibilityState !== 'visible' || recovering) return;
    recovering = true;
    try {
      const alive = await fetch('/api/health')
        .then((response) => response.headers.get('content-type')?.includes('json'))
        .catch(() => false);
      if (!alive) {
        try {
          await worker.stop();
        } catch {
          // stop() throws if MSW is already disabled; we start it anyway.
        }
        await start();
      }
    } finally {
      recovering = false;
    }
  });
}
