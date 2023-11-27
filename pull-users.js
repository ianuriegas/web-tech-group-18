function sendUserDataToDB() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

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