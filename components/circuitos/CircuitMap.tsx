import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';

export default function CircuitMap({ circuitos }) {
  return (
    <MapContainer center={[-34.6, -58.4]} zoom={12} style={{ height: '400px', width: '100%' }}>
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      {circuitos.map(c => (
        <Marker key={c.id} position={[c.lat, c.lng]}>
          <Popup>
            <a href={`/circuitos/${c.id}`}>{c.nombreCircuito}</a>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}
