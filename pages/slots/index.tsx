// pages/slots.tsx
import { GetServerSideProps } from "next";
import { getTodosLosHorarios } from "../services/slots";
import { Horario } from "../models/Horario";

type Props = {
  horarios: Horario[];
};

export default function Slots({ horarios }: Props) {
  return (
    <div>
      <h2>Horarios disponibles</h2>
      <ul>
        {horarios.map((h, i) => (
          <li key={i}>{h.title}</li>
        ))}
      </ul>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async () => {
  const horarios = await getTodosLosHorarios();
  return { props: { horarios } };
};
