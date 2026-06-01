import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';

const dbPath = resolve('data/db.json');

const seed = {
  admin: {
    username: 'admin',
    password: 'admin123'
  },
  gejala: [
    { id: 1, kode: 'G01', nama: 'Laptop mati total' },
    { id: 2, kode: 'G02', nama: 'Laptop cepat panas' },
    { id: 3, kode: 'G03', nama: 'Kipas berbunyi keras' },
    { id: 4, kode: 'G04', nama: 'FPS game menurun' },
    { id: 5, kode: 'G05', nama: 'Laptop restart sendiri' },
    { id: 6, kode: 'G06', nama: 'Layar blank hitam' },
    { id: 7, kode: 'G07', nama: 'Keyboard tidak berfungsi' },
    { id: 8, kode: 'G08', nama: 'Charging tidak masuk' },
    { id: 9, kode: 'G09', nama: 'Baterai cepat habis' },
    { id: 10, kode: 'G10', nama: 'Blue screen saat bermain game' }
  ],
  kerusakan: [
    {
      id: 1,
      kode: 'K01',
      nama: 'Overheating',
      penjelasan: 'Suhu laptop terlalu tinggi karena debu pada kipas, sirkulasi udara buruk, atau thermal paste mengering.',
      solusi: 'Bersihkan kipas, ganti thermal paste, gunakan cooling pad, dan pastikan ventilasi tidak tertutup.',
      tingkat: 'Sedang'
    },
    {
      id: 2,
      kode: 'K02',
      nama: 'Kerusakan RAM',
      penjelasan: 'RAM bermasalah dapat menyebabkan blue screen, restart sendiri, gagal booting, atau performa tidak stabil.',
      solusi: 'Bersihkan pin RAM, pasang ulang RAM, jalankan memory test, atau ganti modul RAM.',
      tingkat: 'Sedang'
    },
    {
      id: 3,
      kode: 'K03',
      nama: 'Kerusakan VGA',
      penjelasan: 'Gangguan GPU/VGA dapat membuat layar blank, FPS turun, driver crash, atau muncul artefak visual.',
      solusi: 'Perbarui driver VGA, cek suhu GPU, dan lakukan pemeriksaan hardware bila gejala berulang.',
      tingkat: 'Berat'
    },
    {
      id: 4,
      kode: 'K04',
      nama: 'Kerusakan Power Supply',
      penjelasan: 'Masalah adaptor, port charging, baterai, atau IC power dapat membuat laptop tidak menyala atau tidak menerima daya.',
      solusi: 'Periksa adaptor, kabel charger, port DC, baterai, dan IC power.',
      tingkat: 'Berat'
    },
    {
      id: 5,
      kode: 'K05',
      nama: 'Kerusakan Baterai',
      penjelasan: 'Baterai aus membuat daya cepat habis, persentase tidak stabil, atau proses charging tidak normal.',
      solusi: 'Kalibrasi baterai, cek battery health, dan ganti baterai bila kapasitas sudah turun drastis.',
      tingkat: 'Ringan'
    }
  ],
  basisKasus: [
    { id: 1, idKerusakan: 1, idGejala: 2, bobot: 1 },
    { id: 2, idKerusakan: 1, idGejala: 3, bobot: 0.9 },
    { id: 3, idKerusakan: 1, idGejala: 4, bobot: 0.8 },
    { id: 4, idKerusakan: 1, idGejala: 5, bobot: 0.7 },
    { id: 5, idKerusakan: 2, idGejala: 5, bobot: 0.8 },
    { id: 6, idKerusakan: 2, idGejala: 10, bobot: 1 },
    { id: 7, idKerusakan: 2, idGejala: 6, bobot: 0.7 },
    { id: 8, idKerusakan: 3, idGejala: 4, bobot: 0.9 },
    { id: 9, idKerusakan: 3, idGejala: 6, bobot: 1 },
    { id: 10, idKerusakan: 3, idGejala: 10, bobot: 0.7 },
    { id: 11, idKerusakan: 3, idGejala: 2, bobot: 0.6 },
    { id: 12, idKerusakan: 4, idGejala: 1, bobot: 1 },
    { id: 13, idKerusakan: 4, idGejala: 8, bobot: 0.9 },
    { id: 14, idKerusakan: 4, idGejala: 5, bobot: 0.6 },
    { id: 15, idKerusakan: 5, idGejala: 8, bobot: 0.7 },
    { id: 16, idKerusakan: 5, idGejala: 9, bobot: 1 }
  ],
  diagnosa: []
};

function ensureDb() {
  if (!existsSync(dbPath)) {
    mkdirSync(dirname(dbPath), { recursive: true });
    writeFileSync(dbPath, JSON.stringify(seed, null, 2));
  }
}

export function readDb() {
  ensureDb();
  return JSON.parse(readFileSync(dbPath, 'utf8'));
}

export function writeDb(db) {
  mkdirSync(dirname(dbPath), { recursive: true });
  writeFileSync(dbPath, JSON.stringify(db, null, 2));
}

export function nextId(items) {
  return items.length ? Math.max(...items.map((item) => Number(item.id))) + 1 : 1;
}
