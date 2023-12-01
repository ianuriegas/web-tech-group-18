// function to fetch and render posts
async function fetchAndRenderPosts() {
    const postTableBody = document.getElementById('postTableBody');
    const response = await fetch('get-posts.php');
    const posts = await response.json();
    renderPosts(posts, postTableBody);
  }
  
// function to render posts in the table
function renderPosts(posts, postTableBody) {
postTableBody.innerHTML = '';

posts.forEach(post => {
    const row = document.createElement('tr');

    row.innerHTML = `
    <td>${post.id}</td>
    <td>${post.username}</td>
    <td>${post.body}</td>
    <td>${post.image}</td>
    <td>${post.hyperlink}</td>
    <td>
        <button onclick="removePost(${post.id})">Remove</button>
    </td>
    `;
    postTableBody.appendChild(row);
});
}

// function to remove a post
function removePost(postId) {
// send an AJAX request
fetch('remove-post.php', {
    method: 'POST',
    headers: {
    'Content-Type': 'application/json',
    },
    body: JSON.stringify({ postId }),
})
    .then(response => response.json())
    .then(data => {
    console.log('Post removed:', data);
    // update the UI accordingly
    fetchAndRenderPosts();
    })
    .catch(error => {
    console.error('Error removing post:', error);
    });
}

document.addEventListener('DOMContentLoaded', function () {
const postTableBody = document.getElementById('postTableBody');

// initial rendering
fetchAndRenderPosts();
});