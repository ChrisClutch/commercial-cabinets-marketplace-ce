import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import Nav from '../components/Nav'
import Footer from '../components/Footer'
import NewsletterStrip from '../components/NewsletterStrip'
import { img } from '../utils/img'

export default function GroundFloorPage() {
  useEffect(() => { document.title = 'Ground Floor — The Forge Salem' }, [])

  return (
    <>
      <Nav />

      <div className="page-hero" style={{ minHeight: '700px' }}>
        <div className="page-hero-bg" style={{ backgroundImage: `url(${img('ground-floor.webp')})` }} />
        <div className="page-hero-overlay" />
        <div className="page-hero-content">
          <span className="page-floor-label" style={{ color: 'rgba(255,255,255,0.72)', textShadow: '0 1px 6px rgba(0,0,0,0.5)', fontSize: '0.65rem' }}>Ground Floor · 285 Liberty St. N.E.</span>
          <h1 className="page-title">The Heart<br />of It All</h1>
          <p className="page-tagline">Where Salem comes to eat well, stay long, and come back again.</p>
        </div>
      </div>

      <div className="page-breadcrumb">
        <Link to="/">The Forge</Link>
        <span className="sep">·</span>
        <span className="current">Ground Floor</span>
      </div>

      {/* BONZAI */}
      <div className="feature-split" style={{ minHeight: '100vh' }}>
        <div className="feature-visual">
          <img src={img('groundfloor/Bonzai_Entrance.webp')} alt="Bonzai restaurant" loading="lazy" />
        </div>
        <div className="feature-body feature-body--paper">
          <div className="feature-eyebrow">Ground Floor</div>
          <h2 className="feature-title">Bonzai</h2>
          <p className="feature-text">Bonzai! is a fusion of... well, us! Founded by two half-Japanese coffee shop professionals, our space is a reflection of who we are - half American, half Japanese, and all about bringing those worlds together.</p>
          <p className="feature-text">We're one part Pacific Northwest coffeehouse, one part apanese teabar. That means you'll find the classics - lattes, cold brew, and coffeehouse vibes - right alongside flavorful matcha, eclectic boba drinks, rice bowls, and even some Japanese lagers & seltzers.</p>
          <p className="feature-text">Bonzai! is where traditional coffee vibes meet Japanese tradition and culture. Half coffee shop, half matcha & boba spot. All the flavor. All the fusion. All the Bonzai!</p>
          <div className="feature-meta">
            <div className="feature-meta-item"><label>Cuisine</label><span>Pacific Rim</span></div>
            <div className="feature-meta-item"><label>Hours</label><span>Mon, Wed – Thu, Sun: 7am – 7pm · Fri – Sat: 7am – 9pm · Closed Tuesdays</span></div>
            <div className="feature-meta-item"><label>Bar</label><span>Full service</span></div>
          </div>
          <div className="feature-actions">
            <a href="https://bonzaicoffeeteabar.com" target="_blank" rel="noopener noreferrer" className="btn btn--cherry" style={{ background: 'var(--cherry)', color: '#fff' }}>Visit Website</a>
            <Link to="/#events" className="btn">See Upcoming Events</Link>
          </div>
        </div>
      </div>

      {/* JADE DUMPLINGS */}
      <div className="jade-split">
        <div className="feature-body feature-body--cream">
          <div className="feature-eyebrow">Ground Floor</div>
          <div className="jade-title-row">
            <h2 className="feature-title">Jade Dumpling & Noodle House</h2>
            <img src={img('directory/first_floor/jade_dumpling.webp')} alt="Jade Dumpling & Noodle House logo" className="jade-logo jade-logo--inline" />
          </div>
          <p className="feature-text">Hand-folded. Made fresh. Locally adored. Jade Dumpling & Noodle House has become one of those places Salem talks about the way people talk about restaurants in cities three times its size. The dim sum is the real thing — not a shortcut in sight.</p>
          <p className="feature-text">Whether you're coming in for a quick lunch or settling in for a full dinner, every dish is made with care and served the way it was meant to be eaten.</p>
          <div className="feature-meta">
            <div className="feature-meta-item"><label>Specialty</label><span>Dim sum &amp; dumplings</span></div>
            <div className="feature-meta-item"><label>Hours</label><span>Wed – Mon, 11:30am – 9:30pm · Closed Tuesdays</span></div>
          </div>
          <div className="feature-actions">
            <a href="https://www.instagram.com/jade_dumpling_oregon/" target="_blank" rel="noopener noreferrer" className="btn btn--cherry" style={{ background: 'var(--cherry)', color: '#fff' }}>Visit Website</a>
          </div>
        </div>
        <div className="jade-logo-col">
          <img src={img('directory/first_floor/jade_dumpling.webp')} alt="Jade Dumpling & Noodle House logo" className="jade-logo" />
        </div>
      </div>

      {/* NOIRA */}
      <div className="feature-split feature-split--rev">
        <div className="feature-visual">
          <img src={img('groundfloor/Noira1.webp')} alt="Noira" loading="lazy" />
        </div>
        <div className="feature-body feature-body--paper">
          <div className="feature-eyebrow">Ground Floor</div>
          <h2 className="feature-title">Noira</h2>
          <p className="feature-text">Approachable and romantic. Thoughtfully curated wine, seasonal menu, and local art.</p>
          <div className="feature-meta">
            <div className="feature-meta-item"><label>Type</label><span>Wine Bar</span></div>
            <div className="feature-meta-item"><label>Suite</label><span>Suite 135</span></div>
            <div className="feature-meta-item"><label>Wed – Thu</label><span>12pm – 8pm</span></div>
            <div className="feature-meta-item"><label>Fri – Sat</label><span>12pm – 9pm</span></div>
            <div className="feature-meta-item"><label>Sunday</label><span>10am – 4pm</span></div>
            <div className="feature-meta-item"><label>Mon – Tue</label><span>Closed</span></div>
          </div>
          <div className="feature-actions">
            <a href="https://barnoira.com" target="_blank" rel="noopener noreferrer" className="btn btn--cherry" style={{ background: 'var(--cherry)', color: '#fff' }}>View Menu</a>
          </div>
        </div>
      </div>

      {/* GROUND FLOOR TENANTS */}
      <div className="section section--cream" style={{ paddingTop: '4rem' }}>
        <div className="section-header">
          <div>
            <span className="section-label">Ground Floor</span>
            <h2 className="section-title">Also on the<br />Ground Floor</h2>
          </div>
        </div>
        <div className="tenant-grid" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))' }}>
          {[
            { name: 'A Wonderful World PNW',  type: 'Retail',             suite: 'Suite 145', logo: 'directory/first_floor/a_wonderful_world.webp',    website: 'https://www.instagram.com/a_wonderful_world_pnw/' },
            { name: 'Root Cellar Market',      type: 'Food & Drink',       suite: 'Suite 155', logo: 'directory/first_floor/root_cellar.webp',           website: 'https://www.rootcellarmarket.com/' },
            { name: 'Ivory Bull & Co',         type: 'Retail',             suite: 'Suite 133', logo: 'directory/first_floor/ivory_bull_logo.webp',       logoCircle: true, website: 'https://ivorybullandco.com/' },
            { name: 'Black Label Marketing',   type: 'Office & Services',  suite: 'Suite 100', logo: 'directory/first_floor/black_label_marketing.webp', website: 'https://blacklabelmarketingonline.com/' },
            { name: 'Bridal Glitter & Glam',   type: 'Retail',             suite: 'Suite 102', logo: 'directory/first_floor/Bridal_Glitter_Glam.svg',    website: 'https://glitterandglambridal.com/' },
            { name: 'Aloe Restorative Retreat',type: 'Health & Wellness',  suite: 'Suite 160', logo: 'directory/first_floor/aloe_logo.webp',             logoCircle: true, logoStyle: { objectFit: 'contain' as const, transform: 'scale(0.7)' }, comingSoon: true },
          ].map((t, i) => (
            <div className="tenant-card section--paper" key={i} style={{ padding: '1.4rem 1.4rem' }}>
              {t.logo && (
                <div className={`dir-tenant-logo${t.logoCircle ? ' dir-tenant-logo--circle' : ''}`}>
                  <img src={img(t.logo)} alt={`${t.name} logo`} style={t.logoStyle} />
                </div>
              )}
              <div className="tenant-card-name" style={{ fontSize: '1rem' }}>{t.name}</div>
              <div className="tenant-card-type">{t.type}</div>
              <div className="tenant-card-desc">{t.suite}</div>
              {t.comingSoon ? (
                <span className="dir-tenant-coming-soon">Coming Soon</span>
              ) : t.website && (
                <a href={t.website} target="_blank" rel="noopener" className="dir-tenant-link">Visit Website →</a>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* GALLERY */}
      <div className="section section--cream" style={{ paddingTop: '4rem', overflow: 'hidden' }}>
        <div className="section-header">
          <div>
            <span className="section-label">Ground Floor</span>
            <h2 className="section-title">The Space</h2>
          </div>
        </div>
        <div className="gallery-6">
          <div className="g6-banner"><img src={img('groundfloor/Bonzai_Overview.webp')} alt="Bonzai overview" loading="lazy" /></div>
          <div><img src={img('groundfloor/Ivory_Bull.webp')} alt="Ivory Bull" loading="lazy" /></div>
          <div className="g6-placeholder">
            <img src={img('hero.webp')} alt="The Forge" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
          </div>
          <div className="g6-hide-mobile"><img src={img('groundfloor/Dreamies_Creamery.webp')} alt="Dreamies Creamery" loading="lazy" /></div>
          <div className="g6-banner"><img src={img('ground-floor.webp')} alt="Ground floor dining area" loading="lazy" /></div>
        </div>
      </div>

      <div className="pull-quote" style={{ padding: '4rem var(--section-h)' }}>
        <div className="pull-quote-mark">"</div>
        <p className="pull-quote-text">The best dumplings in the Willamette Valley. That's not marketing — go try them.</p>
        <span className="pull-quote-attr">— The Forge</span>
      </div>

      <NewsletterStrip subtext="Events, new menus, and reservations — first to your inbox." />

      <Footer />
    </>
  )
}
