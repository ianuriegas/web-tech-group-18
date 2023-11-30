document.addEventListener('DOMContentLoaded', function () {
    const userTableBody = document.getElementById('userTableBody');

    // function to fetch and render users
    async function fetchAndRenderUsers() {
        const response = await fetch('get-users.php');
        const users = await response.json();
        renderUsers(users);
    }

    // function to render users in the table
    function renderUsers(users) {
        userTableBody.innerHTML = '';

        users.forEach(user => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${user.id}</td>
                <td>${user.username}</td>
                <td>${user.admin ? '1' : '0'}</td>
                <td>
                    <button onclick="removeUser(${user.id})">Remove</button>
                    <button onclick="makeAdmin(${user.id})">Make Admin</button>
                </td>
            `;
            userTableBody.appendChild(row);
        });
    }

    // initial rendering
    fetchAndRenderUsers();
});

// function to remove a user
function removeUser(userId) {
    // send an AJAX request
    fetch('remove-user.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId }),
    })
    .then(response => response.json())
    .then(data => {
        console.log('User removed:', data);
        // update the UI accordingly
        fetchAndRenderUsers();
    })
    .catch(error => {
        console.error('Error removing user:', error);
    });
}

// function to make a user an admin
function makeAdmin(userId) {
    // send an AJAX request
    fetch('make-admin.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId }),
    })
    .then(response => response.json())
    .then(data => {
        console.log('User made admin:', data);
        // update the UI accordingly
        fetchAndRenderUsers(); 
    })
    .catch(error => {
        console.error('Error making user admin:', error);
    });
}