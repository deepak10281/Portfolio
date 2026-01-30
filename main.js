// ===================================
// Navigation & Theme Management
// ===================================

// Mobile Navigation Toggle
const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');
const navLinks = document.querySelectorAll('.nav-link');

navToggle.addEventListener('click', () => {
    navToggle.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navToggle.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Navbar scroll effect
const navbar = document.getElementById('navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    
    lastScroll = currentScroll;
});

// Active nav link on scroll
const sections = document.querySelectorAll('section[id]');

function highlightNavLink() {
    const scrollY = window.pageYOffset;
    
    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 100;
        const sectionId = section.getAttribute('id');
        const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);
        
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            navLink?.classList.add('active');
        } else {
            navLink?.classList.remove('active');
        }
    });
}

window.addEventListener('scroll', highlightNavLink);

// ===================================
// Theme Toggle
// ===================================

const themeToggle = document.getElementById('themeToggle');
const body = document.body;

// Check for saved theme preference or default to light theme
const currentTheme = localStorage.getItem('theme') || 'light';
body.classList.toggle('dark-theme', currentTheme === 'dark');
updateThemeIcon(currentTheme);

themeToggle.addEventListener('click', () => {
    body.classList.toggle('dark-theme');
    
    const theme = body.classList.contains('dark-theme') ? 'dark' : 'light';
    localStorage.setItem('theme', theme);
    updateThemeIcon(theme);
});

function updateThemeIcon(theme) {
    const icon = themeToggle.querySelector('i');
    if (theme === 'dark') {
        icon.classList.remove('fa-moon');
        icon.classList.add('fa-sun');
    } else {
        icon.classList.remove('fa-sun');
        icon.classList.add('fa-moon');
    }
}

// ===================================
// Smooth Scrolling
// ===================================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        
        if (target) {
            const offsetTop = target.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// ===================================
// Scroll Animations
// ===================================

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all animated elements
document.querySelectorAll('.stat-card, .skill-category, .timeline-item, .project-card, .education-card, .cert-card').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// ===================================
// Skill Bar Animation
// ===================================

const skillsSection = document.getElementById('skills');
let skillsAnimated = false;

const skillsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !skillsAnimated) {
            animateSkillBars();
            skillsAnimated = true;
        }
    });
}, { threshold: 0.5 });

if (skillsSection) {
    skillsObserver.observe(skillsSection);
}

function animateSkillBars() {
    const skillBars = document.querySelectorAll('.skill-progress');
    skillBars.forEach(bar => {
        const width = bar.style.width;
        bar.style.width = '0';
        setTimeout(() => {
            bar.style.width = width;
        }, 100);
    });
}

// ===================================
// Project Modal
// ===================================

const projectModal = document.getElementById('projectModal');
const projectDetailsButtons = document.querySelectorAll('.project-details-btn');
const projectCards = document.querySelectorAll('.project-card');
const modalClose = document.querySelector('.modal-close');
const modalOverlay = document.querySelector('.modal-overlay');

// Open modal when clicking project details button
projectDetailsButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const projectId = btn.getAttribute('data-project');
        openProjectModal(projectId);
    });
});

// Open modal when clicking project card
projectCards.forEach(card => {
    card.addEventListener('click', () => {
        const projectId = card.getAttribute('data-project');
        openProjectModal(projectId);
    });
});

// Close modal
modalClose?.addEventListener('click', closeProjectModal);
modalOverlay?.addEventListener('click', closeProjectModal);

// Close modal with ESC key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && projectModal.classList.contains('active')) {
        closeProjectModal();
    }
});

function openProjectModal(projectId) {
    // Hide all project details
    document.querySelectorAll('.project-details').forEach(detail => {
        detail.classList.remove('active');
    });
    
    // Show selected project details
    const selectedProject = document.getElementById(`project-${projectId}`);
    if (selectedProject) {
        selectedProject.classList.add('active');
    }
    
    // Show modal
    projectModal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeProjectModal() {
    projectModal.classList.remove('active');
    document.body.style.overflow = '';
}

// ===================================
// Contact Form
// ===================================

const contactForm = document.getElementById('contactForm');
const formMessage = document.getElementById('formMessage');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Get form data
    const formData = new FormData(contactForm);
    const name = formData.get('name');
    const email = formData.get('email');
    const subject = formData.get('subject');
    const message = formData.get('message');
    
    // Basic validation
    if (!name || !email || !subject || !message) {
        showFormMessage('Please fill in all fields.', 'error');
        return;
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        showFormMessage('Please enter a valid email address.', 'error');
        return;
    }
    
    // Simulate form submission
    // In a real implementation, you would send this data to a server
    showFormMessage('Thank you for your message! I will get back to you soon.', 'success');
    contactForm.reset();
    
    // You can integrate with services like Formspree, EmailJS, or your own backend
    // Example with EmailJS:
    // emailjs.send('service_id', 'template_id', {
    //     from_name: name,
    //     from_email: email,
    //     subject: subject,
    //     message: message
    // }).then(() => {
    //     showFormMessage('Thank you for your message! I will get back to you soon.', 'success');
    //     contactForm.reset();
    // }).catch(() => {
    //     showFormMessage('Failed to send message. Please try again.', 'error');
    // });
});

