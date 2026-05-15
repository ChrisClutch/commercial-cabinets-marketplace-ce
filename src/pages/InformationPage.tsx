import { useState, useEffect, useRef, FormEvent } from 'react'
import { img } from '../utils/img'
import { allEvents } from '../data/events'
import { supabase } from '../lib/supabase'

type SupabaseMessage = {
  id: string
  name: string
  message: string
  photo_url: string | null
  submitted_at: string
}

const MONTHS = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']

const FLOORS = [
  {
    level: '3F',
    name: 'Anthem',
    tag: 'Wealth & Finance',
    tenants: ['Anthem Strategists'],
    note: '',
    accent: '#669bbc',
  },
  {
    level: '2F',
    name: "Women's Collective",
    tag: 'Beauty · Wellness · Social',
    tenants: ['Clink! Champagne Bar', '20+ beauty & wellness suites', 'Public restrooms (ladies\' room — worth the trip)'],
    note: '← Direct access from Chemekata Parkade',
    accent: '#b7c0c8',
  },
  {
    level: 'GF',
    name: 'Ground Floor',
    tag: 'Dining · Retail · The Heart',
    tenants: ['Bonzai!', 'Jade Dumplings', 'Dreamies Creamery', 'Retail & Boutiques'],
    note: 'Main entrance — 285 Liberty St. N.E.',
    accent: '#f3eedf',
  },
  {
    level: 'LL',
    name: 'Cellar 54',
    tag: 'Private Event Venue',
    tenants: ['Intimate dinners', 'Milestone celebrations', 'Corporate events'],
    note: 'Bookings: cellar54salem.com · 503-302-3237',
    accent: '#e10600',
  },
]

