export function iniciarSesion(email: string): boolean {
  const usuariosValidos = [
    "ana.ruiz@email.com",
    "sofia.martinez@email.com",
    "andrea.molina@email.com"
  ];
  return usuariosValidos.includes(email);
}

export function getUsuarioActual(): string {
  // Simulación: en producción usarías cookies o sesión
  return "Ana Ruiz";
}

export function getCoordinadorActual(): string {
  return "Sofia Martinez";
}
