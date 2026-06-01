import { readDb } from '$lib/server/store.js';

export function load() {
  return { kerusakan: readDb().kerusakan.sort((a, b) => a.kode.localeCompare(b.kode)) };
}
