import './globals.css';
import { Inter } from 'next/font/google';
import Header from '@/components/Header';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Buenos Pasos | Tu salud, paso a paso',
  description: 'Únete a nuestras caminatas guiadas y vive experiencias inolvidables en los paisajes más hermosos.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body className={inter.className}>
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