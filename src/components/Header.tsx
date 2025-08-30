'use client'

import { useState } from 'react'
import { Menu } from './Menu'

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  return (
    <>
      {/* Header fijo */}
      <header className="fixed top-0 left-0 right-0 z-40 bg-transparent">
        <div className="flex justify-between items-center p-6 lg:p-8">
          {/* Logo/Nombre */}
          <div className="text-white font-['Exo_2'] text-lg lg:text-xl font-medium">
            Ignacio Weigandt™
          </div>
          
          {/* Botón hamburguesa */}
          <button
            onClick={toggleMenu}
            className="w-12 h-12 lg:w-14 lg:h-14 rounded-full bg-white text-black flex items-center justify-center hover:bg-gray-100 transition-all duration-300 group relative overflow-hidden"
            aria-label="Abrir menú"
          >
            {/* Animación del ícono hamburguesa */}
            <div className="relative w-6 h-6 flex flex-col justify-center items-center">
              <span 
                className={`block w-6 h-0.5 bg-black transition-all duration-300 ${
                  isMenuOpen 
                    ? 'rotate-45 translate-y-0' 
                    : 'translate-y-[-4px]'
                }`}
              />
              <span 
                className={`block w-6 h-0.5 bg-black transition-all duration-300 ${
                  isMenuOpen 
                    ? 'opacity-0' 
                    : 'opacity-100 translate-y-0'
                }`}
              />
              <span 
                className={`block w-6 h-0.5 bg-black transition-all duration-300 ${
                  isMenuOpen 
                    ? '-rotate-45 translate-y-0' 
                    : 'translate-y-[4px]'
                }`}
              />
            </div>
          </button>
        </div>
      </header>

      {/* Componente Menu */}
      <Menu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
    </>
  )
}