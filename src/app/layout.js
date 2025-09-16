import './globals.css';
import { Inter } from 'next/font/google';
import Link from 'next/link';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Buenos Pasos | Tu salud, paso a paso',
  description: 'Únete a nuestras caminatas guiadas y vive experiencias inolvidables en los paisajes más hermosos.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body className={inter.className}>
        {/* Header Moderno */}
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

              {/* Botón de Acción - ¡Redirige a la sección de inscripción! */}

<Link 
  href="/inscripcion" 
  className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-semibold transition-colors duration-300 transform hover:scale-105"
>
  ¡Reserva Ahora!
</Link>
            </div>
          </div>
        </header>

        {/* Contenido Principal */}
        <main className="min-h-screen">
          {children}
        </main>

        {/* Footer Simple */}
        <footer className="bg-gray-800 text-white py-8">
          <div className="container mx-auto px-4 text-center">
            <p>© 2024 Buenos Pasos. Todos los derechos reservados.</p>
          </div>
        </footer>
      </body>
    </html>
  );
}