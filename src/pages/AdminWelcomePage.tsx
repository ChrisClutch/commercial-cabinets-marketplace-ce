import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { img } from '../utils/img'
import { supabase } from '../lib/supabase'

type MessageStatus = 'pending' | 'approved' | 'denied'

type SupabaseMessage = {
  id: string
  name: string
  message: string
  photo_url: string | null
  status: MessageStatus
  submitted_at: string
  reviewed_at: string | null
}

const STATUS_STYLE: Record<MessageStatus, { bg: string; border: string; color: string; label: string }> = {
  pending:  { bg: '#1f2e3c', border: '#2a3540', color: '#b7c0c8', label: 'Pending'  },
  approved: { bg: '#1a3a2a', border: '#2a5a3a', color: '#5aac7a', label: 'Approved' },
  denied:   { bg: '#3a1a1a', border: '#5a2a2a', color: '#c05555', label: 'Denied'   },
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('en-US', {
    month: 'short', day: 'numeric', year: 'numeric',
    hour: 'numeric', minute: '2-digit',
  })
}

export default function AdminWelcomePage() {
  const navigate = useNavigate()

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session) navigate('/admin', { replace: true })
    })
  }, [navigate])

  const [bathroomCode, setBathroomCode] = useState('')
  const [codeInput, setCodeInput]       = useState('')
  const [editingCode, setEditingCode]   = useState(false)
  const [codeVisible, setCodeVisible]   = useState(false)
  const [codeSaved, setCodeSaved]       = useState(false)

  const [messages, setMessages]   = useState<SupabaseMessage[]>([])
  const [loadingMessages, setLoadingMessages] = useState(true)
  const [filter, setFilter]       = useState<'all' | MessageStatus>('all')

  useEffect(() => {
    supabase
      .from('settings')
      .select('value')
      .eq('key', 'bathroom_code')
      .single()
      .then(({ data }) => { if (data) setBathroomCode(data.value) })
  }, [])

  useEffect(() => {
    supabase
      .from('community_messages')
      .select('*')
      .order('submitted_at', { ascending: false })
      .then(({ data }) => {
        if (data) setMessages(data)
        setLoadingMessages(false)
      })
  }, [])

  async function handleLogout() {
    await supabase.auth.signOut()
    navigate('/')
  }

  async function handleSaveCode(e: React.FormEvent) {
    e.preventDefault()
    const trimmed = codeInput.trim()
    if (!trimmed) return
    await supabase
      .from('settings')
      .update({ value: trimmed, updated_at: new Date().toISOString() })
      .eq('key', 'bathroom_code')
    setBathroomCode(trimmed)
    setCodeInput('')
    setEditingCode(false)
    setCodeSaved(true)
    setTimeout(() => setCodeSaved(false), 3000)
  }

  async function updateStatus(id: string, status: MessageStatus) {
    await supabase
      .from('community_messages')
      .update({ status, reviewed_at: new Date().toISOString() })
      .eq('id', id)
    setMessages(prev => prev.map(m => m.id === id ? { ...m, status } : m))
  }

  const [lightboxUrl, setLightboxUrl] = useState<string | null>(null)

  const pendingCount     = messages.filter(m => m.status === 'pending').length
  const filteredMessages = filter === 'all' ? messages : messages.filter(m => m.status === filter)

  return (
    <div style={{ minHeight: '100vh', background: '#161f28', fontFamily: 'Inter, system-ui, sans-serif', color: '#f3eedf' }}>

      {/* ── Header ── */}
      <header style={{
        position: 'sticky', top: 0, zIndex: 10,
        height: '60px', padding: '0 2rem',
        background: '#161f28', borderBottom: '1px solid #2a3540',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <img src={img('logo2.webp')} alt="The Forge" style={{ height: '36px', width: 'auto' }} />
          <div style={{ width: '1px', height: '22px', background: '#2a3540' }} />
          <span style={{ color: '#7a8a95', fontSize: '0.68rem', letterSpacing: '0.18em', textTransform: 'uppercase' }}>
            Admin Dashboard
          </span>
        </div>
        <button
          onClick={handleLogout}
          style={{
            background: 'none', border: '1px solid #2a3540', borderRadius: '3px',
            color: '#7a8a95', fontSize: '0.65rem', letterSpacing: '0.12em',
            textTransform: 'uppercase', padding: '0.4rem 1rem', cursor: 'pointer',
            fontFamily: 'Inter, system-ui, sans-serif',
          }}
          onMouseEnter={e => { e.currentTarget.style.borderColor = '#7a8a95'; e.currentTarget.style.color = '#f3eedf' }}
          onMouseLeave={e => { e.currentTarget.style.borderColor = '#2a3540'; e.currentTarget.style.color = '#7a8a95' }}
        >
          Sign Out
        </button>
      </header>

      {/* ── Lightbox ── */}
      {lightboxUrl && (
        <div
          onClick={() => setLightboxUrl(null)}
          style={{
            position: 'fixed', inset: 0, zIndex: 100,
            background: 'rgba(0,0,0,0.88)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            padding: '2rem', cursor: 'zoom-out',
          }}
        >
          <img
            src={lightboxUrl}
            alt="Full size"
            style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain', borderRadius: '4px' }}
          />
          <button
            onClick={() => setLightboxUrl(null)}
            style={{
              position: 'absolute', top: '1rem', right: '1.25rem',
              background: 'none', border: 'none', color: '#7a8a95',
              fontSize: '1.5rem', cursor: 'pointer', lineHeight: 1,
            }}
          >
            ×
          </button>
        </div>
      )}

      {/* ── Main ── */}
      <main style={{ padding: '2rem', maxWidth: '1100px', margin: '0 auto' }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1.5rem', alignItems: 'flex-start' }}>

          {/* ── Bathroom Code Card ── */}
          <div style={{
            flex: '1 1 260px', maxWidth: '320px',
            background: '#1f2e3c', border: '1px solid #2a3540', borderRadius: '4px', overflow: 'hidden',
          }}>
            <div style={{
              padding: '1rem 1.25rem', borderBottom: '1px solid #2a3540',
              display: 'flex', alignItems: 'center', gap: '0.65rem',
            }}>
              <span style={{ color: '#e10600' }}>◈</span>
              <span style={{ fontSize: '0.68rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: '#b7c0c8' }}>
                Bathroom Code
              </span>
            </div>

            <div style={{ padding: '1.5rem 1.25rem', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              <div>
                <div style={{ fontSize: '0.63rem', letterSpacing: '0.14em', textTransform: 'uppercase', color: '#7a8a95', marginBottom: '0.6rem' }}>
                  Current Code
                </div>
                {bathroomCode ? (
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <span style={{
                      fontFamily: '"Cormorant Garamond", serif',
                      fontSize: '2.2rem', fontWeight: 300, letterSpacing: '0.25em', lineHeight: 1, color: '#f3eedf',
                    }}>
                      {codeVisible ? bathroomCode : bathroomCode.replace(/./g, '•')}
                    </span>
                    <button
                      onClick={() => setCodeVisible(v => !v)}
                      style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#7a8a95', fontSize: '0.7rem', padding: 0, fontFamily: 'Inter, system-ui, sans-serif' }}
                    >
                      {codeVisible ? 'hide' : 'reveal'}
                    </button>
                  </div>
                ) : (
                  <span style={{ color: '#3c4b59', fontSize: '0.8rem', fontStyle: 'italic' }}>Not set</span>
                )}
              </div>

              {editingCode ? (
                <form onSubmit={handleSaveCode} style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
                  <input
                    type="text"
                    value={codeInput}
                    onChange={e => setCodeInput(e.target.value)}
                    placeholder="New code"
                    autoFocus
                    style={{
                      background: '#161f28', border: '1px solid #e10600', borderRadius: '3px',
                      color: '#f3eedf', fontSize: '0.9rem', padding: '0.6rem 0.8rem',
                      outline: 'none', fontFamily: 'Inter, system-ui, sans-serif',
                    }}
                  />
                  <div style={{ display: 'flex', gap: '0.5rem' }}>
                    <button
                      type="submit"
                      style={{
                        flex: 1, background: '#e10600', color: '#fff', border: 'none', borderRadius: '3px',
                        padding: '0.55rem', fontSize: '0.65rem', letterSpacing: '0.12em', textTransform: 'uppercase',
                        cursor: 'pointer', fontFamily: 'Inter, system-ui, sans-serif', fontWeight: 600,
                      }}
                    >
                      Save
                    </button>
                    <button
                      type="button"
                      onClick={() => { setEditingCode(false); setCodeInput('') }}
                      style={{
                        flex: 1, background: 'none', color: '#7a8a95', border: '1px solid #2a3540', borderRadius: '3px',
                        padding: '0.55rem', fontSize: '0.65rem', letterSpacing: '0.12em', textTransform: 'uppercase',
                        cursor: 'pointer', fontFamily: 'Inter, system-ui, sans-serif',
                      }}
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              ) : (
                <button
                  onClick={() => setEditingCode(true)}
                  style={{
                    width: '100%', background: 'none', border: '1px solid #2a3540', borderRadius: '3px',
                    color: '#b7c0c8', fontSize: '0.65rem', letterSpacing: '0.12em', textTransform: 'uppercase',
                    padding: '0.6rem', cursor: 'pointer', fontFamily: 'Inter, system-ui, sans-serif',
                  }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = '#e10600'; e.currentTarget.style.color = '#f3eedf' }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = '#2a3540'; e.currentTarget.style.color = '#b7c0c8' }}
                >
                  {bathroomCode ? 'Change Code' : 'Set Code'}
                </button>
              )}

              {codeSaved && (
                <p style={{ margin: 0, fontSize: '0.7rem', color: '#5aac7a', letterSpacing: '0.04em' }}>✓ Code updated</p>
              )}
            </div>
          </div>

          {/* ── Community Board Card ── */}
          <div style={{
            flex: '2 1 420px',
            background: '#1f2e3c', border: '1px solid #2a3540', borderRadius: '4px', overflow: 'hidden',
          }}>
            <div style={{
              padding: '1rem 1.25rem', borderBottom: '1px solid #2a3540',
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                <span style={{ color: '#e10600' }}>◆</span>
                <span style={{ fontSize: '0.68rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: '#b7c0c8' }}>
                  Community Board
                </span>
              </div>
              {pendingCount > 0 && (
                <span style={{
                  background: '#e10600', color: '#fff', fontSize: '0.6rem', fontWeight: 700,
                  borderRadius: '10px', padding: '0.15rem 0.6rem', letterSpacing: '0.05em',
                }}>
                  {pendingCount} pending
                </span>
              )}
            </div>

            <div style={{ display: 'flex', borderBottom: '1px solid #2a3540', padding: '0 1.25rem' }}>
              {(['all', 'pending', 'approved', 'denied'] as const).map(tab => (
                <button
                  key={tab}
                  onClick={() => setFilter(tab)}
                  style={{
                    background: 'none', border: 'none',
                    borderBottom: filter === tab ? '2px solid #e10600' : '2px solid transparent',
                    color: filter === tab ? '#f3eedf' : '#7a8a95',
                    fontSize: '0.65rem', letterSpacing: '0.1em', textTransform: 'capitalize',
                    padding: '0.7rem 0.85rem', cursor: 'pointer',
                    fontFamily: 'Inter, system-ui, sans-serif',
                    marginBottom: '-1px',
                  }}
                >
                  {tab === 'all' ? `All (${messages.length})` : `${tab.charAt(0).toUpperCase() + tab.slice(1)} (${messages.filter(m => m.status === tab).length})`}
                </button>
              ))}
            </div>

            <div>
              {loadingMessages ? (
                <div style={{ padding: '3rem 1.5rem', textAlign: 'center', color: '#3c4b59', fontSize: '0.78rem' }}>
                  Loading…
                </div>
              ) : filteredMessages.length === 0 ? (
                <div style={{ padding: '3rem 1.5rem', textAlign: 'center', color: '#3c4b59', fontSize: '0.78rem' }}>
                  No {filter === 'all' ? '' : filter} messages
                </div>
              ) : (
                filteredMessages.map((msg, i) => {
                  const s = STATUS_STYLE[msg.status]
                  return (
                    <div
                      key={msg.id}
                      style={{
                        padding: '1.1rem 1.25rem',
                        borderBottom: i < filteredMessages.length - 1 ? '1px solid #1a2630' : 'none',
                        display: 'flex', flexDirection: 'column', gap: '0.55rem',
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.5rem' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                          <span style={{ fontSize: '0.8rem', fontWeight: 600, color: '#f3eedf' }}>{msg.name}</span>
                          <span style={{ fontSize: '0.62rem', color: '#3c4b59' }}>{formatDate(msg.submitted_at)}</span>
                        </div>
                        <span style={{
                          background: s.bg, color: s.color, border: `1px solid ${s.border}`,
                          fontSize: '0.58rem', letterSpacing: '0.12em', textTransform: 'uppercase',
                          borderRadius: '3px', padding: '0.18rem 0.5rem', fontWeight: 600,
                        }}>
                          {s.label}
                        </span>
                      </div>

                      <p style={{ margin: 0, fontSize: '0.8rem', color: '#b7c0c8', lineHeight: 1.65 }}>
                        {msg.message}
                      </p>

                      {msg.photo_url && (
                        <img
                          src={msg.photo_url}
                          alt="Attached"
                          onClick={() => setLightboxUrl(msg.photo_url)}
                          style={{
                            height: '72px', width: 'auto', borderRadius: '3px', objectFit: 'cover',
                            marginTop: '0.15rem', cursor: 'zoom-in',
                          }}
                        />
                      )}

                      {msg.status === 'pending' ? (
                        <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.15rem' }}>
                          <button
                            onClick={() => updateStatus(msg.id, 'approved')}
                            style={{
                              background: '#1a3a2a', color: '#5aac7a', border: '1px solid #2a5a3a',
                              borderRadius: '3px', padding: '0.38rem 1rem',
                              fontSize: '0.62rem', letterSpacing: '0.1em', textTransform: 'uppercase',
                              cursor: 'pointer', fontFamily: 'Inter, system-ui, sans-serif', fontWeight: 600,
                            }}
                          >
                            Approve
                          </button>
                          <button
                            onClick={() => updateStatus(msg.id, 'denied')}
                            style={{
                              background: '#3a1a1a', color: '#c05555', border: '1px solid #5a2a2a',
                              borderRadius: '3px', padding: '0.38rem 1rem',
                              fontSize: '0.62rem', letterSpacing: '0.1em', textTransform: 'uppercase',
                              cursor: 'pointer', fontFamily: 'Inter, system-ui, sans-serif', fontWeight: 600,
                            }}
                          >
                            Deny
                          </button>
                        </div>
                      ) : (
                        <button
                          onClick={() => updateStatus(msg.id, 'pending')}
                          style={{
                            alignSelf: 'flex-start', background: 'none', border: 'none',
                            color: '#3c4b59', fontSize: '0.62rem', letterSpacing: '0.06em',
                            cursor: 'pointer', fontFamily: 'Inter, system-ui, sans-serif', padding: 0,
                          }}
                          onMouseEnter={e => (e.currentTarget.style.color = '#7a8a95')}
                          onMouseLeave={e => (e.currentTarget.style.color = '#3c4b59')}
                        >
                          ↩ Reset to pending
                        </button>
                      )}
                    </div>
                  )
                })
              )}
            </div>
          </div>

        </div>

        {/* ── Tenant Communication Tree ── */}
        <div style={{
          marginTop: '1.5rem',
          background: '#1f2e3c', border: '1px solid #2a3540', borderRadius: '4px', overflow: 'hidden',
        }}>
          <div style={{
            padding: '1rem 1.25rem', borderBottom: '1px solid #2a3540',
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
              <span style={{ color: '#e10600' }}>◇</span>
              <span style={{ fontSize: '0.68rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: '#b7c0c8' }}>
                Tenant Communication Tree
              </span>
            </div>
            <span style={{ fontSize: '0.62rem', color: '#3c4b59', letterSpacing: '0.06em' }}>
              Click to expand
            </span>
          </div>
          <div style={{ padding: '1.25rem' }}>
            <img
              src="/images/admin/forge_comms_tree.svg"
              alt="Tenant Communication Tree"
              onClick={() => setLightboxUrl('/images/admin/forge_comms_tree.svg')}
              style={{ width: '100%', display: 'block', borderRadius: '3px', cursor: 'zoom-in' }}
            />
          </div>
        </div>

      </main>
    </div>
  )
}
