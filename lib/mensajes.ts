export function generarMensajeCoordinador({
  nombre,
  circuito,
  fecha,
  hora,
}: {
  nombre: string;
  circuito: string;
  fecha: string;
  hora: string;
}) {
  return `Hola, ${nombre} ha reservado para el circuito "${circuito}" el día ${fecha} a las ${hora}.`;
}
