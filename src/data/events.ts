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
    date: '2026-10-02',
    title: 'Pitch Willamette: Shark Tank Style Event',
    venue: 'Cellar 54',
    category: 'events',
    desc: 'Pitch Willamette, a Shark Tank style pitch event at Cellar 54.',
  },
  {
    date: '2026-10-03',
    title: 'Brunch Is Back at Clink',
    venue: 'Clink',
    category: 'dining',
    desc: 'Brunch is back at Clink! Saturdays & Sundays, 10am–2:30pm.',
  },
  {
    date: '2026-10-04',
    title: 'Bonzai-Lates: Heated Bilingual Pilates',
    venue: 'The Hot Loft · Bonzai',
    category: ['wellness', 'dining'],
    desc: 'Heated bilingual Pilates at The Hot Loft, followed by the drink of your choice at Bonzai.',
  },
  {
    date: '2026-10-07',
    title: 'Coupe Night with Clay & Kiln',
    venue: 'Noira',
    category: 'events',
    desc: 'Coupe Night at Noira with Clay & Kiln.',
  },
  {
    date: '2026-10-09',
    title: 'Live Jazz at Noira',
    venue: 'Noira',
    category: ['dining', 'events'],
    desc: 'Live jazz at Noira.',
  },
  {
    date: '2026-10-11',
    title: 'Flowers, Books & More Pop-Up Market',
    venue: 'Studio Roux',
    category: 'events',
    desc: 'Flowers, books & more pop-up market at Studio Roux.',
  },
  {
    date: '2026-10-16',
    title: 'Pumpkin Carving Contest',
    venue: 'Bonzai',
    category: 'events',
    desc: 'Pumpkin carving contest at Bonzai!',
  },
  {
    date: '2026-10-17',
    title: 'Bridal Glitter & Glam Grand Opening Party',
    venue: 'Bridal Glitter & Glam',
    category: 'events',
    desc: 'Celebrate the grand opening of Bridal Glitter & Glam.',
  },
  {
    date: '2026-10-18',
    title: 'Broom Workshop',
    venue: 'Studio Roux',
    category: 'events',
    desc: 'Broom workshop at Studio Roux.',
  },
  {
    date: '2026-10-23',
    title: 'Practical Magic Hour: Event + Screening',
    venue: 'The Forge',
    category: 'events',
    desc: 'Practical Magic Hour at The Forge, an event plus a screening of Practical Magic.',
  },
  {
    date: '2026-10-23',
    title: 'Halloween Skincare Party',
    venue: 'Studio Roux',
    category: 'wellness',
    desc: 'Halloween skincare party at Studio Roux.',
  },
  {
    date: '2026-10-23',
    title: 'THIS! Funk Show',
    venue: 'Bonzai',
    category: 'events',
    desc: 'THIS! live funk show at Bonzai.',
  },
  {
    date: '2026-10-23',
    title: 'Live Jazz & Aura Readings',
    venue: 'Noira',
    category: ['dining', 'events'],
    desc: 'Live jazz and aura readings at Noira. Aura readings are sold out.',
  },
  {
    date: '2026-10-24',
    title: 'Salem Brew Week at Bonzai',
    venue: 'Bonzai',
    category: 'dining',
    desc: 'Salem Brew Week at Bonzai, pouring Sapporo in pints, pitchers, and a beer tower!',
  },
  {
    date: '2026-10-27',
    title: 'The Hot Loft Turns 1: Happy Birthday Event',
    venue: 'The Hot Loft',
    category: 'wellness',
    desc: 'The Hot Loft turns 1! Celebrate with a happy birthday event.',
  },
  {
    date: '2026-10-30',
    title: 'Spirited Away Movie Night',
    venue: 'Bonzai',
    category: 'events',
    desc: 'Spirited Away movie night at Bonzai.',
  },
  {
    date: '2026-10-30',
    title: 'Practical Magic Potion Party',
    venue: 'Noira',
    category: 'events',
    desc: 'Practical Magic potion party at Noira.',
  },
  {
    date: '2026-10-31',
    title: 'Trick-or-Treat Downtown at The Forge',
    venue: 'The Forge',
    category: 'events',
    desc: 'Trick-or-treat downtown at The Forge.',
  },
  {
    date: '2026-10-31',
    title: 'Ivory Bull Halloween Sale Event',
    venue: 'Ivory Bull & Co',
    category: 'events',
    desc: 'Halloween sale event at Ivory Bull & Co.',
  },
  {
    date: '2026-10-31',
    title: 'Free Dirty Sodas for Trick-or-Treaters',
    venue: 'Bonzai',
    category: ['dining', 'events'],
    desc: 'Bonzai is handing out free dirty sodas to trick-or-treaters!',
  },
  {
    date: '2026-10-31',
    title: 'Boo-Lates Halloween Pilates Class',
    venue: 'The Hot Loft',
    category: 'wellness',
    desc: 'Boo-Lates Halloween Pilates class at The Hot Loft.',
  },
]
