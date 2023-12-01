async function fetchAndRenderUsers() {
    const response = await fetch('fetch-users.php');
    const users = await response.json();
    updateUsername(users);
}

async function updateUsername(users) {
    try {
        // Get the current username from the cookie
        const currentUsername = getCookie('username');

        // Get the new username from the input field
        const newUsername = document.getElementById('newUsernameInput').value;

        // Find the user in the array based on the current username
        const user = users.find(user => user.username === currentUsername);

        if (!user) {
            console.error('User not found.');
            return;
        }

        const response = await fetch('update-username.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ currentUsername, newUsername }),,
        });

        const data = await response.json();

        if (data.status === 'success') {
            // Update the displayed username
            document.getElementById('username-info').innerHTML = newUsername;

            // Close the modal after updating
            closeModal('usernameModal');
        } else {
            // Handle error
            console.error(data.message);
        }
    } catch (error) {
        console.error('Error:', error);
    }
}