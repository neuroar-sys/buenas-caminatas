export interface Participante {
  title: string;               // Nombre completo del participante
  email: string;               // Correo electrónico
  estado: "Confirmado" | "Pendiente" | "Inactivo";
  reservas_realizadas: string[]; // Lista de títulos de reservas
}
