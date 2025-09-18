'use client';

import Image from 'next/image';
import Link from 'next/link';

export default function MiembroEquipoCard({ miembro }) {
  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
      {miembro.foto && (
        <div className="h-64 bg-gradient-to-b from-blue-50 to-green-50 flex items-center justify-center">
          <Image
            src={miembro.foto}
            alt={miembro.nombre}
            width={200}
            height={200}
            className="w-48 h-48 object-cover rounded-full border-4 border-white shadow-md"
          />
        </div>
      )}
      <div className="p-6">
        <h3 className="text-xl font-bold mb-2 text-gray-800">{miembro.nombre}</h3>
        <p className="text-blue-600 font-semibold mb-3">{miembro.rol}</p>
        <p className="text-gray-700 leading-relaxed mb-4">{miembro.bio}</p>
        {miembro.linkedin && (
          <Link 
            href={miembro.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium transition-colors"
          >
            <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
            </svg>
            LinkedIn
          </Link>
        )}
      </div>
    </div>
  );
}