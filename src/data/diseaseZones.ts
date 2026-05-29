// Regional disease prevalence zones for Kenya
// Sources: WHO AFRO Outbreak Bulletins & Kenya Ministry of Health (MOH) Situation Reports
// Last reviewed: 2026. Educational use only — verify current status with MOH/WHO before action.

export type ZoneSeverity = 'high' | 'moderate' | 'low' | 'monitoring';

export interface DiseaseZone {
  id: string;
  disease: string;
  county: string;
  center: [number, number]; // [lat, lng]
  radiusKm: number;
  severity: ZoneSeverity;
  cases?: string;
  source: 'WHO' | 'MOH' | 'WHO/MOH';
  lastUpdated: string;
  notes: string;
}

// Red zones = active outbreak / high prevalence
// Blue zones = monitoring / lower prevalence / recovering
export const DISEASE_ZONES: DiseaseZone[] = [
  // Cholera — recurrent outbreaks in arid & flood-prone counties
  { id: 'cholera-garissa', disease: 'Cholera', county: 'Garissa', center: [-0.453, 39.64], radiusKm: 60, severity: 'high', cases: 'Active cluster', source: 'WHO/MOH', lastUpdated: '2026-Q1', notes: 'Water & sanitation hotspot; flood-driven transmission in Tana River basin.' },
  { id: 'cholera-tana-river', disease: 'Cholera', county: 'Tana River', center: [-1.5, 40.033], radiusKm: 70, severity: 'high', source: 'MOH', lastUpdated: '2026-Q1', notes: 'Repeated outbreaks linked to seasonal flooding.' },
  { id: 'cholera-migori', disease: 'Cholera', county: 'Migori', center: [-1.063, 34.473], radiusKm: 45, severity: 'moderate', source: 'MOH', lastUpdated: '2026-Q1', notes: 'Lake Victoria basin transmission.' },
  { id: 'cholera-nairobi', disease: 'Cholera', county: 'Nairobi', center: [-1.286, 36.817], radiusKm: 25, severity: 'moderate', source: 'WHO/MOH', lastUpdated: '2026-Q1', notes: 'Informal settlements at elevated risk.' },

  // Malaria — endemic lake & coast belts
  { id: 'malaria-kisumu', disease: 'Malaria', county: 'Kisumu', center: [-0.092, 34.768], radiusKm: 55, severity: 'high', source: 'WHO', lastUpdated: '2026', notes: 'Lake-endemic zone; year-round transmission.' },
  { id: 'malaria-homa-bay', disease: 'Malaria', county: 'Homa Bay', center: [-0.527, 34.457], radiusKm: 55, severity: 'high', source: 'WHO', lastUpdated: '2026', notes: 'Highest parasite prevalence nationally.' },
  { id: 'malaria-busia', disease: 'Malaria', county: 'Busia', center: [0.461, 34.112], radiusKm: 40, severity: 'high', source: 'WHO', lastUpdated: '2026', notes: 'Lake-endemic.' },
  { id: 'malaria-kilifi', disease: 'Malaria', county: 'Kilifi', center: [-3.631, 39.85], radiusKm: 50, severity: 'moderate', source: 'WHO', lastUpdated: '2026', notes: 'Coastal endemic transmission.' },
  { id: 'malaria-kwale', disease: 'Malaria', county: 'Kwale', center: [-4.175, 39.452], radiusKm: 45, severity: 'moderate', source: 'WHO', lastUpdated: '2026', notes: 'Coastal endemic transmission.' },

  // Measles — outbreaks reported in 2024–2026 (WHO AFRO)
  { id: 'measles-mandera', disease: 'Measles', county: 'Mandera', center: [3.937, 41.867], radiusKm: 70, severity: 'high', source: 'WHO', lastUpdated: '2026-Q1', notes: 'Low coverage + cross-border movement (Somalia/Ethiopia).' },
  { id: 'measles-wajir', disease: 'Measles', county: 'Wajir', center: [1.747, 40.057], radiusKm: 70, severity: 'moderate', source: 'WHO', lastUpdated: '2026-Q1', notes: 'Nomadic populations, vaccination gaps.' },
  { id: 'measles-turkana', disease: 'Measles', county: 'Turkana', center: [3.119, 35.597], radiusKm: 80, severity: 'moderate', source: 'MOH', lastUpdated: '2026', notes: 'Refugee-host community transmission.' },

  // Mpox (Monkeypox) — recent confirmed cases (WHO 2024–2026)
  { id: 'mpox-mombasa', disease: 'Mpox', county: 'Mombasa', center: [-4.043, 39.668], radiusKm: 30, severity: 'monitoring', source: 'WHO', lastUpdated: '2026', notes: 'Port-of-entry surveillance; sporadic cases.' },
  { id: 'mpox-busia', disease: 'Mpox', county: 'Busia', center: [0.461, 34.112], radiusKm: 30, severity: 'monitoring', source: 'WHO', lastUpdated: '2026', notes: 'Border surveillance (Uganda boundary).' },

  // Rift Valley Fever — periodic outbreaks
  { id: 'rvf-marsabit', disease: 'Rift Valley Fever', county: 'Marsabit', center: [2.335, 37.99], radiusKm: 90, severity: 'monitoring', source: 'MOH', lastUpdated: '2026', notes: 'Livestock-linked; rainy season risk.' },
  { id: 'rvf-isiolo', disease: 'Rift Valley Fever', county: 'Isiolo', center: [0.354, 37.582], radiusKm: 60, severity: 'monitoring', source: 'MOH', lastUpdated: '2026', notes: 'Pastoral communities at risk.' },

  // Dengue — coastal outbreaks
  { id: 'dengue-mombasa', disease: 'Dengue', county: 'Mombasa', center: [-4.043, 39.668], radiusKm: 35, severity: 'moderate', source: 'WHO/MOH', lastUpdated: '2026', notes: 'Urban Aedes transmission, periodic upticks.' },
  { id: 'dengue-lamu', disease: 'Dengue', county: 'Lamu', center: [-2.27, 40.902], radiusKm: 30, severity: 'monitoring', source: 'MOH', lastUpdated: '2026', notes: 'Coastal surveillance.' },

  // HIV — high-prevalence counties (KENPHIA / MOH)
  { id: 'hiv-homa-bay', disease: 'HIV', county: 'Homa Bay', center: [-0.527, 34.457], radiusKm: 50, severity: 'high', cases: '~19% prevalence', source: 'MOH', lastUpdated: '2026', notes: 'Highest adult prevalence nationally.' },
  { id: 'hiv-kisumu', disease: 'HIV', county: 'Kisumu', center: [-0.092, 34.768], radiusKm: 45, severity: 'high', cases: '~17% prevalence', source: 'MOH', lastUpdated: '2026', notes: 'Lake region high burden.' },
  { id: 'hiv-siaya', disease: 'HIV', county: 'Siaya', center: [0.061, 34.288], radiusKm: 45, severity: 'high', cases: '~15% prevalence', source: 'MOH', lastUpdated: '2026', notes: 'Lake region high burden.' },

  // TB — high-burden urban
  { id: 'tb-nairobi', disease: 'Tuberculosis', county: 'Nairobi', center: [-1.286, 36.817], radiusKm: 25, severity: 'moderate', source: 'WHO', lastUpdated: '2026', notes: 'Urban high burden; informal settlements.' },
  { id: 'tb-mombasa', disease: 'Tuberculosis', county: 'Mombasa', center: [-4.043, 39.668], radiusKm: 25, severity: 'moderate', source: 'WHO', lastUpdated: '2026', notes: 'Coastal urban burden.' },
];

export const DISEASES = Array.from(new Set(DISEASE_ZONES.map((z) => z.disease))).sort();

export function severityColor(s: ZoneSeverity): string {
  switch (s) {
    case 'high': return 'hsl(0 84% 55%)';        // red zone
    case 'moderate': return 'hsl(28 92% 55%)';   // orange
    case 'low': return 'hsl(48 96% 55%)';        // yellow
    case 'monitoring': return 'hsl(217 91% 55%)'; // blue zone
  }
}

export function severityLabel(s: ZoneSeverity): string {
  switch (s) {
    case 'high': return 'High prevalence / active outbreak';
    case 'moderate': return 'Moderate prevalence';
    case 'low': return 'Low prevalence';
    case 'monitoring': return 'Under surveillance';
  }
}
