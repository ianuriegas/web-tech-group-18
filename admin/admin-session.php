<?php
    session_start();
    $_SESSION['username'] = $_POST['username'];
    $_SESSION['admin'] = "1";
    header("Location: http://ec2-18-220-249-1.us-east-2.compute.amazonaws.com/web-tech-group-18/admin/admin-dashboard.html");
?>