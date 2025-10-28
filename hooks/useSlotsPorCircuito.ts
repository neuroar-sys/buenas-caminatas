import { useEffect, useState } from "react";
import { getSlotsPorCircuito } from "../api/slots-por-circuito";

export function useSlotsPorCircuito(circuito: string) {
  const [slots, setSlots] = useState([]);

  useEffect(() => {
    if (circuito) {
      getSlotsPorCircuito(circuito).then(setSlots);
    }
  }, [circuito]);

  return slots;
}
