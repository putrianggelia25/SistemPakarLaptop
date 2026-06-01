import { readDb } from '$lib/server/store.js';

export function load() {
  const db = readDb();
  const popular = Object.entries(
    db.diagnosa.reduce((acc, item) => {
      acc[item.hasilKerusakan] = (acc[item.hasilKerusakan] ?? 0) + 1;
      return acc;
    }, {})
  )
    .map(([nama, total]) => ({ nama, total }))
    .sort((a, b) => b.total - a.total)
    .slice(0, 3);

  return {
    stats: {
      gejala: db.gejala.length,
      kerusakan: db.kerusakan.length,
      diagnosa: db.diagnosa.length
    },
    popular
  };
}
