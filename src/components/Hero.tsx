'use client'

import ScrollVelocity from '@/components/ScrollVelocity'
import ProfileCard from '@/components/ProfileCard'
import { About } from '@/components/About'
import { Services } from '@/components/Services'
import CurvedLoop from '@/components/CurvedLoop'
import { Timeline } from '@/components/Timeline'
import { Contact } from '@/components/Contact'
import { Header } from '@/components/Header'
import { LoadingScreen } from '@/components/LoadingScreen'

export function Hero() {
  return (
    <div>
      <LoadingScreen />
      <Header />
      <div data-section="home" className="min-h-screen">
        <div className="pt-20">
          <ScrollVelocity
            texts={['Desarrollador Web']} 
            velocity={100} 
            className="custom-scroll-text"
          />
        </div>
        
        <div className="flex justify-center items-center mt-40 px-4">
          <ProfileCard
            name="Ignacio Weigandt"
            title="Full Stack Developer"
            handle="ignacioweigandt"
            status="Disponible"
            contactText="Contactame"
            avatarUrl="/img/Imagen-Porfolio-blancoNegro.webp"
            showUserInfo={true}
            enableTilt={true}
            enableMobileTilt={false}
            onContactClick={() => {
              const contactSection = document.querySelector('[data-section="contact"]')
              contactSection?.scrollIntoView({ behavior: 'smooth' })
            }}
          />
        </div>
      </div>
      
      <About />
      <Services />
      <div className="-mt-48">
        <CurvedLoop 
          marqueeText="Next.js✦ TypeScript ✦ PostgreSql✦ React ✦"
          speed={1.5}
          curveAmount={500}
          direction="right"
          interactive={true}
          className="font-['Exo_2']"
        />
      </div>

      <Timeline />
      <Contact />
    </div>
  )
}