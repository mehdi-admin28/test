import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-analytics.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, on

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCXniPyXnaStSCzn4WIYFte7NsxkqBYWg4",
  authDomain: "site-project-sidi.firebaseapp.com",
  projectId: "site-project-sidi",
  storageBucket: "site-project-sidi.firebasestorage.app",
 
  messagingSenderId: "981110384583",
  appId: "1:981110384583:web:cd3b4c63ef5ee8d4391be2",
  measurementId: "G-CQW5MHFQJ9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);



//S inscrire---------------------------------------
function signup() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  auth.createUserWithEmailAndPassword(email, password)
    .then(cred => {
      // Enregistrer l'utilisateur dans Firestore
      return db.collection("users").doc(cred.user.uid).set({
        email: email,
        role: "user", // ou "admin" si c’est toi
        createdAt: new Date()
      });
    })
    .then(() => {
      alert("Inscription réussie !");
      window.location.href = "profile.html";
    })
    .catch(err => {
      alert("Erreur : " + err.message);
    });
}
//se conecter ----------------------------------------------
function login() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  auth.signInWithEmailAndPassword(email, password)
    .then(() => {
      alert("Connexion réussie !");
      window.location.href = "profile.html";
    })
    .catch(err => {
      alert("Erreur : " + err.message);
    });
}
//----------se deconecter
function logout() {
  auth.signOut()
    .then(() => {
      alert("Déconnecté !");
      window.location.href = "index.html";
    });
}
//montrer les infos sur profile ----------------------
// Quand l'utilisateur est connecté, on affiche son profil
auth.onAuthStateChanged(user => {
  if (user) {
    db.collection("users").doc(user.uid).get().then(doc => {
      const data = doc.data();
      const profileDiv = document.getElementById("profile-info");

      profileDiv.innerHTML = `
        <p><strong>Email :</strong> ${data.email}</p>
        <p><strong>Rôle :</strong> ${data.role}</p>
      `;
    });
  } else {
    // Si aucun utilisateur, rediriger
    window.location.href = "index.html";
  }
});
