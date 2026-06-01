export function formatPercent(value) {
  return `${Number(value * 100).toFixed(2)}%`;
}

export function formatDate(value) {
  return new Intl.DateTimeFormat('id-ID', {
    dateStyle: 'medium',
    timeStyle: 'short'
  }).format(new Date(value));
}
