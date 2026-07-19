import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import Nav from '../components/Nav'
import Footer from '../components/Footer'
import NewsletterStrip from '../components/NewsletterStrip'
import { img } from '../utils/img'

export default function WomensCollectivePage() {
  useEffect(() => { document.title = "Women's Collective — The Forge Salem" }, [])

  return (
    <>
      <Nav />

      <div className="page-hero" style={{ minHeight: '700px' }}>
        <div className="page-hero-bg" style={{ backgroundImage: `url(${img('womens-collective.webp')})` }} />
        <div className="page-hero-overlay" style={{ background: 'linear-gradient(to bottom,rgba(225,6,0,.12) 0%,rgba(22,31,40,.78) 100%)' }} />
        <div className="page-hero-content">
          <span className="page-floor-label" style={{ color: 'var(--confidence)' }}>Second Floor · 285 Liberty St. N.E.</span>
          <h1 className="page-title">Women's<br />Collective</h1>
          <p className="page-tagline">Twenty-three suites. A champagne bar. The best bathroom in Oregon. The second floor has opinions.</p>
        </div>
      </div>

      <div className="page-breadcrumb">
        <Link to="/">The Forge</Link>
        <span className="sep">·</span>
        <span className="current">Women's Collective</span>
      </div>

      {/* INTRO */}
      <div className="section section--cream about-split">
        <div>
          <span className="section-label">About the Floor</span>
          <h2 className="section-title">Built for Women.<br />By Women.</h2>
        </div>
        <div>
          <p style={{ fontSize: '.95rem', lineHeight: 1.85, opacity: .85, marginBottom: '1rem' }}>
            The second floor of The Forge is home to Salem's most curated gathering of wellness, beauty, and community. Twenty-three suites house independent practitioners who chose this floor because they wanted to be part of something larger than their own four walls.
          </p>
          <p style={{ fontSize: '.95rem', lineHeight: 1.85, opacity: .85 }}>
            From Clink!'s cherry blossom champagne bar to The Hot Loft's 6am infrared pilates to Luxe Lash's perpetual waiting list — this floor has range. Come up for one thing. Leave having found three more.
          </p>
        </div>
      </div>

      <div style={{ borderTop: '1px solid rgba(42,53,64,0.1)', margin: '0 var(--section-h)' }} />

      {/* CLINK! */}
      <div className="clink-split" id="clink">
        <div className="clink-img">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gridTemplateRows: '1fr 1fr', height: '100%', gap: '2px' }}>
            <img src={img('clink_bar.webp')} alt="Clink! champagne bar at The Forge, Downtown Salem, Oregon" loading="lazy" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
            <img src={img('womens_collective/Clink3.webp')} alt="Clink! French-inspired restaurant interior, Downtown Salem" loading="lazy" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
            <img src={img('womens_collective/Clink2.webp')} alt="Clink! dining room, Downtown Salem, Oregon" loading="lazy" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
            <img src={img('womens_collective/Clink1.webp')} alt="Clink! restaurant seating and ambiance, Salem" loading="lazy" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
          </div>
          <img src={img('directory/second_floor/Clink1.webp')} alt="Clink! logo" style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '100px', height: '100px', objectFit: 'cover', borderRadius: '50%', zIndex: 2 }} />
          <span className="clink-badge">Now Open</span>
        </div>
        <div className="clink-info">
          <div className="clink-eyebrow">Featured Tenant</div>
          <h2 className="clink-title">Salem, Meet<br />Clink!</h2>
          <p className="clink-body">Clink! is a French-inspired restaurant in the heart of Salem, offering seasonal, locally inspired cuisine, thoughtfully crafted cocktails, and warm, elevated hospitality.</p>
          <p className="clink-body">Designed as a welcoming gathering place, Clink! offers lunch, brunch, and dinner with an experience that feels both refined and approachable.</p>
          <div className="clink-details">
            <div className="clink-detail"><label>Wed – Fri</label><span>Lunch 11am – 2:30pm · Dinner 4pm – 9pm</span></div>
            <div className="clink-detail"><label>Saturday</label><span>Brunch 9am – 2:30pm · Dinner 4pm – 9pm</span></div>
            <div className="clink-detail"><label>Sunday</label><span>Brunch 9am – 2:30pm · Dinner 4pm – 7pm</span></div>
          </div>
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            <a href="https://www.instagram.com/clinksalem/" target="_blank" rel="noopener" className="btn btn--cherry" style={{ background: 'var(--cherry)', color: '#fff' }}>Follow @clinksalem</a>
            <Link to="/#events" className="btn">Upcoming Clink! Events</Link>
          </div>
        </div>
      </div>

      {/* TENANT GRID */}
      <div className="section section--paper" style={{ paddingTop: '4rem' }}>
        <div className="section-header">
          <div>
            <span className="section-label">Second Floor</span>
            <h2 className="section-title">The Suites</h2>
          </div>
          <p style={{ fontSize: '.82rem', color: 'var(--muted)', maxWidth: '320px', textAlign: 'right', lineHeight: 1.6 }}>
            Independent practitioners. Curated community. Twenty-three reasons to make the second floor part of your routine.
          </p>
        </div>
        <div className="tenant-grid" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))' }}>
          {[
            { name: 'Halo Hair Studio',        type: 'Beauty & Salon',    suite: 'Suite 200', logo: 'directory/second_floor/Halo_Hair_Studio.webp',          logoCircle: true,  website: 'https://halosalonsalem.com/' },
            { name: 'Capital Mortgage Source', type: 'Financial',          suite: 'Suite 202', logo: 'directory/second_floor/Capital_Mortgage_Source.webp',                      website: 'https://capitalmortgagesource.com/' },
            { name: 'Bungalow',                type: 'Health & Wellness',  suite: 'Suite 204', logo: 'directory/second_floor/Bungalow.webp',                  logoCircle: true,  website: 'https://www.instagram.com/thebungalow.hairstudio' },
            { name: 'Injection Studio',        type: 'Health & Wellness',  suite: 'Suite 208', logo: 'directory/second_floor/Injection_Studio.webp',                             website: 'https://www.instagram.com/theinjectionstudiobymj/' },
            { name: 'Allelu Beauty & Ink',     type: 'Beauty & Salon',    suite: 'Suite 210', logo: 'directory/second_floor/Allelu.webp',                                       website: 'https://www.allelubeauty.com/' },
            { name: 'The Magnetic Club',       type: 'Community',          suite: 'Suite 212', logo: 'directory/The Magnetic Club Logo.webp',                logoCircle: true,  website: 'https://stan.store/kimmyneal' },
            { name: 'Satin & Stone',           type: 'Health & Wellness',  suite: 'Suite 214', logo: 'directory/second_floor/Satin_Stone.webp',              logoCircle: true,  website: 'https://www.satinandstone.net/' },
            { name: 'Luxe Lash Studio',        type: 'Beauty & Salon',    suite: 'Suite 216', logo: 'directory/second_floor/Luxe_Lash_Studio.webp',          logoCircle: true,  website: 'https://www.luxelashstudiosalem.com/' },
            { name: 'Neon Republic Salon',     type: 'Beauty & Salon',    suite: 'Suite 218', logo: 'directory/second_floor/Neon_Republic_Salon.webp',       logoCircle: true,  website: 'https://neonrepublicsalon.glossgenius.com/' },
            { name: 'BLND',                    type: 'Beauty & Salon',    suite: 'Suite 222', logo: 'directory/second_floor/BLND.webp',                      logoCircle: true,  website: 'https://www.instagram.com/blnd.colorsuite/' },
            { name: 'Clink!',                  type: 'Events & Venues',   suite: 'Suite 230', logo: 'directory/second_floor/Clink1.webp',                    logoCircle: true,  website: 'https://clinksalem.com/' },
            { name: 'Ivory Hair Co.',          type: 'Beauty & Salon',    suite: 'Suite 240', logo: 'directory/second_floor/Ivory_Hair_Co.webp',                               website: 'https://www.theivoryhairco.com/' },
            { name: 'Moth Wing Tattoo',        type: 'Beauty & Salon',    suite: 'Suite 250', logo: 'directory/second_floor/Moth_Wing_Tattoo.webp',       logoCircle: true,  website: 'https://www.instagram.com/mckay.lines/' },
            { name: 'The Esthetic Gallery',    type: 'Health & Wellness',  suite: 'Suite 264', logo: 'directory/second_floor/The_Esthetic_Gallery.webp',     logoCircle: true,  website: 'https://www.instagram.com/theestheticgallery/' },
            { name: 'Full Circle Stretching',  type: 'Health & Wellness',  suite: 'Suite 252', logo: 'directory/second_floor/Full_Circle_Stretching.webp',                      website: 'https://www.fcstretching.com/' },
            { name: 'Shanti Soul Counseling',  type: 'Health & Wellness',  suite: 'Suite 254', logo: 'directory/second_floor/Shanti_Soul_Counseling.webp',   logoCircle: true,  website: 'https://shantisoulcounseling.com/' },
            { name: 'Studio Roux',             type: 'Beauty & Salon',    suite: 'Suite 256', logo: 'directory/second_floor/Studio_Roux.webp',               logoCircle: true,  website: 'https://studiorouxsalem.as.me/' },
            { name: 'Be Well Esthetics',       type: 'Beauty & Salon',    suite: 'Suite 258', logo: 'directory/second_floor/Be_Well_Esthetics.webp',      logoCircle: true,  website: 'https://www.instagram.com/bewellesthetics/' },
{ name: 'Diosa Luxury Hair Lounge',type: 'Beauty & Salon',    suite: 'Suite 260', logo: 'directory/second_floor/Diosa_Luxury_Hair_Lounge.webp',                     website: 'https://krystalmariehair.glossgenius.com/' },
            { name: 'Radiance by Ray',         type: 'Health & Wellness',  suite: 'Suite 262', logo: 'directory/second_floor/Radiance_by_Ray.webp',                             website: 'https://raelynjo.glossgenius.com/' },
            { name: 'HH Aesthetics',           type: 'Health & Wellness',  suite: 'Suite 266', logo: 'directory/second_floor/HH_Aesthetics.webp',            logoCircle: true,  website: 'https://www.hhaesthetics.net/' },
            { name: 'The Hot Loft',            type: 'Health & Wellness',  suite: 'Suite 270', logo: 'directory/second_floor/Hot_Loft.webp',                 logoCircle: true,  website: 'https://www.thehotloft.com/' },
            { name: 'PNW Smiles',              type: 'Health & Wellness',  suite: 'Suite 272', logo: 'directory/second_floor/PNW_smiles.webp',               logoCircle: true,  website: 'https://www.instagram.com/pnw.smiles/' },
          ].map((t, i) => (
            <div className="tenant-card section--paper" key={i} style={{ padding: '1.4rem 1.4rem' }}>
              {t.logo && (
                <div className={`dir-tenant-logo${t.logoCircle ? ' dir-tenant-logo--circle' : ''}`}>
                  <img src={img(t.logo)} alt={`${t.name} — ${t.type} at The Forge, Downtown Salem`} />
                </div>
              )}
              <div className="tenant-card-name" style={{ fontSize: '1rem' }}>{t.name}</div>
              <div className="tenant-card-type">{t.type}</div>
              <div className="tenant-card-desc">{t.suite}</div>
              {t.website && (
                <a href={t.website} target="_blank" rel="noopener" className="dir-tenant-link">Visit Website →</a>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* LADIES ROOM */}
      <div className="ladies-split" id="ladies-room">
        <div className="ladies-imgs">
          <div><img src={img('ladies_room.webp')} alt="The Forge's designer ladies' room with crystal chandeliers, Downtown Salem" loading="lazy" /></div>
          <div><img src={img('pink_marble_sinks.webp')} alt="Pink marble vessel sinks in The Forge's ladies' room, Salem, Oregon" loading="lazy" /></div>
          <div><img src={img('ladies_room_neon.webp')} alt="Neon sign in The Forge's designer ladies' room, Downtown Salem" loading="lazy" style={{ objectPosition: 'center 30%' }} /></div>
          <div><img src={img('womens_collective/Womens_lounge.webp')} alt="Women's Collective lounge seating area at The Forge, Salem" loading="lazy" /></div>
          <div><img src={img('womens_collective/Womens_lounge2.webp')} alt="Women's Collective lounge with velvet chairs at The Forge, Salem" loading="lazy" /></div>
        </div>
        <div className="ladies-info">
          <span className="ladies-eyebrow">Yes, We Need to Talk About This</span>
          <h2 className="ladies-title">The Finest<br />Restroom in<br />Oregon.</h2>
          <div className="ladies-divider" />
          <p className="ladies-body">We know. We're as surprised as you are. But on the second floor of The Forge, we built a ladies' room that people <strong>go out of their way to visit.</strong></p>
          <p className="ladies-body">Crystal chandeliers. Pink marble vessel sinks. Brass everything. Smart mirrors. A neon sign. Velvet scallop chairs. Framed art reminding you not to drunk-text your ex.</p>
          <p className="ladies-body">The restroom code is available at the front desk and from any second-floor tenant. See <Link to="/faq#restrooms" style={{ color: 'var(--cherry)', textDecoration: 'underline', textUnderlineOffset: '3px' }}>FAQ</Link> for details.</p>
          <p className="ladies-kicker">"You're welcome, Salem."</p>
        </div>
      </div>

      <div className="pull-quote" style={{ padding: '4rem var(--section-h)' }}>
        <div className="pull-quote-mark">"</div>
        <p className="pull-quote-text">Twenty-three suites. A champagne bar. The best bathroom in Oregon. The second floor has opinions.</p>
        <span className="pull-quote-attr">— The Forge Women's Collective</span>
      </div>

      <NewsletterStrip subtext="Clink! events, new suites, and Collective news — first to your inbox." />

      <Footer />
    </>
  )
}
