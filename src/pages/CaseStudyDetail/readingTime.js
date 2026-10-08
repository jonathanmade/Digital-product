// Reading time from the visible text of the active language (~200 wpm).
function textOf(node, lang) {
  if (node == null) return ''
  if (typeof node === 'string') return node
  if (Array.isArray(node)) return node.map(n => textOf(n, lang)).join(' ')
  if (typeof node === 'object') {
    if (typeof node[lang] === 'string') return node[lang]
    return Object.entries(node)
      .filter(([k]) => k !== 'code' && k !== 'id' && k !== 'type')
      .map(([, v]) => textOf(v, lang)).join(' ')
  }
  return ''
}

export function readingMinutes(article, lang) {
  const words = textOf(article, lang).split(/\s+/).filter(Boolean).length
  return Math.max(1, Math.round(words / 200))
}