export default function InformationPage() {
  useEffect(() => { document.title = 'Visitor Guide — The Forge Salem' }, [])

  const [code, setCode]             = useState('')
  const [loadingCode, setLoadingCode] = useState(true)
  const [codeRevealed, setCodeRevealed] = useState(false)
  const [messages, setMessages]     = useState<SupabaseMessage[]>([])
  const [loadingMessages, setLoadingMessages] = useState(true)

  const [boardName, setBoardName]       = useState('')
  const [boardMessage, setBoardMessage] = useState('')
  const [boardFile, setBoardFile]       = useState<File | null>(null)
  const [boardImagePreview, setBoardImagePreview] = useState('')
  const [boardSubmitted, setBoardSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState('')
  const boardFileRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    supabase
      .from('settings')
      .select('value')
      .eq('key', 'bathroom_code')
      .single()
      .then(({ data }) => {
        if (data) setCode(data.value)
        setLoadingCode(false)
      })
  }, [])

  useEffect(() => {
    supabase
      .from('community_messages')
      .select('id, name, message, photo_url, submitted_at')
      .eq('status', 'approved')
      .order('submitted_at', { ascending: false })
      .then(({ data }) => {
        if (data) setMessages(data)
        setLoadingMessages(false)
      })
  }, [])

  function handleBoardImage(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return
    setBoardFile(file)
    setBoardImagePreview(URL.createObjectURL(file))
  }

  function clearImage() {
    setBoardFile(null)
    setBoardImagePreview('')
    if (boardFileRef.current) boardFileRef.current.value = ''
  }

  async function handleBoardSubmit(e: FormEvent) {
    e.preventDefault()
    if (submitting) return
    setSubmitting(true)
    setSubmitError('')

    let photo_url: string | null = null

    if (boardFile) {
      const ext = boardFile.name.split('.').pop()?.toLowerCase()
      const allowed = ['jpg', 'jpeg', 'png', 'webp']
      if (!ext || !allowed.includes(ext)) {
        setSubmitError('Only JPG, PNG, and WebP images are allowed.')
        setSubmitting(false)
        return
      }
      if (boardFile.size > 8 * 1024 * 1024) {
        setSubmitError('Image must be under 8 MB.')
        setSubmitting(false)
        return
      }
      const filename = `${crypto.randomUUID()}.${ext}`
      const { error: uploadError } = await supabase.storage
        .from('community-photos')
        .upload(filename, boardFile)
      if (uploadError) {
        setSubmitError('Image upload failed. Please try again.')
        setSubmitting(false)
        return
      }
      photo_url = supabase.storage.from('community-photos').getPublicUrl(filename).data.publicUrl
    }

    const { error } = await supabase.from('community_messages').insert({
      name: boardName.trim() || 'Anonymous',
      message: boardMessage.trim(),
      photo_url,
    })

    setSubmitting(false)
    if (error) {
      setSubmitError('Something went wrong. Please try again.')
      return
    }

    setBoardSubmitted(true)
    setBoardName('')
    setBoardMessage('')
    clearImage()
  }

  const today = new Date()
  today.setHours(0, 0, 0, 0)
  const upcomingEvents = allEvents
    .filter(e => new Date(e.date) >= today)
    .sort((a, b) => a.date.localeCompare(b.date))

  const S = {
    page:     { minHeight: '100vh', background: '#faf5f1', fontFamily: 'Inter, system-ui, sans-serif', color: '#2a3540' } as React.CSSProperties,
    wrap:     { maxWidth: '560px', margin: '0 auto', padding: '0 1.25rem 4rem' } as React.CSSProperties,
    section:  { marginTop: '2.5rem' } as React.CSSProperties,
    label:    { fontSize: '0.6rem', fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase' as const, color: '#e10600', marginBottom: '0.75rem', display: 'block' },
    card:     { background: '#fff', border: '1px solid #e8e2d9', borderRadius: '6px', overflow: 'hidden' } as React.CSSProperties,
    h2:       { fontFamily: '"Cormorant Garamond", serif', fontSize: 'clamp(1.6rem,5vw,2rem)', fontWeight: 300, color: '#161f28', margin: 0, lineHeight: 1.15 } as React.CSSProperties,
    body:     { fontSize: '0.85rem', color: '#7a8a95', lineHeight: 1.7, margin: 0 } as React.CSSProperties,
  }

  return (
    <div style={S.page}>

      {/* ── Header ── */}
      <header style={{
        background: '#161f28',
        padding: '1.25rem 1.5rem 1rem',
        display: 'flex', flexDirection: 'column', gap: '0.5rem',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <img src={img('logo2.webp')} alt="The Forge" style={{ height: '40px', width: 'auto' }} />
          <span style={{ fontSize: '0.6rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#7a8a95' }}>
            Visitor Guide
          </span>
        </div>
        <p style={{ margin: 0, fontSize: '0.72rem', color: '#3c4b59', letterSpacing: '0.04em' }}>
          285 Liberty St. N.E. &nbsp;·&nbsp; Downtown Salem, Oregon
        </p>
      </header>

      <div style={S.wrap}>

        {/* ── Bathroom Code ── */}
        <div style={S.section}>
          <span style={S.label}>Restroom Access</span>
          <div style={{ ...S.card, padding: '1.5rem' }}>
            <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '1rem', flexWrap: 'wrap' }}>
              <div>
                <p style={{ ...S.body, marginBottom: '0.35rem' }}>Door code</p>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <span style={{
                    fontFamily: '"Cormorant Garamond", serif',
                    fontSize: 'clamp(2.4rem, 8vw, 3rem)',
                    fontWeight: 300,
                    letterSpacing: '0.3em',
                    color: '#161f28',
                    lineHeight: 1,
                  }}>
                    {loadingCode ? '…' : code ? (codeRevealed ? code : code.replace(/./g, '•')) : '—'}
                  </span>
                  {code && (
                    <button
                      onClick={() => setCodeRevealed(v => !v)}
                      style={{
                        background: codeRevealed ? '#f3eedf' : '#161f28',
                        color:      codeRevealed ? '#161f28' : '#f3eedf',
                        border: 'none', borderRadius: '4px',
                        padding: '0.4rem 0.85rem',
                        fontSize: '0.65rem', letterSpacing: '0.1em', textTransform: 'uppercase',
                        cursor: 'pointer', fontFamily: 'Inter, system-ui, sans-serif', fontWeight: 600,
                        whiteSpace: 'nowrap',
                      }}
                    >
                      {codeRevealed ? 'Hide' : 'Tap to reveal'}
                    </button>
                  )}
                  {!code && (
                    <span style={{ fontSize: '0.75rem', color: '#b7c0c8', fontStyle: 'italic' }}>Ask any tenant</span>
                  )}
                </div>
              </div>
            </div>
            <div style={{
              marginTop: '1rem', paddingTop: '1rem', borderTop: '1px solid #f0ebe2',
              display: 'flex', flexDirection: 'column', gap: '0.25rem',
            }}>
              <p style={{ ...S.body, fontSize: '0.72rem' }}>Ground Floor — near main entrance</p>
              <p style={{ ...S.body, fontSize: '0.72rem' }}>2nd Floor — Women's Collective <span style={{ color: '#b7c0c8' }}>(ask staff for access)</span></p>
            </div>
          </div>
        </div>

        {/* ── Events ── */}
        <div style={S.section}>
          <span style={S.label}>What's On</span>
          {upcomingEvents.length === 0 ? (
            <div style={{ ...S.card, padding: '1.5rem', textAlign: 'center' }}>
              <p style={{ ...S.body, color: '#b7c0c8' }}>Nothing scheduled right now — check back soon.</p>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {upcomingEvents.map((ev, i) => {
                const [yr, mo, dy] = ev.date.split('-').map(Number)
                return (
                  <div key={i} style={{ ...S.card, padding: '1.25rem', display: 'flex', gap: '1.1rem', alignItems: 'flex-start' }}>
                    <div style={{
                      minWidth: '48px', textAlign: 'center',
                      background: '#161f28', borderRadius: '4px',
                      padding: '0.5rem 0.25rem',
                      display: 'flex', flexDirection: 'column', alignItems: 'center',
                    }}>
                      <span style={{ fontSize: '1.4rem', fontWeight: 700, color: '#f3eedf', lineHeight: 1, fontFamily: '"Cormorant Garamond", serif' }}>
                        {String(dy).padStart(2, '0')}
                      </span>
                      <span style={{ fontSize: '0.6rem', color: '#7a8a95', letterSpacing: '0.1em', textTransform: 'uppercase', marginTop: '0.2rem' }}>
                        {MONTHS[mo - 1]} {yr}
                      </span>
                    </div>
                    <div style={{ flex: 1 }}>
                      <span style={{
                        display: 'inline-block', marginBottom: '0.3rem',
                        fontSize: '0.58rem', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase',
                        color: '#e10600',
                      }}>
                        {ev.category}
                      </span>
                      <h3 style={{ margin: '0 0 0.3rem', fontSize: '1rem', fontWeight: 600, color: '#161f28', fontFamily: '"Cormorant Garamond", serif' }}>
                        {ev.title}
                      </h3>
                      <p style={{ ...S.body, fontSize: '0.78rem' }}>{ev.desc}</p>
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </div>

        {/* ── Community Board ── */}
        <div style={S.section}>
          <span style={S.label}>Community Board</span>

          {loadingMessages && (
            <p style={{ ...S.body, color: '#b7c0c8', marginBottom: '1rem' }}>Loading messages…</p>
          )}
          {!loadingMessages && messages.length > 0 && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '1.25rem' }}>
              {messages.map(msg => (
                <div key={msg.id} style={{ ...S.card, overflow: 'hidden' }}>
                  {msg.photo_url && (
                    <img src={msg.photo_url} alt="" style={{ width: '100%', maxHeight: '200px', objectFit: 'cover', display: 'block' }} />
                  )}
                  <div style={{ padding: '1.25rem' }}>
                    <p style={{
                      margin: '0 0 0.75rem',
                      fontSize: 'clamp(0.95rem, 2.5vw, 1.05rem)',
                      color: '#2a3540',
                      lineHeight: 1.7,
                      fontStyle: 'italic',
                      fontFamily: '"Cormorant Garamond", serif',
                    }}>
                      "{msg.message}"
                    </p>
                    <p style={{ margin: 0, fontSize: '0.65rem', color: '#b7c0c8', letterSpacing: '0.06em' }}>
                      — {msg.name}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}

          <div style={{ ...S.card, padding: '1.5rem' }}>
            <p style={{ ...S.body, marginBottom: '1rem', fontWeight: 500, color: '#2a3540', fontSize: '0.8rem' }}>
              Leave a note
            </p>
            {boardSubmitted ? (
              <p style={{ margin: 0, fontSize: '0.8rem', color: '#5aac7a', letterSpacing: '0.04em' }}>
                ✓ Thanks! Your note is pending review.
              </p>
            ) : (
              <form onSubmit={handleBoardSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                <input
                  type="text"
                  placeholder="Your name (optional)"
                  value={boardName}
                  onChange={e => setBoardName(e.target.value)}
                  maxLength={120}
                  style={{
                    border: '1px solid #e8e2d9', borderRadius: '4px',
                    fontSize: '0.82rem', padding: '0.6rem 0.8rem', color: '#2a3540',
                    outline: 'none', fontFamily: 'Inter, system-ui, sans-serif', background: '#faf5f1',
                  }}
                />
                <textarea
                  placeholder="Share your experience at The Forge…"
                  required
                  value={boardMessage}
                  onChange={e => setBoardMessage(e.target.value)}
                  maxLength={2000}
                  rows={3}
                  style={{
                    border: '1px solid #e8e2d9', borderRadius: '4px',
                    fontSize: '0.82rem', padding: '0.6rem 0.8rem', color: '#2a3540',
                    outline: 'none', fontFamily: 'Inter, system-ui, sans-serif', background: '#faf5f1',
                    resize: 'vertical', lineHeight: 1.6,
                  }}
                />

                <div>
                  <input
                    ref={boardFileRef}
                    type="file"
                    accept="image/jpeg,image/png,image/webp"
                    onChange={handleBoardImage}
                    style={{ display: 'none' }}
                    id="info-board-image-upload"
                  />
                  <label
                    htmlFor="info-board-image-upload"
                    style={{
                      display: 'inline-flex', alignItems: 'center', gap: '0.4rem',
                      border: '1px solid #e8e2d9', borderRadius: '4px',
                      color: boardFile ? '#2a7a4a' : '#7a8a95', background: '#faf5f1',
                      fontSize: '0.65rem', letterSpacing: '0.1em', textTransform: 'uppercase',
                      padding: '0.45rem 0.9rem', cursor: 'pointer',
                      fontFamily: 'Inter, system-ui, sans-serif',
                    }}
                  >
                    {boardFile ? '✓ Image attached' : '+ Attach image'}
                  </label>
                  {boardFile && (
                    <button
                      type="button"
                      onClick={clearImage}
                      style={{
                        background: 'none', border: 'none', color: '#7a8a95',
                        fontSize: '0.65rem', cursor: 'pointer', marginLeft: '0.65rem',
                        fontFamily: 'Inter, system-ui, sans-serif',
                      }}
                    >
                      Remove
                    </button>
                  )}
                  {boardImagePreview && (
                    <div style={{ marginTop: '0.65rem' }}>
                      <img src={boardImagePreview} alt="Preview" style={{ height: '72px', width: 'auto', borderRadius: '3px', objectFit: 'cover' }} />
                    </div>
                  )}
                </div>

                {submitError && (
                  <p style={{ margin: 0, fontSize: '0.75rem', color: '#e10600' }}>{submitError}</p>
                )}

                <button
                  type="submit"
                  disabled={submitting}
                  style={{
                    alignSelf: 'flex-start', background: '#e10600', color: '#fff',
                    border: 'none', borderRadius: '4px', padding: '0.6rem 1.5rem',
                    fontSize: '0.65rem', letterSpacing: '0.12em', textTransform: 'uppercase',
                    cursor: submitting ? 'not-allowed' : 'pointer',
                    fontFamily: 'Inter, system-ui, sans-serif', fontWeight: 600,
                    opacity: submitting ? 0.7 : 1,
                  }}
                >
                  {submitting ? 'Submitting…' : 'Submit'}
                </button>
              </form>
            )}
          </div>
        </div>

        {/* ── Building Directory ── */}
        <div style={S.section}>
          <span style={S.label}>Building Directory</span>
          <div style={{ ...S.card, overflow: 'hidden' }}>
            {FLOORS.map((floor, i) => (
              <div
                key={floor.level}
                style={{
                  display: 'flex', gap: '0', alignItems: 'stretch',
                  borderBottom: i < FLOORS.length - 1 ? '1px solid #f0ebe2' : 'none',
                }}
              >
                <div style={{
                  minWidth: '52px',
                  background: '#161f28',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  borderRight: `3px solid ${floor.accent}`,
                  padding: '1.25rem 0',
                }}>
                  <span style={{
                    fontSize: '0.6rem', fontWeight: 800, letterSpacing: '0.1em',
                    color: floor.accent, textTransform: 'uppercase', writingMode: 'vertical-rl',
                    transform: 'rotate(180deg)',
                  }}>
                    {floor.level}
                  </span>
                </div>

                <div style={{ flex: 1, padding: '1.1rem 1.25rem' }}>
                  <div style={{ marginBottom: '0.5rem' }}>
                    <span style={{ fontSize: '1rem', fontWeight: 600, color: '#161f28', fontFamily: '"Cormorant Garamond", serif', marginRight: '0.5rem' }}>
                      {floor.name}
                    </span>
                    <span style={{ fontSize: '0.62rem', color: '#b7c0c8', letterSpacing: '0.06em' }}>
                      {floor.tag}
                    </span>
                  </div>
                  <ul style={{ margin: 0, padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.2rem' }}>
                    {floor.tenants.map(t => (
                      <li key={t} style={{ fontSize: '0.75rem', color: '#7a8a95', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                        <span style={{ color: floor.accent, fontSize: '0.5rem' }}>◆</span> {t}
                      </li>
                    ))}
                  </ul>
                  {floor.note && (
                    <p style={{
                      margin: '0.6rem 0 0',
                      fontSize: '0.65rem', color: '#b7c0c8',
                      letterSpacing: '0.03em', fontStyle: 'italic',
                    }}>
                      {floor.note}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── Footer ── */}
        <div style={{ marginTop: '3rem', paddingTop: '1.5rem', borderTop: '1px solid #e8e2d9', textAlign: 'center' }}>
          <img src={img('logo2.webp')} alt="The Forge" style={{ height: '32px', width: 'auto', opacity: 0.4, marginBottom: '0.75rem' }} />
          <p style={{ margin: 0, fontSize: '0.65rem', color: '#b7c0c8', letterSpacing: '0.06em', lineHeight: 1.8 }}>
            285 Liberty St. N.E. · Salem, OR 97301<br />
            <a href="mailto:inquiries@forgesalem.com" style={{ color: '#b7c0c8', textDecoration: 'none' }}>inquiries@forgesalem.com</a>
          </p>
        </div>

      </div>
    </div>
  )
}
