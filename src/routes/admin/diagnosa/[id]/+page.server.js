import { error, fail } from '@sveltejs/kit';
import { revise, retain } from '$lib/cbr.js';
import { requireAdmin } from '$lib/server/auth.js';
import { readDb, writeDb } from '$lib/server/store.js';

export function load({ cookies, params }) {
  requireAdmin(cookies);
  const db = readDb();
  const diagnosa = db.diagnosa.find((item) => String(item.id) === params.id);

  if (!diagnosa) throw error(404, 'Diagnosa tidak ditemukan.');

  return {
    diagnosa,
    kerusakan: db.kerusakan
  };
}

export const actions = {
  setujui: async ({ cookies, params, request }) => {
    requireAdmin(cookies);
    const form = await request.formData();
    const catatanRevisi = String(form.get('catatanRevisi') ?? '').trim();

    try {
      const db = readDb();
      const { db: updatedDb } = revise(db, params.id, 'setujui', { catatanRevisi });
      writeDb(updatedDb);
    } catch (err) {
      return fail(400, { message: err.message, action: 'setujui' });
    }

    return { success: true, action: 'setujui' };
  },

  revisi: async ({ cookies, params, request }) => {
    requireAdmin(cookies);
    const form = await request.formData();
    const idKerusakanRevisi = Number(form.get('idKerusakanRevisi'));
    const catatanRevisi = String(form.get('catatanRevisi') ?? '').trim();

    if (!idKerusakanRevisi) {
      return fail(400, { message: 'Pilih kerusakan yang benar.', action: 'revisi' });
    }

    try {
      const db = readDb();
      const { db: updatedDb } = revise(db, params.id, 'revisi', {
        idKerusakanRevisi,
        catatanRevisi
      });
      writeDb(updatedDb);
    } catch (err) {
      return fail(400, { message: err.message, action: 'revisi' });
    }

    return { success: true, action: 'revisi' };
  },

  retain: async ({ cookies, params }) => {
    requireAdmin(cookies);

    try {
      const db = readDb();
      const { db: updatedDb, added } = retain(db, params.id);
      writeDb(updatedDb);
      return { success: true, action: 'retain', added };
    } catch (err) {
      return fail(400, { message: err.message, action: 'retain' });
    }
  }
};
