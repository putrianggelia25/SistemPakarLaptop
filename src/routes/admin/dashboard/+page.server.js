import { requireAdmin } from '$lib/server/auth.js';
import { readDb } from '$lib/server/store.js';

export function load({ cookies }) {
  requireAdmin(cookies);
  const db = readDb();
  const monthFormatter = new Intl.DateTimeFormat('id-ID', { month: 'short', year: 'numeric' });
  const popular = Object.entries(
    db.diagnosa.reduce((acc, item) => {
      acc[item.hasilKerusakan] = (acc[item.hasilKerusakan] ?? 0) + 1;
      return acc;
    }, {})
  )
    .map(([nama, total]) => ({ nama, total }))
    .sort((a, b) => b.total - a.total);

  const monthlyMap = db.diagnosa.reduce((acc, item) => {
    const date = new Date(item.tanggal);
    const key = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
    acc[key] = (acc[key] ?? 0) + 1;
    return acc;
  }, {});
  const monthly = Object.entries(monthlyMap)
    .map(([key, total]) => ({
      key,
      label: monthFormatter.format(new Date(`${key}-01T00:00:00`)),
      total
    }))
    .sort((a, b) => a.key.localeCompare(b.key))
    .slice(-6);
  const maxMonthly = Math.max(1, ...monthly.map((item) => item.total));

  return {
    stats: {
      gejala: db.gejala.length,
      kerusakan: db.kerusakan.length,
      basisKasus: db.basisKasus.length,
      diagnosa: db.diagnosa.length
    },
    cbrStats: {
      pending: db.diagnosa.filter((d) => d.status === 'pending').length,
      disetujui: db.diagnosa.filter((d) => d.status === 'disetujui').length,
      direvisi: db.diagnosa.filter((d) => d.status === 'direvisi').length,
      retained: db.diagnosa.filter((d) => d.retained).length,
      akurasi:
        db.diagnosa.filter((d) => d.status !== 'pending').length > 0
          ? Number(
              (
                (db.diagnosa.filter((d) => d.status === 'disetujui').length /
                  db.diagnosa.filter((d) => d.status !== 'pending').length) *
                100
              ).toFixed(1)
            )
          : null
    },
    popular,
    monthly,
    maxMonthly
  };
}
