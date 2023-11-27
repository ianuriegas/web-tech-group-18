<?php

$db_host = "localhost";
$db_user = "root";
$db_pass = "mysqlpassword";
$db_name = "main_database";

$conn = new mysqli($db_host, $db_user, $db_pass, $db_name);

if (mysqli_connect_errno()) {
    echo 'Connection to database failed: ' . mysqli_connect_error();
    exit();
}

echo "Database connection success<br>";

// Start a transaction
$conn->begin_transaction();

try {
    $admin = false;
    $username = $_POST['username'];
    $password = $_POST['password'];

    $sql = "INSERT INTO users (admin, username, password) VALUES ('$admin', '$username', '$password')";

    if ($conn->query($sql) === TRUE) {
        // Commit the transaction if the query is successful
        $conn->commit();
        echo "Data inserted successfully";
    } else {
        // Rollback the transaction if there is an error
        $conn->rollback();
        echo "Error: " . $sql . "<br>" . $conn->error;
    }
} catch (Exception $e) {
    // Handle exceptions and roll back the transaction
    $conn->rollback();
    echo "Exception: " . $e->getMessage();
}

// Close the database connection
$conn->close();
?>