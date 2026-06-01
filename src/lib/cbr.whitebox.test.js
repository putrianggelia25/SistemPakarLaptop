import { describe, expect, it } from 'vitest';
import { calculateSimilarity, retain, revise } from './cbr.js';
import { cloneFixture } from './cbr.fixture.js';

describe('White-Box Testing - Basis Path Modul CBR', () => {
	it('WB-01 jalur calculateSimilarity: total bobot > 0 dan gejala cocok', () => {
		const db = cloneFixture();
		const [best] = calculateSimilarity(db, [1]);

		expect(best.id).toBe(1);
		expect(best.similarity).toBeCloseTo(1 / 2.5, 5);
	});

	it('WB-02 jalur calculateSimilarity: total bobot = 0 menghasilkan similarity 0', () => {
		const db = cloneFixture();
		db.kerusakan.push({ id: 9, kode: 'K09', nama: 'Kasus Tanpa Basis' });

		const result = calculateSimilarity(db, [1]);
		const emptyCase = result.find((item) => item.id === 9);

		expect(emptyCase.similarity).toBe(0);
		expect(emptyCase.persentase).toBe(0);
	});

	it('WB-03 jalur revise: diagnosa tidak ditemukan', () => {
		const db = cloneFixture();

		expect(() => revise(db, 999, 'setujui')).toThrow('Diagnosa tidak ditemukan.');
	});

	it('WB-04 jalur revise: action tidak dikenali', () => {
		const db = cloneFixture();

		expect(() => revise(db, 1, 'hapus')).toThrow('Aksi revisi tidak dikenali.');
	});

	it('WB-05 jalur revise: action revisi tanpa id kerusakan valid', () => {
		const db = cloneFixture();

		expect(() => revise(db, 1, 'revisi', { idKerusakanRevisi: 0 })).toThrow(
			'Pilih kerusakan revisi yang valid.'
		);
	});

	it('WB-06 jalur revise: action revisi dengan id kerusakan tidak ditemukan', () => {
		const db = cloneFixture();

		expect(() => revise(db, 1, 'revisi', { idKerusakanRevisi: 999 })).toThrow(
			'Kerusakan revisi tidak ditemukan.'
		);
	});

	it('WB-07 jalur retain: diagnosa tidak ditemukan', () => {
		const db = cloneFixture();

		expect(() => retain(db, 999)).toThrow('Diagnosa tidak ditemukan.');
	});

	it('WB-08 jalur retain: diagnosa sudah retained mengembalikan added 0', () => {
		const db = cloneFixture();
		const before = db.basisKasus.length;
		const { added } = retain(db, 4);

		expect(added).toBe(0);
		expect(db.basisKasus.length).toBe(before);
	});

	it('WB-09 jalur retain: memakai hasil retrieve teratas jika tidak ada revisi', () => {
		const db = cloneFixture();
		const { added } = retain(db, 2);

		expect(added).toBe(0);
		expect(db.diagnosa.find((item) => item.id === 2).retained).toBe(true);
	});

	it('WB-10 jalur retain: fallback match nama kerusakan ketika results kosong', () => {
		const db = cloneFixture();
		const { db: updatedDb, added } = retain(db, 5);
		const addedCase = updatedDb.basisKasus.at(-1);

		expect(added).toBe(1);
		expect(addedCase).toMatchObject({ idKerusakan: 3, idGejala: 8, bobot: 1 });
	});

	it('WB-11 jalur retain: tidak ada kerusakan final yang bisa di-retain', () => {
		const db = cloneFixture();
		db.diagnosa.push({
			id: 6,
			status: 'disetujui',
			selectedGejala: [7],
			hasilKerusakan: 'Kerusakan Tidak Ada',
			results: []
		});

		expect(() => retain(db, 6)).toThrow('Tidak ada kerusakan yang dapat di-retain.');
	});
});
