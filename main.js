/* =============================================
   Pavithran M – Portfolio Scripts
   ============================================= */

(function () {
  'use strict';

  /* ---------- Dark Mode Toggle ---------- */
  const themeToggle = document.getElementById('themeToggle');
  const root = document.documentElement;
  const savedTheme = localStorage.getItem('theme');

  // Apply saved preference on load (default is dark via CSS)
  if (savedTheme) {
    root.setAttribute('data-theme', savedTheme);
  }

  themeToggle.addEventListener('click', () => {
    const currentTheme = root.getAttribute('data-theme');
    // Determine if currently dark: explicit 'dark', no attribute (CSS default is dark),
    // or system dark preference without explicit light
    const isDark =
      currentTheme === 'dark' ||
      (!currentTheme &&
        !window.matchMedia('(prefers-color-scheme: light)').matches);

    const next = isDark ? 'light' : 'dark';
    root.setAttribute('data-theme', next);
    localStorage.setItem('theme', next);
  });

  /* ---------- Mobile Navigation ---------- */
  const navHamburger = document.getElementById('navHamburger');
  const navLinks = document.getElementById('navLinks');

  navHamburger.addEventListener('click', () => {
    navLinks.classList.toggle('open');
    const isOpen = navLinks.classList.contains('open');
    navHamburger.setAttribute('aria-expanded', isOpen);
  });

  // Close mobile nav when a link is clicked
  navLinks.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('open');
      navHamburger.setAttribute('aria-expanded', 'false');
    });
  });

  /* ---------- Active Nav Link on Scroll ---------- */
  const sections = document.querySelectorAll('section[id]');
  const navAnchors = document.querySelectorAll('.nav-links a[href^="#"]');

  const navObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          navAnchors.forEach((a) => a.classList.remove('active'));
          const active = document.querySelector(
            `.nav-links a[href="#${entry.target.id}"]`
          );
          if (active) active.classList.add('active');
        }
      });
    },
    { rootMargin: '-40% 0px -55% 0px' }
  );

  sections.forEach((s) => navObserver.observe(s));

  /* ---------- Scroll Fade-in Animations ---------- */
  const fadeEls = document.querySelectorAll('.fade-up');

  const fadeObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          fadeObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );

  fadeEls.forEach((el) => fadeObserver.observe(el));

  /* ---------- Back to Top Button + Navbar Shadow ---------- */
  const backToTop = document.getElementById('backToTop');
  const navbar = document.getElementById('navbar');

  window.addEventListener(
    'scroll',
    () => {
      const y = window.scrollY;
      backToTop.classList.toggle('show', y > 300);
      navbar.classList.toggle('scrolled', y > 10);
    },
    { passive: true }
  );

  backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
})();
