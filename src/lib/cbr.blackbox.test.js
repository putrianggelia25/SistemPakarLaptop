import { describe, expect, it } from 'vitest';
import { calculateSimilarity, retain, revise } from './cbr.js';
import { cloneFixture } from './cbr.fixture.js';

describe('Black-Box & Functional Testing - Modul CBR', () => {
	it('BB-01 menghitung similarity dan mengurutkan ranking kerusakan dari input gejala', () => {
		const db = cloneFixture();
		const result = calculateSimilarity(db, [1, 2, 3]);

		expect(result[0]).toMatchObject({
			id: 1,
			nama: 'Overheating',
			similarity: 1,
			persentase: 100
		});
		expect(result.map((item) => item.nama)).toEqual([
			'Overheating',
			'Kerusakan VGA',
			'Kerusakan RAM'
		]);
	});

	it('BB-02 menghasilkan similarity parsial berdasarkan bobot gejala cocok', () => {
		const db = cloneFixture();
		const result = calculateSimilarity(db, [1, 2]);
		const overheating = result.find((item) => item.id === 1);

		expect(overheating.similarity).toBeCloseTo(1.8 / 2.5, 5);
		expect(overheating.persentase).toBe(72);
	});

	it('BB-03 menghasilkan nilai 0 saat tidak ada gejala yang cocok', () => {
		const db = cloneFixture();
		const result = calculateSimilarity(db, [99]);

		expect(result.every((item) => item.similarity === 0)).toBe(true);
	});

	it('BB-04 menyetujui diagnosa dan menghapus hasil revisi lama jika ada', () => {
		const db = cloneFixture();
		const { db: updatedDb } = revise(db, 3, 'setujui', { catatanRevisi: 'Valid ulang' });
		const diagnosa = updatedDb.diagnosa.find((item) => item.id === 3);

		expect(diagnosa.status).toBe('disetujui');
		expect(diagnosa.catatanRevisi).toBe('Valid ulang');
		expect(diagnosa.hasilRevisi).toBeUndefined();
		expect(diagnosa.idKerusakanRevisi).toBeUndefined();
	});

	it('BB-05 merevisi diagnosa ke kerusakan yang dipilih admin', () => {
		const db = cloneFixture();
		const { db: updatedDb } = revise(db, 1, 'revisi', {
			idKerusakanRevisi: 2,
			catatanRevisi: 'Gejala lebih sesuai RAM'
		});
		const diagnosa = updatedDb.diagnosa.find((item) => item.id === 1);

		expect(diagnosa).toMatchObject({
			status: 'direvisi',
			idKerusakanRevisi: 2,
			hasilRevisi: 'Kerusakan RAM',
			catatanRevisi: 'Gejala lebih sesuai RAM'
		});
	});

	it('BB-06 menolak retain jika diagnosa belum divalidasi', () => {
		const db = cloneFixture();

		expect(() => retain(db, 1)).toThrow('Validasi diagnosa terlebih dahulu.');
	});

	it('BB-07 menyimpan kasus valid ke basis kasus dengan bobot gejala utama 1 dan tambahan 0.8', () => {
		const db = cloneFixture();
		const sebelum = db.basisKasus.length;
		const { db: updatedDb, added } = retain(db, 3);
		const diagnosa = updatedDb.diagnosa.find((item) => item.id === 3);
		const addedCases = updatedDb.basisKasus.slice(sebelum);

		expect(added).toBe(2);
		expect(diagnosa.retained).toBe(true);
		expect(diagnosa.tanggalRetain).toBeTruthy();
		expect(addedCases).toEqual([
			expect.objectContaining({ idKerusakan: 2, idGejala: 7, bobot: 1 }),
			expect.objectContaining({ idKerusakan: 2, idGejala: 8, bobot: 0.8 })
		]);
	});
});
