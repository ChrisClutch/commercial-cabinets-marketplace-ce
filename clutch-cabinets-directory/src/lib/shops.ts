import { getCollection, type CollectionEntry } from 'astro:content';

export type Shop = CollectionEntry<'shops'>['data'];

export const SIZE_LABELS: Record<string, string> = {
  residential: 'Residential',
  'light-commercial': 'Light Commercial',
  commercial: 'Commercial & High-Volume',
};

/**
 * Commercial / high-volume ranking. Published on /commercial — keep the
 * explanation there in sync if you change any number here.
 * Missing (blank) values score 0 for that factor.
 */
export const RANKING_FACTORS = [
  { key: 'unitsPerMonth', label: 'Production capacity', max: 35, rule: '35 pts at 200+ cabinet units/month, scaled down proportionally' },
  { key: 'cncAutomated', label: 'CNC / automated production', max: 15, rule: '15 pts if the shop runs CNC or automated production' },
  { key: 'commercialProjectsCompleted', label: 'Commercial experience', max: 20, rule: '20 pts at 50+ completed commercial projects, scaled down proportionally' },
  { key: 'maxProjectUnits', label: 'Max project size', max: 20, rule: '20 pts for projects of 300+ units, scaled down proportionally' },
  { key: 'leadTimeWeeks', label: 'Lead time', max: 10, rule: '10 pts at 4 weeks or less, 6 at 8 or less, 3 at 12 or less' },
] as const;

const scaled = (v: number | null | undefined, cap: number, pts: number) =>
  typeof v === 'number' ? (Math.min(v, cap) / cap) * pts : 0;

export function scoreBreakdown(shop: Shop) {
  const c = shop.capacity ?? {};
  const lt = c.leadTimeWeeks;
  const parts = {
    unitsPerMonth: scaled(c.unitsPerMonth, 200, 35),
    cncAutomated: c.cncAutomated ? 15 : 0,
    commercialProjectsCompleted: scaled(c.commercialProjectsCompleted, 50, 20),
    maxProjectUnits: scaled(c.maxProjectUnits, 300, 20),
    leadTimeWeeks: typeof lt === 'number' && lt > 0 ? (lt <= 4 ? 10 : lt <= 8 ? 6 : lt <= 12 ? 3 : 0) : 0,
  };
  const total = Math.round(Object.values(parts).reduce((a, b) => a + b, 0));
  return { parts, total };
}

export const commercialScore = (shop: Shop) => scoreBreakdown(shop).total;

export const byName = (a: Shop, b: Shop) => a.name.localeCompare(b.name);

/** Hidden-free ordering: operator pinned first (and labeled on the page), everyone else by score. */
export function commercialRanking(shops: Shop[]) {
  const qualifying = shops.filter((s) => s.projectSizes.includes('commercial'));
  const operator = qualifying.filter((s) => s.operator);
  const others = qualifying
    .filter((s) => !s.operator)
    .sort((a, b) => commercialScore(b) - commercialScore(a) || byName(a, b));
  return { operator, others };
}

const TODO_RE = /TODO/;
let warned = false;

export async function getShops(): Promise<Shop[]> {
  const shops = (await getCollection('shops')).map((e) => e.data).sort(byName);
  if (!warned) {
    warned = true;
    for (const s of shops.filter((s) => s.operator)) {
      const missing = Object.entries(s.capacity ?? {})
        .filter(([, v]) => v === null || v === undefined)
        .map(([k]) => k);
      const todos = Object.entries(s).filter(([, v]) => typeof v === 'string' && TODO_RE.test(v)).map(([k]) => k);
      if (!s.phone) todos.push('phone');
      if (!s.email) todos.push('email');
      if (missing.length || todos.length) {
        console.warn(
          `\n[TODO] ${s.name}: fill in real values before launch.\n` +
            (missing.length ? `  capacity fields still blank: ${missing.join(', ')}\n` : '') +
            (todos.length ? `  fields still marked TODO/blank: ${todos.join(', ')}\n` : ''),
        );
      }
    }
  }
  return shops;
}

export const initials = (name: string) =>
  name
    .replace(/[–-].*$/, '')
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0]!.toUpperCase())
    .join('');

export const telHref = (phone: string) => `tel:${phone.replace(/[^\d+]/g, '')}`;

export const hasTodo = (v?: string) => !v || TODO_RE.test(v);
