import { readDb } from '$lib/server/store.js';

export function load() {
  return { gejala: readDb().gejala.sort((a, b) => a.kode.localeCompare(b.kode)) };
}
