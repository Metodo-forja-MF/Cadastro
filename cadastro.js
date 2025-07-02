import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-auth.js";
import { getFirestore, doc, getDoc, setDoc, updateDoc } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "SUA_API_KEY",
    authDomain: "SEU_AUTH_DOMAIN",
    projectId: "SEU_PROJECT_ID",
    storageBucket: "SEU_BUCKET",
    messagingSenderId: "SEU_MSG_ID",
    appId: "SEU_APP_ID"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

document.getElementById("cadastroForm").addEventListener("submit", async (e) => {
    e.preventDefault();

    const nome = document.getElementById("nome").value;
    const email = document.getElementById("email").value;
    const senha = document.getElementById("senha").value;
    const codigo = document.getElementById("codigo").value;

    const codigoRef = doc(db, "codigos", codigo);
    const codigoSnap = await getDoc(codigoRef);

    if (!codigoSnap.exists() || codigoSnap.data().usado) {
        alert("Código de verificação inválido ou já utilizado!");
        return;
    }

    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, senha);
        await setDoc(doc(db, "usuarios", userCredential.user.uid), {
            nome: nome,
            email: email,
            codigo: codigo
        });

        await updateDoc(codigoRef, {
            usado: true
        });

        window.location.href = "https://metodo-forja-mf.github.io/Login/";
    } catch (error) {
        alert("Erro ao cadastrar: " + error.message);
    }
});
