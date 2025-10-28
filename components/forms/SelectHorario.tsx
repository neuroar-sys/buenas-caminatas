import React from "react";

type Props = {
  value: string;
  onChange: (value: string) => void;
};

const SelectHorario: React.FC<Props> = ({ value, onChange }) => {
  return (
    <select value={value} onChange={(e) => onChange(e.target.value)}>
      <option value="">Seleccionar horario</option>
      <option value="h1">10:00</option>
      <option value="h2">14:00</option>
    </select>
  );
};

export default SelectHorario;
