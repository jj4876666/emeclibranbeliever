import { HealthFacility } from '@/types/emec';

// Registered health facilities across Kenya's 47 counties
export const demoFacilities: HealthFacility[] = [
  { id: 'fac-nrb-01', county: 'Nairobi', name: 'Kenyatta National Hospital', licenseNumber: 'KMPDC-NRB-001', type: 'hospital', distance: '—', coordinates: { lat: -1.3013, lng: 36.8073 }, phone: '+254 20 2726300', emergencyPhone: '999', isVerified: true },
  { id: 'fac-nrb-02', county: 'Nairobi', name: 'Mbagathi County Hospital', licenseNumber: 'KMPDC-NRB-002', type: 'hospital', distance: '—', coordinates: { lat: -1.3110, lng: 36.7820 }, phone: '+254 20 2724712', emergencyPhone: '999', isVerified: true },
  { id: 'fac-nrb-03', county: 'Nairobi', name: 'Mama Lucy Kibaki Hospital', licenseNumber: 'KMPDC-NRB-003', type: 'hospital', distance: '—', coordinates: { lat: -1.2774, lng: 36.9100 }, phone: '+254 20 8001234', emergencyPhone: '999', isVerified: true },
  { id: 'fac-msa-01', county: 'Mombasa', name: 'Coast General Teaching & Referral Hospital', licenseNumber: 'KMPDC-MSA-001', type: 'hospital', distance: '—', coordinates: { lat: -4.0566, lng: 39.6657 }, phone: '+254 41 2314204', emergencyPhone: '999', isVerified: true },
  { id: 'fac-kwl-01', county: 'Kwale', name: 'Kwale County Referral Hospital', licenseNumber: 'KMPDC-KWL-001', type: 'hospital', distance: '—', coordinates: { lat: -4.1747, lng: 39.4521 }, phone: '+254 700 100001', emergencyPhone: '999', isVerified: true },
  { id: 'fac-klf-01', county: 'Kilifi', name: 'Kilifi County Hospital', licenseNumber: 'KMPDC-KLF-001', type: 'hospital', distance: '—', coordinates: { lat: -3.6305, lng: 39.8499 }, phone: '+254 700 100002', emergencyPhone: '999', isVerified: true },
  { id: 'fac-tnr-01', county: 'Tana River', name: 'Hola County Referral Hospital', licenseNumber: 'KMPDC-TNR-001', type: 'hospital', distance: '—', coordinates: { lat: -1.5000, lng: 40.0333 }, phone: '+254 700 100003', emergencyPhone: '999', isVerified: true },
  { id: 'fac-lmu-01', county: 'Lamu', name: 'King Fahad County Hospital', licenseNumber: 'KMPDC-LMU-001', type: 'hospital', distance: '—', coordinates: { lat: -2.2696, lng: 40.9020 }, phone: '+254 700 100004', emergencyPhone: '999', isVerified: true },
  { id: 'fac-tta-01', county: 'Taita Taveta', name: 'Moi County Referral Hospital - Voi', licenseNumber: 'KMPDC-TTA-001', type: 'hospital', distance: '—', coordinates: { lat: -3.3963, lng: 38.5560 }, phone: '+254 700 100005', emergencyPhone: '999', isVerified: true },
  { id: 'fac-grs-01', county: 'Garissa', name: 'Garissa County Referral Hospital', licenseNumber: 'KMPDC-GRS-001', type: 'hospital', distance: '—', coordinates: { lat: -0.4536, lng: 39.6401 }, phone: '+254 700 100006', emergencyPhone: '999', isVerified: true },
  { id: 'fac-wjr-01', county: 'Wajir', name: 'Wajir County Referral Hospital', licenseNumber: 'KMPDC-WJR-001', type: 'hospital', distance: '—', coordinates: { lat: 1.7471, lng: 40.0573 }, phone: '+254 700 100007', emergencyPhone: '999', isVerified: true },
  { id: 'fac-mnd-01', county: 'Mandera', name: 'Mandera County Referral Hospital', licenseNumber: 'KMPDC-MND-001', type: 'hospital', distance: '—', coordinates: { lat: 3.9366, lng: 41.8670 }, phone: '+254 700 100008', emergencyPhone: '999', isVerified: true },
  { id: 'fac-mrs-01', county: 'Marsabit', name: 'Marsabit County Referral Hospital', licenseNumber: 'KMPDC-MRS-001', type: 'hospital', distance: '—', coordinates: { lat: 2.3349, lng: 37.9899 }, phone: '+254 700 100009', emergencyPhone: '999', isVerified: true },
  { id: 'fac-iso-01', county: 'Isiolo', name: 'Isiolo County Referral Hospital', licenseNumber: 'KMPDC-ISO-001', type: 'hospital', distance: '—', coordinates: { lat: 0.3546, lng: 37.5822 }, phone: '+254 700 100010', emergencyPhone: '999', isVerified: true },
  { id: 'fac-mru-01', county: 'Meru', name: 'Meru Teaching & Referral Hospital', licenseNumber: 'KMPDC-MRU-001', type: 'hospital', distance: '—', coordinates: { lat: 0.0463, lng: 37.6559 }, phone: '+254 700 100011', emergencyPhone: '999', isVerified: true },
  { id: 'fac-thn-01', county: 'Tharaka-Nithi', name: 'Chuka County Referral Hospital', licenseNumber: 'KMPDC-THN-001', type: 'hospital', distance: '—', coordinates: { lat: -0.3336, lng: 37.6493 }, phone: '+254 700 100012', emergencyPhone: '999', isVerified: true },
  { id: 'fac-emb-01', county: 'Embu', name: 'Embu Level 5 Hospital', licenseNumber: 'KMPDC-EMB-001', type: 'hospital', distance: '—', coordinates: { lat: -0.5310, lng: 37.4574 }, phone: '+254 700 100013', emergencyPhone: '999', isVerified: true },
  { id: 'fac-ktu-01', county: 'Kitui', name: 'Kitui County Referral Hospital', licenseNumber: 'KMPDC-KTU-001', type: 'hospital', distance: '—', coordinates: { lat: -1.3667, lng: 38.0106 }, phone: '+254 700 100014', emergencyPhone: '999', isVerified: true },
  { id: 'fac-mck-01', county: 'Machakos', name: 'Machakos Level 5 Hospital', licenseNumber: 'KMPDC-MCK-001', type: 'hospital', distance: '—', coordinates: { lat: -1.5177, lng: 37.2634 }, phone: '+254 700 100015', emergencyPhone: '999', isVerified: true },
  { id: 'fac-mku-01', county: 'Makueni', name: 'Makueni County Referral Hospital', licenseNumber: 'KMPDC-MKU-001', type: 'hospital', distance: '—', coordinates: { lat: -1.8038, lng: 37.6242 }, phone: '+254 700 100016', emergencyPhone: '999', isVerified: true },
  { id: 'fac-nyd-01', county: 'Nyandarua', name: 'JM Memorial Hospital - Ol Kalou', licenseNumber: 'KMPDC-NYD-001', type: 'hospital', distance: '—', coordinates: { lat: -0.2747, lng: 36.3784 }, phone: '+254 700 100017', emergencyPhone: '999', isVerified: true },
  { id: 'fac-nyr-01', county: 'Nyeri', name: 'Nyeri County Referral Hospital', licenseNumber: 'KMPDC-NYR-001', type: 'hospital', distance: '—', coordinates: { lat: -0.4201, lng: 36.9476 }, phone: '+254 700 100018', emergencyPhone: '999', isVerified: true },
  { id: 'fac-krn-01', county: 'Kirinyaga', name: 'Kerugoya County Referral Hospital', licenseNumber: 'KMPDC-KRN-001', type: 'hospital', distance: '—', coordinates: { lat: -0.4986, lng: 37.2839 }, phone: '+254 700 100019', emergencyPhone: '999', isVerified: true },
  { id: 'fac-mrg-01', county: "Murang'a", name: "Murang'a County Referral Hospital", licenseNumber: 'KMPDC-MRG-001', type: 'hospital', distance: '—', coordinates: { lat: -0.7841, lng: 37.0399 }, phone: '+254 700 100020', emergencyPhone: '999', isVerified: true },
  { id: 'fac-kmb-01', county: 'Kiambu', name: 'Kiambu Level 5 Hospital', licenseNumber: 'KMPDC-KMB-001', type: 'hospital', distance: '—', coordinates: { lat: -1.1714, lng: 36.8356 }, phone: '+254 700 100021', emergencyPhone: '999', isVerified: true },
  { id: 'fac-trk-01', county: 'Turkana', name: 'Lodwar County Referral Hospital', licenseNumber: 'KMPDC-TRK-001', type: 'hospital', distance: '—', coordinates: { lat: 3.1191, lng: 35.5973 }, phone: '+254 700 100022', emergencyPhone: '999', isVerified: true },
  { id: 'fac-wpk-01', county: 'West Pokot', name: 'Kapenguria County Referral Hospital', licenseNumber: 'KMPDC-WPK-001', type: 'hospital', distance: '—', coordinates: { lat: 1.2389, lng: 35.1136 }, phone: '+254 700 100023', emergencyPhone: '999', isVerified: true },
  { id: 'fac-smb-01', county: 'Samburu', name: 'Maralal County Referral Hospital', licenseNumber: 'KMPDC-SMB-001', type: 'hospital', distance: '—', coordinates: { lat: 1.0954, lng: 36.6981 }, phone: '+254 700 100024', emergencyPhone: '999', isVerified: true },
  { id: 'fac-tnz-01', county: 'Trans Nzoia', name: 'Kitale County Referral Hospital', licenseNumber: 'KMPDC-TNZ-001', type: 'hospital', distance: '—', coordinates: { lat: 1.0157, lng: 35.0062 }, phone: '+254 700 100025', emergencyPhone: '999', isVerified: true },
  { id: 'fac-usg-01', county: 'Uasin Gishu', name: 'Moi Teaching & Referral Hospital', licenseNumber: 'KMPDC-USG-001', type: 'hospital', distance: '—', coordinates: { lat: 0.5167, lng: 35.2833 }, phone: '+254 53 2033471', emergencyPhone: '999', isVerified: true },
  { id: 'fac-elm-01', county: 'Elgeyo Marakwet', name: 'Iten County Referral Hospital', licenseNumber: 'KMPDC-ELM-001', type: 'hospital', distance: '—', coordinates: { lat: 0.6700, lng: 35.5100 }, phone: '+254 700 100026', emergencyPhone: '999', isVerified: true },
  { id: 'fac-nnd-01', county: 'Nandi', name: 'Kapsabet County Referral Hospital', licenseNumber: 'KMPDC-NND-001', type: 'hospital', distance: '—', coordinates: { lat: 0.2031, lng: 35.1050 }, phone: '+254 700 100027', emergencyPhone: '999', isVerified: true },
  { id: 'fac-brg-01', county: 'Baringo', name: 'Kabarnet County Referral Hospital', licenseNumber: 'KMPDC-BRG-001', type: 'hospital', distance: '—', coordinates: { lat: 0.4919, lng: 35.7431 }, phone: '+254 700 100028', emergencyPhone: '999', isVerified: true },
  { id: 'fac-lkp-01', county: 'Laikipia', name: 'Nanyuki Teaching & Referral Hospital', licenseNumber: 'KMPDC-LKP-001', type: 'hospital', distance: '—', coordinates: { lat: 0.0167, lng: 37.0667 }, phone: '+254 700 100029', emergencyPhone: '999', isVerified: true },
  { id: 'fac-nku-01', county: 'Nakuru', name: 'Nakuru Level 5 Hospital', licenseNumber: 'KMPDC-NKU-001', type: 'hospital', distance: '—', coordinates: { lat: -0.3031, lng: 36.0800 }, phone: '+254 700 100030', emergencyPhone: '999', isVerified: true },
  { id: 'fac-nrk-01', county: 'Narok', name: 'Narok County Referral Hospital', licenseNumber: 'KMPDC-NRK-001', type: 'hospital', distance: '—', coordinates: { lat: -1.0833, lng: 35.8667 }, phone: '+254 700 100031', emergencyPhone: '999', isVerified: true },
  { id: 'fac-kjd-01', county: 'Kajiado', name: 'Kajiado County Referral Hospital', licenseNumber: 'KMPDC-KJD-001', type: 'hospital', distance: '—', coordinates: { lat: -1.8528, lng: 36.7770 }, phone: '+254 700 100032', emergencyPhone: '999', isVerified: true },
  { id: 'fac-krc-01', county: 'Kericho', name: 'Kericho County Referral Hospital', licenseNumber: 'KMPDC-KRC-001', type: 'hospital', distance: '—', coordinates: { lat: -0.3689, lng: 35.2831 }, phone: '+254 700 100033', emergencyPhone: '999', isVerified: true },
  { id: 'fac-bmt-01', county: 'Bomet', name: 'Longisa County Referral Hospital', licenseNumber: 'KMPDC-BMT-001', type: 'hospital', distance: '—', coordinates: { lat: -0.7833, lng: 35.3417 }, phone: '+254 700 100034', emergencyPhone: '999', isVerified: true },
  { id: 'fac-kkm-01', county: 'Kakamega', name: 'Kakamega County General Hospital', licenseNumber: 'KMPDC-KKM-001', type: 'hospital', distance: '—', coordinates: { lat: 0.2827, lng: 34.7519 }, phone: '+254 700 100035', emergencyPhone: '999', isVerified: true },
  { id: 'fac-vhg-01', county: 'Vihiga', name: 'Vihiga County Referral Hospital', licenseNumber: 'KMPDC-VHG-001', type: 'hospital', distance: '—', coordinates: { lat: 0.0764, lng: 34.7222 }, phone: '+254 700 100036', emergencyPhone: '999', isVerified: true },
  { id: 'fac-bgm-01', county: 'Bungoma', name: 'Bungoma County Referral Hospital', licenseNumber: 'KMPDC-BGM-001', type: 'hospital', distance: '—', coordinates: { lat: 0.5635, lng: 34.5606 }, phone: '+254 700 100037', emergencyPhone: '999', isVerified: true },
  { id: 'fac-bsa-01', county: 'Busia', name: 'Busia County Referral Hospital', licenseNumber: 'KMPDC-BSA-001', type: 'hospital', distance: '—', coordinates: { lat: 0.4608, lng: 34.1115 }, phone: '+254 700 100038', emergencyPhone: '999', isVerified: true },
  { id: 'fac-sya-01', county: 'Siaya', name: 'Siaya County Referral Hospital', licenseNumber: 'KMPDC-SYA-001', type: 'hospital', distance: '—', coordinates: { lat: 0.0608, lng: 34.2880 }, phone: '+254 700 100039', emergencyPhone: '999', isVerified: true },
  { id: 'fac-ksm-01', county: 'Kisumu', name: 'Jaramogi Oginga Odinga Teaching & Referral Hospital', licenseNumber: 'KMPDC-KSM-001', type: 'hospital', distance: '—', coordinates: { lat: -0.0917, lng: 34.7679 }, phone: '+254 700 100040', emergencyPhone: '999', isVerified: true },
  { id: 'fac-hmb-01', county: 'Homa Bay', name: 'Homa Bay County Teaching & Referral Hospital', licenseNumber: 'KMPDC-HMB-001', type: 'hospital', distance: '—', coordinates: { lat: -0.5273, lng: 34.4571 }, phone: '+254 700 100041', emergencyPhone: '999', isVerified: true },
  { id: 'fac-mgr-01', county: 'Migori', name: 'Migori County Referral Hospital', licenseNumber: 'KMPDC-MGR-001', type: 'hospital', distance: '—', coordinates: { lat: -1.0634, lng: 34.4731 }, phone: '+254 700 100042', emergencyPhone: '999', isVerified: true },
  { id: 'fac-kss-01', county: 'Kisii', name: 'Kisii Teaching & Referral Hospital', licenseNumber: 'KMPDC-KSS-001', type: 'hospital', distance: '—', coordinates: { lat: -0.6817, lng: 34.7720 }, phone: '+254 700 100043', emergencyPhone: '999', isVerified: true },
  { id: 'fac-nym-01', county: 'Nyamira', name: 'Nyamira County Referral Hospital', licenseNumber: 'KMPDC-NYM-001', type: 'hospital', distance: '—', coordinates: { lat: -0.5633, lng: 34.9358 }, phone: '+254 700 100044', emergencyPhone: '999', isVerified: true },
];

// All 47 Kenyan counties (alphabetical) for the county filter dropdown
export const KENYA_COUNTIES = [
  'Baringo','Bomet','Bungoma','Busia','Elgeyo Marakwet','Embu','Garissa','Homa Bay','Isiolo','Kajiado',
  'Kakamega','Kericho','Kiambu','Kilifi','Kirinyaga','Kisii','Kisumu','Kitui','Kwale','Laikipia',
  'Lamu','Machakos','Makueni','Mandera','Marsabit','Meru','Migori','Mombasa','Murang\u2019a','Nairobi',
  'Nakuru','Nandi','Narok','Nyamira','Nyandarua','Nyeri','Samburu','Siaya','Taita Taveta','Tana River',
  'Tharaka-Nithi','Trans Nzoia','Turkana','Uasin Gishu','Vihiga','Wajir','West Pokot',
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
