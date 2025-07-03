
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getFirestore, doc, getDoc, updateDoc } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";
import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyBKtKrRP4AjLHcdeEdyTlTZC9hHdv5y7no",
  authDomain: "metodo-forja.firebaseapp.com",
  databaseURL: "https://metodo-forja-default-rtdb.firebaseio.com",
  projectId: "metodo-forja",
  storageBucket: "metodo-forja.firebasestorage.app",
  messagingSenderId: "949719386034",
  appId: "1:949719386034:web:5c015b5fbe082821ea86ab",
  measurementId: "G-6Z9EJLY5LZ"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

const form = document.getElementById("cadastro-form");
form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const nome = document.getElementById("nome").value.trim();
  const email = document.getElementById("email").value.trim();
  const senha = document.getElementById("senha").value.trim();
  const codigo = document.getElementById("codigo").value.trim();

  const msgDiv = document.getElementById("mensagem");
  msgDiv.textContent = "";

  if (!nome || !email || !senha || !codigo) {
    msgDiv.textContent = "Por favor, preencha todos os campos.";
    return;
  }

  try {
    const codigoRef = doc(db, "codigos_acesso", codigo);
    const codigoSnap = await getDoc(codigoRef);

    if (!codigoSnap.exists()) {
      msgDiv.textContent = "Código inválido.";
      return;
    }

    if (codigoSnap.data().usado) {
      msgDiv.textContent = "Este código já foi utilizado.";
      return;
    }

    await createUserWithEmailAndPassword(auth, email, senha);

    await updateDoc(codigoRef, { usado: true });

    window.location.href = "https://metodo-forja-mf.github.io/Login/";
  } catch (error) {
    msgDiv.textContent = "Erro ao cadastrar: " + error.message;
  }
});
