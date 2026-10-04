import { useEffect } from 'react'

const SITE = 'https://deltaforgegold.com'

function setMeta(selector, create, attr, value) {
  let el = document.head.querySelector(selector)
  if (!el) {
    el = create()
    document.head.appendChild(el)
  }
  el.setAttribute(attr, value)
}

const meta = (key, name) => () => {
  const el = document.createElement('meta')
  el.setAttribute(key, name)
  return el
}

function clip(text, max = 155) {
  if (!text || text.length <= max) return text || ''
  return text.slice(0, max - 1).replace(/\s+\S*$/, '') + '…'
}

// Per-route metadata. Keeps title, description, canonical and social tags in
// sync with the current page (a single index.html would otherwise point every
// route's canonical at the homepage).
export function useSeo({ title, description, path, noindex = false }) {
  useEffect(() => {
    const url = SITE + path
    const desc = clip(description)
    document.title = title

    setMeta('link[rel="canonical"]', () => Object.assign(document.createElement('link'), { rel: 'canonical' }), 'href', url)
    setMeta('meta[name="description"]', meta('name', 'description'), 'content', desc)
    setMeta('meta[name="robots"]', meta('name', 'robots'), 'content',
      noindex ? 'noindex, nofollow' : 'index, follow, max-image-preview:large')
    setMeta('meta[property="og:title"]', meta('property', 'og:title'), 'content', title)
    setMeta('meta[property="og:description"]', meta('property', 'og:description'), 'content', desc)
    setMeta('meta[property="og:url"]', meta('property', 'og:url'), 'content', url)
    setMeta('meta[name="twitter:title"]', meta('name', 'twitter:title'), 'content', title)
    setMeta('meta[name="twitter:description"]', meta('name', 'twitter:description'), 'content', desc)
  }, [title, description, path, noindex])
}
