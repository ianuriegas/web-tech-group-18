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

    $uploadDirectory = __DIR__ . '/assets/images/';
    $username = isset($_COOKIE['username']) ? $_COOKIE['username'] : 'default_user';
    $postText = $_POST['postText'];
    $hyperlink = isset($_POST['hyperlink']) ? $_POST['hyperlink'] : null;
    $category = $_POST['category'];
    
    $fileUploader = null;
    if (!empty($_FILES['fileUploader']['name'])) {

        // Output information about the uploaded file
        echo '<pre>';
        print_r($_FILES);
        echo '</pre>';
    
        // Get the original file name
        $originalFileName = $_FILES['fileUploader']['name'];
    
        // Replace spaces with dashes in the file name
        $fileUploader = str_replace(' ', '-', $originalFileName);
    
        // Define the target path where the file will be moved to
        $targetPath = $uploadDirectory . $fileUploader;
    
        // Output file type and size information
        echo 'File Type: ' . $_FILES['fileUploader']['type'] . '<br>';
        echo 'File Size: ' . $_FILES['fileUploader']['size'] . ' bytes<br>';
    
        // Move the uploaded file to the target path
        if (move_uploaded_file($_FILES['fileUploader']['tmp_name'], $targetPath)) {
            echo 'File has been uploaded successfully.';
        } else {
            // Throw an exception if there's an error moving the file
            throw new Exception('Error uploading file. Target Path: ' . $targetPath);
        }
    }

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