import React from "react";
import FormularioReservaAvanzado from "./FormularioReservaAvanzado";

console.log("🧪 typeof FormularioReservaAvanzado:", typeof FormularioReservaAvanzado);

const Reservar = () => {
  return (
    <div>
      <h1>Reservar</h1>
      <FormularioReservaAvanzado circuitoId="test-id" />
    </div>
  );
};

export default Reservar;
