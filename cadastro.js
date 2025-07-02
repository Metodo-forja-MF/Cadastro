
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

const firebaseConfig = {
    apiKey: "SUA_API_KEY",
    authDomain: "metodo-forja.firebaseapp.com",
    projectId: "metodo-forja",
    storageBucket: "metodo-forja.appspot.com",
    messagingSenderId: "949719386034",
    appId: "1:949719386034:web:xxx",
    measurementId: "G-xxx"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

window.cadastrarUsuario = function(e) {
    e.preventDefault();
    const email = document.getElementById("email").value;
    const senha = document.getElementById("senha").value;
    const codigo = document.getElementById("codigo").value;

    const codigosValidos = ["FORJA2024", "FORJA123", "MFVIP"];

    if (!codigosValidos.includes(codigo.trim())) {
        alert("Código de verificação inválido.");
        return false;
    }

    createUserWithEmailAndPassword(auth, email, senha)
        .then(() => {
            window.location.href = "https://metodo-forja-mf.github.io/Login/";
        })
        .catch((error) => {
            alert("Erro ao cadastrar: " + error.message);
        });

    return false;
};
