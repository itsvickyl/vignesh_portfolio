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

window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;
    if (pageYOffset >= (sectionTop - 200)) {
      current = section.getAttribute('id');
    }
  });

  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('data-section') === current) {
      link.classList.add('active');
    }
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
emailjs.init("ZayugR0yyiS1byIUK");

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
  emailjs.send('service_df1yehl', 'template_hkuxpys', templateParams)
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
