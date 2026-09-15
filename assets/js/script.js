document.documentElement.classList.add('js-enabled');

const header = document.querySelector('[data-header]');
const brandLink = document.querySelector('.brand');
const navToggle = document.querySelector('[data-nav-toggle]');
const navLinks = [...document.querySelectorAll('.site-nav a')];
const trackedSections = navLinks
  .map(link => document.querySelector(link.getAttribute('href')))
  .filter(Boolean);
let activeSectionId = '';
const revealNodes = [...document.querySelectorAll('.reveal')];
const progressBar = document.querySelector('#scroll-progress');
const tiltCard = document.querySelector('[data-tilt-card]');
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
const backToTop = document.querySelector('[data-back-to-top]');

const showRevealNode = node => {
  node.classList.add('is-visible');
  node.style.opacity = '1';
  node.style.transform = 'translateY(0)';
};

const closeMenu = () => {
  if (!header || !navToggle) {
    return;
  }

  header.dataset.open = 'false';
  navToggle.setAttribute('aria-expanded', 'false');
};

const toggleMenu = () => {
  if (!header || !navToggle) {
    return;
  }

  const isOpen = header.dataset.open === 'true';
  header.dataset.open = isOpen ? 'false' : 'true';
  navToggle.setAttribute('aria-expanded', String(!isOpen));
};

const scrollToTarget = targetElement => {
  targetElement?.scrollIntoView({ behavior: prefersReducedMotion.matches ? 'auto' : 'smooth' });
};

const clearUrlHash = () => {
  history.replaceState(null, document.title, `${window.location.pathname}${window.location.search}`);
};

const updateActiveLink = () => {
  // Keep the landing view neutral. Once the page is scrolled, activate the
  // section that occupies the visual centre of the viewport rather than the
  // last section whose document offset has been crossed. This prevents the
  // previous item (for example Credentials) staying active while Contact is
  // already the section the visitor is viewing.
  if (window.scrollY < 120) {
    activeSectionId = '';
  }

  const focusLine = window.innerHeight * 0.5;
  const currentSection = trackedSections.find(section => {
    const bounds = section.getBoundingClientRect();
    return bounds.top <= focusLine && bounds.bottom > focusLine;
  });
  if (currentSection && window.scrollY >= 120) {
    activeSectionId = currentSection.id;
  }
  const currentId = activeSectionId;

  for (const link of navLinks) {
    link.classList.toggle('active', link.getAttribute('href') === `#${currentId}`);
  }

};

const updateFloatingControls = () => {
  const isScrolled = window.scrollY > 520;
  backToTop?.classList.toggle('is-visible', isScrolled);
};

const updateProgress = () => {
  if (!progressBar) {
    return;
  }

  const total = document.documentElement.scrollHeight - window.innerHeight;
  const percent = total > 0 ? (window.scrollY / total) * 100 : 0;
  progressBar.style.width = `${Math.min(100, Math.max(0, percent))}%`;
};

const revealAll = () => {
  for (const node of revealNodes) {
    showRevealNode(node);
  }
};

const revealObserver = new IntersectionObserver(
  entries => {
    for (const entry of entries) {
      if (!entry.isIntersecting) {
        continue;
      }

      showRevealNode(entry.target);
      revealObserver.unobserve(entry.target);
    }
  },
  {
    threshold: 0.12,
    rootMargin: '0px 0px -8% 0px',
  }
);

for (const node of revealNodes) {
  revealObserver.observe(node);
}

revealAll();

navToggle?.addEventListener('click', toggleMenu);

brandLink?.addEventListener('click', event => {
  event.preventDefault();
  scrollToTarget(document.querySelector('#top'));
  clearUrlHash();
  closeMenu();
});

for (const link of navLinks) {
  link.addEventListener('click', event => {
    event.preventDefault();
    const targetId = link.getAttribute('href');
    const targetElement = targetId ? document.querySelector(targetId) : null;
    if (targetElement) {
      scrollToTarget(targetElement);
    }
    clearUrlHash();
    closeMenu();
  });
}

window.addEventListener(
  'scroll',
  () => {
    updateActiveLink();
    updateProgress();
    updateFloatingControls();
  },
  { passive: true }
);
window.addEventListener('resize', closeMenu);
window.addEventListener('load', () => {
  updateActiveLink();
  updateProgress();
  updateFloatingControls();
  revealAll();
});

// The hero is the neutral landing state; do not mark the first content link
// active until the visitor has moved past it.
navLinks.forEach(link => link.classList.remove('active'));

updateActiveLink();
updateProgress();
updateFloatingControls();
revealAll();

if (tiltCard && window.matchMedia('(pointer:fine)').matches && !prefersReducedMotion.matches) {
  const limit = 8;

  tiltCard.addEventListener('pointermove', event => {
    const rect = tiltCard.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
    const y = ((event.clientY - rect.top) / rect.height) * 2 - 1;
    const rotateX = y * -limit;
    const rotateY = x * limit;
    tiltCard.style.transform = `perspective(1200px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg)`;
  });

  tiltCard.addEventListener('pointerleave', () => {
    tiltCard.style.transform = 'perspective(1200px) rotateX(0deg) rotateY(0deg)';
  });
}
