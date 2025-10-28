require("dotenv").config({ path: ".env.local" });
const { Client } = require("@notionhq/client");

const notion = new Client({ auth: process.env.NOTION_API_KEY });

async function validarHorarios() {
  const response = await notion.databases.query({
    database_id: process.env.DATABASE_HORARIOS_ID!,
    page_size: 100
  });

  const errores: any[] = [];

  response.results.forEach((page: any) => {
    const id = page.id;
    const nombre = page.properties.title?.title?.[0]?.plain_text || "sin-nombre";
    const circuito = page.properties.circuito?.relation?.[0]?.id;
    const coordinador = page.properties.coordinador?.relation?.[0]?.id;
    const hora = page.properties.hora?.rich_text?.[0]?.plain_text;
    const fecha = page.properties.fecha?.date?.start;

    const erroresHorario = [];

    if (!nombre || nombre.trim() === "") erroresHorario.push("❌ título faltante");
    if (!circuito) erroresHorario.push("❌ circuito no asignado");
    if (!coordinador) erroresHorario.push("❌ coordinador no asignado");
    if (!hora || !/^\d{2}:\d{2}$/.test(hora)) erroresHorario.push("❌ hora inválida");
    if (!fecha) erroresHorario.push("❌ fecha faltante");

    if (erroresHorario.length > 0) {
      errores.push({ id, nombre, errores: erroresHorario });
    }
  });

  if (errores.length === 0) {
    console.log("✅ Todos los horarios están completos y válidos.");
  } else {
    console.log(`⚠️ ${errores.length} horarios con errores:\n`);
    errores.forEach((h, i) => {
      console.log(`${i + 1}. ${h.nombre} (${h.id})`);
      h.errores.forEach((e: string) => console.log("   -", e));
    });
  }
}

validarHorarios();
