// Retries an async function a few times with increasing delays before
// giving up. Used when the app first loads (fetching products/cart), to
// ride out a slow MongoDB cold-start instead of immediately and
// permanently falling back to local/offline demo mode after a single
// failed request.
export async function retryAsync(fn, delaysMs = [800, 1800, 3000]) {
  let lastError;
  for (let attempt = 0; attempt <= delaysMs.length; attempt++) {
    try {
      return await fn();
    } catch (err) {
      lastError = err;
      if (attempt < delaysMs.length) {
        await new Promise((resolve) => setTimeout(resolve, delaysMs[attempt]));
      }
    }
  }
  throw lastError;
}
