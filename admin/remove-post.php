<?php

error_reporting(E_ALL);
$db_host = "localhost";
$db_user = "root";
$db_pass = "mysqlpassword";
$db_name = "main_database";

$conn = new mysqli($db_host, $db_user, $db_pass, $db_name);

if (mysqli_connect_errno()) {
    echo json_encode(['status' => 'error', 'message' => 'Connection to database failed: ' . mysqli_connect_error()]);
    exit();
}

// start transaction
$conn->begin_transaction();

try {
    // get post ID from request
    $postId = json_decode(file_get_contents("php://input"))->postId;

    // validate the post ID
    if (!is_numeric($postId)) {
        throw new Exception('Invalid post ID');
    }

    // execute the SQL statement to remove the post
    $sql = "DELETE FROM posts WHERE id = $postId";
    $result = $conn->query($sql);

    if ($result) {
        // if successful, commit 
        $conn->commit();
        echo json_encode(['status' => 'success', 'message' => 'Post removed successfully']);
    } else {
        // if error, rollback
        $conn->rollback();
        echo json_encode(['status' => 'error', 'message' => 'Error removing post']);
    }
} catch (Exception $e) {
    // handle exceptions
    $conn->rollback();
    echo json_encode(['status' => 'error', 'message' => 'Exception: ' . $e->getMessage()]);
}

// close db connection
$conn->close();
?>