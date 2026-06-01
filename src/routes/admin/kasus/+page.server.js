import { fail, redirect } from '@sveltejs/kit';
import { requireAdmin } from '$lib/server/auth.js';
import { nextId, readDb, writeDb } from '$lib/server/store.js';

function rows(db) {
  return db.basisKasus
    .map((item) => ({
      ...item,
      kerusakan: db.kerusakan.find((row) => row.id === item.idKerusakan),
      gejala: db.gejala.find((row) => row.id === item.idGejala)
    }))
    .sort((a, b) => `${a.kerusakan?.kode}${a.gejala?.kode}`.localeCompare(`${b.kerusakan?.kode}${b.gejala?.kode}`));
}

export function load({ cookies, url }) {
  requireAdmin(cookies);
  const db = readDb();
  const editId = Number(url.searchParams.get('edit'));
  return {
    basisKasus: rows(db),
    kerusakan: db.kerusakan.sort((a, b) => a.kode.localeCompare(b.kode)),
    gejala: db.gejala.sort((a, b) => a.kode.localeCompare(b.kode)),
    edit: db.basisKasus.find((item) => item.id === editId) ?? null
  };
}

export const actions = {
  save: async ({ request, cookies }) => {
    requireAdmin(cookies);
    const form = await request.formData();
    const id = Number(form.get('id'));
    const payload = {
      idKerusakan: Number(form.get('idKerusakan')),
      idGejala: Number(form.get('idGejala')),
      bobot: Number(form.get('bobot'))
    };

    if (!payload.idKerusakan || !payload.idGejala || Number.isNaN(payload.bobot)) {
      return fail(400, { message: 'Kerusakan, gejala, dan bobot wajib diisi.' });
    }

    const db = readDb();
    if (id) {
      db.basisKasus = db.basisKasus.map((item) => (item.id === id ? { ...item, ...payload } : item));
    } else {
      db.basisKasus.push({ id: nextId(db.basisKasus), ...payload });
    }
    writeDb(db);
    throw redirect(303, '/admin/kasus');
  },
  delete: async ({ request, cookies }) => {
    requireAdmin(cookies);
    const id = Number((await request.formData()).get('id'));
    const db = readDb();
    db.basisKasus = db.basisKasus.filter((item) => item.id !== id);
    writeDb(db);
    throw redirect(303, '/admin/kasus');
  }
};
