export default function formatHours(string) {
  return string
    .replace(/\D/, '')
    .replace(/(\d{2})([6-9]6[0-9])/, '')
    .replace(/([3-9][0-9]|[2][5-9])(\d{2})/, '')
    .replace(/([0-1][0-9]|[2][0-4])([0-5][0-9])/, '$1:$2');
}
