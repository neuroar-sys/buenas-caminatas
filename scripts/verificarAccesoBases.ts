require("dotenv").config({ path: ".env.local" });
const { Client } = require("@notionhq/client");

const notion = new Client({
  auth: process.env.NOTION_API_KEY,
  notionVersion: "2022-06-28"
});

const bases = [
  { nombre: "Circuitos", id: process.env.DATABASE_CIRCUITOS_ID },
  { nombre: "Horarios", id: process.env.DATABASE_HORARIOS_ID },
  { nombre: "Reservas", id: process.env.DATABASE_RESERVAS_ID },
  { nombre: "Participantes", id: process.env.DATABASE_PARTICIPANTES_ID },
  { nombre: "Equipo", id: process.env.DATABASE_EQUIPO_ID },
  { nombre: "Testimonios", id: process.env.DATABASE_TESTIMONIOS_ID },
  { nombre: "Coordinadores", id: process.env.DATABASE_COORDINADORES_ID },
  { nombre: "Caminatas Finalizadas", id: process.env.DATABASE_CAMINATAS_FINALIZADAS_ID }
];

async function verificarAcceso() {
  for (const base of bases) {
    try {
      if (!base.id) {
        console.warn(`⚠️ Variable no definida: DATABASE_${base.nombre.toUpperCase().replace(/ /g, "_")}_ID`);
        continue;
      }

      const response = await notion.databases.query({
        database_id: base.id,
        page_size: 1
      });

      console.log(`✅ Acceso confirmado a "${base.nombre}" (${base.id}) — ${response.results.length} resultados`);
    } catch (error) {
      const err = error as { code?: string; message?: string };
      console.error(`❌ Error al acceder a "${base.nombre}" (${base.id})`);
      console.error("   →", err.code || err.message || "Error desconocido");
    }
  }
}

verificarAcceso();
