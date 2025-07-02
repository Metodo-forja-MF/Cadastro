
// Importa as funções do Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

// Configuração real do Firebase do projeto "metodo-forja"
const firebaseConfig = {
  apiKey: "AIzaSyBKtKrRP4AjLHcdeEdyTlTZC9hHdv5y7no",
  authDomain: "metodo-forja.firebaseapp.com",
  projectId: "metodo-forja",
  storageBucket: "metodo-forja.appspot.com",
  messagingSenderId: "949719386034",
  appId: "1:949719386034:web:5c015b5fbe082821ea86ab",
  measurementId: "G-6Z9EJLY5LZ"
};

// Inicializa o Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Captura o formulário
document.getElementById("form-cadastro").addEventListener("submit", function (e) {
  e.preventDefault();

  const email = document.getElementById("email").value;
  const senha = document.getElementById("senha").value;

  createUserWithEmailAndPassword(auth, email, senha)
    .then((userCredential) => {
      alert("Conta criada com sucesso!");
      // Redireciona para login
      window.location.href = "https://metodo-forja-mf.github.io/Login/";
    })
    .catch((error) => {
      console.error(error);
      alert("Erro ao cadastrar: " + error.message);
    });
});
