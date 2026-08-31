document.documentElement.classList.add('js-enabled');

const header = document.querySelector('[data-header]');
const navToggle = document.querySelector('[data-nav-toggle]');
const navLinks = [...document.querySelectorAll('.site-nav a')];
const trackedSections = navLinks
  .map(link => document.querySelector(link.getAttribute('href')))
  .filter(Boolean);
const revealNodes = [...document.querySelectorAll('.reveal')];
const progressBar = document.querySelector('#scroll-progress');
const tiltCard = document.querySelector('[data-tilt-card]');

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

const updateActiveLink = () => {
  const offset = window.scrollY + 220;
  let currentId = trackedSections[0]?.id ?? '';

  for (const section of trackedSections) {
    if (offset >= section.offsetTop) {
      currentId = section.id;
    }
  }

  for (const link of navLinks) {
    link.classList.toggle('active', link.getAttribute('href') === `#${currentId}`);
  }
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

for (const link of navLinks) {
  link.addEventListener('click', closeMenu);
}

window.addEventListener(
  'scroll',
  () => {
    updateActiveLink();
    updateProgress();
  },
  { passive: true }
);
window.addEventListener('resize', closeMenu);
window.addEventListener('load', () => {
  updateActiveLink();
  updateProgress();
  revealAll();
});

updateActiveLink();
updateProgress();
revealAll();

if (tiltCard && window.matchMedia('(pointer:fine)').matches) {
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
