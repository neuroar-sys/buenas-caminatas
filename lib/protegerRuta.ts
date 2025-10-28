import { useEffect } from 'react';
import { useRouter } from 'next/router';

export function protegerRuta() {
  const router = useRouter();

  useEffect(() => {
    const rol = localStorage.getItem('rol');
    const email = localStorage.getItem('email');

    if (!rol || !email) {
      router.push('/login');
    }
  }, []);
}
