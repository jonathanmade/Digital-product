// Google Analytics 4 with Consent Mode v2.
//
// Privacy-first by design: nothing is loaded or stored until the visitor
// explicitly accepts. If they reject (or never answer), gtag.js is never
// requested and no cookies are set. The Measurement ID comes from the
// VITE_GA_MEASUREMENT_ID environment variable; without it the whole module
// is inert and no banner is shown.

const GA_ID = import.meta.env.VITE_GA_MEASUREMENT_ID
const STORAGE_KEY = 'dfg-cookie-consent'

export const analyticsEnabled = typeof GA_ID === 'string' && /^G-[A-Z0-9]+$/i.test(GA_ID)

let loaded = false
let consent = readStoredConsent() // 'granted' | 'denied' | null (not answered yet)
const listeners = new Set()

function readStoredConsent() {
  try {
    const v = localStorage.getItem(STORAGE_KEY)
    return v === 'granted' || v === 'denied' ? v : null
  } catch {
    return null
  }
}

function persist(value) {
  try {
    if (value) localStorage.setItem(STORAGE_KEY, value)
    else localStorage.removeItem(STORAGE_KEY)
  } catch { /* storage blocked: the choice just won't survive a reload */ }
}

function setConsentState(value) {
  consent = value
  persist(value)
  listeners.forEach(fn => fn())
}

// useSyncExternalStore plumbing
export const subscribeConsent = fn => {
  listeners.add(fn)
  return () => listeners.delete(fn)
}
export const getConsent = () => consent

function gtag() {
  window.dataLayer = window.dataLayer || []
  // gtag.js expects the `arguments` object, not an array.
  window.dataLayer.push(arguments)
}

function isActive() {
  return analyticsEnabled && consent === 'granted' && loaded && !window[`ga-disable-${GA_ID}`]
}

function loadGa() {
  if (!analyticsEnabled || loaded || typeof document === 'undefined') return
  window[`ga-disable-${GA_ID}`] = false

  // Consent Mode v2: everything denied by default, then analytics storage
  // is granted because the visitor accepted. Ads signals stay denied: this
  // site does not use advertising features.
  gtag('consent', 'default', {
    analytics_storage: 'denied',
    ad_storage: 'denied',
    ad_user_data: 'denied',
    ad_personalization: 'denied',
  })
  gtag('consent', 'update', { analytics_storage: 'granted' })
  gtag('js', new Date())
  // Page views are sent manually (single-page app), see trackPageView().
  gtag('config', GA_ID, { send_page_view: false, allow_google_signals: false })

  const script = document.createElement('script')
  script.async = true
  script.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(GA_ID)}`
  document.head.appendChild(script)
  loaded = true
}

function clearGaCookies() {
  if (typeof document === 'undefined') return
  const host = window.location.hostname
  const domains = [host, `.${host}`, `.${host.replace(/^www\./, '')}`]
  document.cookie.split(';').forEach(raw => {
    const name = raw.split('=')[0].trim()
    if (!name.startsWith('_ga')) return
    domains.forEach(domain => {
      document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/; domain=${domain}`
    })
    document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/`
  })
}

export function trackPageView() {
  if (!isActive()) return
  gtag('event', 'page_view', {
    page_path: window.location.pathname + window.location.search,
    page_location: window.location.href,
    page_title: document.title,
  })
}

export function trackEvent(name, params = {}) {
  if (!isActive()) return
  gtag('event', name, params)
}

export function acceptAnalytics() {
  if (!analyticsEnabled) return
  setConsentState('granted')
  loadGa()
  window[`ga-disable-${GA_ID}`] = false
  trackPageView()
}

export function rejectAnalytics() {
  if (!analyticsEnabled) return
  setConsentState('denied')
  if (loaded) {
    gtag('consent', 'update', { analytics_storage: 'denied' })
    window[`ga-disable-${GA_ID}`] = true
  }
  clearGaCookies()
}

// Lets the visitor change their mind: shows the banner again.
export function reopenConsent() {
  if (!analyticsEnabled) return
  setConsentState(null)
}

// Called once at startup (main.jsx). Restores a previous "accept" choice.
export function initAnalytics() {
  if (!analyticsEnabled || typeof window === 'undefined') return
  if (consent === 'granted') loadGa()

  // Calendly posts a message to the page when a booking is completed: that
  // is the site's main conversion.
  window.addEventListener('message', e => {
    if (e.origin !== 'https://calendly.com') return
    if (e.data?.event === 'calendly.event_scheduled') trackEvent('calendly_event_scheduled')
  })
}
