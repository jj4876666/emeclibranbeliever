import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Search, AlertTriangle, CheckCircle2, Volume2 } from 'lucide-react';
import { AllergyManager, PatientAllergy } from './AllergyManager';

// Common food → likely allergens map (used to cross-check user input).
const allergenDatabase: Record<string, string[]> = {
  bread: ['wheat', 'gluten'], cake: ['wheat', 'gluten', 'milk', 'eggs'], pasta: ['wheat', 'gluten', 'eggs'],
  pizza: ['wheat', 'gluten', 'milk'], cookies: ['wheat', 'gluten', 'milk', 'eggs', 'nuts'],
  chocolate: ['milk', 'soy', 'nuts'], 'ice cream': ['milk', 'eggs', 'nuts'], cheese: ['milk'],
  yogurt: ['milk'], butter: ['milk'], 'scrambled eggs': ['eggs'], omelette: ['eggs'],
  mayonnaise: ['eggs'], 'peanut butter': ['peanuts', 'nuts'], cashew: ['nuts'], almond: ['nuts'],
  fish: ['fish'], tilapia: ['fish'], salmon: ['fish'], prawns: ['shellfish'], crab: ['shellfish'],
  lobster: ['shellfish'], milk: ['milk'], soy: ['soy'], tofu: ['soy'], 'soy sauce': ['soy', 'wheat'],
  ugali: [], rice: [], chapati: ['wheat', 'gluten'], mandazi: ['wheat', 'gluten', 'milk', 'eggs'],
  samosa: ['wheat', 'gluten'], githeri: [], beans: [], 'sukuma wiki': [], mango: [], banana: [],
  pineapple: [], beef: [], chicken: ['eggs'], pork: [], goat: [], 'wheat flour': ['wheat', 'gluten'],
  honey: [], peanuts: ['peanuts', 'nuts'], walnut: ['nuts'], strawberry: [],
};

interface AllergyCheckerProps {
  userAllergies?: string[]; // legacy fallback (e.g. from demo profile)
}

export function AllergyChecker({ userAllergies: legacy }: AllergyCheckerProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [savedAllergies, setSavedAllergies] = useState<PatientAllergy[]>([]);
  const [result, setResult] = useState<{ safe: boolean; warnings: string[]; matched: PatientAllergy[]; food: string } | null>(null);

  // Build list of allergens to check against (user's saved DB list, lowercased)
  const myAllergenTerms = savedAllergies.length
    ? savedAllergies.map((a) => a.allergen.toLowerCase())
    : (legacy || []).map((a) => a.toLowerCase());

  const checkFood = (food: string) => {
    const f = food.trim().toLowerCase();
    if (!f) return;
    const knownAllergens = allergenDatabase[f] || [];
    // Match: direct allergen-name match OR shared allergen group
    const matched = savedAllergies.filter((a) => {
      const t = a.allergen.toLowerCase();
      return f.includes(t) || t.includes(f) || knownAllergens.some((k) => t.includes(k) || k.includes(t));
    });
    const legacyHits = legacy?.filter((a) => {
      const t = a.toLowerCase();
      return f.includes(t) || t.includes(f) || knownAllergens.some((k) => t.includes(k) || k.includes(t));
    }) || [];
    const warnings = [
      ...matched.map((m) => `${m.allergen} (${m.severity})`),
      ...legacyHits,
    ];
    setResult({
      safe: warnings.length === 0,
      warnings,
      matched,
      food: f,
    });
  };

  const speakResult = () => {
    if (!result || typeof window === 'undefined' || !window.speechSynthesis) return;
    const msg = result.safe
      ? `${result.food} appears safe based on your saved allergies.`
      : `Warning: ${result.food} may contain ${result.warnings.join(', ')}. Avoid this food.`;
    const u = new SpeechSynthesisUtterance(msg);
    window.speechSynthesis.speak(u);
  };

  return (
    <div className="space-y-6">
      <AllergyManager onChange={setSavedAllergies} />

      <Card className="border-0 shadow-elegant">
        <CardHeader>
          <CardTitle className="flex items-center gap-2"><Search className="w-5 h-5" /> Food Safety Check</CardTitle>
          <CardDescription>
            Type a food name to see if it might trigger any of your saved allergies.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <form onSubmit={(e) => { e.preventDefault(); checkFood(searchTerm); }} className="flex gap-2">
            <Input value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="e.g. chapati, fish, peanut butter" maxLength={60} />
            <Button type="submit"><Search className="w-4 h-4" /></Button>
          </form>

          {myAllergenTerms.length === 0 && (
            <p className="text-sm text-muted-foreground italic">
              Add at least one allergy above for the checker to give you a meaningful result.
            </p>
          )}

          {result && (
            <Alert className={result.safe ? 'border-success/40 bg-success/5' : 'border-destructive/40 bg-destructive/5'}>
              {result.safe ? <CheckCircle2 className="w-4 h-4 text-success" /> : <AlertTriangle className="w-4 h-4 text-destructive" />}
              <AlertTitle className="capitalize">
                {result.safe ? `${result.food} looks safe for you` : `Warning: ${result.food}`}
              </AlertTitle>
              <AlertDescription className="space-y-2">
                {result.safe ? (
                  <p>No matches against your saved allergy profile. Always double-check ingredient labels.</p>
                ) : (
                  <>
                    <p>This food may contain or be related to allergens you reported:</p>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {result.warnings.map((w, i) => (
                        <Badge key={i} variant="destructive" className="text-xs">{w}</Badge>
                      ))}
                    </div>
                  </>
                )}
                <Button size="sm" variant="ghost" onClick={speakResult} className="mt-2">
                  <Volume2 className="w-3 h-3 mr-1" /> Read aloud
                </Button>
              </AlertDescription>
            </Alert>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
