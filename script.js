const softDemo = Boolean(document.querySelector(".menu-button"));
const menuButton = document.querySelector(".menu-toggle, .menu-button");
const navigation = document.querySelector(".site-nav, #nav");
const mobileMenu = window.matchMedia("(max-width: 900px)");

const messages = {
  en: {
    openMenu: "Open menu",
    closeMenu: "Close menu",
    openingEmail:
      "Opening your email app. If nothing happens, email us directly.",
    sendingGuide: "Sending your request…",
  },
  vi: {
    openMenu: "Mở menu",
    closeMenu: "Đóng menu",
    openingEmail:
      "Đang mở ứng dụng email. Nếu không có gì xảy ra, hãy gửi email trực tiếp cho chúng tôi.",
    sendingGuide: "Đang gửi yêu cầu…",
  },
};

const getMessage = (key) =>
  messages[document.documentElement.lang === "vi" ? "vi" : "en"][key];
const menuIsOpen = () => menuButton?.getAttribute("aria-expanded") === "true";

const updateMenuLabel = () => {
  if (!menuButton) return;
  menuButton.setAttribute(
    "aria-label",
    getMessage(menuIsOpen() ? "closeMenu" : "openMenu"),
  );
};

const setMenuOpen = (isOpen, returnFocus = false) => {
  if (!menuButton || !navigation) return;
  const openOnMobile = mobileMenu.matches && isOpen;

  menuButton.setAttribute("aria-expanded", String(openOnMobile));
  navigation.classList.toggle("open", openOnMobile);
  navigation.toggleAttribute("inert", mobileMenu.matches && !openOnMobile);
  document.body.classList.toggle("menu-open", openOnMobile);
  updateMenuLabel();

  if (returnFocus) menuButton.focus();
};

menuButton?.addEventListener("click", () => setMenuOpen(!menuIsOpen()));

navigation?.addEventListener("click", (event) => {
  if (event.target.closest("a")) setMenuOpen(false);
});

document.addEventListener("click", (event) => {
  if (menuIsOpen() && !event.target.closest(".site-header")) setMenuOpen(false);
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && menuIsOpen()) setMenuOpen(false, true);
});

mobileMenu.addEventListener("change", () => setMenuOpen(false));
document.addEventListener("languagechange", updateMenuLabel);
setMenuOpen(false);

const revealClass = softDemo ? "visible" : "is-visible";
const revealElements = document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window) {
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add(revealClass);
        entry.target.classList.remove("reveal-pending");
        revealObserver.unobserve(entry.target);
      });
    },
    { threshold: softDemo ? 0.1 : 0.12 },
  );

  revealElements.forEach((element) => {
    if (element.getBoundingClientRect().top < window.innerHeight) {
      element.classList.add(revealClass);
      return;
    }

    element.classList.add("reveal-pending");
    revealObserver.observe(element);
  });
} else {
  revealElements.forEach((element) => element.classList.add(revealClass));
}

const contactForm = document.querySelector("#info-form, #contact-form");

const updateEmailStatus = () => {
  document
    .querySelectorAll('.form-message[data-state="opening"]')
    .forEach((status) => {
      status.textContent = getMessage("openingEmail");
    });
};

contactForm?.addEventListener("submit", (event) => {
  event.preventDefault();
  const form = event.currentTarget;
  const formData = new FormData(form);
  const name = formData.get("name").trim();
  const email = formData.get("email").trim();
  const stage = formData.get("stage");
  const message = formData.get("message").trim();
  const isVietnamese = document.documentElement.lang === "vi";
  const subject = encodeURIComponent(
    isVietnamese ? `Yêu cầu tư vấn từ ${name}` : `Website inquiry from ${name}`,
  );
  const body = encodeURIComponent(
    isVietnamese
      ? `Họ và tên: ${name}\nEmail: ${email}\nNhu cầu hỗ trợ: ${stage}\n\n${message}`
      : `Name: ${name}\nEmail: ${email}\nArea of support: ${stage}\n\n${message}`,
  );
  const status = form.querySelector(".form-message");

  if (status) {
    status.dataset.state = "opening";
    status.textContent = getMessage("openingEmail");
  }

  requestAnimationFrame(() => {
    window.location.href = `mailto:danangbirthcollaborative@gmail.com?subject=${subject}&body=${body}`;
  });
});

document.addEventListener("languagechange", updateEmailStatus);

const guideModal = document.querySelector("#guide-modal");
const guidePanel = guideModal?.querySelector(".lead-modal-panel");
const guideForm = guideModal?.querySelector(".lead-modal-form");
const pageContent = document.querySelectorAll(
  "body > header, body > main, body > footer, body > .skip-link",
);
const focusableSelector =
  'button:not([disabled]), input:not([type="hidden"]):not([disabled]), a[href], select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';
let guideReturnFocus = null;

const setPageInert = (isInert) => {
  pageContent.forEach((element) => element.toggleAttribute("inert", isInert));
};

const getGuideFocusable = () =>
  guideModal
    ? [...guideModal.querySelectorAll(focusableSelector)].filter(
        (element) => !element.hidden && element.offsetParent !== null,
      )
    : [];

const closeGuideModal = () => {
  if (!guideModal || guideModal.hidden) return;
  guideModal.hidden = true;
  document.body.classList.remove("lead-modal-open");
  setPageInert(false);
  guideReturnFocus?.focus();
};

const openGuideModal = (trigger) => {
  if (!guideModal) return;
  guideReturnFocus = trigger;
  guideModal.hidden = false;
  document.body.classList.add("lead-modal-open");
  setPageInert(true);
  requestAnimationFrame(() => guidePanel?.focus());
};

document.querySelectorAll("[data-guide-trigger]").forEach((trigger) => {
  trigger.addEventListener("click", (event) => {
    event.preventDefault();
    openGuideModal(trigger);
  });
});

guideModal?.querySelectorAll("[data-guide-close]").forEach((control) => {
  control.addEventListener("click", closeGuideModal);
});

guideModal?.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    event.preventDefault();
    closeGuideModal();
    return;
  }

  if (event.key !== "Tab") return;
  const focusable = getGuideFocusable();
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

guideForm?.addEventListener("submit", () => {
  const status = guideForm.querySelector(".lead-modal-status");
  const submitButton = guideForm.querySelector('button[type="submit"]');
  if (status) status.textContent = getMessage("sendingGuide");
  if (submitButton) submitButton.disabled = true;
});

if (window.location.hash === "#guide-modal") {
  openGuideModal(document.querySelector("[data-guide-trigger]"));
}

const year = document.querySelector("#year");
if (year) year.textContent = new Date().getFullYear();
