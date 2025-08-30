'use client'

import { useRef, useEffect } from 'react'
import { useGSAP } from '@/hooks/useGSAP'
import { gsap, ScrollTrigger, SplitText } from '@/lib/gsap'

interface AnimationElements {
  titleChars?: Element[]
  serviceCards?: HTMLElement[]
}

export function Services() {
  const sectionRef = useRef<HTMLElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const cardsRef = useRef<HTMLDivElement>(null)
  const elementsRef = useRef<AnimationElements>({})
  const iconRefs = useRef<(HTMLImageElement | null)[]>([])

  const services = [
    {
      id: 1,
      title: "E-commerce",
      description: "Diseño y desarrollo de tiendas online escalables, seguras y fáciles de administrar."
    },
    {
      id: 2,
      title: "Sistemas de Gestión",
      description: "Desarrollo de sistemas a medida para organizar y optimizar procesos internos de tu negocio."
    },
    {
      id: 3,
      title: "Sistemas de Punto de Venta (POS)",
      description: "Implementación de soluciones POS integradas para ventas físicas y online."
    },
    {
      id: 4,
      title: "Páginas Web",
      description: "Creación de páginas de aterrizaje atractivas y rápidas para potenciar tu presencia digital."
    }
  ]

  useGSAP(() => {
    if (!sectionRef.current || !titleRef.current || !cardsRef.current) return

    // Split title text into characters
    const titleSplit = new SplitText(titleRef.current, { 
      type: "chars",
      charsClass: "services-title-char"
    })
    
    // Get all service cards
    const serviceCards = Array.from(cardsRef.current.children) as HTMLElement[]

    // Store references for cleanup
    elementsRef.current = {
      titleChars: titleSplit.chars,
      serviceCards: serviceCards
    }

    // Set initial states for title characters
    gsap.set(titleSplit.chars, {
      y: -120,
      opacity: 0,
      rotation: -15,
      scale: 0.8,
      transformOrigin: "center bottom"
    })

    // Set initial states for service cards
    gsap.set(serviceCards, {
      y: -100,
      opacity: 0,
      rotation: -8,
      scale: 0.9,
      transformOrigin: "center center"
    })

    // Create timeline for the domino effect
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 70%",
        end: "bottom 30%",
        toggleActions: "play none none reverse",
        once: false
      }
    })

    // Title animation - domino effect for letters
    tl.to(titleSplit.chars, {
      duration: 0.9,
      y: 0,
      opacity: 1,
      rotation: 0,
      scale: 1,
      ease: "back.out(1.7)",
      stagger: {
        amount: 0.7, // Total time for all letters
        from: "start",
        ease: "power2.out"
      }
    })

    // Service cards animation - domino effect for cards (starts after title animation)
    .to(serviceCards, {
      duration: 0.8,
      y: 0,
      opacity: 1,
      rotation: 0,
      scale: 1,
      ease: "back.out(1.4)",
      stagger: {
        amount: 0.6, // Total time for all cards
        from: "start",
        ease: "power2.out"
      }
    }, "-=0.2") // Start 0.2s before title animation ends

    // Add subtle bounce effect on hover for title characters
    titleSplit.chars?.forEach((char, index) => {
      const element = char as HTMLElement
      
      element.addEventListener('mouseenter', () => {
        gsap.to(char, {
          duration: 0.4,
          scale: 1.3,
          rotation: 8,
          ease: "back.out(2.5)",
          yoyo: true,
          repeat: 1
        })
      })
    })

    // Add enhanced hover effects for service cards
    serviceCards.forEach((card, index) => {
      card.addEventListener('mouseenter', () => {
        gsap.to(card, {
          duration: 0.4,
          scale: 1.08,
          rotation: 2,
          ease: "power2.out"
        })
      })

      card.addEventListener('mouseleave', () => {
        gsap.to(card, {
          duration: 0.4,
          scale: 1,
          rotation: 0,
          ease: "power2.out"
        })
      })
    })

    // Add scroll-triggered rotation effect for SVG icons
    iconRefs.current.forEach((icon, index) => {
      if (icon) {
        gsap.to(icon, {
          rotation: 360,
          duration: 1,
          ease: "none",
          scrollTrigger: {
            trigger: icon.closest('.bg-\\[\\#343434\\]'), // Target the parent card
            start: "top bottom",
            end: "bottom top",
            scrub: 1, // Smooth scrubbing effect
            onUpdate: (self) => {
              // Alternate rotation direction based on index
              const direction = index % 2 === 0 ? 1 : -1
              gsap.set(icon, { rotation: self.progress * 360 * direction })
            }
          }
        })
      }
    })

    // Cleanup function
    return () => {
      titleSplit.revert()
    }
  }, [])

  // Performance optimization: cleanup on unmount
  useEffect(() => {
    return () => {
      if (elementsRef.current.titleChars || elementsRef.current.serviceCards) {
        gsap.killTweensOf([
          elementsRef.current.titleChars,
          elementsRef.current.serviceCards
        ])
      }
    }
  }, [])

  return (
    <section 
      ref={sectionRef}
      className="w-full bg-[#292929] py-20 overflow-hidden"
    >
      {/* Contenido principal */}
      <div className="max-w-7xl mx-auto px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Columna izquierda - Título */}
          <div className="flex justify-start">
            <h2 
              ref={titleRef}
              className="text-2xl lg:text-3xl font-bold text-white font-['Exo_2'] uppercase tracking-tight cursor-default"
              style={{ 
                perspective: "1000px",
                transformStyle: "preserve-3d"
              }}
            >
              SERVICIOS
            </h2>
          </div>
          
          {/* Columna derecha - Tarjetas de servicios */}
          <div 
            ref={cardsRef}
            className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-2xl"
          >
            {services.map((service, index) => (
              <div 
                key={service.id}
                className="bg-[#343434] rounded-lg w-[280px] h-[320px] flex flex-col overflow-hidden cursor-pointer"
                style={{
                  transformStyle: "preserve-3d"
                }}
              >
                {/* Cuadrado blanco con ícono */}
                <div className="bg-white w-16 h-16 rounded-lg flex items-center justify-center m-6 mb-4">
                  <img 
                    ref={el => iconRefs.current[index] = el}
                    src="/img/asterisk-svgrepo-com.svg" 
                    alt={`${service.title} icon`}
                    className="w-8 h-8"
                  />
                </div>
                
                {/* Contenido de texto */}
                <div className="px-6 pb-6 flex flex-col flex-1">
                  <h3 className="text-xl font-semibold text-white font-['Exo_2'] mb-4">
                    {service.title}
                  </h3>
                  <p 
                    className="text-sm text-gray-200 leading-relaxed flex-1"
                    style={{ fontFamily: 'var(--font-plus-jakarta-sans), "Plus Jakarta Sans", sans-serif' }}
                  >
                    {service.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}