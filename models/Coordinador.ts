export interface Coordinador {
  title: string;               // Nombre completo del coordinador
  email: string;               // Correo electrónico
  estado: "Activo" | "Inactivo";
  circuitos_asignados: string[];     // Títulos de circuitos
  reservas_gestionadas: string[];    // Títulos de reservas
}
