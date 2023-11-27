<?php

$db_host = "localhost";
$db_user = "root";
$db_pass = "mysqlpassword";
$db_name = "main_database";

$conn = new mysqli($db_host, $db_user, $db_pass, $db_name);

if (mysqli_connect_errno())
{
    echo 'Connection to database failed:'.mysqli_connect_error();
    exit();
}

echo "database connection success<br>";

// Process the form submission
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $username = $_POST["username"];
    $password = $_POST["password"];

    // Hash the password (for security)
    $hashed_password = password_hash($password, PASSWORD_DEFAULT);

    // Set admin to false by default
    $admin = false;

    // Insert user data into the database
    $sql = "INSERT INTO user_table (admin, username, password) VALUES ('$admin', '$username', '$hashed_password')";

    if ($conn->query($sql) === TRUE) {
        echo "Account created successfully";
    } else {
        echo "Error: " . $sql . "<br>" . $conn->error;
    }
}

$conn->close();
?>