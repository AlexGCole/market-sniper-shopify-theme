// Animation Controller

// Throttle function
function throttle(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Debounce function
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Initialize hero animations immediately
function initHeroAnimations() {
    // Target only elements within hero sections to avoid conflicts
    const mainHeroElements = document.querySelectorAll(
        '.hero .animate-hero-left, ' +
        '.hero .animate-hero-right'
    );
    
    const featuresHeroElements = document.querySelectorAll(
        '.features-hero-alt .animate-hero-left, ' +
        '.features-hero-alt .animate-hero-right'
    );
    
    // Initialize main hero with staggered delay
    setTimeout(() => {
        mainHeroElements.forEach(el => {
            el.classList.add('hero-visible');
        });
    }, 100);
    
    // Initialize features hero with staggered delay
    setTimeout(() => {
        featuresHeroElements.forEach(el => {
            el.classList.add('hero-visible');
        });
    }, 150);
}

// Observe elements for scroll animations (one-way, keeps visible state)
function initScrollAnimations() {
    const observerOptions = { threshold: 0.1, rootMargin: '0px 0px -50px 0px' };
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => { 
            if (entry.isIntersecting) { 
                entry.target.classList.add('visible'); 
            } 
        });
    }, observerOptions);
    const elementsToAnimate = document.querySelectorAll('.indicator-item');
    elementsToAnimate.forEach(el => { 
        el.classList.add('animate-on-scroll'); 
        observer.observe(el); 
    });
}

