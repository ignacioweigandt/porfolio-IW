'use client'

import { useRef, useEffect } from 'react'
import { useGSAP } from '@/hooks/useGSAP'
import { gsap, ScrollTrigger, SplitText } from '@/lib/gsap'

interface TimelineStep {
  number: string
  title: string
  description: string
}

export function Timeline() {
  const sectionRef = useRef<HTMLElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const lineRef = useRef<HTMLDivElement>(null)
  const stepsContainerRef = useRef<HTMLDivElement>(null)

  const steps: TimelineStep[] = [
    {
      number: "01",
      title: "Primer contacto",
      description: "Te comunicas conmigo mediante WhatsApp, mail o formulario para contarme qué necesitás."
    },
    {
      number: "02",
      title: "Reunión inicial",
      description: "Charlamos sobre tu negocio, tus objetivos y el tipo de página que querés."
    },
    {
      number: "03",
      title: "Propuesta & presupuesto",
      description: "Te presento una propuesta a medida con el alcance del proyecto, tiempos y costos."
    },
    {
      number: "04",
      title: "Desarrollo",
      description: "Construyo tu sitio web, integrando funcionalidades, contenido, imágenes y secciones."
    },
    {
      number: "05",
      title: "Publicación",
      description: "Pongo tu página online, conecto el dominio y dejo todo funcionando correctamente."
    },
    {
      number: "06",
      title: "Soporte",
      description: "Incluye soporte técnico inicial y asesoramiento para que puedas gestionarla."
    }
  ]

  useGSAP(() => {
    if (!sectionRef.current || !titleRef.current || !lineRef.current) return

    // Split title text into characters
    const titleSplit = new SplitText(titleRef.current, {
      type: "chars",
      charsClass: "about-title-char"
    })

    // Set initial state for title
    gsap.set(titleSplit.chars, {
      y: -100,
      opacity: 0,
      rotation: -10,
      transformOrigin: "center bottom"
    })

    // Title animation
    const titleTimeline = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 70%",
        toggleActions: "play none none reverse",
        once: false
      }
    })

    titleTimeline.to(titleSplit.chars, {
      duration: 0.8,
      y: 0,
      opacity: 1,
      rotation: 0,
      ease: "back.out(1.7)",
      stagger: {
        amount: 0.6,
        from: "start",
        ease: "power2.out"
      }
    })

    // Add hover effects for title characters
    titleSplit.chars?.forEach((char) => {
      const element = char as HTMLElement

      element.addEventListener('mouseenter', () => {
        gsap.to(char, {
          duration: 0.3,
          scale: 1.2,
          rotation: 5,
          ease: "back.out(2)",
          yoyo: true,
          repeat: 1
        })
      })
    })

    // Animate the timeline steps with ScrollTrigger.batch
    ScrollTrigger.batch(".timeline-step", {
      onEnter: (elements) => {
        elements.forEach((element, index) => {
          const circle = element.querySelector('.timeline-circle')
          const circleBorder = element.querySelector('.timeline-circle-border')
          const content = element.querySelector('.timeline-content')

          // Animate the step container
          gsap.fromTo(element,
            {
              y: 80,
              opacity: 0
            },
            {
              y: 0,
              opacity: 1,
              duration: 0.8,
              ease: "power3.out",
              delay: index * 0.15
            }
          )

          // Animate circle with scale and pulse
          gsap.fromTo(circle,
            {
              scale: 0,
              opacity: 0
            },
            {
              scale: 1,
              opacity: 1,
              duration: 0.6,
              ease: "back.out(1.7)",
              delay: index * 0.15
            }
          )

          // Animate circle border growing
          gsap.fromTo(circleBorder,
            {
              scale: 0,
              opacity: 0
            },
            {
              scale: 1,
              opacity: 1,
              duration: 0.8,
              ease: "elastic.out(1, 0.4)",
              delay: index * 0.15 + 0.2
            }
          )

          // Pulse effect after entering
          gsap.to(circle, {
            scale: 1.1,
            duration: 0.3,
            ease: "power2.out",
            yoyo: true,
            repeat: 1,
            delay: index * 0.15 + 0.6
          })

          // Animate content
          gsap.fromTo(content,
            {
              x: -30,
              opacity: 0
            },
            {
              x: 0,
              opacity: 1,
              duration: 0.8,
              ease: "power3.out",
              delay: index * 0.15 + 0.3
            }
          )
        })
      },
      onLeave: (elements) => {
        gsap.to(elements, {
          opacity: 0.5,
          duration: 0.4
        })
      },
      onEnterBack: (elements) => {
        gsap.to(elements, {
          opacity: 1,
          duration: 0.4
        })
      },
      start: "top 80%",
      end: "bottom 20%"
    })

    // Add hover effects for each step
    const stepElements = document.querySelectorAll('.timeline-step')
    stepElements.forEach((step) => {
      const circle = step.querySelector('.timeline-circle')

      step.addEventListener('mouseenter', () => {
        gsap.to(circle, {
          scale: 1.15,
          boxShadow: '0 0 30px rgba(41, 41, 41, 0.4)',
          duration: 0.3,
          ease: "power2.out"
        })
      })

      step.addEventListener('mouseleave', () => {
        gsap.to(circle, {
          scale: 1,
          boxShadow: '0 0 0px rgba(41, 41, 41, 0)',
          duration: 0.3,
          ease: "power2.out"
        })
      })
    })

    // Animate the connecting line progressively
    gsap.fromTo(lineRef.current,
      {
        scaleY: 0,
        transformOrigin: "top center"
      },
      {
        scaleY: 1,
        duration: 2,
        ease: "power2.out",
        scrollTrigger: {
          trigger: stepsContainerRef.current,
          start: "top 60%",
          end: "bottom 20%",
          scrub: 1
        }
      }
    )

    // Cleanup
    return () => {
      titleSplit.revert()
    }
  }, [])

  return (
    <section
      ref={sectionRef}
      data-section="work"
      className="w-full py-16"
      style={{ backgroundColor: '#d4d4d4' }}
    >
      {/* Título de la sección */}
      <div className="max-w-7xl mx-auto px-8 mb-20">
        <div className="flex justify-center">
          <h2
            ref={titleRef}
            className="text-4xl lg:text-5xl font-bold text-[#292929] font-['Exo_2'] uppercase tracking-tight cursor-default"
            style={{
              perspective: "1000px",
              transformStyle: "preserve-3d"
            }}
          >
            MI PROCESO
          </h2>
        </div>
      </div>

      {/* Timeline Container */}
      <div ref={stepsContainerRef} className="max-w-5xl mx-auto px-8 py-12 relative">

        {/* Línea vertical conectora */}
        <div
          ref={lineRef}
          className="absolute left-8 lg:left-16 top-0 bottom-0 w-0.5 bg-[#292929] opacity-20"
          style={{ transformOrigin: "top center" }}
        />

        {/* Steps */}
        <div className="space-y-24">
          {steps.map((step, index) => (
            <div
              key={index}
              className="timeline-step relative flex items-start gap-8 lg:gap-16 cursor-pointer"
            >
              {/* Círculo numerado con borde animado */}
              <div className="relative z-10 flex-shrink-0">
                {/* Borde exterior animado */}
                <div className="timeline-circle-border absolute inset-0 w-16 h-16 lg:w-20 lg:h-20 rounded-full border-4 border-[#d4d4d4]" />

                {/* Círculo interior */}
                <div className="timeline-circle w-16 h-16 lg:w-20 lg:h-20 rounded-full bg-[#292929] flex items-center justify-center shadow-lg transition-shadow duration-300">
                  <span className="text-white font-['Exo_2'] font-bold text-xl lg:text-2xl">
                    {step.number}
                  </span>
                </div>
              </div>

              {/* Contenido */}
              <div className="timeline-content flex-1 pt-2">
                <h3 className="text-2xl lg:text-3xl font-bold text-[#292929] font-['Exo_2'] uppercase tracking-tight mb-4">
                  {step.title}
                </h3>
                <p
                  className="text-base lg:text-lg text-[#292929] leading-relaxed font-['Plus_Jakarta_Sans'] max-w-2xl"
                  style={{ lineHeight: '1.8' }}
                >
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
