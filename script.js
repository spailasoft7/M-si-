
// scripts.js

document.getElementById("loginBtn").addEventListener("click", () => {
  const clientId = "01ba4b4f"; // from Jamendo developer site
  const redirectUri = "https://m-si.vercel.app/api/callback";
  const authUrl = `https://api.jamendo.com/oauth2/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=code&scope=music+playlists+favorites`;
  
  window.location.href = authUrl;
});

// Fetch top tracks when page loads
async function fetchTracks(query = "") {
  let url = "/api/jamendo";
  if (query) url += `?q=${encodeURIComponent(query)}`;

  const res = await fetch(url);
  const data = await res.json();

  const container = document.getElementById("results");
  container.innerHTML = "";

  if (!data.results || data.results.length === 0) {
    container.innerHTML = "<p>⚠️ No tracks found.</p>";
    return;
  }

  data.results.forEach(track => {
    const div = document.createElement("div");
    div.innerHTML = `
      <h3>${track.name} – ${track.artist_name}</h3>
      <audio controls src="${track.audio}" preload="none"></audio>
    `;
    container.appendChild(div);
  });
}

// Initial load
fetchTracks();

// Search functionality
document.getElementById("searchBtn").addEventListener("click", () => {
  const query = document.getElementById("searchBox").value;
  fetchTracks(query);
});
