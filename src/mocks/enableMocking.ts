/**
 * Mocks are on by default (dev and demo build). Set VITE_ENABLE_MOCKS=false
 * to talk to a real API instead.
 */
export async function enableMocking() {
  if (import.meta.env.VITE_ENABLE_MOCKS === 'false') return;

  const { worker } = await import('./browser');
  await worker.start({
    onUnhandledFrame: 'bypass',
    serviceWorker: { url: `${import.meta.env.BASE_URL}mockServiceWorker.js` },
  });
}
