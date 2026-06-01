import { requireAdmin } from '$lib/server/auth.js';
import { readDb } from '$lib/server/store.js';

export function load({ cookies }) {
  requireAdmin(cookies);
  const db = readDb();
  return {
    diagnosa: db.diagnosa,
    stats: {
      total: db.diagnosa.length,
      pending: db.diagnosa.filter((d) => !d.status || d.status === 'pending').length,
      disetujui: db.diagnosa.filter((d) => d.status === 'disetujui').length,
      direvisi: db.diagnosa.filter((d) => d.status === 'direvisi').length,
      retained: db.diagnosa.filter((d) => d.retained).length
    }
  };
}
