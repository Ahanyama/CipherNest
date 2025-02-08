<?php
// Database credentials
$host = "localhost";  // Server name (default: localhost)
$user = "root";       // Default XAMPP username
$pass = "";           // Default XAMPP password (empty)
$dbname = "math_quiz"; // The database name

// Create a connection to MySQL
$conn = new mysqli($host, $user, $pass, $dbname);

// Check if the connection is successful
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Uncomment to test the connection
// echo "Connected successfully!";
?>