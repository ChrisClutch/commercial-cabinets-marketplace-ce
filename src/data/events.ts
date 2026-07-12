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
    date: '2026-07-01',
    title: 'Forge Summer Bucket List Challenge',
    venue: 'The Forge',
    category: 'events',
    desc: 'All July! Complete the Forge Summer Bucket List Challenge for a chance to enter to win a $100 gift card.',
  },
  {
    date: '2026-07-01',
    title: 'Diosa Diaper Raffle',
    venue: 'Diosa Luxury Hair Lounge',
    category: 'wellness',
    desc: 'All July! Enter the Diosa Diaper Raffle for a chance to win Free Color & Extensions or a 6-month blowout membership.',
  },
  {
    date: '2026-07-03',
    title: 'Jazz Nights at Noira',
    venue: 'Noira',
    category: 'events',
    desc: 'Jazz nights at Noira, every other Friday throughout July.',
  },
  {
    date: '2026-07-04',
    title: '4th of July at The Forge',
    venue: 'Bonzai · Ivory Bull & Co',
    category: ['dining', 'events'],
    desc: 'Bonzai! is outside grilling Zilladogs for the 4th of July! Plus, catch Ivory Bull & Co\'s pop-up out at Detroit Lake.',
  },
  {
    date: '2026-07-10',
    title: 'Clink! One Year Anniversary',
    venue: 'Clink',
    category: 'wellness',
    desc: 'Happy One Year Anniversary, Clink!',
  },
  {
    date: '2026-07-10',
    title: 'Comedy Night at Cellar 54',
    venue: 'Cellar 54',
    category: 'events',
    desc: 'Starring Courtney "Goldie" Jackson, featuring Cat Alvarado.',
  },
  {
    date: '2026-07-12',
    title: 'En Plein Air-Dry Clay Workshop',
    venue: 'Noira',
    category: 'events',
    desc: 'En Plein Air-Dry Clay Workshop at Noira, every other Friday throughout July.',
  },
  {
    date: '2026-07-17',
    title: 'Jazz Nights at Noira',
    venue: 'Noira',
    category: 'events',
    desc: 'Jazz nights at Noira, every other Friday throughout July.',
  },
  {
    date: '2026-07-17',
    title: 'Comedy Night at Cellar 54',
    venue: 'Cellar 54',
    category: 'events',
    desc: 'Starring Katie Nguyen and Ian Yearsley.',
  },
  {
    date: '2026-07-18',
    title: "Dreamies 1 Year Anniversary & National Ice Cream Day",
    venue: 'Dreamies Creamery',
    category: 'dining',
    desc: 'Celebrating one year of Dreamies plus National Ice Cream Day — free toppings all day!',
  },
  {
    date: '2026-07-19',
    title: 'En Plein Air-Dry Clay Workshop',
    venue: 'Noira',
    category: 'events',
    desc: 'En Plein Air-Dry Clay Workshop at Noira, every other Friday throughout July.',
  },
  {
    date: '2026-07-21',
    title: 'Jazz Nights at Noira',
    venue: 'Noira',
    category: 'events',
    desc: 'Jazz nights at Noira, every other Friday throughout July.',
  },
  {
    date: '2026-07-24',
    title: 'Comedy Night at Cellar 54',
    venue: 'Cellar 54',
    category: 'events',
    desc: 'Featuring Jordan Casner and Nick Meier.',
  },
  {
    date: '2026-07-26',
    title: 'En Plein Air-Dry Clay Workshop',
    venue: 'Noira',
    category: 'events',
    desc: 'En Plein Air-Dry Clay Workshop at Noira, every other Friday throughout July.',
  },
]
