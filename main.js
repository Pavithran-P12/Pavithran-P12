/* Small, progressive enhancements. The content works without this file. */
(() => {
  'use strict';

  const root = document.documentElement;
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const themeToggle = document.querySelector('.theme-toggle');
  const colorPreference = window.matchMedia('(prefers-color-scheme: dark)');
  let savedTheme;
  try { savedTheme = localStorage.getItem('theme'); } catch { /* Storage can be unavailable. */ }

  const applyTheme = (theme) => {
    root.dataset.theme = theme;
    if (themeToggle) themeToggle.setAttribute('aria-label', `Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`);
    document.querySelector('meta[name="theme-color"]')?.setAttribute('content', theme === 'dark' ? '#1c201d' : '#f6f4ee');
  };
  applyTheme(savedTheme === 'light' || savedTheme === 'dark' ? savedTheme : colorPreference.matches ? 'dark' : 'light');
  if (themeToggle) {
    themeToggle.hidden = false;
    themeToggle.addEventListener('click', () => {
      savedTheme = root.dataset.theme === 'dark' ? 'light' : 'dark';
      applyTheme(savedTheme);
      try { localStorage.setItem('theme', savedTheme); } catch { /* The toggle still works. */ }
    });
  }
  colorPreference.addEventListener('change', (event) => {
    if (savedTheme !== 'dark' && savedTheme !== 'light') applyTheme(event.matches ? 'dark' : 'light');
  });

  const menuToggle = document.querySelector('.menu-toggle');
  const navigation = document.querySelector('.site-nav');
  const mobile = window.matchMedia('(max-width: 480px)');
  if (menuToggle && navigation) {
    root.classList.add('js-nav');
    menuToggle.hidden = false;
    const closeMenu = (restoreFocus = false) => {
      navigation.classList.remove('is-open');
      menuToggle.setAttribute('aria-expanded', 'false');
      menuToggle.querySelector('.menu-label').textContent = 'Menu';
      if (restoreFocus) menuToggle.focus();
    };
    menuToggle.addEventListener('click', () => {
      const open = menuToggle.getAttribute('aria-expanded') !== 'true';
      navigation.classList.toggle('is-open', open);
      menuToggle.setAttribute('aria-expanded', String(open));
      menuToggle.querySelector('.menu-label').textContent = open ? 'Close' : 'Menu';
    });
    navigation.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => {
        closeMenu();
        if (link.hash && link.pathname === location.pathname) {
          const target = document.getElementById(link.hash.slice(1));
          if (target && mobile.matches) {
            target.setAttribute('tabindex', '-1');
            target.focus({ preventScroll: true });
          }
        }
      });
    });
    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape' && menuToggle.getAttribute('aria-expanded') === 'true') closeMenu(true);
    });
    document.addEventListener('click', (event) => {
      if (!event.target.closest('.site-header') && menuToggle.getAttribute('aria-expanded') === 'true') closeMenu();
    });
    document.addEventListener('focusin', (event) => {
      if (!event.target.closest('.site-header')) closeMenu();
    });
    mobile.addEventListener('change', () => closeMenu());
  }

  const reveals = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && !reducedMotion.matches) {
    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.remove('is-pending');
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.08, rootMargin: '0px 0px 25px 0px' });
    reveals.forEach((element) => {
      // Never obscure something the visitor is already looking at.
      if (element.getBoundingClientRect().top > window.innerHeight) {
        element.classList.add('is-pending');
        revealObserver.observe(element);
      }
    });
    reducedMotion.addEventListener('change', (event) => {
      if (event.matches) {
        revealObserver.disconnect();
        reveals.forEach((element) => element.classList.remove('is-pending'));
      }
    });
    document.addEventListener('focusin', (event) => {
      event.target.closest('.is-pending')?.classList.remove('is-pending');
    });
  }

  const sectionLinks = [...document.querySelectorAll('.site-nav a[data-section]')];
  if ('IntersectionObserver' in window && sectionLinks.length) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          sectionLinks.forEach((link) => {
            if (link.dataset.section === entry.target.id) link.setAttribute('aria-current', 'location');
            else link.removeAttribute('aria-current');
          });
        }
      });
    }, { rootMargin: '-15% 0px -65% 0px' });
    sectionLinks.forEach((link) => {
      const section = document.getElementById(link.dataset.section);
      if (section) observer.observe(section);
    });
    const hero = document.querySelector('.hero');
    if (hero) observer.observe(hero);
  }

  const filters = document.querySelector('.project-filters');
  const cases = [...document.querySelectorAll('.case-study')];
  const count = document.querySelector('.filter-count');
  if (filters && cases.length) {
    filters.hidden = false;
    const showCategory = (category) => {
      let visible = 0;
      cases.forEach((project) => {
        project.hidden = category !== 'all' && project.dataset.category !== category;
        if (!project.hidden) visible += 1;
      });
      filters.querySelectorAll('button').forEach((button) => button.setAttribute('aria-pressed', String(button.dataset.filter === category)));
      if (count) count.textContent = `${String(visible).padStart(2, '0')} projects / ${category === 'all' ? 'the whole collection' : category}`;
    };
    filters.addEventListener('click', (event) => {
      const button = event.target.closest('button[data-filter]');
      if (button) showCategory(button.dataset.filter);
    });
    window.addEventListener('hashchange', () => {
      const destination = cases.find((project) => `#${project.id}` === location.hash);
      if (destination?.hidden) {
        showCategory('all');
        destination.scrollIntoView({ behavior: reducedMotion.matches ? 'instant' : 'smooth' });
      }
    });
    showCategory('all');
  }

  document.querySelectorAll('[data-year]').forEach((element) => { element.textContent = new Date().getFullYear(); });
})();
