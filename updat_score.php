<?php
include 'connection.php';
session_start(); // Start session

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $email = $_POST["email"];
    $password = $_POST["password"];

    // Check user in database
    $sql = "SELECT id, password FROM users WHERE email='$email'";
    $result = $conn->query($sql);

    if ($result->num_rows > 0) {
        $row = $result->fetch_assoc();
        
        if (password_verify($password, $row["password"])) { // Verify hashed password
            $_SESSION["user_id"] = $row["id"]; // Store user session
            header("Location: game.html"); // Redirect to the game
        } else {
            echo "Incorrect password!";
        }
    } else {
        echo "User not found!";
    }
    
    $conn->close();
}
?>