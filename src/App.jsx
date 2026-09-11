import { useEffect } from 'react'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import Navbar from './components/Navbar/Navbar'
import Footer from './components/Footer/Footer'
import Home from './pages/Home/Home'
import CaseStudyDetail from './pages/CaseStudyDetail/CaseStudyDetail'
import { storm } from './utils/stormSystem'
import { useScrollProgress } from './hooks/useScrollProgress'

function ScrollProgressBar() {
  const progress = useScrollProgress()
  return <div className="scroll-progress-bar" style={{ width: `${progress}%` }} />
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
  useEffect(() => { storm.init(); return () => storm.destroy() }, [])

  return (
    <BrowserRouter>
      <ScrollProgressBar />
      <Navbar />
      <main>
        <AnimatedRoutes />
      </main>
      <Footer />
    </BrowserRouter>
  )
}
