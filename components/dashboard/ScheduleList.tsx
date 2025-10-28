export default function ScheduleList({ slots }) {
  return (
    <div className="mt-4">
      <h3 className="text-lg font-semibold mb-2">Horarios disponibles</h3>
      <ul className="space-y-2">
        {slots.map((slot) => (
          <li key={slot.id} className="border p-3 rounded-md">
            <p>📅 {slot.fecha} · ⏰ {slot.hora}</p>
            <p>Cupos: {slot.cupoRestante} / {slot.cupoMaximo}</p>
            {slot.linkPago && (
              <a href={slot.linkPago} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">
                Reservar con pago
              </a>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
