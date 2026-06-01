import { error } from '@sveltejs/kit';
import { readDb } from '$lib/server/store.js';

export function load({ params }) {
  const db = readDb();
  const diagnosa = db.diagnosa.find((item) => String(item.id) === params.id);

  if (!diagnosa) {
    throw error(404, 'Hasil diagnosa tidak ditemukan.');
  }

  return { diagnosa };
}
