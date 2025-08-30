'use client'

import { useRef, useEffect } from 'react'
import { useGSAP } from '@/hooks/useGSAP'
import { gsap, ScrollTrigger, SplitText } from '@/lib/gsap'

interface AnimationElements {
  titleChars?: Element[]
  textLines?: Element[]
}

export function About() {
  const sectionRef = useRef<HTMLElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const textRef = useRef<HTMLParagraphElement>(null)
  const elementsRef = useRef<AnimationElements>({})

  useGSAP(() => {
    if (!sectionRef.current || !titleRef.current || !textRef.current) return

    // Split title text into characters
    const titleSplit = new SplitText(titleRef.current, { 
      type: "chars",
      charsClass: "about-title-char"
    })
    
    // Split paragraph text into lines
    const textSplit = new SplitText(textRef.current, { 
      type: "lines",
      linesClass: "about-text-line"
    })

    // Store references for cleanup
    elementsRef.current = {
      titleChars: titleSplit.chars,
      textLines: textSplit.lines
    }

    // Set initial states
    gsap.set(titleSplit.chars, {
      y: -100,
      opacity: 0,
      rotation: -10,
      transformOrigin: "center bottom"
    })

    gsap.set(textSplit.lines, {
      y: -50,
      opacity: 0,
      transformOrigin: "left center"
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
      duration: 0.8,
      y: 0,
      opacity: 1,
      rotation: 0,
      ease: "back.out(1.7)",
      stagger: {
        amount: 0.6, // Total time for all letters
        from: "start",
        ease: "power2.out"
      }
    })

    // Text animation - domino effect for lines (starts slightly before title finishes)
    .to(textSplit.lines, {
      duration: 0.6,
      y: 0,
      opacity: 1,
      ease: "power3.out",
      stagger: {
        amount: 0.4, // Total time for all lines
        from: "start",
        ease: "power2.out"
      }
    }, "-=0.3") // Start 0.3s before previous animation ends

    // Add subtle bounce effect on hover for title characters
    titleSplit.chars?.forEach((char, index) => {
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

    // Cleanup function
    return () => {
      titleSplit.revert()
      textSplit.revert()
    }
  }, [])

  // Performance optimization: cleanup on unmount
  useEffect(() => {
    return () => {
      if (elementsRef.current.titleChars || elementsRef.current.textLines) {
        gsap.killTweensOf([
          elementsRef.current.titleChars,
          elementsRef.current.textLines
        ])
      }
    }
  }, [])

  return (
    <section 
      ref={sectionRef}
      data-section="about"
      className="w-full bg-[#292929] py-20 overflow-hidden"
    >
      {/* Línea superior */}
      <div className="w-full h-px bg-[#3e3e3e] mb-20"></div>
      
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
              SOBRE MI
            </h2>
          </div>
          
          {/* Columna derecha - Contenido */}
          <div className="flex flex-col justify-start">
            <p 
              ref={textRef}
              className="text-lg lg:text-xl text-white leading-relaxed max-w-2xl"
              style={{ 
                fontFamily: 'var(--font-plus-jakarta-sans), "Plus Jakarta Sans", sans-serif',
                lineHeight: '1.8'
              }}
            >
              Soy desarrollador web de Santa Rosa de Calamuchita, Córdoba, Argentina. Me especializo en crear soluciones digitales modernas, funcionales y adaptadas a las necesidades de personas, negocios y empresas. Mi enfoque combina diseño atractivo, usabilidad y animaciones dinámicas que hacen que cada sitio web sea visualmente impactante y fácil de usar.
            </p>
          </div>
        </div>
      </div>
      
      {/* Línea inferior */}
      <div className="w-full h-px bg-[#3e3e3e] mt-20"></div>
    </section>
  )
}