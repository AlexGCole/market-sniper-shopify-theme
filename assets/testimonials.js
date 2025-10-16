// Testimonials slider script (extracted from sections/testimonials.liquid)
document.addEventListener('DOMContentLoaded', function() {
  const testimonials = document.querySelectorAll('.testimonial');
  const dotsContainer = document.querySelector('.slider-dots');
  const prevBtn = document.querySelector('.slider-arrow.prev');
  const nextBtn = document.querySelector('.slider-arrow.next');
  
  if (!testimonials.length || !dotsContainer) return;
  
  let currentIndex = 0;
  let isAnimating = false;

  // Initialize all slides off-screen to the right
  testimonials.forEach((testimonial, index) => {
    if (index === 0) {
      testimonial.classList.add('active');
      testimonial.style.transform = 'translateX(0)';
      testimonial.style.opacity = '1';
    } else {
      testimonial.style.transform = 'translateX(100%)';
      testimonial.style.opacity = '0';
    }
  });

  // Create dots
  testimonials.forEach((_, index) => {
    const dot = document.createElement('button');
    dot.className = 'slider-dot' + (index === 0 ? ' active' : '');
    dot.setAttribute('aria-label', `Go to testimonial ${index + 1}`);
    dot.addEventListener('click', () => {
      if (!isAnimating) {
        const direction = index > currentIndex ? 'next' : 'prev';
        goToSlide(index, direction);
      }
    });
    dotsContainer.appendChild(dot);
  });

  const dots = document.querySelectorAll('.slider-dot');

  function goToSlide(index, direction) {
    if (isAnimating || index === currentIndex) return;
    
    isAnimating = true;
    const current = testimonials[currentIndex];
    const next = testimonials[index];
    
    dots[currentIndex].classList.remove('active');
    dots[index].classList.add('active');
    
    if (direction === 'next') {
      next.style.transition = 'none';
      next.style.transform = 'translateX(100%)';
      next.style.opacity = '0';
      next.classList.add('active');
      next.offsetHeight;
      next.style.transition = 'transform 0.6s ease, opacity 0.6s ease';
      setTimeout(() => {
        current.style.transform = 'translateX(-100%)';
        current.style.opacity = '0';
        next.style.transform = 'translateX(0)';
        next.style.opacity = '1';
      }, 10);
    } else {
      next.style.transition = 'none';
      next.style.transform = 'translateX(-100%)';
      next.style.opacity = '0';
      next.classList.add('active');
      next.offsetHeight;
      next.style.transition = 'transform 0.6s ease, opacity 0.6s ease';
      setTimeout(() => {
        current.style.transform = 'translateX(100%)';
        current.style.opacity = '0';
        next.style.transform = 'translateX(0)';
        next.style.opacity = '1';
      }, 10);
    }
    
    setTimeout(() => {
      current.classList.remove('active');
      currentIndex = index;
      isAnimating = false;
    }, 650);
  }

  function nextSlide() {
    if (!isAnimating) {
      const next = (currentIndex + 1) % testimonials.length;
      goToSlide(next, 'next');
    }
  }

  function prevSlide() {
    if (!isAnimating) {
      const prev = (currentIndex - 1 + testimonials.length) % testimonials.length;
      goToSlide(prev, 'prev');
    }
  }

  if (prevBtn) prevBtn.addEventListener('click', prevSlide);
  if (nextBtn) nextBtn.addEventListener('click', nextSlide);

  // Auto-advance every 5 seconds
  setInterval(nextSlide, 5000);
});

