import { useEffect, useMemo, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, CircleMarker, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Hospital, Stethoscope, Building2, Navigation, Phone, MapPin, ShieldCheck } from 'lucide-react';
import { demoFacilities, withDistances } from '@/data/healthFacilities';
import { HealthFacility } from '@/types/emec';

// Fix Leaflet default marker icons (Vite doesn't bundle them by default)
delete (L.Icon.Default.prototype as unknown as { _getIconUrl?: unknown })._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

const facilityIcons = { hospital: Hospital, clinic: Stethoscope, dispensary: Building2 };

// Custom colored hospital pin
const hospitalIcon = L.divIcon({
  className: 'kenya-facility-marker',
  html: `<div style="background:hsl(0 84% 55%);width:28px;height:28px;border-radius:50% 50% 50% 0;transform:rotate(-45deg);border:3px solid white;box-shadow:0 2px 8px rgba(0,0,0,.4);display:flex;align-items:center;justify-content:center;">
    <div style="transform:rotate(45deg);color:white;font-weight:bold;font-size:14px;">+</div>
  </div>`,
  iconSize: [28, 28],
  iconAnchor: [14, 28],
  popupAnchor: [0, -28],
});

const userIcon = L.divIcon({
  className: 'kenya-user-marker',
  html: `<div style="background:hsl(217 91% 60%);width:18px;height:18px;border-radius:50%;border:3px solid white;box-shadow:0 0 0 6px hsla(217,91%,60%,.25);"></div>`,
  iconSize: [18, 18],
  iconAnchor: [9, 9],
});

interface KenyaFacilityMapProps {
  showFacilities?: boolean;
  onSelectFacility?: (facilityId: string) => void;
  isEmergency?: boolean;
  height?: string;
}

function FlyToSelected({ facility }: { facility: HealthFacility | null }) {
  const map = useMap();
  useEffect(() => {
    if (facility) {
      map.flyTo([facility.coordinates.lat, facility.coordinates.lng], 11, { duration: 1.2 });
    }
  }, [facility, map]);
  return null;
}

export function KenyaFacilityMap({
  showFacilities = true,
  onSelectFacility,
  isEmergency = false,
  height = '500px',
}: KenyaFacilityMapProps) {
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [selected, setSelected] = useState<HealthFacility | null>(null);
  const [locating, setLocating] = useState(false);

  const facilities = useMemo(
    () => (userLocation ? withDistances(userLocation) : demoFacilities),
    [userLocation]
  );

  const requestLocation = () => {
    if (!navigator.geolocation) return;
    setLocating(true);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setUserLocation({ lat: pos.coords.latitude, lng: pos.coords.longitude });
        setLocating(false);
      },
      () => setLocating(false),
      { enableHighAccuracy: true, timeout: 10000 }
    );
  };

  useEffect(() => {
    requestLocation();
  }, []);

  const handleSelect = (f: HealthFacility) => {
    setSelected(f);
    onSelectFacility?.(f.id);
  };

  const Icon = selected ? facilityIcons[selected.type] : Hospital;

  return (
    <div className="space-y-4">
      <Card className="overflow-hidden border-2">
        <div className="flex items-center justify-between p-3 bg-card border-b">
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium">Kenya Health Facilities Map</span>
            <Badge variant="secondary" className="text-xs">{demoFacilities.length} facilities · 47 counties</Badge>
          </div>
          <Button size="sm" variant="outline" onClick={requestLocation} disabled={locating}>
            <Navigation className="w-3 h-3 mr-1" />
            {locating ? 'Locating…' : 'My Location'}
          </Button>
        </div>
        <div style={{ height }}>
          <MapContainer
            center={[0.0236, 37.9062]}
            zoom={6}
            scrollWheelZoom
            style={{ height: '100%', width: '100%' }}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {userLocation && (
              <>
                <Marker position={[userLocation.lat, userLocation.lng]} icon={userIcon}>
                  <Popup>You are here</Popup>
                </Marker>
                <CircleMarker
                  center={[userLocation.lat, userLocation.lng]}
                  radius={20}
                  pathOptions={{ color: 'hsl(217 91% 60%)', fillOpacity: 0.1 }}
                />
              </>
            )}
            {showFacilities &&
              facilities.map((f) => (
                <Marker
                  key={f.id}
                  position={[f.coordinates.lat, f.coordinates.lng]}
                  icon={hospitalIcon}
                  eventHandlers={{ click: () => handleSelect(f) }}
                >
                  <Popup>
                    <div className="space-y-1 min-w-[180px]">
                      <div className="font-semibold text-sm">{f.name}</div>
                      <div className="text-xs text-muted-foreground capitalize">{f.type} · {f.distance}</div>
                      <div className="text-xs">📞 {f.phone}</div>
                      {f.isVerified && (
                        <div className="text-xs text-green-600 flex items-center gap-1">
                          <ShieldCheck className="w-3 h-3" /> KMPDC Verified
                        </div>
                      )}
                    </div>
                  </Popup>
                </Marker>
              ))}
            <FlyToSelected facility={selected} />
          </MapContainer>
        </div>
      </Card>

      {selected && (
        <Card className="p-4 border-2 border-primary">
          <div className="flex items-start justify-between gap-3">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <Icon className="w-5 h-5 text-primary" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-semibold">{selected.name}</h3>
                  {selected.isVerified && (
                    <Badge variant="secondary" className="text-xs">
                      <ShieldCheck className="w-3 h-3 mr-1" /> Verified
                    </Badge>
                  )}
                </div>
                <p className="text-xs text-muted-foreground capitalize">
                  {selected.type} · {selected.distance} away · License {selected.licenseNumber}
                </p>
              </div>
            </div>
            <div className="flex gap-2">
              <Button size="sm" variant="outline" asChild>
                <a href={`tel:${selected.phone}`}>
                  <Phone className="w-3 h-3 mr-1" /> Call
                </a>
              </Button>
              <Button size="sm" variant={isEmergency ? 'destructive' : 'default'} asChild>
                <a
                  href={`https://www.openstreetmap.org/directions?to=${selected.coordinates.lat},${selected.coordinates.lng}`}
                  target="_blank"
                  rel="noreferrer"
                >
                  <Navigation className="w-3 h-3 mr-1" /> Directions
                </a>
              </Button>
            </div>
          </div>
        </Card>
      )}
    </div>
  );
}

export default KenyaFacilityMap;
