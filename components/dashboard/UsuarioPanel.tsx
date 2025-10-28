import PanelCard from './PanelCard';


export default function UsuarioPanel() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
      <PanelCard title="Explorar Circuitos" href="/circuitos" />
      <PanelCard title="Mis Reservas" href="/usuario/reservas" />
      <PanelCard title="Ver Horarios" href="/usuario/horarios" />
      <PanelCard title="Contacto y Soporte" href="/usuario/contacto" />
    </div>
  );
}
