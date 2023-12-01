// function to fetch and render posts
async function fetchAndRenderPosts() {
  const postTableBody = document.getElementById("postTableBody");
  const response = await fetch("get-posts.php");
  const posts = await response.json();
  renderPosts(posts, postTableBody);
}

// function to render posts in the table
function renderPosts(posts, postTableBody) {
  postTableBody.innerHTML = '';

  posts.forEach(post => {
    const row = document.createElement('tr');

    console.log('Original category:', post.category);

    // Remove ".html" from the category
    const categoryWithoutHtml = post.category ? post.category.replace('.html', '') : 'No Category';

    console.log('Processed category:', categoryWithoutHtml);

    row.innerHTML = `
      <td>${post.id}</td>
      <td>${post.username}</td>
      <td>${post.body}</td>
      <td>${categoryWithoutHtml}</td>
      <td>${post.image ? `<img src="../assets/images/${post.image}" alt="Image">` : 'No Image'}</td>
      <td>${post.hyperlink ? `<a href="${post.hyperlink}" target="_blank">${post.hyperlink}</a>` : 'No Hyperlink'}</td>
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
  fetch("remove-post.php", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ postId }),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log("Post removed:", data);
      // update the UI accordingly
      fetchAndRenderPosts();
    })
    .catch((error) => {
      console.error("Error removing post:", error);
    });
}

document.addEventListener("DOMContentLoaded", function () {
  const postTableBody = document.getElementById("postTableBody");

  // initial rendering
  fetchAndRenderPosts();
});

// Generic function to fetch and render posts based on category
async function fetchAndRenderPostsByCategory(category) {
  const postTableBody = document.getElementById("postTableBody");
  const response = await fetch("get-posts.php");
  const posts = await response.json();

  // Filter posts to include only those with the specified category
  const filteredPosts = posts.filter((post) => post.category === category);
  renderPosts(filteredPosts, postTableBody);
}

// Function to render posts in the table
function renderCategoryPosts(posts, postTableBody) {
  postTableBody.innerHTML = "";

  posts.forEach((post) => {
    const row = document.createElement("tr");

    row.innerHTML = `
          <td>${post.id}</td>
          <td>${post.username}</td>
          <td>${post.body}</td>
          <td>${post.category}</td>
          <td>${
            post.image
              ? `<img src="../assets/images/${post.image}" alt="Image">`
              : "No Image"
          }</td>
          <td>${
            post.hyperlink
              ? `<a href="${post.hyperlink}" target="_blank">${post.hyperlink}</a>`
              : "No Hyperlink"
          }</td>
          <td>
              <button onclick="removePost(${post.id})">Remove</button>
          </td>
      `;
    postTableBody.appendChild(row);
  });
}
