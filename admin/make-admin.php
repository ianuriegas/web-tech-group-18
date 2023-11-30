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

    // check if userId is provided
    if (isset($postData['userId'])) {
        $userId = $postData['userId'];

        // update the user to make them an admin
        $updateSql = "UPDATE users SET admin = 1 WHERE id = $userId";
        $conn->query($updateSql);

        // commit
        $conn->commit();

        // send json response
        echo json_encode(['status' => 'success', 'message' => 'User made admin successfully']);
    } else {
        echo json_encode(['status' => 'error', 'message' => 'User ID not provided.']);
    }
} catch (Exception $e) {
    // handle exceptions
    $conn->rollback();
    echo json_encode(['status' => 'error', 'message' => 'Exception: ' . $e->getMessage()]);
}

// Close db connection
$conn->close();
?>