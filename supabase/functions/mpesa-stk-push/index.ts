// M-Pesa Daraja STK Push — initiates a real C2B payment prompt on user's phone
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
};

interface StkPushBody {
  phone: string;       // 2547XXXXXXXX
  amount: number;      // KES (integer, min 1)
  charity_name: string;
  donation_id: string; // pre-created donation row id (status=pending)
}

function validatePhone(p: string): string | null {
  const digits = p.replace(/\D/g, '');
  // accept 2547xxxxxxxx, 07xxxxxxxx, 7xxxxxxxx, +2547xxxxxxxx
  if (/^2547\d{8}$/.test(digits)) return digits;
  if (/^07\d{8}$/.test(digits)) return '254' + digits.slice(1);
  if (/^7\d{8}$/.test(digits)) return '254' + digits;
  return null;
}

async function getAccessToken(env: 'sandbox' | 'production', key: string, secret: string): Promise<string> {
  const base = env === 'production'
    ? 'https://api.safaricom.co.ke'
    : 'https://sandbox.safaricom.co.ke';
  const auth = btoa(`${key}:${secret}`);
  const res = await fetch(`${base}/oauth/v1/generate?grant_type=client_credentials`, {
    headers: { Authorization: `Basic ${auth}` },
  });
  if (!res.ok) throw new Error(`OAuth failed [${res.status}]: ${await res.text()}`);
  const data = await res.json();
  return data.access_token as string;
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders });

  try {
    const consumerKey = Deno.env.get('MPESA_CONSUMER_KEY');
    const consumerSecret = Deno.env.get('MPESA_CONSUMER_SECRET');
    const shortcode = Deno.env.get('MPESA_SHORTCODE');
    const passkey = Deno.env.get('MPESA_PASSKEY');
    const env = (Deno.env.get('MPESA_ENV') || 'production') as 'sandbox' | 'production';
    const supabaseUrl = Deno.env.get('SUPABASE_URL');

    if (!consumerKey || !consumerSecret || !shortcode || !passkey || !supabaseUrl) {
      return new Response(JSON.stringify({
        error: 'M-Pesa is not yet configured. Please contact the administrator.',
        code: 'MPESA_NOT_CONFIGURED',
      }), { status: 503, headers: { ...corsHeaders, 'Content-Type': 'application/json' } });
    }

    const body = (await req.json()) as StkPushBody;
    const phone = validatePhone(body.phone || '');
    const amount = Math.floor(Number(body.amount));
    if (!phone) return new Response(JSON.stringify({ error: 'Invalid Kenyan phone number' }),
      { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } });
    if (!Number.isFinite(amount) || amount < 1 || amount > 150000)
      return new Response(JSON.stringify({ error: 'Amount must be between 1 and 150,000 KES' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } });
    if (!body.donation_id) return new Response(JSON.stringify({ error: 'donation_id required' }),
      { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } });

    const token = await getAccessToken(env, consumerKey, consumerSecret);
    const ts = new Date().toISOString().replace(/[-:T.Z]/g, '').slice(0, 14);
    const password = btoa(`${shortcode}${passkey}${ts}`);
    const callbackUrl = `${supabaseUrl}/functions/v1/mpesa-callback`;

    const base = env === 'production'
      ? 'https://api.safaricom.co.ke'
      : 'https://sandbox.safaricom.co.ke';

    const stkRes = await fetch(`${base}/mpesa/stkpush/v1/processrequest`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        BusinessShortCode: shortcode,
        Password: password,
        Timestamp: ts,
        TransactionType: 'CustomerPayBillOnline',
        Amount: amount,
        PartyA: phone,
        PartyB: shortcode,
        PhoneNumber: phone,
        CallBackURL: callbackUrl,
        AccountReference: `EMEC-${body.donation_id.slice(0, 8)}`,
        TransactionDesc: `Donation: ${(body.charity_name || 'EMEC').slice(0, 30)}`,
      }),
    });

    const stkData = await stkRes.json();
    if (!stkRes.ok || stkData.ResponseCode !== '0') {
      console.error('STK push failed', stkData);
      return new Response(JSON.stringify({
        error: stkData.errorMessage || stkData.ResponseDescription || 'STK push failed',
        details: stkData,
      }), { status: 502, headers: { ...corsHeaders, 'Content-Type': 'application/json' } });
    }

    // Update donation row with the CheckoutRequestID using service role
    const serviceRole = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');
    if (serviceRole) {
      await fetch(`${supabaseUrl}/rest/v1/donations?id=eq.${body.donation_id}`, {
        method: 'PATCH',
        headers: {
          apikey: serviceRole,
          Authorization: `Bearer ${serviceRole}`,
          'Content-Type': 'application/json',
          Prefer: 'return=minimal',
        },
        body: JSON.stringify({
          mpesa_checkout_request_id: stkData.CheckoutRequestID,
          phone_number: phone,
        }),
      });
    }

    return new Response(JSON.stringify({
      success: true,
      checkoutRequestId: stkData.CheckoutRequestID,
      message: 'Check your phone and enter your M-Pesa PIN to complete the donation.',
    }), { headers: { ...corsHeaders, 'Content-Type': 'application/json' } });
  } catch (err) {
    console.error('STK error', err);
    return new Response(JSON.stringify({ error: err instanceof Error ? err.message : 'Unknown error' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } });
  }
});
