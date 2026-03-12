/* ===== NAVBAR SCROLL ===== */
const navbar = document.querySelector('.navbar');
if (navbar) {
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 10);
  });
}

/* ===== HAMBURGER MENU ===== */
const hamburger = document.querySelector('.hamburger');
const mobileMenu = document.querySelector('.mobile-menu');
if (hamburger && mobileMenu) {
  hamburger.addEventListener('click', () => {
    mobileMenu.classList.toggle('open');
    const isOpen = mobileMenu.classList.contains('open');
    hamburger.querySelectorAll('span')[0].style.transform = isOpen ? 'rotate(45deg) translate(5px, 5px)' : '';
    hamburger.querySelectorAll('span')[1].style.opacity = isOpen ? '0' : '1';
    hamburger.querySelectorAll('span')[2].style.transform = isOpen ? 'rotate(-45deg) translate(5px, -5px)' : '';
  });
  document.addEventListener('click', (e) => {
    if (!hamburger.contains(e.target) && !mobileMenu.contains(e.target)) {
      mobileMenu.classList.remove('open');
    }
  });
}

/* ===== INTERSECTION OBSERVER (animations) ===== */
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      // Animate skill bars when visible
      const fills = entry.target.querySelectorAll('.skill-fill, .hero-skill-fill, .comp-item-fill');
      fills.forEach(fill => {
        const pct = fill.dataset.pct;
        if (pct) fill.style.width = pct + '%';
      });
    }
  });
}, { threshold: 0.15 });

document.querySelectorAll('.fade-in, .slide-in-left, .timeline-item').forEach(el => {
  observer.observe(el);
});

/* ===== SKILL BARS ON PAGE LOAD (for hero) ===== */
window.addEventListener('load', () => {
  setTimeout(() => {
    document.querySelectorAll('.hero-skill-fill').forEach(fill => {
      const pct = fill.dataset.pct;
      if (pct) fill.style.width = pct + '%';
    });
  }, 500);

  // Animate any skill fills already in view
  document.querySelectorAll('.skill-fill, .comp-item-fill').forEach(fill => {
    const rect = fill.getBoundingClientRect();
    if (rect.top < window.innerHeight) {
      const pct = fill.dataset.pct;
      if (pct) setTimeout(() => { fill.style.width = pct + '%'; }, 300);
    }
  });
});

/* ===== TIMELINE TOGGLE ===== */
document.querySelectorAll('.timeline-toggle').forEach(btn => {
  btn.addEventListener('click', () => {
    const details = btn.nextElementSibling;
    if (details && details.classList.contains('timeline-details')) {
      details.classList.toggle('open');
      btn.textContent = details.classList.contains('open')
        ? 'Voir moins ↑'
        : btn.dataset.label || 'Voir les détails →';
    }
  });
});

/* ===== ACTIVE NAV LINK ===== */
(function setActiveNav() {
  const path = window.location.pathname;
  document.querySelectorAll('.nav-link').forEach(link => {
    const href = link.getAttribute('href');
    if (href && path.includes(href) && href !== '#' && href.length > 1) {
      link.classList.add('active');
    }
  });
})();

/* ===== SMOOTH SCROLL ===== */
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const target = document.querySelector(a.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

/* ===== CONTACT FORM ===== */
const contactForm = document.getElementById('contactForm');
if (contactForm) {
  contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    const btn = this.querySelector('button[type="submit"]');
    const data = new FormData(this);
    btn.textContent = 'Envoi en cours…';
    btn.disabled = true;
    fetch(this.action, {
      method: 'POST',
      body: data,
      headers: { 'Accept': 'application/json' }
    }).then(res => {
      if (res.ok) {
        btn.textContent = 'Message envoyé !';
        btn.style.background = '#10B981';
        contactForm.reset();
        setTimeout(() => {
          btn.textContent = 'Envoyer le message →';
          btn.style.background = '';
          btn.disabled = false;
        }, 4000);
      } else {
        btn.textContent = 'Erreur — réessayez';
        btn.style.background = '#EF4444';
        btn.disabled = false;
      }
    }).catch(() => {
      btn.textContent = 'Erreur — réessayez';
      btn.style.background = '#EF4444';
      btn.disabled = false;
    });
  });
}
