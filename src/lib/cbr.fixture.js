export function createCbrFixture() {
	return {
		kerusakan: [
			{
				id: 1,
				kode: 'K01',
				nama: 'Overheating',
				penjelasan: 'Suhu laptop terlalu tinggi.',
				solusi: 'Bersihkan kipas dan ganti thermal paste.',
				tingkat: 'Sedang'
			},
			{
				id: 2,
				kode: 'K02',
				nama: 'Kerusakan RAM',
				penjelasan: 'RAM bermasalah.',
				solusi: 'Bersihkan atau ganti RAM.',
				tingkat: 'Sedang'
			},
			{
				id: 3,
				kode: 'K03',
				nama: 'Kerusakan VGA',
				penjelasan: 'GPU/VGA bermasalah.',
				solusi: 'Periksa driver dan hardware VGA.',
				tingkat: 'Berat'
			}
		],
		basisKasus: [
			{ id: 1, idKerusakan: 1, idGejala: 1, bobot: 1 },
			{ id: 2, idKerusakan: 1, idGejala: 2, bobot: 0.8 },
			{ id: 3, idKerusakan: 1, idGejala: 3, bobot: 0.7 },
			{ id: 4, idKerusakan: 2, idGejala: 4, bobot: 1 },
			{ id: 5, idKerusakan: 2, idGejala: 5, bobot: 0.5 },
			{ id: 6, idKerusakan: 3, idGejala: 2, bobot: 0.6 },
			{ id: 7, idKerusakan: 3, idGejala: 6, bobot: 1 }
		],
		diagnosa: [
			{
				id: 1,
				namaUser: 'User Pending',
				status: 'pending',
				gejalaUtama: 1,
				selectedGejala: [1, 2],
				hasilKerusakan: 'Overheating',
				nilaiSimilarity: 0.72,
				results: [{ id: 1, nama: 'Overheating', similarity: 0.72 }]
			},
			{
				id: 2,
				namaUser: 'User Disetujui',
				status: 'disetujui',
				gejalaUtama: 1,
				selectedGejala: [1, 2, 3],
				hasilKerusakan: 'Overheating',
				nilaiSimilarity: 1,
				results: [{ id: 1, nama: 'Overheating', similarity: 1 }]
			},
			{
				id: 3,
				namaUser: 'User Direvisi',
				status: 'direvisi',
				idKerusakanRevisi: 2,
				hasilRevisi: 'Kerusakan RAM',
				gejalaUtama: 7,
				selectedGejala: [7, 8],
				hasilKerusakan: 'Overheating',
				nilaiSimilarity: 0.2,
				results: [{ id: 1, nama: 'Overheating', similarity: 0.2 }]
			},
			{
				id: 4,
				namaUser: 'User Retained',
				status: 'disetujui',
				retained: true,
				gejalaUtama: 1,
				selectedGejala: [1],
				hasilKerusakan: 'Overheating',
				results: [{ id: 1, nama: 'Overheating', similarity: 1 }]
			},
			{
				id: 5,
				namaUser: 'Tanpa Results',
				status: 'disetujui',
				gejalaUtama: 8,
				selectedGejala: [8],
				hasilKerusakan: 'Kerusakan VGA',
				results: []
			}
		]
	};
}

export function cloneFixture() {
	return structuredClone(createCbrFixture());
}
