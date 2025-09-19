// api/callback.js
export default async function handler(req, res) {
  const code = req.query.code; // this is what Jamendo sends back

  if (!code) {
    return res.status(400).json({ error: "Missing authorization code" });
  }

  try {
    const response = await fetch("https://api.jamendo.com/v3.0/oauth/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        grant_type: "authorization_code",
        client_id: process.env.JAMENDO_CLIENT_ID,
        client_secret: process.env.JAMENDO_CLIENT_SECRET,
        redirect_uri: "https://m-si.vercel.app/api/callback",
        code: code,
      }),
    });

    const data = await response.json();

    // send token back to browser
    return res.status(200).json(data);

  } catch (err) {
    return res.status(500).json({ error: "Token exchange failed", details: err.message });
  }
}
