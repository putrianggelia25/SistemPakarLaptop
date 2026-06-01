<script>
  import { formatDate, formatPercent } from '$lib/format.js';

  let { data } = $props();
</script>

<section class="py-14">
  <div class="container-shell">
    <h1 class="mb-6 text-4xl font-black">Riwayat Diagnosa</h1>
    <div class="table-wrap">
      <table class="table">
        <thead>
          <tr><th>Tanggal</th><th>Nama</th><th>Hasil</th><th>Similarity</th><th></th></tr>
        </thead>
        <tbody>
          {#each data.diagnosa as row}
            <tr>
              <td>{formatDate(row.tanggal)}</td>
              <td>{row.namaUser}</td>
              <td>{row.hasilKerusakan}</td>
              <td>{formatPercent(row.nilaiSimilarity)}</td>
              <td><a class="font-semibold text-brand" href={`/hasil/${row.id}`}>Detail</a></td>
            </tr>
          {:else}
            <tr><td colspan="5">Belum ada riwayat diagnosa.</td></tr>
          {/each}
        </tbody>
      </table>
    </div>
  </div>
</section>
