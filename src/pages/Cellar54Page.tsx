import { useEffect, useState, FormEvent } from 'react'
import { sanitize, isValidEmail, isValidPhone } from '../utils/sanitize'
import { Link } from 'react-router-dom'
import Nav from '../components/Nav'
import Footer from '../components/Footer'
import { img } from '../utils/img'

export default function Cellar54Page() {
  useEffect(() => { document.title = 'Cellar 54 — The Forge Salem' }, [])

  const [submitted, setSubmitted] = useState(false)
  const [form, setForm] = useState({
    name: '', email: '', eventType: '', guestCount: '',
    date: '', phone: '', message: ''
  })

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) {
    const { name, value } = e.target
    const sanitized = e.target.tagName === 'SELECT' ? value : sanitize(value)
    setForm(prev => ({ ...prev, [name]: sanitized }))
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault()
    if (!isValidEmail(form.email)) return
    if (!isValidPhone(form.phone)) return
    setSubmitted(true)
  }

  return (
    <>
      <Nav />

      <div className="page-hero" style={{ minHeight: '700px' }}>
        <div className="page-hero-bg" style={{ backgroundImage: `url(${img('cellar54.webp')})` }} />
        <div className="page-hero-overlay" style={{ background: 'linear-gradient(to bottom,rgba(26,15,13,.4) 0%,rgba(26,15,13,.88) 100%)' }} />
        <div className="page-hero-content" style={{ paddingBottom: '8rem' }}>
          <span className="page-floor-label" style={{ color: 'rgba(255,255,255,0.72)', textShadow: '0 1px 6px rgba(0,0,0,0.5)', fontSize: '0.65rem' }}>Lower Level · 285 Liberty St. N.E.</span>
          <h1 className="page-title">Cellar 54</h1>
          <p className="page-tagline">Underground, unforgettable. Salem's premier private event space lives below street level — and above your expectations.</p>
        </div>
      </div>

      <div className="page-breadcrumb">
        <Link to="/">The Forge</Link>
        <span className="sep">·</span>
        <span className="current">Cellar 54</span>
      </div>

      {/* ABOUT */}
      <div className="section section--cream about-split">
        <div>
          <span className="section-label">Lower Level</span>
          <h2 className="section-title">Below the Street.<br />Above the Rest.</h2>
        </div>
        <div>
          <p style={{ fontSize: '.95rem', lineHeight: 1.85, opacity: .85, marginBottom: '1rem' }}>
            Cellar 54 is the event space Salem didn't know it was missing. Below street level, beneath the hum of the building above — it's a room that creates its own world the moment the doors close.
          </p>
          <p style={{ fontSize: '.95rem', lineHeight: 1.85, opacity: .85, marginBottom: '1rem' }}>
            The exposed brick, the intimate scale, the careful lighting — everything about Cellar 54 is designed to make your event feel deliberate and memorable. This is where milestones are celebrated, where deals get closed over dinner, and where weddings find the room that fits exactly right.
          </p>
          <p style={{ fontSize: '.95rem', lineHeight: 1.85, opacity: .85, marginBottom: '1.5rem' }}>
            Full-service events team. In-house catering coordination. A bar setup that means your guests never have to go far.
          </p>
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', alignItems: 'center' }}>
            <a href="https://cellar54salem.com" target="_blank" rel="noopener noreferrer" className="btn btn--cherry" style={{ background: 'var(--cherry)', color: '#fff' }}>Visit cellar54salem.com</a>
            <a href="mailto:info@cellar54salem.com" className="btn btn--filled btn--static">Email Us!</a>
          </div>
        </div>
      </div>

      {/* SPECS */}
      <div className="specs-grid">
        <div className="spec-card"><div className="spec-num">180</div><div className="spec-label">Seated Capacity</div></div>
        <div className="spec-card"><div className="spec-num">200</div><div className="spec-label">Reception Style</div></div>
        <div className="spec-card"><div className="spec-num">Full</div><div className="spec-label">Bar Service</div></div>
        <div className="spec-card"><div className="spec-num">The A</div><div className="spec-label">Sound System</div></div>
      </div>

      {/* EVENT TYPES */}
      <div className="section section--paper" style={{ paddingTop: '4rem' }}>
        <div className="section-header">
          <div>
            <span className="section-label">What We Do</span>
            <h2 className="section-title">Any Occasion.<br />Every Detail.</h2>
          </div>
        </div>
        <div className="event-types">
          <div className="event-type-card">
            <h3>Private Dinners</h3>
            <p>Six to eighty guests. Catered menus curated with our ground floor partners — Bonzai and Jade — or your own preferred caterer. The kind of dinner people talk about the next day.</p>
          </div>
          <div className="event-type-card">
            <h3>Corporate Events</h3>
            <p>Quarterly gatherings, product launches, milestone celebrations, team dinners. A space that makes your event feel like you put real thought into it. Because you did.</p>
          </div>
          <div className="event-type-card">
            <h3>Weddings &amp; Milestones</h3>
            <p>Rehearsal dinners, wedding receptions, anniversary celebrations. Cellar 54 has hosted more than a few moments that people still talk about years later. We take that seriously.</p>
          </div>
        </div>
      </div>

      {/* GALLERY */}
      <div className="section section--cream" style={{ paddingTop: '4rem' }}>
        <div className="section-header">
          <div>
            <span className="section-label">Cellar 54</span>
            <h2 className="section-title">The Space</h2>
          </div>
        </div>
        <div className="gallery-grid">
          <div className="gal-item"><img src={img('cellar54/cellar54_3.webp')} alt="Cellar 54 interior" loading="lazy" /><span className="gal-cap">The Space</span></div>
          <div className="gal-item"><img src={img('cellar54/cellar54_2.webp')} alt="Cellar 54 venue" loading="lazy" /><span className="gal-cap">The Venue</span></div>
          <div className="gal-item"><img src={img('cellar54/cellar54_tables.webp')} alt="Cellar 54 table setting" loading="lazy" /><span className="gal-cap">Dinner Setting</span></div>
          <div className="gal-item"><img src={img('cellar54/green_room.webp')} alt="Cellar 54 green room" loading="lazy" /><span className="gal-cap">Green Room</span></div>
          <div className="gal-item"><img src={img('cellar54/cellar54_2.webp')} alt="Cellar 54 event space" loading="lazy" /><span className="gal-cap">Event Night</span></div>
          <div className="gal-item"><img src={img('cellar54/cellar54_4.webp')} alt="Cellar 54" loading="lazy" /><span className="gal-cap">The Experience</span></div>
        </div>
      </div>

      {/* BOOKING */}
      <div className="booking-split" id="booking">
        <div className="booking-img">
          <img src={img('cellar54.webp')} alt="Cellar 54" loading="lazy" />
        </div>
        <div className="booking-form-section">
          <h2>Inquire About<br />Your Event</h2>
          <p>Tell us a bit about what you're planning. Our events team will be in touch within one business day. You can also reach us directly at <a href="mailto:info@cellar54salem.com">info@cellar54salem.com</a> or visit <a href="https://cellar54salem.com" target="_blank" rel="noopener noreferrer">cellar54salem.com</a>.</p>
          {submitted ? (
            <div style={{ background: '#3a5a3a', color: '#fff', padding: '1.2rem 1.5rem', fontSize: '.9rem' }}>
              ✓ &nbsp;Inquiry sent — we'll be in touch within one business day.
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <div className="form-row">
                <div className="form-field"><label>Your Name</label><input type="text" name="name" placeholder="Jane Smith" required maxLength={100} autoComplete="name" value={form.name} onChange={handleChange} /></div>
                <div className="form-field"><label>Email</label><input type="email" name="email" placeholder="jane@email.com" required maxLength={254} autoComplete="email" value={form.email} onChange={handleChange} /></div>
              </div>
              <div className="form-row">
                <div className="form-field">
                  <label>Event Type</label>
                  <select name="eventType" value={form.eventType} onChange={handleChange}>
                    <option value="">Select one…</option>
                    <option>Private Dinner</option>
                    <option>Corporate Event</option>
                    <option>Wedding / Reception</option>
                    <option>Birthday / Milestone</option>
                    <option>Other</option>
                  </select>
                </div>
                <div className="form-field"><label>Estimated Guest Count</label><input type="text" name="guestCount" placeholder="e.g. 40–60 guests" maxLength={20} value={form.guestCount} onChange={handleChange} /></div>
              </div>
              <div className="form-row">
                <div className="form-field"><label>Preferred Date</label><input type="date" name="date" value={form.date} onChange={handleChange} /></div>
                <div className="form-field"><label>Phone (optional)</label><input type="tel" name="phone" placeholder="(503) 000-0000" maxLength={20} pattern="[\d\s\-().+]{7,20}" autoComplete="tel" value={form.phone} onChange={handleChange} /></div>
              </div>
              <div className="form-field" style={{ marginBottom: '1.5rem' }}>
                <label>Tell Us More</label>
                <textarea name="message" placeholder="Any details about your event, special requests, or questions for the team…" maxLength={1000} value={form.message} onChange={handleChange} />
              </div>
              <button type="submit" className="btn btn--filled" style={{ width: '100%', textAlign: 'center' }}>
                Send Inquiry
              </button>
            </form>
          )}
        </div>
      </div>

      <div className="pull-quote" style={{ padding: '4rem var(--section-h)' }}>
        <div className="pull-quote-mark">"</div>
        <p className="pull-quote-text">Underground, unforgettable. The event space Salem didn't know it was missing.</p>
        <span className="pull-quote-attr">— Cellar 54 at The Forge</span>
      </div>

      <Footer />
    </>
  )
}
