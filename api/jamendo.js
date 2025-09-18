export default async function handler(req, res) {
  try {
    const response = await fetch(
      `https://api.jamendo.com/v3.0/tracks/?client_id=${process.env.JAMENDO_CLIENT_ID}&format=json&limit=10&order=popularity_total`
    );

    const data = await response.json();
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ error: "Jamendo API request failed" });
  }
}
