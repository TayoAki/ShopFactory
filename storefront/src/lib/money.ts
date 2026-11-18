export function money(cents: number): string {
  const dollars = cents / 100;
  return Number.isInteger(dollars) ? '$' + dollars.toFixed(0) : '$' + dollars.toFixed(2);
}
