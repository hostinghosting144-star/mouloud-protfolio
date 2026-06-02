/* =============================================
   MOULOUD ALLOUCHE – PORTFOLIO JAVASCRIPT
   Premium Interactions & Animations
   ============================================= */

'use strict';

// =============================================
// PRELOADER
// =============================================
window.addEventListener('load', () => {
  const preloader = document.getElementById('preloader');
  if (preloader) {
    setTimeout(() => {
      preloader.classList.add('hidden');
      document.body.style.overflow = '';
      initAnimations();
    }, 1900);
  }
});

document.body.style.overflow = 'hidden';

// =============================================
// CUSTOM CURSOR
// =============================================
const cursor = document.getElementById('cursor');
const cursorFollower = document.getElementById('cursor-follower');

let mouseX = 0, mouseY = 0;
let followerX = 0, followerY = 0;

document.addEventListener('mousemove', (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
  if (cursor) {
    cursor.style.left = mouseX + 'px';
    cursor.style.top = mouseY + 'px';
  }
});

function animateCursorFollower() {
  if (cursorFollower) {
    followerX += (mouseX - followerX) * 0.12;
    followerY += (mouseY - followerY) * 0.12;
    cursorFollower.style.left = followerX + 'px';
    cursorFollower.style.top = followerY + 'px';
  }
  requestAnimationFrame(animateCursorFollower);
}
animateCursorFollower();

// Hover effect on interactive elements
const hoverTargets = document.querySelectorAll('a, button, .skill-card, .timeline-card, .edu-card, .contact-card');
hoverTargets.forEach(el => {
  el.addEventListener('mouseenter', () => {
    cursor?.classList.add('hovering');
    cursorFollower?.classList.add('hovering');
  });
  el.addEventListener('mouseleave', () => {
    cursor?.classList.remove('hovering');
    cursorFollower?.classList.remove('hovering');
  });
});

// =============================================
// NAVBAR
// =============================================
const navbar = document.getElementById('navbar');
const hamburger = document.getElementById('hamburger');
const navLinksContainer = document.getElementById('nav-links');
const navLinks = document.querySelectorAll('.nav-link');

// Scroll behavior
window.addEventListener('scroll', handleScroll, { passive: true });

function handleScroll() {
  if (!navbar) return;
  if (window.scrollY > 50) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
  updateActiveNavLink();
  handleScrollTopVisibility();
}

// Hamburger toggle
if (hamburger && navLinksContainer) {
  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('open');
    navLinksContainer.classList.toggle('open');
  });
}

// Close menu on link click (mobile)
navLinks.forEach(link => {
  link.addEventListener('click', () => {
    hamburger?.classList.remove('open');
    navLinksContainer?.classList.remove('open');
  });
});

// Active nav link on scroll
function updateActiveNavLink() {
  const sections = document.querySelectorAll('section[id]');
  const scrollPos = window.scrollY + 100;

  sections.forEach(section => {
    const top = section.offsetTop;
    const bottom = top + section.offsetHeight;
    const id = section.getAttribute('id');

    if (scrollPos >= top && scrollPos < bottom) {
      navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('data-section') === id) {
          link.classList.add('active');
        }
      });
    }
  });
}

// =============================================
// TYPEWRITER EFFECT
// =============================================
const typewriterEl = document.getElementById('typewriter');
const phrases = [
  'Food Quality Control',
  'Microbiological Analysis',
  'Food Safety Assurance',
  'Biochemical Analysis',
  'Agro-Food Innovation',
  'Product Inspection',
  'Quality Assurance'
];

let phraseIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typewriterTimeout;

function typeWriter() {
  if (!typewriterEl) return;
  const currentPhrase = phrases[phraseIndex];

  if (!isDeleting) {
    typewriterEl.textContent = currentPhrase.slice(0, charIndex + 1);
    charIndex++;
    if (charIndex === currentPhrase.length) {
      isDeleting = true;
      typewriterTimeout = setTimeout(typeWriter, 1800);
      return;
    }
  } else {
    typewriterEl.textContent = currentPhrase.slice(0, charIndex - 1);
    charIndex--;
    if (charIndex === 0) {
      isDeleting = false;
      phraseIndex = (phraseIndex + 1) % phrases.length;
    }
  }
  typewriterTimeout = setTimeout(typeWriter, isDeleting ? 60 : 90);
}

setTimeout(typeWriter, 1000);

