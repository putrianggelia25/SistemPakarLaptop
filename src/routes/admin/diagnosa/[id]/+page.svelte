<script>
  import { enhance } from '$app/forms';
  import { formatDate, formatPercent } from '$lib/format.js';

  let { data, form } = $props();
  let diagnosa = $derived(data.diagnosa);
  let kerusakan = $derived(data.kerusakan);
  let showRevisiForm = $state(false);

  const statusMap = {
    pending: {
      label: 'Menunggu Validasi',
      cls: 'bg-amber-50 text-amber-700 border-amber-200'
    },
    disetujui: {
      label: 'Disetujui',
      cls: 'bg-teal-50 text-teal-700 border-teal-200'
    },
    direvisi: {
      label: 'Direvisi',
      cls: 'bg-blue-50 text-blue-700 border-blue-200'
    }
  };

  let statusInfo = $derived(statusMap[diagnosa.status] ?? statusMap.pending);
  let canRetain = $derived(diagnosa.status === 'disetujui' || diagnosa.status === 'direvisi');
</script>

<section class="py-14">
  <div class="container-shell max-w-4xl">
    <div class="mb-6 flex flex-col justify-between gap-3 md:flex-row md:items-center animate-fade-up">
      <div>
        <a class="text-sm text-slate-500 link-hover" href="/admin/diagnosa">Kembali ke Laporan</a>
        <h1 class="mt-1 text-3xl font-black">Detail Diagnosa #{diagnosa.id}</h1>
        <p class="mt-1 text-slate-600">{diagnosa.namaUser} - {formatDate(diagnosa.tanggal)}</p>
      </div>
      <span class="inline-flex items-center gap-1.5 self-start rounded-full border px-3 py-1.5 text-sm font-semibold tag-pill {statusInfo.cls}">
        <span
          class="h-2 w-2 rounded-full {diagnosa.status === 'pending'
            ? 'bg-amber-400'
            : diagnosa.status === 'disetujui'
              ? 'bg-teal-400'
              : 'bg-blue-400'}"
        ></span>
        {statusInfo.label}
      </span>
    </div>

    {#if form?.message}
      <div class="mb-4 rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700 animate-fade-down">
        {form.message}
      </div>
    {/if}
    {#if form?.success}
      <div class="mb-4 rounded-md border border-teal-200 bg-teal-50 px-4 py-3 text-sm text-teal-700 animate-fade-down">
        {#if form.action === 'setujui'}Diagnosa berhasil disetujui.
        {:else if form.action === 'revisi'}Diagnosa berhasil direvisi.
        {:else if form.action === 'retain'}{form.added} gejala baru berhasil disimpan ke basis kasus.
        {/if}
      </div>
    {/if}

    <div class="grid gap-6 lg:grid-cols-3">
      <div class="space-y-6 lg:col-span-2">
        <div class="panel p-6 reveal">
          <h2 class="mb-4 text-lg font-bold">Hasil CBR System</h2>
          <div class="grid gap-4 sm:grid-cols-2">
            <div>
              <p class="text-xs font-semibold uppercase tracking-wide text-slate-500">Hasil Sistem (Reuse)</p>
              <p class="mt-1 text-xl font-black">{diagnosa.hasilKerusakan}</p>
              <p class="mt-1 text-2xl font-black text-brand stat-number">{formatPercent(diagnosa.nilaiSimilarity)}</p>
            </div>
            {#if diagnosa.status === 'direvisi'}
              <div class="rounded-lg bg-blue-50 p-4 animate-scale-in">
                <p class="text-xs font-semibold uppercase tracking-wide text-blue-500">Hasil Revisi Admin</p>
                <p class="mt-1 text-xl font-black text-blue-800">{diagnosa.hasilRevisi}</p>
                {#if diagnosa.catatanRevisi}
                  <p class="mt-2 text-sm italic text-blue-600">"{diagnosa.catatanRevisi}"</p>
                {/if}
              </div>
            {/if}
          </div>

          <h3 class="mb-2 mt-6 font-semibold text-slate-700">Perbandingan Retrieve</h3>
          <div class="table-wrap">
            <table class="table text-sm">
              <thead>
                <tr><th>Kerusakan</th><th>Similarity</th><th>Tingkat</th></tr>
              </thead>
              <tbody>
                {#each diagnosa.results as row, i}
                  <tr class="animate-fade-up {row.id === (diagnosa.idKerusakanRevisi ?? diagnosa.idKerusakanHasil ?? diagnosa.results[0]?.id) ? 'bg-teal-50 font-semibold' : ''}" style="animation-delay: {i * 60}ms">
                    <td>{row.nama}</td>
                    <td>{formatPercent(row.similarity)}</td>
                    <td>{row.tingkat}</td>
                  </tr>
                {/each}
              </tbody>
            </table>
          </div>
        </div>

        <div class="panel p-6 reveal" style="transition-delay: 100ms">
          <h2 class="mb-3 font-bold">Gejala Dipilih User</h2>
          <div class="flex flex-wrap gap-2">
            {#each diagnosa.gejalaDipilih as item, i}
              <span class="rounded-full bg-slate-100 px-3 py-1 text-sm font-semibold text-slate-700 tag-pill animate-scale-in" style="animation-delay: {i * 50}ms">
                {item.kode} - {item.nama}
              </span>
            {/each}
          </div>
          {#if diagnosa.catatan}
            <div class="mt-4">
              <p class="text-xs font-semibold uppercase tracking-wide text-slate-500">Catatan User</p>
              <p class="mt-1 rounded-lg bg-slate-50 p-3 text-sm text-slate-700">{diagnosa.catatan}</p>
            </div>
          {/if}
          {#if diagnosa.gambar}
            <div class="mt-4">
              <p class="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-500">Dokumentasi Gambar</p>
              <img class="max-h-64 rounded-lg border object-contain transition-transform duration-500 hover:scale-[1.02]" src={diagnosa.gambar} alt="Dokumentasi" />
            </div>
          {/if}
        </div>
      </div>

      <div class="space-y-4">
        {#if diagnosa.status === 'pending' || diagnosa.status === 'disetujui'}
          <div class="panel p-5 reveal" style="transition-delay: 150ms">
            <h3 class="mb-1 font-bold text-teal-700">Setujui Hasil</h3>
            <p class="mb-3 text-xs text-slate-500">Konfirmasi bahwa hasil sistem sudah benar.</p>
            <form method="POST" action="?/setujui" use:enhance>
              <input type="hidden" name="catatanRevisi" value="" />
              <button
                class="w-full rounded-lg bg-teal-600 px-4 py-2.5 text-sm font-semibold text-white transition-all duration-300 hover:bg-teal-700 hover:shadow-lg hover:-translate-y-0.5 disabled:opacity-50 disabled:hover:translate-y-0 disabled:hover:shadow-none"
                disabled={diagnosa.status === 'disetujui'}
              >
                {diagnosa.status === 'disetujui' ? 'Sudah Disetujui' : 'Setujui Diagnosa'}
              </button>
            </form>
          </div>
        {/if}

        {#if diagnosa.status !== 'disetujui'}
          <div class="panel p-5 reveal" style="transition-delay: 200ms">
            <h3 class="mb-1 font-bold text-blue-700">Revisi Hasil</h3>
            <p class="mb-3 text-xs text-slate-500">Koreksi jika hasil sistem kurang tepat.</p>

            <button
              class="mb-3 w-full rounded-lg border border-blue-300 px-4 py-2 text-sm font-semibold text-blue-700 transition-all duration-300 hover:bg-blue-50 hover:-translate-y-0.5"
              onclick={() => (showRevisiForm = !showRevisiForm)}
            >
              {showRevisiForm ? 'Tutup Form' : 'Buka Form Revisi'}
            </button>

            {#if showRevisiForm}
              <form method="POST" action="?/revisi" use:enhance class="space-y-3 animate-scale-in">
                <div>
                  <label class="label text-xs" for="idKerusakanRevisi">Kerusakan yang Benar</label>
                  <select class="input" id="idKerusakanRevisi" name="idKerusakanRevisi" required>
                    <option value="">-- Pilih kerusakan --</option>
                    {#each kerusakan as item}
                      <option value={item.id} selected={item.id === diagnosa.idKerusakanRevisi}>
                        {item.kode} - {item.nama}
                      </option>
                    {/each}
                  </select>
                </div>
                <div>
                  <label class="label text-xs" for="catatanRevisi">Catatan Revisi (opsional)</label>
                  <textarea
                    class="input min-h-20 text-sm"
                    id="catatanRevisi"
                    name="catatanRevisi"
                    placeholder="Alasan koreksi..."
                  >{diagnosa.catatanRevisi ?? ''}</textarea>
                </div>
                <button class="w-full rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white transition-all duration-300 hover:bg-blue-700 hover:shadow-lg hover:-translate-y-0.5">
                  Simpan Revisi
                </button>
              </form>
            {/if}
          </div>
        {/if}

        <div class="panel p-5 reveal {diagnosa.retained ? 'opacity-60' : ''}" style="transition-delay: 250ms">
          <h3 class="mb-1 font-bold text-purple-700">Retain ke Basis Kasus</h3>
          <p class="mb-3 text-xs text-slate-500">
            {#if diagnosa.retained}
              Kasus ini sudah disimpan ke basis kasus pada {formatDate(diagnosa.tanggalRetain)}.
            {:else if !canRetain}
              Validasi hasil diagnosa terlebih dahulu sebelum retain.
            {:else}
              Simpan gejala dan kerusakan ini agar sistem semakin pintar. Kerusakan yang disimpan:
              <strong>{diagnosa.hasilRevisi ?? diagnosa.hasilKerusakan}</strong>.
            {/if}
          </p>
          <form method="POST" action="?/retain" use:enhance>
            <button
              class="w-full rounded-lg bg-purple-600 px-4 py-2.5 text-sm font-semibold text-white transition-all duration-300 hover:bg-purple-700 hover:shadow-lg hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:translate-y-0 disabled:hover:shadow-none"
              disabled={diagnosa.retained || !canRetain}
            >
              {diagnosa.retained ? 'Sudah Di-retain' : 'Retain ke Basis Kasus'}
            </button>
          </form>
        </div>

        {#if diagnosa.retained}
          <div class="rounded-lg border border-purple-200 bg-purple-50 p-4 text-xs text-purple-700 animate-scale-in">
            <p class="font-semibold">Kasus sudah di-retain</p>
            <p class="mt-1">Gejala dari diagnosa ini sudah masuk ke basis kasus dan akan mempengaruhi diagnosa berikutnya.</p>
          </div>
        {/if}
      </div>
    </div>
  </div>
</section>
