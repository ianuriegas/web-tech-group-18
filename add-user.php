<?php

$db_host = "localhost";
$db_user = "root";
$db_pass = "mysqlpassword";
$db_name = "main_database";

$conn = new mysqli($db_host, $db_user, $db_pass, $db_name);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$admin = 0;
$username = $_POST['username'];
$password = $_POST['password'];

INSERT INTO users (admin, username, password) 
VALUES (1,'admin', 'admin@123');

$sql = "INSERT INTO users (admin, username, password) VALUES ('$admin', '$username', '$password')";

if ($conn->query($sql) === TRUE) {
    echo "Data inserted successfully";
} else {
    echo "Error: " . $sql . "<br>" . $conn->error;
}

$conn->close();

?>