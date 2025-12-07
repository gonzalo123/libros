/**
 * EXPERIMENTAL.JS - MÁXIMO ESPECTÁCULO
 * Brutalista experimental con animaciones avanzadas
 */

// ============================================
// SCROLL PROGRESS BAR
// ============================================
function updateScrollProgress() {
    const scrollProgress = document.querySelector('.scroll-progress');
    if (!scrollProgress) return;

    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight - windowHeight;
    const scrolled = window.scrollY;
    const progress = (scrolled / documentHeight) * 100;

    scrollProgress.style.width = `${progress}%`;
}

window.addEventListener('scroll', updateScrollProgress);
window.addEventListener('load', updateScrollProgress);

// ============================================
// INTERSECTION OBSERVER - SCROLL TRIGGERED
// ============================================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            // Para elementos que solo deben animar una vez
            if (entry.target.classList.contains('animate-once')) {
                observer.unobserve(entry.target);
            }
        }
    });
}, observerOptions);

// Observar book items
document.querySelectorAll('.book-item').forEach(item => {
    item.classList.add('animate-once');
    observer.observe(item);
});

// Observar section headers
document.querySelectorAll('.section-header').forEach(header => {
    observer.observe(header);
});

// Observar footer
const footer = document.querySelector('.footer-brutal');
if (footer) {
    observer.observe(footer);
}

// ============================================
// PARALLAX EFFECT - STATEMENT SECTION
// ============================================
function updateParallax() {
    const statementSection = document.querySelector('.statement-section');
    if (!statementSection) return;

    const scrolled = window.scrollY;
    const sectionTop = statementSection.offsetTop;
    const sectionHeight = statementSection.offsetHeight;
    const windowHeight = window.innerHeight;

    // Solo aplicar parallax cuando la sección está visible
    if (scrolled + windowHeight > sectionTop && scrolled < sectionTop + sectionHeight) {
        const relativeScroll = scrolled - sectionTop + windowHeight;
        const parallax1 = relativeScroll * 0.15;
        const parallax2 = relativeScroll * 0.3;
        const parallax3 = relativeScroll * 0.45;
        const parallaxX = Math.sin(relativeScroll * 0.01) * 50;

        document.documentElement.style.setProperty('--parallax-1', `${parallax1}px`);
        document.documentElement.style.setProperty('--parallax-2', `${parallax2}px`);
        document.documentElement.style.setProperty('--parallax-3', `${parallax3}px`);
        document.documentElement.style.setProperty('--parallax-x', `${parallaxX}px`);
    }
}

let ticking = false;
window.addEventListener('scroll', () => {
    if (!ticking) {
        window.requestAnimationFrame(() => {
            updateParallax();
            ticking = false;
        });
        ticking = true;
    }
});

// ============================================
// 3D TILT EFFECT ON BOOK ITEMS
// ============================================
document.querySelectorAll('.book-item').forEach(item => {
    item.addEventListener('mousemove', (e) => {
        const rect = item.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = ((y - centerY) / centerY) * 10; // Max 10deg
        const rotateY = ((centerX - x) / centerX) * 10; // Max 10deg

        item.style.setProperty('--rotate-x', `${rotateX}deg`);
        item.style.setProperty('--rotate-y', `${rotateY}deg`);
    });

    item.addEventListener('mouseleave', () => {
        item.style.setProperty('--rotate-x', '0deg');
        item.style.setProperty('--rotate-y', '0deg');
    });
});

// ============================================
// TEXT SCRAMBLE EFFECT
// ============================================
class TextScramble {
    constructor(el) {
        this.el = el;
        this.chars = '!<>-_\\/[]{}—=+*^?#________';
        this.update = this.update.bind(this);
    }

    setText(newText) {
        const oldText = this.el.innerText;
        const length = Math.max(oldText.length, newText.length);
        const promise = new Promise((resolve) => this.resolve = resolve);
        this.queue = [];

        for (let i = 0; i < length; i++) {
            const from = oldText[i] || '';
            const to = newText[i] || '';
            const start = Math.floor(Math.random() * 40);
            const end = start + Math.floor(Math.random() * 40);
            this.queue.push({ from, to, start, end });
        }

        cancelAnimationFrame(this.frameRequest);
        this.frame = 0;
        this.update();
        return promise;
    }

    update() {
        let output = '';
        let complete = 0;

        for (let i = 0, n = this.queue.length; i < n; i++) {
            let { from, to, start, end, char } = this.queue[i];

            if (this.frame >= end) {
                complete++;
                output += to;
            } else if (this.frame >= start) {
                if (!char || Math.random() < 0.28) {
                    char = this.randomChar();
                    this.queue[i].char = char;
                }
                output += `<span class="scramble-char">${char}</span>`;
            } else {
                output += from;
            }
        }

        this.el.innerHTML = output;

        if (complete === this.queue.length) {
            this.resolve();
        } else {
            this.frameRequest = requestAnimationFrame(this.update);
            this.frame++;
        }
    }

