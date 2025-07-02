
// Importa as funções do Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

// Sua configuração do Firebase
const firebaseConfig = {
  apiKey: "SUA_API_KEY",
  authDomain: "SUA_AUTH_DOMAIN",
  projectId: "SEU_PROJECT_ID",
  storageBucket: "SEU_BUCKET",
  messagingSenderId: "SEU_MESSAGING_ID",
  appId: "SEU_APP_ID"
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
      // ✅ Redireciona para login
      window.location.href = "index.html";
    })
    .catch((error) => {
      console.error(error);
      alert("Erro ao cadastrar: " + error.message);
    });
});
