import { fail, redirect } from '@sveltejs/kit';
import { readDb } from '$lib/server/store.js';

export const actions = {
  default: async ({ request, cookies }) => {
    const form = await request.formData();
    const username = String(form.get('username') ?? '').trim();
    const password = String(form.get('password') ?? '');
    const db = readDb();

    if (username === db.admin.username && password === db.admin.password) {
      cookies.set('admin_session', 'active', {
        path: '/',
        httpOnly: true,
        sameSite: 'strict',
        maxAge: 60 * 60 * 8
      });
      throw redirect(303, '/admin/dashboard');
    }

    return fail(400, {
      message: 'Username atau password salah.',
      username
    });
  }
};
