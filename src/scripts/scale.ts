// Ordering rules shared by the home slider and the directory.
// Below 12 units: neutral alphabetical. 12+ units: operator first (labeled), then published capacity score.
export const RANK_FROM_UNITS = 12;
export const tierForUnits = (u: number) => (u < 5 ? 'residential' : u < 50 ? 'light-commercial' : 'commercial');

export function fitsScale(card: HTMLElement, units: number) {
  const sizes = card.dataset.sizes!.split('|');
  const max = Number(card.dataset.maxUnits || 0);
  return sizes.includes(tierForUnits(units)) && (!max || max >= units);
}

export function orderForScale(cards: HTMLElement[], units: number) {
  const byName = (a: HTMLElement, b: HTMLElement) => a.dataset.name!.localeCompare(b.dataset.name!);
  if (units < RANK_FROM_UNITS) return [...cards].sort(byName);
  return [...cards].sort(
    (a, b) => Number(b.dataset.operator) - Number(a.dataset.operator) || Number(b.dataset.score) - Number(a.dataset.score) || byName(a, b),
  );
}
