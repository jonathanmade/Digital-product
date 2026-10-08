import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { useSeo } from '../../hooks/useSeo'
import { useLanguage } from '../../context/LanguageContext'
import Hero from '../../components/Hero/Hero'
import Services from '../../components/Services/Services'
import MedallionArchitecture from '../../components/MedallionArchitecture/MedallionArchitecture'
import Process from '../../components/Process/Process'
import TechStack from '../../components/TechStack/TechStack'
import Work from '../../components/Work/Work'
import PowerBIDemo from '../../components/PowerBIDemo/PowerBIDemo'
import AISection from '../../components/AISection/AISection'
import TrustBar from '../../components/TrustBar/TrustBar'
// Testimonials hidden until there are real client projects to show.
// Component, CSS and i18n copy are kept; re-add the import and <Testimonials /> to restore.
import Contact from '../../components/Contact/Contact'

const SEO = {
  en: {
    title: 'DeltaForge Gold · Microsoft Fabric & Medallion Consulting',
    description: 'Data & AI engineering consultancy in Barcelona: Medallion architecture on Microsoft Fabric and Databricks, Power BI Embedded and AI on governed data.',
  },
  es: {
    title: 'DeltaForge Gold · Consultoría Microsoft Fabric y Medallion',
    description: 'Consultoría de datos e IA en Barcelona: arquitectura Medallion en Fabric y Databricks, Power BI Embedded y aplicaciones de IA sobre datos gobernados.',
  },
}

export default function Home() {
  const { hash, key } = useLocation()
  const { lang } = useLanguage()
  useSeo({ ...SEO[lang], path: '/' })

  // `key` changes on every navigation, so clicking the same anchor twice
  // still scrolls (the hash alone would not change).
  useEffect(() => {
    if (!hash) return
    const el = document.getElementById(hash.slice(1))
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }, [hash, key])

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
      <Contact />
    </>
  )
}
