import emailjs from '@emailjs/browser';



// --- Mobile Menu Toggle ---
const hamburger = document.getElementById('navHamburger');
const mobileMenu = document.getElementById('mobileMenu');
const mobileLinks = document.querySelectorAll('.mobile-link, .mobile-cta');
const navbar = document.getElementById('navbar');

hamburger.addEventListener('click', () => {
  mobileMenu.classList.toggle('active');
  hamburger.classList.toggle('active');
});

mobileLinks.forEach(link => {
  link.addEventListener('click', () => {
    mobileMenu.classList.remove('active');
    hamburger.classList.remove('active');
  });
});

// --- Navbar scroll shadow ---
window.addEventListener('scroll', () => {
  if (window.scrollY > 10) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

// --- Active Nav Highlight & Smooth Scroll ---
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.nav-link');

const navObserverOptions = {
  rootMargin: '-20% 0px -79% 0px',
  threshold: 0
};

const navObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const current = entry.target.getAttribute('id');
      navLinks.forEach(link => {
        const sectionId = link.getAttribute('data-section');
        if (sectionId === current) {
          link.classList.add('active');
        } else {
          link.classList.remove('active');
        }
      });
    }
  });
}, navObserverOptions);

sections.forEach(section => navObserver.observe(section));

// --- Interactive 3D Tilt Effect ---
const projectCards = document.querySelectorAll('.project-card');

projectCards.forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = (y - centerY) / 10;
    const rotateY = (centerX - x) / 10;

    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
  });

  card.addEventListener('mouseleave', () => {
    card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
  });
});

// --- Scroll Reveal Animations ---
const revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, {
  threshold: 0.15,
  rootMargin: '0px 0px -50px 0px'
});

revealElements.forEach(el => revealObserver.observe(el));

// --- EmailJS Setup ---
// Initialize EmailJS
emailjs.init(import.meta.env.VITE_EMAILJS_PUBLIC_KEY);

const contactForm = document.getElementById('contactForm');
const submitBtn = document.getElementById('submitBtn');
const submitText = submitBtn.querySelector('.submit-text');
const submitLoading = submitBtn.querySelector('.submit-loading');
const submitIcon = submitBtn.querySelector('.submit-icon');
const formStatus = document.getElementById('formStatus');

contactForm.addEventListener('submit', (e) => {
  e.preventDefault();
  
  // UI Loading State
  submitText.style.display = 'none';
  submitIcon.style.display = 'none';
  submitLoading.style.display = 'inline-block';
  submitBtn.disabled = true;
  formStatus.textContent = '';
  formStatus.style.color = '';

  // Get form data
  const templateParams = {
    user_name: document.getElementById('contactName').value,
    user_email: document.getElementById('contactEmail').value,
    message: document.getElementById('contactMessage').value,
  };

  // Send email via EmailJS
  emailjs.send(
    import.meta.env.VITE_EMAILJS_SERVICE_ID,
    import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
    templateParams
  )
    .then(function(response) {
       console.log('SUCCESS!', response.status, response.text);
       formStatus.textContent = 'Message sent successfully! Let\'s build something brutally beautiful.';
       formStatus.style.color = 'var(--primary)';
       contactForm.reset();
       
       // Reset UI
       setTimeout(() => {
         submitText.style.display = 'inline-block';
         submitIcon.style.display = 'inline-block';
         submitLoading.style.display = 'none';
         submitBtn.disabled = false;
         formStatus.textContent = '';
       }, 5000);
    }, function(error) {
       console.log('FAILED...', error);
       formStatus.textContent = 'Oops! Something went wrong. Please reach out via email directly.';
       formStatus.style.color = 'var(--error)';
       
       // Reset UI
       submitText.style.display = 'inline-block';
       submitIcon.style.display = 'inline-block';
       submitLoading.style.display = 'none';
       submitBtn.disabled = false;
    });
});
