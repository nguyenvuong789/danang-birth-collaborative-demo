const menuButton = document.querySelector('.menu-toggle');
const navigation = document.querySelector('.site-nav');
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
  if (!menuButton || !navigation) return;
  const openOnMobile = mobileMenu.matches && isOpen;
  menuButton.setAttribute('aria-expanded', String(openOnMobile));
  navigation.classList.toggle('open', openOnMobile);
  navigation.toggleAttribute('inert', mobileMenu.matches && !openOnMobile);
  document.body.classList.toggle('menu-open', openOnMobile);
  updateMenuLabel();
  if (returnFocus) menuButton.focus();
};

menuButton?.addEventListener('click', () => {
  setMenuOpen(menuButton.getAttribute('aria-expanded') !== 'true');
});

navigation?.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => setMenuOpen(false));
});

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
      entry.target.classList.add('is-visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach((element) => observer.observe(element));

document.querySelector('#info-form')?.addEventListener('submit', (event) => {
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

const guideModal = document.querySelector('#guide-modal');
const guidePanel = guideModal?.querySelector('.lead-modal-panel');
const guideForm = guideModal?.querySelector('.lead-modal-form');
let guideReturnFocus = null;

const guideFocusable = () => guideModal ? [...guideModal.querySelectorAll(
  'button:not([disabled]), input:not([type="hidden"]):not([disabled]), a[href], select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'
)].filter((element) => !element.hidden && element.offsetParent !== null) : [];

const closeGuideModal = () => {
  if (!guideModal || guideModal.hidden) return;
  guideModal.hidden = true;
  document.body.classList.remove('lead-modal-open');
  document.querySelectorAll('body > header, body > main, body > footer, body > .skip-link').forEach((element) => element.removeAttribute('inert'));
  guideReturnFocus?.focus();
};

const openGuideModal = (trigger) => {
  if (!guideModal) return;
  guideReturnFocus = trigger;
  guideModal.hidden = false;
  document.body.classList.add('lead-modal-open');
  document.querySelectorAll('body > header, body > main, body > footer, body > .skip-link').forEach((element) => element.setAttribute('inert', ''));
  requestAnimationFrame(() => guidePanel?.focus());
};

document.querySelectorAll('[data-guide-trigger]').forEach((trigger) => {
  trigger.addEventListener('click', (event) => {
    event.preventDefault();
    openGuideModal(trigger);
  });
});

guideModal?.querySelectorAll('[data-guide-close]').forEach((control) => {
  control.addEventListener('click', closeGuideModal);
});

if (window.location.hash === '#guide-modal') {
  openGuideModal(document.querySelector('[data-guide-trigger]'));
}

guideModal?.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') {
    event.preventDefault();
    closeGuideModal();
    return;
  }
  if (event.key !== 'Tab') return;
  const focusable = guideFocusable();
  if (!focusable.length) return;
  const first = focusable[0];
  const last = focusable[focusable.length - 1];
  if (event.shiftKey && document.activeElement === first) {
    event.preventDefault();
    last.focus();
  } else if (!event.shiftKey && document.activeElement === last) {
    event.preventDefault();
    first.focus();
  }
});

guideForm?.addEventListener('submit', () => {
  const status = guideForm.querySelector('.lead-modal-status');
  const submit = guideForm.querySelector('button[type="submit"]');
  if (status) status.textContent = document.documentElement.lang === 'vi' ? 'Đang gửi yêu cầu…' : 'Sending your request…';
  if (submit) submit.setAttribute('aria-disabled', 'true');
});

const year = document.querySelector('#year');
if (year) year.textContent = new Date().getFullYear();
