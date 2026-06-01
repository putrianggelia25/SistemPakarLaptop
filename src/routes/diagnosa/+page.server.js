import { fail, redirect } from '@sveltejs/kit';
import { randomUUID } from 'node:crypto';
import { mkdir, writeFile } from 'node:fs/promises';
import { resolve, extname } from 'node:path';
import { readDb, nextId, writeDb } from '$lib/server/store.js';
import { calculateSimilarity } from '$lib/cbr.js';

const allowedImageTypes = new Set(['image/jpeg', 'image/png', 'image/webp']);
async function saveEvidenceImage(file) {
  if (!file || file.size === 0) return null;
  if (!allowedImageTypes.has(file.type)) {
    return { error: 'Format gambar harus JPG, PNG, atau WebP.' };
  }
  if (file.size > 2 * 1024 * 1024) {
    return { error: 'Ukuran gambar maksimal 2 MB.' };
  }
  const uploadDir = resolve('static/uploads');
  await mkdir(uploadDir, { recursive: true });
  const extension = extname(file.name) || '.jpg';
  const fileName = `diagnosa-${Date.now()}-${randomUUID()}${extension}`;
  await writeFile(resolve(uploadDir, fileName), Buffer.from(await file.arrayBuffer()));
  return { path: `/uploads/${fileName}` };
}

function buildFollowUpMap(db) {
  return db.gejala.reduce((acc, gejala) => {
    const relatedKerusakanIds = db.basisKasus.filter((kasus) => kasus.idGejala === gejala.id).map((kasus) => kasus.idKerusakan);
    const relatedGejalaIds = db.basisKasus.filter((kasus) => relatedKerusakanIds.includes(kasus.idKerusakan) && kasus.idGejala !== gejala.id).map((kasus) => kasus.idGejala);
    acc[gejala.id] = [...new Set(relatedGejalaIds)].map((id) => db.gejala.find((item) => item.id === id)).filter(Boolean).sort((a, b) => a.kode.localeCompare(b.kode));
    return acc;
  }, {});
}

export function load() {
  const db = readDb();
  return {
    gejala: db.gejala.sort((a, b) => a.kode.localeCompare(b.kode)),
    followUps: buildFollowUpMap(db)
  };
}

export const actions = {
  default: async ({ request }) => {
    const form = await request.formData();
    const namaUser = String(form.get('namaUser') ?? '').trim();
    const gejalaUtama = Number(form.get('gejalaUtama'));
    const selected = [...new Set([gejalaUtama, ...form.getAll('gejala').map(Number)].filter(Boolean))];
    const catatan = String(form.get('catatan') ?? '').trim();
    const imageResult = await saveEvidenceImage(form.get('gambar'));
    if (imageResult?.error) {
      return fail(400, {
        message: imageResult.error,
        namaUser,
        selected,
        gejalaUtama,
        catatan
      });
    }
    if (!namaUser || !gejalaUtama || selected.length === 0) {
      return fail(400, {
        message: 'Nama pengguna dan gejala utama wajib diisi.',
        namaUser,
        selected,
        gejalaUtama,
        catatan
      });
    }
    const db = readDb();
    const results = calculateSimilarity(db, selected);
    const best = results[0];
    if (!best || best.similarity <= 0) {
      return fail(400, {
        message: 'Belum ada kasus yang cocok dengan gejala pilihan.',
        namaUser,
        selected,
        gejalaUtama,
        catatan
      });
    }
    const gejalaDipilih = db.gejala.filter((item) => selected.includes(item.id));
    const diagnosa = {
      id: nextId(db.diagnosa),
      namaUser,
      tanggal: new Date().toISOString(),
      status: 'pending',
      gejalaUtama,
      selectedGejala: selected,
      gejalaDipilih,
      catatan,
      gambar: imageResult?.path ?? null,
      idKerusakanHasil: best.id,
      hasilKerusakan: best.nama,
      nilaiSimilarity: best.similarity,
      results
    };
    db.diagnosa.unshift(diagnosa);
    writeDb(db);
    throw redirect(303, `/hasil/${diagnosa.id}`);
  }
};
