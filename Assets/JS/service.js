// Menu toggle functionality
const menuToggle = document.getElementById('menuToggle');
const navbarNav = document.getElementById('navbarNav');

menuToggle.addEventListener('click', function () {
  const isExpanded = navbarNav.classList.contains('show');
  const menuIcon = document.querySelector('.menu-icon');

  // Toggle menu icon
  if (isExpanded) {
    menuIcon.innerHTML = '&#9776;'; // Hamburger Icon
  } else {
    menuIcon.innerHTML = '&times;'; // Close Icon
  }
});

// Reset menu icon when menu is hidden
navbarNav.addEventListener('hidden.bs.collapse', function () {
  const menuIcon = document.querySelector('.menu-icon');
  menuIcon.innerHTML = '&#9776;'; // Reset to Hamburger Icon
});

// Automatically close the menu when a link is clicked
document.querySelectorAll('.navbar-nav .nav-link').forEach(link => {
  link.addEventListener('click', () => {
    const navbarCollapse = document.querySelector('.navbar-collapse');
    if (navbarCollapse.classList.contains('show')) {
      const bsCollapse = new bootstrap.Collapse(navbarCollapse, { toggle: true });
      bsCollapse.hide();
    }
  });
});
