<script>
  let { data, form } = $props();
</script>

<section class="py-14">
  <div class="container-shell">
    <h1 class="mb-6 text-4xl font-black animate-fade-up">Kelola Basis Kasus</h1>
    {#if form?.message}<div class="mb-4 rounded-md bg-amber-50 p-3 text-amber-800 animate-fade-down">{form.message}</div>{/if}
    <div class="grid gap-6 lg:grid-cols-[380px_1fr]">
      <form method="POST" action="?/save" class="panel p-6 animate-slide-right">
        <h2 class="mb-4 text-xl font-bold">{data.edit ? 'Edit Kasus' : 'Tambah Kasus'}</h2>
        <input type="hidden" name="id" value={data.edit?.id ?? ''} />

        <label class="label" for="idKerusakan">Kerusakan</label>
        <select class="input mb-4" id="idKerusakan" name="idKerusakan" required>
          {#each data.kerusakan as item}
            <option value={item.id} selected={data.edit?.idKerusakan === item.id}>
              {item.kode} - {item.nama}
            </option>
          {/each}
        </select>

        <label class="label" for="idGejala">Gejala</label>
        <select class="input mb-4" id="idGejala" name="idGejala" required>
          {#each data.gejala as item}
            <option value={item.id} selected={data.edit?.idGejala === item.id}>
              {item.kode} - {item.nama}
            </option>
          {/each}
        </select>

        <label class="label" for="bobot">Bobot</label>
        <input class="input mb-5" id="bobot" type="number" min="0" max="1" step="0.1" name="bobot" value={data.edit?.bobot ?? 1} required />
        <button class="btn-primary" type="submit">Simpan</button>
      </form>

      <div class="table-wrap reveal">
        <table class="table">
          <thead><tr><th>Kerusakan</th><th>Gejala</th><th>Bobot</th><th></th></tr></thead>
          <tbody>
            {#each data.basisKasus as item, i}
              <tr class="animate-fade-up" style="animation-delay: {i * 35}ms">
                <td>{item.kerusakan?.kode} - {item.kerusakan?.nama}</td>
                <td>{item.gejala?.kode} - {item.gejala?.nama}</td>
                <td>{item.bobot}</td>
                <td class="text-right">
                  <a class="btn-secondary mr-2" href={`/admin/kasus?edit=${item.id}`}>Edit</a>
                  <form method="POST" action="?/delete" class="inline">
                    <input type="hidden" name="id" value={item.id} />
                    <button class="btn-danger" type="submit">Hapus</button>
                  </form>
                </td>
              </tr>
            {/each}
          </tbody>
        </table>
      </div>
    </div>
  </div>
</section>
