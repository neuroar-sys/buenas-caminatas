import React from "react";

type Props = {
  value: string;
  onChange: (value: string) => void;
};

const SelectCoordinador: React.FC<Props> = ({ value, onChange }) => {
  return (
    <select value={value} onChange={(e) => onChange(e.target.value)}>
      <option value="">Seleccionar coordinador</option>
      <option value="c1">Coordinador A</option>
      <option value="c2">Coordinador B</option>
    </select>
  );
};

export default SelectCoordinador;
