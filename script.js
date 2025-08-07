document.addEventListener("DOMContentLoaded", () => {
  const body = document.body;
  const postForm = document.getElementById("postForm");
  const postList = document.getElementById("postList");
  const searchInput = document.getElementById("searchInput");
  const categoryFilter = document.getElementById("categoryFilter");

  postForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const title = document.getElementById("title").value;
    const content = document.getElementById("content").value;
    const tags = document.getElementById("tags").value;
    const category = document.getElementById("category").value;

    const post = document.createElement("div");
    post.className = "post glass";
    post.innerHTML = `
      <div class="delete">×</div>
      <h3>${title}</h3>
      <p>${parseMarkdown(content)}</p>
      <div class="tags"><strong>Tags:</strong> ${tags} | <strong>Category:</strong> ${category}</div>
    `;

    post.querySelector(".delete").addEventListener("click", () => post.remove());
    post.dataset.tags = tags.toLowerCase();
    post.dataset.category = category.toLowerCase();
    postList.prepend(post);

    postForm.reset();
  });

  searchInput.addEventListener("input", () => {
    const query = searchInput.value.toLowerCase();
    Array.from(postList.children).forEach(post => {
      const content = post.textContent.toLowerCase();
      post.style.display = content.includes(query) ? "block" : "none";
    });
  });

  categoryFilter.addEventListener("change", () => {
    const selected = categoryFilter.value.toLowerCase();
    Array.from(postList.children).forEach(post => {
      post.style.display = selected === "all" || post.dataset.category === selected ? "block" : "none";
    });
  });

  function parseMarkdown(md) {
    return md
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.*?)\*/g, '<em>$1</em>')
      .replace(/`(.*?)`/g, '<code>$1</code>')
      .replace(/\n/g, '<br>');
  }
});

// ✅ Toggle Dark/Light Mode
const toggleThemeBtn = document.getElementById("theme-toggle");

toggleThemeBtn.addEventListener("click", () => {
  const currentTheme = document.documentElement.getAttribute("data-theme");
  const isDark = currentTheme === "dark";

  document.documentElement.setAttribute("data-theme", isDark ? "light" : "dark");
  toggleThemeBtn.textContent = isDark ? "🌞" : "🌙";
});
