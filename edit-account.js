document.addEventListener('DOMContentLoaded', function () {
    const usernameForm = document.getElementById('usernameForm');

    usernameForm.addEventListener('submit', async function (event) {
        event.preventDefault(); // Prevent the default form submission behavior

        // Fetch users
        const response = await fetch('fetch-users.php');
        const users = await response.json();

        updateUsername(users); // Call your updateUsername function
    });

    const passwordForm = document.getElementById('passwordForm')
    passwordForm.addEventListener('submit', async function (event) {
        event.preventDefault(); // Prevent the default form submission behavior

        // Fetch users
        const response = await fetch('fetch-users.php');
        const users = await response.json();

        updatePassword(users); // Call your updateUsername function
    });
});

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
            body: JSON.stringify({ currentUsername, newUsername }),
        });

        const data = await response.json();

        if (data.status === 'success') {
            // Update the displayed username
            document.getElementById('username-info').innerHTML = newUsername;
            document.cookie = `username=${newUsername}; path=/`;
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


async function updatePassword(users) {
    try {
        // Get the current username from the cookie
        const currentUsername = getCookie('username');

        // Get the new password from the input field
        const newPassword = document.getElementById('newPasswordInput').value;

        // Find the user in the array based on the current username
        const user = users.find(user => user.username === currentUsername);

        if (!user) {
            console.error('User not found.');
            return;
        }

        const response = await fetch('update-password.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ currentUsername, newPassword }),
        });

        const data = await response.json();

        if (data.status === 'success') {
            // Update the displayed password
            document.getElementById('password-info').innerHTML = '********';

            document.cookie = `password=${newPassword}; path=/`;

            // Close the modal after updating
            closeModal('passwordModal');
        } else {
            // Handle error
            console.error(data.message);
        }
    } catch (error) {
        console.error('Error:', error);
    }
}