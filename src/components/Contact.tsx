'use client'

import { useRef, useState } from 'react'
import { useGSAP } from '@/hooks/useGSAP'
import { gsap, ScrollTrigger, SplitText } from '@/lib/gsap'

interface FormData {
  fullName: string
  phone: string
  reason: string
}

export function Contact() {
  const sectionRef = useRef<HTMLElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const formRef = useRef<HTMLFormElement>(null)
  const [formData, setFormData] = useState<FormData>({
    fullName: '',
    phone: '',
    reason: ''
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleWhatsAppContact = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!formData.fullName.trim() || !formData.phone.trim() || !formData.reason.trim()) {
      alert('Por favor completa todos los campos')
      return
    }

    // Crear mensaje para WhatsApp
    const message = `¡Hola Ignacio! 👋

Mi nombre es *${formData.fullName}* y me gustaría contactarte.

📞 *Teléfono:* ${formData.phone}

💼 *Motivo de contacto:*
${formData.reason}

¡Espero tu respuesta!`

    // Encodear el mensaje para URL
    const encodedMessage = encodeURIComponent(message)
    
    // Número de WhatsApp de Ignacio
    const whatsappNumber = "5493546407726" // +54 9 3546 407726
    
    // Crear URL de WhatsApp
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`
    
    // Abrir WhatsApp
    window.open(whatsappUrl, '_blank')
    
    // Limpiar formulario después de enviar
    setFormData({
      fullName: '',
      phone: '',
      reason: ''
    })
  }

  useGSAP(() => {
    if (!sectionRef.current || !titleRef.current || !formRef.current) return

    // Split title text into characters
    const titleSplit = new SplitText(titleRef.current, { 
      type: "chars",
      charsClass: "contact-title-char"
    })

    // Set initial states
    gsap.set(titleSplit.chars, {
      y: -100,
      opacity: 0,
      rotation: -10,
      transformOrigin: "center bottom"
    })

    gsap.set(formRef.current, {
      y: 60,
      opacity: 0
    })

    // Create timeline for animations
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 70%",
        end: "bottom 30%",
        toggleActions: "play none none reverse",
        once: false
      }
    })

    // Title animation - character by character
    tl.to(titleSplit.chars, {
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

    // Form animation - slides up
    .to(formRef.current, {
      duration: 0.8,
      y: 0,
      opacity: 1,
      ease: "power3.out"
    }, "-=0.3")

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

  return (
    <section 
      ref={sectionRef}
      data-section="contact"
      className="w-full py-24 overflow-hidden"
      style={{ backgroundColor: '#d4d4d4' }}
    >
      {/* Contenido principal */}
      <div className="max-w-6xl mx-auto px-8">
        <div className="text-center mb-16">
          {/* Título centrado */}
          <h2 
            ref={titleRef}
            className="text-4xl lg:text-6xl font-bold text-black font-['Exo_2'] uppercase tracking-tight cursor-default inline-block"
            style={{ 
              perspective: "1000px",
              transformStyle: "preserve-3d"
            }}
          >
            CONTACTO
          </h2>
          <div className="w-24 h-1 bg-black mx-auto mt-6"></div>
          <p className="text-lg text-gray-700 mt-6 max-w-2xl mx-auto font-['Plus_Jakarta_Sans']">
            ¿Tienes un proyecto en mente? Hablemos y hagamos realidad tu idea digital.
          </p>
        </div>
        
        {/* Contenedor del formulario con diseño mejorado */}
        <div className="flex justify-center">
          <div className="bg-[#292929] rounded-2xl shadow-2xl p-8 lg:p-12 max-w-2xl w-full">
            <form 
              ref={formRef}
              onSubmit={handleWhatsAppContact}
              className="space-y-8"
            >
              {/* Campo Nombre Completo */}
              <div>
                <label 
                  htmlFor="fullName"
                  className="block text-lg font-semibold text-white mb-3 font-['Plus_Jakarta_Sans']"
                >
                  Nombre Completo
                </label>
                <input
                  type="text"
                  id="fullName"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  required
                  className="w-full px-6 py-4 bg-[#3e3e3e] border-2 border-[#4e4e4e] rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent transition-all duration-300 font-['Plus_Jakarta_Sans'] text-lg"
                  placeholder="Ingresa tu nombre completo"
                />
              </div>

              {/* Campo Teléfono */}
              <div>
                <label 
                  htmlFor="phone"
                  className="block text-lg font-semibold text-white mb-3 font-['Plus_Jakarta_Sans']"
                >
                  Número de Teléfono
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  required
                  className="w-full px-6 py-4 bg-[#3e3e3e] border-2 border-[#4e4e4e] rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent transition-all duration-300 font-['Plus_Jakarta_Sans'] text-lg"
                  placeholder="Ej: +54 9 351 123-4567"
                />
              </div>

              {/* Campo Motivo */}
              <div>
                <label 
                  htmlFor="reason"
                  className="block text-lg font-semibold text-white mb-3 font-['Plus_Jakarta_Sans']"
                >
                  ¿Por qué me contactas?
                </label>
                <textarea
                  id="reason"
                  name="reason"
                  value={formData.reason}
                  onChange={handleInputChange}
                  required
                  rows={5}
                  className="w-full px-6 py-4 bg-[#3e3e3e] border-2 border-[#4e4e4e] rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent transition-all duration-300 resize-none font-['Plus_Jakarta_Sans'] text-lg leading-relaxed"
                  placeholder="Describe tu proyecto, idea o consulta en detalle..."
                />
              </div>

              {/* Botón WhatsApp mejorado */}
              <button
                type="submit"
                className="w-full bg-white hover:bg-gray-100 text-[#292929] font-bold py-6 px-8 rounded-xl transition-all duration-300 transform hover:scale-[1.02] hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-white focus:ring-opacity-50 font-['Plus_Jakarta_Sans'] text-lg flex items-center justify-center gap-4 group border-2 border-gray-200 hover:border-gray-300"
              >
                <svg 
                  width="28" 
                  height="28" 
                  viewBox="0 0 24 24" 
                  fill="#25D366"
                  className="group-hover:scale-110 transition-transform duration-300"
                >
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.587z"/>
                </svg>
                <span className="group-hover:translate-x-1 transition-transform duration-300">
                  Contactar por WhatsApp
                </span>
              </button>

              {/* Información adicional */}
              <div className="text-center pt-4">
                <p className="text-sm text-gray-600 font-['Plus_Jakarta_Sans']">
                  Al hacer clic, se abrirá WhatsApp con tu mensaje pre-cargado
                </p>
              </div>
            </form>
          </div>
        </div>

        {/* Footer info */}
        <div className="text-center mt-16 pt-12 border-t border-gray-400">
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-black font-['Exo_2'] uppercase">
              Ignacio Weigandt
            </h3>
            <p className="text-gray-700 font-['Plus_Jakarta_Sans']">
              Full Stack Developer • Santa Rosa de Calamuchita, Córdoba
            </p>
            <div className="flex flex-col sm:flex-row justify-center items-center gap-6 text-gray-600">
              <span className="flex items-center gap-2">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
                </svg>
                +54 9 3546 407726
              </span>
              <span className="flex items-center gap-2">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
                </svg>
                ignacioweigandt@gmail.com
              </span>
              <span className="flex items-center gap-2">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                </svg>
                Argentina
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}