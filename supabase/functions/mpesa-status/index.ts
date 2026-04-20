// Polls a donation row to check if M-Pesa has confirmed it yet
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders });
  try {
    const { donation_id } = await req.json();
    if (!donation_id) return new Response(JSON.stringify({ error: 'donation_id required' }),
      { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } });

    const supabaseUrl = Deno.env.get('SUPABASE_URL');
    const serviceRole = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');
    if (!supabaseUrl || !serviceRole) {
      return new Response(JSON.stringify({ error: 'Server not configured' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } });
    }

    const r = await fetch(`${supabaseUrl}/rest/v1/donations?id=eq.${donation_id}&select=status,mpesa_receipt_number`, {
      headers: { apikey: serviceRole, Authorization: `Bearer ${serviceRole}` },
    });
    const rows = await r.json();
    const row = Array.isArray(rows) ? rows[0] : null;
    return new Response(JSON.stringify({
      status: row?.status || 'pending',
      receipt: row?.mpesa_receipt_number || null,
    }), { headers: { ...corsHeaders, 'Content-Type': 'application/json' } });
  } catch (err) {
    return new Response(JSON.stringify({ error: err instanceof Error ? err.message : 'Unknown' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } });
  }
});
