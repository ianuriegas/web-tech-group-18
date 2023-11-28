<?php

error_reporting(E_ALL);
$db_host = "localhost";
$db_user = "root";
$db_pass = "mysqlpassword";
$db_name = "main_database";

$conn = new mysqli($db_host, $db_user, $db_pass, $db_name);

if (mysqli_connect_errno()) {
    echo 'Connection to database failed: ' . mysqli_connect_error();
    exit();
}

// Start a transaction
$conn->begin_transaction();

try {
    
    $username = $_POST['username'];
    $password = $_POST['password'];

    $sql = "SELECT * FROM users WHERE username = '$username' AND password = '$password'";
    
    // Execute the query
    $result = $conn->query($sql);

    if ($result->num_rows > 0) {
        // Commit the transaction if there is a match
        $row = $result->fetch_assoc();
        echo $row;
        // if ($row['admin'] == 1) {

        //     // Redirect to admin page if user is an admin
        //     header("Location: admin/admin-dashboard.html");
        //     exit();
        // }
        $conn->commit();
        echo "Login successful";
    } else {
        // Rollback the transaction if there is an error
        $conn->rollback();
        echo "Invalid username or password";
    }
} catch (Exception $e) {
    // Handle exceptions and roll back the transaction
    $conn->rollback();
    echo "Exception: " . $e->getMessage();
}

// Close the database connection
$conn->close();
?>