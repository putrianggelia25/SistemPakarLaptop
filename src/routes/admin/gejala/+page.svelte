<script>
  let { data, form } = $props();
</script>

<section class="py-14">
  <div class="container-shell">
    <h1 class="mb-6 text-4xl font-black">Kelola Data Gejala</h1>
    {#if form?.message}<div class="mb-4 rounded-md bg-amber-50 p-3 text-amber-800">{form.message}</div>{/if}
    <div class="grid gap-6 lg:grid-cols-[360px_1fr]">
      <form method="POST" action="?/save" class="panel p-6">
        <h2 class="mb-4 text-xl font-bold">{data.edit ? 'Edit Gejala' : 'Tambah Gejala'}</h2>
        <input type="hidden" name="id" value={data.edit?.id ?? ''} />
        <label class="label" for="kode">Kode</label>
        <input class="input mb-4" id="kode" name="kode" value={data.edit?.kode ?? ''} required />
        <label class="label" for="nama">Nama Gejala</label>
        <input class="input mb-5" id="nama" name="nama" value={data.edit?.nama ?? ''} required />
        <button class="btn-primary" type="submit">Simpan</button>
      </form>

      <div class="table-wrap">
        <table class="table">
          <thead><tr><th>Kode</th><th>Gejala</th><th></th></tr></thead>
          <tbody>
            {#each data.gejala as item}
              <tr>
                <td>{item.kode}</td>
                <td>{item.nama}</td>
                <td class="text-right">
                  <a class="btn-secondary mr-2" href={`/admin/gejala?edit=${item.id}`}>Edit</a>
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
