<?php
include 'connection.php';  // Connect to the database
session_start();

$user_id = $_SESSION['user_id'];  // Get logged-in user's ID

// Get the user's current level from the database
$result = $conn->query("SELECT level FROM scores WHERE user_id='$user_id'");
$row = $result->fetch_assoc();
$level = $row['level'];  // Fetch player's current level

// Fetch 10 random questions for the level
$sql = "SELECT * FROM questions WHERE level='$level' ORDER BY RAND() LIMIT 10";
$result = $conn->query($sql);

$questions = [];  // Array to store fetched questions
while ($row = $result->fetch_assoc()) {
    $questions[] = $row;
}

// Send the questions to the frontend in JSON format
echo json_encode($questions);
?>