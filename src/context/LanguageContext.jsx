import { createContext, useContext, useEffect, useState } from 'react'
import en from '../i18n/en'
import es from '../i18n/es'

const STORAGE_KEY = 'site-language'
const DICTIONARIES = { en, es }

function getInitialLanguage() {
  const stored = localStorage.getItem(STORAGE_KEY)
  if (stored === 'en' || stored === 'es') return stored
  return navigator.language?.toLowerCase().startsWith('es') ? 'es' : 'en'
}

const LanguageContext = createContext(null)

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState(getInitialLanguage)

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, lang)
    document.documentElement.setAttribute('lang', lang)
  }, [lang])

  const toggleLanguage = () => setLang(l => (l === 'en' ? 'es' : 'en'))

  const value = { lang, toggleLanguage, t: DICTIONARIES[lang] }

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
}

// eslint-disable-next-line react-refresh/only-export-components -- hook co-located with its Provider, same pattern as useTheme
export function useLanguage() {
  const ctx = useContext(LanguageContext)
  if (!ctx) throw new Error('useLanguage must be used within a LanguageProvider')
  return ctx
}
