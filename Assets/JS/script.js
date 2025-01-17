// Run this script when the DOM is fully loaded
document.addEventListener("DOMContentLoaded", function () {
  initNavbar(); // Initialize navbar functionality
  showSplashScreen(); // Show the splash screen if applicable
  initObservers(); // Initialize IntersectionObservers for animations
});

// Show Splash Screen Logic
function showSplashScreen() {
  const splashScreen = document.getElementById("splash-screen");
  const mainContent = document.getElementById("main-content");

  if (!sessionStorage.getItem("splashShown")) {
    setTimeout(function () {
      if (splashScreen) splashScreen.style.opacity = "0";
      setTimeout(function () {
        if (splashScreen) splashScreen.style.display = "none";
        if (mainContent) mainContent.style.display = "block";
        startStatAnimation(); // Start animations after the splash
      }, 1000);
    }, 2500);
    sessionStorage.setItem("splashShown", "true");
  } else {
    if (splashScreen) splashScreen.style.display = "none";
    if (mainContent) mainContent.style.display = "block";
    startStatAnimation();
  }
}

// Navbar Initialization
function initNavbar() {
  const navbarToggle = document.querySelector(".navbar-toggler");
  const navbarMenu = document.querySelector(".navbar-collapse");
  const menuIcon = document.querySelector(".menu-icon");

  if (navbarToggle && navbarMenu && menuIcon) {
    const bsCollapse = new bootstrap.Collapse(navbarMenu, {
      toggle: false, // Disable automatic toggling
    });

    // Toggle the menu and update the icon
    navbarToggle.addEventListener("click", function () {
      if (navbarMenu.classList.contains("show")) {
        bsCollapse.hide(); // Collapse the menu
        menuIcon.innerHTML = "&#9776;"; // Hamburger Icon
      } else {
        bsCollapse.show(); // Expand the menu
        menuIcon.innerHTML = "&times;"; // Close Icon
      }
    });

    // Listen for Bootstrap collapse events to reset the icon
    navbarMenu.addEventListener("hidden.bs.collapse", function () {
      menuIcon.innerHTML = "&#9776;"; // Reset to Hamburger Icon
    });

    navbarMenu.addEventListener("shown.bs.collapse", function () {
      menuIcon.innerHTML = "&times;"; // Set to Close Icon
    });

    // Automatically close the menu and reset the icon when a link is clicked
    document.querySelectorAll(".navbar-nav .nav-link").forEach((link) => {
      link.addEventListener("click", () => {
        if (navbarMenu.classList.contains("show")) {
          bsCollapse.hide(); // Collapse the menu
          menuIcon.innerHTML = "&#9776;"; // Reset to Hamburger Icon
        }
      });
    });
  }
}

// Start Stat Animation
function startStatAnimation() {
  const statsSection = document.querySelector(".stats-section");
  if (statsSection) {
    const statsObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            animateNumbers(); // Trigger animation
            statsObserver.unobserve(entry.target); // Stop observing after animation
          }
        });
      },
      { threshold: 0.5 } // Trigger animation when 50% of the section is visible
    );

    statsObserver.observe(statsSection);
  }
}

// Stat Numbers Animation
function animateNumbers() {
  const stats = document.querySelectorAll(".stat-number");

  stats.forEach((stat) => {
    const target = +stat.getAttribute("data-target");
    let current = 0;
    const increment = target / 90;

    const updateCount = () => {
      current += increment;
      if (current < target) {
        stat.innerText = Math.ceil(current);
        setTimeout(updateCount, 30);
      } else {
        stat.innerText = target; // End at the exact target value
      }
    };

    updateCount();
  });
}

// Initialize Observers
function initObservers() {
  const heroSection = document.querySelector(".hero-section");
  const navbar = document.querySelector(".navbar");

  if (heroSection && navbar) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            navbar.classList.add("navbar-colored");
            navbar.classList.remove("navbar-white");
          } else {
            navbar.classList.add("navbar-white");
            navbar.classList.remove("navbar-colored");
          }
        });
      },
      { threshold: 0.1 }
    );

    observer.observe(heroSection);
  }

  startStatAnimation(); // Ensure stats animation observer is initialized
}

document.addEventListener("DOMContentLoaded", function () {
  highlightNavOnScroll(); // Initialize highlight functionality
});

// Function to highlight navbar links based on section visibility
function highlightNavOnScroll() {
  const sections = [
    { id: "home", link: ".home-link" },
    { id: "stats-section", link: ".home-link" },
    { id: "portfolio", link: ".home-link" },
    { id: "our-special-features", link: ".home-link" },
    { id: "clients-words", link: ".home-link" },
    { id: "about", link: ".about-link" },
    { id: "our-services", link: ".service-link" },
    { id: "contact-us", link: ".contact-link" },
    { id: "footer", link: ".contact-link" },
  ];

  const observerOptions = {
    threshold: 0.4, // When 50% of the section is visible, trigger the callback
  };

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      const sectionId = entry.target.id;
      const link = sections.find((section) => section.id === sectionId)?.link;

      if (entry.isIntersecting) {
        // Add 'active' class to navbar link when section is in view
        if (link) {
          document.querySelector(link).classList.add("active");
        }
      } else {
        // Remove 'active' class when section is out of view
        if (link) {
          document.querySelector(link).classList.remove("active");
        }
      }
    });
  }, observerOptions);

  // Observe each section in the sections array
  sections.forEach((section) => {
    const sectionElement = document.getElementById(section.id);
    if (sectionElement) {
      observer.observe(sectionElement);
    }
  });
}

