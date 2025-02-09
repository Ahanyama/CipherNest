document.getElementById('login-form').addEventListener('submit', function(event) {
    event.preventDefault();
    login();
});

function login() {
    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;
    fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
    })
    .then(response => response.json())
    .then(data => {
        if (data.token) {
            localStorage.setItem('token', data.token);
            window.location.href = "game.html";
        } else {
            document.getElementById("message").innerText = data.message || data.error;
        }
    })
    .catch(error => document.getElementById("message").innerText = "Something went wrong!");
}

function logout() {
    localStorage.removeItem('token');
    window.location.href = "index.html";
}