document.addEventListener('DOMContentLoaded', () => {
  const navbar = document.getElementById('navbar');
  const hamburger = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobileMenu');

  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 20);
  });

  hamburger.addEventListener('click', () => {
    mobileMenu.classList.toggle('open');
    const spans = hamburger.querySelectorAll('span');
    if (mobileMenu.classList.contains('open')) {
      spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
      spans[1].style.opacity = '0';
      spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
    } else {
      spans[0].style.transform = '';
      spans[1].style.opacity = '';
      spans[2].style.transform = '';
    }
  });

  mobileMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      mobileMenu.classList.remove('open');
      const spans = hamburger.querySelectorAll('span');
      spans[0].style.transform = '';
      spans[1].style.opacity = '';
      spans[2].style.transform = '';
    });
  });

  // Scroll animations
  const animEls = document.querySelectorAll('[data-anim]');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const siblings = entry.target.parentElement.querySelectorAll('[data-anim]');
        let delay = 0;
        siblings.forEach((sib, idx) => {
          if (sib === entry.target) delay = idx * 80;
        });
        setTimeout(() => entry.target.classList.add('visible'), delay);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
  animEls.forEach(el => observer.observe(el));

  // Active nav link highlight
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-links a');
  window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(sec => {
      if (window.scrollY >= sec.offsetTop - 120) current = sec.getAttribute('id');
    });
    navLinks.forEach(a => {
      a.style.color = '';
      if (a.getAttribute('href') === `#${current}`) a.style.color = '#ffeb3b';
    });
  });

  // Trust strip auto-scroll
  const trustLogos = document.querySelector('.trust-logos');
  if (trustLogos) {
    Array.from(trustLogos.children).forEach(item => trustLogos.appendChild(item.cloneNode(true)));
    trustLogos.style.display = 'flex';
    trustLogos.style.animation = 'trustScroll 18s linear infinite';
    trustLogos.style.overflow = 'visible';
    trustLogos.parentElement.style.overflow = 'hidden';
  }
  const s = document.createElement('style');
  s.textContent = `
    @keyframes trustScroll{0%{transform:translateX(0)}100%{transform:translateX(-50%)}}
    .trust-logos{white-space:nowrap;flex-wrap:nowrap!important}
    .trust-logos:hover{animation-play-state:paused}
    @keyframes ripple{from{transform:scale(0);opacity:1}to{transform:scale(2.5);opacity:0}}
  `;
  document.head.appendChild(s);

  // Ripple effect on buttons
  document.querySelectorAll('.btn-primary-lg,.btn-primary-nav,.btn-primary-card').forEach(btn => {
    btn.addEventListener('click', function (e) {
      const ripple = document.createElement('span');
      const rect = this.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height);
      ripple.style.cssText = `position:absolute;border-radius:50%;background:rgba(255,255,255,0.3);width:${size}px;height:${size}px;left:${e.clientX - rect.left - size / 2}px;top:${e.clientY - rect.top - size / 2}px;animation:ripple .55s linear;pointer-events:none;`;
      this.style.position = 'relative';
      this.style.overflow = 'hidden';
      this.appendChild(ripple);
      setTimeout(() => ripple.remove(), 600);
    });
  });

  // Login gate for feature action cards
  document.querySelectorAll('.action-card').forEach(card => {
    card.addEventListener('click', function (e) {
      const user = localStorage.getItem('udhyog_user');
      if (!user) {
        e.preventDefault();
        alert('Please login first to use this feature! 🔒');
        window.location.href = 'login/loginnew.html';
      }
    });
  });
});
