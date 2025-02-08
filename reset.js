function sendOTP() {
    let email = document.getElementById("reset-email").value;

    fetch("http://localhost/send-otp.php", { // Change URL based on your server
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
    })
    .then(response => response.json())
    .then(data => document.getElementById("reset-message").innerText = data.message || data.error)
    .catch(error => document.getElementById("reset-message").innerText = "Something went wrong!");
}

window.sendOTP = sendOTP;
