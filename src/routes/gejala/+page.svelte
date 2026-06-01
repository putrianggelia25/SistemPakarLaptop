<script>
  let { data } = $props();
</script>

<section class="py-14">
  <div class="container-shell">
    <h1 class="mb-6 text-4xl font-black">Daftar Gejala</h1>
    <div class="grid gap-4 md:grid-cols-2">
      {#each data.gejala as item}
        <div class="panel p-5">
          <strong>{item.kode}</strong>
          <p class="mt-1 text-slate-600">{item.nama}</p>
        </div>
      {/each}
    </div>
  </div>
</section>
