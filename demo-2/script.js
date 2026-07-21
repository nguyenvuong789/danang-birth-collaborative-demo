const menuButton = document.querySelector('.menu-button');
const nav = document.querySelector('#nav');
const mobileMenu = window.matchMedia('(max-width: 900px)');

const updateMenuLabel = () => {
  if (!menuButton) return;
  const isOpen = menuButton.getAttribute('aria-expanded') === 'true';
  const isVietnamese = document.documentElement.lang === 'vi';
  menuButton.setAttribute('aria-label', isVietnamese
    ? (isOpen ? 'Đóng menu' : 'Mở menu')
    : (isOpen ? 'Close menu' : 'Open menu'));
};

const setMenuOpen = (isOpen, returnFocus = false) => {
  if (!menuButton || !nav) return;
  const openOnMobile = mobileMenu.matches && isOpen;
  menuButton.setAttribute('aria-expanded', String(openOnMobile));
  nav.classList.toggle('open', openOnMobile);
  nav.toggleAttribute('inert', mobileMenu.matches && !openOnMobile);
  document.body.classList.toggle('menu-open', openOnMobile);
  updateMenuLabel();
  if (returnFocus) menuButton.focus();
};

menuButton?.addEventListener('click', () => {
  setMenuOpen(menuButton.getAttribute('aria-expanded') !== 'true');
});

nav?.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => {
  setMenuOpen(false);
}));

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && menuButton?.getAttribute('aria-expanded') === 'true') {
    setMenuOpen(false, true);
  }
});

document.addEventListener('click', (event) => {
  if (menuButton?.getAttribute('aria-expanded') === 'true' && !event.target.closest('.site-header')) {
    setMenuOpen(false);
  }
});

mobileMenu.addEventListener('change', () => setMenuOpen(false));
document.addEventListener('languagechange', updateMenuLabel);
setMenuOpen(false);

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
  const form = event.currentTarget;
  const name = form.querySelector('#name').value.trim();
  const email = form.querySelector('#email').value.trim();
  const stage = form.querySelector('#stage').value;
  const message = form.querySelector('#message').value.trim();
  const isVietnamese = document.documentElement.lang === 'vi';
  const subject = encodeURIComponent(isVietnamese ? `Yêu cầu tư vấn từ ${name}` : `Website inquiry from ${name}`);
  const body = encodeURIComponent(isVietnamese
    ? `Họ và tên: ${name}\nEmail: ${email}\nNhu cầu hỗ trợ: ${stage}\n\n${message}`
    : `Name: ${name}\nEmail: ${email}\nArea of support: ${stage}\n\n${message}`);
  const status = form.querySelector('.form-message');
  if (status) {
    status.dataset.state = 'opening';
    status.textContent = isVietnamese
      ? 'Đang mở ứng dụng email. Nếu không có gì xảy ra, hãy gửi email trực tiếp cho chúng tôi.'
      : 'Opening your email app. If nothing happens, email us directly.';
  }
  requestAnimationFrame(() => {
    window.location.href = `mailto:danangbirthcollaborative@gmail.com?subject=${subject}&body=${body}`;
  });
});

document.addEventListener('languagechange', () => {
  document.querySelectorAll('.form-message[data-state="opening"]').forEach((status) => {
    status.textContent = document.documentElement.lang === 'vi'
      ? 'Đang mở ứng dụng email. Nếu không có gì xảy ra, hãy gửi email trực tiếp cho chúng tôi.'
      : 'Opening your email app. If nothing happens, email us directly.';
  });
});

const year = document.querySelector('#year');
if (year) year.textContent = new Date().getFullYear();
