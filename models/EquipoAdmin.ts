export interface EquipoAdmin {
  title: string; // Ej. "Andrea Molina"
  email: string;
  rol: "Admin";
  permisos: string[]; // Ej. ["Editar", "Eliminar", "Ver"]
}
