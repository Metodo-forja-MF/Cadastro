
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";

const firebaseConfig = {
  apiKey: "SUA_API_KEY",
  authDomain: "metodo-forja.firebaseapp.com",
  projectId: "metodo-forja",
  storageBucket: "metodo-forja.appspot.com",
  messagingSenderId: "949719386034",
  appId: "1:949719386034:web:5c015b5fbe082a8b0411e5"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

window.register = function (e) {
  e.preventDefault();
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  if (!email || !password) {
    alert("Preencha todos os campos.");
    return;
  }

  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      alert("Usuário cadastrado com sucesso!");
      window.location.href = "https://metodo-forja-mf.github.io/Login/";
    })
    .catch((error) => {
      alert("Erro ao cadastrar: " + error.message);
    });
};
