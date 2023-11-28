document.addEventListener('DOMContentLoaded', function () {
    const userForm = document.getElementById('loginForm');

    userForm.addEventListener('submit', function (event) {
        event.preventDefault(); // Prevent the default form submission
        console.log('Form submitted'); // Add this line for debugging

        const formData = new FormData(userForm);

        // Call the function to send data to the server
        checkUserCredentials(formData, userForm);

    });
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
        console.log(data);
            // Display success message
            console.log('Success!');
            if(data == "Invalid username or password") {
                failMessage.style.display = 'block';
            }
            // Clear the form
            userForm.reset();
    })
    .catch(error => {
        console.error('Error:', error);
        // Handle errors
    });
}