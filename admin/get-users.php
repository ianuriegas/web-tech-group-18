<?php
// database connection
$db_host = "localhost";
$db_user = "root";
$db_pass = "mysqlpassword";
$db_name = "main_database";

// Create connection
$conn = new mysqli($db_host, $db_user, $db_pass, $db_name);

// Check connection
if (mysqli_connect_errno()) {
    echo 'Connection to database failed: ' . mysqli_connect_error();
    exit();
}

// fetch users from the database
$sql = "SELECT * FROM users";
$result = $conn->query($sql);

$users = array();

if ($result->num_rows > 0) {
    while($row = $result->fetch_assoc()) {
        $users[] = $row;
    }
}

// Close the connection
$conn->close();

// Send JSON response
header('Content-Type: application/json');
echo json_encode($users);
?>