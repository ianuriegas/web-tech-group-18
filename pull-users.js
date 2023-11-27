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
    fetch('./add-user.php', {
        method: 'POST',
        body: formData,
    })
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