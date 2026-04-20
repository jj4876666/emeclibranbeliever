import { useState } from 'react';
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useLanguage } from "@/contexts/LanguageContext";
import { KenyaFacilityMap } from "@/components/maps/KenyaFacilityMap";
import { demoFacilities, withDistances } from "@/data/healthFacilities";
import { useEffect, useMemo } from "react";
import { 
  Phone, 
  Ambulance, 
  Shield, 
  Flame,
  Heart,
  AlertTriangle,
  MapPin,
  Clock,
  Navigation,
  Hospital,
  Building2,
  Stethoscope,
  PhoneCall,
  Delete,
  CheckCircle,
  Wifi,
  WifiOff,
  ExternalLink,
  Locate
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const emergencyContacts = [
  {
    icon: Ambulance,
    title: "Ambulance",
    number: "999",
    description: "Medical emergency response",
    color: "from-red-500 to-rose-500",
  },
  {
    icon: Shield,
    title: "Police",
    number: "999 / 112",
    description: "Law enforcement",
    color: "from-blue-500 to-indigo-500",
  },
  {
    icon: Flame,
    title: "Fire & Rescue",
    number: "999",
    description: "Fire department",
    color: "from-orange-500 to-red-500",
  },
  {
    icon: Heart,
    title: "Red Cross Kenya",
    number: "1199",
    description: "Emergency assistance",
    color: "from-red-600 to-red-700",
  },
];

const facilityIcons = {
  hospital: Hospital,
  clinic: Stethoscope,
  dispensary: Building2,
};

const Emergency = () => {
  const { t } = useLanguage();
  const { toast } = useToast();
  const [dialedNumber, setDialedNumber] = useState('');
  const [isOnline, setIsOnline] = useState(typeof navigator !== 'undefined' ? navigator.onLine : true);
  const [selectedFacility, setSelectedFacility] = useState<string | null>(null);
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);

  useEffect(() => {
    const on = () => setIsOnline(true);
    const off = () => setIsOnline(false);
    window.addEventListener('online', on);
    window.addEventListener('offline', off);
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => setUserLocation({ lat: pos.coords.latitude, lng: pos.coords.longitude }),
        () => {},
        { enableHighAccuracy: true, timeout: 8000 }
      );
    }
    return () => {
      window.removeEventListener('online', on);
      window.removeEventListener('offline', off);
    };
  }, []);

  const nearbyFacilities = useMemo(
    () => (userLocation ? withDistances(userLocation) : demoFacilities).slice(0, 12),
    [userLocation]
  );

  const handleDial = (digit: string) => {
    if (dialedNumber.length < 15) {
      setDialedNumber(prev => prev + digit);
    }
  };

  const handleDelete = () => {
    setDialedNumber(prev => prev.slice(0, -1));
  };

  const handleCall = () => {
    if (dialedNumber.length >= 3) {
      window.location.href = `tel:${dialedNumber}`;
    } else {
      toast({
        title: "Enter a number",
        description: "Please enter at least 3 digits",
        variant: "destructive",
      });
    }
  };

  const handleQuickCall = (number: string, name: string) => {
    const clean = number.replace(/[^0-9+]/g, '');
    toast({ title: `Calling ${name}`, description: `Dialing ${number}` });
    window.location.href = `tel:${clean}`;
  };

  const handleNavigate = (facility: { name: string; coordinates: { lat: number; lng: number } }) => {
    setSelectedFacility(facility.name);
    const dest = `${facility.coordinates.lat},${facility.coordinates.lng}`;
    const origin = userLocation ? `${userLocation.lat},${userLocation.lng}` : '';
    const url = `https://www.google.com/maps/dir/?api=1&destination=${dest}${origin ? `&origin=${origin}` : ''}&travelmode=driving`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <DashboardLayout>
      <div className="p-4 md:p-6 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl gradient-emergency flex items-center justify-center animate-pulse-soft">
              <AlertTriangle className="w-7 h-7 text-white" />
            </div>
            <div>
              <h1 className="text-2xl md:text-3xl font-bold">{t('emergency.title')}</h1>
              <p className="text-muted-foreground">Quick access to emergency help</p>
            </div>
          </div>
          <Badge variant="outline" className={`gap-1 ${isOnline ? 'bg-success/10 text-success border-success/30' : 'bg-muted text-muted-foreground'}`}>
            {isOnline ? <Wifi className="w-3 h-3" /> : <WifiOff className="w-3 h-3" />}
            {isOnline ? 'Online' : 'Offline Mode'}
          </Badge>
        </div>

        {/* Main Emergency Card */}
        <Card className="overflow-hidden border-destructive/30">
          <div className="gradient-emergency p-6 md:p-8 text-center text-white">
            <Phone className="w-12 h-12 mx-auto mb-4 animate-bounce-soft" />
            <h2 className="text-3xl font-bold mb-2">Emergency: 999</h2>
            <p className="opacity-90 mb-4">
              Police, Ambulance, Fire & Rescue
            </p>
            <Button 
              size="lg" 
              className="bg-white text-destructive hover:bg-white/90 font-bold"
              onClick={() => handleQuickCall('999', 'Emergency Services')}
            >
              <PhoneCall className="w-5 h-5 mr-2" />
              Call 999 Now
            </Button>
          </div>
        </Card>

        <Tabs defaultValue="location" className="w-full">
          <TabsList className="grid w-full grid-cols-4 h-auto">
            <TabsTrigger value="location" className="flex flex-col gap-1 py-3">
              <Locate className="w-4 h-4" />
              <span className="text-xs">Location</span>
            </TabsTrigger>
            <TabsTrigger value="contacts" className="flex flex-col gap-1 py-3">
              <Phone className="w-4 h-4" />
              <span className="text-xs">Contacts</span>
            </TabsTrigger>
            <TabsTrigger value="facilities" className="flex flex-col gap-1 py-3">
              <MapPin className="w-4 h-4" />
              <span className="text-xs">Nearby</span>
            </TabsTrigger>
            <TabsTrigger value="dialpad" className="flex flex-col gap-1 py-3">
              <PhoneCall className="w-4 h-4" />
              <span className="text-xs">Dial Pad</span>
            </TabsTrigger>
          </TabsList>

          {/* Live Location Tab */}
          <TabsContent value="location" className="space-y-4">
            <KenyaFacilityMap
              showFacilities={true}
              isEmergency={true}
              height="520px"
              onSelectFacility={(id) =>
                setSelectedFacility(demoFacilities.find((f) => f.id === id)?.name || null)
              }
            />
          </TabsContent>

          {/* Emergency Contacts */}
          <TabsContent value="contacts" className="space-y-4">
            <div className="grid sm:grid-cols-2 gap-4">
              {emergencyContacts.map((contact) => {
                const Icon = contact.icon;
                return (
                  <Card 
                    key={contact.title}
                    className="border-0 shadow-elegant hover:shadow-lg transition-all cursor-pointer"
                    onClick={() => handleQuickCall(contact.number, contact.title)}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-center gap-4">
                        <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${contact.color} flex items-center justify-center`}>
                          <Icon className="w-7 h-7 text-white" />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold text-foreground">{contact.title}</h3>
                          <p className="text-2xl font-bold text-primary">{contact.number}</p>
                          <p className="text-xs text-muted-foreground">{contact.description}</p>
                        </div>
                        <PhoneCall className="w-5 h-5 text-muted-foreground" />
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>

            {/* Tips */}
            <Card className="border-0 shadow-elegant">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Clock className="w-5 h-5 text-primary" />
                  When Calling Emergency Services
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {[
                  { icon: MapPin, text: "State your exact location or landmarks" },
                  { icon: AlertTriangle, text: "Describe the emergency clearly" },
                  { icon: Heart, text: "Stay calm and follow instructions" },
                ].map((tip, i) => (
                  <div key={i} className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                    <tip.icon className="w-5 h-5 text-primary" />
                    <span className="text-sm">{tip.text}</span>
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Nearby Facilities with Simulated Map */}
          <TabsContent value="facilities" className="space-y-4">
            {/* Real Kenya Facility Map */}
            <KenyaFacilityMap
              showFacilities={true}
              isEmergency={true}
              height="420px"
              onSelectFacility={(id) =>
                setSelectedFacility(demoFacilities.find((f) => f.id === id)?.name || null)
              }
            />

            {/* Facilities List */}
            <div className="space-y-3">
              {nearbyFacilities.map((facility) => {
                const Icon = facilityIcons[facility.type];
                const isSelected = selectedFacility === facility.name;

                return (
                  <Card 
                    key={facility.id}
                    className={`border-0 shadow-elegant transition-all ${
                      isSelected ? 'ring-2 ring-primary' : ''
                    }`}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-start gap-4">
                        <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                          facility.type === 'hospital' 
                            ? 'bg-red-500' 
                            : facility.type === 'clinic'
                              ? 'bg-orange-500'
                              : 'bg-blue-500'
                        }`}>
                          <Icon className="w-6 h-6 text-white" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-2">
                            <div>
                              <h3 className="font-semibold text-foreground">{facility.name}</h3>
                              <div className="flex items-center gap-2 mt-1">
                                <Badge variant="secondary" className="text-xs capitalize">
                                  {facility.type}
                                </Badge>
                                {facility.isVerified && (
                                  <Badge variant="outline" className="text-xs bg-success/10 text-success border-success/30">
                                    <CheckCircle className="w-3 h-3 mr-1" />
                                    Verified
                                  </Badge>
                                )}
                              </div>
                            </div>
                            <div className="text-right">
                              <p className="font-bold text-primary">{facility.distance}</p>
                              <p className="text-xs text-muted-foreground">away</p>
                            </div>
                          </div>
                          
                          <div className="flex gap-2 mt-3">
                            <Button 
                              size="sm" 
                              variant="outline" 
                              className="flex-1"
                              onClick={() => handleQuickCall(facility.emergencyPhone, facility.name)}
                            >
                              <Phone className="w-4 h-4 mr-1" />
                              Call
                            </Button>
                            <Button 
                              size="sm" 
                              className="flex-1"
                              onClick={() => handleNavigate(facility)}
                            >
                              <Navigation className="w-4 h-4 mr-1" />
                              Directions
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </TabsContent>

          {/* Emergency Dial Pad */}
          <TabsContent value="dialpad">
            <Card className="border-0 shadow-elegant">
              <CardContent className="p-6">
                {/* Display */}
                <div className="text-center mb-6">
                  <div className="h-16 flex items-center justify-center bg-muted rounded-xl mb-2">
                    <span className="text-3xl font-mono font-bold tracking-wider">
                      {dialedNumber || '---'}
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Demo Mode – Calls are simulated
                  </p>
                </div>

                {/* Dial Pad */}
                <div className="grid grid-cols-3 gap-3 mb-4">
                  {['1', '2', '3', '4', '5', '6', '7', '8', '9', '*', '0', '#'].map((digit) => (
                    <Button
                      key={digit}
                      variant="outline"
                      className="h-16 text-2xl font-semibold hover:bg-primary hover:text-primary-foreground transition-all"
                      onClick={() => handleDial(digit)}
                    >
                      {digit}
                      {digit === '2' && <span className="block text-[10px] font-normal text-muted-foreground">ABC</span>}
                      {digit === '3' && <span className="block text-[10px] font-normal text-muted-foreground">DEF</span>}
                      {digit === '4' && <span className="block text-[10px] font-normal text-muted-foreground">GHI</span>}
                      {digit === '5' && <span className="block text-[10px] font-normal text-muted-foreground">JKL</span>}
                      {digit === '6' && <span className="block text-[10px] font-normal text-muted-foreground">MNO</span>}
                      {digit === '7' && <span className="block text-[10px] font-normal text-muted-foreground">PQRS</span>}
                      {digit === '8' && <span className="block text-[10px] font-normal text-muted-foreground">TUV</span>}
                      {digit === '9' && <span className="block text-[10px] font-normal text-muted-foreground">WXYZ</span>}
                    </Button>
                  ))}
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3">
                  <Button
                    variant="outline"
                    className="flex-1 h-14"
                    onClick={handleDelete}
                    disabled={!dialedNumber}
                  >
                    <Delete className="w-6 h-6" />
                  </Button>
                  <Button
                    className="flex-[2] h-14 bg-success hover:bg-success/90"
                    onClick={handleCall}
                  >
                    <PhoneCall className="w-6 h-6 mr-2" />
                    Call
                  </Button>
                </div>

                {/* Quick Dial */}
                <div className="mt-6 pt-4 border-t">
                  <p className="text-sm font-medium mb-3">Quick Dial</p>
                  <div className="flex gap-2">
                    {[
                      { number: '999', label: 'Emergency' },
                      { number: '1199', label: 'Red Cross' },
                      { number: '112', label: 'Universal' },
                    ].map((quick) => (
                      <Button
                        key={quick.number}
                        variant="secondary"
                        className="flex-1 flex-col h-auto py-3"
                        onClick={() => {
                          setDialedNumber(quick.number);
                          handleQuickCall(quick.number, quick.label);
                        }}
                      >
                        <span className="font-bold">{quick.number}</span>
                        <span className="text-xs text-muted-foreground">{quick.label}</span>
                      </Button>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Disclaimer */}
        <Card className="bg-muted/50 border-0">
          <CardContent className="p-4 text-center">
            <p className="text-xs text-muted-foreground">
              <strong>Demo Mode:</strong> All calls and navigation are simulated. 
              In a real emergency, dial your local emergency number.
              Kenya Emergency: 999 | Universal: 112
            </p>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default Emergency;