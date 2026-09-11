import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import Hero from '../../components/Hero/Hero'
import Services from '../../components/Services/Services'
import MedallionArchitecture from '../../components/MedallionArchitecture/MedallionArchitecture'
import Process from '../../components/Process/Process'
import TechStack from '../../components/TechStack/TechStack'
import Work from '../../components/Work/Work'
import PowerBIDemo from '../../components/PowerBIDemo/PowerBIDemo'
import AISection from '../../components/AISection/AISection'
import TrustBar from '../../components/TrustBar/TrustBar'
import Testimonials from '../../components/Testimonials/Testimonials'
import Contact from '../../components/Contact/Contact'

export default function Home() {
  const { hash } = useLocation()

  useEffect(() => {
    if (!hash) return
    const el = document.getElementById(hash.slice(1))
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }, [hash])

  return (
    <>
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
    </>
  )
}
