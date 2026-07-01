<script>
  import { formatDate, formatPercent } from '$lib/format.js';
  import { enhance } from '$app/forms';

  let { data } = $props();

  let deletingId = $state(null);

  function confirmDelete(id) {
    deletingId = id;
  }

  function cancelDelete() {
    deletingId = null;
  }
</script>

<section class="py-14">
  <div class="container-shell">
    <h1 class="mb-6 text-4xl font-black animate-fade-up">Riwayat Diagnosa</h1>
    <div class="table-wrap reveal">
      <table class="table">
        <thead>
          <tr><th>Tanggal</th><th>Nama</th><th>Hasil</th><th>Similarity</th><th></th></tr>
        </thead>
        <tbody>
          {#each data.diagnosa as row, i}
            <tr class="animate-fade-up" style="animation-delay: {i * 50}ms">
              <td>{formatDate(row.tanggal)}</td>
              <td>{row.namaUser}</td>
              <td>{row.hasilKerusakan}</td>
              <td>{formatPercent(row.nilaiSimilarity)}</td>
              <td class="action-cell">
                <a class="font-semibold text-brand link-hover" href={`/hasil/${row.id}`}>Detail</a>
                <button class="btn-delete" onclick={() => confirmDelete(row.id)} title="Hapus riwayat">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line></svg>
                </button>
              </td>
            </tr>
          {:else}
            <tr><td colspan="5">Belum ada riwayat diagnosa.</td></tr>
          {/each}
        </tbody>
      </table>
    </div>
  </div>
</section>

<!-- Modal konfirmasi hapus -->
{#if deletingId !== null}
  <div class="modal-overlay" role="dialog" aria-modal="true">
    <div class="modal-box">
      <div class="modal-icon">
        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>
      </div>
      <h2 class="modal-title">Hapus Riwayat?</h2>
      <p class="modal-desc">Data diagnosa yang dihapus tidak dapat dikembalikan. Apakah Anda yakin ingin melanjutkan?</p>
      <div class="modal-actions">
        <button class="btn-cancel" onclick={cancelDelete}>Batal</button>
        <form method="POST" action="?/delete" use:enhance={() => {
          return async ({ update }) => {
            deletingId = null;
            await update();
          };
        }}>
          <input type="hidden" name="id" value={deletingId} />
          <button type="submit" class="btn-confirm-delete">Hapus</button>
        </form>
      </div>
    </div>
  </div>
{/if}

<style>
  .action-cell {
    display: flex;
    align-items: center;
    gap: 0.75rem;
  }

  .btn-delete {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 32px;
    height: 32px;
    border: none;
    border-radius: 8px;
    background: rgba(239, 68, 68, 0.1);
    color: #ef4444;
    cursor: pointer;
    transition: all 0.3s cubic-bezier(0.22, 1, 0.36, 1);
  }

  .btn-delete:hover {
    background: #ef4444;
    color: #fff;
    transform: scale(1.15) rotate(-5deg);
    box-shadow: 0 6px 16px rgba(239, 68, 68, 0.35);
  }

  /* Modal */
  .modal-overlay {
    position: fixed;
    inset: 0;
    z-index: 999;
    display: flex;
    align-items: center;
    justify-content: center;
    background: rgba(0, 0, 0, 0.55);
    backdrop-filter: blur(8px);
    animation: fadeIn 0.25s ease;
  }

  .modal-box {
    background: #fff;
    border-radius: 20px;
    padding: 2rem 2.25rem;
    max-width: 400px;
    width: 90%;
    text-align: center;
    box-shadow: 0 25px 60px rgba(0, 0, 0, 0.25);
    animation: modalIn 0.35s cubic-bezier(0.22, 1, 0.36, 1);
  }

  .modal-icon {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 56px;
    height: 56px;
    border-radius: 50%;
    background: rgba(239, 68, 68, 0.1);
    color: #ef4444;
    margin-bottom: 1rem;
    animation: iconPulse 0.6s ease 0.2s both;
  }

  .modal-title {
    font-size: 1.25rem;
    font-weight: 700;
    color: #1e293b;
    margin-bottom: 0.5rem;
  }

  .modal-desc {
    font-size: 0.9rem;
    color: #64748b;
    line-height: 1.5;
    margin-bottom: 1.5rem;
  }

  .modal-actions {
    display: flex;
    gap: 0.75rem;
    justify-content: center;
  }

  .btn-cancel {
    padding: 0.6rem 1.5rem;
    border-radius: 10px;
    border: 1px solid #e2e8f0;
    background: #fff;
    color: #475569;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.25s cubic-bezier(0.22, 1, 0.36, 1);
  }

  .btn-cancel:hover {
    background: #f1f5f9;
    border-color: #cbd5e1;
    transform: translateY(-1px);
  }

  .btn-confirm-delete {
    padding: 0.6rem 1.5rem;
    border-radius: 10px;
    border: none;
    background: linear-gradient(135deg, #ef4444, #dc2626);
    color: #fff;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.25s cubic-bezier(0.22, 1, 0.36, 1);
    box-shadow: 0 4px 14px rgba(239, 68, 68, 0.3);
  }

  .btn-confirm-delete:hover {
    background: linear-gradient(135deg, #dc2626, #b91c1c);
    transform: translateY(-2px);
    box-shadow: 0 8px 24px rgba(239, 68, 68, 0.4);
  }

  .btn-confirm-delete:active {
    transform: translateY(0) scale(0.97);
  }

  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }

  @keyframes modalIn {
    from { opacity: 0; transform: scale(0.85) translateY(20px); }
    to { opacity: 1; transform: scale(1) translateY(0); }
  }

  @keyframes iconPulse {
    0% { transform: scale(0.5); opacity: 0; }
    60% { transform: scale(1.15); }
    100% { transform: scale(1); opacity: 1; }
  }
</style>
