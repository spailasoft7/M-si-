<script type="module">
  import { initializeApp } from "https://www.gstatic.com/firebasejs/12.3.0/firebase-app.js";
  import { getAnalytics } from "https://www.gstatic.com/firebasejs/12.3.0/firebase-analytics.js";

  const firebaseConfig = {
    apiKey: "AIzaSyANVMRK6XQpFQfzbzn69doGoglEfxKCMtQ",
    authDomain: "musica-8becc.firebaseapp.com",
    projectId: "musica-8becc",
    storageBucket: "musica-8becc.firebasestorage.app",
    messagingSenderId: "343994620518",
    appId: "1:343994620518:web:a9244e720fe64cc00c6ba7",
    measurementId: "G-SB5K2CVESR"
  };

  const app = initializeApp(firebaseConfig);
  const analytics = getAnalytics(app);

  export { app };
</script>

