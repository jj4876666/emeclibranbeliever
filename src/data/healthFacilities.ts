import { HealthFacility } from '@/types/emec';

// Registered health facilities across Kenya's 47 counties
// Coordinates are approximate centroids / known facility locations.
export const demoFacilities: HealthFacility[] = [
  // Nairobi
  { id: 'fac-nrb-01', name: 'Kenyatta National Hospital', licenseNumber: 'KMPDC-NRB-001', type: 'hospital', distance: '—', coordinates: { lat: -1.3013, lng: 36.8073 }, phone: '+254 20 2726300', emergencyPhone: '999', isVerified: true },
  { id: 'fac-nrb-02', name: 'Mbagathi County Hospital', licenseNumber: 'KMPDC-NRB-002', type: 'hospital', distance: '—', coordinates: { lat: -1.3110, lng: 36.7820 }, phone: '+254 20 2724712', emergencyPhone: '999', isVerified: true },
  { id: 'fac-nrb-03', name: 'Mama Lucy Kibaki Hospital', licenseNumber: 'KMPDC-NRB-003', type: 'hospital', distance: '—', coordinates: { lat: -1.2774, lng: 36.9100 }, phone: '+254 20 8001234', emergencyPhone: '999', isVerified: true },

  // Mombasa
  { id: 'fac-msa-01', name: 'Coast General Teaching & Referral Hospital', licenseNumber: 'KMPDC-MSA-001', type: 'hospital', distance: '—', coordinates: { lat: -4.0566, lng: 39.6657 }, phone: '+254 41 2314204', emergencyPhone: '999', isVerified: true },
  // Kwale
  { id: 'fac-kwl-01', name: 'Kwale County Referral Hospital', licenseNumber: 'KMPDC-KWL-001', type: 'hospital', distance: '—', coordinates: { lat: -4.1747, lng: 39.4521 }, phone: '+254 700 100001', emergencyPhone: '999', isVerified: true },
  // Kilifi
  { id: 'fac-klf-01', name: 'Kilifi County Hospital', licenseNumber: 'KMPDC-KLF-001', type: 'hospital', distance: '—', coordinates: { lat: -3.6305, lng: 39.8499 }, phone: '+254 700 100002', emergencyPhone: '999', isVerified: true },
  // Tana River
  { id: 'fac-tnr-01', name: 'Hola County Referral Hospital', licenseNumber: 'KMPDC-TNR-001', type: 'hospital', distance: '—', coordinates: { lat: -1.5000, lng: 40.0333 }, phone: '+254 700 100003', emergencyPhone: '999', isVerified: true },
  // Lamu
  { id: 'fac-lmu-01', name: 'King Fahad County Hospital', licenseNumber: 'KMPDC-LMU-001', type: 'hospital', distance: '—', coordinates: { lat: -2.2696, lng: 40.9020 }, phone: '+254 700 100004', emergencyPhone: '999', isVerified: true },
  // Taita Taveta
  { id: 'fac-tta-01', name: 'Moi County Referral Hospital - Voi', licenseNumber: 'KMPDC-TTA-001', type: 'hospital', distance: '—', coordinates: { lat: -3.3963, lng: 38.5560 }, phone: '+254 700 100005', emergencyPhone: '999', isVerified: true },
  // Garissa
  { id: 'fac-grs-01', name: 'Garissa County Referral Hospital', licenseNumber: 'KMPDC-GRS-001', type: 'hospital', distance: '—', coordinates: { lat: -0.4536, lng: 39.6401 }, phone: '+254 700 100006', emergencyPhone: '999', isVerified: true },
  // Wajir
  { id: 'fac-wjr-01', name: 'Wajir County Referral Hospital', licenseNumber: 'KMPDC-WJR-001', type: 'hospital', distance: '—', coordinates: { lat: 1.7471, lng: 40.0573 }, phone: '+254 700 100007', emergencyPhone: '999', isVerified: true },
  // Mandera
  { id: 'fac-mnd-01', name: 'Mandera County Referral Hospital', licenseNumber: 'KMPDC-MND-001', type: 'hospital', distance: '—', coordinates: { lat: 3.9366, lng: 41.8670 }, phone: '+254 700 100008', emergencyPhone: '999', isVerified: true },
  // Marsabit
  { id: 'fac-mrs-01', name: 'Marsabit County Referral Hospital', licenseNumber: 'KMPDC-MRS-001', type: 'hospital', distance: '—', coordinates: { lat: 2.3349, lng: 37.9899 }, phone: '+254 700 100009', emergencyPhone: '999', isVerified: true },
  // Isiolo
  { id: 'fac-iso-01', name: 'Isiolo County Referral Hospital', licenseNumber: 'KMPDC-ISO-001', type: 'hospital', distance: '—', coordinates: { lat: 0.3546, lng: 37.5822 }, phone: '+254 700 100010', emergencyPhone: '999', isVerified: true },
  // Meru
  { id: 'fac-mru-01', name: 'Meru Teaching & Referral Hospital', licenseNumber: 'KMPDC-MRU-001', type: 'hospital', distance: '—', coordinates: { lat: 0.0463, lng: 37.6559 }, phone: '+254 700 100011', emergencyPhone: '999', isVerified: true },
  // Tharaka-Nithi
  { id: 'fac-thn-01', name: 'Chuka County Referral Hospital', licenseNumber: 'KMPDC-THN-001', type: 'hospital', distance: '—', coordinates: { lat: -0.3336, lng: 37.6493 }, phone: '+254 700 100012', emergencyPhone: '999', isVerified: true },
  // Embu
  { id: 'fac-emb-01', name: 'Embu Level 5 Hospital', licenseNumber: 'KMPDC-EMB-001', type: 'hospital', distance: '—', coordinates: { lat: -0.5310, lng: 37.4574 }, phone: '+254 700 100013', emergencyPhone: '999', isVerified: true },
  // Kitui
  { id: 'fac-ktu-01', name: 'Kitui County Referral Hospital', licenseNumber: 'KMPDC-KTU-001', type: 'hospital', distance: '—', coordinates: { lat: -1.3667, lng: 38.0106 }, phone: '+254 700 100014', emergencyPhone: '999', isVerified: true },
  // Machakos
  { id: 'fac-mck-01', name: 'Machakos Level 5 Hospital', licenseNumber: 'KMPDC-MCK-001', type: 'hospital', distance: '—', coordinates: { lat: -1.5177, lng: 37.2634 }, phone: '+254 700 100015', emergencyPhone: '999', isVerified: true },
  // Makueni
  { id: 'fac-mku-01', name: 'Makueni County Referral Hospital', licenseNumber: 'KMPDC-MKU-001', type: 'hospital', distance: '—', coordinates: { lat: -1.8038, lng: 37.6242 }, phone: '+254 700 100016', emergencyPhone: '999', isVerified: true },
  // Nyandarua
  { id: 'fac-nyd-01', name: 'JM Memorial Hospital - Ol Kalou', licenseNumber: 'KMPDC-NYD-001', type: 'hospital', distance: '—', coordinates: { lat: -0.2747, lng: 36.3784 }, phone: '+254 700 100017', emergencyPhone: '999', isVerified: true },
  // Nyeri
  { id: 'fac-nyr-01', name: 'Nyeri County Referral Hospital', licenseNumber: 'KMPDC-NYR-001', type: 'hospital', distance: '—', coordinates: { lat: -0.4201, lng: 36.9476 }, phone: '+254 700 100018', emergencyPhone: '999', isVerified: true },
  // Kirinyaga
  { id: 'fac-krn-01', name: 'Kerugoya County Referral Hospital', licenseNumber: 'KMPDC-KRN-001', type: 'hospital', distance: '—', coordinates: { lat: -0.4986, lng: 37.2839 }, phone: '+254 700 100019', emergencyPhone: '999', isVerified: true },
  // Murang'a
  { id: 'fac-mrg-01', name: "Murang'a County Referral Hospital", licenseNumber: 'KMPDC-MRG-001', type: 'hospital', distance: '—', coordinates: { lat: -0.7841, lng: 37.0399 }, phone: '+254 700 100020', emergencyPhone: '999', isVerified: true },
  // Kiambu
  { id: 'fac-kmb-01', name: 'Kiambu Level 5 Hospital', licenseNumber: 'KMPDC-KMB-001', type: 'hospital', distance: '—', coordinates: { lat: -1.1714, lng: 36.8356 }, phone: '+254 700 100021', emergencyPhone: '999', isVerified: true },
  // Turkana
  { id: 'fac-trk-01', name: 'Lodwar County Referral Hospital', licenseNumber: 'KMPDC-TRK-001', type: 'hospital', distance: '—', coordinates: { lat: 3.1191, lng: 35.5973 }, phone: '+254 700 100022', emergencyPhone: '999', isVerified: true },
  // West Pokot
  { id: 'fac-wpk-01', name: 'Kapenguria County Referral Hospital', licenseNumber: 'KMPDC-WPK-001', type: 'hospital', distance: '—', coordinates: { lat: 1.2389, lng: 35.1136 }, phone: '+254 700 100023', emergencyPhone: '999', isVerified: true },
  // Samburu
  { id: 'fac-smb-01', name: 'Maralal County Referral Hospital', licenseNumber: 'KMPDC-SMB-001', type: 'hospital', distance: '—', coordinates: { lat: 1.0954, lng: 36.6981 }, phone: '+254 700 100024', emergencyPhone: '999', isVerified: true },
  // Trans Nzoia
  { id: 'fac-tnz-01', name: 'Kitale County Referral Hospital', licenseNumber: 'KMPDC-TNZ-001', type: 'hospital', distance: '—', coordinates: { lat: 1.0157, lng: 35.0062 }, phone: '+254 700 100025', emergencyPhone: '999', isVerified: true },
  // Uasin Gishu
  { id: 'fac-usg-01', name: 'Moi Teaching & Referral Hospital', licenseNumber: 'KMPDC-USG-001', type: 'hospital', distance: '—', coordinates: { lat: 0.5167, lng: 35.2833 }, phone: '+254 53 2033471', emergencyPhone: '999', isVerified: true },
  // Elgeyo Marakwet
  { id: 'fac-elm-01', name: 'Iten County Referral Hospital', licenseNumber: 'KMPDC-ELM-001', type: 'hospital', distance: '—', coordinates: { lat: 0.6700, lng: 35.5100 }, phone: '+254 700 100026', emergencyPhone: '999', isVerified: true },
  // Nandi
  { id: 'fac-nnd-01', name: 'Kapsabet County Referral Hospital', licenseNumber: 'KMPDC-NND-001', type: 'hospital', distance: '—', coordinates: { lat: 0.2031, lng: 35.1050 }, phone: '+254 700 100027', emergencyPhone: '999', isVerified: true },
  // Baringo
  { id: 'fac-brg-01', name: 'Kabarnet County Referral Hospital', licenseNumber: 'KMPDC-BRG-001', type: 'hospital', distance: '—', coordinates: { lat: 0.4919, lng: 35.7431 }, phone: '+254 700 100028', emergencyPhone: '999', isVerified: true },
  // Laikipia
  { id: 'fac-lkp-01', name: 'Nanyuki Teaching & Referral Hospital', licenseNumber: 'KMPDC-LKP-001', type: 'hospital', distance: '—', coordinates: { lat: 0.0167, lng: 37.0667 }, phone: '+254 700 100029', emergencyPhone: '999', isVerified: true },
  // Nakuru
  { id: 'fac-nku-01', name: 'Nakuru Level 5 Hospital', licenseNumber: 'KMPDC-NKU-001', type: 'hospital', distance: '—', coordinates: { lat: -0.3031, lng: 36.0800 }, phone: '+254 700 100030', emergencyPhone: '999', isVerified: true },
  // Narok
  { id: 'fac-nrk-01', name: 'Narok County Referral Hospital', licenseNumber: 'KMPDC-NRK-001', type: 'hospital', distance: '—', coordinates: { lat: -1.0833, lng: 35.8667 }, phone: '+254 700 100031', emergencyPhone: '999', isVerified: true },
  // Kajiado
  { id: 'fac-kjd-01', name: 'Kajiado County Referral Hospital', licenseNumber: 'KMPDC-KJD-001', type: 'hospital', distance: '—', coordinates: { lat: -1.8528, lng: 36.7770 }, phone: '+254 700 100032', emergencyPhone: '999', isVerified: true },
  // Kericho
  { id: 'fac-krc-01', name: 'Kericho County Referral Hospital', licenseNumber: 'KMPDC-KRC-001', type: 'hospital', distance: '—', coordinates: { lat: -0.3689, lng: 35.2831 }, phone: '+254 700 100033', emergencyPhone: '999', isVerified: true },
  // Bomet
  { id: 'fac-bmt-01', name: 'Longisa County Referral Hospital', licenseNumber: 'KMPDC-BMT-001', type: 'hospital', distance: '—', coordinates: { lat: -0.7833, lng: 35.3417 }, phone: '+254 700 100034', emergencyPhone: '999', isVerified: true },
  // Kakamega
  { id: 'fac-kkm-01', name: 'Kakamega County General Hospital', licenseNumber: 'KMPDC-KKM-001', type: 'hospital', distance: '—', coordinates: { lat: 0.2827, lng: 34.7519 }, phone: '+254 700 100035', emergencyPhone: '999', isVerified: true },
  // Vihiga
  { id: 'fac-vhg-01', name: 'Vihiga County Referral Hospital', licenseNumber: 'KMPDC-VHG-001', type: 'hospital', distance: '—', coordinates: { lat: 0.0764, lng: 34.7222 }, phone: '+254 700 100036', emergencyPhone: '999', isVerified: true },
  // Bungoma
  { id: 'fac-bgm-01', name: 'Bungoma County Referral Hospital', licenseNumber: 'KMPDC-BGM-001', type: 'hospital', distance: '—', coordinates: { lat: 0.5635, lng: 34.5606 }, phone: '+254 700 100037', emergencyPhone: '999', isVerified: true },
  // Busia
  { id: 'fac-bsa-01', name: 'Busia County Referral Hospital', licenseNumber: 'KMPDC-BSA-001', type: 'hospital', distance: '—', coordinates: { lat: 0.4608, lng: 34.1115 }, phone: '+254 700 100038', emergencyPhone: '999', isVerified: true },
  // Siaya
  { id: 'fac-sya-01', name: 'Siaya County Referral Hospital', licenseNumber: 'KMPDC-SYA-001', type: 'hospital', distance: '—', coordinates: { lat: 0.0608, lng: 34.2880 }, phone: '+254 700 100039', emergencyPhone: '999', isVerified: true },
  // Kisumu
  { id: 'fac-ksm-01', name: 'Jaramogi Oginga Odinga Teaching & Referral Hospital', licenseNumber: 'KMPDC-KSM-001', type: 'hospital', distance: '—', coordinates: { lat: -0.0917, lng: 34.7679 }, phone: '+254 700 100040', emergencyPhone: '999', isVerified: true },
  // Homa Bay
  { id: 'fac-hmb-01', name: 'Homa Bay County Teaching & Referral Hospital', licenseNumber: 'KMPDC-HMB-001', type: 'hospital', distance: '—', coordinates: { lat: -0.5273, lng: 34.4571 }, phone: '+254 700 100041', emergencyPhone: '999', isVerified: true },
  // Migori
  { id: 'fac-mgr-01', name: 'Migori County Referral Hospital', licenseNumber: 'KMPDC-MGR-001', type: 'hospital', distance: '—', coordinates: { lat: -1.0634, lng: 34.4731 }, phone: '+254 700 100042', emergencyPhone: '999', isVerified: true },
  // Kisii
  { id: 'fac-kss-01', name: 'Kisii Teaching & Referral Hospital', licenseNumber: 'KMPDC-KSS-001', type: 'hospital', distance: '—', coordinates: { lat: -0.6817, lng: 34.7720 }, phone: '+254 700 100043', emergencyPhone: '999', isVerified: true },
  // Nyamira
  { id: 'fac-nym-01', name: 'Nyamira County Referral Hospital', licenseNumber: 'KMPDC-NYM-001', type: 'hospital', distance: '—', coordinates: { lat: -0.5633, lng: 34.9358 }, phone: '+254 700 100044', emergencyPhone: '999', isVerified: true },
];

