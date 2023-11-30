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
    $username = isset($_COOKIE['username']) ? $_COOKIE['username'] : 'default_user';
    $postText = $_POST['postText'];
    $fileUploader = isset($_POST['fileUploader']) ? $_POST['fileUploader'] : null;
    $hyperlink = isset($_POST['hyperlink']) ? $_POST['hyperlink'] : null;
    $category = $_POST['category'];


    $sql = "INSERT INTO posts (username, body, image, hyperlink, category) VALUES ('$username', '$postText', '$fileUploader', '$hyperlink', '$category')";

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