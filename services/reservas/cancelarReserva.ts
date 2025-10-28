// services/reservas/cancelarReserva.ts
export async function cancelarReserva(pageId: string) {
  await notion.pages.update({
    page_id: pageId,
    properties: {
      estado: {
        select: { name: "Cancelada" }
      }
    }
  });
}
