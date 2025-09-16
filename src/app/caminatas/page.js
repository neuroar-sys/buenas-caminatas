import { getUpcomingHikes } from '@/lib/notion'; // 👈 ¡USAMOS @/ en lugar de ../../lib/notion!
import CaminataCard from '@/components/CaminataCard';

export default async function CaminatasPage() {
  const hikes = await getUpcomingHikes();

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-4xl font-bold text-center mb-12 text-gray-800">Próximas Caminatas</h1>
      <p className="text-xl text-center mb-8 text-gray-600">Únete a aventuras inolvidables en la naturaleza</p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {hikes.map((h) => (
          <CaminataCard key={h.id} caminata={h} />
        ))}
      </div>
      {hikes.length === 0 && (
        <p className="text-center text-gray-500 mt-8">No hay caminatas programadas en este momento.</p>
      )}
    </div>
  );
}