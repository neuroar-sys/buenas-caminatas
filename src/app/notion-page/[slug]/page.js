import { getPageContent } from '@/lib/notion'; // 👈 ¡Cambia esto!
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';

const PAGE_MAP = {
  about: process.env.PAGE_ABOUT_ID || '',
};

export async function generateStaticParams() {
  return Object.keys(PAGE_MAP).map((slug) => ({ slug }));
}

export default async function NotionPage({ params }) {
  const pageId = PAGE_MAP[params.slug];

  if (!pageId) {
    return <div className="text-center text-red-500">Página no encontrada. Verifica la configuración en .env.local.</div>;
  }

  const content = await getPageContent(pageId);

  return (
    <div className="max-w-4xl mx-auto prose prose-lg">
      <h1 className="text-3xl font-bold mb-8 text-gray-800">Contenido Dinámico desde Notion</h1>
      <ReactMarkdown rehypePlugins={[rehypeRaw]}>{content}</ReactMarkdown>
    </div>
  );
}