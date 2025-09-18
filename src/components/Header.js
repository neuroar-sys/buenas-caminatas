'use client';

import Link from 'next/link';

export default function Header() {
  return (
    <header className="bg-white shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between py-4">
          {/* Logo Personalizado - Solo Imagen */}
          <div>
            <img 
              src="/images/buenos-pasos-logo.png" 
              alt="Logo Buenos Pasos"
              className="h-12 w-auto"
            />
          </div>

          {/* Navegación */}
          <nav className="hidden md:flex space-x-8">
            <Link href="/" className="text-gray-700 hover:text-blue-600 font-medium transition-colors duration-300">Inicio</Link>
            <Link href="/caminatas" className="text-gray-700 hover:text-blue-600 font-medium transition-colors duration-300">Caminatas</Link>
            <Link href="/notion-page/about" className="text-gray-700 hover:text-blue-600 font-medium transition-colors duration-300">Sobre Nosotros</Link>
          </nav>

          {/* Botón de Acción - ¡Redirige a la página de inscripción! */}
          <Link 
            href="/inscripcion" 
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-semibold transition-colors duration-300 transform hover:scale-105"
          >
            ¡Reserva Ahora!
          </Link>
        </div>
      </div>
    </header>
  );
}