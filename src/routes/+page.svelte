<script>
  let { data } = $props();
</script>

<section
  class="min-h-[540px] bg-slate-950 bg-[linear-gradient(90deg,rgba(2,6,23,.92),rgba(15,23,42,.62)),url('https://images.unsplash.com/photo-1603302576837-37561b2e2302?auto=format&fit=crop&w=1800&q=80')] bg-cover bg-center text-white"
>
  <div class="container-shell flex min-h-[540px] flex-col justify-center py-16">
    <p class="mb-3 text-sm font-bold uppercase tracking-[0.22em] text-cyan-300">Case-Based Reasoning</p>
    <h1 class="max-w-4xl text-5xl font-black leading-tight sm:text-6xl">
      Diagnosa Kerusakan Laptop Gaming
    </h1>
    <p class="mt-5 max-w-2xl text-lg text-slate-200">
      Pilih gejala yang dialami, lalu sistem membandingkannya dengan basis kasus lama untuk menemukan kerusakan paling mirip beserta solusi perbaikan.
    </p>
    <div class="mt-8">
      <a class="btn-primary" href="/diagnosa">Mulai Diagnosa</a>
    </div>
  </div>
</section>

<section class="py-16">
  <div class="container-shell">
    <div class="grid gap-4 md:grid-cols-3">
      <div class="panel p-6">
        <div class="text-4xl font-black">{data.stats.diagnosa}</div>
        <div class="mt-1 text-sm text-slate-500">Total diagnosa</div>
      </div>
      <div class="panel p-6">
        <div class="text-4xl font-black">{data.stats.gejala}</div>
        <div class="mt-1 text-sm text-slate-500">Data gejala</div>
      </div>
      <div class="panel p-6">
        <div class="text-4xl font-black">{data.stats.kerusakan}</div>
        <div class="mt-1 text-sm text-slate-500">Data kerusakan</div>
      </div>
    </div>

    <div class="mt-10 grid gap-4 md:grid-cols-4">
      {#each ['Retrieve', 'Reuse', 'Revise', 'Retain'] as step, index}
        <div class="panel p-6">
          <div class="mb-4 grid h-11 w-11 place-items-center rounded-md bg-teal-50 font-black text-brand">
            {index + 1}
          </div>
          <h2 class="text-lg font-bold">{step}</h2>
          <p class="mt-2 text-sm leading-6 text-slate-600">
            {#if step === 'Retrieve'}Mencari kasus lama yang paling mirip.
            {:else if step === 'Reuse'}Menggunakan solusi dari kasus terdekat.
            {:else if step === 'Revise'}Solusi dapat ditinjau ulang admin.
            {:else}Riwayat disimpan untuk evaluasi sistem.
            {/if}
          </p>
        </div>
      {/each}
    </div>
  </div>
</section>
