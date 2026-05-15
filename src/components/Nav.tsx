import { useState, useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { img } from '../utils/img'

// Module-level — survives Nav unmount/remount when navigating between pages
let _logoClickCount = 0
let _logoClickTimer: ReturnType<typeof setTimeout> | null = null

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => { setMenuOpen(false) }, [location.pathname])

  const isActive = (path: string) => location.pathname === path ? 'active' : ''

  function handleLogoClick(e: React.MouseEvent) {
    e.preventDefault()
    _logoClickCount += 1

    if (_logoClickTimer) clearTimeout(_logoClickTimer)

    if (_logoClickCount >= 3) {
      _logoClickCount = 0
      sessionStorage.setItem('forge_gate', Date.now().toString())
      navigate('/admin')
      return
    }

    if (location.pathname !== '/') navigate('/')
    window.scrollTo({ top: 0, behavior: 'smooth' })

    _logoClickTimer = setTimeout(() => {
      _logoClickCount = 0
    }, 800)
  }

  return (
    <nav id="mainNav" className={scrolled ? 'scrolled' : ''}>
      <ul className="nav-links nav-links--left">
        <li><Link to="/anthem" className={isActive('/anthem')}>Wealth &amp; Finance</Link></li>
        <li><Link to="/womens-collective" className={isActive('/womens-collective')}>Women's Collective</Link></li>
        <li><Link to="/ground-floor" className={isActive('/ground-floor')}>Ground Floor</Link></li>
        <li><Link to="/cellar-54" className={isActive('/cellar-54')}>Lower Level</Link></li>
      </ul>
      <Link to="/" className="forge-logo forge-logo--nav" aria-label="The Forge" onClick={handleLogoClick}>
        <img src={img('logo2.webp')} alt="The Forge" style={{ height: '70px', width: 'auto', display: 'block' }} />
      </Link>
      <div className="nav-right">
        <ul className="nav-links nav-links--right">
          <li><Link to="/#events">Events</Link></li>
          <li><Link to="/faq" className={isActive('/faq')}>FAQ</Link></li>
          <li><Link to="/leasing" className={isActive('/leasing')}>Leasing</Link></li>
          <li><Link to="/directory" className={isActive('/directory')}>Directory</Link></li>
        </ul>
        <div className="nav-cta">
          <Link to="/#connect" className="btn btn--nav">Say Hello</Link>
        </div>
        <button className="nav-hamburger" aria-label="Open menu" onClick={() => setMenuOpen(true)}>
          <span /><span /><span />
        </button>
      </div>

      {menuOpen && (
        <div className="nav-mobile-overlay">
          <button className="nav-mobile-close" aria-label="Close menu" onClick={() => setMenuOpen(false)}>✕</button>
          <div className="nav-mobile-links">
            <Link to="/" onClick={() => setMenuOpen(false)}>Home</Link>
            <Link to="/ground-floor" onClick={() => setMenuOpen(false)}>Ground Floor</Link>
            <Link to="/womens-collective" onClick={() => setMenuOpen(false)}>Women's Collective</Link>
            <Link to="/cellar-54" onClick={() => setMenuOpen(false)}>Lower Level</Link>
            <Link to="/anthem" onClick={() => setMenuOpen(false)}>Wealth &amp; Finance</Link>
            <Link to="/#events" onClick={() => setMenuOpen(false)}>Events</Link>
            <Link to="/faq" onClick={() => setMenuOpen(false)}>FAQ</Link>
            <Link to="/leasing" onClick={() => setMenuOpen(false)}>Leasing</Link>
            <Link to="/directory" onClick={() => setMenuOpen(false)}>Directory</Link>
            <Link to="/#connect" className="btn btn--cherry" style={{ background: 'var(--cherry)', color: '#fff', marginTop: '0.5rem', fontSize: '0.72rem' }} onClick={() => setMenuOpen(false)}>Say Hello</Link>
          </div>
        </div>
      )}
    </nav>
  )
}
