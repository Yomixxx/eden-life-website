// Vercel serverless function (Node.js runtime, auto-detected from /api).
//
// The Give page's client-side Flutterwave callback fires whenever the
// checkout modal closes with a "successful"-looking response — but that's
// just what the browser was told, not proof a charge actually cleared.
// This endpoint re-checks the transaction directly with Flutterwave using
// the secret key, which never reaches the browser.
//
// Requires FLW_SECRET_KEY to be set as an environment variable in the
// Vercel project (Settings → Environment Variables) — this file only ever
// reads it from process.env, never hardcodes it.

module.exports = async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ verified: false, error: 'Method not allowed' });
  }

  const secretKey = process.env.FLW_SECRET_KEY;
  if (!secretKey) {
    console.error('FLW_SECRET_KEY is not set in the environment.');
    return res.status(500).json({ verified: false, error: 'Server not configured' });
  }

  const { transaction_id, tx_ref } = req.body || {};
  if (!transaction_id || !tx_ref) {
    return res.status(400).json({ verified: false, error: 'Missing transaction_id or tx_ref' });
  }

  try {
    const flwRes = await fetch(
      `https://api.flutterwave.com/v3/transactions/${encodeURIComponent(transaction_id)}/verify`,
      { headers: { Authorization: `Bearer ${secretKey}` } }
    );
    const flwJson = await flwRes.json();
    const data = flwJson && flwJson.data;

    // Require: the API call itself succeeded, Flutterwave reports the charge
    // as successful, the transaction reference matches what this session
    // generated (not some other transaction), and the currency is what we
    // expect. We don't compare against a stored "expected amount" since this
    // static site has no database to hold one — this still closes the main
    // gap (a spoofed client-side "success" with no real charge behind it).
    const verified =
      flwRes.ok &&
      flwJson.status === 'success' &&
      !!data &&
      data.status === 'successful' &&
      data.tx_ref === tx_ref &&
      data.currency === 'NGN';

    if (!verified) {
      console.warn('Flutterwave verification did not pass', {
        transaction_id,
        tx_ref,
        httpStatus: flwRes.status,
        apiStatus: flwJson && flwJson.status,
        apiMessage: flwJson && flwJson.message,
        flwStatus: data && data.status,
      });
    }

    return res.status(200).json({
      verified,
      amount: verified ? data.amount : undefined,
      currency: verified ? data.currency : undefined,
    });
  } catch (err) {
    console.error('Flutterwave verification request failed:', err);
    return res.status(502).json({ verified: false, error: 'Verification request failed' });
  }
};
