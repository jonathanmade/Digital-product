import { useEffect } from 'react'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import Navbar from './components/Navbar/Navbar'
import Footer from './components/Footer/Footer'
import Home from './pages/Home/Home'
import CaseStudyDetail from './pages/CaseStudyDetail/CaseStudyDetail'
import { storm } from './utils/stormSystem'
import { watchCalendlyOverlay } from './utils/calendly'
import { useScrollProgress } from './hooks/useScrollProgress'
import { LanguageProvider } from './context/LanguageContext'

function ScrollProgressBar() {
  const progress = useScrollProgress()
  return <div className="scroll-progress-bar" style={{ width: `${progress}%` }} />
}

// React Router (in a plain BrowserRouter, without a data router) does not
// reset scroll position on navigation — so following a link from partway
// down Home (e.g. "View More" in Work) landed on the new page at that same
// scroll offset, often past its hero and into the Footer. Reset on every
// route change instead.
function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' })
  }, [pathname])
  return null
}

function PageTransition({ children }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      transition={{ duration: 0.35, ease: 'easeInOut' }}
    >
      {children}
    </motion.div>
  )
}

function AnimatedRoutes() {
  const location = useLocation()
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<PageTransition><Home /></PageTransition>} />
        <Route path="/case-studies/:slug" element={<PageTransition><CaseStudyDetail /></PageTransition>} />
      </Routes>
    </AnimatePresence>
  )
}

export default function App() {
  useEffect(() => {
    storm.init()
    // Free up the main thread while the Calendly popup is open — the
    // storm canvas repaints every frame, and that was competing with the
    // popup's own event handlers (reported as a slow "close" click / INP).
    const stopWatching = watchCalendlyOverlay({
      onOpen: () => storm.pause(),
      onClose: () => storm.resume(),
    })
    return () => { storm.destroy(); stopWatching() }
  }, [])

  return (
    <LanguageProvider>
      <BrowserRouter>
        <ScrollToTop />
        <ScrollProgressBar />
        <Navbar />
        <main>
          <AnimatedRoutes />
        </main>
        <Footer />
      </BrowserRouter>
    </LanguageProvider>
  )
}
