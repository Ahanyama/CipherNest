document.getElementById('signup-form').addEventListener('submit', function(event) {
    event.preventDefault();
    createAccount();
});

function createAccount() {
    const email = document.getElementById("signup-email").value;
    const password = document.getElementById("signup-password").value;
    const message = document.getElementById("signup-message");

    fetch("http://yourserver.com/signup", {  // Replace with your actual backend URL
        method: "POST",  // Ensure you're using the correct method
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ email, password }) // Sending data as JSON
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(`Server responded with ${response.status}`);
        }
        return response.json();
    })
    .then(data => {
        message.innerText = "Account created successfully!";
        message.style.color = "green";
    })
    .catch(error => {
        message.innerText = "Error: " + error.message;
        message.style.color = "red";
    });
}