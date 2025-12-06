/**
 * Main JavaScript for Books Marketplace
 * Minimal JS for animations and interactions
 */

// ============================================
// NAVBAR SHADOW ON SCROLL
// ============================================
const navbar = document.querySelector('.navbar-custom');
if (navbar) {
    window.addEventListener('scroll', () => {
        if (window.scrollY > 20) {
            navbar.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.05)';
        } else {
            navbar.style.boxShadow = 'none';
        }
    });
}

// ============================================
// INTERSECTION OBSERVER FOR FADE-IN ANIMATIONS
// ============================================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in-up');
            // Unobserve after animation to improve performance
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe all book cards
document.querySelectorAll('.book-card').forEach(card => {
    observer.observe(card);
});

// ============================================
// SMOOTH SCROLL FALLBACK (for older browsers)
// ============================================
if (!('scrollBehavior' in document.documentElement.style)) {
    // Polyfill for smooth scroll if needed
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
}
