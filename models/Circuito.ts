export interface Circuito {
  title: string;               // Nombre del circuito
  localidad: string;           // Ej: "Caballito"
  tipo_de_caminata: string;    // Ej: "Ruta Verde", "Sendero del Bosque"
  coordinadores: string[];     // Nombres de coordinadores asignados
  horarios: string[];          // Títulos de horarios disponibles
  reservas: string[];          // Títulos de reservas asociadas
}
