<?php

$db_host = "localhost";
$db_user = "root";
$db_pass = "mysqlpassword";
$db_name = "main_database";

$conn = new mysqli($db_host, $db_user, $db_pass, $db_name);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $admin = 0;
    $username = $_POST['username'];
    $password = $_POST['password'];

    // Hash the password before storing it
    $hashedPassword = password_hash($password, PASSWORD_DEFAULT);

    $sql = "INSERT INTO users (admin, username, password) VALUES ('$admin', '$username', '$hashedPassword')";

    if ($conn->query($sql) === TRUE) {
        // Redirect back to the index page after successful insertion
        header("Location: index.html");
        exit(); // Ensure that no other output is sent
    } else {
        echo "Error: " . $sql . "<br>" . $conn->error;
    }
}

$conn->close();

?>