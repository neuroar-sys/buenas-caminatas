import Link from 'next/link';

export default function PanelCard({ title, href }: { title: string; href: string }) {
  return (
    <Link href={href}>
      <div className="p-6 bg-white rounded-lg shadow hover:shadow-md border border-gray-200 transition cursor-pointer">
        <h2 className="text-xl font-semibold text-blue-700">{title}</h2>
        <p className="text-sm text-gray-500 mt-2">Ir a {title.toLowerCase()}</p>
      </div>
    </Link>
  );
}

