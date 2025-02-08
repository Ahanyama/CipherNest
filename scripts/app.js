import { auth } from "./firebase-config.js";
import { signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

function login() {
    let email = document.getElementById("email").value.trim();
    let password = document.getElementById("password").value.trim();

    // Basic validation
    if (!email) {
        document.getElementById("message").innerText = "Please enter your email address.";
        return;
    }
    if (!password) {
        document.getElementById("message").innerText = "Please enter your password.";
        return;
    }

    signInWithEmailAndPassword(auth, email, password)
        .then(() => {
            // Redirect to game.html upon successful login
            window.location.href = "game.html";
        })
        .catch((error) => {
            // Handle errors more gracefully
            switch (error.code) {
                case "auth/invalid-email":
                    document.getElementById("message").innerText = "Invalid email address.";
                    break;
                case "auth/user-not-found":
                    document.getElementById("message").innerText = "No user found with this email address.";
                    break;
                case "auth/wrong-password":
                    document.getElementById("message").innerText = "Incorrect password.";
                    break;
                default:
                    document.getElementById("message").innerText = "An error occurred. Please try again later.";
                    console.error("Login error:", error.message);
            }
        });
}

function redirectToSignup() {
    window.location.href = "signup.html";
}

// Expose functions to the global window object
window.login = login;
window.redirectToSignup = redirectToSignup;