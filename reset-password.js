function verifyOTP() {
    let email = document.getElementById("reset-email").value;
    let otp = document.getElementById("otp").value;

    fetch("http://localhost/verify-otp.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, otp }),
    })
    .then(response => response.json())
    .then(data => document.getElementById("reset-message").innerText = data.message || data.error)
    .catch(error => document.getElementById("reset-message").innerText = "Something went wrong!");
}

function resetPassword() {
    let email = document.getElementById("reset-email").value;
    let otp = document.getElementById("otp").value;
    let password = document.getElementById("new-password").value;

    fetch("http://localhost/reset-password.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, otp, password }),
    })
    .then(response => response.json())
    .then(data => document.getElementById("reset-message").innerText = data.message || data.error)
    .catch(error => document.getElementById("reset-message").innerText = "Something went wrong!");
}

window.verifyOTP = verifyOTP;
window.resetPassword = resetPassword;
