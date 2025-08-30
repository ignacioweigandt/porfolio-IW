'use client'

import { useRef, useEffect } from 'react'
import { useGSAP } from '@/hooks/useGSAP'
import { gsap } from '@/lib/gsap'

interface MenuProps {
  isOpen: boolean
  onClose: () => void
}

export function Menu({ isOpen, onClose }: MenuProps) {
  const menuRef = useRef<HTMLDivElement>(null)
  const curtainRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const menuItemsRef = useRef<(HTMLAnchorElement | null)[]>([])
  const numbersRef = useRef<(HTMLSpanElement | null)[]>([])

  const menuItems = [
    { name: 'INICIO', number: '01', href: '#home' },
    { name: 'TRABAJOS', number: '02', href: '#work' },
    { name: 'SOBRE MI', number: '03', href: '#about' },
    { name: 'CONTACTO', number: '04', href: '#contact' }
  ]

  const scrollToSection = (href: string) => {
    onClose()
    
    // Scroll suave a la sección después de cerrar el menú
    setTimeout(() => {
      if (href === '#home') {
        window.scrollTo({ top: 0, behavior: 'smooth' })
      } else if (href === '#work') {
        const workSection = document.querySelector('[data-section="work"]')
        workSection?.scrollIntoView({ behavior: 'smooth' })
      } else if (href === '#about') {
        const aboutSection = document.querySelector('[data-section="about"]')
        aboutSection?.scrollIntoView({ behavior: 'smooth' })
      } else if (href === '#contact') {
        const contactSection = document.querySelector('[data-section="contact"]')
        contactSection?.scrollIntoView({ behavior: 'smooth' })
      }
    }, 300)
  }

  useGSAP(() => {
    if (!menuRef.current || !curtainRef.current || !contentRef.current) return

    if (isOpen) {
      // Animación de apertura - cortina desde arriba
      const tl = gsap.timeline()

      // Hacer visible el menú
      gsap.set(menuRef.current, { display: 'block' })
      
      // Cortina se despliega desde arriba (altura 0 a 100%)
      gsap.set(curtainRef.current, { 
        height: '0%',
        transformOrigin: 'top center'
      })
      
      // Contenido inicialmente invisible
      gsap.set(contentRef.current, { opacity: 0, y: -50 })
      gsap.set(menuItemsRef.current, { opacity: 0, y: -30 })
      gsap.set(numbersRef.current, { opacity: 0, x: 30 })

      tl.to(curtainRef.current, {
        duration: 0.8,
        height: '100%',
        ease: 'power3.out'
      })
      .to(contentRef.current, {
        duration: 0.6,
        opacity: 1,
        y: 0,
        ease: 'power2.out'
      }, '-=0.3')
      .to(menuItemsRef.current, {
        duration: 0.8,
        opacity: 1,
        y: 0,
        ease: 'power2.out',
        stagger: 0.1
      }, '-=0.4')
      .to(numbersRef.current, {
        duration: 0.6,
        opacity: 1,
        x: 0,
        ease: 'power2.out',
        stagger: 0.05
      }, '-=0.6')

    } else {
      // Animación de cierre - cortina hacia arriba
      const tl = gsap.timeline({
        onComplete: () => {
          if (menuRef.current) {
            gsap.set(menuRef.current, { display: 'none' })
          }
        }
      })

      tl.to([menuItemsRef.current, numbersRef.current], {
        duration: 0.3,
        opacity: 0,
        y: -20,
        ease: 'power2.in',
        stagger: 0.03
      })
      .to(contentRef.current, {
        duration: 0.4,
        opacity: 0,
        y: -30,
        ease: 'power2.in'
      }, '-=0.2')
      .to(curtainRef.current, {
        duration: 0.6,
        height: '0%',
        ease: 'power3.in'
      }, '-=0.2')
    }

  }, [isOpen])

  // Manejar tecla Escape para cerrar
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose()
      }
    }

    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown)
      document.body.style.overflow = 'hidden' // Prevenir scroll
    } else {
      document.body.style.overflow = 'unset'
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = 'unset'
    }
  }, [isOpen, onClose])

  return (
    <div
      ref={menuRef}
      className="fixed inset-0 z-50"
      style={{ display: 'none' }}
    >
      {/* Cortina de fondo */}
      <div
        ref={curtainRef}
        className="absolute inset-0 bg-[#3a3a3a] w-full"
        style={{ height: '0%' }}
      />

      {/* Contenido del menú */}
      <div
        ref={contentRef}
        className="relative z-10 h-full flex flex-col"
      >
        {/* Header del menú */}
        <div className="flex justify-between items-center p-8">
          <div className="text-white font-['Exo_2'] text-lg font-medium">
            Ignacio Weigandt™
          </div>
          
          {/* Botón de cierre */}
          <button
            onClick={onClose}
            className="w-12 h-12 rounded-full bg-white text-black flex items-center justify-center hover:bg-gray-100 transition-colors duration-300 group"
            aria-label="Cerrar menú"
          >
            <svg 
              width="20" 
              height="20" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2"
              className="group-hover:rotate-90 transition-transform duration-300"
            >
              <path d="M18 6L6 18M6 6l12 12"/>
            </svg>
          </button>
        </div>

        {/* Navegación principal */}
        <div className="flex-1 flex flex-col justify-center px-8 lg:px-16">
          <nav className="space-y-4">
            {menuItems.map((item, index) => (
              <div key={item.name} className="flex items-center justify-between border-b border-gray-600 pb-4">
                <a
                  ref={el => menuItemsRef.current[index] = el}
                  href={item.href}
                  onClick={(e) => {
                    e.preventDefault()
                    scrollToSection(item.href)
                  }}
                  className="text-6xl lg:text-8xl xl:text-9xl font-black text-white font-['Exo_2'] uppercase tracking-tight leading-none hover:text-gray-300 transition-colors duration-300 cursor-pointer group"
                >
                  <span className="group-hover:translate-x-4 transition-transform duration-300 inline-block">
                    {item.name}
                  </span>
                </a>
                <span
                  ref={el => numbersRef.current[index] = el}
                  className="text-2xl lg:text-3xl text-gray-400 font-['Plus_Jakarta_Sans'] font-light"
                >
                  {item.number}
                </span>
              </div>
            ))}
          </nav>
        </div>

      </div>
    </div>
  )
}