// =============================================
// COUNTER ANIMATION
// =============================================
function animateCounter(el) {
  const target = parseInt(el.dataset.target, 10);
  const duration = 1500;
  const start = performance.now();

  function update(now) {
    const elapsed = now - start;
    const progress = Math.min(elapsed / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    el.textContent = Math.round(eased * target);
    if (progress < 1) requestAnimationFrame(update);
  }
  requestAnimationFrame(update);
}

// =============================================
// INTERSECTION OBSERVER – AOS & PROGRESS BARS
// =============================================
function initAnimations() {
  // AOS (Animate On Scroll)
  const aosEls = document.querySelectorAll('[data-aos]');
  const aosObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('aos-animate');
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -50px 0px' });

  aosEls.forEach(el => aosObserver.observe(el));

  // Progress bars (skills + languages)
  const progressBars = document.querySelectorAll('.skill-progress-fill, .lang-bar-fill');
  const barObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const fill = entry.target;
        const width = fill.dataset.width;
        fill.style.width = width + '%';
        barObserver.unobserve(fill);
      }
    });
  }, { threshold: 0.3 });

  progressBars.forEach(bar => barObserver.observe(bar));

  // Counters
  const counters = document.querySelectorAll('.stat-number');
  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        counterObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  counters.forEach(counter => counterObserver.observe(counter));
}

// =============================================
// PARTICLES
// =============================================
function createParticles() {
  const container = document.getElementById('particles');
  if (!container) return;

  const count = window.innerWidth < 768 ? 15 : 35;
  for (let i = 0; i < count; i++) {
    const particle = document.createElement('div');
    particle.className = 'hero-particle';
    particle.style.left = Math.random() * 100 + '%';
    particle.style.animationDuration = (8 + Math.random() * 15) + 's';
    particle.style.animationDelay = (Math.random() * 12) + 's';
    particle.style.width = particle.style.height = (2 + Math.random() * 3) + 'px';
    particle.style.opacity = (0.2 + Math.random() * 0.4).toString();
    container.appendChild(particle);
  }
}
createParticles();

// =============================================
// SCROLL TO TOP
// =============================================
const scrollTopBtn = document.getElementById('scroll-top');

function handleScrollTopVisibility() {
  if (!scrollTopBtn) return;
  if (window.scrollY > 400) {
    scrollTopBtn.classList.add('visible');
  } else {
    scrollTopBtn.classList.remove('visible');
  }
}

if (scrollTopBtn) {
  scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

// =============================================
// CONTACT FORM
// =============================================
const contactForm = document.getElementById('contact-form');
const formFeedback = document.getElementById('form-feedback');
const submitBtn = document.getElementById('form-submit-btn');

if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('form-name')?.value.trim();
    const email = document.getElementById('form-email')?.value.trim();
    const subject = document.getElementById('form-subject')?.value.trim();
    const message = document.getElementById('form-message')?.value.trim();

    // Basic validation
    if (!name || !email || !subject || !message) {
      showFeedback('Please fill in all fields before sending.', 'error');
      return;
    }
    if (!isValidEmail(email)) {
      showFeedback('Please enter a valid email address.', 'error');
      return;
    }

    // Simulate sending
    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> <span>Sending...</span>';
    }

    setTimeout(() => {
      showFeedback(`✓ Thank you, ${name}! Your message has been received. Mouloud will get back to you soon.`, 'success');
      contactForm.reset();
      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.innerHTML = '<i class="fas fa-paper-plane"></i> <span>Send Message</span>';
      }
    }, 2000);
  });
}

function showFeedback(message, type) {
  if (!formFeedback) return;
  formFeedback.textContent = message;
  formFeedback.className = 'form-feedback ' + type;
  setTimeout(() => {
    formFeedback.className = 'form-feedback';
  }, 6000);
}

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

// =============================================
// SMOOTH SCROLLING (fallback for older browsers)
// =============================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', (e) => {
    const target = document.querySelector(anchor.getAttribute('href'));
    if (target) {
      e.preventDefault();
      const offset = target.getBoundingClientRect().top + window.scrollY - 70;
      window.scrollTo({ top: offset, behavior: 'smooth' });
    }
  });
});

// =============================================
// SKILL CARDS – HOVER PARALLAX
// =============================================
const skillCards = document.querySelectorAll('.skill-card');
skillCards.forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 10;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 10;
    card.style.transform = `translateY(-5px) rotateY(${x}deg) rotateX(${-y}deg)`;
    card.style.transition = 'transform 0.1s ease';
  });
  card.addEventListener('mouseleave', () => {
    card.style.transform = '';
    card.style.transition = 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
  });
});

// =============================================
// EDUCATION CARDS – HOVER GLOW
// =============================================
const eduCards = document.querySelectorAll('.edu-card');
eduCards.forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    card.style.setProperty('--mouse-x', x + 'px');
    card.style.setProperty('--mouse-y', y + 'px');
  });
});

// =============================================
// INIT ON DOM READY
// =============================================
document.addEventListener('DOMContentLoaded', () => {
  handleScroll();
  // Kick off animations immediately if page is already loaded
  if (document.readyState === 'complete') {
    setTimeout(initAnimations, 100);
  }
});

console.log('%c Mouloud Allouche | Portfolio ', 'background:#00c896;color:#fff;font-size:14px;font-weight:bold;padding:6px 12px;border-radius:4px;');
console.log('%c Food Quality Control & Agro-Food Specialist', 'color:#00c896;font-size:11px;');
