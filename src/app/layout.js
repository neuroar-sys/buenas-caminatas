import './globals.css';
import { Inter } from 'next/font/google';
import Link from 'next/link';

const inter = Inter({ subsets: ['latin'] });

// Metadatos SEO Globales
export const metadata = {
  title: {
    default: 'Caminatas Saludables | Tu Medicina Camina',
    template: '%s | Caminatas Saludables',
  },
  description: 'Únete a nuestras caminatas terapéuticas en San Justo y Castelar. Mejora tu salud física y emocional con nuestro método único que combina movimiento, respiración y meditación.',
  keywords: [
    'caminatas saludables',
    'caminatas terapéuticas',
    'actividad física para adultos mayores',
    'caminatas para artrosis',
    'caminatas para ansiedad',
    'caminatas en San Justo',
    'caminatas en Castelar',
    'ejercicio para salud mental',
    'movimiento terapéutico',
    'caminatas guiadas Morón',
  ],
  authors: [{ name: 'Caminatas Saludables' }],
  creator: 'Caminatas Saludables',
  publisher: 'Caminatas Saludables',
  openGraph: {
    type: 'website',
    locale: 'es_AR',
    url: 'https://buenas-caminatas.vercel.app/',
    title: 'Caminatas Saludables | Tu Medicina Camina',
    description: 'Caminatas terapéuticas para mejorar tu salud física y emocional en entornos urbanos seguros.',
    siteName: 'Caminatas Saludables',
    images: [
      {
        url: 'https://buenas-caminatas.vercel.app/images/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Grupo caminando en parque al amanecer',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Caminatas Saludables | Tu Medicina Camina',
    description: 'Únete a nuestras caminatas terapéuticas. Mejora tu salud con nuestro método único.',
    images: ['https://buenas-caminatas.vercel.app/images/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="es" className={inter.className}>
      <body>
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

        {/* Contenido Principal */}
        <main className="min-h-screen">
          {children}
        </main>

        {/* Footer Moderno con Enlaces Legales */}
        <footer className="bg-gray-900 text-white py-12">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
              <div>
                <h3 className="text-lg font-semibold mb-4">Caminatas Saludables</h3>
                <p className="text-sm opacity-75">
                  Movilidad con Sentido. Un emprendimiento sociosanitario para mejorar la salud de personas con condiciones crónicas.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-4">Contacto</h3>
                <ul className="space-y-2 text-sm">
                  <li>📧 hola@caminatassaludables.com</li>
                  <li>📱 +54 9 11 1234-5678</li>
                  <li>📍 San Justo, Buenos Aires</li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-4">Enlaces Legales</h3>
                <ul className="space-y-2">
                  <li>
                    <Link href="/notion-page/privacy" className="text-blue-400 hover:text-blue-300 hover:underline transition-colors">
                      📄 Política de Privacidad
                    </Link>
                  </li>
                  <li>
                    <Link href="/notion-page/consent" className="text-blue-400 hover:text-blue-300 hover:underline transition-colors">
                      ✍️ Consentimiento Informado
                    </Link>
                  </li>
                  <li>
                    <Link href="/notion-page/terms" className="text-blue-400 hover:text-blue-300 hover:underline transition-colors">
                      📑 Términos y Condiciones
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
            <div className="border-t border-gray-700 pt-8 text-center">
              <p className="text-xs opacity-50">
                © 2024 Caminatas Saludables. Todos los derechos reservados.
              </p>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}