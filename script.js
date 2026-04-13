/* ============================================================
   NAGAWA ESTHER PORTFOLIO — SCRIPT.JS
   ============================================================ */

'use strict';

/* ── Navbar scroll effect ── */
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 40);
}, { passive: true });

/* ── Active nav link on scroll ── */
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');

function updateActiveNav() {
  let current = '';
  sections.forEach(sec => {
    const top = sec.offsetTop - 120;
    if (window.scrollY >= top) current = sec.getAttribute('id');
  });
  navLinks.forEach(link => {
    link.classList.toggle('active', link.getAttribute('href') === `#${current}`);
  });
}
window.addEventListener('scroll', updateActiveNav, { passive: true });

/* ── Mobile hamburger menu ── */
const hamburgerBtn = document.getElementById('hamburger-btn');
const navMenu      = document.getElementById('nav-menu');

hamburgerBtn.addEventListener('click', () => {
  const isOpen = navMenu.classList.toggle('open');
  hamburgerBtn.classList.toggle('open', isOpen);
  hamburgerBtn.setAttribute('aria-expanded', String(isOpen));
  document.body.style.overflow = isOpen ? 'hidden' : '';
});

// Close menu when a link is clicked
navMenu.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navMenu.classList.remove('open');
    hamburgerBtn.classList.remove('open');
    hamburgerBtn.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  });
});

/* ── Typing animation ── */
const typingTarget = document.getElementById('typing-target');
const phrases = [
  'full-stack web apps.',
  'mobile experiences.',
  'insurance platforms.',
  'healthcare systems.',
  'clean, scalable APIs.',
  'things that matter.',
];
let phraseIndex = 0;
let charIndex   = 0;
let isDeleting  = false;
let typingTimer;

function type() {
  const phrase = phrases[phraseIndex];
  if (!isDeleting) {
    typingTarget.textContent = phrase.slice(0, ++charIndex);
    if (charIndex === phrase.length) {
      isDeleting = true;
      typingTimer = setTimeout(type, 2200);
      return;
    }
  } else {
    typingTarget.textContent = phrase.slice(0, --charIndex);
    if (charIndex === 0) {
      isDeleting = false;
      phraseIndex = (phraseIndex + 1) % phrases.length;
      typingTimer = setTimeout(type, 350);
      return;
    }
  }
  typingTimer = setTimeout(type, isDeleting ? 55 : 80);
}
setTimeout(type, 900);

/* ── Animated counter for hero stats ── */
const statNums = document.querySelectorAll('.stat-num[data-target]');

function animateCounter(el) {
  const target = parseInt(el.dataset.target, 10);
  const suffix = el.dataset.suffix || '+';
  const duration = 1600;
  const step     = duration / target;
  let current    = 0;

  const timer = setInterval(() => {
    current++;
    el.textContent = current + (current >= target ? suffix : '');
    if (current >= target) clearInterval(timer);
  }, step);
}

/* ── Intersection Observer for reveal animations ── */
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.13, rootMargin: '0px 0px -48px 0px' }
);

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

/* ── Animate counters when hero stats enter viewport ── */
const statsObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        statNums.forEach(el => animateCounter(el));
        statsObserver.disconnect();
      }
    });
  },
  { threshold: 0.5 }
);
const heroStats = document.querySelector('.hero-stats');
if (heroStats) statsObserver.observe(heroStats);

/* ── Smooth scroll for anchor links ── */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', e => {
    const target = document.querySelector(anchor.getAttribute('href'));
    if (!target) return;
    e.preventDefault();
    const offset = 80;
    const top = target.getBoundingClientRect().top + window.scrollY - offset;
    window.scrollTo({ top, behavior: 'smooth' });
  });
});


/* ── Parallax subtle effect on hero blobs (mouse move) ── */
document.addEventListener('mousemove', e => {
  const x = (e.clientX / window.innerWidth  - 0.5) * 20;
  const y = (e.clientY / window.innerHeight - 0.5) * 20;
  document.querySelectorAll('.bg-blob').forEach((blob, i) => {
    const factor = (i + 1) * 0.35;
    blob.style.transform = `translate(${x * factor}px, ${y * factor}px)`;
  });
}, { passive: true });

/* ── Skill tag hover ripple ── */
document.querySelectorAll('.skill-tag').forEach(tag => {
  tag.addEventListener('mouseenter', function () {
    this.style.transform = 'scale(1.08)';
  });
  tag.addEventListener('mouseleave', function () {
    this.style.transform = '';
  });
});

/* ── Add transition to skill tags ── */
document.querySelectorAll('.skill-tag').forEach(tag => {
  tag.style.transition = 'transform 0.2s ease, background 0.3s ease, border-color 0.3s ease';
});

/* ── Staggered project card entrance ── */
const projectCards = document.querySelectorAll('.project-card');
const cardObserver = new IntersectionObserver(
  entries => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.style.opacity  = '1';
          entry.target.style.transform = 'translateY(0)';
        }, i * 100);
        cardObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.1 }
);

projectCards.forEach(card => {
  cardObserver.observe(card);
});
