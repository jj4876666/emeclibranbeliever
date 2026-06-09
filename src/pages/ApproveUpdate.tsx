import { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { Check, X, Loader2, ShieldCheck, AlertTriangle } from 'lucide-react';

interface MedicalUpdate {
  id: string;
  update_type: string;
  title: string;
  data: Record<string, string | number | boolean>;
  officer_name: string | null;
  facility_name: string | null;
  created_at: string;
  status: string;
  patient_id: string;
}

export default function ApproveUpdate() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);
  const [acting, setActing] = useState<'approved' | 'rejected' | null>(null);
  const [update, setUpdate] = useState<MedicalUpdate | null>(null);
  const [authed, setAuthed] = useState<boolean | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        setAuthed(false);
        setLoading(false);
        return;
      }
      setAuthed(true);
      const { data, error } = await supabase
        .from('medical_updates')
        .select('*')
        .eq('id', id!)
        .maybeSingle();
      if (error) setError(error.message);
      else if (!data) setError('Update not found or you do not have access.');
      else setUpdate(data as MedicalUpdate);
      setLoading(false);
    })();
  }, [id]);

  const act = async (status: 'approved' | 'rejected') => {
    if (!update) return;
    setActing(status);
    const { data: { user: authUser } } = await supabase.auth.getUser();
    const { error: upErr } = await supabase
      .from('medical_updates')
      .update({ status, reviewed_at: new Date().toISOString(), reviewer_id: authUser?.id ?? null })
      .eq('id', update.id);
    if (upErr) {
      setActing(null);
      toast({ title: 'Action failed', description: upErr.message, variant: 'destructive' });
      return;
    }
    await supabase.from('audit_logs').insert({
      patient_id: update.patient_id,
      performed_by: authUser?.id ?? null,
      action_type: status === 'approved' ? 'UPDATE_APPROVED' : 'UPDATE_REJECTED',
      action_description:
        status === 'approved'
          ? `Patient approved "${update.title}" via email link — added to permanent record.`
          : `Patient rejected "${update.title}" via email link.`,
      officer_name: update.officer_name,
      facility_name: update.facility_name,
      metadata: { medical_update_id: update.id, update_type: update.update_type, data: update.data, source: 'email_link' },
    });
    setUpdate({ ...update, status });
    setActing(null);
    toast({
      title: status === 'approved' ? 'Approved' : 'Rejected',
      description: status === 'approved'
        ? 'This update has been added to your permanent record.'
        : 'The health officer has been notified.',
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-6 h-6 animate-spin text-primary" />
      </div>
    );
  }

  if (authed === false) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <Card className="max-w-md w-full">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ShieldCheck className="w-5 h-5" /> Sign in required
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-muted-foreground">
              For your security, please sign in to your EMEC account to review this medical update.
            </p>
            <Button
              className="w-full"
              onClick={() => navigate(`/login?next=/approve-update/${id}`)}
            >
              Sign in to continue
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (error || !update) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <Card className="max-w-md w-full">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-destructive">
              <AlertTriangle className="w-5 h-5" /> Unable to load update
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-muted-foreground">{error ?? 'This update does not exist.'}</p>
            <Button asChild variant="outline" className="w-full">
              <Link to="/dashboard">Go to dashboard</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const isPending = update.status === 'pending';

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <Card className="max-w-lg w-full">
        <CardHeader>
          <div className="flex items-start justify-between gap-3">
            <div>
              <CardTitle>{update.title}</CardTitle>
              <p className="text-xs text-muted-foreground mt-1 capitalize">
                {update.update_type.replace(/_/g, ' ')} • {update.officer_name ?? 'Officer'}
                {update.facility_name ? ` • ${update.facility_name}` : ''}
              </p>
            </div>
            <Badge
              variant="outline"
              className={
                update.status === 'approved'
                  ? 'text-green-700 border-green-300 bg-green-50'
                  : update.status === 'rejected'
                  ? 'text-red-700 border-red-300 bg-red-50'
                  : 'text-amber-700 border-amber-300 bg-amber-50'
              }
            >
              {update.status}
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-2">
            {Object.entries(update.data || {}).map(([k, v]) => (
              v !== '' && v != null && (
                <div key={k} className="p-2 bg-muted/50 rounded text-sm">
                  <span className="text-muted-foreground capitalize">{k.replace(/_/g, ' ')}: </span>
                  <span className="font-medium">{String(v)}</span>
                </div>
              )
            ))}
          </div>
          <p className="text-xs text-muted-foreground">
            Submitted {new Date(update.created_at).toLocaleString()}
          </p>

          {isPending ? (
            <div className="flex gap-2 pt-2">
              <Button
                className="flex-1"
                onClick={() => act('approved')}
                disabled={acting !== null}
              >
                {acting === 'approved' ? <Loader2 className="w-4 h-4 mr-1 animate-spin" /> : <Check className="w-4 h-4 mr-1" />}
                Approve & add to record
              </Button>
              <Button
                variant="outline"
                onClick={() => act('rejected')}
                disabled={acting !== null}
              >
                {acting === 'rejected' ? <Loader2 className="w-4 h-4 mr-1 animate-spin" /> : <X className="w-4 h-4 mr-1" />}
                Reject
              </Button>
            </div>
          ) : (
            <div className="pt-2 space-y-3">
              <p className="text-sm">
                You already {update.status} this update. No further action is needed.
              </p>
              <Button asChild variant="outline" className="w-full">
                <Link to="/dashboard">Go to your records</Link>
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}