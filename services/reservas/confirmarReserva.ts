// services/reservas/confirmarReserva.ts
export async function confirmarReserva(pageId: string) {
  await notion.pages.update({
    page_id: pageId,
    properties: {
      estado: {
        select: { name: "Confirmada" }
      }
    }
  });
}
