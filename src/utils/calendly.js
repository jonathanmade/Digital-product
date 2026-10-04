export const CALENDLY_URL = 'https://calendly.com/jonatanmarin/meeting'

// Opens Calendly's popup scheduling widget in an overlay instead of a full
// page/tab redirect. Requires the Calendly widget script to be loaded
// globally (see index.html). Falls back gracefully — callers should keep a
// real `href` on the trigger element so the link still works (opening in a
// new tab) if the widget script hasn't loaded yet for any reason.
export function openCalendlyPopup(url = CALENDLY_URL) {
  if (typeof window !== 'undefined' && window.Calendly) {
    window.Calendly.initPopupWidget({ url })
    return true
  }
  return false
}

// Calendly's popup widget injects/removes a `.calendly-overlay` element as
// a direct child of <body> when it opens/closes — there's no public open/
// close callback on window.Calendly, so a lightweight MutationObserver on
// body's direct children is the reliable way to know when it's on screen.
// Callers use this to pause expensive background work (e.g. a continuously
// animating canvas) while the overlay is up, since main-thread contention
// with it shows up as sluggish clicks on the overlay's own close button.
export function watchCalendlyOverlay({ onOpen, onClose } = {}) {
  if (typeof document === 'undefined' || typeof MutationObserver === 'undefined') {
    return () => {}
  }

  const check = () => {
    const isOpen = !!document.querySelector('.calendly-overlay')
    if (isOpen) onOpen?.()
    else onClose?.()
  }

  const observer = new MutationObserver(check)
  observer.observe(document.body, { childList: true })

  return () => observer.disconnect()
}
