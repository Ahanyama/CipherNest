<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");

session_start();
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "math_quiz";

// Connect to MySQL
$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die(json_encode(["error" => "Connection failed: " . $conn->connect_error]));
}

// Get JSON input
$data = json_decode(file_get_contents("php://input"), true);

if (!isset($data["email"]) || !isset($data["password"])) {
    die(json_encode(["error" => "Email and password required."]));
}

$email = $data["email"];
$password = $data["password"];

// Fetch user from the database
$sql = "SELECT id, password FROM users WHERE email = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("s", $email);
$stmt->execute();
$result = $stmt->get_result();

if ($row = $result->fetch_assoc()) {
    if (password_verify($password, $row["password"])) {
        $_SESSION["user_id"] = $row["id"]; // Start session
        echo json_encode(["message" => "Login successful!"]);
    } else {
        echo json_encode(["error" => "Invalid password."]);
    }
} else {
    echo json_encode(["error" => "User not found."]);
}

$stmt->close();
$conn->close();
?>