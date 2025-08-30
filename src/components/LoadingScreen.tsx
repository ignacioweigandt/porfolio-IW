'use client'

import { useRef, useEffect, useState } from 'react'
import { useGSAP } from '@/hooks/useGSAP'
import { gsap } from '@/lib/gsap'

export function LoadingScreen() {
  const curtainRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    // Trigger de animación después de que el componente se monte
    const timer = setTimeout(() => {
      if (curtainRef.current) {
        // Animación: cortina baja desde arriba hacia abajo
        gsap.to(curtainRef.current, {
          duration: 1.5,
          y: '100vh', // Se mueve hacia abajo hasta desaparecer
          ease: 'power3.inOut',
          onComplete: () => {
            setIsVisible(false)
          }
        })
      }
    }, 1500) // 1.5 segundos visible antes de animar

    return () => clearTimeout(timer)
  }, [])

  if (!isVisible) return null

  return (
    <div
      ref={curtainRef}
      className="fixed inset-0 z-[100] flex items-center justify-center"
      style={{ backgroundColor: '#d4d4d4' }}
    >
      {/* Contenido de carga */}
      <div 
        ref={contentRef}
        className="text-center"
      >
        <div className="mb-8">
          <h1 className="text-4xl lg:text-6xl font-black text-black font-['Exo_2'] uppercase tracking-tight">
            IW
          </h1>
        </div>
        
        {/* Indicador de carga sutil */}
        <div className="w-16 h-0.5 bg-black mx-auto">
          <div className="h-full bg-gray-600 animate-pulse"></div>
        </div>
      </div>
    </div>
  )
}