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

    // Close the menu when clicking outside
    document.addEventListener("click", function (event) {
      if (
        navbarMenu.classList.contains("show") && // Check if the menu is open
        !navbarMenu.contains(event.target) && // Click is outside the menu
        !navbarToggle.contains(event.target) // Click is not on the toggle button
      ) {
        bsCollapse.hide(); // Collapse the menu
        menuIcon.innerHTML = "&#9776;"; // Reset to Hamburger Icon
      }
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
  const navbarCollapse = document.querySelector(".navbar-collapse");

  if (heroSection && navbar) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            navbar.classList.add("navbar-colored");
            navbar.classList.remove("navbar-white");

            // For collapsed navbar in view of hero section
            if (navbarCollapse) {
              navbarCollapse.classList.add("bg-colored");
              navbarCollapse.classList.remove("bg-white");
            }
          } else {
            navbar.classList.add("navbar-white");
            navbar.classList.remove("navbar-colored");

            // For collapsed navbar when hero section is out of view
            if (navbarCollapse) {
              navbarCollapse.classList.add("bg-white");
              navbarCollapse.classList.remove("bg-colored");
            }
          }
        });
      },
      { threshold: 0.1 }
    );

    observer.observe(heroSection);
  }

  startStatAnimation(); // Ensure stats animation observer is initialized
}

// Scroll-Based Active Link Logic
document.addEventListener("DOMContentLoaded", function () {
  const navbarLinks = document.querySelectorAll(".nav-link"); // All navbar links
  const sections = document.querySelectorAll("section"); // All sections
  const offset = document.querySelector("nav").offsetHeight; // Navbar height

  // Special sections that define the "Home" link area
  const homeSections = [
    "hero-section",
    "stats-section",
    "portfolio",
    "faq",
    "clients-words",
  ];

  // ID of sections that should activate the "Contact Us" link
  const contactSections = ["contact-us", "footer"];

  // Function to highlight active link based on scroll position
  function setActiveLink() {
    const scrollPosition = window.scrollY + offset + 1; // Current scroll position + offset

    let isHomeActive = false; // Flag for home link
    let isContactActive = false; // Flag for "Contact Us" link

    sections.forEach((section) => {
      const sectionTop = section.offsetTop; // Section's top position
      const sectionHeight = section.offsetHeight; // Section's height
      const link = document.querySelector(`.nav-link[href="#${section.id}"]`);

      // Check if the current scroll position is within the section's boundaries
      if (
        scrollPosition >= sectionTop &&
        scrollPosition < sectionTop + sectionHeight
      ) {
        if (link) {
          link.classList.add("active");
        }
      } else {
        if (link) {
          link.classList.remove("active");
        }
      }

      // Check if the section belongs to "Home"
      if (homeSections.includes(section.id)) {
        if (
          scrollPosition >= sectionTop &&
          scrollPosition < sectionTop + sectionHeight
        ) {
          isHomeActive = true;
        }
      }

      // Check if the section belongs to "Contact Us"
      if (contactSections.includes(section.id)) {
        if (
          scrollPosition >= sectionTop &&
          scrollPosition < sectionTop + sectionHeight
        ) {
          isContactActive = true;
        }
      }
    });

    // Special handling for "Home" link
    const homeLink = document.querySelector(".home-link");
    if (homeLink) {
      if (isHomeActive) {
        homeLink.classList.add("active");
      } else {
        homeLink.classList.remove("active");
      }
    }

    // Special handling for "Contact Us" link
    const contactLink = document.querySelector(".contact-link");
    if (contactLink) {
      if (isContactActive) {
        contactLink.classList.add("active");
      } else {
        contactLink.classList.remove("active");
      }
    }
  }

  // Smooth scroll on clicking a nav link
  navbarLinks.forEach((link) => {
    link.addEventListener("click", function (event) {
      event.preventDefault();
      const targetId = this.getAttribute("href").slice(1);
      const targetSection = document.getElementById(targetId);

      // Scroll to the section while accounting for navbar offset
      const scrollToPosition = targetSection.offsetTop - offset + 80;

      window.scrollTo({
        top: scrollToPosition,
        behavior: "smooth",
      });

      // Highlight the clicked link immediately
      navbarLinks.forEach((link) => link.classList.remove("active"));
      this.classList.add("active");
    });
  });

  // Run on scroll and on page load
  window.addEventListener("scroll", setActiveLink);
  window.addEventListener("load", setActiveLink);
});

// FAQ Toggle Functionality
document.querySelectorAll(".faq-item").forEach((item) => {
  const question = item.querySelector(".faq-question");
  question.addEventListener("click", () => {
    document.querySelectorAll(".faq-item").forEach((otherItem) => {
      if (otherItem !== item) {
        otherItem.classList.remove("active");
      }
    });
    item.classList.toggle("active");
  });
});

// JS for EmailJS with Custom Alert
function sendMail() {
  let parms = {
    name: document.getElementById("name").value,
    email: document.getElementById("email").value,
    msg: document.getElementById("msg").value,
  };

  emailjs
    .send("service_i6qa9yh", "template_tu8d5ms", parms)
    .then(() => {
      showAlert("Email Sent Successfully!", "success"); // Custom alert for success
    })
    .catch((error) => {
      console.error("Error:", error);
      showAlert("Failed to send email. Please try again.", "error"); // Custom alert for error
    });
}

function showAlert(message, type = "success") {
  // Create overlay
  const overlay = document.createElement("div");
  overlay.className = "overlay";
  document.body.appendChild(overlay);

  // Create alert box
  const alertBox = document.createElement("div");
  alertBox.className = `custom-alert ${type}`; // Use template literals for class names
  alertBox.textContent = message;

  // Create OK button
  const okButton = document.createElement("button");
  okButton.className = "ok-btn";
  okButton.textContent = "OK";

  // Append OK button to the alert box
  alertBox.appendChild(okButton);

  // Append alert box to the body
  document.body.appendChild(alertBox);

  const form = document.getElementById("contactForm");

  // Event listener for OK button to remove the alert box and overlay
  okButton.addEventListener("click", () => {
    alertBox.remove();
    overlay.remove();
    form.reset();
  });
}
