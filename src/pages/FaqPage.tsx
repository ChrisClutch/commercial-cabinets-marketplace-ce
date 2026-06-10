import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Nav from '../components/Nav'
import Footer from '../components/Footer'
import { img } from '../utils/img'

type FaqSection = {
  id: string
  icon: string
  title: string
  items: { q: string; a: React.ReactNode }[]
}

const FAQ_SECTIONS: FaqSection[] = [
  {
    id: 'parking', icon: '🅿', title: 'Parking',
    items: [
      { q: "Where's the best place to park?", a: <><strong>The Chemekata Parkade</strong> is your best bet — it's connected directly to The Forge's second floor via a covered walkway, so you stay dry no matter the weather. Street parking on Liberty Street and Chemeketa Street is also plentiful, especially on evenings and weekends.</> },
      { q: 'Is parking free?', a: <><strong>Chemekata Parkade is free</strong> for all Forge guests and clients. Street parking on Liberty Street and surrounding blocks is also available, free after 6pm on weekdays and all day on Sundays.</> },
      { q: 'Is there accessible parking?', a: <>Yes. ADA-accessible parking spaces are available in the Chemekata Parkade and on Liberty Street and Chemeketa Street adjacent to our entrance. Our building entrance is fully accessible. If you have specific needs, <a href="mailto:inquiries@forgesalem.com">contact us</a> before your visit and we'll make sure everything is sorted.</> },
      { q: 'Can I validate parking?', a: 'No validation needed — the Chemekata Parkade is free for all Forge guests and clients. Just park and walk right in via the covered walkway to our second floor.' },
    ]
  },
  {
    id: 'restrooms', icon: '✦', title: 'Restrooms',
    items: [
      { q: 'Where are the restrooms?', a: <>Public restrooms are located on the <strong>ground floor</strong> near the main entrance, and on the <strong>second floor</strong> in the Women's Collective. The second-floor ladies' room is — we're not exaggerating — the most talked-about restroom in Salem. It's worth the elevator ride even if you don't need to go.</> },
      { q: 'Do the restrooms require a code?', a: <>Both the ground-floor and second-floor restrooms are <strong>code-protected</strong>. To get the access code, stop by the <strong>front desk</strong> or ask any tenant — they'll be happy to help. Codes change periodically, so always grab the current one on arrival.</> },
      { q: "I've heard a lot about the second-floor ladies' room. Is it really that good?", a: "Yes. Crystal chandeliers. Pink marble vessel sinks. Brass fixtures. Smart mirrors. A velvet lounge area. A neon sign. Framed art. It was designed to function as a \"public living room\" where you can genuinely spend time. People visit The Forge specifically to see it. We're not embarrassed by this." },
      { q: 'Are restrooms accessible?', a: <>Yes. All restroom facilities at The Forge are ADA-accessible. The elevator provides access to all floors. If you need specific assistance, please <a href="mailto:inquiries@forgesalem.com">let us know</a>.</> },
    ]
  },
  {
    id: 'hours', icon: '◷', title: 'Hours',
    items: [
      {
        q: "What are The Forge's general hours?",
        a: (
          <table className="hours-table">
            <thead><tr><th>Day</th><th>Hours</th></tr></thead>
            <tbody>
              {[['Monday','8:00 AM – 9:00 PM'],['Tuesday','8:00 AM – 7:00 PM'],['Wednesday','8:00 AM – 9:00 PM'],['Thursday','8:00 AM – 9:00 PM'],['Friday','8:00 AM – 10:00 PM'],['Saturday','8:00 AM – 10:00 PM'],['Sunday','8:00 AM – 9:00 PM']].map(([d,h]) => (
                <tr key={d}><td><strong>{d}</strong></td><td>{h}</td></tr>
              ))}
            </tbody>
          </table>
        )
      },
      { q: 'Are you open on holidays?', a: <>Most tenants have modified hours on major holidays. We recommend calling ahead or checking the specific tenant's social media if you're planning a holiday visit.</> },
    ]
  },
  {
    id: 'events-faq', icon: '◆', title: 'Events & Booking',
    items: [
      { q: 'How do I book Cellar 54 for a private event?', a: <>Book directly at <a href="https://cellar54salem.com" target="_blank" rel="noopener">cellar54salem.com</a> or call <a href="tel:5033023237">503-302-3237</a>. Dates fill quickly — especially weekends — so we recommend reaching out as early as possible.</> },
      { q: 'How far in advance should I book?', a: <>For Cellar 54, we recommend <strong>at least 6–8 weeks in advance</strong> for weekend events. Holiday weekends often book 3–4 months out. If you have a tight timeline, reach out anyway — we'll let you know what's available.</> },
    ]
  },
  {
    id: 'womens-collective-faq', icon: '◈', title: "Women's Collective",
    items: [
      { q: 'Do I need an appointment to visit the Women\'s Collective?', a: "Most of the beauty and wellness suites are appointment-based — book directly with the individual tenant. Clink! is walk-in friendly, though reservations are recommended on weekends. The floor is open to browse and the energy is worth the trip even if you don't have an appointment." },
      { q: 'Are men welcome on the second floor?', a: "Absolutely. The Women's Collective is women-centric in spirit and programming, but the floor is open to everyone. Clink! welcomes all guests. The suites serve all clients. The remarkable bathroom is technically for the ladies, but we appreciate the admiration from everyone who hears about it." },
    ]
  },
  {
    id: 'leasing', icon: '◧', title: 'Leasing',
    items: [
      { q: 'Are there suites available for lease?', a: <>Yes — there are a few first floor suites still available. <Link to="/leasing">Visit our leasing page</Link> to learn more and get in touch.</> },
    ]
  },
  {
    id: 'getting-here', icon: '◉', title: 'Getting Here',
    items: [
      { q: 'Where exactly is The Forge?', a: <><strong>285 Liberty St. N.E., Salem, Oregon 97301.</strong> We're in the heart of downtown Salem — one block from the Marion County Courthouse, easy walking distance from the Capitol. <a href="https://maps.google.com/?q=285+Liberty+St+NE+Salem+OR" target="_blank" rel="noopener">Get directions on Google Maps →</a></> },
      { q: 'Is The Forge accessible by public transit?', a: "Yes. Cherriots bus routes serve downtown Salem with stops within a short walk of The Forge. The building is also bikeable — rack parking is available nearby. If you're coming from the Portland area, the Amtrak Cascades train stops at Salem Station, about a 10-minute cab or rideshare ride away." },
      { q: 'Is the building ADA accessible?', a: <>Yes. The Forge is fully ADA accessible. Our main entrance is at street level, elevators service all floors, and restrooms on each floor are accessible. If you have specific needs or questions ahead of your visit, please <a href="mailto:inquiries@forgesalem.com">reach out</a> and we'll make sure everything is in place.</> },
    ]
  },
  {
    id: 'contact', icon: '✉', title: 'Contact',
    items: []
  }
]

export default function FaqPage() {
  useEffect(() => { document.title = 'FAQ — The Forge Salem' }, [])

  const [openItems, setOpenItems] = useState<Record<string, boolean>>({
    'parking-0': true,
    'restrooms-0': true,
    'hours-0': true,
    'events-faq-0': true,
    'womens-collective-faq-0': true,
    'leasing-0': true,
    'getting-here-0': true,
  })
  const [activeSidebarId, setActiveSidebarId] = useState('parking')

  function toggleItem(key: string) {
    setOpenItems(prev => ({ ...prev, [key]: !prev[key] }))
  }

  useEffect(() => {
    function handleScroll() {
      let current = 'parking'
      FAQ_SECTIONS.forEach(s => {
        const el = document.getElementById(s.id)
        if (el && window.scrollY >= el.offsetTop - 120) current = s.id
      })
      setActiveSidebarId(current)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <>
      <Nav />

      <div className="page-hero" style={{ minHeight: '280px' }}>
        <div className="page-hero-bg" style={{ backgroundImage: `url(${img('exterior.webp')})` }} />
        <div className="page-hero-overlay" />
        <div className="page-hero-content">
          <span className="page-floor-label">The Forge · 285 Liberty St. N.E.</span>
          <h1 className="page-title" style={{ fontSize: 'clamp(2.5rem,6vw,5rem)' }}>Good<br />Questions.</h1>
        </div>
      </div>

      <div className="page-breadcrumb">
        <Link to="/">The Forge</Link>
        <span className="sep">·</span>
        <span className="current">FAQ</span>
      </div>

      <div className="faq-layout">
        <aside className="faq-sidebar">
          <h3>Jump to</h3>
          <ul className="faq-nav">
            {FAQ_SECTIONS.map(s => (
              <li key={s.id}>
                <a
                  href={`#${s.id}`}
                  className={activeSidebarId === s.id ? 'active' : ''}
                  onClick={() => setActiveSidebarId(s.id)}
                >
                  {s.id === 'events-faq' ? 'Events & Booking' : s.id === 'womens-collective-faq' ? "Women's Collective" : s.id === 'getting-here' ? 'Getting Here' : s.title}
                </a>
              </li>
            ))}
          </ul>
        </aside>

        <div className="faq-content">
          {FAQ_SECTIONS.map(section => (
            <div className="faq-section" id={section.id} key={section.id}>
              <h2 className="faq-section-title">
                <span className="faq-section-icon">{section.icon}</span> {section.title}
              </h2>

              {section.id === 'contact' ? (
                <>
                  <p style={{ fontSize: '.9rem', lineHeight: 1.75, color: 'var(--muted)', marginBottom: '1.5rem' }}>
                    Didn't find what you were looking for? We're easy to reach.
                  </p>
                  <div className="contact-cards">
                    <div className="contact-card"><strong>General Inquiries</strong><a href="mailto:inquiries@forgesalem.com">inquiries@forgesalem.com</a></div>
                    <div className="contact-card"><strong>Events &amp; Private Bookings</strong><a href="https://cellar54salem.com" target="_blank" rel="noopener">cellar54salem.com</a> · <a href="tel:5033023237">503-302-3237</a></div>
                    <div className="contact-card"><strong>Instagram</strong><a href="https://www.instagram.com/theforgesalem/" target="_blank" rel="noopener">@theforgesalem</a></div>
                    <div className="contact-card"><strong>TikTok</strong><a href="https://www.tiktok.com/@theforgesalem" target="_blank" rel="noopener">@theforgesalem</a></div>
                    <div className="contact-card"><strong>YouTube</strong><a href="https://www.youtube.com/@TheForgeSalem" target="_blank" rel="noopener">@TheForgeSalem</a></div>
                    <div className="contact-card"><strong>LinkedIn</strong><a href="https://www.linkedin.com/company/the-forge-salem" target="_blank" rel="noopener">The Forge Salem</a></div>
                    <div className="contact-card"><strong>Website</strong><a href="https://forgesalem.com" target="_blank" rel="noopener">forgesalem.com</a></div>
                  </div>
                </>
              ) : (
                section.items.map((item, idx) => {
                  const key = `${section.id}-${idx}`
                  const isOpen = !!openItems[key]
                  return (
                    <div className={`faq-item${isOpen ? ' open' : ''}`} key={key}>
                      <div className="faq-q" onClick={() => toggleItem(key)}>
                        {item.q} <span className="faq-arrow">▾</span>
                      </div>
                      <div className="faq-a">{item.a}</div>
                    </div>
                  )
                })
              )}
            </div>
          ))}
        </div>
      </div>

      <Footer />
    </>
  )
}
