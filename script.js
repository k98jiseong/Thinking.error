const body = document.body;
const contactLayer = document.querySelector("#contact-layer");
const contactModal = contactLayer.querySelector(".contact-modal");
const contactForm = document.querySelector("#contact-form");
const detailPanel = document.querySelector("#detail-panel");

const contactOpeners = document.querySelectorAll(".js-open-contact");
const contactClosers = document.querySelectorAll(".js-close-contact");
const detailOpeners = document.querySelectorAll(".js-open-detail");
const detailClosers = document.querySelectorAll(".js-close-detail");

let lastFocusedElement = null;

function syncBodyState() {
  const hasOpenLayer =
    contactLayer.classList.contains("is-open") ||
    detailPanel.classList.contains("is-open");

  body.classList.toggle("has-layer-open", hasOpenLayer);
}

function openContact() {
  lastFocusedElement = document.activeElement;
  contactLayer.classList.add("is-open");
  contactLayer.setAttribute("aria-hidden", "false");
  syncBodyState();

  window.setTimeout(() => {
    document.querySelector("#email").focus();
  }, 0);
}

function closeContact() {
  contactLayer.classList.remove("is-open");
  contactLayer.setAttribute("aria-hidden", "true");
  syncBodyState();

  if (lastFocusedElement instanceof HTMLElement) {
    lastFocusedElement.focus();
  }
}

function openDetail() {
  lastFocusedElement = document.activeElement;
  detailPanel.classList.add("is-open");
  detailPanel.setAttribute("aria-hidden", "false");
  syncBodyState();

  window.setTimeout(() => {
    detailPanel.querySelector(".js-close-detail").focus();
  }, 0);
}

function closeDetail() {
  detailPanel.classList.remove("is-open");
  detailPanel.setAttribute("aria-hidden", "true");
  syncBodyState();

  if (lastFocusedElement instanceof HTMLElement) {
    lastFocusedElement.focus();
  }
}

contactOpeners.forEach((button) => button.addEventListener("click", openContact));
contactClosers.forEach((button) => button.addEventListener("click", closeContact));
detailOpeners.forEach((button) => button.addEventListener("click", openDetail));
detailClosers.forEach((button) => button.addEventListener("click", closeDetail));

contactForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const sendButton = contactForm.querySelector('[type="submit"]');
  const originalLabel = sendButton.textContent;
  sendButton.textContent = "Sent";
  sendButton.disabled = true;

  window.setTimeout(() => {
    contactForm.reset();
    sendButton.textContent = originalLabel;
    sendButton.disabled = false;
    closeContact();
  }, 700);
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    if (contactLayer.classList.contains("is-open")) {
      closeContact();
      return;
    }

    if (detailPanel.classList.contains("is-open")) {
      closeDetail();
    }
  }

  if (event.key === "Tab" && contactLayer.classList.contains("is-open")) {
    const focusableElements = contactModal.querySelectorAll(
      'button:not([disabled]), input:not([disabled]), textarea:not([disabled]), a[href]'
    );
    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];

    if (event.shiftKey && document.activeElement === firstElement) {
      event.preventDefault();
      lastElement.focus();
    } else if (!event.shiftKey && document.activeElement === lastElement) {
      event.preventDefault();
      firstElement.focus();
    }
  }
});
