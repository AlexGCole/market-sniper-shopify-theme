// Header script extracted from sections/header.liquid (prefixed)
document.addEventListener('DOMContentLoaded', function() {
  const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
  const mobileMenu = document.querySelector('.mobile-menu');
  const mobileMenuOverlay = document.querySelector('.mobile-menu-overlay');
  const mobileNavLinks = document.querySelectorAll('.mobile-nav-links a');

  function toggleMobileMenu() {
    mobileMenuBtn.classList.toggle('active');
    mobileMenu.classList.toggle('active');
    mobileMenuOverlay.classList.toggle('active');
    document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : '';
  }

  function closeMobileMenu() {
    mobileMenuBtn.classList.remove('active');
    mobileMenu.classList.remove('active');
    mobileMenuOverlay.classList.remove('active');
    document.body.style.overflow = '';
  }

  function smoothScrollToAnchor(targetId) {
    const targetElement = document.getElementById(targetId);
    if (targetElement) {
      const navbarHeight = 70;
      const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - navbarHeight;
      window.scrollTo({ top: targetPosition, behavior: 'smooth' });
    }
  }

  if (mobileMenuBtn) { mobileMenuBtn.addEventListener('click', toggleMobileMenu); }
  if (mobileMenuOverlay) { mobileMenuOverlay.addEventListener('click', closeMobileMenu); }

  mobileNavLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      if (href && href.startsWith('/#')) {
        const targetId = href.substring(2);
        if (window.location.pathname === '/' || window.location.pathname === '/index') {
          e.preventDefault();
          closeMobileMenu();
          setTimeout(() => { smoothScrollToAnchor(targetId); }, 300);
        } else {
          closeMobileMenu();
        }
      } else {
        closeMobileMenu();
      }
    });
  });

  const desktopNavLinks = document.querySelectorAll('.nav-links a[href^="/#"]');
  desktopNavLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      const targetId = href.substring(2);
      if (window.location.pathname === '/' || window.location.pathname === '/index') {
        e.preventDefault();
        smoothScrollToAnchor(targetId);
      }
    });
  });

  if (window.location.hash) {
    const targetId = window.location.hash.substring(1);
    setTimeout(() => { smoothScrollToAnchor(targetId); }, 100);
  }

  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && mobileMenu && mobileMenu.classList.contains('active')) {
      closeMobileMenu();
    }
  });
});


