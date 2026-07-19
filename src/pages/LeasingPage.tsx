import { useEffect, useState, FormEvent } from 'react'
import { sanitize, isValidEmail, isValidPhone } from '../utils/sanitize'
import { Link } from 'react-router-dom'
import Nav from '../components/Nav'
import Footer from '../components/Footer'
import { img } from '../utils/img'

export default function LeasingPage() {
  useEffect(() => { document.title = 'Leasing — The Forge Salem' }, [])

  const [submitted, setSubmitted] = useState(false)
  const [form, setForm] = useState({
    first: '', last: '', email: '', phone: '',
    business: '', type: '', sqft: '', movein: '', message: ''
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

      <div className="page-hero" style={{ minHeight: '280px' }}>
        <div className="page-hero-bg" style={{ backgroundImage: `url(${img('building-exterior.webp')})` }} />
        <div className="page-hero-overlay" />
        <div className="page-hero-content">
          <span className="page-floor-label">The Forge · 285 Liberty St. N.E.</span>
          <h1 className="page-title" style={{ fontSize: 'clamp(2.5rem,6vw,5rem)' }}>Space to<br />Build Something</h1>
        </div>
      </div>

      <div className="page-breadcrumb">
        <Link to="/">The Forge</Link>
        <span className="sep">·</span>
        <span className="current">Leasing</span>
      </div>

      {/* INTRO SPLIT */}
      <div className="lease-intro">
        <div className="lease-intro-img">
          <img src={img('FAQ/ForgeSpace.webp')} alt="The Forge interior — available leasing space, Downtown Salem, Oregon" loading="lazy" />
        </div>
        <div className="lease-intro-body">
          <div className="lease-eyebrow">Leasing at The Forge</div>
          <h2 className="lease-intro-title">Downtown Salem's<br />Most Vibrant Address</h2>
          <p className="lease-intro-text">The Forge is a 70,000 sq ft lifestyle collective in the heart of downtown Salem. With restaurants, event spaces, a fitness community, creative offices, and more — tenants here aren't just renting space, they're joining an ecosystem.</p>
          <p className="lease-intro-text">We have a range of spaces available: ground-floor retail, office suites, creative studios, and specialty commercial. If you're building something worth being proud of, we want to hear from you.</p>
        </div>
      </div>

      {/* WHY THE FORGE */}
      <div className="section section--paper" style={{ paddingTop: '4rem' }}>
        <div className="section-header">
          <div>
            <span className="section-label">Why Here</span>
            <h2 className="section-title">Built for Business</h2>
          </div>
        </div>
        <div className="why-grid">
          <div className="why-card">
            <div className="why-icon">📍</div>
            <h3 className="why-title">Prime Downtown Location</h3>
            <p className="why-text">Steps from the State Capitol, the transit hub, and Salem's best foot traffic. 285 Liberty St. N.E. is one of the most recognized addresses in the city.</p>
          </div>
          <div className="why-card">
            <div className="why-icon">🤝</div>
            <h3 className="why-title">Built-in Community</h3>
            <p className="why-text">When you lease at The Forge, you inherit an audience. Our events, restaurants, and programming bring hundreds of visitors through the building every week.</p>
          </div>
          <div className="why-card">
            <div className="why-icon">⚡</div>
            <h3 className="why-title">Flexible Space Types</h3>
            <p className="why-text">From intimate studios to larger commercial suites, we work with tenants to configure spaces that actually fit how they operate — not a one-size-fits-all template.</p>
          </div>
        </div>
      </div>

      {/* INQUIRY FORM */}
      <div className="inquiry-wrap" id="inquiry">
        <div className="inquiry-img">
          <img src={img('FAQ/ForgeSpace2.webp')} alt="Available suite for lease at The Forge, Downtown Salem" loading="lazy" />
        </div>
        <div className="inquiry-form-col">
          <h2>Express Interest</h2>
          <p className="form-sub">Tell us a little about your business and what you're looking for. We'll follow up within one business day.</p>

          {submitted ? (
            <div className="form-success">
              <p>✓ &nbsp;Thanks — we'll be in touch within one business day.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <div className="form-row">
                <div className="form-field"><label>First Name</label><input type="text" name="first" required placeholder="Jane" maxLength={50} autoComplete="given-name" value={form.first} onChange={handleChange} /></div>
                <div className="form-field"><label>Last Name</label><input type="text" name="last" required placeholder="Smith" maxLength={50} autoComplete="family-name" value={form.last} onChange={handleChange} /></div>
              </div>
              <div className="form-row">
                <div className="form-field"><label>Email</label><input type="email" name="email" required placeholder="jane@yourbusiness.com" maxLength={254} autoComplete="email" value={form.email} onChange={handleChange} /></div>
                <div className="form-field"><label>Phone</label><input type="tel" name="phone" placeholder="(503) 555-0100" maxLength={20} pattern="[\d\s\-().+]{7,20}" autoComplete="tel" value={form.phone} onChange={handleChange} /></div>
              </div>
              <div className="form-row">
                <div className="form-field"><label>Business Name</label><input type="text" name="business" placeholder="Your Business LLC" maxLength={100} autoComplete="organization" value={form.business} onChange={handleChange} /></div>
                <div className="form-field">
                  <label>Business Type</label>
                  <select name="type" value={form.type} onChange={handleChange}>
                    <option value="" disabled>Select one</option>
                    <option>Retail</option>
                    <option>Restaurant / Food &amp; Beverage</option>
                    <option>Office / Professional Services</option>
                    <option>Creative Studio</option>
                    <option>Health &amp; Wellness</option>
                    <option>Event / Entertainment</option>
                    <option>Other</option>
                  </select>
                </div>
              </div>
              <div className="form-row">
                <div className="form-field">
                  <label>Approximate Sq Footage Needed</label>
                  <select name="sqft" value={form.sqft} onChange={handleChange}>
                    <option value="" disabled>Select range</option>
                    <option>Under 500 sq ft</option>
                    <option>500 – 1,000 sq ft</option>
                    <option>1,000 – 2,500 sq ft</option>
                    <option>2,500 – 5,000 sq ft</option>
                    <option>5,000+ sq ft</option>
                    <option>Flexible / Not sure yet</option>
                  </select>
                </div>
                <div className="form-field">
                  <label>Target Move-In</label>
                  <select name="movein" value={form.movein} onChange={handleChange}>
                    <option value="" disabled>Select timeframe</option>
                    <option>As soon as possible</option>
                    <option>1 – 3 months</option>
                    <option>3 – 6 months</option>
                    <option>6 – 12 months</option>
                    <option>Just exploring</option>
                  </select>
                </div>
              </div>
              <div className="form-row full">
                <div className="form-field">
                  <label>Tell Us About Your Business</label>
                  <textarea name="message" placeholder="What you do, what you're looking for in a space, any questions you have…" maxLength={1000} value={form.message} onChange={handleChange} />
                </div>
              </div>
              <div className="form-submit">
                <button type="submit" className="btn btn--cherry" style={{ background: 'var(--cherry)', color: '#fff' }}>Send Inquiry</button>
              </div>
              <p className="form-note">
                Inquiries go directly to <a href="mailto:inquiries@forgesalem.com" style={{ color: 'var(--cherry)' }}>inquiries@forgesalem.com</a>
              </p>
            </form>
          )}
        </div>
      </div>


      <Footer />
    </>
  )
}
