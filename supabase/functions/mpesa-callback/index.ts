// M-Pesa Daraja callback — receives confirmation from Safaricom and marks donation completed
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders });

  try {
    const payload = await req.json();
    console.log('M-Pesa callback received:', JSON.stringify(payload));

    const stk = payload?.Body?.stkCallback;
    if (!stk) return new Response(JSON.stringify({ ResultCode: 0 }), { status: 200, headers: { 'Content-Type': 'application/json' } });

    const checkoutId = stk.CheckoutRequestID;
    const resultCode = stk.ResultCode;
    const supabaseUrl = Deno.env.get('SUPABASE_URL');
    const serviceRole = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');

    if (!supabaseUrl || !serviceRole || !checkoutId) {
      return new Response(JSON.stringify({ ResultCode: 0 }), { status: 200, headers: { 'Content-Type': 'application/json' } });
    }

    let updates: Record<string, unknown>;
    if (resultCode === 0) {
      // Successful — extract receipt
      const items: Array<{ Name: string; Value: unknown }> = stk.CallbackMetadata?.Item || [];
      const receipt = items.find((i) => i.Name === 'MpesaReceiptNumber')?.Value as string | undefined;
      updates = { status: 'completed', mpesa_receipt_number: receipt || null };
    } else {
      updates = { status: 'failed' };
    }

    await fetch(`${supabaseUrl}/rest/v1/donations?mpesa_checkout_request_id=eq.${checkoutId}`, {
      method: 'PATCH',
      headers: {
        apikey: serviceRole,
        Authorization: `Bearer ${serviceRole}`,
        'Content-Type': 'application/json',
        Prefer: 'return=minimal',
      },
      body: JSON.stringify(updates),
    });

    // Always 200 OK to Safaricom
    return new Response(JSON.stringify({ ResultCode: 0, ResultDesc: 'Accepted' }),
      { status: 200, headers: { 'Content-Type': 'application/json' } });
  } catch (err) {
    console.error('Callback error', err);
    return new Response(JSON.stringify({ ResultCode: 0, ResultDesc: 'Accepted' }),
      { status: 200, headers: { 'Content-Type': 'application/json' } });
  }
});
