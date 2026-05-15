import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { img } from '../utils/img'
import { supabase } from '../lib/supabase'

const LOCKOUT_KEY = 'forge_login_lockout'
const GATE_WINDOW_MS = 10000
const MAX_ATTEMPTS = 5
const LOCKOUT_MS = 15 * 60 * 1000

function getLockout(): { attempts: number; lockedUntil: number } {
  try {
    const s = localStorage.getItem(LOCKOUT_KEY)
    return s ? JSON.parse(s) : { attempts: 0, lockedUntil: 0 }
  } catch {
    return { attempts: 0, lockedUntil: 0 }
  }
}

export default function AdminLoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [showPass, setShowPass] = useState(false)
  const [loading, setLoading] = useState(false)
  const [lockout, setLockout] = useState(getLockout)
  const [secondsLeft, setSecondsLeft] = useState(0)
  const navigate = useNavigate()

  const isLocked = lockout.lockedUntil > Date.now()

  // Gate check — only allow access via the triple-click Easter egg
  useEffect(() => {
    const gate = sessionStorage.getItem('forge_gate')
    const isValid = gate !== null && Date.now() - parseInt(gate) < GATE_WINDOW_MS
    if (!isValid) navigate('/', { replace: true })
  }, [navigate])

  useEffect(() => {
    if (!isLocked) return
    setSecondsLeft(Math.ceil((lockout.lockedUntil - Date.now()) / 1000))
    const id = setInterval(() => {
      const s = Math.ceil((lockout.lockedUntil - Date.now()) / 1000)
      if (s <= 0) {
        clearInterval(id)
        setSecondsLeft(0)
        setLockout({ attempts: 0, lockedUntil: 0 })
        localStorage.removeItem(LOCKOUT_KEY)
        setError('')
      } else {
        setSecondsLeft(s)
      }
    }, 1000)
    return () => clearInterval(id)
  }, [lockout.lockedUntil, isLocked])

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (isLocked || loading) return

    setLoading(true)
    setError('')

    const { error: authError } = await supabase.auth.signInWithPassword({
      email: email.trim().toLowerCase(),
      password,
    })

    setLoading(false)

    if (authError) {
      const prev = getLockout()
      const newAttempts = prev.attempts + 1
      const lockedUntil = newAttempts >= MAX_ATTEMPTS ? Date.now() + LOCKOUT_MS : prev.lockedUntil
      const next = { attempts: newAttempts, lockedUntil }
      localStorage.setItem(LOCKOUT_KEY, JSON.stringify(next))
      setLockout(next)
      const remaining = MAX_ATTEMPTS - newAttempts
      setError(newAttempts >= MAX_ATTEMPTS
        ? 'Too many failed attempts. Try again in 15 minutes.'
        : `Invalid credentials. ${remaining} attempt${remaining === 1 ? '' : 's'} remaining.`
      )
      setPassword('')
    } else {
      localStorage.removeItem(LOCKOUT_KEY)
      navigate('/admin/welcome')
    }
  }

  const mins = Math.floor(secondsLeft / 60)
  const secs = secondsLeft % 60
  const timeLeft = `${mins}:${String(secs).padStart(2, '0')}`

  return (
    <div style={{
      minHeight: '100vh',
      background: '#161f28',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: 'Inter, system-ui, sans-serif',
      padding: '2rem',
    }}>
      <div style={{
        width: '100%',
        maxWidth: '380px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '2rem',
      }}>

        {/* Logo */}
        <img
          src={img('logo2.webp')}
          alt="The Forge"
          style={{ height: '72px', width: 'auto', opacity: 0.95 }}
        />

        {/* Divider */}
        <div style={{
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          gap: '1rem',
        }}>
          <div style={{ flex: 1, height: '1px', background: '#2a3540' }} />
          <span style={{
            color: '#7a8a95',
            fontSize: '0.65rem',
            letterSpacing: '0.18em',
            textTransform: 'uppercase',
            fontFamily: '"Cormorant Garamond", serif',
          }}>
            Admin Access
          </span>
          <div style={{ flex: 1, height: '1px', background: '#2a3540' }} />
        </div>

        {/* Form card */}
        <form
          onSubmit={handleSubmit}
          style={{
            width: '100%',
            background: '#1f2e3c',
            borderRadius: '4px',
            padding: '2.25rem 2rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '1.25rem',
            border: '1px solid #2a3540',
          }}
        >
          {/* Email */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.45rem' }}>
            <label style={{
              color: '#b7c0c8',
              fontSize: '0.7rem',
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
            }}>
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={e => { setEmail(e.target.value); setError('') }}
              autoComplete="email"
              maxLength={254}
              required
              disabled={isLocked}
              style={{
                background: '#161f28',
                border: '1px solid #2a3540',
                borderRadius: '3px',
                color: isLocked ? '#3c4b59' : '#f3eedf',
                fontSize: '0.9rem',
                padding: '0.65rem 0.85rem',
                outline: 'none',
                transition: 'border-color 0.2s',
                fontFamily: 'Inter, system-ui, sans-serif',
              }}
              onFocus={e => { if (!isLocked) e.target.style.borderColor = '#e10600' }}
              onBlur={e => (e.target.style.borderColor = '#2a3540')}
            />
          </div>

          {/* Password */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.45rem' }}>
            <label style={{
              color: '#b7c0c8',
              fontSize: '0.7rem',
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
            }}>
              Password
            </label>
            <div style={{ position: 'relative' }}>
              <input
                type={showPass ? 'text' : 'password'}
                value={password}
                onChange={e => { setPassword(e.target.value); setError('') }}
                autoComplete="current-password"
                maxLength={128}
                required
                disabled={isLocked}
                style={{
                  width: '100%',
                  background: '#161f28',
                  border: '1px solid #2a3540',
                  borderRadius: '3px',
                  color: isLocked ? '#3c4b59' : '#f3eedf',
                  fontSize: '0.9rem',
                  padding: '0.65rem 2.5rem 0.65rem 0.85rem',
                  outline: 'none',
                  boxSizing: 'border-box',
                  transition: 'border-color 0.2s',
                  fontFamily: 'Inter, system-ui, sans-serif',
                }}
                onFocus={e => { if (!isLocked) e.target.style.borderColor = '#e10600' }}
                onBlur={e => (e.target.style.borderColor = '#2a3540')}
              />
              <button
                type="button"
                onClick={() => setShowPass(p => !p)}
                style={{
                  position: 'absolute',
                  right: '0.7rem',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  color: '#7a8a95',
                  fontSize: '0.75rem',
                  padding: 0,
                  lineHeight: 1,
                }}
              >
                {showPass ? 'hide' : 'show'}
              </button>
            </div>
          </div>

          {/* Error / lockout message */}
          {error && (
            <p style={{
              color: '#e10600',
              fontSize: '0.78rem',
              margin: 0,
              letterSpacing: '0.03em',
            }}>
              {error}
              {isLocked && secondsLeft > 0 && (
                <span style={{ display: 'block', marginTop: '0.3rem', color: '#7a8a95' }}>
                  Unlocks in {timeLeft}
                </span>
              )}
            </p>
          )}

          {/* Submit */}
          <button
            type="submit"
            disabled={loading || isLocked}
            style={{
              background: isLocked ? '#2a3540' : '#e10600',
              color: isLocked ? '#3c4b59' : '#fff',
              border: 'none',
              borderRadius: '3px',
              padding: '0.75rem 1.5rem',
              fontSize: '0.72rem',
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              fontFamily: 'Inter, system-ui, sans-serif',
              fontWeight: 600,
              cursor: loading || isLocked ? 'not-allowed' : 'pointer',
              marginTop: '0.25rem',
              transition: 'background 0.2s',
              opacity: loading ? 0.7 : 1,
            }}
            onMouseEnter={e => { if (!loading && !isLocked) (e.target as HTMLButtonElement).style.background = '#b50500' }}
            onMouseLeave={e => { if (!loading && !isLocked) (e.target as HTMLButtonElement).style.background = '#e10600' }}
          >
            {loading ? 'Signing in...' : isLocked ? `Locked — ${timeLeft}` : 'Enter'}
          </button>
        </form>

        {/* Back link */}
        <a
          href="/"
          style={{
            color: '#3c4b59',
            fontSize: '0.72rem',
            letterSpacing: '0.1em',
            textDecoration: 'none',
            transition: 'color 0.2s',
          }}
          onMouseEnter={e => ((e.target as HTMLAnchorElement).style.color = '#7a8a95')}
          onMouseLeave={e => ((e.target as HTMLAnchorElement).style.color = '#3c4b59')}
        >
          ← Back to site
        </a>

      </div>
    </div>
  )
}
