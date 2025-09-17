'use client';
import { useState } from 'react';
import Link from 'next/link';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="bg-white shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between py-4">
          {/* Logo */}
          <div>
            <img
              src="/images/buenos-pasos-logo.png"
              alt="Logo Buenos Pasos"
              className="h-12 w-auto"
            />
          </div>
          {/* Navegación Desktop */}
          <nav className="hidden md:flex space-x-8 items-center">
            <Link href="/" className="text-gray-700 hover:text-blue-600 font-medium transition-colors duration-300">Inicio</Link>
            <Link href="/caminatas" className="text-gray-700 hover:text-blue-600 font-medium transition-colors duration-300">Caminatas</Link>
            <Link href="/notion-page/about" className="text-gray-700 hover:text-blue-600 font-medium transition-colors duration-300">Sobre Nosotros</Link>
            <Link
              href="/inscripcion"
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-semibold transition-colors duration-300 transform hover:scale-105"
            >
              ¡Reserva Ahora!
            </Link>
          </nav>
          {/* Botón hamburguesa para móvil */}
          <button
            className="md:hidden p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Abrir menú"
          >
            <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>
      {/* Menú lateral móvil */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-40 z-50 flex md:hidden">
          <div className="bg-white w-64 h-full shadow-lg p-8 flex flex-col space-y-6">
            <button
              className="self-end mb-4 p-2"
              onClick={() => setMobileMenuOpen(false)}
              aria-label="Cerrar menú"
            >
              <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <Link href="/" className="text-gray-700 font-medium text-lg" onClick={() => setMobileMenuOpen(false)}>Inicio</Link>
            <Link href="/caminatas" className="text-gray-700 font-medium text-lg" onClick={() => setMobileMenuOpen(false)}>Caminatas</Link>
            <Link href="/notion-page/about" className="text-gray-700 font-medium text-lg" onClick={() => setMobileMenuOpen(false)}>Sobre Nosotros</Link>
            <Link
              href="/inscripcion"
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-semibold text-center"
              onClick={() => setMobileMenuOpen(false)}
            >
              ¡Reserva Ahora!
            </Link>
          </div>
          {/* Click en fondo negro cierra menú */}
          <div className="flex-1" onClick={() => setMobileMenuOpen(false)} />
        </div>
      )}
    </header>
  );
}
