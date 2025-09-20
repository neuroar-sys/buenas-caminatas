'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-white shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/" onClick={() => setIsMenuOpen(false)}>
          <img src="/images/buenos-pasos-logo.png" alt="Logo Buenos Pasos" className="h-12 w-auto" />
        </Link>

        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="md:hidden text-gray-700 focus:outline-none z-10"
          aria-label="Toggle menu"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {isMenuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>

        <nav className="hidden md:flex space-x-8">
          <Link href="/" className="text-gray-700 hover:text-blue-600 font-medium">Inicio</Link>
          <Link href="/caminatas" className="text-gray-700 hover:text-blue-600 font-medium">Caminatas</Link>
          <Link href="/notion-page/about" className="text-gray-700 hover:text-blue-600 font-medium">Sobre Nosotros</Link>
          <Link href="/notion-page/como-es" className="text-gray-700 hover:text-blue-600 font-medium">Cómo es</Link>
        </nav>
      </div>

      {isMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200 absolute top-full left-0 right-0 z-40 shadow-lg">
          <nav className="flex flex-col p-4 space-y-4">
            <Link href="/" className="py-2" onClick={() => setIsMenuOpen(false)}>Inicio</Link>
            <Link href="/caminatas" className="py-2" onClick={() => setIsMenuOpen(false)}>Caminatas</Link>
            <Link href="/notion-page/about" className="py-2" onClick={() => setIsMenuOpen(false)}>Sobre Nosotros</Link>
            <Link href="/notion-page/como-es" className="py-2" onClick={() => setIsMenuOpen(false)}>Cómo es</Link>
          </nav>
        </div>
      )}
    </header>
  );
}