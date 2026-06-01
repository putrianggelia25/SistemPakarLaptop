# Pengujian Vitest

Pengujian dilakukan menggunakan Vitest untuk memverifikasi fungsi inti metode Case-Based Reasoning (CBR) secara otomatis.

## Black-Box & Functional Testing

Pengujian black-box berfokus pada input dan output tanpa melihat detail implementasi internal.

| Kode | Fungsi | Input | Output yang Diharapkan |
| --- | --- | --- | --- |
| BB-01 | `calculateSimilarity` | Gejala `[1, 2, 3]` | Ranking tertinggi adalah `Overheating` dengan similarity `100%` |
| BB-02 | `calculateSimilarity` | Gejala `[1, 2]` | Similarity `Overheating` bernilai `72%` |
| BB-03 | `calculateSimilarity` | Gejala tidak dikenal `[99]` | Semua similarity bernilai `0` |
| BB-04 | `revise` | Aksi `setujui` | Status diagnosa menjadi `disetujui` |
| BB-05 | `revise` | Aksi `revisi` ke Kerusakan RAM | Status menjadi `direvisi` dan hasil revisi tersimpan |
| BB-06 | `retain` | Diagnosa `pending` | Sistem menolak retain |
| BB-07 | `retain` | Diagnosa valid | Kasus baru masuk ke basis kasus |

## White-Box Basis Path Testing

Pengujian white-box membedah jalur logika internal pada fungsi CBR.

| Kode | Jalur Logika | Kondisi yang Diuji |
| --- | --- | --- |
| WB-01 | `calculateSimilarity` | `totalBobot > 0` dan ada gejala cocok |
| WB-02 | `calculateSimilarity` | `totalBobot = 0` |
| WB-03 | `revise` | Diagnosa tidak ditemukan |
| WB-04 | `revise` | Aksi tidak dikenali |
| WB-05 | `revise` | Revisi tanpa id kerusakan valid |
| WB-06 | `revise` | Revisi dengan id kerusakan tidak ditemukan |
| WB-07 | `retain` | Diagnosa tidak ditemukan |
| WB-08 | `retain` | Diagnosa sudah pernah di-retain |
| WB-09 | `retain` | Retain memakai hasil retrieve tertinggi |
| WB-10 | `retain` | Retain fallback berdasarkan nama kerusakan saat `results` kosong |
| WB-11 | `retain` | Tidak ada kerusakan final yang bisa di-retain |

## Perintah Pengujian

```bash
npm run test
```
