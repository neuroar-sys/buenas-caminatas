const FormularioReservaAvanzado = ({ circuitoId, nombre, zona }) => {
  return (
    <div>
      <h2>Formulario de Reserva</h2>
      <p>Circuito: {circuitoId}</p>
      <p>Nombre: {nombre}</p>
      <p>Zona: {zona}</p>
    </div>
  );
};

export default FormularioReservaAvanzado;
