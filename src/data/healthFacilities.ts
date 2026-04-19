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
  { id: 'fac-mrg-01', county: 'Murang\u2019a', name: 'Murang\u2019a County Referral Hospital', licenseNumber: 'KMPDC-MRG-001', type: 'hospital', distance: '—', coordinates: { lat: -0.7841, lng: 37.0399 }, phone: '+254 700 100020', emergencyPhone: '999', isVerified: true },
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

  // ===== Clinics (sample across counties) =====
  { id: 'cln-nrb-01', county: 'Nairobi', name: 'Westlands Health Clinic', licenseNumber: 'KMPDC-CL-NRB-001', type: 'clinic', distance: '—', coordinates: { lat: -1.2676, lng: 36.8108 }, phone: '+254 711 200001', emergencyPhone: '999', isVerified: true },
  { id: 'cln-nrb-02', county: 'Nairobi', name: 'Eastleigh Family Clinic', licenseNumber: 'KMPDC-CL-NRB-002', type: 'clinic', distance: '—', coordinates: { lat: -1.2742, lng: 36.8527 }, phone: '+254 711 200002', emergencyPhone: '999', isVerified: true },
  { id: 'cln-msa-01', county: 'Mombasa', name: 'Nyali Medical Clinic', licenseNumber: 'KMPDC-CL-MSA-001', type: 'clinic', distance: '—', coordinates: { lat: -4.0316, lng: 39.7100 }, phone: '+254 711 200003', emergencyPhone: '999', isVerified: true },
  { id: 'cln-ksm-01', county: 'Kisumu', name: 'Milimani Health Clinic', licenseNumber: 'KMPDC-CL-KSM-001', type: 'clinic', distance: '—', coordinates: { lat: -0.1003, lng: 34.7556 }, phone: '+254 711 200004', emergencyPhone: '999', isVerified: true },
  { id: 'cln-nku-01', county: 'Nakuru', name: 'Section 58 Clinic', licenseNumber: 'KMPDC-CL-NKU-001', type: 'clinic', distance: '—', coordinates: { lat: -0.2867, lng: 36.0667 }, phone: '+254 711 200005', emergencyPhone: '999', isVerified: true },
  { id: 'cln-usg-01', county: 'Uasin Gishu', name: 'Eldoret West Clinic', licenseNumber: 'KMPDC-CL-USG-001', type: 'clinic', distance: '—', coordinates: { lat: 0.5210, lng: 35.2697 }, phone: '+254 711 200006', emergencyPhone: '999', isVerified: true },
  { id: 'cln-kmb-01', county: 'Kiambu', name: 'Thika Town Clinic', licenseNumber: 'KMPDC-CL-KMB-001', type: 'clinic', distance: '—', coordinates: { lat: -1.0386, lng: 37.0834 }, phone: '+254 711 200007', emergencyPhone: '999', isVerified: true },
  { id: 'cln-mck-01', county: 'Machakos', name: 'Athi River Family Clinic', licenseNumber: 'KMPDC-CL-MCK-001', type: 'clinic', distance: '—', coordinates: { lat: -1.4544, lng: 36.9785 }, phone: '+254 711 200008', emergencyPhone: '999', isVerified: true },
  { id: 'cln-kjd-01', county: 'Kajiado', name: 'Ngong Medical Clinic', licenseNumber: 'KMPDC-CL-KJD-001', type: 'clinic', distance: '—', coordinates: { lat: -1.3525, lng: 36.6553 }, phone: '+254 711 200009', emergencyPhone: '999', isVerified: true },
  { id: 'cln-mru-01', county: 'Meru', name: 'Maua Health Clinic', licenseNumber: 'KMPDC-CL-MRU-001', type: 'clinic', distance: '—', coordinates: { lat: 0.2333, lng: 37.9333 }, phone: '+254 711 200010', emergencyPhone: '999', isVerified: true },
  { id: 'cln-kkm-01', county: 'Kakamega', name: 'Mumias Family Clinic', licenseNumber: 'KMPDC-CL-KKM-001', type: 'clinic', distance: '—', coordinates: { lat: 0.3367, lng: 34.4878 }, phone: '+254 711 200011', emergencyPhone: '999', isVerified: true },
  { id: 'cln-bgm-01', county: 'Bungoma', name: 'Webuye Town Clinic', licenseNumber: 'KMPDC-CL-BGM-001', type: 'clinic', distance: '—', coordinates: { lat: 0.6086, lng: 34.7700 }, phone: '+254 711 200012', emergencyPhone: '999', isVerified: true },
  { id: 'cln-klf-01', county: 'Kilifi', name: 'Malindi Town Clinic', licenseNumber: 'KMPDC-CL-KLF-001', type: 'clinic', distance: '—', coordinates: { lat: -3.2175, lng: 40.1191 }, phone: '+254 711 200013', emergencyPhone: '999', isVerified: true },
  { id: 'cln-grs-01', county: 'Garissa', name: 'Garissa Town Clinic', licenseNumber: 'KMPDC-CL-GRS-001', type: 'clinic', distance: '—', coordinates: { lat: -0.4569, lng: 39.6583 }, phone: '+254 711 200014', emergencyPhone: '999', isVerified: true },
  { id: 'cln-nyr-01', county: 'Nyeri', name: 'Karatina Clinic', licenseNumber: 'KMPDC-CL-NYR-001', type: 'clinic', distance: '—', coordinates: { lat: -0.4833, lng: 37.1333 }, phone: '+254 711 200015', emergencyPhone: '999', isVerified: true },

  // ===== Dispensaries (sample across counties) =====
  { id: 'dsp-trk-01', county: 'Turkana', name: 'Kakuma Dispensary', licenseNumber: 'MOH-DSP-TRK-001', type: 'dispensary', distance: '—', coordinates: { lat: 3.7167, lng: 34.8667 }, phone: '+254 722 300001', emergencyPhone: '999', isVerified: true },
  { id: 'dsp-mrs-01', county: 'Marsabit', name: 'Loiyangalani Dispensary', licenseNumber: 'MOH-DSP-MRS-001', type: 'dispensary', distance: '—', coordinates: { lat: 2.7536, lng: 36.7164 }, phone: '+254 722 300002', emergencyPhone: '999', isVerified: true },
  { id: 'dsp-wjr-01', county: 'Wajir', name: 'Habaswein Dispensary', licenseNumber: 'MOH-DSP-WJR-001', type: 'dispensary', distance: '—', coordinates: { lat: 1.0167, lng: 39.4833 }, phone: '+254 722 300003', emergencyPhone: '999', isVerified: true },
  { id: 'dsp-mnd-01', county: 'Mandera', name: 'El Wak Dispensary', licenseNumber: 'MOH-DSP-MND-001', type: 'dispensary', distance: '—', coordinates: { lat: 2.8167, lng: 40.9333 }, phone: '+254 722 300004', emergencyPhone: '999', isVerified: true },
  { id: 'dsp-tnr-01', county: 'Tana River', name: 'Garsen Dispensary', licenseNumber: 'MOH-DSP-TNR-001', type: 'dispensary', distance: '—', coordinates: { lat: -2.2667, lng: 40.1167 }, phone: '+254 722 300005', emergencyPhone: '999', isVerified: true },
  { id: 'dsp-lmu-01', county: 'Lamu', name: 'Mpeketoni Dispensary', licenseNumber: 'MOH-DSP-LMU-001', type: 'dispensary', distance: '—', coordinates: { lat: -2.3500, lng: 40.6833 }, phone: '+254 722 300006', emergencyPhone: '999', isVerified: true },
  { id: 'dsp-smb-01', county: 'Samburu', name: 'Baragoi Dispensary', licenseNumber: 'MOH-DSP-SMB-001', type: 'dispensary', distance: '—', coordinates: { lat: 1.7833, lng: 36.7833 }, phone: '+254 722 300007', emergencyPhone: '999', isVerified: true },
  { id: 'dsp-wpk-01', county: 'West Pokot', name: 'Sigor Dispensary', licenseNumber: 'MOH-DSP-WPK-001', type: 'dispensary', distance: '—', coordinates: { lat: 1.4833, lng: 35.4833 }, phone: '+254 722 300008', emergencyPhone: '999', isVerified: true },
  { id: 'dsp-iso-01', county: 'Isiolo', name: 'Merti Dispensary', licenseNumber: 'MOH-DSP-ISO-001', type: 'dispensary', distance: '—', coordinates: { lat: 1.0667, lng: 38.6500 }, phone: '+254 722 300009', emergencyPhone: '999', isVerified: true },
  { id: 'dsp-ktu-01', county: 'Kitui', name: 'Mutomo Dispensary', licenseNumber: 'MOH-DSP-KTU-001', type: 'dispensary', distance: '—', coordinates: { lat: -1.8500, lng: 38.2000 }, phone: '+254 722 300010', emergencyPhone: '999', isVerified: true },
  { id: 'dsp-mku-01', county: 'Makueni', name: 'Kibwezi Dispensary', licenseNumber: 'MOH-DSP-MKU-001', type: 'dispensary', distance: '—', coordinates: { lat: -2.4136, lng: 37.9706 }, phone: '+254 722 300011', emergencyPhone: '999', isVerified: true },
  { id: 'dsp-nrk-01', county: 'Narok', name: 'Loita Dispensary', licenseNumber: 'MOH-DSP-NRK-001', type: 'dispensary', distance: '—', coordinates: { lat: -1.4167, lng: 35.7333 }, phone: '+254 722 300012', emergencyPhone: '999', isVerified: true },
  { id: 'dsp-bsa-01', county: 'Busia', name: 'Funyula Dispensary', licenseNumber: 'MOH-DSP-BSA-001', type: 'dispensary', distance: '—', coordinates: { lat: 0.2333, lng: 34.0500 }, phone: '+254 722 300013', emergencyPhone: '999', isVerified: true },
  { id: 'dsp-hmb-01', county: 'Homa Bay', name: 'Mbita Dispensary', licenseNumber: 'MOH-DSP-HMB-001', type: 'dispensary', distance: '—', coordinates: { lat: -0.4286, lng: 34.2056 }, phone: '+254 722 300014', emergencyPhone: '999', isVerified: true },
  { id: 'dsp-tta-01', county: 'Taita Taveta', name: 'Mwatate Dispensary', licenseNumber: 'MOH-DSP-TTA-001', type: 'dispensary', distance: '—', coordinates: { lat: -3.5000, lng: 38.3833 }, phone: '+254 722 300015', emergencyPhone: '999', isVerified: true },
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
