export interface Reserva {
  title: string;           // Ej: "Ana Ruiz – Caballito – 27/10"
  participante: string;    // Nombre del participante
  circuito: string;        // Nombre del circuito
  fecha: string;           // Ej: "27 de octubre de 2025"
  horario: string;         // Ej: "Caballito – 27/10 – 09:00"
  coordinador: string;     // Nombre del coordinador
  estado: "Pendiente" | "Confirmada" | "Cancelada" | "Finalizada";
}
