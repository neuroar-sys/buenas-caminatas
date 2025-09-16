import './globals.css';
import { Inter } from 'next/font/google';

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
              {/* Logo Personalizado */}
              <div className="flex items-center">
                <img 
                  src="https://i.ibb.co/t16ZYWs/BUENOS-PASOS.png" // 👈 Reemplaza esta URL con la de tu imagen
                  alt="Logo Buenos Pasos"
                  className="h-10 w-auto mr-3"
                />
                <h1 className="text-2xl font-bold text-gray-800">Buenos Pasos</h1>
              </div>

              {/* Navegación */}
              <nav className="hidden md:flex space-x-8">
                <a href="/" className="text-gray-700 hover:text-blue-600 font-medium transition-colors duration-300">Inicio</a>
                <a href="/caminatas" className="text-gray-700 hover:text-blue-600 font-medium transition-colors duration-300">Caminatas</a>
                <a href="/notion-page/about" className="text-gray-700 hover:text-blue-600 font-medium transition-colors duration-300">Sobre Nosotros</a>
              </nav>

              {/* Botón de Acción */}
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-semibold transition-colors duration-300 transform hover:scale-105">
                ¡Reserva Ahora!
              </button>
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