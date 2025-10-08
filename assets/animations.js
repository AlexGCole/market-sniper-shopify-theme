// Animation Controller

// Observe elements for scroll animations
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    // Observe all sections and cards
    const elementsToAnimate = document.querySelectorAll(
        '.feature-card, .step, .indicator-item, .pricing-card, .faq-item, .bot-feature'
    );

    elementsToAnimate.forEach(el => {
        el.classList.add('animate-on-scroll');
        observer.observe(el);
    });
}

// Parallax effect for hero background
function initParallax() {
    const heroBg = document.querySelector('.hero-bg');
    if (!heroBg) return;

    const handleScroll = throttle(() => {
        const scrolled = window.pageYOffset;
        const rate = scrolled * 0.5;
        heroBg.style.transform = `translateY(${rate}px)`;
    }, 10);

    window.addEventListener('scroll', handleScroll);
}

// Animate statistics on scroll
function animateStats() {
    const stats = document.querySelectorAll('.stat-number, .bot-stat-number');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.classList.contains('animated')) {
                entry.target.classList.add('animated');
                animateValue(entry.target);
            }
        });
    }, { threshold: 0.5 });

    stats.forEach(stat => observer.observe(stat));
}

function animateValue(element) {
    const text = element.textContent;
    const hasPlus = text.includes('+');
    const number = parseInt(text.replace(/\D/g, ''));
    
    if (isNaN(number)) return;

    const duration = 2000;
    const step = number / (duration / 16);
    let current = 0;

    const timer = setInterval(() => {
        current += step;
        if (current >= number) {
            element.textContent = hasPlus ? `${number}+` : number;
            clearInterval(timer);
        } else {
            element.textContent = hasPlus ? `${Math.floor(current)}+` : Math.floor(current);
        }
    }, 16);
}

// Initialize all animations
document.addEventListener('DOMContentLoaded', () => {
    initScrollAnimations();
    initParallax();
    animateStats();
});