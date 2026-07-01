import { readDb, writeDb } from '$lib/server/store.js';

export function load() {
  const db = readDb();
  return { diagnosa: db.diagnosa };
}

export const actions = {
  delete: async ({ request }) => {
    const form = await request.formData();
    const id = Number(form.get('id'));

    const db = readDb();
    db.diagnosa = db.diagnosa.filter((d) => d.id !== id);
    writeDb(db);

    return { success: true };
  }
};
