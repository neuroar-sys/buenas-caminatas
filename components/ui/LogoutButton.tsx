import { useRouter } from 'next/router';

export default function LogoutButton() {
  const router = useRouter();

  const handleLogout = () => {
    localStorage.clear();
    router.push('/login');
  };

  return (
    <button
      onClick={handleLogout}
      className="mt-6 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
    >
      Cerrar sesión
    </button>
  );
}
