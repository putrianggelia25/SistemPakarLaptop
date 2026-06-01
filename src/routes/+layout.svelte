<script>
  import '../app.css';

  let { data, children } = $props();

  const nav = [
    ['Beranda', '/'],
    ['Diagnosa', '/diagnosa'],
    ['Gejala', '/gejala'],
    ['Kerusakan', '/kerusakan'],
    ['Riwayat', '/riwayat'],
    ['Tentang', '/tentang']
  ];
</script>

<svelte:head>
  <title>LaptopCare CBR</title>
  <meta
    name="description"
    content="Sistem pakar diagnosa kerusakan laptop gaming menggunakan Case-Based Reasoning"
  />
</svelte:head>

<nav class="no-print sticky top-0 z-40 border-b border-slate-800 bg-slate-950 text-white">
  <div class="container-shell flex min-h-16 items-center justify-between gap-4">
    <a href="/" class="text-base font-bold tracking-wide">LaptopCare CBR</a>
    <div class="hidden items-center gap-1 md:flex">
      {#each nav as item}
        <a class="rounded-md px-3 py-2 text-sm font-medium text-slate-200 hover:bg-white/10" href={item[1]}>
          {item[0]}
        </a>
      {/each}
      <a class="rounded-md px-3 py-2 text-sm font-medium text-slate-200 hover:bg-white/10" href="/admin/dashboard">
        {data.isAdmin ? 'Admin' : 'Login'}
      </a>
    </div>
  </div>
</nav>

{@render children()}

<footer class="no-print border-t border-slate-200 bg-white py-6 text-sm text-slate-500">
  <div class="container-shell flex flex-col justify-between gap-2 md:flex-row">
    <span>© 2026 LaptopCare CBR</span>
    <span>SvelteKit, Node.js, Tailwind CSS</span>
  </div>
</footer>
