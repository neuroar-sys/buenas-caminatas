export default function CaminataCard({ caminata }) {
  const formattedDate = caminata.fecha ? new Date(caminata.fecha).toLocaleDateString('es-ES', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }) : 'Fecha por confirmar';

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300">
      {caminata.imagen && (
  <Image
    src={caminata.imagen}
    alt={caminata.title}
    width={400} // 👈 Añadimos un width estimado
    height={200} // 👈 Añadimos un height estimado
    className="w-full h-48 object-cover"
  />
)}
      <div className="p-6">
        <h3 className="text-xl font-bold mb-2 text-gray-800">{caminata.title}</h3>
        <p className="text-sm text-gray-600 mb-2">📍 {caminata.ubicacion}</p>
        <p className="text-sm text-gray-600 mb-4">📅 {formattedDate}</p>
        <p className="text-gray-700 leading-relaxed mb-4">{caminata.descripcion}</p>
        
        {/* Botón de Inscripción */}
        {caminata.linkInscripcion ? (
          <a
            href={caminata.linkInscripcion}
            target="_blank"
            rel="noopener noreferrer"
            className="block w-full text-center bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-lg transition-colors duration-300 transform hover:scale-105"
          >
            📝 ¡Inscríbete Ahora!
          </a>
        ) : (
          <p className="text-sm text-gray-500 italic">Enlace de inscripción no disponible.</p>
        )}
      </div>
    </div>
  );
}