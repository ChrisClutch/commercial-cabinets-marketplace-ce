import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import Nav from '../components/Nav'
import Footer from '../components/Footer'
import NewsletterStrip from '../components/NewsletterStrip'
import { img } from '../utils/img'

export default function AnthemPage() {
  useEffect(() => { document.title = 'Anthem Strategists — The Forge Salem' }, [])

  return (
    <>
      <Nav />

      <div className="page-hero" style={{ minHeight: '700px' }}>
        <div className="page-hero-bg" style={{ backgroundImage: `url(${img('anthem.webp')})`, backgroundPosition: 'center 30%' }} />
        <div className="page-hero-overlay" style={{ background: 'linear-gradient(to bottom, rgba(22,31,40,0.88) 0%, rgba(22,31,40,0.2) 52%, rgba(22,31,40,0.88) 100%)' }} />
        <div className="page-hero-content">
          <span className="page-floor-label" style={{ color: 'rgba(255,255,255,0.72)', textShadow: '0 1px 6px rgba(0,0,0,0.5)', fontSize: '0.65rem' }}>Third Floor · 285 Liberty St. N.E.</span>
          <h1 className="page-title">Anthem<br />Strategists</h1>
          <p className="page-tagline">Financial strategy and advisory — built for the people who are serious about what comes next.</p>
        </div>
      </div>

      <div className="page-breadcrumb">
        <Link to="/">The Forge</Link>
        <span className="sep">·</span>
        <span className="current">Anthem Strategists</span>
      </div>

      {/* ABOUT */}
      <div className="section section--cream about-split">
        <div>
          <span className="section-label">Third Floor</span>
          <h2 className="section-title">Built for<br />Bold Moves.</h2>
        </div>
        <div>
          <p style={{ fontSize: '.95rem', lineHeight: 1.85, opacity: .85, marginBottom: '1rem' }}>
            Anthem Strategists occupies the third floor of The Forge, bringing financial strategy and advisory services to the heart of downtown Salem. Trusted counsel for individuals, businesses, and families navigating what's next.
          </p>
          <p style={{ fontSize: '.95rem', lineHeight: 1.85, opacity: .85, marginBottom: '1.5rem' }}>
            Big decisions deserve a clear head and the right team. Anthem is that team — sitting above the noise of the city, focused on what matters most.
          </p>
          <a href="https://anthemstrategists.com" target="_blank" rel="noopener" className="btn btn--cherry" style={{ background: 'var(--cherry)', color: '#fff' }}>
            Visit anthemstrategists.com
          </a>
        </div>
      </div>

      {/* INFO CARDS */}
      <div className="section section--paper">
        <div className="info-grid">
          <div className="info-card">
            <h3>Financial Strategy</h3>
            <p>Comprehensive financial planning and strategy services tailored to your goals. From business planning to personal wealth management — Anthem brings clarity to complex decisions.</p>
          </div>
          <div className="info-card">
            <h3>Advisory Services</h3>
            <p>Expert guidance for individuals, families, and business owners. Whether you're building, protecting, or transitioning — Anthem is with you at every stage.</p>
          </div>
          <div className="info-card">
            <h3>Get in Touch</h3>
            <p>Ready to start the conversation? Visit <a href="https://anthemstrategists.com" target="_blank" rel="noopener" style={{ color: 'var(--cherry)' }}>anthemstrategists.com</a> or find them on the third floor of The Forge at 285 Liberty St. N.E., Salem.</p>
          </div>
        </div>
      </div>

      {/* EXPERIENCE SPLIT */}
      <div className="experience-grid">
        <div className="experience-img">
          <img src={img('anthem2.webp')} alt="Anthem Strategists financial planning and advisory office, third floor of The Forge, Downtown Salem" loading="lazy" />
        </div>
        <div className="experience-content">
          <span className="section-label" style={{ color: 'var(--confidence)' }}>The Location</span>
          <h2 className="experience-title">Third Floor<br />Perspective</h2>
          <p className="experience-body">Anthem chose The Forge because the building reflects their values — elevated, intentional, and rooted in the Salem community. The third floor offers a quiet remove from the energy below, ideal for the kind of focused thinking their clients deserve.</p>
          <p className="experience-body">A financial firm that fits the building. A building that fits the city.</p>
          <div style={{ marginTop: '2rem', display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            <a href="https://anthemstrategists.com" target="_blank" rel="noopener" className="btn btn--cherry" style={{ background: 'var(--cherry)', color: '#fff' }}>Visit Anthem</a>
            <Link to="/" className="btn" style={{ borderColor: 'rgba(250,245,241,.4)', color: 'var(--cream)' }}>Back to The Forge</Link>
          </div>
        </div>
      </div>

      <div className="pull-quote" style={{ padding: '4rem var(--section-h)' }}>
        <div className="pull-quote-mark">"</div>
        <p className="pull-quote-text">Big decisions deserve a clear head and the right team. Anthem is that team.</p>
        <span className="pull-quote-attr">— Anthem Strategists · Third Floor, The Forge</span>
      </div>

      <NewsletterStrip
        subtext="Events, new tenants, and what's happening at The Forge — delivered to your inbox."
      />

      <Footer />
    </>
  )
}
