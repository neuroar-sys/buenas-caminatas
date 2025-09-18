import { Client } from '@notionhq/client';

// ✅ Inicialización GLOBAL del cliente de Notion
const notion = new Client({ auth: process.env.NOTION_API_KEY });

// Función para fetch contenido de una página de Notion
export async function getPageContent(pageId) {
  try {
    const { results: blocks } = await notion.blocks.children.list({ block_id: pageId });
    return blocks.map(block => JSON.stringify(block, null, 2)).join('\n\n');
  } catch (error) {
    console.error('Error fetching Notion page:', error);
    return '# Error al cargar el contenido desde Notion.';
  }
}

// Función para caminatas futuras
export async function getUpcomingHikes() {
  try {
    const today = new Date().toISOString().split('T')[0]; // YYYY-MM-DD
    const response = await notion.databases.query({
      database_id: process.env.DATABASE_HIKES_ID,
      filter: {
        and: [
          {
            property: 'Fecha',
            date: { on_or_after: today },
          },
        ],
      },
      sorts: [
        {
          property: 'Fecha',
          direction: 'ascending',
        },
      ],
    });

    return response.results.map((page) => ({
      id: page.id,
      title: page.properties.Titulo?.title[0]?.plain_text || 'Sin título',
      fecha: page.properties.Fecha?.date?.start || '',
      ubicacion: page.properties.Ubicacion?.rich_text[0]?.plain_text || '',
      descripcion: page.properties.Descripcion?.rich_text.map((rt) => rt.plain_text).join('') || '',
      imagen: page.properties.Imagen?.files[0]?.external?.url ||
        page.properties.Imagen?.files[0]?.file?.url || '',
      linkInscripcion: page.properties.LinkInscripcion?.url || '',
    }));
  } catch (error) {
    console.error('Error fetching hikes:', error);
    return [];
  }
}

// Función para testimonios
export async function getTestimonios() {
  try {
    const response = await notion.databases.query({
      database_id: process.env.DATABASE_TESTIMONIOS_ID,
      sorts: [
        {
          property: 'Calificacion',
          direction: 'descending',
        },
      ],
    });

    return response.results.map((page) => ({
      id: page.id,
      nombre: page.properties.Nombre?.title[0]?.plain_text || 'Anónimo',
      testimonio: page.properties.Testimonio?.rich_text.map((rt) => rt.plain_text).join('') || '',
      calificacion: page.properties.Calificacion?.number || 0,
      foto: page.properties.Foto?.files[0]?.external?.url ||
        page.properties.Foto?.files[0]?.file?.url || '',
    }));
  } catch (error) {
    console.error('🚨 ERROR al obtener testimonios:', error.message);
    return [];
  }
}
// Función para fetch contenido de una página de Notion y convertirlo a Markdown
export async function getPageContent(pageId) {
  try {
    const { results: blocks } = await notion.blocks.children.list({ block_id: pageId });
    const mdBlocks = await Promise.all(
      blocks.map(async (block) => {
        const mdString = await n2m.blockToMarkdown(block);
        return mdString.parent;
      })
    );
    return mdBlocks.join('\n\n');
  } catch (error) {
    console.error('Error fetching Notion page:', error);
    return '# Error al cargar el contenido desde Notion.';
  }
}