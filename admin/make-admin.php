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

// check if post request contains the user ID
if (isset($_POST['userId'])) {
    $userId = $_POST['userId'];

    $conn->begin_transaction();

    try {
        // Use prepared statement to update the user's admin status
        $updateSql = "UPDATE users SET admin = 1 WHERE id = ?";
        $stmt = $conn->prepare($updateSql);

        if ($stmt) {
            $stmt->bind_param("i", $userId); // "i" represents integer type
            $stmt->execute();

            // Check for errors and send a response
            if ($stmt->error) {
                echo json_encode(['status' => 'error', 'message' => 'Error updating user: ' . $stmt->error]);
                $conn->rollback();
            } else {
                // Commit the transaction
                $conn->commit();
                echo json_encode(['status' => 'success', 'message' => 'User made admin successfully']);
            }

            $stmt->close();
        } else {
            echo json_encode(['status' => 'error', 'message' => 'Prepared statement failed.']);
            $conn->rollback();
        }
    } catch (Exception $e) {
        // Handle exceptions
        echo json_encode(['status' => 'error', 'message' => 'Exception: ' . $e->getMessage()]);
        $conn->rollback();
    }
} else {
    echo json_encode(['status' => 'error', 'message' => 'User ID not provided.']);
}

// Close db connection
$conn->close();
?>