function showFormMessage(text, type) {
    formMessage.textContent = text;
    formMessage.className = `form-message ${type}`;
    
    // Hide message after 5 seconds
    setTimeout(() => {
        formMessage.className = 'form-message';
    }, 5000);
}

// ===================================
// Scroll to Top Button
// ===================================

const scrollTopBtn = document.getElementById('scrollTop');

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        scrollTopBtn.classList.add('visible');
    } else {
        scrollTopBtn.classList.remove('visible');
    }
});

scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// ===================================
// Typing Effect for Hero Section (Optional Enhancement)
// ===================================

const heroTagline = document.querySelector('.hero-tagline');
if (heroTagline) {
    const originalText = heroTagline.textContent;
    const words = ['Data Analyst', 'Business Intelligence Expert', 'Python Developer', 'SQL Specialist', 'Data Visualization Expert'];
    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let isPaused = false;
    
    function typeEffect() {
        const currentWord = words[wordIndex];
        
        if (isPaused) {
            setTimeout(typeEffect, 2000);
            isPaused = false;
            return;
        }
        
        if (!isDeleting) {
            heroTagline.textContent = currentWord.substring(0, charIndex);
            charIndex++;
            
            if (charIndex > currentWord.length) {
                isDeleting = true;
                isPaused = true;
            }
        } else {
            heroTagline.textContent = currentWord.substring(0, charIndex);
            charIndex--;
            
            if (charIndex === 0) {
                isDeleting = false;
                wordIndex = (wordIndex + 1) % words.length;
            }
        }
        
        const typingSpeed = isDeleting ? 50 : 100;
        setTimeout(typeEffect, typingSpeed);
    }
    
    // Uncomment to enable typing effect
    // typeEffect();
}

// ===================================
// Number Counter Animation for Stats
// ===================================

function animateValue(element, start, end, duration, suffix = '') {
    let startTimestamp = null;
    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        
        const currentValue = Math.floor(progress * (end - start) + start);
        element.textContent = currentValue + suffix;
        
        if (progress < 1) {
            window.requestAnimationFrame(step);
        }
    };
    window.requestAnimationFrame(step);
}

const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const statNumber = entry.target.querySelector('.stat-number');
            if (statNumber && !statNumber.classList.contains('animated')) {
                const text = statNumber.textContent;
                const number = parseInt(text.replace(/\D/g, ''));
                const suffix = text.replace(/[0-9]/g, '');
                
                animateValue(statNumber, 0, number, 2000, suffix);
                statNumber.classList.add('animated');
            }
        }
    });
}, { threshold: 0.5 });

document.querySelectorAll('.stat-card').forEach(card => {
    statsObserver.observe(card);
});

// ===================================
// Parallax Effect for Hero Section (Optional)
// ===================================

window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero-content');
    
    if (hero && scrolled < window.innerHeight) {
        hero.style.transform = `translateY(${scrolled * 0.5}px)`;
        hero.style.opacity = 1 - (scrolled / 500);
    }
});

// ===================================
// Cursor Trail Effect (Optional Enhancement)
// ===================================

// Uncomment to enable cursor trail effect
/*
const coords = { x: 0, y: 0 };
const circles = document.querySelectorAll('.circle');

circles.forEach(function(circle) {
    circle.x = 0;
    circle.y = 0;
});

window.addEventListener('mousemove', function(e) {
    coords.x = e.clientX;
    coords.y = e.clientY;
});

function animateCircles() {
    let x = coords.x;
    let y = coords.y;
    
    circles.forEach(function(circle, index) {
        circle.style.left = x - 12 + 'px';
        circle.style.top = y - 12 + 'px';
        circle.style.scale = (circles.length - index) / circles.length;
        
        circle.x = x;
        circle.y = y;
        
        const nextCircle = circles[index + 1] || circles[0];
        x += (nextCircle.x - x) * 0.3;
        y += (nextCircle.y - y) * 0.3;
    });
    
    requestAnimationFrame(animateCircles);
}

animateCircles();
*/

// ===================================
// Page Load Animation
// ===================================

window.addEventListener('load', () => {
    // Remove any loading screen if present
    const loader = document.querySelector('.loader');
    if (loader) {
        loader.style.opacity = '0';
        setTimeout(() => {
            loader.style.display = 'none';
        }, 300);
    }
    
    // Trigger initial animations
    document.body.style.opacity = '1';
});

// Set initial body opacity
document.body.style.opacity = '0';
document.body.style.transition = 'opacity 0.5s ease';

// ===================================
// Print Resume Function
// ===================================

function printResume() {
    window.print();
}

// ===================================
// Copy Email to Clipboard
// ===================================

