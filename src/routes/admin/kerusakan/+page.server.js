import { fail, redirect } from '@sveltejs/kit';
import { requireAdmin } from '$lib/server/auth.js';
import { nextId, readDb, writeDb } from '$lib/server/store.js';

export function load({ cookies, url }) {
  requireAdmin(cookies);
  const db = readDb();
  const editId = Number(url.searchParams.get('edit'));
  return {
    kerusakan: db.kerusakan.sort((a, b) => a.kode.localeCompare(b.kode)),
    edit: db.kerusakan.find((item) => item.id === editId) ?? null
  };
}

export const actions = {
  save: async ({ request, cookies }) => {
    requireAdmin(cookies);
    const form = await request.formData();
    const id = Number(form.get('id'));
    const payload = {
      kode: String(form.get('kode') ?? '').trim(),
      nama: String(form.get('nama') ?? '').trim(),
      penjelasan: String(form.get('penjelasan') ?? '').trim(),
      solusi: String(form.get('solusi') ?? '').trim(),
      tingkat: String(form.get('tingkat') ?? 'Sedang')
    };

    if (!payload.kode || !payload.nama || !payload.solusi) {
      return fail(400, { message: 'Kode, nama, dan solusi wajib diisi.' });
    }

    const db = readDb();
    if (id) {
      db.kerusakan = db.kerusakan.map((item) => (item.id === id ? { ...item, ...payload } : item));
    } else {
      db.kerusakan.push({ id: nextId(db.kerusakan), ...payload });
    }
    writeDb(db);
    throw redirect(303, '/admin/kerusakan');
  },
  delete: async ({ request, cookies }) => {
    requireAdmin(cookies);
    const id = Number((await request.formData()).get('id'));
    const db = readDb();
    db.kerusakan = db.kerusakan.filter((item) => item.id !== id);
    db.basisKasus = db.basisKasus.filter((item) => item.idKerusakan !== id);
    writeDb(db);
    throw redirect(303, '/admin/kerusakan');
  }
};
