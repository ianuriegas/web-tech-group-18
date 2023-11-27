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

echo "database connection success<br>";

// Process the JSON data from the AJAX request
$data = json_decode(file_get_contents("php://input"));

// Check if the required fields are present
if (isset($data->username) && isset($data->password)) {
    $username = $data->username;
    $password = $data->password;

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
} else {
    echo "Error: Missing required fields";
}

$conn->close();
?>