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

// Animate numbers in stats section
function animateNumbers() {
  const stats = document.querySelectorAll('.stat-number');

  stats.forEach(stat => {
    const target = +stat.getAttribute('data-target'); // Get the target number
    let current = 0;
    const increment = target / 90; // Adjust the speed of animation

    const updateCount = () => {
      if (current < target) {
        current += increment; // Increase number gradually
        stat.innerText = Math.ceil(current); // Display the current number
        setTimeout(updateCount, 30); // Adjust delay for smoother animation
      } else {
        stat.innerText = target; // Ensure the final number is exact
      }
    };

    updateCount();
  });
}

// Trigger animation when the stats section comes into view
const statsObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      animateNumbers(); // Animate numbers
      statsObserver.unobserve(entry.target); // Stop observing once animated
    }
  });
}, {
  threshold: 0.5 // Trigger animation when 50% of the section is in view
});

// Observe the stats section
const statsSection = document.querySelector('.stats-section');
if (statsSection) {
  statsObserver.observe(statsSection);
}

// Highlight active navbar link based on the section in view
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.nav-link');

function removeActiveClasses() {
  navLinks.forEach(link => link.classList.remove('active'));
}

function addActiveClass(sectionId) {
  const activeLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);
  if (activeLink) activeLink.classList.add('active');
}

const sectionObserverOptions = {
  root: null, // Use the viewport as the root
  threshold: 0.6, // Trigger when 60% of the section is in view
};

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const sectionId = entry.target.id;
      removeActiveClasses(); // Remove 'active' from all links
      addActiveClass(sectionId); // Add 'active' to the link of the section in view
    }
  });
}, sectionObserverOptions);

// Observe each section
sections.forEach(section => sectionObserver.observe(section));

