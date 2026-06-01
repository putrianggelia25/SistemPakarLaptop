
export function calculateSimilarity(db, selectedGejalaIds) {
	const selected = new Set(selectedGejalaIds.map(String));

	return db.kerusakan
		.map((kerusakan) => {
			const kasus = db.basisKasus.filter((item) => item.idKerusakan === kerusakan.id);
			const totalBobot = kasus.reduce((total, item) => total + Number(item.bobot), 0);
			const bobotCocok = kasus.reduce((total, item) => {
				return selected.has(String(item.idGejala)) ? total + Number(item.bobot) : total;
			}, 0);
			const similarity = totalBobot > 0 ? bobotCocok / totalBobot : 0;

			return {
				...kerusakan,
				similarity,
				persentase: Number((similarity * 100).toFixed(2))
			};
		})
		.sort((a, b) => b.similarity - a.similarity);
}

export function revise(db, diagnosaId, action, opts = {}) {
	const id = Number(diagnosaId);
	const diagnosa = (db.diagnosa || []).find((d) => Number(d.id) === id);
	if (!diagnosa) throw new Error('Diagnosa tidak ditemukan.');

	if (action === 'setujui') {
		diagnosa.status = 'disetujui';
		diagnosa.catatanRevisi = String(opts.catatanRevisi ?? '');
		delete diagnosa.hasilRevisi;
		delete diagnosa.idKerusakanRevisi;
	} else if (action === 'revisi') {
		const idKerusakanRevisi = Number(opts.idKerusakanRevisi);
		if (!idKerusakanRevisi) throw new Error('Pilih kerusakan revisi yang valid.');
		const ker = (db.kerusakan || []).find((k) => Number(k.id) === idKerusakanRevisi);
		if (!ker) throw new Error('Kerusakan revisi tidak ditemukan.');

		diagnosa.status = 'direvisi';
		diagnosa.idKerusakanRevisi = idKerusakanRevisi;
		diagnosa.hasilRevisi = ker.nama;
		diagnosa.catatanRevisi = String(opts.catatanRevisi ?? '');
	} else {
		throw new Error('Aksi revisi tidak dikenali.');
	}

	return { db };
}

export function retain(db, diagnosaId) {
	const id = Number(diagnosaId);
	const diagnosa = (db.diagnosa || []).find((d) => Number(d.id) === id);
	if (!diagnosa) throw new Error('Diagnosa tidak ditemukan.');
	if (!['disetujui', 'direvisi'].includes(diagnosa.status)) {
		throw new Error('Validasi diagnosa terlebih dahulu.');
	}
	if (diagnosa.retained) return { db, added: 0 };

	// Pilih id kerusakan final (revisi jika ada, atau hasil retrieve teratas)
	let idKerusakan = diagnosa.idKerusakanRevisi ?? null;
	if (!idKerusakan) {
		if (Array.isArray(diagnosa.results) && diagnosa.results.length) {
			idKerusakan = diagnosa.results[0].id;
		} else {
			const match = (db.kerusakan || []).find((k) => k.nama === diagnosa.hasilRevisi || k.nama === diagnosa.hasilKerusakan);
			idKerusakan = match ? match.id : null;
		}
	}
	if (!idKerusakan) throw new Error('Tidak ada kerusakan yang dapat di-retain.');

	db.basisKasus = db.basisKasus || [];
	const existing = db.basisKasus;
	let nextId = existing.length ? Math.max(...existing.map((i) => Number(i.id))) + 1 : 1;
	let added = 0;

	const selected = Array.isArray(diagnosa.selectedGejala) ? diagnosa.selectedGejala : [];
	const utama = diagnosa.gejalaUtama;

	for (const g of selected) {
		const found = existing.find((b) => Number(b.idKerusakan) === Number(idKerusakan) && Number(b.idGejala) === Number(g));
		if (found) continue;
		const bobot = Number(g) === Number(utama) ? 1 : 0.8;
		existing.push({ id: nextId++, idKerusakan: Number(idKerusakan), idGejala: Number(g), bobot });
		added++;
	}

	diagnosa.retained = true;
	diagnosa.tanggalRetain = new Date().toISOString();

	return { db, added };
}

