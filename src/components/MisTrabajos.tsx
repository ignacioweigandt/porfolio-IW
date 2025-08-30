'use client'

import { useRef } from 'react'
import { useGSAP } from '@/hooks/useGSAP'
import { gsap, ScrollTrigger, SplitText } from '@/lib/gsap'
import { WorkCard } from './WorkCard'

export function MisTrabajos() {
  const sectionRef = useRef<HTMLElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)

  useGSAP(() => {
    if (!sectionRef.current || !titleRef.current) return

    // Split title text into characters
    const titleSplit = new SplitText(titleRef.current, { 
      type: "chars",
      charsClass: "about-title-char"
    })

    // Set initial state
    gsap.set(titleSplit.chars, {
      y: -100,
      opacity: 0,
      rotation: -10,
      transformOrigin: "center bottom"
    })

    // Create ScrollTrigger animation
    ScrollTrigger.create({
      trigger: sectionRef.current,
      start: "top 70%",
      onEnter: () => {
        gsap.to(titleSplit.chars, {
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

    // Cleanup function
    return () => {
      titleSplit.revert()
    }
  }, [])

  const projects = [
    {
      title: "SISTEMA POS",
      subtitle: "MULTISUCURSAL",
      description: "Desarrollo de un sistema de punto de venta escalable para gestionar ventas, stock y reportes en varios locales físicos y un e-commerce, optimizado para la simplicidad y la eficiencia operativa.",
      liveUrl: "https://pos.example.com",
      images: [
        "/img/pos-main.jpg",
        "/img/pos-inventory.jpg",
        "/img/pos-reports.jpg"
      ],
      tags: ["NEXT.JS", "POS", "INVENTORY", "REPORTS"]
    },
    {
      title: "TIENDA ONLINE",
      subtitle: "DEPORTIVA",
      description: "Plataforma de e-commerce conectada con el sistema de inventario, con panel de administración para productos, pedidos y ventas por WhatsApp, ofreciendo una experiencia de compra ágil y adaptable.",
      liveUrl: "https://tienda-deportiva.example.com",
      images: [
        "/img/ecommerce-sports.jpg",
        "/img/ecommerce-admin.jpg",
        "/img/ecommerce-whatsapp.jpg"
      ],
      tags: ["E-COMMERCE", "WHATSAPP", "SPORTS", "ADMIN"]
    },
    {
      title: "CABAÑAS CANTARES",
      subtitle: "DEL RÍO",
      description: "Sitio web de una cabaña turística con diseño atractivo, información clara, galería de imágenes y sección de contacto para reservas directas, optimizado para dispositivos móviles.",
      liveUrl: "https://cabanas-cantares.example.com",
      images: [
        "/img/cabanas-main.jpg",
        "/img/cabanas-gallery.jpg",
        "/img/cabanas-contact.jpg"
      ],
      tags: ["TOURISM", "LANDING", "MOBILE", "RESERVAS"]
    },
    {
      title: "PORTAL WEB",
      subtitle: "INMOBILIARIO",
      description: "Desarrollo de una página moderna para inmobiliaria, con listado de propiedades, filtros de búsqueda y datos de contacto directo, diseñada para mejorar la visibilidad y captar clientes.",
      liveUrl: "https://inmobiliaria.example.com",
      images: [
        "/img/real-estate-main.jpg",
        "/img/real-estate-filters.jpg",
        "/img/real-estate-properties.jpg"
      ],
      tags: ["REAL ESTATE", "FILTERS", "PROPERTIES", "CONTACT"]
    }
  ]

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
            MIS TRABAJOS
          </h2>
        </div>
      </div>

      <div className="space-y-16">
        {projects.map((project, index) => (
          <div key={index} className="flex justify-center px-4">
            <div className="w-full max-w-7xl h-[85vh] rounded-3xl overflow-hidden shadow-2xl">
              <WorkCard
                title={project.title}
                subtitle={project.subtitle}
                description={project.description}
                liveUrl={project.liveUrl}
                images={project.images}
                tags={project.tags}
              />
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}