
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

const firebaseConfig = {
    apiKey: "AIzaSyBKtKrRP4AjLHcdeEdyTlTZC9hT5zDdhnw",
    authDomain: "metodo-forja.firebaseapp.com",
    projectId: "metodo-forja",
    storageBucket: "metodo-forja.appspot.com",
    messagingSenderId: "949719386034",
    appId: "1:949719386034:web:5c015b5fbe082a93f9f8f6",
    measurementId: "G-6Z9EJLY5LZ"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

document.getElementById('cadastroForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const codigo = document.getElementById('codigo').value;
    const mensagemErro = document.getElementById('mensagemErro');

    const codigosValidos = ['FORJA123', 'ACESSOLIBERADO', 'MF2025']; // códigos válidos

    if (!codigosValidos.includes(codigo.trim())) {
        mensagemErro.textContent = "Código de acesso inválido.";
        return;
    }

    createUserWithEmailAndPassword(auth, email, password)
        .then(() => {
            window.location.href = "https://metodo-forja-mf.github.io/Login/";
        })
        .catch((error) => {
            mensagemErro.textContent = "Erro ao cadastrar: " + error.message;
        });
});
