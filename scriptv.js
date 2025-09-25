// Replace this with your real Jamendo client ID from env
const client_id = "	01ba4b4f"; 

// Fetch tracks function
async function fetchTracks(query = "") {
  let url = `https://api.jamendo.com/v3.0/tracks/?client_id=${client_id}&format=json&limit=10&include=musicinfo+stats+licenses`;
  if (query) url += `&search=${encodeURIComponent(query)}`;
  else url += "&order=latest"; // show latest songs on startup

  try {
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
      div.className = "track";

      // fallback if no image
      const image = track.image || "https://via.placeholder.com/200x200.png?text=No+Cover";

      div.innerHTML = `
        <img src="${image}" alt="Album Art" />
        <h3>${track.name}</h3>
        <p>${track.artist_name}</p>
        <audio controls src="${track.audio}" preload="none"></audio>
        <br/>
        <a href="${track.audio}" download>
          <button>⬇️ Download</button>
        </a>
      `;

      container.appendChild(div);
    });

  } catch (err) {
    console.error("Error fetching tracks:", err);
    document.getElementById("results").innerHTML = "<p>❌ Error loading music.</p>";
  }
}

// Load latest songs on startup
fetchTracks();

// Search button
document.getElementById("searchBtn").addEventListener("click", () => {
  const query = document.getElementById("searchBox").value;
  fetchTracks(query);
});
