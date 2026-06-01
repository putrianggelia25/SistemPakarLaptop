# Sistem Pakar Diagnosa Kerusakan Laptop Gaming

Aplikasi web SvelteKit, Node.js, dan Tailwind CSS untuk diagnosa kerusakan laptop gaming menggunakan metode Case-Based Reasoning (CBR).

## Fitur

- Halaman beranda, diagnosa, hasil diagnosa, riwayat, gejala, kerusakan, dan tentang sistem.
- Admin login sederhana.
- Admin dapat mengelola data gejala, kerusakan/solusi, basis kasus, dan laporan diagnosa.
- Diagnosa bertahap: user memilih gejala utama, lalu sistem menampilkan pertanyaan lanjutan dari basis kasus.
- Upload gambar kerusakan sebagai dokumentasi diagnosa.
- Admin dapat melakukan validasi hasil melalui fase Revise dan menyimpan kasus valid melalui fase Retain.
- Dashboard admin menampilkan statistik kerusakan dan grafik diagnosa bulanan.
- Perhitungan similarity CBR:

```text
Similarity = jumlah bobot gejala cocok / jumlah total bobot kasus kerusakan
```

## Menjalankan Project

```bash
npm install
npm run dev
```

Lalu buka alamat yang muncul di terminal, biasanya:

```text
http://127.0.0.1:5173
```

Login admin:

```text
Username: admin
Password: admin123
```

## Pengujian

Project ini menyediakan pengujian otomatis berbasis Vitest untuk modul CBR.

```bash
npm run test
npm run check
npm run build
```

Dokumentasi skenario pengujian tersedia di `docs/pengujian-vitest.md`.

## Struktur Utama

```text
src/routes/          Halaman SvelteKit
src/lib/cbr.js       Logika CBR: Retrieve, Reuse, Revise, Retain
src/lib/*.test.js    Pengujian Vitest black-box dan white-box
src/lib/server/      Penyimpanan data JSON dan autentikasi admin
data/db.json         Data gejala, kerusakan, basis kasus, dan riwayat
docs/                Dokumentasi pengujian
```

Data disimpan dalam file JSON agar mudah dipakai untuk demo dan tugas akhir. Untuk produksi, bagian `src/lib/server/store.js` bisa diganti menjadi database seperti MySQL atau PostgreSQL.

## Alur CBR

1. **Retrieve**: sistem membandingkan gejala kasus baru dengan basis kasus lama.
2. **Reuse**: sistem mengambil solusi dari kerusakan dengan similarity tertinggi.
3. **Revise**: admin memvalidasi atau mengoreksi hasil diagnosa.
4. **Retain**: kasus yang sudah divalidasi disimpan kembali ke basis kasus.
