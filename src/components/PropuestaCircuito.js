'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function PropuestaCircuito() {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [barrio, setBarrio] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Envía la propuesta por WhatsApp
    const mensaje = encodeURIComponent(`Me gustaría que Caminatas Saludables llegara a mi barrio: ${barrio}`);
    window.open(`https://wa.me/5491112345678?text=${mensaje}`, '_blank');
    setIsFormOpen(false);
    setBarrio('');
  };

  return (
    <div className="text-center">
      {!isFormOpen ? (
        <button
          onClick={() => setIsFormOpen(true)}
          className="bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-lg font-bold text-lg transition-all duration-300 transform hover:scale-105"
        >
          ¿Querés que lleguemos a tu barrio? Proponé un circuito
        </button>
      ) : (
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded-xl shadow-lg max-w-md mx-auto mt-6 space-y-4">
          <h3 className="text-xl font-bold text-gray-800">¡Genial! Cuéntanos tu barrio</h3>
          <input
            type="text"
            value={barrio}
            onChange={(e) => setBarrio(e.target.value)}
            placeholder="Ej: Villa Urquiza, San Martín..."
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
          />
          <div className="flex gap-3">
            <button
              type="submit"
              className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-semibold transition-colors"
            >
              Enviar Propuesta
            </button>
            <button
              type="button"
              onClick={() => setIsFormOpen(false)}
              className="px-4 py-2 text-gray-600 hover:text-gray-800 font-medium transition-colors"
            >
              Cancelar
            </button>
          </div>
        </form>
      )}
    </div>
  );
}