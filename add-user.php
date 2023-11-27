<?php
$db_host = "localhost";
$db_user = "root";
$db_pass = "mysqlpassword";
$db_name = "main_database";

$conn = new mysqli($db_host, $db_user, $db_pass, $db_name);

if (mysqli_connect_errno()) {
    echo 'Connection to database failed:' . mysqli_connect_error();
    exit();
}

// Process the form submission
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $username = mysqli_real_escape_string($conn, $_POST["username"]);
    $password = mysqli_real_escape_string($conn, $_POST["password"]);

    // Hash the password (for security)
    $hashed_password = password_hash($password, PASSWORD_BCRYPT, ['cost' => 12]);

    // Set admin to false by default
    $admin = false;

    // Use prepared statements to prevent SQL injection
    $stmt = $conn->prepare("INSERT INTO user_table (admin, username, password) VALUES (?, ?, ?)");
    $stmt->bind_param("sss", $admin, $username, $hashed_password);

    if ($stmt->execute()) {
        echo "Account created successfully";
    } else {
        echo "Error creating account";
        // Log the error instead of exposing details
        error_log($stmt->error);
    }

    $stmt->close();
}

$conn->close();
?>