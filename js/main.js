document.addEventListener('DOMContentLoaded', function () {
  const themeToggleBtn = document.getElementById('theme-toggle');

  // Check local storage for a saved theme preference
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme) {
    document.documentElement.setAttribute('data-theme', savedTheme);
  }

  themeToggleBtn.addEventListener('click', function () {
    // Get the current theme; default is light if not set
    const currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
    // Toggle between 'light' and 'dark'
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
  });
});
