import { auth } from "./firebase-config.js";
import { sendPasswordResetEmail } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

function sendOTP() {
    let email = document.getElementById("reset-email").value;
    sendPasswordResetEmail(auth, email)
        .then(() => document.getElementById("reset-message").innerText = "OTP sent to email!")
        .catch(error => document.getElementById("reset-message").innerText = error.message);
}

window.sendOTP = sendOTP;
