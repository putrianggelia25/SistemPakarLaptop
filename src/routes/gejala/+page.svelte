<script>
  let { data } = $props();
</script>

<section class="py-14">
  <div class="container-shell">
    <h1 class="mb-6 text-4xl font-black animate-fade-up">Daftar Gejala</h1>
    <div class="grid gap-4 md:grid-cols-2">
      {#each data.gejala as item, i}
        <div class="panel p-5 reveal" style="transition-delay: {i * 60}ms">
          <strong>{item.kode}</strong>
          <p class="mt-1 text-slate-600">{item.nama}</p>
        </div>
      {/each}
    </div>
  </div>
</section>
