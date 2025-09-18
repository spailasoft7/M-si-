async function fetchTracks() {
  const res = await fetch("/api/jamendo"); // calls your serverless function
  const data = await res.json();

  const container = document.getElementById("music");
  container.innerHTML = "";

  if (!data.results) {
    container.innerHTML = "<p>⚠️ No tracks found.</p>";
    return;
  }

  data.results.forEach(track => {
    const div = document.createElement("div");
    div.innerHTML = `
      <p><strong>${track.name}</strong> by ${track.artist_name}</p>
      <audio controls src="${track.audio}"></audio>
    `;
    container.appendChild(div);
  });
}

fetchTracks();
