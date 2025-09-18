'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-white shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        {/* Logo */}
        <div className="z-10">
          <Link href="/" onClick={() => setIsMenuOpen(false)}>
            <img 
              src="/images/buenos-pasos-logo.png" 
              alt="Logo Buenos Pasos"
              className="h-12 w-auto"
            />
          </Link>
        </div>

        {/* Botón del Menú Móvil (Hamburguesa) */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="md:hidden text-gray-700 hover:text-blue-600 focus:outline-none z-10"
          aria-label="Toggle menu"
          aria-expanded={isMenuOpen}
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {isMenuOpen ? (
              // Icono de "X" cuando el menú está abierto
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              // Icono de hamburguesa cuando el menú está cerrado
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>

        {/* Navegación para Desktop */}
        <nav className="hidden md:flex space-x-8">
          <Link href="/" className="text-gray-700 hover:text-blue-600 font-medium transition-colors duration-300">Inicio</Link>
          <Link href="/caminatas" className="text-gray-700 hover:text-blue-600 font-medium transition-colors duration-300">Caminatas</Link>
          <Link href="/notion-page/about" className="text-gray-700 hover:text-blue-600 font-medium transition-colors duration-300">Sobre Nosotros</Link>
        </nav>

        {/* Botón de Acción para Desktop */}
        <Link 
          href="/inscripcion" 
          className="hidden md:block bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-semibold transition-colors duration-300 transform hover:scale-105"
        >
          ¡Reserva Ahora!
        </Link>
      </div>

      {/* Menú Lateral Móvil (Solo visible en móviles) */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200 absolute top-full left-0 right-0 z-40 shadow-lg animate-in slide-in-from-top-2 fade-in duration-200">
          <nav className="flex flex-col p-4 space-y-4">
            <Link 
              href="/" 
              className="text-gray-700 font-medium py-2 hover:text-blue-600 transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Inicio
            </Link>
            <Link 
              href="/caminatas" 
              className="text-gray-700 font-medium py-2 hover:text-blue-600 transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Caminatas
            </Link>
            <Link 
              href="/notion-page/about" 
              className="text-gray-700 font-medium py-2 hover:text-blue-600 transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Sobre Nosotros
            </Link>
            <Link 
              href="/inscripcion" 
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-lg text-center transition-colors duration-300"
              onClick={() => setIsMenuOpen(false)}
            >
              ¡Reserva Ahora!
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}