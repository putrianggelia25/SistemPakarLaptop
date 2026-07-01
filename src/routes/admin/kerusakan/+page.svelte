<script>
  let { data, form } = $props();
  const levels = ['Ringan', 'Sedang', 'Berat'];
</script>

<section class="py-14">
  <div class="container-shell">
    <h1 class="mb-6 text-4xl font-black animate-fade-up">Kelola Kerusakan dan Solusi</h1>
    {#if form?.message}<div class="mb-4 rounded-md bg-amber-50 p-3 text-amber-800 animate-fade-down">{form.message}</div>{/if}
    <div class="grid gap-6 lg:grid-cols-[420px_1fr]">
      <form method="POST" action="?/save" class="panel p-6 animate-slide-right">
        <h2 class="mb-4 text-xl font-bold">{data.edit ? 'Edit Kerusakan' : 'Tambah Kerusakan'}</h2>
        <input type="hidden" name="id" value={data.edit?.id ?? ''} />
        <label class="label" for="kode">Kode</label>
        <input class="input mb-3" id="kode" name="kode" value={data.edit?.kode ?? ''} required />
        <label class="label" for="nama">Nama Kerusakan</label>
        <input class="input mb-3" id="nama" name="nama" value={data.edit?.nama ?? ''} required />
        <label class="label" for="penjelasan">Penjelasan</label>
        <textarea class="input mb-3 min-h-24" id="penjelasan" name="penjelasan">{data.edit?.penjelasan ?? ''}</textarea>
        <label class="label" for="solusi">Solusi</label>
        <textarea class="input mb-3 min-h-24" id="solusi" name="solusi" required>{data.edit?.solusi ?? ''}</textarea>
        <label class="label" for="tingkat">Tingkat</label>
        <select class="input mb-5" id="tingkat" name="tingkat">
          {#each levels as level}
            <option selected={(data.edit?.tingkat ?? 'Sedang') === level}>{level}</option>
          {/each}
        </select>
        <button class="btn-primary" type="submit">Simpan</button>
      </form>

      <div class="table-wrap reveal">
        <table class="table">
          <thead><tr><th>Kode</th><th>Kerusakan</th><th>Tingkat</th><th></th></tr></thead>
          <tbody>
            {#each data.kerusakan as item, i}
              <tr class="animate-fade-up" style="animation-delay: {i * 40}ms">
                <td>{item.kode}</td>
                <td>{item.nama}</td>
                <td>{item.tingkat}</td>
                <td class="text-right">
                  <a class="btn-secondary mr-2" href={`/admin/kerusakan?edit=${item.id}`}>Edit</a>
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
