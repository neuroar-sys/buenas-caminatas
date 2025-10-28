// scripts/listarHorariosSinCircuito.ts
require("dotenv").config({ path: ".env.local" });
const { Client } = require("@notionhq/client");

const notion = new Client({ auth: process.env.NOTION_API_KEY });

async function listarHorariosSinCircuito() {
  const response = await notion.databases.query({
    database_id: process.env.DATABASE_HORARIOS_ID!,
    page_size: 100
  });

  const sinCircuito = response.results.filter((page: any) => {
    const relacion = page.properties.circuito?.relation;
    return !relacion || relacion.length === 0;
  });

  console.log(`⚠️ ${sinCircuito.length} horarios sin circuito asignado:\n`);
  sinCircuito.forEach((page: any, i: number) => {
    const nombre = page.properties.title?.title?.[0]?.plain_text || "sin-nombre";
    console.log(`${i + 1}. ${nombre} (${page.id})`);
  });
}

listarHorariosSinCircuito();
