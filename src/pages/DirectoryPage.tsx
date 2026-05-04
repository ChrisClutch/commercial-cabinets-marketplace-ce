import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Nav from '../components/Nav'
import Footer from '../components/Footer'
import { img } from '../utils/img'

type Tenant = {
  floor: string
  floorKey: string
  name: string
  category: string
  categoryKey: string
  suite?: string
  logo?: string
  logoCircle?: boolean
  logoStyle?: React.CSSProperties
  website?: string
  link?: string
  comingSoon?: boolean
}

const TENANTS: Tenant[] = [
  {
    floor: 'Ground Floor', floorKey: 'ground-floor',
    name: 'A Wonderful World', category: 'Retail', categoryKey: 'retail',
    suite: 'Suite 145',
    logo: 'directory/first_floor/a_wonderful_world.webp',
    website: 'https://www.instagram.com/a_wonderful_world_pnw/',
  },
  {
    floor: 'Second Floor', floorKey: 'second-floor',
    name: 'Allelu', category: 'Beauty & Salon', categoryKey: 'beauty-salon',
    suite: 'Suite 210',
    logo: 'directory/second_floor/Allelu.webp',
    website: 'https://www.allelubeauty.com/',
  },
  {
    floor: 'Ground Floor', floorKey: 'ground-floor',
    name: 'Aloe', category: 'Health & Wellness', categoryKey: 'wellness',
    suite: 'Suite 160',
    logo: 'directory/first_floor/aloe_logo.webp',
    logoCircle: true,
    comingSoon: true,
  },
  {
    floor: 'Third Floor', floorKey: 'third-floor',
    name: 'Anthem Strategists', category: 'Financial', categoryKey: 'financial',
    logo: 'directory/third_floor/Anthem.webp',
    logoCircle: true,
    website: '#',
    link: '/anthem',
  },
  {
    floor: 'Ground Floor', floorKey: 'ground-floor',
    name: 'Black Label Marketing', category: 'Office & Services', categoryKey: 'office',
    suite: 'Suite 100',
    logo: 'directory/first_floor/black_label_marketing.webp',
    website: 'https://blacklabelmarketingonline.com/',
  },
  {
    floor: 'Second Floor', floorKey: 'second-floor',
    name: 'BLND', category: 'Beauty & Salon', categoryKey: 'beauty-salon',
    suite: 'Suite 222',
    logo: 'directory/second_floor/BLND.webp',
    logoCircle: true,
    website: 'https://www.instagram.com/blnd.colorsuite/',
  },
  {
    floor: 'Ground Floor', floorKey: 'ground-floor',
    name: 'Bonzai', category: 'Food & Drink', categoryKey: 'food-drink',
    suite: 'Suite 120',
    logo: 'directory/first_floor/Bonzai_logo.webp',
    website: 'https://www.bonzaicoffeeteabar.com/',
    link: '/ground-floor',
  },
  {
    floor: 'Ground Floor', floorKey: 'ground-floor',
    name: 'Bridal Glitter & Glam', category: 'Retail', categoryKey: 'retail',
    suite: 'Suite 102',
    logo: 'directory/first_floor/Bridal_Glitter_Glam.svg',
    website: 'https://glitterandglambridal.com/',
  },
  {
    floor: 'Second Floor', floorKey: 'second-floor',
    name: 'Bungalow', category: 'Health & Wellness', categoryKey: 'wellness',
    suite: 'Suite 204',
    logo: 'directory/second_floor/Bungalow.webp',
    logoCircle: true,
    website: 'https://www.instagram.com/thebungalow.hairstudio',
  },
  {
    floor: 'Second Floor', floorKey: 'second-floor',
    name: 'Capital Mortgage Source', category: 'Financial', categoryKey: 'financial',
    suite: 'Suite 202',
    logo: 'directory/second_floor/Capital_Mortgage_Source.webp',
    website: 'https://capitalmortgagesource.com/',
  },
  {
    floor: 'Lower Level', floorKey: 'lower-level',
    name: 'Cellar 54', category: 'Events & Venues', categoryKey: 'events-venues',
    logo: 'directory/lower_floor/The_Forge_Lower_Level_Cellar_54_Logo1.webp',
    logoCircle: true,
    website: 'https://www.cellar54salem.com/',
    link: '/cellar-54',
  },
  {
    floor: 'Second Floor', floorKey: 'second-floor',
    name: 'Clink!', category: 'Events & Venues', categoryKey: 'events-venues',
    suite: 'Suite 230',
    logo: 'directory/second_floor/Clink1.webp',
    logoCircle: true,
    website: 'https://clinksalem.com/',
    link: '/womens-collective',
  },
  {
    floor: 'Second Floor', floorKey: 'second-floor',
    name: 'Diosa Luxury Hair Lounge', category: 'Beauty & Salon', categoryKey: 'beauty-salon',
    suite: 'Suite 260',
    logo: 'directory/second_floor/Diosa_Luxury_Hair_Lounge.webp',
    website: 'https://krystalmariehair.glossgenius.com/',
  },
  {
    floor: 'Ground Floor', floorKey: 'ground-floor',
    name: 'Dreamies Creamery', category: 'Food & Drink', categoryKey: 'food-drink',
    suite: 'Suite 130',
    logo: 'directory/first_floor/dreamies_creamy_logo2.webp',
    website: 'https://www.dreamiescreamery.com/',
    link: '/ground-floor',
  },
  {
    floor: 'Second Floor', floorKey: 'second-floor',
    name: 'Full Circle Stretching', category: 'Health & Wellness', categoryKey: 'wellness',
    suite: 'Suite 252',
    logo: 'directory/second_floor/Full_Circle_Stretching.webp',
    website: 'https://www.fcstretching.com/',
  },
  {
    floor: 'Second Floor', floorKey: 'second-floor',
    name: 'Halo Hair Studio', category: 'Beauty & Salon', categoryKey: 'beauty-salon',
    suite: 'Suite 200',
    logo: 'directory/second_floor/Halo_Hair_Studio.webp',
    logoCircle: true,
    website: 'https://halosalonsalem.com/',
  },
  {
    floor: 'Second Floor', floorKey: 'second-floor',
    name: 'HH Aesthetics', category: 'Health & Wellness', categoryKey: 'wellness',
    suite: 'Suite 266',
    logo: 'directory/second_floor/HH_Aesthetics.webp',
    logoCircle: true,
    website: 'https://www.hhaesthetics.net/',
  },
  {
    floor: 'Second Floor', floorKey: 'second-floor',
    name: 'Injection Studio', category: 'Health & Wellness', categoryKey: 'wellness',
    suite: 'Suite 208',
    logo: 'directory/second_floor/Injection_Studio.webp',
    website: 'https://www.instagram.com/theinjectionstudiobymj/',
  },
  {
    floor: 'Ground Floor', floorKey: 'ground-floor',
    name: 'Ivory Bull', category: 'Food & Drink', categoryKey: 'food-drink',
    suite: 'Suite 133',
    logo: 'directory/first_floor/ivory_bull_logo.webp',
    logoCircle: true,
    logoStyle: { objectFit: 'contain', background: '#fff' },
    website: 'https://ivorybullandco.com/',
  },
  {
    floor: 'Second Floor', floorKey: 'second-floor',
    name: 'Ivory Hair Co.', category: 'Beauty & Salon', categoryKey: 'beauty-salon',
    suite: 'Suite 240',
    logo: 'directory/second_floor/Ivory_Hair_Co.webp',
    website: 'https://www.theivoryhairco.com/',
  },
  {
    floor: 'Ground Floor', floorKey: 'ground-floor',
    name: 'Jade Dumplings', category: 'Food & Drink', categoryKey: 'food-drink',
    suite: 'Suite 116',
    logo: 'directory/first_floor/jade_dumpling.webp',
    logoCircle: true,
    website: 'https://www.jadedumplingor.com/',
    link: '/ground-floor',
  },
  {
    floor: 'Second Floor', floorKey: 'second-floor',
    name: 'Luxe Lash Studio', category: 'Beauty & Salon', categoryKey: 'beauty-salon',
    suite: 'Suite 216',
    logo: 'directory/second_floor/Luxe_Lash_Studio.webp',
    logoCircle: true,
    website: 'https://www.luxelashstudiosalem.com/',
  },
  {
    floor: 'Second Floor', floorKey: 'second-floor',
    name: 'Neon Republic Salon', category: 'Beauty & Salon', categoryKey: 'beauty-salon',
    suite: 'Suite 218',
    logo: 'directory/second_floor/Neon_Republic_Salon.webp',
    logoCircle: true,
    website: 'https://neonrepublicsalon.glossgenius.com/',
  },
  {
    floor: 'Ground Floor', floorKey: 'ground-floor',
    name: 'Noira', category: 'Retail', categoryKey: 'retail',
    suite: 'Suite 135',
    logo: 'directory/first_floor/noira_logo.webp',
    website: 'https://www.barnoira.com/',
  },
  {
    floor: 'Second Floor', floorKey: 'second-floor',
    name: 'PNW Smiles', category: 'Health & Wellness', categoryKey: 'wellness',
    suite: 'Suite 272',
    logo: 'directory/second_floor/PNW_smiles.webp',
    logoCircle: true,
    website: 'https://www.instagram.com/pnw.smiles/',
  },
  {
    floor: 'Second Floor', floorKey: 'second-floor',
    name: 'Radiance by Ray', category: 'Health & Wellness', categoryKey: 'wellness',
    suite: 'Suite 262',
    logo: 'directory/second_floor/Radiance_by_Ray.webp',
    website: 'https://raelynjo.glossgenius.com/',
  },
  {
    floor: 'Ground Floor', floorKey: 'ground-floor',
    name: 'Root Cellar Market', category: 'Food & Drink', categoryKey: 'food-drink',
    suite: 'Suite 155',
    logo: 'directory/first_floor/root_cellar.webp',
    website: 'https://www.rootcellarmarket.com/',
  },
  {
    floor: 'Second Floor', floorKey: 'second-floor',
    name: 'Satin & Stone', category: 'Health & Wellness', categoryKey: 'wellness',
    suite: 'Suite 214',
    logo: 'directory/second_floor/Satin_Stone.webp',
    logoCircle: true,
    website: 'https://www.satinandstone.net/',
  },
  {
    floor: 'Second Floor', floorKey: 'second-floor',
    name: 'Shanti Soul Counseling', category: 'Health & Wellness', categoryKey: 'wellness',
    suite: 'Suite 254',
    logo: 'directory/second_floor/Shanti_Soul_Counseling.webp',
    logoCircle: true,
    website: 'https://shantisoulcounseling.com/',
  },
  {
    floor: 'Second Floor', floorKey: 'second-floor',
    name: 'Studio Roux', category: 'Beauty & Salon', categoryKey: 'beauty-salon',
    suite: 'Suite 256',
    logo: 'directory/second_floor/Studio_Roux.webp',
    logoCircle: true,
    website: 'https://studiorouxsalem.as.me/',
  },
  {
    floor: 'Second Floor', floorKey: 'second-floor',
    name: 'The Esthetic Gallery', category: 'Health & Wellness', categoryKey: 'wellness',
    suite: 'Suite 250',
    logo: 'directory/second_floor/The_Esthetic_Gallery.webp',
    logoCircle: true,
    website: 'https://www.instagram.com/theestheticgallery/',
  },
  {
    floor: 'Second Floor', floorKey: 'second-floor',
    name: 'The Hot Loft', category: 'Health & Wellness', categoryKey: 'wellness',
    suite: 'Suite 270',
    logo: 'directory/second_floor/Hot_Loft.webp',
    logoCircle: true,
    website: 'https://www.thehotloft.com/',
  },
  {
    floor: 'The Forge', floorKey: 'the-forge',
    name: 'The Magnetic Club', category: 'Community', categoryKey: 'community',
    suite: 'Suite 210',
    logo: 'directory/The Magnetic Club Logo.webp',
    logoCircle: true,
    website: 'https://stan.store/kimmyneal',
  },
  {
    floor: 'Second Floor', floorKey: 'second-floor',
    name: "Women's Collective", category: 'Community', categoryKey: 'community',
    link: '/womens-collective',
  },

]

