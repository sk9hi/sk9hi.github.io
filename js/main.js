document.addEventListener('DOMContentLoaded', function () {
  const titleElement = document.getElementById('site-title');

  // check local storage for a saved theme preference (default is "white")
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme) {
    document.documentElement.setAttribute('data-theme', savedTheme);
  }

  // toggle theme when the title is clicked
  titleElement.addEventListener('click', function () {
    const currentTheme = document.documentElement.getAttribute('data-theme') || 'white';
    const newTheme = currentTheme === 'channel' ? 'white' : 'channel';
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
  });

  // if we're on the blog page, fetch and display posts
  const blogContainer = document.getElementById('blog-container');
  if (blogContainer) {
    fetchBlogPosts();
  }
});

/**
 * fetches blog posts from a sample api (jsonplaceholder).
 * replace with your real api endpoint if desired.
 */
function fetchBlogPosts() {
  // for demo, limit to 5 posts
  fetch('https://jsonplaceholder.typicode.com/posts?_limit=5')
    .then(response => response.json())
    .then(data => {
      const blogContainer = document.getElementById('blog-container');
      // clear any "loading..." text
      blogContainer.innerHTML = '';

      data.forEach(post => {
        const articleEl = document.createElement('article');
        // ensure the text is displayed in lowercase by wrapping it in a container or using css
        articleEl.innerHTML = `
          <h2 style="text-transform: lowercase;">${post.title}</h2>
          <p style="text-transform: lowercase;">${post.body}</p>
        `;
        blogContainer.appendChild(articleEl);
      });
    })
    .catch(error => {
      console.error('error fetching blog posts:', error);
      const blogContainer = document.getElementById('blog-container');
      blogContainer.innerHTML = '<p>failed to load blog posts.</p>';
    });
}