// Haversine distance in km
function distanceKm(a: { lat: number; lng: number }, b: { lat: number; lng: number }): number {
  const R = 6371;
  const toRad = (d: number) => (d * Math.PI) / 180;
  const dLat = toRad(b.lat - a.lat);
  const dLng = toRad(b.lng - a.lng);
  const lat1 = toRad(a.lat);
  const lat2 = toRad(b.lat);
  const h = Math.sin(dLat / 2) ** 2 + Math.sin(dLng / 2) ** 2 * Math.cos(lat1) * Math.cos(lat2);
  return 2 * R * Math.asin(Math.sqrt(h));
}

export function withDistances(userLocation: { lat: number; lng: number }): HealthFacility[] {
  return demoFacilities
    .map((f) => {
      const km = distanceKm(userLocation, f.coordinates);
      return { ...f, distance: km < 1 ? `${(km * 1000).toFixed(0)} m` : `${km.toFixed(1)} km` };
    })
    .sort((a, b) => parseFloat(a.distance) - parseFloat(b.distance));
}

export const getNearestFacility = (): HealthFacility => demoFacilities[0];
export const getFacilityById = (id: string): HealthFacility | undefined => demoFacilities.find((f) => f.id === id);
export const getFacilitiesByType = (type: 'hospital' | 'clinic' | 'dispensary'): HealthFacility[] => demoFacilities.filter((f) => f.type === type);
export const getVerifiedFacilities = (): HealthFacility[] => demoFacilities.filter((f) => f.isVerified);
