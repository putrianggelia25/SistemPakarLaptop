<script>
  import { formatDate, formatPercent } from '$lib/format.js';

  let { data } = $props();

  const statusMap = {
    pending: { label: 'Pending', cls: 'bg-amber-50 text-amber-700' },
    disetujui: { label: 'Disetujui', cls: 'bg-teal-50 text-teal-700' },
    direvisi: { label: 'Direvisi', cls: 'bg-blue-50 text-blue-700' }
  };
</script>

<section class="py-14">
  <div class="container-shell">
    <div class="mb-6 flex flex-col justify-between gap-3 md:flex-row md:items-center">
      <div>
        <h1 class="text-4xl font-black">Laporan Diagnosa</h1>
        <p class="mt-2 text-slate-600">Riwayat diagnosa dan status validasi CBR.</p>
      </div>
      <a class="btn-secondary" href="/admin/dashboard">Dashboard</a>
    </div>

    <div class="mb-6 grid grid-cols-2 gap-3 md:grid-cols-5">
      <div class="panel p-4 text-center">
        <div class="text-2xl font-black">{data.stats.total}</div>
        <div class="mt-1 text-xs text-slate-500">Total</div>
      </div>
      <div class="panel border-amber-200 p-4 text-center">
        <div class="text-2xl font-black text-amber-600">{data.stats.pending}</div>
        <div class="mt-1 text-xs text-slate-500">Pending</div>
      </div>
      <div class="panel border-teal-200 p-4 text-center">
        <div class="text-2xl font-black text-teal-600">{data.stats.disetujui}</div>
        <div class="mt-1 text-xs text-slate-500">Disetujui</div>
      </div>
      <div class="panel border-blue-200 p-4 text-center">
        <div class="text-2xl font-black text-blue-600">{data.stats.direvisi}</div>
        <div class="mt-1 text-xs text-slate-500">Direvisi</div>
      </div>
      <div class="panel border-purple-200 p-4 text-center">
        <div class="text-2xl font-black text-purple-600">{data.stats.retained}</div>
        <div class="mt-1 text-xs text-slate-500">Retained</div>
      </div>
    </div>

    <div class="table-wrap">
      <table class="table">
        <thead>
          <tr>
            <th>Tanggal</th>
            <th>Nama User</th>
            <th>Hasil Sistem</th>
            <th>Similarity</th>
            <th>Status</th>
            <th>Retained</th>
            <th>Aksi</th>
          </tr>
        </thead>
        <tbody>
          {#each data.diagnosa as row}
            <tr>
              <td>{formatDate(row.tanggal)}</td>
              <td>{row.namaUser}</td>
              <td>
                {row.hasilRevisi
                  ? `${row.hasilRevisi} (rev. dari ${row.hasilKerusakan})`
                  : row.hasilKerusakan}
              </td>
              <td>{formatPercent(row.nilaiSimilarity)}</td>
              <td>
                <span class="rounded-full px-2 py-0.5 text-xs font-semibold {(statusMap[row.status] ?? statusMap.pending).cls}">
                  {(statusMap[row.status] ?? statusMap.pending).label}
                </span>
              </td>
              <td>
                {#if row.retained}
                  <span class="text-xs font-semibold text-purple-600">Ya</span>
                {:else}
                  <span class="text-xs text-slate-400">-</span>
                {/if}
              </td>
              <td>
                <a class="text-sm font-semibold text-brand hover:underline" href="/admin/diagnosa/{row.id}">
                  Detail / Validasi
                </a>
              </td>
            </tr>
          {:else}
            <tr><td colspan="7">Belum ada data diagnosa.</td></tr>
          {/each}
        </tbody>
      </table>
    </div>
  </div>
</section>
