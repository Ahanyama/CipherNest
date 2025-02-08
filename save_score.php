<?php
include "db.php";  // Connect to the database

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $name = $_POST["name"];
    $score = $_POST["score"];
    $level = $_POST["level"];

    // Prepare the SQL statement to prevent SQL injection
    $stmt = $conn->prepare("INSERT INTO players (name, score, level) VALUES (?, ?, ?)");
    $stmt->bind_param("sii", $name, $score, $level);

    if ($stmt->execute()) {
        echo "Score saved successfully!";
    } else {
        echo "Error: " . $conn->error;
    }
    $stmt->close();
    $conn->close();
}
?>