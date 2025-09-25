const client_id = "01ba4b4f"; // replace with real Jamendo client ID
const resultsContainer = document.getElementById("results");
const carousel = document.getElementById("carousel");

// Fetch tracks from Jamendo API
async function fetchTracks() {
  const url = `https://api.jamendo.com/v3.0/tracks/?client_id=${client_id}&format=json&limit=30&order=latest`;

  try {
    const res = await fetch(url);
    const data = await res.json();

    resultsContainer.innerHTML = "";

    if (!data.results || data.results.length === 0) {
      resultsContainer.innerHTML = "<p>No tracks found.</p>";
      return;
    }

    // Show carousel (top 5 covers)
    carousel.innerHTML = "";
    data.results.slice(0, 5).forEach(track => {
      const img = document.createElement("img");
      img.src = track.album_image || "https://via.placeholder.com/150";
      carousel.appendChild(img);
    });

    // Show song cards
    data.results.forEach(track => {
      const div = document.createElement("div");
      div.className = "song-card";
      div.innerHTML = `
        <img src="${track.album_image || "https://via.placeholder.com/500"}" alt="Cover" />
        <h3>${track.name}</h3>
        <p>👤 ${track.artist_name}</p>
        <audio controls src="${track.audio}" preload="none"></audio>
        <br/>
        <button onclick="downloadSong('${track.audio}', '${track.name}')">⬇️ Download</button>
      `;
      resultsContainer.appendChild(div);
    });

  } catch (err) {
    console.error("Error fetching tracks:", err);
    resultsContainer.innerHTML = "<p>⚠️ Error loading songs.</p>";
  }
}

// Download helper
function downloadSong(url, name) {
  const a = document.createElement("a");
  a.href = url;
  a.download = name + ".mp3";
  a.click();
}

// Auto-load songs on app start
fetchTracks();
