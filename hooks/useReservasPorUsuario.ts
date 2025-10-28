import { useEffect, useState } from "react";
import { getReservasPorParticipante } from "../api/reservas-por-usuario";

export function useReservasPorUsuario(nombre: string) {
  const [reservas, setReservas] = useState([]);

  useEffect(() => {
    if (nombre) {
      getReservasPorParticipante(nombre).then(setReservas);
    }
  }, [nombre]);

  return reservas;
}
import { useEffect, useState } from "react";
import { getTodasLasReservas } from "../lib/utils";

export function useReservasPorUsuario(nombre: string) {
  const [reservas, setReservas] = useState([]);

  useEffect(() => {
    getTodasLasReservas().then(data => {
      const filtradas = data.filter(r => r.participante === nombre);
      setReservas(filtradas);
    });
  }, [nombre]);

  return reservas;
}
