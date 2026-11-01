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
    .replace(/\s(\(.*\)|[—–-]\s.*)$/, '')
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0]!.toUpperCase())
    .join('');

export const telHref = (phone: string) => `tel:${phone.replace(/[^\d+]/g, '')}`;

export const hasTodo = (v?: string) => !v || TODO_RE.test(v);

/** Market segments. `ranked` markets use the operator-pinned capacity ranking; others list alphabetically. */
export const SEGMENTS = [
  {
    slug: 'custom-residential',
    label: 'Custom Residential',
    ranked: false,
    blurb: 'Kitchens, baths, built-ins and whole-home cabinetry for homeowners, remodelers and custom builders.',
    intro: 'Custom residential shops build one home at a time, matching your layout, finish and style. Listed alphabetically.',
  },
  {
    slug: 'commercial',
    label: 'Commercial & Tenant Improvement',
    ranked: true,
    blurb: 'Office, retail, medical and restaurant casework, reception desks, breakrooms and TI build-outs.',
    intro: 'Commercial casework for offices, retail, medical and restaurant space, built to drawings and delivered on a GC schedule.',
  },
  {
    slug: 'multifamily',
    label: 'Multifamily',
    ranked: true,
    blurb: 'Repeat kitchen and bath packages for apartments, condos, student housing and affordable housing.',
    intro: 'Multifamily projects need repeatable unit packages, phased delivery floor by floor, and a shop with the capacity to keep up with the framing schedule.',
  },
  {
    slug: 'assisted-living',
    label: 'Assisted Living & Senior Living',
    ranked: true,
    blurb: 'ALF, memory care and independent living: accessible heights, ADA vanities and durable finishes.',
    intro: 'Assisted living, memory care and independent living facilities need ADA-compliant vanities, accessible counter heights, durable easy-clean finishes and consistent units across the building.',
  },
  {
    slug: 'large-volume-installation',
    label: 'Other Large-Volume Installation',
    ranked: true,
    blurb: 'Hospitality, dormitories, workforce housing, schools and other projects counted in units, not rooms.',
    intro: 'Hotels, dormitories, workforce housing, schools and other projects where cabinets are produced and installed by the dozens or hundreds.',
  },
] as const;

export type SegmentSlug = (typeof SEGMENTS)[number]['slug'];
export const SEGMENT_LABELS = Object.fromEntries(SEGMENTS.map((s) => [s.slug, s.label])) as Record<string, string>;

export function segmentRanking(shops: Shop[], slug: SegmentSlug) {
  const inSeg = shops.filter((s) => (s.segments as string[]).includes(slug));
  const def = SEGMENTS.find((s) => s.slug === slug)!;
  if (!def.ranked) return { operator: [] as Shop[], others: [...inSeg].sort(byName), ranked: false };
  return {
    operator: inSeg.filter((s) => s.operator),
    others: inSeg.filter((s) => !s.operator).sort((a, b) => commercialScore(b) - commercialScore(a) || byName(a, b)),
    ranked: true,
  };
}

/** Project-size slider steps (home page). */
export const SCALE_STEPS = [
  { label: '1 kitchen', units: 1 },
  { label: '2–4 units', units: 3 },
  { label: '5–11 units', units: 8 },
  { label: '12–49 units', units: 25 },
  { label: '50–199 units', units: 100 },
  { label: '200+ units', units: 200 },
] as const;

/** Which project-size tier a unit count falls in. */
export const tierForUnits = (u: number) => (u < 5 ? 'residential' : u < 50 ? 'light-commercial' : 'commercial');
