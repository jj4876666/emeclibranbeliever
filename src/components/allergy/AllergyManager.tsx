import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Plus, Trash2, AlertTriangle, ShieldCheck, Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { z } from 'zod';

export interface PatientAllergy {
  id: string;
  allergen: string;
  allergy_type: string;
  severity: 'mild' | 'moderate' | 'severe';
  reactions: string[] | null;
  notes: string | null;
}

interface AllergyManagerProps {
  onChange?: (allergies: PatientAllergy[]) => void;
}

const allergySchema = z.object({
  allergen: z.string().trim().min(1, 'Required').max(80),
  allergy_type: z.enum(['food', 'medication', 'environmental', 'insect', 'other']),
  severity: z.enum(['mild', 'moderate', 'severe']),
  reactions: z.string().max(300).optional(),
  notes: z.string().max(500).optional(),
});

const severityColor: Record<string, string> = {
  mild: 'bg-success/15 text-success border-success/30',
  moderate: 'bg-warning/15 text-warning-foreground border-warning/30',
  severe: 'bg-destructive/15 text-destructive border-destructive/30',
};

export function AllergyManager({ onChange }: AllergyManagerProps) {
  const { toast } = useToast();
  const [allergies, setAllergies] = useState<PatientAllergy[]>([]);
  const [profileId, setProfileId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [form, setForm] = useState({
    allergen: '', allergy_type: 'food', severity: 'moderate', reactions: '', notes: '',
  });

  useEffect(() => {
    let active = true;
    (async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) { setLoading(false); return; }

      const { data: profile } = await supabase
        .from('profiles').select('id').eq('user_id', user.id).maybeSingle();
      if (!profile || !active) { setLoading(false); return; }
      setProfileId(profile.id);

      const { data, error } = await supabase
        .from('allergies').select('*').eq('patient_id', profile.id).order('created_at', { ascending: false });
      if (active) {
        if (error) toast({ title: 'Could not load allergies', description: error.message, variant: 'destructive' });
        else {
          const list = (data || []) as PatientAllergy[];
          setAllergies(list);
          onChange?.(list);
        }
        setLoading(false);
      }
    })();
    return () => { active = false; };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleAdd = async () => {
    if (!profileId) {
      toast({ title: 'Sign in required', description: 'Log in to save allergies to your profile.', variant: 'destructive' });
      return;
    }
    const parsed = allergySchema.safeParse(form);
    if (!parsed.success) {
      toast({ title: 'Check the form', description: parsed.error.issues[0]?.message, variant: 'destructive' });
      return;
    }
    setSaving(true);
    const reactionsArr = form.reactions.split(',').map((s) => s.trim()).filter(Boolean);
    const { data, error } = await supabase.from('allergies').insert({
      patient_id: profileId,
      allergen: form.allergen.trim().toLowerCase(),
      allergy_type: form.allergy_type,
      severity: form.severity,
      reactions: reactionsArr.length ? reactionsArr : null,
      notes: form.notes.trim() || null,
    }).select().single();
    setSaving(false);
    if (error) {
      toast({ title: 'Could not save', description: error.message, variant: 'destructive' });
      return;
    }
    const next = [data as PatientAllergy, ...allergies];
    setAllergies(next);
    onChange?.(next);
    setForm({ allergen: '', allergy_type: 'food', severity: 'moderate', reactions: '', notes: '' });
    toast({ title: 'Allergy saved', description: `${data.allergen} added to your profile.` });
  };

  const handleDelete = async (id: string) => {
    const prev = allergies;
    setAllergies(allergies.filter((a) => a.id !== id));
    const { error } = await supabase.from('allergies').delete().eq('id', id);
    if (error) {
      setAllergies(prev);
      toast({ title: 'Could not delete', description: error.message, variant: 'destructive' });
    } else {
      const next = prev.filter((a) => a.id !== id);
      onChange?.(next);
      toast({ title: 'Removed', description: 'Allergy removed from your profile.' });
    }
  };

  if (loading) {
    return (
      <Card><CardContent className="p-8 flex items-center justify-center text-muted-foreground">
        <Loader2 className="w-5 h-5 animate-spin mr-2" /> Loading your allergies…
      </CardContent></Card>
    );
  }

  return (
    <Card className="border-0 shadow-elegant">
      <CardHeader>
        <CardTitle className="flex items-center gap-2"><ShieldCheck className="w-5 h-5 text-primary" /> Your Allergy Profile</CardTitle>
        <CardDescription>
          Add foods, medications, or other triggers that affect you. Saved securely to your medical record.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid gap-3 sm:grid-cols-2 p-4 rounded-xl bg-muted/30">
          <div className="space-y-2 sm:col-span-2">
            <Label htmlFor="allergen">Allergen *</Label>
            <Input id="allergen" placeholder="e.g. Peanuts, Penicillin, Bee stings"
              value={form.allergen} maxLength={80}
              onChange={(e) => setForm({ ...form, allergen: e.target.value })} />
          </div>
          <div className="space-y-2">
            <Label>Type</Label>
            <Select value={form.allergy_type} onValueChange={(v) => setForm({ ...form, allergy_type: v })}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="food">Food</SelectItem>
                <SelectItem value="medication">Medication</SelectItem>
                <SelectItem value="environmental">Environmental (pollen, dust)</SelectItem>
                <SelectItem value="insect">Insect sting/bite</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label>Severity</Label>
            <Select value={form.severity} onValueChange={(v) => setForm({ ...form, severity: v })}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="mild">Mild (itching, mild rash)</SelectItem>
                <SelectItem value="moderate">Moderate (hives, swelling)</SelectItem>
                <SelectItem value="severe">Severe (anaphylaxis)</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2 sm:col-span-2">
            <Label htmlFor="reactions">Reactions (comma-separated)</Label>
            <Input id="reactions" placeholder="hives, swelling, vomiting" maxLength={300}
              value={form.reactions} onChange={(e) => setForm({ ...form, reactions: e.target.value })} />
          </div>
          <div className="space-y-2 sm:col-span-2">
            <Label htmlFor="notes">Notes (optional)</Label>
            <Textarea id="notes" placeholder="Any extra context for medical staff" maxLength={500}
              value={form.notes} onChange={(e) => setForm({ ...form, notes: e.target.value })} />
          </div>
          <Button onClick={handleAdd} disabled={saving} className="sm:col-span-2">
            {saving ? <><Loader2 className="w-4 h-4 mr-2 animate-spin" /> Saving…</> : <><Plus className="w-4 h-4 mr-2" /> Add Allergy</>}
          </Button>
        </div>

        <div className="space-y-2">
          <h3 className="font-semibold text-sm flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-warning" />
            Saved allergies ({allergies.length})
          </h3>
          {allergies.length === 0 ? (
            <p className="text-sm text-muted-foreground p-4 text-center bg-muted/20 rounded-lg">
              No allergies on file. Add any above so the food checker can warn you.
            </p>
          ) : (
            allergies.map((a) => (
              <div key={a.id} className="flex items-start gap-3 p-3 rounded-xl border bg-card">
                <div className="flex-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-semibold capitalize">{a.allergen}</span>
                    <Badge variant="outline" className="text-xs capitalize">{a.allergy_type}</Badge>
                    <Badge className={`text-xs border ${severityColor[a.severity]}`}>{a.severity}</Badge>
                  </div>
                  {a.reactions && a.reactions.length > 0 && (
                    <p className="text-xs text-muted-foreground mt-1">Reactions: {a.reactions.join(', ')}</p>
                  )}
                  {a.notes && <p className="text-xs text-muted-foreground mt-1 italic">{a.notes}</p>}
                </div>
                <Button size="icon" variant="ghost" onClick={() => handleDelete(a.id)} aria-label="Delete allergy">
                  <Trash2 className="w-4 h-4 text-destructive" />
                </Button>
              </div>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  );
}
