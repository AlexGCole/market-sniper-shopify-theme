// Animation Controller

// Observe elements for scroll animations
function initScrollAnimations() {
    const observerOptions = { threshold: 0.1, rootMargin: '0px 0px -50px 0px' };
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => { if (entry.isIntersecting) { entry.target.classList.add('visible'); } });
    }, observerOptions);
    const elementsToAnimate = document.querySelectorAll('.feature-card, .step, .indicator-item, .pricing-card, .faq-item, .bot-feature');
    elementsToAnimate.forEach(el => { el.classList.add('animate-on-scroll'); observer.observe(el); });
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
    setTimeout(() => {
        const allSections = document.querySelectorAll('section:not(.header):not(.navbar), footer');
        const backgrounds = ['#050807', '#0A0A0A'];
        const borders = [
            { top: '1px solid rgba(0, 255, 65, 0.2)', bottom: '1px solid rgba(0, 255, 65, 0.2)' },
            { top: '1px solid rgba(0, 255, 65, 0.1)', bottom: 'none' }
        ];
        let alternateIndex = 0;
        let lastBackground = null;
        allSections.forEach((section) => {
            if (window.getComputedStyle(section).display === 'none') { return; }
            const tagName = section.tagName.toLowerCase();
            if (section.classList.contains('hero')) {
                section.style.setProperty('background', '#0a0a0a', 'important');
                const heroBg = section.querySelector('.hero-bg');
                if (heroBg) {
                    heroBg.style.setProperty('background', 'radial-gradient(circle at 20% 50%, rgba(0, 255, 65, 0.15) 0%, transparent 50%), radial-gradient(circle at 80% 30%, rgba(0, 255, 65, 0.1) 0%, transparent 50%)', 'important');
                }
                lastBackground = '#0a0a0a';
                return;
            }
            if (section.classList.contains('products-hero-compact')) {
                section.style.setProperty('background', '#0a0a0a', 'important');
                section.style.setProperty('position', 'relative', 'important');
                section.style.setProperty('border-bottom', '1px solid rgba(0, 255, 65, 0.2)', 'important');
                const existingOverlay = section.querySelector('.hero-bg-overlay');
                if (existingOverlay) existingOverlay.remove();
                const gradientOverlay = document.createElement('div');
                gradientOverlay.className = 'hero-bg-overlay';
                gradientOverlay.style.cssText = 'position:absolute!important;top:0!important;left:0!important;right:0!important;bottom:0!important;width:100%!important;height:100%!important;background:radial-gradient(circle at 20% 50%, rgba(0, 255, 65, 0.15) 0%, transparent 50%), radial-gradient(circle at 80% 30%, rgba(0, 255, 65, 0.1) 0%, transparent 50%)!important;z-index:0!important;pointer-events:none!important;';
                section.insertBefore(gradientOverlay, section.firstChild);
                const container = section.querySelector('.container');
                if (container) { container.style.position = 'relative'; container.style.zIndex = '10'; }
                lastBackground = '#0a0a0a';
                return;
            }
            if (section.classList.contains('footer') || tagName === 'footer') {
                const footerBg = lastBackground === '#050807' ? '#0A0A0A' : '#050807';
                section.style.setProperty('background', footerBg, 'important');
                section.style.setProperty('border-top', '1px solid rgba(0, 255, 65, 0.2)', 'important');
                return;
            }
            const bgIndex = alternateIndex % 2;
            const currentBg = backgrounds[bgIndex];
            section.style.setProperty('background', currentBg, 'important');
            section.style.setProperty('border-top', borders[bgIndex].top, 'important');
            if (borders[bgIndex].bottom !== 'none') { section.style.setProperty('border-bottom', borders[bgIndex].bottom, 'important'); }
            lastBackground = currentBg;
            alternateIndex++;
        });
    }, 100);
});


