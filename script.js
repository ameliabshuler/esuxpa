const navLinks = document.querySelectorAll('.main-nav a');

navLinks.forEach(link => {
  link.addEventListener('click', event => {
    event.preventDefault();
    const targetId = link.getAttribute('href').slice(1);
    const target = document.getElementById(targetId);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
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
