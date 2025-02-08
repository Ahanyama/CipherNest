import { auth } from "./firebase-config.js";
import { createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

function createAccount() {
    let email = document.getElementById("signup-email").value;
    let password = document.getElementById("signup-password").value;

    createUserWithEmailAndPassword(auth, email, password)
        .then(() => {
            document.getElementById("signup-message").innerText = "Account created!";
            setTimeout(() => window.location.href = "game.html", 1500);
        })
        .catch(error => document.getElementById("signup-message").innerText = error.message);
}

function redirectToLogin() {
    window.location.href = "index.html";
}

window.createAccount = createAccount;
window.redirectToLogin = redirectToLogin;
