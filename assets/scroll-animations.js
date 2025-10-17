/**
 * Scroll Animation System
 * Animates elements as they come into view
 */

document.addEventListener('DOMContentLoaded', function() {
  // Check for reduced motion preference
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  
  if (prefersReducedMotion) {
    // Skip animations for users who prefer reduced motion
    document.querySelectorAll('.animate-on-scroll').forEach(el => {
      el.classList.add('animated');
    });
    return;
  }

  // Create Intersection Observer
  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.15 // Trigger when 15% of element is visible
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animated');
        // Optionally unobserve after animation to improve performance
        // observer.unobserve(entry.target);
      } else {
        // Remove animated class when scrolling back up for re-animation
        entry.target.classList.remove('animated');
      }
    });
  }, observerOptions);

  // Observe all elements with animate-on-scroll class
  const animatedElements = document.querySelectorAll('.animate-on-scroll');
  animatedElements.forEach(el => {
    observer.observe(el);
  });
});

