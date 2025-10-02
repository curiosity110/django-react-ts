export function formatCurrency(cents: number) {
  return new Intl.NumberFormat("mk-MK", {
    style: "currency",
    currency: "MKD"
  }).format(cents / 100);
}
