document.addEventListener('DOMContentLoaded', function () {
    const userForm = document.getElementById('userForm');

    userForm.addEventListener('submit', function (event) {
        event.preventDefault(); // Prevent the default form submission

        const formData = new FormData(userForm);

        // Call the function to send data to the server
        sendUserDataToDB(formData);
    });
});

function sendUserDataToDB(formData) {
    const username = formData.get('username');
    const password = formData.get('password');

    // Note: encodeURIComponent is used to properly encode the values in the URL
    const url = `./add-user.php?username=${encodeURIComponent(username)}&password=${encodeURIComponent(password)}`;

    fetch(url)
    .then(response => response.text())
    .then(data => {
        console.log(data); // Log the response from the PHP script
        // Add any additional client-side logic here
    })
    .catch(error => {
        console.error('Error:', error);
        // Handle errors
    });
}