function sendOTP() {
    let email = document.getElementById("reset-email").value;
    fetch("/api/auth/send-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
    })
    .then(response => response.json())
    .then(data => document.getElementById("reset-message").innerText = data.message || data.error)
    .catch(error => document.getElementById("reset-message").innerText = "Something went wrong!");
}

function resetPassword() {
    let email = document.getElementById("reset-email").value;
    let otp = document.getElementById("otp").value;
    let password = document.getElementById("new-password").value;
    fetch("/api/auth/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, otp, password }),
    })
    .then(response => response.json())
    .then(data => {
        document.getElementById("reset-message").innerText = data.message || data.error;
        if (data.message) {
            document.getElementById("reset-form").reset();
        }
    })
    .catch(error => document.getElementById("reset-message").innerText = "Something went wrong!");
}

document.getElementById('reset-form').addEventListener('submit', function(event) {
    event.preventDefault();
    resetPassword();
});