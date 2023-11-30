document.addEventListener('DOMContentLoaded', function () {
    // DOM elements
    const userTableBody = document.getElementById('userTableBody');

    // Function to fetch and render users
    async function fetchAndRenderUsers() {
        const response = await fetch('get-users.php');
        const users = await response.json();
        renderUsers(users);
    }

    // Function to render users in the table
    function renderUsers(users) {
        userTableBody.innerHTML = '';

        users.forEach(user => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${user.id}</td>
                <td>${user.username}</td>
                <td>${user.admin ? 'Yes' : 'No'}</td>
                <td>
                    <button onclick="removeUser(${user.id})">Remove</button>
                    <button onclick="makeAdmin(${user.id})">Make Admin</button>
                </td>
            `;
            userTableBody.appendChild(row);
        });
    }

    // Initial rendering
    fetchAndRenderUsers();
});