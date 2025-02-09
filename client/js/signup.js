document.getElementById('signup-form').addEventListener('submit', function(event) {
    event.preventDefault();
    createAccount();
});

function createAccount() {
    let email = document.getElementById("signup-email").value;
    let password = document.getElementById("signup-password").value;
    fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
    })
    .then(response => response.json())
    .then(data => {
        document.getElementById("signup-message").innerText = data.message || data.error;
        if (data.message) {
            setTimeout(() => window.location.href = "index.html", 1500);
        }
    })
    .catch(error => document.getElementById("signup-message").innerText = "Something went wrong!");
}