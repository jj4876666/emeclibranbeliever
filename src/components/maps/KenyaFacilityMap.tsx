import { useEffect, useMemo, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, CircleMarker, Polyline, useMap, LayersControl } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Hospital, Stethoscope, Building2, Navigation, Phone, MapPin, ShieldCheck, Layers, Route } from 'lucide-react';
import { demoFacilities, withDistances, KENYA_COUNTIES } from '@/data/healthFacilities';
import { HealthFacility } from '@/types/emec';

// Fix Leaflet default marker icons
delete (L.Icon.Default.prototype as unknown as { _getIconUrl?: unknown })._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

const facilityIcons = { hospital: Hospital, clinic: Stethoscope, dispensary: Building2 };

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

function FlyTo({ target, zoom = 11 }: { target: [number, number] | null; zoom?: number }) {
  const map = useMap();
  useEffect(() => {
    if (target) map.flyTo(target, zoom, { duration: 1.2 });
  }, [target, zoom, map]);
  return null;
}

// Approximate county centroids for "show county" zoom
const COUNTY_CENTROIDS: Record<string, [number, number]> = {
  'Nairobi': [-1.286, 36.817], 'Mombasa': [-4.043, 39.668], 'Kwale': [-4.175, 39.452],
  'Kilifi': [-3.631, 39.85], 'Tana River': [-1.5, 40.033], 'Lamu': [-2.27, 40.902],
  'Taita Taveta': [-3.396, 38.556], 'Garissa': [-0.453, 39.64], 'Wajir': [1.747, 40.057],
  'Mandera': [3.937, 41.867], 'Marsabit': [2.335, 37.99], 'Isiolo': [0.354, 37.582],
  'Meru': [0.046, 37.656], 'Tharaka-Nithi': [-0.334, 37.649], 'Embu': [-0.531, 37.457],
  'Kitui': [-1.367, 38.011], 'Machakos': [-1.518, 37.263], 'Makueni': [-1.804, 37.624],
  'Nyandarua': [-0.275, 36.378], 'Nyeri': [-0.42, 36.948], 'Kirinyaga': [-0.499, 37.284],
  'Murang\u2019a': [-0.784, 37.04], 'Kiambu': [-1.171, 36.836], 'Turkana': [3.119, 35.597],
  'West Pokot': [1.239, 35.114], 'Samburu': [1.095, 36.698], 'Trans Nzoia': [1.016, 35.006],
  'Uasin Gishu': [0.517, 35.283], 'Elgeyo Marakwet': [0.67, 35.51], 'Nandi': [0.203, 35.105],
  'Baringo': [0.492, 35.743], 'Laikipia': [0.017, 37.067], 'Nakuru': [-0.303, 36.08],
  'Narok': [-1.083, 35.867], 'Kajiado': [-1.853, 36.777], 'Kericho': [-0.369, 35.283],
  'Bomet': [-0.783, 35.342], 'Kakamega': [0.283, 34.752], 'Vihiga': [0.076, 34.722],
  'Bungoma': [0.564, 34.561], 'Busia': [0.461, 34.112], 'Siaya': [0.061, 34.288],
  'Kisumu': [-0.092, 34.768], 'Homa Bay': [-0.527, 34.457], 'Migori': [-1.063, 34.473],
  'Kisii': [-0.682, 34.772], 'Nyamira': [-0.563, 34.936],
};

