import { auth } from "./firebase-config.js";
import { signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

function login() {
    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;

    signInWithEmailAndPassword(auth, email, password)
        .then(() => window.location.href = "game.html")
        .catch(error => document.getElementById("message").innerText = error.message);
}

function redirectToSignup() {
    window.location.href = "signup.html";
}

window.login = login;
window.redirectToSignup = redirectToSignup;
