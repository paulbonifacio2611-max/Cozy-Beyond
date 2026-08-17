// PAGE NAVIGATION
const sections = document.querySelectorAll('.page-section');
const navLinks = document.querySelectorAll('.nav-link');
const navButtons = document.querySelectorAll('.nav-button');
const navToggle = document.querySelector('.nav-toggle');
const navMenu = document.querySelector('.nav-menu');
const backToTopButton = document.querySelector('.back-to-top');

function showSection(targetId) {
  sections.forEach((section) => {
    const isActive = section.id === targetId;
    section.classList.toggle('active', isActive);
    section.hidden = !isActive;
  });

  navLinks.forEach((link) => {
    const isActive = link.dataset.page === targetId;
    link.classList.toggle('active', isActive);
  });

  if (window.innerWidth <= 980 && navMenu) {
    navMenu.classList.remove('open');
  }

  if (navToggle) {
    navToggle.classList.remove('open');
    navToggle.setAttribute('aria-expanded', 'false');
  }

  window.scrollTo({ top: 0, behavior: 'smooth' });
}

navLinks.forEach((link) => {
  link.addEventListener('click', (event) => {
    event.preventDefault();
    const targetId = link.dataset.page;
    if (targetId) {
      showSection(targetId);
    }
  });
});

navButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const targetPage = button.dataset.page;
    if (targetPage) {
      showSection(targetPage);
    }
  });
});

if (navToggle) {
  navToggle.addEventListener('click', () => {
    const isOpen = navMenu.classList.toggle('open');
    navToggle.classList.toggle('open', isOpen);
    navToggle.setAttribute('aria-expanded', String(isOpen));
  });
}

window.addEventListener('scroll', () => {
  if (window.scrollY > 320) {
    backToTopButton.classList.add('visible');
  } else {
    backToTopButton.classList.remove('visible');
  }
});

if (backToTopButton) {
  backToTopButton.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

// MENU FILTER
const filterButtons = document.querySelectorAll('.filter-btn');
const menuCards = document.querySelectorAll('.menu-card');
const menuSearchInput = document.getElementById('menu-search');
const menuResultNote = document.getElementById('menu-result-note');

let activeCategory = 'All';
let searchTerm = '';

function applyMenuFilters() {
  const normalizedSearch = searchTerm.trim().toLowerCase();
  let visibleCount = 0;

  menuCards.forEach((card) => {
    const category = card.dataset.category;
    const searchText = (card.dataset.searchText || '').toLowerCase();
    const matchesCategory = activeCategory === 'All' || category === activeCategory;
    const matchesSearch = !normalizedSearch || searchText.includes(normalizedSearch);
    const isVisible = matchesCategory && matchesSearch;

    card.classList.toggle('hidden', !isVisible);
    card.style.display = isVisible ? 'flex' : 'none';

    if (isVisible) {
      visibleCount += 1;
    }
  });

  if (menuResultNote) {
    menuResultNote.textContent = visibleCount === 0 ? 'No menu items match your search.' : `Showing ${visibleCount} item${visibleCount === 1 ? '' : 's'}`;
  }
}

filterButtons.forEach((button) => {
  button.addEventListener('click', () => {
    activeCategory = button.dataset.category;

    filterButtons.forEach((btn) => {
      btn.classList.toggle('active', btn === button);
    });

    applyMenuFilters();
  });
});

if (menuSearchInput) {
  menuSearchInput.addEventListener('input', (event) => {
    searchTerm = event.target.value;
    applyMenuFilters();
  });
}

applyMenuFilters();

// IMAGE FALLBACK
const fallbackImageUrl = 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=900&q=80';

document.querySelectorAll('img').forEach((img) => {
  img.addEventListener('error', () => {
    if (!img.dataset.fallback) {
      img.dataset.fallback = 'true';
      img.src = fallbackImageUrl;
    }
  });
});

// GALLERY LIGHTBOX
const lightbox = document.getElementById('lightbox');
const lightboxImage = lightbox.querySelector('img');
const lightboxClose = document.querySelector('.lightbox-close');
const galleryImages = document.querySelectorAll('.gallery-item img');

function openLightbox(src, alt) {
  if (!lightbox || !lightboxImage) {
    return;
  }

  lightboxImage.src = src;
  lightboxImage.alt = alt;
  lightbox.classList.add('open');
  lightbox.setAttribute('aria-hidden', 'false');
}

function closeLightbox() {
  if (!lightbox || !lightboxImage) {
    return;
  }

  lightbox.classList.remove('open');
  lightbox.setAttribute('aria-hidden', 'true');
  lightboxImage.src = '';
}

galleryImages.forEach((image) => {
  image.addEventListener('click', () => {
    openLightbox(image.src, image.alt);
  });
});

if (lightboxClose) {
  lightboxClose.addEventListener('click', closeLightbox);
}

if (lightbox) {
  lightbox.addEventListener('click', (event) => {
    if (event.target === lightbox) {
      closeLightbox();
    }
  });
}

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && lightbox && lightbox.classList.contains('open')) {
    closeLightbox();
  }
});

// CONTACT FORM
const contactForm = document.getElementById('contact-form');
const formMessage = document.getElementById('form-message');

if (contactForm) {
  contactForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const fullName = document.getElementById('full-name').value.trim();
    const email = document.getElementById('email').value.trim();
    const message = document.getElementById('message').value.trim();

    if (!fullName || !email || !message) {
      formMessage.textContent = 'Please fill in your full name, email, and message.';
      formMessage.className = 'form-message error';
      return;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      formMessage.textContent = 'Please enter a valid email address.';
      formMessage.className = 'form-message error';
      return;
    }

    formMessage.textContent = 'Thank you for reaching out to Cozy & Beyond! We’ll get back to you soon.';
    formMessage.className = 'form-message success';
    contactForm.reset();
  });
}

// OTHER INTERACTIONS
const initialPage = window.location.hash.replace('#', '') || 'home';
if (sections.length && initialPage && document.getElementById(initialPage)) {
  showSection(initialPage);
} else if (sections.length) {
  showSection('home');
}

if (navMenu) {
  document.addEventListener('click', (event) => {
    if (window.innerWidth <= 980) {
      const clickedInsideNav = event.target.closest('.nav-menu') || event.target.closest('.nav-toggle');
      if (!clickedInsideNav) {
        navMenu.classList.remove('open');
        navToggle.classList.remove('open');
        navToggle.setAttribute('aria-expanded', 'false');
      }
    }
  });
}
