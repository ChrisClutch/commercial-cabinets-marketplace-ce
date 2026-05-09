import { useState, useEffect, useRef, FormEvent } from 'react'

declare global {
  namespace JSX {
    interface IntrinsicElements {
      'behold-widget': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & { 'feed-id': string }
    }
  }
}
import { Link, useNavigate } from 'react-router-dom'
import Nav from '../components/Nav'
import Footer from '../components/Footer'
import { img } from '../utils/img'
import { getMessages, saveMessages, type CommunityMessage } from '../data/forgeStore'


const MONTHS = ['January','February','March','April','May','June','July','August','September','October','November','December']

const allEvents = [
  { date: '2026-05-16', title: 'Grand Opening — Day 2', venue: 'The Forge', category: 'events', desc: 'Day two of The Forge Grand Opening celebration.' },
  { date: '2026-05-30', title: 'Women\'s Boxing and Yoga', venue: 'The Forge', category: 'events', desc: 'Join us for a empowering session of boxing and yoga tailored for women.' },
]

export default function HomePage() {
  const navigate = useNavigate()

  useEffect(() => { document.title = "The Forge — Salem's Lifestyle Collective" }, [])

  useEffect(() => {
    if (document.querySelector('script[src="https://w.behold.so/widget.js"]')) return
    const s = document.createElement('script')
    s.type = 'module'
    s.src = 'https://w.behold.so/widget.js'
    document.head.append(s)
  }, [])

  useEffect(() => {
    const el = document.getElementById('connect')
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting && window.location.hash === '#connect') {
          navigate('/', { replace: true })
        }
      },
      { threshold: 0.1 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [navigate])

  const [filter, setFilter] = useState('all')
  const [nlSubmitted, setNlSubmitted] = useState(false)
  const [nlEmail, setNlEmail] = useState('')

  const [approvedMessages, setApprovedMessages] = useState<CommunityMessage[]>(() =>
    getMessages().filter(m => m.status === 'approved')
  )
  const [boardName, setBoardName] = useState('')
  const [boardMessage, setBoardMessage] = useState('')
  const [boardImage, setBoardImage] = useState('')
  const [boardSubmitted, setBoardSubmitted] = useState(false)
  const boardFileRef = useRef<HTMLInputElement>(null)

  const filteredEvents = allEvents
    .filter(e => filter === 'all' || e.category === filter)
    .sort((a, b) => a.date.localeCompare(b.date))

  function handleNL(e: FormEvent) {
    e.preventDefault()
    setNlSubmitted(true)
    setNlEmail('')
  }

  function handleBoardImage(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = () => setBoardImage(reader.result as string)
    reader.readAsDataURL(file)
  }

  function handleBoardSubmit(e: FormEvent) {
    e.preventDefault()
    const newMsg: CommunityMessage = {
      id: Date.now().toString(),
      name: boardName.trim() || 'Anonymous',
      message: boardMessage.trim(),
      image: boardImage || undefined,
      submittedAt: new Date().toISOString(),
      status: 'pending',
    }
    const all = getMessages()
    saveMessages([...all, newMsg])
    setBoardSubmitted(true)
    setBoardName('')
    setBoardMessage('')
    setBoardImage('')
    if (boardFileRef.current) boardFileRef.current.value = ''
  }

  return (
    <>
      <Nav />

      {/* HERO */}
      <section id="hero">
        <div className="hero-bg" />
        <div className="hero-overlay" />
        <div className="hero-content">
          <img
            src={img('logo.webp')}
            alt="The Forge"
            className="hero-logo-img"
            style={{ height: 'clamp(260px,40vw,480px)', width: 'auto', display: 'block', marginLeft: '-4rem', marginBottom: '0.5rem' }}
          />
          <p className="hero-tagline"><em>Elevated. Unapologetic. Unforgettable.</em></p>
          <div className="hero-actions">
            <a href="#floors" className="btn btn--ghost">Explore the Building</a>
            <a href="#events" className="btn btn--cherry" style={{ background: 'var(--cherry)', color: '#fff' }}>See What's On</a>
          </div>
          <span className="hero-address">
            285 Liberty St. N.E. &nbsp;·&nbsp; Downtown Salem, Oregon
          </span>
        </div>
      </section>

      {/* FLOOR SHOWCASE */}
      <section className="section section--deep" id="floors" style={{ borderBottom: '4px solid var(--cherry)', paddingTop: '3rem', overflow: 'hidden' }}>
        <div className="section-header">
          <div>
            <span className="section-label section-label--light">The Building</span>
            <h2 className="section-title section-title--light">Four Floors.<br />One Address.</h2>
          </div>
          <Link to="/faq" className="btn btn--ghost floors-btn">Hours &amp; Info</Link>
        </div>
        <div className="floors-grid">
          <Link to="/ground-floor" className="floor-card">
            <img src={img('ground-floor.webp')} alt="Ground Floor" />
            <div className="floor-card-body">
              <span className="floor-level">Ground Floor</span>
              <div className="floor-name">Dining &amp;<br />The Heart</div>
              <div className="floor-tenants">Bonzai! · Jade Dumplings · Dreamies Creamery<br />Retail · Boutiques · Services</div>
              <span className="floor-explore">Explore</span>
            </div>
          </Link>
          <Link to="/womens-collective" className="floor-card">
            <img src={img('womens-collective.webp')} alt="Women's Collective" />
            <div className="floor-card-body">
              <span className="floor-level">Second Floor</span>
              <div className="floor-name">Women's<br />Collective</div>
              <div className="floor-tenants">Clink! · 20+ suites<br />Hair · Wellness · Aesthetics</div>
              <span className="floor-explore">Explore</span>
            </div>
          </Link>
          <Link to="/cellar-54" className="floor-card">
            <img src={img('cellar54.webp')} alt="Cellar 54 — Lower Level" />
            <div className="floor-card-body">
              <span className="floor-level">Lower Level</span>
              <div className="floor-name">Cellar 54</div>
              <div className="floor-tenants">Private event venue<br />Intimate dinners · Milestone celebrations</div>
              <span className="floor-explore">Explore</span>
            </div>
          </Link>
          <Link to="/anthem" className="floor-card">
            <img src={img('anthem.webp')} alt="Anthem — Third Floor" />
            <div className="floor-card-body">
              <span className="floor-level">Third Floor</span>
              <div className="floor-name">Anthem</div>
              <div className="floor-tenants">Financial strategy &amp; advisory<br />Anthem Strategists</div>
              <span className="floor-explore">Explore</span>
            </div>
          </Link>
        </div>
      </section>

      {/* EVENTS */}
      <section className="section section--paper" id="events" style={{ paddingTop: '3rem' }}>
        <div className="events-header">
          <div>
            <span className="section-label">What's Happening</span>
            <h2 className="section-title">The Calendar</h2>
          </div>
          <div style={{ fontFamily: 'var(--display)', fontSize: '1rem', fontWeight: 400, letterSpacing: '0.06em', color: 'var(--ink)' }}>
            Upcoming Events
          </div>
        </div>
        <div className="filter-bar" role="group" aria-label="Filter events">
          {(['all','dining','events','wellness'] as const).map(f => (
            <button
              key={f}
              className={`filter-btn${filter === f ? ' active' : ''}`}
              onClick={() => setFilter(f)}
            >
              {f === 'all' ? 'All' : f.charAt(0).toUpperCase() + f.slice(1)}
            </button>
          ))}
        </div>
        {filteredEvents.length === 0 ? (
          <div className="no-events">
            Nothing scheduled yet — check back soon, or{' '}
            <a href="mailto:inquiries@forgesalem.com" style={{ color: 'var(--cherry)' }}>reach out</a> to host your own.
          </div>
        ) : (
          <div className="events-list">
            {filteredEvents.map((ev, i) => {
              const [yr, mo, dy] = ev.date.split('-').map(Number)
              return (
                <div className="event-card" key={i}>
                  <div className="event-date-tag">
                    <span className="event-day">{String(dy).padStart(2, '0')}</span>
                    <span className="event-month-year">{MONTHS[mo - 1]}<br />{yr}</span>
                  </div>
                  <span className={`event-cat ${ev.category}`}>{ev.category}</span>
                  <h3 className="event-title">{ev.title}</h3>
                  <p className="event-venue">{ev.venue}</p>
                  <p className="event-desc">{ev.desc}</p>
                </div>
              )
            })}
          </div>
        )}
      </section>

      {/* COMMUNITY BOARD */}
      <section className="section section--paper" id="community" style={{ paddingTop: '3rem', background: 'var(--cream)' }}>
        <div className="events-header">
          <div>
            <span className="section-label">From Our Community</span>
            <h2 className="section-title">Community Board</h2>
          </div>
          <p style={{ fontFamily: 'var(--display)', fontSize: '1rem', fontWeight: 400, letterSpacing: '0.06em', color: 'var(--ink)' }}>
            Share your experience
          </p>
        </div>

        {/* Approved messages grid */}
        {approvedMessages.length > 0 && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '1.25rem', marginBottom: '2.5rem' }}>
            {approvedMessages.map(msg => (
              <div key={msg.id} style={{ background: '#fff', border: '1px solid #e8e2d9', borderRadius: '6px', overflow: 'hidden' }}>
                {msg.image && (
                  <img src={msg.image} alt="" style={{ width: '100%', height: '180px', objectFit: 'cover', display: 'block' }} />
                )}
                <div style={{ padding: '1.25rem' }}>
                  <p style={{
                    fontFamily: 'var(--display)', fontSize: 'clamp(0.95rem, 2.5vw, 1.05rem)',
                    fontStyle: 'italic', color: 'var(--ink)', lineHeight: 1.7, marginBottom: '0.75rem',
                  }}>
                    "{msg.message}"
                  </p>
                  <span style={{ fontSize: '0.65rem', color: 'var(--muted)', letterSpacing: '0.06em' }}>— {msg.name}</span>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Submission form */}
        <div style={{ background: 'var(--void)', borderRadius: '6px', padding: '2rem 2.25rem', maxWidth: '560px' }}>
          <h3 style={{ fontFamily: 'var(--display)', fontSize: '1.4rem', fontWeight: 300, color: '#f3eedf', marginBottom: '0.4rem' }}>
            Leave a Note
          </h3>
          <p style={{ fontSize: '0.75rem', color: 'rgba(183,192,200,0.55)', marginBottom: '1.5rem', fontWeight: 300 }}>
            Your message will appear here after review.
          </p>

          {boardSubmitted ? (
            <p style={{ fontSize: '0.85rem', color: '#5aac7a', fontWeight: 400, letterSpacing: '0.04em' }}>
              ✓ Thanks! Your note is pending review.
            </p>
          ) : (
            <form onSubmit={handleBoardSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '0.9rem' }}>
              <input
                type="text"
                placeholder="Your name (optional)"
                value={boardName}
                onChange={e => setBoardName(e.target.value)}
                style={{
                  background: '#1f2e3c', border: '1px solid #2a3540', borderRadius: '3px',
                  color: '#f3eedf', fontSize: '0.82rem', padding: '0.65rem 0.9rem',
                  outline: 'none', fontFamily: 'Inter, system-ui, sans-serif',
                }}
              />
              <textarea
                placeholder="Share your experience at The Forge…"
                required
                value={boardMessage}
                onChange={e => setBoardMessage(e.target.value)}
                rows={3}
                style={{
                  background: '#1f2e3c', border: '1px solid #2a3540', borderRadius: '3px',
                  color: '#f3eedf', fontSize: '0.82rem', padding: '0.65rem 0.9rem',
                  outline: 'none', fontFamily: 'Inter, system-ui, sans-serif',
                  resize: 'vertical', lineHeight: 1.6,
                }}
              />

              {/* Image upload */}
              <div>
                <input
                  ref={boardFileRef}
                  type="file"
                  accept="image/*"
                  onChange={handleBoardImage}
                  style={{ display: 'none' }}
                  id="board-image-upload"
                />
                <label
                  htmlFor="board-image-upload"
                  style={{
                    display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
                    background: 'none', border: '1px solid #2a3540', borderRadius: '3px',
                    color: boardImage ? '#5aac7a' : '#7a8a95',
                    fontSize: '0.65rem', letterSpacing: '0.1em', textTransform: 'uppercase',
                    padding: '0.55rem 1rem', cursor: 'pointer',
                    fontFamily: 'Inter, system-ui, sans-serif',
                  }}
                >
                  {boardImage ? '✓ Image attached' : '+ Attach image'}
                </label>
                {boardImage && (
                  <button
                    type="button"
                    onClick={() => { setBoardImage(''); if (boardFileRef.current) boardFileRef.current.value = '' }}
                    style={{
                      background: 'none', border: 'none', color: '#7a8a95',
                      fontSize: '0.65rem', cursor: 'pointer', marginLeft: '0.75rem',
                      fontFamily: 'Inter, system-ui, sans-serif',
                    }}
                  >
                    Remove
                  </button>
                )}
                {boardImage && (
                  <div style={{ marginTop: '0.65rem' }}>
                    <img src={boardImage} alt="Preview" style={{ height: '80px', width: 'auto', borderRadius: '3px', objectFit: 'cover' }} />
                  </div>
                )}
              </div>

              <button
                type="submit"
                style={{
                  alignSelf: 'flex-start', background: 'var(--cherry)', color: '#fff',
                  border: 'none', borderRadius: '3px', padding: '0.65rem 1.6rem',
                  fontSize: '0.65rem', letterSpacing: '0.12em', textTransform: 'uppercase',
                  cursor: 'pointer', fontFamily: 'Inter, system-ui, sans-serif', fontWeight: 600,
                }}
              >
                Submit
              </button>
            </form>
          )}
        </div>
      </section>

      {/* SOCIAL */}
      <section className="section section--deep" id="social" style={{ paddingTop: '3rem' }}>
        <div className="social-header">
          <div>
            <span className="section-label">On Instagram</span>
            <h2 className="section-title">@theforgesalem</h2>
            <p style={{ fontSize: '0.82rem', fontWeight: 300, color: 'var(--muted)', marginTop: '0.5rem' }}>
              Follow along — we're building something good.
            </p>
          </div>
          <a href="https://www.instagram.com/theforgesalem/" target="_blank" rel="noopener" className="btn btn--ghost">
            Follow on Instagram
          </a>
        </div>
        <behold-widget feed-id="3FmCp50v68XOSprBY5YE" />
        <div className="social-foot">
          <span className="social-tag">#TheForge &nbsp;#ForgeSalem &nbsp;#Clink</span>
          <a href="https://www.instagram.com/theforgesalem/" target="_blank" rel="noopener" className="btn btn--ghost" style={{ fontSize: '0.58rem', padding: '0.52rem 1rem' }}>
            View All →
          </a>
        </div>
      </section>

      {/* CONNECT */}
      <section id="connect" className="connect-grid">
        <div style={{ background: 'var(--paper)', padding: '4rem var(--section-h)', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <span style={{ fontSize: '0.57rem', fontWeight: 600, letterSpacing: '0.26em', textTransform: 'uppercase', color: 'var(--muted)', display: 'block', marginBottom: '1rem' }}>Find Us</span>
          <h2 style={{ fontFamily: 'var(--display)', fontSize: 'clamp(1.8rem,2.5vw,2.6rem)', fontWeight: 300, lineHeight: 1.1, marginBottom: '1.6rem' }}>Come See<br />For Yourself</h2>
          <div className="connect-info-grid">
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
              <div>
                <span style={{ fontSize: '0.55rem', fontWeight: 600, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--muted)', display: 'block', marginBottom: '0.3rem' }}>Address</span>
                <p style={{ fontSize: '0.87rem', fontWeight: 300, lineHeight: 1.8 }}>285 Liberty St. N.E.<br />Downtown Salem, Oregon 97301</p>
              </div>
              <div>
                <span style={{ fontSize: '0.55rem', fontWeight: 600, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--muted)', display: 'block', marginBottom: '0.3rem' }}>Hours</span>
                <p style={{ fontSize: '0.87rem', fontWeight: 300, lineHeight: 2 }}>
                  Monday: 8:00 AM – 7:00 PM<br />
                  Tuesday: 8:00 AM – 7:00 PM<br />
                  Wednesday: 8:00 AM – 9:00 PM<br />
                  Thursday: 8:00 AM – 9:00 PM<br />
                  Friday: 8:00 AM – 9:00 PM<br />
                  Saturday: 8:30 AM – 9:00 PM<br />
                  Sunday: 8:30 AM – 9:00 PM
                </p>
              </div>
            </div>
            <iframe
              title="The Forge — 285 Liberty St NE, Salem OR"
              src="https://maps.google.com/maps?q=285+Liberty+St+NE+Salem+OR+97301&t=&z=16&ie=UTF8&iwloc=&output=embed"
              className="connect-map"
              width="100%"
              height="280"
              style={{ border: 'none', display: 'block', filter: 'grayscale(20%)' }}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
          <div style={{ display: 'flex', gap: '0.8rem', flexWrap: 'wrap' }}>
            <a href="https://maps.google.com/?q=285+Liberty+St+NE+Salem+OR" target="_blank" rel="noopener" className="btn">Get Directions</a>
            <a href="mailto:inquiries@forgesalem.com" className="btn btn--cherry" style={{ background: 'var(--cherry)', color: '#fff' }}>Say Hello</a>
          </div>
        </div>

        <div className="newsletter-box" style={{ background: 'var(--void)', padding: '3.5rem 3rem 3.5rem 4rem', display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: '1.4rem', alignSelf: 'center', margin: '2.5rem 2.5rem 2.5rem 2.5rem' }}>
          <div>
            <span style={{ fontSize: '0.54rem', fontWeight: 600, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(183,192,200,0.45)', display: 'block', marginBottom: '0.6rem' }}>Newsletter</span>
            <h2 style={{ fontFamily: 'var(--display)', fontSize: '1.8rem', fontWeight: 300, color: '#faf5f1', lineHeight: 1.2, marginBottom: '0.5rem' }}>Stay in the Know</h2>
            <p style={{ fontSize: '0.82rem', fontWeight: 300, color: 'rgba(183,192,200,0.5)', lineHeight: 1.65 }}>Events and invites, first to your inbox.</p>
          </div>
          <form className="nl-form" onSubmit={handleNL} style={{ display: 'flex', gap: 0, maxWidth: '320px' }}>
            <input
              className="nl-input"
              type="email"
              placeholder="your@email.com"
              required
              value={nlEmail}
              onChange={e => setNlEmail(e.target.value)}
              disabled={nlSubmitted}
              style={{ flex: 1, fontSize: '0.78rem', padding: '0.6rem 0.9rem' }}
            />
            <button
              className="nl-submit"
              type="submit"
              disabled={nlSubmitted}
              style={{
                fontSize: '0.62rem', padding: '0.6rem 1.1rem', letterSpacing: '0.08em',
                ...(nlSubmitted ? { background: 'var(--void)', borderColor: 'var(--void)' } : {})
              }}
            >
              {nlSubmitted ? "You're in ✓" : 'Go'}
            </button>
          </form>
        </div>
      </section>

      <Footer />
    </>
  )
}
