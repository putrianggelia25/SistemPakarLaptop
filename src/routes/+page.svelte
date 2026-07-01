<script>
  let { data } = $props();
</script>

<!-- Hero Section -->
<section
  class="relative min-h-[540px] overflow-hidden bg-slate-950 bg-[linear-gradient(90deg,rgba(2,6,23,.92),rgba(15,23,42,.62)),url('https://images.unsplash.com/photo-1603302576837-37561b2e2302?auto=format&fit=crop&w=1800&q=80')] bg-cover bg-center text-white"
>
  <!-- Animated background glow -->
  <div class="absolute inset-0 overflow-hidden pointer-events-none">
    <div class="absolute -top-40 -right-40 h-80 w-80 rounded-full bg-teal-500/10 blur-3xl animate-pulse_soft"></div>
    <div class="absolute -bottom-20 -left-20 h-60 w-60 rounded-full bg-cyan-500/10 blur-3xl animate-pulse_soft" style="animation-delay: 1s"></div>
  </div>

  <div class="container-shell relative flex min-h-[540px] flex-col justify-center py-16">
    <p class="hero-badge mb-3 text-sm font-bold uppercase tracking-[0.22em] text-cyan-300">Case-Based Reasoning</p>
    <h1 class="hero-title max-w-4xl text-5xl font-black leading-tight sm:text-6xl animate-fade-up">
      Diagnosa Kerusakan Laptop Gaming
    </h1>
    <p class="hero-desc mt-5 max-w-2xl text-lg text-slate-200">
      Pilih gejala yang dialami, lalu sistem membandingkannya dengan basis kasus lama untuk menemukan kerusakan paling mirip beserta solusi perbaikan.
    </p>
    <div class="hero-cta mt-8">
      <a class="btn-primary text-base px-6 py-3" href="/diagnosa">Mulai Diagnosa</a>
    </div>
  </div>
</section>

<!-- Stats Section -->
<section class="py-16">
  <div class="container-shell">
    <div class="grid gap-4 md:grid-cols-3">
      <div class="panel stat-card p-6 reveal" style="transition-delay: 0ms">
        <div class="stat-number text-4xl font-black">{data.stats.diagnosa}</div>
        <div class="mt-1 text-sm text-slate-500">Total diagnosa</div>
      </div>
      <div class="panel stat-card p-6 reveal" style="transition-delay: 100ms">
        <div class="stat-number text-4xl font-black">{data.stats.gejala}</div>
        <div class="mt-1 text-sm text-slate-500">Data gejala</div>
      </div>
      <div class="panel stat-card p-6 reveal" style="transition-delay: 200ms">
        <div class="stat-number text-4xl font-black">{data.stats.kerusakan}</div>
        <div class="mt-1 text-sm text-slate-500">Data kerusakan</div>
      </div>
    </div>

    <!-- CBR Steps -->
    <div class="mt-10 grid gap-4 md:grid-cols-4">
      {#each ['Retrieve', 'Reuse', 'Revise', 'Retain'] as step, index}
        <div class="panel step-card p-6 reveal" style="transition-delay: {index * 120}ms">
          <div class="mb-4 grid h-11 w-11 place-items-center rounded-md bg-teal-50 font-black text-brand transition-transform duration-300 group-hover:scale-110">
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
