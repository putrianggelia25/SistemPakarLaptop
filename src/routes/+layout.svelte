<script>
  import '../app.css';
  import { onMount } from 'svelte';
  import { page } from '$app/stores';

  let { data, children } = $props();

  let mobileOpen = $state(false);
  let scrolled = $state(false);
  let pageKey = $derived($page.url.pathname);

  const nav = [
    ['Beranda', '/'],
    ['Diagnosa', '/diagnosa'],
    ['Gejala', '/gejala'],
    ['Kerusakan', '/kerusakan'],
    ['Riwayat', '/riwayat'],
    ['Tentang', '/tentang']
  ];

  onMount(() => {
    // Scroll detection for navbar style
    const handleScroll = () => {
      scrolled = window.scrollY > 10;
    };
    window.addEventListener('scroll', handleScroll, { passive: true });

    // Scroll-reveal Intersection Observer
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.08, rootMargin: '0px 0px -40px 0px' }
    );

    // Observe all .reveal and .reveal-scale elements
    function observeAll() {
      document.querySelectorAll('.reveal, .reveal-scale').forEach((el) => {
        observer.observe(el);
      });
    }

    observeAll();

    // Re-observe on page navigation (MutationObserver)
    const mutationObs = new MutationObserver(() => {
      observeAll();
    });
    mutationObs.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      observer.disconnect();
      mutationObs.disconnect();
    };
  });
</script>

<svelte:head>
  <title>LaptopCare CBR</title>
  <meta
    name="description"
    content="Sistem pakar diagnosa kerusakan laptop gaming menggunakan Case-Based Reasoning"
  />
</svelte:head>

<nav
  class="no-print sticky top-0 z-40 border-b text-white transition-all duration-500 {scrolled ? 'bg-slate-950/95 backdrop-blur-lg border-slate-700 shadow-lg' : 'bg-slate-950 border-slate-800'}"
>
  <div class="container-shell flex min-h-16 items-center justify-between gap-4">
    <a href="/" class="text-base font-bold tracking-wide transition-transform duration-300 hover:scale-105">
      <span class="bg-gradient-to-r from-teal-300 to-white bg-clip-text text-transparent">LaptopCare</span>
      <span class="text-slate-400"> CBR</span>
    </a>

    <!-- Mobile toggle -->
    <button
      class="grid h-10 w-10 place-items-center rounded-md text-slate-200 transition hover:bg-white/10 md:hidden"
      onclick={() => (mobileOpen = !mobileOpen)}
      aria-label="Toggle menu"
    >
      <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        {#if mobileOpen}
          <line x1="18" y1="6" x2="6" y2="18"></line>
          <line x1="6" y1="6" x2="18" y2="18"></line>
        {:else}
          <line x1="3" y1="12" x2="21" y2="12"></line>
          <line x1="3" y1="6" x2="21" y2="6"></line>
          <line x1="3" y1="18" x2="21" y2="18"></line>
        {/if}
      </svg>
    </button>

    <!-- Desktop nav -->
    <div class="hidden items-center gap-1 md:flex">
      {#each nav as item}
        <a class="nav-link rounded-md px-3 py-2 text-sm font-medium text-slate-200" href={item[1]}>
          {item[0]}
        </a>
      {/each}
      <a class="nav-link rounded-md px-3 py-2 text-sm font-medium text-slate-200" href="/admin/dashboard">
        {data.isAdmin ? 'Admin' : 'Login'}
      </a>
    </div>
  </div>

  <!-- Mobile nav dropdown -->
  {#if mobileOpen}
    <div class="animate-fade-down border-t border-slate-800 pb-4 md:hidden">
      <div class="container-shell flex flex-col gap-1 pt-2">
        {#each nav as item, i}
          <a
            class="rounded-md px-3 py-2.5 text-sm font-medium text-slate-200 transition hover:bg-white/10 animate-fade-up"
            style="animation-delay: {i * 50}ms"
            href={item[1]}
            onclick={() => (mobileOpen = false)}
          >
            {item[0]}
          </a>
        {/each}
        <a
          class="rounded-md px-3 py-2.5 text-sm font-medium text-slate-200 transition hover:bg-white/10 animate-fade-up"
          style="animation-delay: {nav.length * 50}ms"
          href="/admin/dashboard"
          onclick={() => (mobileOpen = false)}
        >
          {data.isAdmin ? 'Admin' : 'Login'}
        </a>
      </div>
    </div>
  {/if}
</nav>

{#key pageKey}
  <div class="page-enter">
    {@render children()}
  </div>
{/key}

<footer class="no-print border-t border-slate-200 bg-white py-6 text-sm text-slate-500">
  <div class="container-shell flex flex-col justify-between gap-2 md:flex-row">
    <span>© 2026 LaptopCare CBR</span>
    <span>SvelteKit, Node.js, Tailwind CSS</span>
  </div>
</footer>
