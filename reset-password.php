<?php
require 'db.php';

header("Content-Type: application/json");
$data = json_decode(file_get_contents("php://input"), true);
$email = $data["email"] ?? "";
$otp = $data["otp"] ?? "";
$new_password = $data["password"] ?? "";

if (empty($email) || empty($otp) || empty($new_password)) {
    echo json_encode(["error" => "All fields are required"]);
    exit;
}

// Verify OTP
$conn = getDB();
$stmt = $conn->prepare("SELECT * FROM password_resets WHERE email = ? AND otp = ? AND expires_at > NOW()");
$stmt->bind_param("ss", $email, $otp);
$stmt->execute();
$result = $stmt->get_result();
$stmt->close();

if ($result->num_rows > 0) {
    // Hash new password and update user table (assuming a 'users' table exists)
    $hashed_password = password_hash($new_password, PASSWORD_BCRYPT);
    $update_stmt = $conn->prepare("UPDATE users SET password = ? WHERE email = ?");
    $update_stmt->bind_param("ss", $hashed_password, $email);
    $update_stmt->execute();
    $update_stmt->close();

    // Delete OTP after successful reset
    $delete_stmt = $conn->prepare("DELETE FROM password_resets WHERE email = ?");
    $delete_stmt->bind_param("s", $email);
    $delete_stmt->execute();
    $delete_stmt->close();

    echo json_encode(["message" => "Password reset successfully"]);
} else {
    echo json_encode(["error" => "Invalid or expired OTP"]);
}
?>
