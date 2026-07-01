<script>
  let { data, form } = $props();
  let gejalaUtama = $state('');
  let selected = $state([]);

  let followUpQuestions = $derived(data.followUps[gejalaUtama] ?? []);

  $effect(() => {
    if (form?.gejalaUtama) gejalaUtama = form.gejalaUtama;
    if (form?.selected) selected = form.selected;
  });

  function toggleGejala(id, checked) {
    selected = checked ? [...new Set([...selected, id])] : selected.filter((item) => item !== id);
  }
</script>

<section class="py-14">
  <div class="container-shell">
    <div class="mb-8">
      <h1 class="text-4xl font-black animate-fade-up">Menu Diagnosa</h1>
      <p class="mt-2 text-slate-600 animate-fade-up delay-100">Mulai dari gejala utama, lalu jawab pertanyaan lanjutan seperti konsultasi teknisi.</p>
    </div>

    {#if form?.message}
      <div class="mb-4 rounded-md border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800 animate-fade-down">
        {form.message}
      </div>
    {/if}

    <form method="POST" enctype="multipart/form-data" class="panel p-6 reveal">
      <div class="mb-6 animate-fade-up delay-150">
        <label class="label" for="namaUser">Nama User</label>
        <input class="input" id="namaUser" name="namaUser" value={form?.namaUser ?? ''} placeholder="Masukkan nama" required />
      </div>

      <div class="mb-8">
        <h2 class="mb-3 text-lg font-bold animate-fade-up delay-200">1. Pilih Gejala Utama</h2>
        <div class="grid gap-3 md:grid-cols-2">
          {#each data.gejala as item, i}
            <label class="form-card flex min-h-20 cursor-pointer gap-3 rounded-lg border border-slate-200 bg-white p-4">
              <input
                class="mt-1 h-4 w-4 border-slate-300 text-brand"
                type="radio"
                name="gejalaUtama"
                value={item.id}
                bind:group={gejalaUtama}
                onchange={() => toggleGejala(item.id, true)}
              />
              <span>
                <strong>{item.kode}</strong>
                <span class="block text-sm text-slate-600">{item.nama}</span>
              </span>
            </label>
          {/each}
        </div>
      </div>

      <div class="mb-8 rounded-lg border border-teal-100 bg-teal-50 p-5">
        <h2 class="text-lg font-bold">2. Pertanyaan Lanjutan</h2>
        <p class="mt-1 text-sm text-slate-600">
          Pertanyaan ini muncul berdasarkan basis kasus yang berhubungan dengan gejala utama.
        </p>

        {#if !gejalaUtama}
          <p class="mt-4 text-sm font-semibold text-slate-500">Pilih gejala utama terlebih dahulu.</p>
        {:else if followUpQuestions.length === 0}
          <p class="mt-4 text-sm font-semibold text-slate-500">Belum ada pertanyaan lanjutan untuk gejala ini.</p>
        {:else}
          <div class="mt-4 grid gap-3 md:grid-cols-2">
            {#each followUpQuestions as item, i}
              <label class="form-card flex min-h-20 cursor-pointer gap-3 rounded-lg border border-slate-200 bg-white p-4 animate-scale-in" style="animation-delay: {i * 60}ms">
                <input
                  class="mt-1 h-4 w-4 rounded border-slate-300 text-brand"
                  type="checkbox"
                  name="gejala"
                  value={item.id}
                  checked={selected.includes(item.id)}
                  onchange={(event) => toggleGejala(item.id, event.currentTarget.checked)}
                />
                <span>
                  <strong>Apakah {item.nama.toLowerCase()}?</strong>
                  <span class="block text-sm text-slate-500">{item.kode}</span>
                </span>
              </label>
            {/each}
          </div>
        {/if}
      </div>

      <div class="mb-8">
        <h2 class="mb-3 text-lg font-bold">3. Gejala Tambahan</h2>
        <div class="grid gap-3 md:grid-cols-2">
        {#each data.gejala as item}
          <label class="form-card flex min-h-20 cursor-pointer gap-3 rounded-lg border border-slate-200 bg-white p-4">
            <input
              class="mt-1 h-4 w-4 rounded border-slate-300 text-brand"
              type="checkbox"
              name="gejala"
              value={item.id}
              checked={selected.includes(item.id)}
              onchange={(event) => toggleGejala(item.id, event.currentTarget.checked)}
            />
            <span>
              <strong>{item.kode}</strong>
              <span class="block text-sm text-slate-600">{item.nama}</span>
            </span>
          </label>
        {/each}
        </div>
      </div>

      <div class="mb-8 grid gap-5 md:grid-cols-2 reveal">
        <div>
          <label class="label" for="gambar">Upload Gambar Kerusakan</label>
          <input class="input" id="gambar" type="file" name="gambar" accept="image/png,image/jpeg,image/webp" />
          <p class="mt-2 text-xs text-slate-500">Contoh: layar blue screen, artifact VGA, kondisi fisik laptop. Maksimal 2 MB.</p>
        </div>
        <div>
          <label class="label" for="catatan">Catatan Tambahan</label>
          <textarea class="input min-h-28" id="catatan" name="catatan" placeholder="Contoh: muncul saat main game berat, setelah 15 menit laptop mati sendiri">{form?.catatan ?? ''}</textarea>
        </div>
      </div>

      <button class="btn-primary mt-6" type="submit">Proses Diagnosa</button>
    </form>
  </div>
</section>
