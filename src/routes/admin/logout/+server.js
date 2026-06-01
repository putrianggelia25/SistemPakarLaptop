import { redirect } from '@sveltejs/kit';

export function GET({ cookies }) {
  cookies.delete('admin_session', { path: '/' });
  throw redirect(303, '/admin/login');
}
