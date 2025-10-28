interface CircuitCardProps {
  id: string;
  nombreCircuito: string;
  localidad: string;
  descripcion: string;
  distancia?: number | null;
  foto?: string | null;
}

export default function CircuitCard({
  id,
  nombreCircuito,
  localidad,
  descripcion,
  distancia,
  foto,
}: CircuitCardProps) {
  return (
    <div className="rounded-lg overflow-hidden shadow-md border border-gray-200 bg-white hover:shadow-lg transition flex flex-col">
      {foto ? (
        <img
          src={foto}
          alt={nombreCircuito}
          className="w-full h-48 object-cover"
        />
      ) : (
        <div className="w-full h-48 bg-gray-100 flex items-center justify-center text-gray-500 text-sm">
          Sin imagen
        </div>
      )}
      <div className="p-4 flex-1 flex flex-col justify-between">
        <div className="space-y-2">
          <h2 className="text-xl font-semibold text-blue-700">{nombreCircuito}</h2>
          <p className="text-sm text-gray-600">📍 {localidad}</p>
          {distancia && (
            <p className="text-sm text-gray-600">🛣️ {distancia} metros</p>
          )}
          <p className="text-sm text-gray-700">{descripcion}</p>
        </div>
        {/* Botones aquí */}
      </div>
    </div>
  );
}
