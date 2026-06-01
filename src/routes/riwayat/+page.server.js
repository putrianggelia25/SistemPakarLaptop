import { readDb } from '$lib/server/store.js';

export function load() {
  const db = readDb();
  return { diagnosa: db.diagnosa };
}
