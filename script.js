/**
 * Gavesh Rupasinghe Portfolio Logic
 */

// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

if (hamburger) {
  hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    const icon = hamburger.querySelector('i');
    if (navLinks.classList.contains('active')) {
      icon.classList.remove('bx-menu');
      icon.classList.add('bx-x');
    } else {
      icon.classList.remove('bx-x');
      icon.classList.add('bx-menu');
    }
  });
}

// Close mobile nav when a link is clicked
document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('active');
    const icon = hamburger?.querySelector('i');
    if (icon) {
      icon.classList.remove('bx-x');
      icon.classList.add('bx-menu');
    }
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
  if (window.scrollY > 50) {
    navbar.style.padding = '15px 10%';
    navbar.style.background = 'rgba(8, 2, 18, 0.95)';
    navbar.style.boxShadow = '0 5px 20px rgba(0,0,0,0.8)';
  } else {
    navbar.style.padding = '20px 10%';
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