    randomChar() {
        return this.chars[Math.floor(Math.random() * this.chars.length)];
    }
}

// Apply scramble effect to book titles on hover
document.querySelectorAll('.book-title').forEach(title => {
    const fx = new TextScramble(title);
    const originalText = title.textContent;

    title.closest('.book-item').addEventListener('mouseenter', () => {
        fx.setText(originalText);
    });
});

// ============================================
// GLITCH EFFECT RANDOM
// ============================================
function randomGlitch() {
    const books = document.querySelectorAll('.book-item');
    if (books.length === 0) return;

    const randomBook = books[Math.floor(Math.random() * books.length)];
    const glitch = randomBook.querySelector('.book-glitch');

    if (glitch) {
        glitch.style.opacity = '1';
        setTimeout(() => {
            glitch.style.opacity = '0';
        }, 200);
    }
}

// Random glitch every 5-10 seconds
setInterval(() => {
    if (Math.random() > 0.5) {
        randomGlitch();
    }
}, Math.random() * 5000 + 5000);

// ============================================
// MAGNETIC CURSOR EFFECT (subtle)
// ============================================
const magneticElements = document.querySelectorAll('.book-link, .footer-link');

magneticElements.forEach(el => {
    el.addEventListener('mousemove', (e) => {
        const rect = el.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;

        el.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px)`;
    });

    el.addEventListener('mouseleave', () => {
        el.style.transform = 'translate(0, 0)';
    });
});

// ============================================
// SMOOTH SCROLL FOR ANCHOR LINKS
// ============================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ============================================
// NOISE ANIMATION
// ============================================
const noiseOverlay = document.querySelector('.noise-overlay');
if (noiseOverlay) {
    setInterval(() => {
        noiseOverlay.style.transform = `translate(${Math.random() * 5}px, ${Math.random() * 5}px)`;
    }, 100);
}

// ============================================
// GEOMETRIC SHAPES MOUSE FOLLOW (subtle)
// ============================================
let mouseX = 0;
let mouseY = 0;

document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
});

function updateShapes() {
    const shapes = document.querySelectorAll('.shape');
    shapes.forEach((shape, index) => {
        const speed = (index + 1) * 0.02;
        const x = (mouseX - window.innerWidth / 2) * speed;
        const y = (mouseY - window.innerHeight / 2) * speed;

        shape.style.transform += ` translate(${x}px, ${y}px)`;
    });

    requestAnimationFrame(updateShapes);
}

updateShapes();

// ============================================
// SECTION NUMBER COUNTER (animated count)
// ============================================
const countNumber = document.querySelector('.count-number');
if (countNumber) {
    const targetNumber = parseInt(countNumber.textContent);

    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(countNumber, 0, targetNumber, 2000);
                counterObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);

    counterObserver.observe(countNumber);
}

function animateCounter(element, start, end, duration) {
    let startTimestamp = null;

    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        const current = Math.floor(progress * (end - start) + start);

        element.textContent = current;

        if (progress < 1) {
            window.requestAnimationFrame(step);
        }
    };

    window.requestAnimationFrame(step);
}

// ============================================
// EASTER EGG: KONAMI CODE
// ============================================
let konamiCode = [];
const konamiSequence = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];

document.addEventListener('keydown', (e) => {
    konamiCode.push(e.key);
    konamiCode = konamiCode.slice(-10);

    if (konamiCode.join('') === konamiSequence.join('')) {
        activateEasterEgg();
    }
});

function activateEasterEgg() {
    document.body.style.transition = 'all 2s';
    document.body.style.transform = 'rotate(360deg)';

    setTimeout(() => {
        document.body.style.transform = 'rotate(0deg)';
        alert('🎉 ¡MODO EXPERIMENTAL ACTIVADO AL MÁXIMO!');
    }, 2000);
}

// ============================================
// KEYBOARD NAVIGATION ENHANCEMENT
// ============================================
let currentFocus = -1;
const focusableElements = document.querySelectorAll('.book-item, .book-link, .footer-link');

document.addEventListener('keydown', (e) => {
    if (e.key === 'Tab') {
        currentFocus++;
        if (currentFocus >= focusableElements.length) currentFocus = 0;
    }
});

// ============================================
// PERFORMANCE OPTIMIZATION
// ============================================
// Pause animations when tab is not visible
document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
        document.body.style.animationPlayState = 'paused';
    } else {
        document.body.style.animationPlayState = 'running';
    }
});

// ============================================
// CONSOLE MESSAGE
// ============================================
console.log('%c⚡ EXPERIMENTAL VERSION LOADED', 'font-size: 20px; font-weight: bold; color: #FFFF00; background: #000000; padding: 10px;');
console.log('%cEste es un experimento de diseño brutalista.', 'font-size: 14px; color: #FF0000;');
console.log('%cPrueba el Konami Code: ↑↑↓↓←→←→BA', 'font-size: 12px; color: #0000FF;');

// ============================================
// INIT
// ============================================
console.log('🚀 Experimental JS initialized successfully');
