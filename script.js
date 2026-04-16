/**
 * Gavesh Rupasinghe Portfolio Logic
 */

// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navLinks = document.getElementById('navLinks');
const mobileBackdrop = document.getElementById('mobileBackdrop');

function closeMobileNav() {
  if (!navLinks) return;
  navLinks.classList.remove('active');
  const icon = hamburger?.querySelector('i');
  if (icon) {
    icon.classList.remove('bx-x');
    icon.classList.add('bx-menu');
  }
  if (hamburger) hamburger.setAttribute('aria-expanded', 'false');
  if (mobileBackdrop) mobileBackdrop.setAttribute('aria-hidden', 'true');
}

function openMobileNav() {
  if (!navLinks) return;
  navLinks.classList.add('active');
  const icon = hamburger?.querySelector('i');
  if (icon) {
    icon.classList.remove('bx-menu');
    icon.classList.add('bx-x');
  }
  if (hamburger) hamburger.setAttribute('aria-expanded', 'true');
  if (mobileBackdrop) mobileBackdrop.setAttribute('aria-hidden', 'false');
}

if (hamburger) {
  hamburger.addEventListener('click', () => {
    if (navLinks.classList.contains('active')) {
      closeMobileNav();
    } else {
      openMobileNav();
    }
  });

  // Allow keyboard toggle (Enter / Space)
  hamburger.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      hamburger.click();
    }
  });
}

// Backdrop click closes mobile nav
if (mobileBackdrop) {
  mobileBackdrop.addEventListener('click', () => {
    closeMobileNav();
  });
}

// Close on Escape
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    closeMobileNav();
  }
});

// Close mobile nav when a link is clicked
document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', () => {
    closeMobileNav();
  });
});

// Update Copyright Year dynamically
const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().getFullYear();

// Scroll Effects for Navbar & Move-on-scroll elements
const navbar = document.querySelector('.navbar');
const moveElements = document.querySelectorAll('.move-on-scroll');

window.addEventListener('scroll', () => {
  // Navbar shrink
  const sidePad = window.innerWidth <= 768 ? '5%' : '10%';
  if (window.scrollY > 50) {
    navbar.style.padding = `15px ${sidePad}`;
    navbar.style.background = 'rgba(8, 2, 18, 0.95)';
    navbar.style.boxShadow = '0 5px 20px rgba(0,0,0,0.8)';
  } else {
    navbar.style.padding = `20px ${sidePad}`;
    navbar.style.background = 'rgba(8, 2, 18, 0.85)';
    navbar.style.boxShadow = 'none';
  }

  // "Responsive Af" Move Logic
  const scrolled = window.pageYOffset;
  moveElements.forEach(el => {
      const pos = el.offsetTop;
      const h = el.offsetHeight;
      // Only move if visible
      if (scrolled + window.innerHeight > pos && scrolled < pos + h) {
          const move = (scrolled - pos) * 0.1;
          el.style.setProperty('--scroll-move', `${move}px`);
      }
  });
});

// Active Link Setup based on scroll position
const sections = document.querySelectorAll('section');
const navItems = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;
    if (window.pageYOffset >= (sectionTop - sectionHeight / 3)) {
      current = section.getAttribute('id');
    }
  });

  navItems.forEach(item => {
    item.classList.remove('active');
    if (item.getAttribute('href').slice(1) === current) {
      item.classList.add('active');
    }
  });
});

// Intersection Observer for scroll animations (Fade In)
const observerOptions = {
  root: null,
  rootMargin: '0px',
  threshold: 0.15
};

const observer = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      // No unobserve to allow re-trigger if preferred, but usually unobserve is cleaner
      // observer.unobserve(entry.target); 
    }
  });
}, observerOptions);

// Select elements for animation
const animatedElements = document.querySelectorAll('.fade-in, .skill-card, .edu-card, .project-card, .contact-content');

animatedElements.forEach(el => {
  observer.observe(el);
});

// Handle Contact Form Submission using Web3Forms
const contactForm = document.getElementById('contactForm');
if(contactForm) {
  contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const btn = contactForm.querySelector('.submit-btn');
    const originalText = btn.innerHTML;
    
    // UI Feedback
    btn.innerHTML = '<span>Sending Transmission...</span> <i class="bx bx-loader-alt bx-spin"></i>';
    btn.style.opacity = '0.7';
    btn.disabled = true;

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          access_key: '2c3fda62-5f91-47f1-bbe5-9cde9f6ddc86',
          name: name,
          email: email,
          message: message
        })
      });

      const result = await response.json();

      if (response.status === 200) {
        contactForm.reset();
        btn.innerHTML = '<span>Transmission Complete!</span> <i class="bx bx-check"></i>';
        btn.style.background = '#3ecf8e'; // Supabase Green
      } else {
        alert("Error: " + result.message);
        btn.innerHTML = originalText;
        btn.disabled = false;
        btn.style.opacity = '1';
      }
    } catch (error) {
      alert("Something went wrong! Please try again later.");
      btn.innerHTML = originalText;
      btn.disabled = false;
      btn.style.opacity = '1';
    } finally {
      setTimeout(() => {
        btn.innerHTML = originalText;
        btn.disabled = false;
        btn.style.opacity = '1';
        btn.style.background = '';
      }, 3000);
    }
  });
}
