import { getTestimonios } from '@/lib/notion';
import TestimonioCard from '@/components/TestimonioCard';

export default async function Home() {
  const testimonios = await getTestimonios();

  return (
    <div>
      {/* Hero Section Moderno */}
      <section className="bg-gradient-to-br from-blue-600 via-indigo-700 to-purple-800 text-white py-20 md:py-32">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center">
            {/* Contenido del Hero */}
            <div className="md:w-1/2 mb-10 md:mb-0 md:pr-10">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
                Descubre la <span className="text-yellow-300">Magia</span> de la Naturaleza
              </h1>
              <p className="text-xl md:text-2xl mb-8 opacity-90 leading-relaxed">
                Únete a nuestras caminatas guiadas y vive aventuras inolvidables en los paisajes más impresionantes de la región.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <a href="/caminatas" className="bg-yellow-400 hover:bg-yellow-500 text-gray-900 px-8 py-4 rounded-lg font-bold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg">
                  Explorar Caminatas
                </a>
                <a href="/notion-page/about" className="border-2 border-white text-white px-8 py-4 rounded-lg font-bold text-lg transition-all duration-300 hover:bg-white hover:text-gray-900 transform hover:scale-105">
                  Sobre Nosotros
                </a>
              </div>
            </div>

            {/* Imagen Decorativa */}
            <div className="md:w-1/2">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 shadow-2xl">
                <img 
                  src="https://placehold.co/600x400/white/3b82f6?text=Montañas+Increíbles" 
                  alt="Paisaje de montañas" 
                  className="w-full h-auto rounded-xl shadow-xl"
                />
                <div className="mt-6 text-center">
                  <p className="text-lg font-semibold">+500 Aventureros Satisfechos</p>
                  <p className="text-sm opacity-80">Únete a nuestra comunidad</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Sección de Testimonios */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 text-gray-800">Lo que dicen nuestros aventureros</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              No nos creas solo a nosotros. Escucha a quienes han vivido la experiencia.
            </p>
          </div>

          {testimonios.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {testimonios.map((t) => (
                <TestimonioCard key={t.id} testimonio={t} />
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-500 mt-8">No hay testimonios disponibles aún.</p>
          )}
        </div>
      </section>
    </div>
  );
}