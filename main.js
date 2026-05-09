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

// --- Navbar scroll shadow (Zero-Scroll-Listener Architecture) ---
const topSentinel = document.getElementById('top-sentinel');

const navbarObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });
}, { threshold: 0 });

if (topSentinel) {
  navbarObserver.observe(topSentinel);
}

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

// --- Magnetic Buttons ---
const magneticBtns = document.querySelectorAll('.magnetic-btn');

magneticBtns.forEach(btn => {
  btn.addEventListener('mousemove', (e) => {
    const rect = btn.getBoundingClientRect();

    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    btn.style.transform = `translate(${x * 0.3}px, ${y * 0.5}px)`;
  });

  btn.addEventListener('mouseleave', () => {
    btn.style.transform = `translate(0, 0)`;
  });
});

// --- Hero Mouse Parallax ---
const hero = document.getElementById('hero');
const heroBlobs = document.querySelectorAll('.hero-blob');
const heroImage = document.querySelector('.hero-image');

if (hero) {
  hero.addEventListener('mousemove', (e) => {
    const { clientX, clientY } = e;

    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;

    const moveX = (clientX - centerX) / 20;
    const moveY = (clientY - centerY) / 20;

    heroBlobs.forEach((blob, index) => {
      const depth = (index + 1) * 0.5;

      blob.style.transform =
        `translate(${moveX * depth}px, ${moveY * depth}px)`;
    });

    if (heroImage) {
      heroImage.style.transform =
        `translateY(-50%) rotate(3deg) translate(${moveX * 0.2}px, ${moveY * 0.2}px)`;
    }
  });
}

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

    card.style.transform =
      `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
  });

  card.addEventListener('mouseleave', () => {
    card.style.transform =
      `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
  });
});

// --- Scroll Progress Bar (rAF for Performance) ---
const scrollProgress = document.getElementById('scrollProgress');

let ticking = false;

const updateScrollProgress = () => {
  const windowHeight = window.innerHeight;
  const documentHeight = document.documentElement.scrollHeight;
  const scrollTop =
    window.pageYOffset || document.documentElement.scrollTop;

  const scrollPercentage =
    (scrollTop / (documentHeight - windowHeight)) * 100;

  if (scrollProgress) {
    scrollProgress.style.width = `${scrollPercentage}%`;
  }

  ticking = false;
};

window.addEventListener('scroll', () => {
  if (!ticking) {
    requestAnimationFrame(updateScrollProgress);
    ticking = true;
  }
});

// --- Text Scramble Effect ---
class TextScramble {
  constructor(el) {
    this.el = el;
    this.chars = '!<>-_\\/[]{}—=+*^?#________';
    this.update = this.update.bind(this);
  }

  setText(newText) {
    const oldText = this.el.innerText;
    const length = Math.max(oldText.length, newText.length);

    const promise = new Promise((resolve) => {
      this.resolve = resolve;
    });

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
          char =
            this.chars[
              Math.floor(Math.random() * this.chars.length)
            ];

          this.queue[i].char = char;
        }

        output += `<span class="dud">${char}</span>`;
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
}

const heroTitle = document.getElementById('heroTitle');

if (heroTitle) {
  const fx = new TextScramble(heroTitle);

  fx.setText(heroTitle.innerText);
}

const projectNames = document.querySelectorAll('.project-name');

projectNames.forEach(name => {
  const fx = new TextScramble(name);
  const originalText = name.innerText;

  name.addEventListener('mouseenter', () => {
    fx.setText(originalText);
  });
});

// --- Scroll Reveal Animations ---
const revealElements = document.querySelectorAll(
  '.reveal, .reveal-left, .reveal-right'
);

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
emailjs.init(import.meta.env.VITE_EMAILJS_PUBLIC_KEY);

const contactForm = document.getElementById('contactForm');
const submitBtn = document.getElementById('submitBtn');

const submitText = submitBtn.querySelector('.submit-text');
const submitLoading = submitBtn.querySelector('.submit-loading');
const submitIcon = submitBtn.querySelector('.submit-icon');

const formStatus = document.getElementById('formStatus');

contactForm.addEventListener('submit', (e) => {
  e.preventDefault();

  // Loading UI
  submitText.style.display = 'none';
  submitIcon.style.display = 'none';
  submitLoading.style.display = 'inline-block';

  submitBtn.disabled = true;

  formStatus.textContent = '';
  formStatus.style.color = '';

  // Form data
  const templateParams = {
    user_name: document.getElementById('contactName').value,
    user_email: document.getElementById('contactEmail').value,
    message: document.getElementById('contactMessage').value,
  };

  // Send Email
  emailjs.send(
    import.meta.env.VITE_EMAILJS_SERVICE_ID,
    import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
    templateParams
  )
    .then((response) => {
      console.log('SUCCESS!', response.status, response.text);

      formStatus.textContent =
        'Message sent successfully! Let’s build something brutally beautiful.';

      formStatus.style.color = 'var(--primary)';

      contactForm.reset();

      setTimeout(() => {
        submitText.style.display = 'inline-block';
        submitIcon.style.display = 'inline-block';
        submitLoading.style.display = 'none';

        submitBtn.disabled = false;

        formStatus.textContent = '';
      }, 5000);
    })
    .catch((error) => {
      console.log('FAILED...', error);

      formStatus.textContent =
        'Oops! Something went wrong. Please reach out via email directly.';

      formStatus.style.color = 'var(--error)';

      submitText.style.display = 'inline-block';
      submitIcon.style.display = 'inline-block';
      submitLoading.style.display = 'none';

      submitBtn.disabled = false;
    });
});