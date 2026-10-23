const navToggle = document.querySelector('.nav-toggle');
const navMenu = document.querySelector('.nav-menu');
const yearEl = document.getElementById('year');
const contactForm = document.getElementById('contactForm');
const formStatus = document.getElementById('formStatus');

if (yearEl) {
  yearEl.textContent = new Date().getFullYear();
}

if (navToggle && navMenu) {
  navToggle.addEventListener('click', () => {
    const isOpen = navMenu.classList.toggle('open');
    navToggle.setAttribute('aria-expanded', String(isOpen));
  });

  navMenu.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      navMenu.classList.remove('open');
      navToggle.setAttribute('aria-expanded', 'false');
    });
  });
}

const revealItems = document.querySelectorAll('.reveal');
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.2 }
);

revealItems.forEach((item) => revealObserver.observe(item));

if (contactForm) {
  contactForm.addEventListener('submit', async (event) => {
    event.preventDefault();

    const submitButton = contactForm.querySelector('button[type="submit"]');
    const formData = new FormData(contactForm);
    const payload = {
      name: formData.get('name')?.trim(),
      email: formData.get('email')?.trim(),
      subject: formData.get('subject')?.trim(),
      message: formData.get('message')?.trim()
    };

    formStatus.textContent = 'Sending message...';
    formStatus.className = 'form-status';
    submitButton.disabled = true;

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.message || 'Unable to send message right now.');
      }

      formStatus.textContent = result.message;
      formStatus.classList.add('success');
      contactForm.reset();
    } catch (error) {
      formStatus.textContent = error.message;
      formStatus.classList.add('error');
    } finally {
      submitButton.disabled = false;
    }
  });
}
