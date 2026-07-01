<section class="py-14">
  <div class="container-shell">
    <div class="panel p-6 lg:p-8 reveal">
      <h1 class="text-4xl font-black animate-fade-up">Tentang Sistem</h1>
      <p class="mt-4 max-w-3xl leading-7 text-slate-600 animate-fade-up delay-100">
        Sistem pakar ini membantu pengguna mengetahui kemungkinan kerusakan laptop gaming berdasarkan gejala yang dipilih. Metode Case-Based Reasoning membandingkan kasus baru dengan basis kasus lama, lalu mengambil solusi dari kasus dengan nilai kemiripan tertinggi.
      </p>

      <div class="mt-8 grid gap-4 md:grid-cols-4">
        {#each ['Retrieve', 'Reuse', 'Revise', 'Retain'] as step, i}
          <div class="step-card rounded-lg border border-slate-200 bg-slate-50 p-4 reveal" style="transition-delay: {i * 100}ms">
            <h2 class="font-bold">{step}</h2>
          </div>
        {/each}
      </div>
    </div>
  </div>
</section>
