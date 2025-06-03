// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCXniPyXnaStSCzn4WIYFte7NsxkqBYWg4",
  authDomain: "site-project-sidi.firebaseapp.com",
  projectId: "site-project-sidi",
  //storageBucket: "site-project-sidi.firebasestorage.app",
  storageBucket: "site-project-sidi.appspot.com",
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
auth.onAuthStateChanged(user => {
  if (user) {
    db.collection("users").doc(user.uid).get().then(doc => {
      const data = doc.data();
      document.body.innerHTML += `<p>Email : ${data.email}</p>`;
      document.body.innerHTML += `<p>Rôle : ${data.role}</p>`;
    });
  } else {
    window.location.href = "index.html";
  }
});