export function KenyaFacilityMap({
  showFacilities = true,
  onSelectFacility,
  isEmergency = false,
  height = '500px',
}: KenyaFacilityMapProps) {
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [selected, setSelected] = useState<HealthFacility | null>(null);
  const [locating, setLocating] = useState(false);
  const [countyFilter, setCountyFilter] = useState<string>('all');
  const [routeETA, setRouteETA] = useState<{ km: number; min: number } | null>(null);
  const [routeCoords, setRouteCoords] = useState<[number, number][] | null>(null);
  const [flyTarget, setFlyTarget] = useState<[number, number] | null>(null);

  const allFacilities = useMemo(
    () => (userLocation ? withDistances(userLocation) : demoFacilities),
    [userLocation]
  );

  const facilities = useMemo(
    () => (countyFilter === 'all' ? allFacilities : allFacilities.filter(f => f.county === countyFilter)),
    [allFacilities, countyFilter]
  );

  const requestLocation = () => {
    if (!navigator.geolocation) return;
    setLocating(true);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const loc = { lat: pos.coords.latitude, lng: pos.coords.longitude };
        setUserLocation(loc);
        setFlyTarget([loc.lat, loc.lng]);
        setLocating(false);
      },
      () => setLocating(false),
      { enableHighAccuracy: true, timeout: 10000 }
    );
  };

  useEffect(() => {
    requestLocation();
  }, []);

  const handleSelect = async (f: HealthFacility) => {
    setSelected(f);
    setFlyTarget([f.coordinates.lat, f.coordinates.lng]);
    onSelectFacility?.(f.id);
    if (userLocation) {
      // Try OSRM public routing for real road navigation
      try {
        const url = `https://router.project-osrm.org/route/v1/driving/${userLocation.lng},${userLocation.lat};${f.coordinates.lng},${f.coordinates.lat}?overview=full&geometries=geojson`;
        const res = await fetch(url);
        const data = await res.json();
        if (data?.routes?.[0]) {
          const r = data.routes[0];
          const coords: [number, number][] = r.geometry.coordinates.map((c: [number, number]) => [c[1], c[0]]);
          setRouteCoords(coords);
          setRouteETA({ km: r.distance / 1000, min: r.duration / 60 });
          return;
        }
      } catch {
        /* fall back to straight line */
      }
      setRouteCoords([
        [userLocation.lat, userLocation.lng],
        [f.coordinates.lat, f.coordinates.lng],
      ]);
      setRouteETA(null);
    }
  };

  const handleCountyChange = (county: string) => {
    setCountyFilter(county);
    if (county !== 'all' && COUNTY_CENTROIDS[county]) {
      setFlyTarget(COUNTY_CENTROIDS[county]);
    } else {
      setFlyTarget([0.0236, 37.9062]);
    }
  };

  const Icon = selected ? facilityIcons[selected.type] : Hospital;

  return (
    <div className="space-y-4">
      <Card className="overflow-hidden border-2">
        <div className="flex flex-col gap-2 p-3 bg-card border-b sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-2 flex-wrap">
            <MapPin className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium">Kenya Health Facilities</span>
            <Badge variant="secondary" className="text-xs">
              {facilities.length} of {demoFacilities.length} · 47 counties
            </Badge>
          </div>
          <div className="flex items-center gap-2 flex-wrap">
            <Select value={countyFilter} onValueChange={handleCountyChange}>
              <SelectTrigger className="h-8 w-[160px] text-xs">
                <SelectValue placeholder="Filter by county" />
              </SelectTrigger>
              <SelectContent className="max-h-[300px]">
                <SelectItem value="all">All counties</SelectItem>
                {KENYA_COUNTIES.map((c) => (
                  <SelectItem key={c} value={c}>{c}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Button size="sm" variant="outline" onClick={requestLocation} disabled={locating}>
              <Navigation className="w-3 h-3 mr-1" />
              {locating ? 'Locating…' : 'My Location'}
            </Button>
          </div>
        </div>
        <div style={{ height }}>
          <MapContainer
            center={[0.0236, 37.9062]}
            zoom={6}
            scrollWheelZoom
            style={{ height: '100%', width: '100%' }}
          >
            <LayersControl position="topright">
              <LayersControl.BaseLayer checked name="Street">
                <TileLayer
                  attribution='&copy; OpenStreetMap'
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
              </LayersControl.BaseLayer>
              <LayersControl.BaseLayer name="Satellite (Aerial)">
                <TileLayer
                  attribution='Tiles &copy; Esri'
                  url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
                />
              </LayersControl.BaseLayer>
              <LayersControl.BaseLayer name="Hybrid (Aerial + Labels)">
                <TileLayer
                  attribution='Tiles &copy; Esri'
                  url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
                />
                <TileLayer
                  url="https://server.arcgisonline.com/ArcGIS/rest/services/Reference/World_Boundaries_and_Places/MapServer/tile/{z}/{y}/{x}"
                />
              </LayersControl.BaseLayer>
              <LayersControl.BaseLayer name="Topographic">
                <TileLayer
                  attribution='&copy; OpenTopoMap'
                  url="https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png"
                />
              </LayersControl.BaseLayer>
            </LayersControl>

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
                      <div className="text-xs text-muted-foreground">{f.county} · {f.type} · {f.distance}</div>
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

            {routeCoords && (
              <Polyline
                positions={routeCoords}
                pathOptions={{ color: 'hsl(217 91% 55%)', weight: 5, opacity: 0.8 }}
              />
            )}

            <FlyTo target={flyTarget} zoom={countyFilter !== 'all' && !selected ? 9 : 11} />
          </MapContainer>
        </div>
      </Card>

      {selected && (
        <Card className="p-4 border-2 border-primary">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                <Icon className="w-5 h-5 text-primary" />
              </div>
              <div>
                <div className="flex items-center gap-2 flex-wrap">
                  <h3 className="font-semibold">{selected.name}</h3>
                  {selected.isVerified && (
                    <Badge variant="secondary" className="text-xs">
                      <ShieldCheck className="w-3 h-3 mr-1" /> Verified
                    </Badge>
                  )}
                </div>
                <p className="text-xs text-muted-foreground">
                  {selected.county} · {selected.type} · {selected.distance} away · License {selected.licenseNumber}
                </p>
                {routeETA && (
                  <p className="text-xs text-primary font-medium mt-1 flex items-center gap-1">
                    <Route className="w-3 h-3" />
                    Driving: {routeETA.km.toFixed(1)} km · ~{Math.round(routeETA.min)} min
                  </p>
                )}
              </div>
            </div>
            <div className="flex gap-2 flex-wrap">
              <Button size="sm" variant="outline" asChild>
                <a href={`tel:${selected.phone}`}>
                  <Phone className="w-3 h-3 mr-1" /> Call
                </a>
              </Button>
              <Button size="sm" variant={isEmergency ? 'destructive' : 'default'} asChild>
                <a
                  href={
                    userLocation
                      ? `https://www.google.com/maps/dir/?api=1&origin=${userLocation.lat},${userLocation.lng}&destination=${selected.coordinates.lat},${selected.coordinates.lng}&travelmode=driving`
                      : `https://www.google.com/maps/dir/?api=1&destination=${selected.coordinates.lat},${selected.coordinates.lng}`
                  }
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
