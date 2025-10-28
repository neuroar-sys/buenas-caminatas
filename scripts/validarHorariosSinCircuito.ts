require("dotenv").config({ path: ".env.local" });
const { Client } = require("@notionhq/client");

const notion = new Client({
  auth: process.env.NOTION_API_KEY,
  notionVersion: "2022-06-28"
});

const HORARIOS_DB_ID = process.env.DATABASE_HORARIOS_ID;

async function validarHorarios() {
  if (!HORARIOS_DB_ID) {
    console.error("❌ DATABASE_HORARIOS_ID no está definida en .env.local");
    return;
  }

  try {
    const response = await notion.databases.query({
      database_id: HORARIOS_DB_ID,
      page_size: 100
    });

    const sinCircuito = response.results.filter((page: any) => {
      const relacion = page.properties.circuito?.relation;
      return !relacion || relacion.length === 0;
    });

    if (sinCircuito.length === 0) {
      console.log("✅ Todos los horarios tienen circuito asignado.");
    } else {
      console.warn(`⚠️ ${sinCircuito.length} horarios sin circuito asignado:`);
      sinCircuito.forEach((page: any, index: number) => {
        const nombre = page.properties.title?.title?.[0]?.plain_text || "sin-nombre";
        console.log(`  ${index + 1}. ${nombre} (${page.id})`);
      });
    }
  } catch (error: any) {
    console.error("❌ Error al consultar la base de horarios:", error.message || error);
  }
}

validarHorarios();
