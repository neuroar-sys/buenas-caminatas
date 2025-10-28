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

export function validarFechaVsHorario(reserva: { fecha: string; horario: string }, index: number) {
  const fechaEsperada = fechaLargaAFormatoCorto(reserva.fecha);
  if (!reserva.horario.includes(fechaEsperada)) {
    console.warn(`⚠️ Reserva [${index}] tiene horario que no coincide con la fecha:`, {
      fecha: reserva.fecha,
      fechaEsperada,
      horario: reserva.horario
    });
  }
}
