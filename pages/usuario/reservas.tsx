import { protegerRuta } from '@/lib/protegerRuta';

export default function ReservasUsuario() {
  protegerRuta();

  return (
    <main className="min-h-screen p-6 bg-white">
      <h1 className="text-2xl font-bold text-center mb-4">Mis Reservas</h1>
      <p className="text-center text-gray-600">Aquí podrás ver tus reservas activas y pasadas.</p>
    </main>
  );
}