const emailLinks = document.querySelectorAll('a[href^="mailto:"]');

emailLinks.forEach(link => {
    link.addEventListener('contextmenu', (e) => {
        e.preventDefault();
        const email = link.getAttribute('href').replace('mailto:', '');
        
        navigator.clipboard.writeText(email).then(() => {
            // Show a tooltip or message
            const tooltip = document.createElement('div');
            tooltip.textContent = 'Email copied!';
            tooltip.style.cssText = `
                position: fixed;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                background: rgba(16, 185, 129, 0.9);
                color: white;
                padding: 1rem 2rem;
                border-radius: 8px;
                font-weight: 600;
                z-index: 9999;
                animation: fadeIn 0.3s ease;
            `;
            
            document.body.appendChild(tooltip);
            
            setTimeout(() => {
                tooltip.style.animation = 'fadeOut 0.3s ease';
                setTimeout(() => {
                    document.body.removeChild(tooltip);
                }, 300);
            }, 2000);
        });
    });
});

// ===================================
// Performance Optimization
// ===================================

// Lazy load images when they come into viewport
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });
    
    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// ===================================
// Console Message (Easter Egg)
// ===================================

console.log('%c👋 Hi there!', 'font-size: 24px; font-weight: bold; color: #2563eb;');
console.log('%cLooking at the console? I like your curiosity!', 'font-size: 16px; color: #6b7280;');
console.log('%cInterested in working together? Let\'s connect!', 'font-size: 14px; color: #10b981;');
console.log('%cEmail: Deepakmalviya7604@gmail.com', 'font-size: 14px; color: #8b5cf6;');

// ===================================
// Analytics (Optional - Add your tracking code)
// ===================================

// Track button clicks
document.querySelectorAll('.btn').forEach(btn => {
    btn.addEventListener('click', () => {
        // Example: gtag('event', 'button_click', { button_name: btn.textContent });
        console.log('Button clicked:', btn.textContent);
    });
});

// Track project views
projectDetailsButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        const projectId = btn.getAttribute('data-project');
        // Example: gtag('event', 'project_view', { project_id: projectId });
        console.log('Project viewed:', projectId);
    });
});

// ===================================
// Service Worker Registration (Optional for PWA)
// ===================================

if ('serviceWorker' in navigator) {
    // Uncomment to enable service worker
    // window.addEventListener('load', () => {
    //     navigator.serviceWorker.register('/sw.js')
    //         .then(registration => console.log('SW registered:', registration))
    //         .catch(error => console.log('SW registration failed:', error));
    // });
}

// ===================================
// Dark Mode Auto Detection
// ===================================

// Auto-detect system dark mode preference on first visit
if (!localStorage.getItem('theme')) {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    if (prefersDark) {
        body.classList.add('dark-theme');
        updateThemeIcon('dark');
        localStorage.setItem('theme', 'dark');
    }
}

// Listen for system theme changes
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
    if (!localStorage.getItem('theme')) {
        const theme = e.matches ? 'dark' : 'light';
        body.classList.toggle('dark-theme', e.matches);
        updateThemeIcon(theme);
    }
});

// ===================================
// Utility Functions
// ===================================

// Debounce function for performance
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

// Throttle function for scroll events
function throttle(func, limit) {
    let inThrottle;
    return function(...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// Apply throttle to scroll events for better performance
const throttledScroll = throttle(() => {
    highlightNavLink();
}, 100);

window.addEventListener('scroll', throttledScroll);

// ===================================
// Accessibility Enhancements
// ===================================

// Skip to main content
const skipLink = document.createElement('a');
skipLink.href = '#about';
skipLink.textContent = 'Skip to main content';
skipLink.className = 'skip-link';
skipLink.style.cssText = `
    position: absolute;
    top: -40px;
    left: 0;
    background: var(--primary-color);
    color: white;
    padding: 8px 16px;
    text-decoration: none;
    z-index: 10000;
`;
skipLink.addEventListener('focus', () => {
    skipLink.style.top = '0';
});
skipLink.addEventListener('blur', () => {
    skipLink.style.top = '-40px';
});
document.body.insertBefore(skipLink, document.body.firstChild);

// Keyboard navigation for modal
document.addEventListener('keydown', (e) => {
    if (projectModal.classList.contains('active')) {
        if (e.key === 'Tab') {
            // Trap focus within modal
            const focusableElements = projectModal.querySelectorAll('button, a[href]');
            const firstElement = focusableElements[0];
            const lastElement = focusableElements[focusableElements.length - 1];
            
            if (e.shiftKey) {
                if (document.activeElement === firstElement) {
                    e.preventDefault();
                    lastElement.focus();
                }
            } else {
                if (document.activeElement === lastElement) {
                    e.preventDefault();
                    firstElement.focus();
                }
            }
        }
    }
});

console.log('%c✅ Portfolio website loaded successfully!', 'font-size: 14px; font-weight: bold; color: #10b981;');
