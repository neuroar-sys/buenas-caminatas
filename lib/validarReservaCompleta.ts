import { Reserva } from "../models/Reserva";

export function fechaLargaAFormatoCorto(fechaLarga: string): string {
  const meses: { [key: string]: string } = {
    enero: "01", febrero: "02", marzo: "03", abril: "04", mayo: "05", junio: "06",
    julio: "07", agosto: "08", septiembre: "09", octubre: "10", noviembre: "11", diciembre: "12"
  };

  const partes = fechaLarga.split(" ");
  const dia = partes[0];
  const mes = meses[partes[2].toLowerCase()];
  return `${dia}/${mes}`;
}

export function validarReservaCompleta(
  reserva: Reserva,
  index: number,
  circuitos: { title: string; horarios: string[] }[],
  coordinadores: { title: string; circuitos_asignados: string[] }[]
): string[] {
  const errores: string[] = [];

  // Validar circuito
  const circuito = circuitos.find(c => c.title === reserva.circuito);
  if (!circuito) {
    errores.push(`Circuito inexistente: ${reserva.circuito}`);
  } else {
    if (!circuito.horarios.includes(reserva.horario)) {
      errores.push(`Horario fuera del circuito: ${reserva.horario}`);
    }
  }

  // Validar coordinador
  const coordinador = coordinadores.find(c => c.title === reserva.coordinador);
  if (!coordinador) {
    errores.push(`Coordinador inexistente: ${reserva.coordinador}`);
  } else {
    if (!coordinador.circuitos_asignados.includes(reserva.circuito)) {
      errores.push(`Coordinador no asignado al circuito: ${reserva.coordinador}`);
    }
  }

  // Validar fecha vs horario
  const fechaEsperada = fechaLargaAFormatoCorto(reserva.fecha);
  if (!reserva.horario.includes(fechaEsperada)) {
    errores.push(`Horario no coincide con la fecha: ${reserva.horario} vs ${reserva.fecha}`);
  }

  return errores;
}
