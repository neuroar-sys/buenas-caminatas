import './globals.css';
import { Inter } from 'next/font/google';
import Header from '@/components/Header';

const inter = Inter({ subsets: ['latin'] });

// ✅ METADATOS SEO COMPLETOS PARA TODO EL SITIO
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
  // verification: {
  //   google: 'tu_codigo_de_verificacion_de_google_aqui', // ¡Descomenta y reemplaza con tu código real!
  // },
};

export default function RootLayout({ children }) {
  return (
    <html lang="es" className={inter.className}>
      <body>
        <Header />
        <main className="min-h-screen">
          {children}
        </main>
        <footer className="bg-gray-800 text-white py-8">
          <div className="container mx-auto px-4 text-center">
            <p>© 2024 Buenos Pasos. Todos los derechos reservados.</p>
          </div>
        </footer>
      </body>
    </html>
  );
}