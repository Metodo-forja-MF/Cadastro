import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getFirestore, doc, getDoc, setDoc, updateDoc } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";
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

  const nome = document.getElementById("nome").value;
  const email = document.getElementById("email").value;
  const senha = document.getElementById("senha").value;
  const codigo = document.getElementById("codigo").value;

  if (!codigo) {
    alert("Por favor, insira um código de verificação.");
    return;
  }

  const docRef = doc(db, "codigos_acesso", codigo);
  const docSnap = await getDoc(docRef);

  if (!docSnap.exists() || docSnap.data().usado) {
    alert("Código de verificação inválido ou já utilizado.");
    return;
  }

  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, senha);
    const user = userCredential.user;

    await setDoc(doc(db, "usuarios", user.uid), {
      nome: nome,
      email: email,
      codigoVerificacao: codigo
    });

    await updateDoc(docRef, { usado: true });

    alert("Cadastro realizado com sucesso!");
    window.location.href = "https://metodo-forja-mf.github.io/Login/";
  } catch (error) {
    alert("Erro ao cadastrar: " + error.message);
  }
});