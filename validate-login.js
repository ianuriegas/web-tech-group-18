document.addEventListener('DOMContentLoaded', function () {
    const userForm = document.getElementById('loginForm');
    const failMessage = document.getElementById('failMessage');

    userForm.addEventListener('submit', function (event) {
        event.preventDefault(); // Prevent the default form submission
        console.log('Form submitted'); // Add this line for debugging

        const formData = new FormData(userForm);

        // Call the function to send data to the server
        checkUserCredentials(formData, userForm, failMessage);

    });
});

function checkUserCredentials(formData, userForm, failMessage) {
    const username = formData.get('username');
    const password = formData.get('password');
    console.log('Username:', username); // Add this line for debugging
    console.log('Password:', password);

    // Note: encodeURIComponent is used to properly encode the values in the URL
    const url = './user-validation.php';

    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams(formData).toString(),
    })
    .then(wait(1000))
    .then(response => response.json())
    .then(wait(1000))
    .then(data => {
        console.log('Received data:', data);

        if (data.status === 'error' && data.message === "Invalid username or password") {
            console.log('Invalid credentials');
            failMessage.style.display = 'block';
            userForm.reset();
        } else if (data.status === 'success' && data.admin === '1') {
            console.log('Admin login successful');
            // Set cookies for admin and username
            document.cookie = "admin=true; path=/";
            document.cookie = `username=${data.username}; path=/`;
            // Redirect to admin-dashboard.html
            window.location.href = 'admin/admin-dashboard.html';
        } else {
            console.log('Login successful');
            // Set cookies for regular user and username
            document.cookie = "admin=false; path=/";
            document.cookie = `username=${data.username}; path=/`;
            // Redirect to index.html
            window.location.href = 'index.html';
            failMessage.style.display = 'none';
            userForm.reset();
        }
    })
    .catch(error => {
        console.error('Error:', error);
    });
}

// function getDataFromForm() {
//     let username = document.getElementsByName("username")[0].value;
//     runAJAX(username);
// }

// function runAJAX(username) {
//     const xhttp = new XMLHttpRequest();
//     // xhttp.onload = function() {
//     //     window.location.href = 'index.html';
//     // }
//     xhttp.open("POST", "session.php" + "?username=" + username, true);
//     xhttp.open("POST", "cookie.php" + "?username=" + username, true);
//     xhttp.send();
// }