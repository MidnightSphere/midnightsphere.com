
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

  // Listen for the collapse/hide event to reset the icon
  navbarNav.addEventListener('hidden.bs.collapse', function () {
    const menuIcon = document.querySelector('.menu-icon');
    menuIcon.innerHTML = '&#9776;'; // Reset to Hamburger Icon
  });


   // Function to animate numbers
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
const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateNumbers(); // Animate numbers
            observer.unobserve(entry.target); // Stop observing once animated
        }
    });
}, {
    threshold: 0.5 // Trigger animation when 50% of the section is in view
});

// Observe the stats section
const statsSection = document.querySelector('.stats-section');
observer.observe(statsSection);
