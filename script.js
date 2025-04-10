const form = document.getElementById('blogForm');
const postsDiv = document.getElementById('posts');
let posts = JSON.parse(localStorage.getItem('posts')) || [];
let editingIndex = -1; // -1 means not editing

function showPosts() {
  postsDiv.innerHTML = '';
  posts.forEach((post, index) => {
    const postEl = document.createElement('div');
    postEl.style = "background: white; padding: 15px; margin-bottom: 20px; border-left: 5px solid #007bff; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.1);";

    postEl.innerHTML = `
      <h2 style="color: #333;">${post.title}</h2>
      <p style="color: #555;">${post.content}</p>
      <button onclick="editPost(${index})"
        style="margin-right: 10px; padding: 6px 14px; background: #ffaa00; color: white; border: none; border-radius: 5px; cursor: pointer;">
        ✏️ Edit
      </button>
      <button onclick="deletePost(${index})"
        style="padding: 6px 14px; background: #ff4d4d; color: white; border: none; border-radius: 5px; cursor: pointer;">
        🗑 Delete
      </button>
    `;
    postsDiv.appendChild(postEl);
  });
}

function deletePost(index) {
  posts.splice(index, 1);
  localStorage.setItem('posts', JSON.stringify(posts));
  showPosts();
}

function editPost(index) {
  document.getElementById('title').value = posts[index].title;
  document.getElementById('content').value = posts[index].content;
  editingIndex = index;
}

form.addEventListener('submit', function(e) {
  e.preventDefault();
  const title = document.getElementById('title').value;
  const content = document.getElementById('content').value;

  if (editingIndex === -1) {
    posts.push({ title, content });
  } else {
    posts[editingIndex] = { title, content };
    editingIndex = -1;
  }

  localStorage.setItem('posts', JSON.stringify(posts));
  showPosts();
  form.reset();
});

showPosts();
