'use client'

import { useRef, useEffect } from 'react'
import { useGSAP } from '@/hooks/useGSAP'
import { gsap, ScrollTrigger } from '@/lib/gsap'

interface WorkCardProps {
  title: string
  subtitle?: string
  description: string
  liveUrl?: string
  images: string[]
  tags?: string[]
}

export function WorkCard({ 
  title, 
  subtitle, 
  description, 
  liveUrl, 
  images, 
  tags = [] 
}: WorkCardProps) {
  const cardRef = useRef<HTMLDivElement>(null)
  const leftSideRef = useRef<HTMLDivElement>(null)
  const rightSideRef = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    if (!cardRef.current || !leftSideRef.current || !rightSideRef.current) return

    // Set initial states - partes separadas desde los costados
    gsap.set(leftSideRef.current, {
      x: -400, // Lado izquierdo viene desde la izquierda (más lejos)
      opacity: 0,
      scale: 0.95,
      transformOrigin: "right center"
    })

    gsap.set(rightSideRef.current, {
      x: 400, // Lado derecho viene desde la derecha (más lejos)
      opacity: 0,
      scale: 0.95,
      transformOrigin: "left center"
    })

    // Crear timeline para la animación de unión
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: cardRef.current,
        start: "top 80%",
        end: "bottom 20%",
        toggleActions: "play none none none", // Removemos reverse automático
        once: false,
        onEnter: () => {
          // Animación de entrada: desde los costados hacia el centro
          tl.clear() // Limpiar timeline anterior
          
          tl.to(leftSideRef.current, {
            duration: 1.4,
            x: 0,
            opacity: 1,
            scale: 1,
            ease: "power3.out"
          })
          .to(rightSideRef.current, {
            duration: 1.4,
            x: 0,
            opacity: 1,
            scale: 1,
            ease: "power3.out"
          }, "-=1.2")
          .to([leftSideRef.current, rightSideRef.current], {
            duration: 0.4,
            scale: 1.01,
            ease: "elastic.out(1, 0.3)"
          }, "-=0.1")
        },
        onLeave: () => {
          // Animación de salida: efecto contrario - se separan hacia los costados opuestos
          tl.clear()
          
          tl.to(leftSideRef.current, {
            duration: 1.2,
            x: 400, // Se va hacia la DERECHA (efecto contrario)
            opacity: 0,
            scale: 0.95,
            ease: "power3.in"
          })
          .to(rightSideRef.current, {
            duration: 1.2,
            x: -400, // Se va hacia la IZQUIERDA (efecto contrario)
            opacity: 0,
            scale: 0.95,
            ease: "power3.in"
          }, "-=1.0") // Timing ligeramente diferente
        },
        onEnterBack: () => {
          // Al volver desde abajo: animación normal
          tl.clear()
          
          tl.to(leftSideRef.current, {
            duration: 1.4,
            x: 0,
            opacity: 1,
            scale: 1,
            ease: "power3.out"
          })
          .to(rightSideRef.current, {
            duration: 1.4,
            x: 0,
            opacity: 1,
            scale: 1,
            ease: "power3.out"
          }, "-=1.2")
        },
        onLeaveBack: () => {
          // Al salir hacia arriba: se van hacia sus lados originales
          tl.clear()
          
          tl.to(leftSideRef.current, {
            duration: 1.2,
            x: -400, // Lado izquierdo vuelve a su posición original
            opacity: 0,
            scale: 0.95,
            ease: "power3.in"
          })
          .to(rightSideRef.current, {
            duration: 1.2,
            x: 400, // Lado derecho vuelve a su posición original  
            opacity: 0,
            scale: 0.95,
            ease: "power3.in"
          }, "-=1.0")
        }
      }
    })

  }, [])

  return (
    <div 
      ref={cardRef}
      className="w-full h-full grid grid-cols-1 lg:grid-cols-2 overflow-hidden"
    >
      
      {/* Lado Izquierdo - Contenido Blanco */}
      <div ref={leftSideRef} className="work-card-side bg-white p-8 lg:p-16 flex flex-col justify-center">
        <div className="space-y-6">
          {/* Tags */}
          {tags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {tags.map((tag, index) => (
                <span 
                  key={index}
                  className="px-3 py-1 text-xs font-medium text-gray-600 border border-gray-300 rounded-full font-['Plus_Jakarta_Sans'] uppercase tracking-wide"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
          
          {/* Título y Subtítulo */}
          <div className="space-y-3">
            <h3 className="text-3xl lg:text-5xl xl:text-6xl font-black text-black font-['Exo_2'] uppercase tracking-tight leading-[0.9]">
              {title} {subtitle && '–'}
            </h3>
            {subtitle && (
              <h4 className="text-xl lg:text-2xl xl:text-3xl font-normal text-black font-['Exo_2'] uppercase tracking-tight leading-[0.9]">
                {subtitle}
              </h4>
            )}
          </div>

          {/* Descripción */}
          <p className="text-base lg:text-lg text-gray-700 leading-relaxed max-w-md font-['Plus_Jakarta_Sans'] font-normal">
            {description}
          </p>

          {/* Botón Live Website */}
          {liveUrl && (
            <div className="pt-4">
              <a
                href={liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 bg-black text-white rounded-full text-sm font-medium font-['Plus_Jakarta_Sans'] uppercase tracking-wide hover:bg-gray-800 transition-colors duration-300"
              >
                <span>LIVE WEBSITE</span>
                <svg 
                  width="16" 
                  height="16" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2"
                  className="rotate-45"
                >
                  <path d="M7 17L17 7M17 7H7M17 7V17"/>
                </svg>
              </a>
            </div>
          )}
        </div>
      </div>

      {/* Lado Derecho - Galería Oscura */}
      <div ref={rightSideRef} className="work-card-side bg-[#292929] p-8 lg:p-16 flex flex-col">
        
        {/* Título OUR WORK */}
        <div className="mb-8">
          <h5 className="text-white font-['Exo_2'] font-bold text-lg tracking-wider uppercase">
            OUR WORK
          </h5>
          <div className="w-20 h-0.5 bg-white mt-3"></div>
        </div>

        {/* Galería de Imágenes */}
        <div className="flex-1 flex items-center justify-center">
          {images.length > 0 ? (
            <div className="relative w-full max-w-lg">
              
              {/* Imagen Principal - Más grande como en el diseño */}
              <div className="w-full aspect-[4/3] bg-gray-600 rounded-2xl overflow-hidden shadow-2xl">
                <img 
                  src={images[0]} 
                  alt={`${title} preview`}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Imagen secundaria - Superpuesta abajo derecha */}
              {images.length > 1 && (
                <div className="absolute -right-4 -bottom-6 w-36 h-28 bg-gray-500 rounded-xl overflow-hidden shadow-xl border-4 border-[#292929] transform rotate-3">
                  <img 
                    src={images[1]} 
                    alt={`${title} preview 2`}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}

              {/* Imagen terciaria - Superpuesta arriba izquierda */}
              {images.length > 2 && (
                <div className="absolute -left-6 top-8 w-32 h-24 bg-gray-400 rounded-xl overflow-hidden shadow-xl border-4 border-[#292929] transform -rotate-2">
                  <img 
                    src={images[2]} 
                    alt={`${title} preview 3`}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
              
            </div>
          ) : (
            <div className="relative w-full max-w-lg aspect-[4/3] bg-gray-600 rounded-2xl flex items-center justify-center border-4 border-white">
              <div className="text-center">
                <div className="w-24 h-16 bg-white rounded-lg mx-auto mb-4"></div>
                <div className="w-32 h-12 bg-white rounded-lg mx-auto"></div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}