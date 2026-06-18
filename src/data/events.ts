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
    date: '2026-06-05',
    title: 'R&Bonzai!',
    venue: 'Bonzai',
    category: 'events',
    desc: 'DJ EJ spinning R&B classics and slinging matcha, Japanese lagers, and sake! 7pm – 9pm.',
  },
  {
    date: '2026-06-12',
    title: 'FIFA World Cup USA Watch Party',
    venue: 'Cellar 54',
    category: 'events',
    desc: 'FIFA World Cup USA Watch Party at Cellar 54, hosted by Tradition Real Estate Partners. Starts at 6pm.',
  },
  {
    date: '2026-06-20',
    title: 'Summer Menu Launch',
    venue: 'Bonzai',
    category: 'dining',
    desc: 'Celebrate the debut of the new summer menu at Bonzai!',
  },
  {
    date: '2026-06-21',
    title: 'Make Music Day! Summer Solstice & Fathers Day',
    venue: 'The Forge',
    category: 'events',
    desc: 'Music throughout The Forge for Make Music Day. Welcome Summer & celebrate Fathers Day on the Summer Solstice.',
  },
  {
    date: '2026-06-27',
    title: 'Rhythm & Flow x Run Club Salem',
    venue: 'Bonzai',
    category: 'wellness',
    desc: 'Summer Run Series — 8am to 11:30am. Run Club followed by an afterparty at Bonzai! with DJs spinning.',
  },
]
