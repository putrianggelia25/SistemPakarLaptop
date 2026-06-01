<script>
  let { form } = $props();
</script>

<section class="flex min-h-[calc(100vh-8rem)] items-center py-14">
  <div class="container-shell">
    <div class="mx-auto max-w-md">
      <form method="POST" class="panel p-6">
        <h1 class="text-3xl font-black">Login Admin</h1>
        <p class="mt-2 text-sm text-slate-600">Masuk untuk mengelola basis pengetahuan.</p>

        {#if form?.message}
          <div class="mt-4 rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            {form.message}
          </div>
        {/if}

        <div class="mt-5">
          <label class="label" for="username">Username</label>
          <input class="input" id="username" name="username" value={form?.username ?? ''} required />
        </div>
        <div class="mt-4">
          <label class="label" for="password">Password</label>
          <input class="input" id="password" type="password" name="password" required />
        </div>
        <button class="btn-primary mt-6 w-full" type="submit">Login</button>
      </form>
    </div>
  </div>
</section>
