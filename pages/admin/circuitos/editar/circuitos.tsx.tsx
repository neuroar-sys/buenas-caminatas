import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { protegerRutaAdmin } from '@/lib/protegerRutaAdmin';

export default function EditarCircuito() {
  protegerRutaAdmin();
  const router = useRouter();
  const { id } = router.query;
  const [form, setForm] = useState({
    nombre: '',
    zona: '',
    distancia: '',
    descripcion: '',
    activo: false,
  });

  useEffect(() => {
    async function fetchCircuito() {
      const res = await fetch(`/api/circuito?id=${id}`);
      const data = await res.json();
      setForm(data || {});
    }
    if (id) fetchCircuito();
  }, [id]);

  async function guardarCambios() {
    try {
      const res = await fetch('/api/circuito-editar', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, ...form }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      alert('✅ Cambios guardados');
      router.push('/admin/circuitos');
    } catch (err) {
      alert('❌ Error al guardar: ' + err.message);
    }
  }

  return (
    <main className="p-6 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">✏️ Editar circuito</h1>
      <label className="block mb-2">Nombre</label>
      <input value={form.nombre} onChange={(e) => setForm({ ...form, nombre: e.target.value })} className="w-full border px-3 py-2 mb-4" />

      <label className="block mb-2">Zona</label>
      <input value={form.zona} onChange={(e) => setForm({ ...form, zona: e.target.value })} className="w-full border px-3 py-2 mb-4" />

      <label className="block mb-2">Distancia</label>
      <input value={form.distancia} onChange={(e) => setForm({ ...form, distancia: e.target.value })} className="w-full border px-3 py-2 mb-4" />

      <label className="block mb-2">Descripción</label>
      <textarea value={form.descripcion} onChange={(e) => setForm({ ...form, descripcion: e.target.value })} className="w-full border px-3 py-2 mb-4" />

      <label className="flex items-center mb-4">
        <input type="checkbox" checked={form.activo} onChange={(e) => setForm({ ...form, activo: e.target.checked })} className="mr-2" />
        Circuito activo
      </label>

      <button onClick={guardarCambios} className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
        Guardar cambios
      </button>
    </main>
  );
}
