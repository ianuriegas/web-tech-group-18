// function to fetch and render users
async function fetchAndRenderUsers() {
    const userTableBody = document.getElementById('userTableBody');
    const response = await fetch('get-users.php');
    const users = await response.json();
    renderUsers(users, userTableBody);
}

// function to render users in the table
function renderUsers(users, userTableBody) {
    userTableBody.innerHTML = '';

    users.forEach(user => {
        const row = document.createElement('tr');
        const isAdmin = user.admin === '1'; // Ensure strict comparison
        console.log('Original user.admin:', user.admin);
        console.log('Calculated isAdmin:', isAdmin);

        row.innerHTML = `
            <td>${user.id}</td>
            <td>${user.username}</td>
            <td>${isAdmin ? '1' : '0'}</td>
            <td>
                <button onclick="removeUser(${user.id})">Remove</button>
                <button onclick="makeAdmin(${user.id})">Make Admin</button>
            </td>
        `;
        userTableBody.appendChild(row);
    });
}

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

document.addEventListener('DOMContentLoaded', function () {
    const userTableBody = document.getElementById('userTableBody');

    // initial rendering
    fetchAndRenderUsers();
});