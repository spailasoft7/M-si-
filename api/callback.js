export default async function handler(req, res) {
  const code = req.query.code;

  if (!code) {
    return res.status(400).json({ error: "Missing authorization code" });
  }

  // Exchange code for access token
  const tokenRes = await fetch("https://api.jamendo.com/oauth2/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      grant_type: "authorization_code",
      code: code,
      redirect_uri: "https://m-si.vercel.app/api/callback",
      client_id: process.env.JAMENDO_CLIENT_ID,
      client_secret: process.env.JAMENDO_CLIENT_SECRET,
    }),
  });

  const data = await tokenRes.json();

  if (data.access_token) {
    // Save token in cookie (simplest way)
    res.setHeader("Set-Cookie", `jamendo_token=${data.access_token}; Path=/; HttpOnly; Secure; SameSite=Lax`);
    res.redirect("/"); // redirect back to homepage
  } else {
    res.status(400).json({ error: "Failed to get access token", details: data });
  }
}
