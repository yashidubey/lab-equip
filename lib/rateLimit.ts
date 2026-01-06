type RateLimitEntry = {
  count: number;
  lastRequest: number;
};

const store = new Map<string, RateLimitEntry>();

export function rateLimit(
  key: string,
  limit: number,
  windowMs: number
) {
  const now = Date.now();
  const entry = store.get(key);

  if (!entry) {
    store.set(key, { count: 1, lastRequest: now });
    return true;
  }

  if (now - entry.lastRequest > windowMs) {
    store.set(key, { count: 1, lastRequest: now });
    return true;
  }

  if (entry.count >= limit) {
    return false;
  }

  entry.count += 1;
  return true;
}
