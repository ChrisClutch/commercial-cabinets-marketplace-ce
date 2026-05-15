export type ForgeEvent = {
  date: string
  title: string
  venue: string
  category: 'events' | 'dining' | 'wellness'
  desc: string
}

// Single source of truth for events — imported by HomePage and InformationPage
export const allEvents: ForgeEvent[] = [
  {
    date: '2026-05-15',
    title: 'Grand Opening',
    venue: 'The Forge',
    category: 'events',
    desc: 'The official Grand Opening of The Forge. Join us for two days of celebration.',
  },
  {
    date: '2026-05-16',
    title: 'Grand Opening — Day 2',
    venue: 'The Forge',
    category: 'events',
    desc: 'Day two of The Forge Grand Opening celebration.',
  },
]
