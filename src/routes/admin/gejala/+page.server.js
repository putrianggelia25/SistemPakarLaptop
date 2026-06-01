import { fail, redirect } from '@sveltejs/kit';
import { requireAdmin } from '$lib/server/auth.js';
import { nextId, readDb, writeDb } from '$lib/server/store.js';

export function load({ cookies, url }) {
  requireAdmin(cookies);
  const db = readDb();
  const editId = Number(url.searchParams.get('edit'));
  return {
    gejala: db.gejala.sort((a, b) => a.kode.localeCompare(b.kode)),
    edit: db.gejala.find((item) => item.id === editId) ?? null
  };
}

export const actions = {
  save: async ({ request, cookies }) => {
    requireAdmin(cookies);
    const form = await request.formData();
    const id = Number(form.get('id'));
    const kode = String(form.get('kode') ?? '').trim();
    const nama = String(form.get('nama') ?? '').trim();

    if (!kode || !nama) return fail(400, { message: 'Kode dan nama gejala wajib diisi.' });

    const db = readDb();
    if (id) {
      db.gejala = db.gejala.map((item) => (item.id === id ? { ...item, kode, nama } : item));
    } else {
      db.gejala.push({ id: nextId(db.gejala), kode, nama });
    }
    writeDb(db);
    throw redirect(303, '/admin/gejala');
  },
  delete: async ({ request, cookies }) => {
    requireAdmin(cookies);
    const id = Number((await request.formData()).get('id'));
    const db = readDb();
    db.gejala = db.gejala.filter((item) => item.id !== id);
    db.basisKasus = db.basisKasus.filter((item) => item.idGejala !== id);
    writeDb(db);
    throw redirect(303, '/admin/gejala');
  }
};
