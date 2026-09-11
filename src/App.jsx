import { useEffect } from 'react'
import Navbar from './components/Navbar/Navbar'
import './App.css'
import Hero from './components/Hero/Hero'
import Services from './components/Services/Services'
import MedallionArchitecture from './components/MedallionArchitecture/MedallionArchitecture'
import Process from './components/Process/Process'
import TechStack from './components/TechStack/TechStack'
import Work from './components/Work/Work'
import PowerBIDemo from './components/PowerBIDemo/PowerBIDemo'
import AISection from './components/AISection/AISection'
import TrustBar from './components/TrustBar/TrustBar'
import Testimonials from './components/Testimonials/Testimonials'
import Contact from './components/Contact/Contact'
import { storm } from './utils/stormSystem'

function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-inner">
        <span className="footer-name">
          <span style={{ color: 'var(--cyan)' }}>[</span>JM<span style={{ color: 'var(--cyan)' }}>]</span>
        </span>
        <span className="footer-text">Jonatan Marín · Data & AI Engineering · Barcelona</span>
        <span className="footer-year">© {new Date().getFullYear()}</span>
      </div>
    </footer>
  )
}

export default function App() {
  useEffect(() => { storm.init(); return () => storm.destroy() }, [])

  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Services />
        <MedallionArchitecture />
        <Process />
        <TechStack />
        <Work />
        <PowerBIDemo />
        <AISection />
        <TrustBar />
        <Testimonials />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
