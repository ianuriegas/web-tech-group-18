
// Function to remove a user
function removeUser(userId) {
    // Implement the logic to remove the user (send a request to the server)
    console.log(`Remove user with ID ${userId}`);
    // Send an AJAX request to the server to remove the user
    // ...
}

// Function to make a user an admin
function makeAdmin(userId) {
    // Implement the logic to make the user an admin (send a request to the server)
    console.log(`Make user with ID ${userId} an admin`);
    // Send an AJAX request to the server to make the user an admin
    // ...
}

// Fetch users from the server and render the table
async function fetchAndRenderUsers() {
    const response = await fetch('get-users.php');
    const users = await response.json();
    renderUsers(users);
}

// Function to render users in the table
function renderUsers(users) {
    const tableBody = document.getElementById('userTableBody');
    tableBody.innerHTML = '';

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
        tableBody.appendChild(row);
    });
}

// Initial rendering
fetchAndRenderUsers();