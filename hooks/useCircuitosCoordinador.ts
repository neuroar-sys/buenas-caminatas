import { useEffect, useState } from "react";
import { getCircuitosCoordinados } from "../api/circuitos-coordinados";

export function useCircuitosCoordinador(nombre: string) {
  const [circuitos, setCircuitos] = useState([]);

  useEffect(() => {
    if (nombre) {
      getCircuitosCoordinados(nombre).then(setCircuitos);
    }
  }, [nombre]);

  return circuitos;
}