const FILTERS = [
  { key: 'all', label: 'All' },
  { key: 'food-drink', label: 'Food & Drink' },
  { key: 'beauty-salon', label: 'Beauty & Salon' },
  { key: 'wellness', label: 'Health & Wellness' },
  { key: 'events-venues', label: 'Events & Venues' },
  { key: 'financial', label: 'Financial' },
  { key: 'community', label: 'Community' },
  { key: 'retail', label: 'Retail' },
  { key: 'office', label: 'Office & Services' },
]

export default function DirectoryPage() {
  useEffect(() => { document.title = 'Directory — The Forge Salem' }, [])

  const [activeFilter, setActiveFilter] = useState('all')
  const [search, setSearch] = useState('')

  const visible = TENANTS.filter(t => {
    const matchFilter = activeFilter === 'all' || t.categoryKey === activeFilter
    const q = search.toLowerCase().trim()
    const matchSearch = !q || t.name.toLowerCase().includes(q)
    return matchFilter && matchSearch
  })

  return (
    <>
      <Nav />

      <div className="page-hero" style={{ minHeight: '280px' }}>
        <div className="page-hero-bg" style={{ backgroundImage: `url(${img('exterior.webp')})` }} />
        <div className="page-hero-overlay" />
        <div className="page-hero-content">
          <span className="page-floor-label">The Forge · 285 Liberty St. N.E.</span>
          <h1 className="page-title" style={{ fontSize: 'clamp(2.5rem,6vw,5rem)' }}>Tenant<br />Directory</h1>
        </div>
      </div>

      <div className="page-breadcrumb">
        <Link to="/">The Forge</Link>
        <span className="sep">·</span>
        <span className="current">Directory</span>
      </div>

      <div className="dir-filter-bar">
        <span className="dir-filter-label">Filter by</span>
        {FILTERS.map(f => (
          <button
            key={f.key}
            className={`dir-filter-btn${activeFilter === f.key ? ' active' : ''}`}
            onClick={() => setActiveFilter(f.key)}
          >
            {f.label}
          </button>
        ))}
        <div className="dir-filter-search">
          <input
            type="search"
            placeholder="Search tenants…"
            autoComplete="off"
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>
      </div>

      <div className="dir-body">
        <p className="dir-count">{visible.length === 1 ? '1 tenant' : `${visible.length} tenants`}</p>

        {visible.length === 0 ? (
          <div className="dir-empty">
            No tenants match your search. <Link to="/leasing" style={{ color: 'var(--cherry)' }}>Interested in leasing?</Link>
          </div>
        ) : (
          <div className="dir-grid">
            {visible.map((t, i) => (
              <div className="dir-tenant-card" key={i}>
                {t.logo && (
                  <div className={`dir-tenant-logo${t.logoCircle ? ' dir-tenant-logo--circle' : ''}`}>
                    <img src={img(t.logo)} alt={`${t.name} logo`} style={t.logoStyle} />
                  </div>
                )}
                <div className="dir-tenant-floor">{t.floor}{t.suite && <span className="dir-tenant-suite"> · {t.suite}</span>}</div>
                <div className="dir-tenant-name">{t.name}</div>
                <div className="dir-tenant-category">{t.category}</div>
                <div className="dir-tenant-actions">
                  {t.comingSoon ? (
                    <span className="dir-tenant-coming-soon">Coming Soon</span>
                  ) : t.website && (
                    <a href={t.website} target="_blank" rel="noopener" className="dir-tenant-link">Visit Website →</a>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* CTA STRIP */}
      <div className="newsletter-strip" style={{ background: 'var(--paper)', borderTop: '1px solid var(--blush)' }}>
        <div>
          <h3 className="nl-headline">Your Business Belongs Here</h3>
          <p className="nl-sub">Spaces available now — ground floor, office suites, and creative studios.</p>
        </div>
        <Link to="/leasing" className="btn btn--cherry" style={{ whiteSpace: 'nowrap', background: 'var(--cherry)', color: '#fff' }}>View Leasing Options</Link>
      </div>

      <Footer />
    </>
  )
}
