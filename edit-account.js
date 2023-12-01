document.addEventListener('DOMContentLoaded', function () {
    const usernameForm = document.getElementById('usernameForm');

    usernameForm.addEventListener('submit', async function (event) {
        event.preventDefault(); // Prevent the default form submission behavior

        try {
            // Fetch users
            const response = await fetch('fetch-users.php');
            const users = await response.json();
            
            console.log('Fetched users:', users); // Log the fetched users for debugging

            updateUsername(users); // Call your updateUsername function
        } catch (error) {
            console.error('Error fetching users:', error);
        }
    });

    const passwordForm = document.getElementById('passwordForm');
    passwordForm.addEventListener('submit', async function (event) {
        event.preventDefault(); // Prevent the default form submission behavior

        try {
            // Fetch users
            const response = await fetch('fetch-users.php');
            const users = await response.json();

            console.log('Fetched users:', users); // Log the fetched users for debugging

            updatePassword(users); // Call your updatePassword function
        } catch (error) {
            console.error('Error fetching users:', error);
        }
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
        console.log('Fetched users:', users);
        // Get the current username from the cookie
        const currentUsername = getCookie('username');

        // Get the new password from the input field
        const newPassword = document.getElementById('newPasswordInput').value;

        if (!users || users.length === 0) {
            console.error('No users found.');
            return;
        }

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