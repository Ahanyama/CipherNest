document.getElementById("signupForm").addEventListener("submit", function (e) {
    let password = document.querySelector("input[name='password']").value;
    let confirmPassword = document.querySelector("input[name='confirm_password']").value;

    if (password !== confirmPassword) {
        alert("Passwords do not match!");
        e.preventDefault(); // Prevent form submission
    }
});