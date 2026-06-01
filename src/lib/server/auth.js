import { redirect } from '@sveltejs/kit';

export function requireAdmin(cookies) {
  if (cookies.get('admin_session') !== 'active') {
    throw redirect(303, '/admin/login');
  }
}
