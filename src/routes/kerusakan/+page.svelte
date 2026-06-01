<script>
  let { data } = $props();
</script>

<section class="py-14">
  <div class="container-shell">
    <h1 class="mb-6 text-4xl font-black">Daftar Kerusakan</h1>
    <div class="grid gap-4 md:grid-cols-2">
      {#each data.kerusakan as item}
        <div class="panel p-6">
          <div class="flex items-start justify-between gap-3">
            <h2 class="text-xl font-bold">{item.kode} - {item.nama}</h2>
            <span class="rounded-full bg-teal-50 px-3 py-1 text-sm font-semibold text-teal-800">{item.tingkat}</span>
          </div>
          <p class="mt-3 leading-7 text-slate-600">{item.penjelasan}</p>
          <p class="mt-3 leading-7 text-slate-600"><strong>Solusi:</strong> {item.solusi}</p>
        </div>
      {/each}
    </div>
  </div>
</section>
