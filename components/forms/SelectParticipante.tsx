import React from "react";

type Props = {
  value: string;
  onChange: (value: string) => void;
};

const SelectParticipante: React.FC<Props> = ({ value, onChange }) => {
  return (
    <select value={value} onChange={(e) => onChange(e.target.value)}>
      <option value="">Seleccionar participante</option>
      <option value="p1">Participante 1</option>
      <option value="p2">Participante 2</option>
    </select>
  );
};

export default SelectParticipante;
