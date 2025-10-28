import { useState } from 'react';

export default function BookingModal({ slotId }) {
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [estado, setEstado] = useState('idle');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setEstado('loading');

    const res = await fetch('/api/reservar', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ nombre, email, whatsapp, slotId }),
    });

    if (res.ok) {
      setEstado('success');
    } else {
      setEstado('error');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input value={nombre} onChange={e => setNombre(e.target.value)} placeholder="Nombre" required className="input" />
      <input value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" type="email" required className="input" />
      <input value={whatsapp} onChange={e => setWhatsapp(e.target.value)} placeholder="WhatsApp" required className="input" />
      <button type="submit" className="btn">Reservar</button>
      {estado === 'success' && <p className="text-green-600">¡Reserva confirmada!</p>}
      {estado === 'error' && <p className="text-red-600">Error al reservar. Intenta de nuevo.</p>}
    </form>
  );
}
