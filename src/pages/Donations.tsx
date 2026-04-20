import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { HandHeart, Heart, Gift, Users, Smartphone, Loader2, CheckCircle2, AlertCircle } from 'lucide-react';
import { Navigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { useEffect } from 'react';
import { z } from 'zod';

const charities = [
  { id: 'charity-001', name: 'Children with Special Conditions Fund', description: 'Supporting children with disabilities across Kenya', image: '🏥' },
  { id: 'charity-002', name: 'Kenya Child Nutrition Program', description: 'Providing healthy meals to children in rural areas', image: '🍎' },
  { id: 'charity-003', name: 'Education for All Kenya', description: 'Building schools and educational resources', image: '📚' },
];

const donationSchema = z.object({
  phone: z.string().regex(/^(?:\+?254|0)?7\d{8}$/, 'Enter a valid Safaricom number e.g. 0712345678'),
  amount: z.coerce.number().int().min(10, 'Minimum donation is KES 10').max(150000, 'Max KES 150,000'),
});

interface DonorRow {
  id: string;
  donor_name: string | null;
  amount: number;
  charity_name: string | null;
  created_at: string;
}

export default function Donations() {
  const { isAuthenticated, currentUser } = useAuth();
  const { t } = useLanguage();
  const { toast } = useToast();

  const [activeTab, setActiveTab] = useState('donate');
  const [selectedCharity, setSelectedCharity] = useState<string | null>(null);
  const [amount, setAmount] = useState('500');
  const [phone, setPhone] = useState('');
  const [isPublic, setIsPublic] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [polling, setPolling] = useState<{ donationId: string; status: 'pending' | 'completed' | 'failed' } | null>(null);
  const [donorWall, setDonorWall] = useState<DonorRow[]>([]);

  useEffect(() => {
    if (activeTab !== 'wall') return;
    (async () => {
      const { data } = await supabase
        .from('donations')
        .select('id, donor_name, amount, charity_name, created_at')
        .eq('is_public', true)
        .eq('status', 'completed')
        .order('created_at', { ascending: false })
        .limit(20);
      setDonorWall((data || []) as DonorRow[]);
    })();
  }, [activeTab]);

  // Poll status while pending
  useEffect(() => {
    if (!polling || polling.status !== 'pending') return;
    const interval = setInterval(async () => {
      const { data, error } = await supabase.functions.invoke('mpesa-status', {
        body: { donation_id: polling.donationId },
      });
      if (error) return;
      const status = (data as { status: string })?.status;
      if (status === 'completed') {
        setPolling({ ...polling, status: 'completed' });
        toast({ title: 'Donation received! 🎉', description: 'Thank you for your generosity.' });
      } else if (status === 'failed') {
        setPolling({ ...polling, status: 'failed' });
        toast({ title: 'Payment not completed', description: 'You can try again.', variant: 'destructive' });
      }
    }, 4000);
    // Stop polling after 2 minutes
    const timeout = setTimeout(() => clearInterval(interval), 120000);
    return () => { clearInterval(interval); clearTimeout(timeout); };
  }, [polling, toast]);

  if (!isAuthenticated) return <Navigate to="/login" replace />;

  const handleDonate = async () => {
    if (!selectedCharity) {
      toast({ title: 'Choose a cause', description: 'Pick a charity to donate to.', variant: 'destructive' });
      return;
    }
    const parsed = donationSchema.safeParse({ phone, amount });
    if (!parsed.success) {
      toast({ title: 'Check the form', description: parsed.error.issues[0]?.message, variant: 'destructive' });
      return;
    }
    const charity = charities.find((c) => c.id === selectedCharity)!;

    setSubmitting(true);
    try {
      // 1. Create pending donation row (RLS: must match logged-in donor profile)
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Not signed in');
      const { data: profile } = await supabase.from('profiles').select('id, full_name').eq('user_id', user.id).maybeSingle();
      if (!profile) throw new Error('Profile not found');

      const { data: donation, error: insErr } = await supabase.from('donations').insert({
        donor_id: profile.id,
        donor_name: isPublic ? (profile.full_name || 'EMEC Donor') : 'Anonymous',
        amount: parsed.data.amount,
        currency: 'KES',
        payment_method: 'mpesa',
        is_public: isPublic,
        charity_name: charity.name,
        phone_number: parsed.data.phone,
        status: 'pending',
      }).select().single();
      if (insErr) throw insErr;

      // 2. Trigger STK push
      const { data, error } = await supabase.functions.invoke('mpesa-stk-push', {
        body: {
          phone: parsed.data.phone,
          amount: parsed.data.amount,
          charity_name: charity.name,
          donation_id: donation.id,
        },
      });
      if (error) throw error;
      const res = data as { success?: boolean; error?: string; code?: string; message?: string };
      if (res.code === 'MPESA_NOT_CONFIGURED') {
        toast({
          title: 'M-Pesa not yet configured',
          description: 'The administrator needs to add Daraja credentials before live donations work.',
          variant: 'destructive',
        });
        await supabase.from('donations').delete().eq('id', donation.id);
        return;
      }
      if (!res.success) throw new Error(res.error || 'STK push failed');

      toast({ title: 'Check your phone', description: res.message || 'Enter your M-Pesa PIN to confirm.' });
      setPolling({ donationId: donation.id, status: 'pending' });
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Donation failed';
      toast({ title: 'Donation failed', description: msg, variant: 'destructive' });
    } finally {
      setSubmitting(false);
    }
  };

  // Status screen
  if (polling) {
    return (
      <DashboardLayout>
        <div className="p-4 md:p-6 max-w-md mx-auto">
          <Card className="border-0 shadow-elegant">
            <CardContent className="p-8 text-center space-y-4">
              {polling.status === 'pending' && (
                <>
                  <Loader2 className="w-16 h-16 mx-auto animate-spin text-primary" />
                  <h2 className="text-2xl font-bold">Waiting for M-Pesa…</h2>
                  <p className="text-muted-foreground">Check your phone and enter your PIN to confirm the donation. We are listening for the confirmation.</p>
                  <Button variant="outline" onClick={() => setPolling(null)}>Cancel</Button>
                </>
              )}
              {polling.status === 'completed' && (
                <>
                  <CheckCircle2 className="w-16 h-16 mx-auto text-success" />
                  <h2 className="text-2xl font-bold">Thank you!</h2>
                  <p className="text-muted-foreground">Your donation was received. Receipt sent by Safaricom.</p>
                  <Button onClick={() => { setPolling(null); setSelectedCharity(null); }}>Donate again</Button>
                </>
              )}
              {polling.status === 'failed' && (
                <>
                  <AlertCircle className="w-16 h-16 mx-auto text-destructive" />
                  <h2 className="text-2xl font-bold">Payment not completed</h2>
                  <p className="text-muted-foreground">No money has left your account. You can try again.</p>
                  <Button onClick={() => setPolling(null)}>Try again</Button>
                </>
              )}
            </CardContent>
          </Card>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="p-4 md:p-6 space-y-6">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl gradient-emec flex items-center justify-center">
            <HandHeart className="w-7 h-7 text-white" />
          </div>
          <div>
            <h1 className="text-2xl md:text-3xl font-bold">{t('donation.title')}</h1>
            <p className="text-muted-foreground">Support children's health and education via M-Pesa</p>
          </div>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="donate"><Gift className="w-4 h-4 mr-2" />Donate</TabsTrigger>
            <TabsTrigger value="wall"><Users className="w-4 h-4 mr-2" />Donor Wall</TabsTrigger>
          </TabsList>

          <TabsContent value="donate" className="space-y-4">
            <div className="grid gap-3 md:grid-cols-3">
              {charities.map((c) => (
                <Card key={c.id}
                  className={`cursor-pointer transition-all ${selectedCharity === c.id ? 'ring-2 ring-primary' : ''}`}
                  onClick={() => setSelectedCharity(c.id)}>
                  <CardContent className="p-4">
                    <div className="text-3xl mb-2">{c.image}</div>
                    <h3 className="font-semibold text-sm">{c.name}</h3>
                    <p className="text-xs text-muted-foreground mt-1">{c.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>

            {selectedCharity && (
              <Card className="border-0 shadow-elegant">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-lg"><Smartphone className="w-5 h-5 text-green-600" /> Pay with M-Pesa</CardTitle>
                  <CardDescription>You'll get an STK push on your phone to confirm.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-4 gap-2">
                    {['100', '500', '1000', '5000'].map((p) => (
                      <Button key={p} variant={amount === p ? 'default' : 'outline'} onClick={() => setAmount(p)}>{p}</Button>
                    ))}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="amt">Amount (KES)</Label>
                    <Input id="amt" type="number" min={10} max={150000} value={amount} onChange={(e) => setAmount(e.target.value)} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">M-Pesa phone number</Label>
                    <Input id="phone" type="tel" placeholder="0712345678" value={phone} onChange={(e) => setPhone(e.target.value)} />
                  </div>
                  <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                    <span className="text-sm">Show my name on the donor wall</span>
                    <Switch checked={isPublic} onCheckedChange={setIsPublic} />
                  </div>
                  <Button onClick={handleDonate} disabled={submitting} className="w-full h-12" size="lg">
                    {submitting ? <><Loader2 className="w-5 h-5 mr-2 animate-spin" /> Sending request…</>
                      : <><Gift className="w-5 h-5 mr-2" /> Donate KES {amount}</>}
                  </Button>
                  <p className="text-xs text-center text-muted-foreground">
                    Real M-Pesa payment via Safaricom Daraja. Funds go to the selected cause.
                  </p>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="wall" className="space-y-4">
            <Card className="border-0 shadow-elegant">
              <CardHeader>
                <CardTitle>Recent Donors</CardTitle>
                <CardDescription>Confirmed M-Pesa donations</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {donorWall.length === 0 ? (
                  <p className="text-sm text-muted-foreground text-center py-6">No public donations yet — be the first!</p>
                ) : donorWall.map((d) => (
                  <div key={d.id} className="flex items-center gap-4 p-3 rounded-xl bg-muted/40">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <Heart className="w-5 h-5 text-primary" />
                    </div>
                    <div className="flex-1">
                      <p className="font-semibold">{d.donor_name || 'Anonymous'}</p>
                      <p className="text-xs text-muted-foreground italic">{d.charity_name}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-primary">KES {Number(d.amount).toLocaleString()}</p>
                      <p className="text-xs text-muted-foreground">{new Date(d.created_at).toLocaleDateString()}</p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
}
