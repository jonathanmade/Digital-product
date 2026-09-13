// Opens Calendly's popup scheduling widget in an overlay instead of a full
// page/tab redirect. Requires the Calendly widget script to be loaded
// globally (see index.html). Falls back gracefully — callers should keep a
// real `href` on the trigger element so the link still works (opening in a
// new tab) if the widget script hasn't loaded yet for any reason.
export function openCalendlyPopup(url) {
  if (typeof window !== 'undefined' && window.Calendly) {
    window.Calendly.initPopupWidget({ url })
    return true
  }
  return false
}
