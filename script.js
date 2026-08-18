const menuToggle = document.querySelector('.menu-toggle');
const mainNav = document.querySelector('.main-nav');
const navLinks = document.querySelectorAll('.main-nav a');
const langOptions = document.querySelectorAll('.lang-option');
const sections = document.querySelectorAll('main section[id]');

const LANG_STORAGE_KEY = 'uxpa-lang';

function getTranslation(lang, path) {
  return path.split('.').reduce((value, key) => (value ? value[key] : undefined), translations[lang]);
}

function applyLanguage(lang) {
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const value = getTranslation(lang, el.getAttribute('data-i18n'));
    if (value !== undefined) el.textContent = value;
  });
  document.title = translations[lang].title;
  document.documentElement.setAttribute('lang', lang);
  langOptions.forEach(link => {
    link.classList.toggle('active', link.dataset.lang === lang);
  });
}

function setLanguage(lang) {
  applyLanguage(lang);
  localStorage.setItem(LANG_STORAGE_KEY, lang);
  const url = new URL(window.location.href);
  url.searchParams.set('lang', lang);
  history.replaceState(null, '', url);
}

function initLanguage() {
  const params = new URLSearchParams(window.location.search);
  const paramLang = params.get('lang');
  const storedLang = localStorage.getItem(LANG_STORAGE_KEY);
  const lang = ['es', 'en'].includes(paramLang)
    ? paramLang
    : ['es', 'en'].includes(storedLang)
      ? storedLang
      : 'es';
  setLanguage(lang);
}

langOptions.forEach(link => {
  link.addEventListener('click', event => {
    event.preventDefault();
    setLanguage(link.dataset.lang);
  });
});

initLanguage();

function closeMenu() {
  if (!mainNav || !menuToggle) return;
  mainNav.classList.remove('open');
  menuToggle.setAttribute('aria-expanded', 'false');
}

if (menuToggle && mainNav) {
  menuToggle.addEventListener('click', () => {
    const isOpen = mainNav.classList.toggle('open');
    menuToggle.setAttribute('aria-expanded', String(isOpen));
  });
}

navLinks.forEach(link => {
  link.addEventListener('click', event => {
    const href = link.getAttribute('href');
    if (!href || !href.startsWith('#')) return;

    event.preventDefault();
    const targetId = href.slice(1);
    const target = document.getElementById(targetId);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      closeMenu();
    }
  });
});

document.addEventListener('click', event => {
  if (!menuToggle || !mainNav) return;
  if (!mainNav.contains(event.target) && !menuToggle.contains(event.target)) {
    closeMenu();
  }
});

document.addEventListener('keydown', event => {
  if (event.key === 'Escape') {
    closeMenu();
  }
});

window.addEventListener('resize', () => {
  if (window.innerWidth > 640) {
    closeMenu();
  }
});

window.addEventListener('scroll', () => {
  const scrollPosition = window.scrollY + 120;
  navLinks.forEach(link => {
    const section = document.querySelector(link.getAttribute('href'));
    if (!section) return;

    const sectionTop = section.offsetTop;
    const sectionBottom = sectionTop + section.offsetHeight;
    if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });
});
