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

// start transaction
$conn->begin_transaction();

try {
    // get post data
    $postData = json_decode(file_get_contents('php://input'), true);
    
    // check if username and newUsername are provided
    if (isset($postData['currentUsername'], $postData['newUsername'])) {
        $currentUsername = $postData['currentUsername'];
        $newUsername = $postData['newUsername'];

        // update the user's username
        $updateSql = "UPDATE users SET username = '$newUsername' WHERE username = '$currentUsername'";
        $conn->query($updateSql);

        // commit
        $conn->commit();

        // send json response
        echo json_encode(['status' => 'success', 'message' => 'Username updated successfully']);
    } else {
        echo json_encode(['status' => 'error', 'message' => 'Username not provided.']);
    }
} catch (Exception $e) {
    // handle exceptions
    $conn->rollback();
    echo json_encode(['status' => 'error', 'message' => 'Exception: ' . $e->getMessage()]);
}

// Close db connection
$conn->close();
?>