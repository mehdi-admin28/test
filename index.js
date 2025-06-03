// Configuration Firebase
const firebaseConfig = {
  apiKey: "AIzaSyCXniPyXnaStSCzn4WIYFte7NsxkqBYWg4",
  authDomain: "site-project-sidi.firebaseapp.com",
  projectId: "site-project-sidi",
  storageBucket: "site-project-sidi.firebasestorage.app",
  messagingSenderId: "981110384583",
  appId: "1:981110384583:web:cd3b4c63ef5ee8d4391be2",
  measurementId: "G-CQW5MHFQJ9"
};

// Initialiser Firebase
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.firestore();

// --------- INSCRIPTION
function signup() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  auth.createUserWithEmailAndPassword(email, password)
    .then(cred => {
      return db.collection("users").doc(cred.user.uid).set({
        email: email,
        role: "user", // "admin" si c’est toi
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

// --------- CONNEXION
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

// --------- DÉCONNEXION
function logout() {
  auth.signOut()
    .then(() => {
      alert("Déconnecté !");
      window.location.href = "index.html";
    });
}

// --------- AFFICHER PROFIL
auth.onAuthStateChanged(user => {
  if (user) {
    db.collection("users").doc(user.uid).get().then(doc => {
      if (doc.exists) {
        const data = doc.data();
        const profileDiv = document.getElementById("profile-info");

        if (profileDiv) {
          profileDiv.innerHTML = `
            <p><strong>Email :</strong> ${data.email}</p>
            <p><strong>Rôle :</strong> ${data.role}</p>
          `;
        }
      }
    });
  } else {
    // Pas connecté → rediriger
    if (window.location.pathname.includes("profile.html")) {
      window.location.href = "index.html";
    }
  }
});
