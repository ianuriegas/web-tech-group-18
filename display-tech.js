// function to fetch and render posts
async function fetchAndRenderPosts() {
    const postTableBody = document.getElementById("postTableBody");
    const response = await fetch("admin/get-posts.php");
    const posts = await response.json();
    renderPosts(posts, postTableBody);
  }
  
  // function to render posts in the table
  function renderPosts(posts, postTableBody) {
    postTableBody.innerHTML = '';
  
    posts.forEach(post => {
        // Check if the post has the "sport.html" category
        if (post.category === 'technology.html') {
            const row = document.createElement('tr');
  
            row.innerHTML = `
                <td>
                    <div>
                      ${post.image ? `<img src="./assets/images/${post.image}" alt="Image" style="max-width: 100%; height: auto;">` : ''}
                    </div>
                    <div>
                        <p>${post.body}</p>
                    </div>
                    <div>
                        ${post.hyperlink ? `<a href="${post.hyperlink}" target="_blank">${post.hyperlink}</a>` : ''}
                    </div>
                </td>
            `;
            postTableBody.appendChild(row);
        }
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
  const response = await fetch("admin/get-posts.php");
  const posts = await response.json();

  // Filter posts to include only those with the specified category
  const filteredPosts = posts.filter((post) => post.category === category);
  renderPosts(filteredPosts, postTableBody);
}
