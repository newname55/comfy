const header = document.querySelector("[data-header]");
const navToggle = document.querySelector("[data-nav-toggle]");
const nav = document.querySelector("[data-nav]");
const contactForm = document.querySelector("[data-contact-form]");

const updateHeader = () => {
  header.classList.toggle("is-scrolled", window.scrollY > 24);
};

navToggle.addEventListener("click", () => {
  const isOpen = header.classList.toggle("is-open");
  navToggle.setAttribute("aria-expanded", String(isOpen));
});

nav.addEventListener("click", (event) => {
  if (event.target.tagName === "A") {
    header.classList.remove("is-open");
    navToggle.setAttribute("aria-expanded", "false");
  }
});

window.addEventListener("scroll", updateHeader, { passive: true });
updateHeader();

if (contactForm) {
  contactForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const email = contactForm.dataset.contactEmail?.trim();
    if (!email) {
      alert("送信先メールアドレスが未設定です。contact.html の data-contact-email に設定してください。");
      return;
    }

    const formData = new FormData(contactForm);
    const lines = [...formData.entries()].map(([key, value]) => `${key}: ${value}`);
    const subject = encodeURIComponent("Comfy ご予約・お問い合わせ");
    const body = encodeURIComponent(lines.join("\n"));
    window.location.href = `mailto:${email}?subject=${subject}&body=${body}`;
  });
}
