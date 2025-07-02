
// Import Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-app.js";
import { getFirestore, collection, query, where, getDocs, doc, updateDoc } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-firestore.js";
import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyBKtKrRP4AjLHcdeEdyTlTZC9hHdv5y7no",
  authDomain: "metodo-forja.firebaseapp.com",
  projectId: "metodo-forja",
  storageBucket: "metodo-forja.appspot.com",
  messagingSenderId: "949719386034",
  appId: "1:949719386034:web:5c015b5fbe082821ea86ab",
  measurementId: "G-6Z9EJLY5LZ"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

document.getElementById("formCadastro").addEventListener("submit", async (e) => {
  e.preventDefault();
  const nome = document.getElementById("nome").value;
  const email = document.getElementById("email").value;
  const senha = document.getElementById("senha").value;
  const codigo = document.getElementById("codigo").value.trim().toUpperCase();
  const mensagem = document.getElementById("mensagem");

  try {
    const codigosRef = collection(db, "codigos_acesso");
    const q = query(codigosRef, where("codigo", "==", codigo), where("usado", "==", false));
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      mensagem.innerText = "❌ Código de acesso inválido ou já utilizado.";
      return;
    }

    const codigoDoc = querySnapshot.docs[0];
    await createUserWithEmailAndPassword(auth, email, senha);

    // Marcar como usado
    await updateDoc(doc(db, "codigos_acesso", codigoDoc.id), {
      usado: true,
      email: email
    });

    mensagem.style.color = "lime";
    mensagem.innerText = "✅ Cadastro realizado com sucesso!";
  } catch (error) {
    mensagem.innerText = `Erro: ${error.message}`;
  }
});
