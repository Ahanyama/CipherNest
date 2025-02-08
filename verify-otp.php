<?php
require 'db.php';

header("Content-Type: application/json");
$data = json_decode(file_get_contents("php://input"), true);
$email = $data["email"] ?? "";
$otp = $data["otp"] ?? "";

if (empty($email) || empty($otp)) {
    echo json_encode(["error" => "Email and OTP are required"]);
    exit;
}

$conn = getDB();
$stmt = $conn->prepare("SELECT * FROM password_resets WHERE email = ? AND otp = ? AND expires_at > NOW()");
$stmt->bind_param("ss", $email, $otp);
$stmt->execute();
$result = $stmt->get_result();
$stmt->close();

if ($result->num_rows > 0) {
    echo json_encode(["message" => "OTP verified successfully"]);
} else {
    echo json_encode(["error" => "Invalid or expired OTP"]);
}
?>
