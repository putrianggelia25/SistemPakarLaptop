<script>
	export let data;
	import { formatDate, formatPercent } from '$lib/format.js';
	const diagnosa = data.diagnosa;
	const best = diagnosa.results && diagnosa.results.length ? diagnosa.results[0] : null;
</script>

<section class="py-14">
	<div class="container-shell">
		<div class="panel p-6 lg:p-8 animate-scale-in">
			<div class="flex flex-col justify-between gap-6 md:flex-row">
				<div class="animate-fade-up delay-100">
					<p class="text-sm text-slate-500">Hasil diagnosa untuk {diagnosa.namaUser}</p>
					<h1 class="mt-1 text-4xl font-black">{diagnosa.hasilKerusakan}</h1>
					<p class="mt-2 text-sm text-slate-500">{formatDate(diagnosa.tanggal)}</p>
				</div>
				<div class="md:text-right animate-fade-up delay-200">
					<div class="text-5xl font-black text-brand stat-number">{formatPercent(diagnosa.nilaiSimilarity)}</div>
					{#if best}
						<span class="mt-2 inline-flex rounded-full bg-teal-50 px-3 py-1 text-sm font-semibold text-teal-800 tag-pill">Tingkat: {best.tingkat}</span>
					{/if}
				</div>
			</div>

			{#if best}
				<div class="mt-6 h-3 overflow-hidden rounded-full bg-slate-100">
					<div class="h-full rounded-full bg-brand bar-animated" style="width: {diagnosa.nilaiSimilarity * 100}%"></div>
				</div>

				<div class="mt-6 grid gap-6 lg:grid-cols-2">
					<div class="reveal" style="transition-delay: 100ms">
						<h2 class="font-bold">Penjelasan</h2>
						<p class="mt-2 leading-7 text-slate-600">{best.penjelasan}</p>
					</div>
					<div class="reveal" style="transition-delay: 200ms">
						<h2 class="font-bold">Solusi Perbaikan</h2>
						<p class="mt-2 leading-7 text-slate-600">{best.solusi}</p>
					</div>
				</div>
			{/if}

			{#if diagnosa.gambar || diagnosa.catatan}
				<div class="mt-6 grid gap-6 lg:grid-cols-2">
					{#if diagnosa.gambar}
						<div class="reveal" style="transition-delay: 250ms">
							<h2 class="mb-3 font-bold">Dokumentasi Gambar</h2>
							<img class="max-h-80 w-full rounded-lg border border-slate-200 object-contain transition-transform duration-500 hover:scale-[1.02]" src={diagnosa.gambar} alt="Dokumentasi kerusakan laptop" />
						</div>
					{/if}
					{#if diagnosa.catatan}
						<div class="reveal" style="transition-delay: 300ms">
							<h2 class="font-bold">Catatan Pengguna</h2>
							<p class="mt-2 rounded-lg bg-slate-50 p-4 leading-7 text-slate-600">{diagnosa.catatan}</p>
						</div>
					{/if}
				</div>
			{/if}

			<div class="mt-8 reveal" style="transition-delay: 200ms">
				<h3 class="mb-3 font-semibold">Gejala Dipilih</h3>
				<div class="flex flex-wrap gap-2">
					{#each diagnosa.gejalaDipilih as g, i}
						<span class="rounded-full bg-slate-100 px-3 py-1 text-sm font-semibold text-slate-700 tag-pill animate-scale-in" style="animation-delay: {i * 60}ms">{g.kode} — {g.nama}</span>
					{/each}
				</div>
			</div>

			<div class="mt-8 reveal" style="transition-delay: 300ms">
				<h3 class="mb-3 font-semibold">Perbandingan Retrieve</h3>
				<div class="table-wrap">
					<table class="table text-sm">
						<thead><tr><th>Kerusakan</th><th>Similarity</th><th>Tingkat</th></tr></thead>
						<tbody>
							{#each diagnosa.results as row, i}
								<tr class="animate-fade-up" style="animation-delay: {i * 80}ms">
									<td>{row.nama}</td>
									<td>{formatPercent(row.similarity)}</td>
									<td>{row.tingkat}</td>
								</tr>
							{/each}
						</tbody>
					</table>
				</div>
			</div>

			<div class="no-print mt-8 flex flex-wrap gap-3 animate-fade-up delay-400">
				<a class="btn-secondary" href="/diagnosa">Diagnosa Lagi</a>
				<button class="btn-primary" type="button" on:click={() => window.print()}>Cetak PDF</button>
			</div>
		</div>
	</div>
</section>
