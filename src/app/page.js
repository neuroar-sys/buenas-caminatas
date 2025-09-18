import { getTestimonios } from '@/lib/notion';
import TestimonioCard from '@/components/TestimonioCard';
import Image from 'next/image';
import Link from 'next/link';
import FAQAccordion from '@/components/FAQAccordion';

// Metadatos específicos para la página de inicio
export const metadata = {
  title: 'Caminatas Saludables | Tu Medicina Camina',
  description: 'Descubre cómo nuestras caminatas terapéuticas pueden transformar tu salud. Testimonios reales de personas que han mejorado su calidad de vida.',
  openGraph: {
    title: 'Caminatas Saludables | Tu Medicina Camina',
    description: 'Descubre cómo nuestras caminatas terapéuticas pueden transformar tu salud. Testimonios reales de personas que han mejorado su calidad de vida.',
    url: 'https://buenas-caminatas.vercel.app/',
    images: [
      {
        url: 'https://buenas-caminatas.vercel.app/images/hero-og.jpg',
        width: 1200,
        height: 630,
        alt: 'Caminatas Saludables - Tu medicina camina',
      },
    ],
  },
  alternates: {
    canonical: 'https://buenas-caminatas.vercel.app/',
  },
};

export default async function Home() {
  const testimonios = await getTestimonios();

  return (
    <div>
    
{/* Sección 1: Hero (Portada) */}
<section className="relative py-20 md:py-32 overflow-hidden">
  {/* Capa de la imagen de fondo */}
  <div 
    className="absolute inset-0 bg-cover bg-center"
    style={{ backgroundImage: "url('/images/hero-caminata-local.jpg')" }}
  ></div>
  
  {/* Capa de superposición (overlay) más oscura */}
  <div className="absolute inset-0 bg-black opacity-40"></div>
  
  <div className="container mx-auto px-4 relative z-10">
    <div className="text-center max-w-3xl mx-auto">
      <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6 text-white">
        Caminatas Saludables
      </h1>
      <p className="text-2xl md:text-3xl mb-8 font-bold text-white">
        Tu medicina camina
      </p>
      <div className="flex flex-col sm:flex-row justify-center gap-4">
        <Link 
          href="/inscripcion" 
          className="bg-white text-green-700 hover:bg-green-100 px-8 py-4 rounded-lg font-bold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg"
        >
          🧭 Probar gratis
          <p className="text-sm font-normal mt-1">1 caminata gratis de bienvenida</p>
        </Link>
        <Link 
          href="#circuitos" 
          className="border-2 border-white bg-green-900 text-white px-8 py-4 rounded-lg font-bold text-lg transition-all duration-300 hover:bg-white hover:text-green-700 transform hover:scale-105"
        >
          🕒 Ver horarios
          <p className="text-sm font-normal mt-1">Sin compromiso</p>
        </Link>
      </div>
    </div>
  </div>
</section>

      {/* Sección 2: ¿Qué es? */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 text-gray-800">Más que una caminata</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Una experiencia terapéutica que integra movimiento, estiramiento, respiración y meditación para mejorar tu salud física, emocional y social.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Artrosis y artritis</h3>
            </div>
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Enfermedades cardíacas</h3>
            </div>
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-yellow-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zM7 21h10M7 21a4 4 0 004-4M7 21a4 4 0 014-4m0-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4m0-4V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v12a4 4 0 004 4" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Ansiedad y depresión</h3>
            </div>
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Sobrepeso y sedentarismo</h3>
            </div>
          </div>
        </div>
      </section>

      {/* Sección 3: Beneficios */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 text-gray-800">Beneficios Comprobados</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Resultados que puedes medir y sentir.
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-gray-200">
                <div className="p-8">
                  <h3 className="text-2xl font-bold mb-4 text-green-600">Reducción del dolor articular</h3>
                  <p className="text-lg text-gray-700">60% en 3 meses</p>
                </div>
                <div className="p-8">
                  <h3 className="text-2xl font-bold mb-4 text-blue-600">Mejora en la circulación</h3>
                  <p className="text-lg text-gray-700">Estabiliza tu presión</p>
                </div>
                <div className="p-8">
                  <h3 className="text-2xl font-bold mb-4 text-yellow-600">Menos ansiedad</h3>
                  <p className="text-lg text-gray-700">Respiración + meditación</p>
                </div>
                <div className="p-8">
                  <h3 className="text-2xl font-bold mb-4 text-purple-600">Mejor calidad de vida</h3>
                  <p className="text-lg text-gray-700">Comunidad y apoyo</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Sección 4: El Método (5 pasos) */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 text-gray-800">Nuestro Método en 5 Pasos</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Una experiencia estructurada para tu bienestar integral.
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
              {[
                { step: 1, title: "Inicio", desc: "Estiramientos + respiración", icon: "🧘‍♂️" },
                { step: 2, title: "Camino de ida", desc: "Caminata moderada", icon: "🚶‍♀️" },
                { step: 3, title: "Punto central", desc: "Hidratación + observación", icon: "💧" },
                { step: 4, title: "Regreso", desc: "Meditación en movimiento", icon: "💭" },
                { step: 5, title: "Cierre", desc: "Ronda social", icon: "💬" },
              ].map((item, index) => (
                <div key={index} className="text-center p-6 bg-gradient-to-b from-blue-50 to-white rounded-xl shadow-md">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl">
                    {item.icon}
                  </div>
                  <div className="text-2xl font-bold text-blue-600 mb-2">{item.step}</div>
                  <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
                  <p className="text-sm text-gray-600">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Sección 5: Circuitos y Horarios (con ID para anclaje) */}
      <section id="circuitos" className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 text-gray-800">Circuitos y Horarios</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Encuentra el grupo y horario que mejor se adapte a ti.
            </p>
          </div>

          <div className="max-w-4xl mx-auto space-y-8">
            <div className="bg-white p-6 rounded-xl shadow-lg">
              <h3 className="text-2xl font-bold mb-4 text-green-600">San Justo</h3>
              <p className="text-lg mb-2"><strong>📍 Polideportivo</strong></p>
              <p className="text-gray-700">Lunes a Viernes: 8:00, 9:30, 11:00</p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-lg">
              <h3 className="text-2xl font-bold mb-4 text-blue-600">Castelar</h3>
              <p className="text-lg mb-2"><strong>📍 Parque de la Amistad</strong></p>
              <p className="text-gray-700">Lunes a Viernes: 8:00, 9:30</p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-lg border-2 border-dashed border-gray-300">
              <h3 className="text-2xl font-bold mb-4 text-purple-600">Próximamente</h3>
              <p className="text-lg mb-2"><strong>📍 CABA - Parque Tres de Febrero</strong></p>
              <p className="text-gray-700">¡Estamos llegando a tu barrio!</p>
            </div>

            <div className="text-center">
              <button className="bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-lg font-bold text-lg transition-all duration-300 transform hover:scale-105">
                ¿Querés que lleguemos a tu barrio? Proponé un circuito
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Sección 6: Testimonios */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 text-gray-800">Lo que dicen nuestros caminantes</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Historias reales de transformación y bienestar.
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

      {/* Sección 7: Precios */}
<section className="py-20 bg-gradient-to-r from-yellow-400 to-orange-500 text-white">
  <div className="container mx-auto px-4">
    <div className="text-center mb-16">
      <h2 className="text-4xl font-bold mb-4">Planes y Precios</h2>
      <p className="text-xl max-w-2xl mx-auto">
        Invierte en tu salud con opciones flexibles.
      </p>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
      {/* Plan Básico */}
      <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-8 text-center border border-white/30 hover:bg-white/30 transition-all duration-300">
        <h3 className="text-2xl font-bold mb-4">Básico</h3>
        <div className="text-4xl font-extrabold mb-4">$5.000</div>
        <p className="mb-6 text-sm">por sesión</p>
        <ul className="space-y-3 mb-8">
          <li className="flex items-center justify-center text-left">
            <svg className="w-5 h-5 text-green-400 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
            <span className="text-sm">Ideal para probar</span>
          </li>
          <li className="flex items-center justify-center text-left">
            <svg className="w-5 h-5 text-green-400 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
            <span className="text-sm">Sin compromiso</span>
          </li>
        </ul>
        <Link href="/inscripcion" className="w-full bg-white text-orange-600 hover:bg-gray-100 py-3 rounded-lg font-bold transition-colors block text-center">
          Elegir Plan
        </Link>
      </div>

      {/* Plan Premium (Destacado) */}
      <div className="bg-white text-gray-800 rounded-2xl p-8 text-center shadow-2xl transform scale-105 relative border-4 border-yellow-400 hover:scale-107 transition-all duration-300">
        {/* Etiqueta "¡Más Popular!" */}
        <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-yellow-500 text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg">
          ¡Más Popular!
        </div>
        <h3 className="text-2xl font-bold mb-4">Premium</h3>
        <div className="text-4xl font-extrabold mb-2">$70.000</div>
        <p className="text-gray-600 mb-6 text-sm">por mes (16 sesiones)</p>
        <div className="bg-green-100 text-green-800 py-1 px-3 rounded-full inline-block mb-6 text-xs font-semibold">
          Ahorrás $10.000 + evaluación
        </div>
        <ul className="space-y-3 mb-8">
          <li className="flex items-center justify-center text-left">
            <svg className="w-5 h-5 text-green-600 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
            <span className="text-sm">Ahorro significativo</span>
          </li>
          <li className="flex items-center justify-center text-left">
            <svg className="w-5 h-5 text-green-600 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
            <span className="text-sm">Evaluación personalizada</span>
          </li>
          <li className="flex items-center justify-center text-left">
            <svg className="w-5 h-5 text-green-600 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
            <span className="text-sm">Prioridad en horarios</span>
          </li>
          <li className="flex items-center justify-center text-left">
            <svg className="w-5 h-5 text-green-600 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
            <span className="text-sm">Soporte personalizado</span>
          </li>
        </ul>
        <Link href="/inscripcion" className="w-full bg-yellow-500 hover:bg-yellow-600 text-white py-3 rounded-lg font-bold transition-colors block text-center">
          Elegir Plan
        </Link>
      </div>

      {/* Plan Corporativo */}
      <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-8 text-center border border-white/30 hover:bg-white/30 transition-all duration-300">
        <h3 className="text-2xl font-bold mb-4">Corporativo</h3>
        <div className="text-4xl font-extrabold mb-4">Consultar</div>
        <p className="mb-6 text-sm">para empresas y clubes</p>
        <ul className="space-y-3 mb-8">
          <li className="flex items-center justify-center text-left">
            <svg className="w-5 h-5 text-purple-400 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
            <span className="text-sm">Programas a medida</span>
          </li>
          <li className="flex items-center justify-center text-left">
            <svg className="w-5 h-5 text-purple-400 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
            <span className="text-sm">Descuentos por volumen</span>
          </li>
          <li className="flex items-center justify-center text-left">
            <svg className="w-5 h-5 text-purple-400 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
            <span className="text-sm">Informes de progreso</span>
          </li>
        </ul>
        <a href="https://wa.me/5491112345678" className="w-full bg-transparent border-2 border-white hover:bg-white/20 py-3 rounded-lg font-bold transition-colors block text-center">
          Contactar
        </a>
      </div>
    </div>
  </div>
</section>

{/* Sección 8: Preguntas Frecuentes (FAQ) */}
<section className="py-20 bg-white">
  <div className="container mx-auto px-4">
    <div className="text-center mb-16">
      <h2 className="text-4xl font-bold mb-4 text-gray-800">Preguntas Frecuentes</h2>
      <p className="text-xl text-gray-600 max-w-2xl mx-auto">
        Encuentra respuestas a las dudas más comunes sobre nuestras caminatas.
      </p>
    </div>
    <FAQAccordion faqs={[
      {
        question: "¿Necesito experiencia previa para participar?",
        answer: "¡No! Nuestras caminatas están diseñadas para todos los niveles de condición física. Nuestros guías te acompañarán y adaptarán el ritmo a tus necesidades."
      },
      {
        question: "¿Qué debo llevar a la caminata?",
        answer: "Ropa cómoda, calzado deportivo, protector solar, una botella de agua y, sobre todo, ¡ganas de disfrutar y moverte!"
      },
      {
        question: "¿Qué pasa si llueve?",
        answer: "En caso de mal tiempo, la caminata se reprogramará. Te notificaremos con la mayor antelación posible a través del WhatsApp o email que nos hayas proporcionado."
      },
      {
        question: "¿Puedo cancelar mi inscripción?",
        answer: "Sí, puedes cancelar tu inscripción hasta 24 horas antes de la caminata sin penalización. Después de ese plazo, no se realizarán devoluciones."
      },
      {
        question: "¿Hay descuentos para grupos o familias?",
        answer: "¡Sí! Consulta nuestro plan Corporativo o contáctanos por WhatsApp para conocer nuestras promociones especiales para grupos y familias."
      }
    ]} />
  </div>
</section>

      {/* Sección 8: Contacto */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-8 text-gray-800">¿Tenés dudas?</h2>
          <p className="text-xl mb-8 text-gray-600">Estamos aquí para ayudarte.</p>
          
          <div className="flex flex-col sm:flex-row justify-center gap-8">
            <a href="https://wa.me/5491112345678" className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg font-bold flex items-center justify-center transition-colors">
              <svg className="w-6 h-6 mr-2" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.15-.174.2-.298.3-.497.099-.198.05-.371-.025-.52-.075-.15-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 7.002 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.047 24l6.305-1.654a11.882 11.882 0 005.693 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
              </svg>
              WhatsApp
            </a>
            <a href="mailto:hola@caminatassaludables.com" className="bg-gray-800 hover:bg-gray-900 text-white px-6 py-3 rounded-lg font-bold flex items-center justify-center transition-colors">
              <svg className="w-6 h-6 mr-2" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
              </svg>
              Email
            </a>
            <a href="https://instagram.com/tuperfil" className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 to-pink-600 text-white px-6 py-3 rounded-lg font-bold flex items-center justify-center transition-colors">
              <svg className="w-6 h-6 mr-2" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
              </svg>
              Instagram
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}