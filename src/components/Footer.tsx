import { Link } from 'react-router-dom'
import { img } from '../utils/img'

export default function Footer() {
  return (
    <footer>
      <div className="footer-top">
        <div>
          <span className="footer-col-title">Explore</span>
          <ul className="footer-links footer-links-grid">
            <li><Link to="/cellar-54">Cellar 54</Link></li>
            <li><Link to="/ground-floor">Ground Floor</Link></li>
            <li><Link to="/womens-collective">Women's Collective</Link></li>
            <li><Link to="/anthem">Anthem</Link></li>
            <li><Link to="/#events">Events</Link></li>
            <li><Link to="/faq">FAQ</Link></li>
            <li><Link to="/leasing">Leasing</Link></li>
            <li><Link to="/directory">Directory</Link></li>
          </ul>
        </div>
        <div className="footer-center">
          <Link to="/" className="forge-logo forge-logo--footer" aria-label="The Forge">
            <img src={img('logo.webp')} alt="The Forge" style={{ height: '192px', width: 'auto', display: 'block' }} />
          </Link>
          <p className="footer-tagline">Salem's Lifestyle Collective</p>
        </div>
        <div className="footer-right">
          <span className="footer-col-title">Connect</span>
          <ul className="footer-links footer-links--connect" style={{ alignItems: 'flex-end' }}>
            <li><a href="mailto:inquiries@forgesalem.com">inquiries@forgesalem.com</a></li>
            <li><a href="https://forgesalem.com" target="_blank" rel="noopener">forgesalem.com</a></li>
          </ul>
          <div className="footer-social">
            <a href="https://www.facebook.com/theforgesalem/" target="_blank" rel="noopener">Facebook</a>
            <a href="https://www.instagram.com/theforgesalem/" target="_blank" rel="noopener">Instagram</a>
            <a href="https://www.tiktok.com/@theforgesalem" target="_blank" rel="noopener">TikTok</a>
            <a href="https://www.youtube.com/@TheForgeSalem" target="_blank" rel="noopener">YouTube</a>
            <a href="https://www.linkedin.com/company/the-forge-salem" target="_blank" rel="noopener">LinkedIn</a>
            <a href="https://www.instagram.com/clinksalem/" target="_blank" rel="noopener">Clink!</a>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <span>© 2026 The Forge Salem. All rights reserved.</span>
        <address style={{ fontStyle: 'normal' }}>285 Liberty St. N.E. · Salem, Oregon 97301</address>
      </div>
    </footer>
  )
}
