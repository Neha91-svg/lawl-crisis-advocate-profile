import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41]
});

L.Marker.prototype.options.icon = DefaultIcon;

function LeafletMap({ centers, userLocation }) {
  // Ensure position is always a valid [lat, lng] array
  const isValidLocation = (loc) => Array.isArray(loc) && loc.length === 2 && loc[0] && loc[1];
  const position = isValidLocation(userLocation) ? userLocation : [28.6139, 77.2090];

  return (
    <div className="leaflet-container-wrapper" style={{ height: '400px', width: '100%', borderRadius: '1rem', overflow: 'hidden', margin: '2rem 0', border: '1px solid var(--border-light)' }}>
      <MapContainer center={position} zoom={13} scrollWheelZoom={false} style={{ height: '100%', width: '100%' }}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        
        {/* Advocate's Office Marker */}
        <Marker position={position}>
          <Popup>
            <strong>Primary Office</strong> <br /> Advocate's Location
          </Popup>
        </Marker>

        {centers?.filter(c => c.lat && c.lng).map((center, index) => (
          <Marker key={index} position={[center.lat, center.lng]}>
            <Popup>
              <strong>{center.name}</strong> <br /> {center.address}
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}

export default LeafletMap;
