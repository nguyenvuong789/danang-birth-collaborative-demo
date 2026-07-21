const menuButton = document.querySelector('.menu-button');
const nav = document.querySelector('#nav');

menuButton?.addEventListener('click', () => {
  const open = menuButton.getAttribute('aria-expanded') === 'true';
  menuButton.setAttribute('aria-expanded', String(!open));
  nav.classList.toggle('open', !open);
});

nav?.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => {
  menuButton.setAttribute('aria-expanded', 'false');
  nav.classList.remove('open');
}));

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.reveal').forEach((item) => observer.observe(item));

document.querySelector('#contact-form')?.addEventListener('submit', (event) => {
  event.preventDefault();
  const name = document.querySelector('#name').value.trim();
  const email = document.querySelector('#email').value.trim();
  const stage = document.querySelector('#stage').value;
  const message = document.querySelector('#message').value.trim();
  const isVietnamese = document.documentElement.lang === 'vi';
  const subject = encodeURIComponent(isVietnamese ? `Yêu cầu tư vấn từ ${name}` : `Website inquiry from ${name}`);
  const body = encodeURIComponent(isVietnamese
    ? `Họ và tên: ${name}\nEmail: ${email}\nNội dung hỗ trợ: ${stage}\n\n${message}`
    : `Name: ${name}\nEmail: ${email}\nArea of support: ${stage}\n\n${message}`);
  window.location.href = `mailto:danangbirthcollaborative@gmail.com?subject=${subject}&body=${body}`;
});

const year = document.querySelector('#year');
if (year) year.textContent = new Date().getFullYear();
