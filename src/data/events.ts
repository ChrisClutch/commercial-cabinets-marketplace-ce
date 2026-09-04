export type EventCategory = 'events' | 'dining' | 'wellness'

export type ForgeEvent = {
  date: string
  title: string
  venue: string
  category: EventCategory | EventCategory[]
  desc: string
}

// Single source of truth for events — imported by HomePage and InformationPage
export const allEvents: ForgeEvent[] = [
  {
    date: '2026-09-01',
    title: 'PNW Smiles Birthday Special',
    venue: 'PNW Smiles',
    category: 'wellness',
    desc: 'All September! Free gift when you book a 60-minute whitening session for the PNW Smiles Birthday Special.',
  },
  {
    date: '2026-09-03',
    title: 'Ivory Bull & Co 1st Anniversary Event',
    venue: 'Ivory Bull & Co',
    category: ['dining', 'events'],
    desc: 'Celebrate one year of Ivory Bull & Co, 4–7pm.',
  },
  {
    date: '2026-09-04',
    title: 'First Friday Featuring Artist Anna Tooze',
    venue: 'Noira',
    category: 'events',
    desc: "Noira's First Friday event featuring artist Anna Tooze.",
  },
  {
    date: '2026-09-11',
    title: 'Partner Board Pop-Up',
    venue: 'The Hot Loft',
    category: 'events',
    desc: 'Partner Board Pop-Up at The Hot Loft, 6pm.',
  },
  {
    date: '2026-09-11',
    title: 'Pizza & Live Jazz Featuring Blue Gardenia Jazztet',
    venue: 'Noira',
    category: ['dining', 'events'],
    desc: 'Pizza and live jazz at Noira featuring the Blue Gardenia Jazztet.',
  },
  {
    date: '2026-09-12',
    title: 'Bonzai Fall Menu Launch',
    venue: 'Bonzai',
    category: 'dining',
    desc: 'Bonzai! launches its fall menu.',
  },
  {
    date: '2026-09-18',
    title: 'Brow Flow Hot Yoga Class for the Guys',
    venue: 'The Hot Loft',
    category: 'wellness',
    desc: 'Brow Flow hot yoga class for the guys at The Hot Loft, 12pm.',
  },
  {
    date: '2026-09-20',
    title: 'Studio Roux Skincare Party',
    venue: 'Studio Roux',
    category: 'wellness',
    desc: 'Skincare party at Studio Roux, 11am–1pm.',
  },
  {
    date: '2026-09-25',
    title: 'Petals Pop-Up Bouquet Bar & Bilingual Bookworm Event',
    venue: 'Studio Roux',
    category: 'events',
    desc: 'Petals Pop-Up bouquet bar and Bilingual Bookworm event at Studio Roux, 11am–4pm.',
  },
  {
    date: '2026-09-25',
    title: 'Pizza & Live Jazz Featuring Blue Gardenia Jazztet',
    venue: 'Noira',
    category: ['dining', 'events'],
    desc: 'Pizza and live jazz at Noira featuring the Blue Gardenia Jazztet.',
  },
]
