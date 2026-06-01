<script>
  let { data } = $props();
  const links = [
    ["Data Gejala", "/admin/gejala"],
    ["Data Kerusakan", "/admin/kerusakan"],
    ["Basis Kasus", "/admin/kasus"],
    ["Laporan Diagnosa", "/admin/diagnosa"],
  ];
</script>

<section class="py-14">
  <div class="container-shell">
    <div
      class="mb-6 flex flex-col justify-between gap-3 md:flex-row md:items-center"
    >
      <div>
        <h1 class="text-4xl font-black">Dashboard Admin</h1>
        <p class="mt-2 text-slate-600">Ringkasan data sistem pakar.</p>
      </div>
      <a class="btn-secondary" href="/admin/logout">Logout</a>
    </div>

    <div class="grid gap-4 md:grid-cols-4">
      {#each Object.entries(data.stats) as [label, total]}
        <div class="panel p-6">
          <div class="text-4xl font-black">{total}</div>
          <div class="mt-1 capitalize text-slate-500">
            {label.replace(/([A-Z])/g, " $1")}
          </div>
        </div>
      {/each}
    </div>

    <div class="mt-8 grid gap-4 md:grid-cols-4">
      {#each links as link}
        <a
          class="panel p-5 font-bold transition hover:border-brand hover:bg-teal-50"
          href={link[1]}>{link[0]}</a
        >
      {/each}
    </div>

    <!-- CBR Lifecycle Stats -->
    <div class="mt-8 panel p-6">
      <h2 class="mb-4 text-xl font-bold">Status Siklus CBR</h2>
      <div class="grid gap-4 sm:grid-cols-4">
        <div class="rounded-lg bg-amber-50 p-4 text-center">
          <div class="text-3xl font-black text-amber-600">
            {data.cbrStats.pending}
          </div>
          <div class="mt-1 text-sm text-amber-700">⏳ Menunggu Validasi</div>
        </div>
        <div class="rounded-lg bg-teal-50 p-4 text-center">
          <div class="text-3xl font-black text-teal-600">
            {data.cbrStats.akurasi !== null ? `${data.cbrStats.akurasi}%` : "—"}
          </div>
          <div class="mt-1 text-sm text-teal-700">✅ Akurasi Sistem</div>
        </div>
        <div class="rounded-lg bg-blue-50 p-4 text-center">
          <div class="text-3xl font-black text-blue-600">
            {data.cbrStats.direvisi}
          </div>
          <div class="mt-1 text-sm text-blue-700">🔄 Direvisi</div>
        </div>
        <div class="rounded-lg bg-purple-50 p-4 text-center">
          <div class="text-3xl font-black text-purple-600">
            {data.cbrStats.retained}
          </div>
          <div class="mt-1 text-sm text-purple-700">🧠 Kasus Retained</div>
        </div>
      </div>
      {#if data.cbrStats.pending > 0}
        <div
          class="mt-4 flex items-center justify-between rounded-lg border border-amber-200 bg-amber-50 px-4 py-3"
        >
          <p class="text-sm font-semibold text-amber-700">
            Ada {data.cbrStats.pending} diagnosa menunggu validasi teknisi.
          </p>
          <a
            class="text-sm font-bold text-amber-700 hover:underline"
            href="/admin/diagnosa">Validasi Sekarang →</a
          >
        </div>
      {/if}
    </div>

    <div class="mt-8 grid gap-6 lg:grid-cols-2">
      <div class="panel p-6">
        <h2 class="mb-4 text-xl font-bold">Kerusakan Paling Sering Muncul</h2>
        <div class="space-y-3">
          {#each data.popular.slice(0, 5) as row}
            <div>
              <div class="mb-1 flex justify-between gap-3 text-sm">
                <span class="font-semibold">{row.nama}</span>
                <span>{row.total}</span>
              </div>
              <div class="h-3 overflow-hidden rounded-full bg-slate-100">
                <div
                  class="h-full rounded-full bg-brand"
                  style={`width: ${(row.total / Math.max(1, data.popular[0]?.total ?? 1)) * 100}%`}
                ></div>
              </div>
            </div>
          {:else}
            <p class="text-sm text-slate-500">Belum ada data diagnosa.</p>
          {/each}
        </div>
      </div>

      <div class="panel p-6">
        <h2 class="mb-4 text-xl font-bold">Grafik Diagnosa Bulanan</h2>
        <div
          class="flex h-64 items-end gap-4 border-b border-l border-slate-200 px-4 pt-4"
        >
          {#each data.monthly as row}
            <div
              class="flex h-full flex-1 flex-col items-center justify-end gap-2"
            >
              <div class="text-xs font-bold text-slate-600">{row.total}</div>
              <div
                class="w-full max-w-14 rounded-t-md bg-copper"
                style={`height: ${Math.max(10, (row.total / data.maxMonthly) * 190)}px`}
                title={`${row.label}: ${row.total} diagnosa`}
              ></div>
              <div class="h-10 text-center text-xs text-slate-500">
                {row.label}
              </div>
            </div>
          {:else}
            <div
              class="grid h-full w-full place-items-center text-sm text-slate-500"
            >
              Belum ada data bulanan.
            </div>
          {/each}
        </div>
      </div>
    </div>
  </div>
</section>
