import { useEffect } from 'react'
import Navbar from './components/Navbar/Navbar'
import './App.css'
import Hero from './components/Hero/Hero'
import MedallionArchitecture from './components/MedallionArchitecture/MedallionArchitecture'
import TechStack from './components/TechStack/TechStack'
import Projects from './components/Projects/Projects'
import PowerBIDemo from './components/PowerBIDemo/PowerBIDemo'
import Contact from './components/Contact/Contact'
import { useCustomCursor } from './hooks/useCustomCursor'
import { storm } from './utils/stormSystem'

function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-inner">
        <span className="footer-name">
          <span style={{ color: 'var(--cyan)' }}>[</span>JM<span style={{ color: 'var(--cyan)' }}>]</span>
        </span>
        <span className="footer-text">Jonatan Marín · Data Engineer · Barcelona</span>
        <span className="footer-year">© {new Date().getFullYear()}</span>
      </div>
    </footer>
  )
}

export default function App() {
  useCustomCursor()
  useEffect(() => { storm.init(); return () => storm.destroy() }, [])

  return (
    <>
      <div className="cursor-dot" />
      <div className="cursor-ring" />
      <Navbar />
      <main>
        <Hero />
        <MedallionArchitecture />
        <TechStack />
        <Projects />
        <PowerBIDemo />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
