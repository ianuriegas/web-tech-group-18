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
    // get user ID from request
    $userId = json_decode(file_get_contents("php://input"))->userId;

    // validate the user ID
    if (!is_numeric($userId)) {
        throw new Exception('Invalid user ID');
    }

    // execute the SQL statement to remove the user
    $sql = "DELETE FROM users WHERE id = $userId";
    $result = $conn->query($sql);

    if ($result) {
        // if successful, commit 
        $conn->commit();
        echo json_encode(['status' => 'success', 'message' => 'User removed successfully']);
    } else {
        // if error, rollback
        $conn->rollback();
        echo json_encode(['status' => 'error', 'message' => 'Error removing user']);
    }
} catch (Exception $e) {
    // handle exceptions
    $conn->rollback();
    echo json_encode(['status' => 'error', 'message' => 'Exception: ' . $e->getMessage()]);
}

// close db connection
$conn->close();

?>