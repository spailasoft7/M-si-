<script type="module">
import { app } from "./firebase-init.js";
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/12.3.0/firebase-auth.js";
import { getFirestore, collection, doc, setDoc, getDocs } from "https://www.gstatic.com/firebasejs/12.3.0/firebase-firestore.js";

const auth = getAuth(app);
const db = getFirestore(app);

const provider = new GoogleAuthProvider();

export async function login() {
  try {
    const result = await signInWithPopup(auth, provider);
    console.log("User logged in:", result.user.displayName);
    loadFavorites();
    return result.user;
  } catch (err) {
    console.error(err);
  }
}

export async function logout() {
  await signOut(auth);
  console.log("User logged out");
  document.getElementById("favorites").innerHTML = "";
}

export async function saveFavorite(track) {
  const user = auth.currentUser;
  if (!user) return alert("Please log in first!");
  await setDoc(doc(db, "users", user.uid, "favorites", track.id), track);
  console.log("Saved favorite:", track.name);
  loadFavorites();
}

export async function getFavorites() {
  const user = auth.currentUser;
  if (!user) return [];
  const snapshot = await getDocs(collection(db, "users", user.uid, "favorites"));
  return snapshot.docs.map(doc => doc.data());
}

export async function loadFavorites() {
  const favoritesDiv = document.getElementById("favorites");
  favoritesDiv.innerHTML = "";
  const favorites = await getFavorites();
  favorites.forEach(track => {
    const div = document.createElement("div");
    div.innerHTML = `${track.name} - ${track.artist} <button onclick='saveFavorite({id:"${track.id}",name:"${track.name}",artist:"${track.artist}",audio:"${track.audio}"})'>Favorite</button>`;
    favoritesDiv.appendChild(div);
  });
}

onAuthStateChanged(auth, user => {
  if (user) console.log("Logged in:", user.displayName);
  else console.log("Logged out");
});
</script>
