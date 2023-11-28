document.addEventListener('DOMContentLoaded', function () {
    console.log('Current path:', window.location.pathname);

    if (window.location.pathname === '/web-tech-group-18/login.html') {
        const userForm = document.getElementById('loginForm');
        const failMessage = document.getElementById('failMessage');

        userForm.addEventListener('submit', function (event) {
            event.preventDefault(); // Prevent the default form submission
            console.log('Form submitted'); // Add this line for debugging

            const formData = new FormData(userForm);

            // Call the function to send data to the server
            checkUserCredentials(formData, userForm, failMessage);

        });
    }   
});

function checkUserCredentials(formData, userForm, failMessage) {
    const username = formData.get('username');
    const password = formData.get('password');
    console.log('Username:', username); // Add this line for debugging
    console.log('Password:', password);

    // Note: encodeURIComponent is used to properly encode the values in the URL
    const url = './user-login.php';

    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams(formData).toString(),
    })
    .then(response => response.text())
    .then(data => {
        console.log('Received data:', data);

        if (data.trim() === "Invalid username or password") {
            console.log('Invalid credentials');
            failMessage.style.display = 'block';
            userForm.reset();
        } else {
            console.log('Login successful');
            // Redirect to index.html
            window.location.href = 'index.html';

            // Display username next to the account icon
            const userWelcome = document.getElementById('loggedUser');
            userWelcome.textContent = `${username}`;

            // reset form 
            failMessage.style.display = 'none';
            userForm.reset();
        }
    })
    .catch(error => {
        console.error('Error:', error);
        // Handle errors
    });
}