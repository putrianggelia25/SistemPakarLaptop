export function load({ cookies }) {
  return {
    isAdmin: cookies.get('admin_session') === 'active'
  };
}
