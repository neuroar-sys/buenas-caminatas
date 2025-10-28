import { useEffect, useState } from "react";
import { getCircuitos } from "../api/utils";

export default function SelectCircuito({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  const [circuitos, setCircuitos] = useState<string[]>([]);

  useEffect(() => {
    getCircuitos().then(setCircuitos);
  }, []);

  return (
    <select value={value} onChange={e => onChange(e.target.value)}>
      <option value="">Seleccionar circuito</option>
      {circuitos.map(c => <option key={c}>{c}</option>)}
    </select>
  );
}