// Observe elements for scroll animations (one-way, stays visible once triggered)
function initBidirectionalAnimations() {
    const observerOptions = { 
        threshold: 0.15, 
        rootMargin: '0px 0px -100px 0px' 
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);
    
    // Target how-it-works step cards with staggered delays (all from left)
    const stepCards = document.querySelectorAll('.how-it-works .step-card');
    stepCards.forEach((el, index) => {
        el.classList.add('animate-slide-left');
        // Ensure first card has a visible delay (0.1s minimum)
        const delay = Math.max(0.1, index * 0.1);
        el.style.transitionDelay = `${delay}s`;
        observer.observe(el);
    });
    
    // Target bot suite cards with staggered delays (all from left)
    const botCards = document.querySelectorAll('.bot-feature-card');
    botCards.forEach((el, index) => {
        el.classList.add('animate-slide-left');
        // Ensure first card has a visible delay (0.1s minimum)
        const delay = Math.max(0.1, index * 0.1);
        el.style.transitionDelay = `${delay}s`;
        observer.observe(el);
    });
    
    // Target what you get cards with staggered delays (all from right)
    const whatYouGetCards = document.querySelectorAll('.what-you-get-section .feature-card, .what-you-get-section .step-card');
    whatYouGetCards.forEach((el, index) => {
        el.classList.add('animate-slide-right');
        // Ensure first card has a visible delay (0.1s minimum)
        const delay = Math.max(0.1, index * 0.1);
        el.style.transitionDelay = `${delay}s`;
        observer.observe(el);
    });
    
    // Target pricing cards with staggered delays (all from left)
    const pricingCards = document.querySelectorAll('.pricing-option');
    pricingCards.forEach((el, index) => {
        el.classList.add('animate-slide-left');
        // Check if we're on the products page and adjust timing accordingly
        const isProductsPage = document.querySelector('.products-page');
        const baseDelay = isProductsPage ? 0.4 : 0.1; // Start after product header on products page
        const delay = Math.max(baseDelay, baseDelay + (index * 0.1));
        el.style.transitionDelay = `${delay}s`;
        observer.observe(el);
    });
    
    // Target FAQ items with staggered delays (all from left)
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach((el, index) => {
        el.classList.add('animate-slide-left');
        // Ensure first item has a visible delay (0.08s minimum)
        const delay = Math.max(0.08, index * 0.08);
        el.style.transitionDelay = `${delay}s`;
        observer.observe(el);
    });
    
    // Animate section headers (all from left) - EXCLUDES HERO
    const headers = document.querySelectorAll('.how-it-works .section-header, .bot-header, .what-you-get-section .section-header, .pricing-section .section-header, .faq .section-header, .indicators .section-header');
    headers.forEach(header => {
        // Add animate-slide-left class if not already present
        if (!header.classList.contains('animate-slide-left')) {
            header.classList.add('animate-slide-left');
        }
        observer.observe(header);
    });
    
    // Animate products page elements with proper timing
    const productsHeroTitle = document.querySelector('.products-hero-title.animate-slide-left');
    if (productsHeroTitle) {
        productsHeroTitle.style.transitionDelay = '0.1s';
        observer.observe(productsHeroTitle);
    }
    
    const productHeaders = document.querySelectorAll('.product-header.animate-slide-left');
    productHeaders.forEach((header, index) => {
        // Add delay to sync with pricing cards - headers should come before pricing
        header.style.transitionDelay = `${0.2 + (index * 0.1)}s`;
        observer.observe(header);
    });
    
    // Animate bot stat
    const botStat = document.querySelector('.bot-stat');
    if (botStat) {
        botStat.classList.add('animate-slide-left');
        observer.observe(botStat);
    }
    
    // Animate product page title
    const productTitle = document.querySelector('.animate-product-title');
    if (productTitle) {
        productTitle.classList.add('animate-slide-left');
        observer.observe(productTitle);
    }
    
    // Animate product page plan options
    const planOptions = document.querySelectorAll('.animate-plan-option');
    planOptions.forEach((el, index) => {
        el.classList.add('animate-slide-left');
        // Ensure first card has a visible delay (0.15s minimum)
        const delay = Math.max(0.15, index * 0.15);
        el.style.transitionDelay = `${delay}s`;
        observer.observe(el);
    });
    
    // Animate additional product page elements
    const productBadge = document.querySelector('.product-page .optional-badge.animate-slide-left');
    if (productBadge) {
        productBadge.classList.add('animate-slide-left');
        observer.observe(productBadge);
    }
    
    const productPrice = document.querySelector('.product-page .product-price.animate-slide-left');
    if (productPrice) {
        productPrice.classList.add('animate-slide-left');
        observer.observe(productPrice);
    }
    
    const automationNotice = document.querySelector('.product-page .automation-notice.animate-slide-left');
    if (automationNotice) {
        automationNotice.classList.add('animate-slide-left');
        observer.observe(automationNotice);
    }
    
    const setupFeeInfo = document.querySelector('.product-page .setup-fee-info.animate-slide-left');
    if (setupFeeInfo) {
        setupFeeInfo.classList.add('animate-slide-left');
        observer.observe(setupFeeInfo);
    }
    
    const productDescription = document.querySelector('.product-page .product-description.animate-slide-left');
    if (productDescription) {
        productDescription.classList.add('animate-slide-left');
        observer.observe(productDescription);
    }
    
    const planSelector = document.querySelector('.product-page .plan-selector.animate-slide-right');
    if (planSelector) {
        planSelector.classList.add('animate-slide-right');
        observer.observe(planSelector);
    }
    
    const addToCartBtn = document.querySelector('.product-page .add-to-cart-btn.animate-slide-right');
    if (addToCartBtn) {
        addToCartBtn.classList.add('animate-slide-right');
        observer.observe(addToCartBtn);
    }
    
    const cartMessage = document.querySelector('.product-page .cart-message.animate-slide-right');
    if (cartMessage) {
        cartMessage.classList.add('animate-slide-right');
        observer.observe(cartMessage);
    }
    
    // Animate indicator elements based on their position
    const indicatorContentLeft = document.querySelectorAll('.indicator-content.animate-slide-left');
    const indicatorVisualRight = document.querySelectorAll('.indicator-visual.animate-slide-right');
    const indicatorContentRight = document.querySelectorAll('.indicator-content.animate-slide-right');
    const indicatorVisualLeft = document.querySelectorAll('.indicator-visual.animate-slide-left');
    
    [...indicatorContentLeft, ...indicatorVisualRight, ...indicatorContentRight, ...indicatorVisualLeft].forEach((el, index) => {
        observer.observe(el);
    });
    
    // Animate What You Get section header (changed to animate-slide-left)
    const whatYouGetHeader = document.querySelectorAll('.what-you-get-section .section-header.animate-slide-left');
    whatYouGetHeader.forEach(el => {
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
    // EXCLUDE hero stats completely
    const stats = document.querySelectorAll('.stat-number:not(.hero .stat-number), .bot-stat-number');
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
    const hasSlash = text.includes('/');
    
    // Don't animate if it contains a slash (like "24/7")
    if (hasSlash) {
        return;
    }
    
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
    // Initialize hero animations immediately
    initHeroAnimations();
    
    // Initialize other animations
    initScrollAnimations();
    initBidirectionalAnimations();
    initParallax();
    animateStats();
    
    // Set alternating section backgrounds
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
            
            if (section.classList.contains('hero') || section.classList.contains('features-hero-alt')) {
                section.style.setProperty('background', 'linear-gradient(135deg, rgba(0, 255, 65, 0.2) 0%, rgba(0, 204, 51, 0.12) 30%, rgba(0, 255, 65, 0.05) 70%, rgba(10, 26, 15, 0.95) 100%)', 'important');
                const heroBg = section.querySelector('.hero-bg');
                if (heroBg) {
                    heroBg.style.setProperty('background', 'radial-gradient(circle at 20% 50%, rgba(0, 255, 65, 0.05) 0%, transparent 30%), radial-gradient(circle at 80% 30%, rgba(0, 255, 65, 0.03) 0%, transparent 30%)', 'important');
                }
                lastBackground = 'linear-gradient(135deg, rgba(0, 255, 65, 0.2) 0%, rgba(0, 204, 51, 0.12) 30%, rgba(0, 255, 65, 0.05) 70%, rgba(10, 26, 15, 0.95) 100%)';
                return;
            }
            
            if (section.classList.contains('products-hero-compact')) {
                section.style.setProperty('background', 'linear-gradient(135deg, rgba(0, 255, 65, 0.15) 0%, rgba(0, 204, 51, 0.08) 50%, rgba(10, 26, 15, 0.9) 100%)', 'important');
                section.style.setProperty('position', 'relative', 'important');
                section.style.setProperty('border-bottom', '1px solid rgba(0, 255, 65, 0.2)', 'important');
                const existingOverlay = section.querySelector('.hero-bg-overlay');
                if (existingOverlay) existingOverlay.remove();
                lastBackground = 'linear-gradient(135deg, rgba(0, 255, 65, 0.15) 0%, rgba(0, 204, 51, 0.08) 50%, rgba(10, 26, 15, 0.9) 100%)';
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
            if (borders[bgIndex].bottom !== 'none') { 
                section.style.setProperty('border-bottom', borders[bgIndex].bottom, 'important'); 
            }
            lastBackground = currentBg;
            alternateIndex++;
        });
    }, 100);
});

// Also initialize hero animations on window load as a fallback
window.addEventListener('load', () => {
    initHeroAnimations();
});