/* =========================================================
   Aldan Maulana Fajri — Portfolio Interactions
   Vanilla JS, no dependencies.
   ========================================================= */
(function () {
  'use strict';

  var root = document.documentElement;
  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- 1. THEME ---------- */
  var THEME_KEY = 'amf-theme';
  var toggle = document.getElementById('themeToggle');

  function applyTheme(theme) {
    root.setAttribute('data-theme', theme);
    if (toggle) {
      toggle.setAttribute('aria-label',
        theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme');
    }
    var meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.setAttribute('content', theme === 'dark' ? '#08080C' : '#F6F6FA');
  }

  var stored = null;
  try { stored = localStorage.getItem(THEME_KEY); } catch (e) { /* private mode */ }

  var prefersLight = window.matchMedia('(prefers-color-scheme: light)');
  applyTheme(stored || (prefersLight.matches ? 'light' : 'dark'));

  // Follow OS changes only while the visitor has not chosen a theme themselves.
  var onSchemeChange = function (e) {
    if (stored) return;
    applyTheme(e.matches ? 'light' : 'dark');
  };
  if (prefersLight.addEventListener) {
    prefersLight.addEventListener('change', onSchemeChange);
  } else if (prefersLight.addListener) {
    prefersLight.addListener(onSchemeChange); // Safari < 14
  }

  if (toggle) {
    toggle.addEventListener('click', function () {
      var next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
      applyTheme(next);
      stored = next; // an explicit choice now overrides the OS preference
      try { localStorage.setItem(THEME_KEY, next); } catch (e) { /* noop */ }
    });
  }

  /* ---------- 2. SCROLL PROGRESS + STICKY NAV + BACK TO TOP ---------- */
  var progressBar = document.getElementById('progressBar');
  var navWrap = document.getElementById('navWrap');
  var toTop = document.getElementById('toTop');
  var lastY = window.scrollY;
  var ticking = false;

  function onScroll() {
    var y = window.scrollY;
    var docH = document.documentElement.scrollHeight - window.innerHeight;

    if (progressBar) {
      progressBar.style.width = (docH > 0 ? (y / docH) * 100 : 0) + '%';
    }

    if (navWrap) {
      navWrap.classList.toggle('is-stuck', y > 24);
      // Hide nav on downward scroll past the fold; reveal on upward scroll.
      if (!navWrap.classList.contains('nav-open')) {
        if (y > 480 && y > lastY + 4) {
          navWrap.classList.add('is-hidden');
        } else if (y < lastY - 4 || y <= 480) {
          navWrap.classList.remove('is-hidden');
        }
      }
    }

    if (toTop) toTop.classList.toggle('is-visible', y > 700);

    lastY = y;
    ticking = false;
  }

  window.addEventListener('scroll', function () {
    if (!ticking) { window.requestAnimationFrame(onScroll); ticking = true; }
  }, { passive: true });
  onScroll();

  if (toTop) {
    toTop.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: reduceMotion ? 'auto' : 'smooth' });
    });
  }

  /* ---------- 3. MOBILE MENU ---------- */
  var menuBtn = document.getElementById('menuBtn');
  var navLinks = document.getElementById('navLinks');

  function closeMenu() {
    if (!navLinks || !menuBtn) return;
    navLinks.classList.remove('is-open');
    menuBtn.setAttribute('aria-expanded', 'false');
    menuBtn.setAttribute('aria-label', 'Open menu');
    if (navWrap) navWrap.classList.remove('nav-open');
  }

  if (menuBtn && navLinks) {
    menuBtn.addEventListener('click', function () {
      var open = navLinks.classList.toggle('is-open');
      menuBtn.setAttribute('aria-expanded', open ? 'true' : 'false');
      menuBtn.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
      if (navWrap) navWrap.classList.toggle('nav-open', open);
    });

    navLinks.addEventListener('click', function (e) {
      var t = e.target;
      if (t && t.closest && t.closest('a')) closeMenu();
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' || e.keyCode === 27) closeMenu();
    });

    document.addEventListener('click', function (e) {
      if (!navLinks.contains(e.target) && !menuBtn.contains(e.target)) closeMenu();
    });

    // Leaving the mobile breakpoint while the panel is open would strand the menu.
    var wide = window.matchMedia('(min-width: 901px)');
    var onBreakpoint = function (e) { if (e.matches) closeMenu(); };
    if (wide.addEventListener) {
      wide.addEventListener('change', onBreakpoint);
    } else if (wide.addListener) {
      wide.addListener(onBreakpoint);
    }
  }

  /* ---------- 4. SCROLL REVEAL ---------- */
  var revealEls = document.querySelectorAll('.reveal');

  if (reduceMotion || !('IntersectionObserver' in window)) {
    revealEls.forEach(function (el) { el.classList.add('is-in'); });
  } else {
    var revealIO = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-in');
          revealIO.unobserve(entry.target);
        }
      });
    }, { rootMargin: '0px 0px -12% 0px', threshold: 0.08 });

    revealEls.forEach(function (el) {
      // Auto-stagger siblings that share a parent grid.
      var parent = el.parentElement;
      if (parent) {
        var sibs = Array.prototype.filter.call(parent.children, function (c) {
          return c.classList && c.classList.contains('reveal');
        });
        var idx = sibs.indexOf(el);
        if (idx > 0 && sibs.length > 2 && idx < 6 && !el.style.getPropertyValue('--d')) {
          el.style.setProperty('--d', (idx * 0.07) + 's');
        }
      }
      revealIO.observe(el);
    });
  }

  /* ---------- 5. ACTIVE NAV HIGHLIGHT ---------- */
  var sections = Array.prototype.slice.call(document.querySelectorAll('main section[id]'));
  var navAnchors = Array.prototype.slice.call(document.querySelectorAll('[data-nav]'));

  function syncActiveNav() {
    var probe = window.scrollY + window.innerHeight * 0.32;
    var currentId = null;

    for (var i = 0; i < sections.length; i++) {
      var sec = sections[i];
      if (sec.offsetTop <= probe && sec.offsetTop + sec.offsetHeight > probe) {
        currentId = sec.id;
        break;
      }
    }
    // Pin "About" while still in the hero.
    if (window.scrollY < window.innerHeight * 0.55) currentId = null;

    navAnchors.forEach(function (a) {
      a.classList.toggle('is-active', a.getAttribute('href') === '#' + currentId);
    });
  }

  if (sections.length && 'IntersectionObserver' in window) {
    var spy = new IntersectionObserver(function () { syncActiveNav(); }, { threshold: [0, 0.2, 0.5] });
    sections.forEach(function (s) { spy.observe(s); });
  }
  window.addEventListener('scroll', syncActiveNav, { passive: true });
  syncActiveNav();

  /* ---------- 6. ANIMATED COUNTERS ---------- */
  // The final numbers are already in the HTML (correct without JS). Reset to 0
  // synchronously here, then animate up when the row scrolls into view.
  var counters = document.querySelectorAll('.count');
  Array.prototype.forEach.call(counters, function (el) { el.textContent = '0'; });

  function runCounter(el) {
    var target = parseInt(el.getAttribute('data-to'), 10) || 0;
    var suffix = el.getAttribute('data-suffix') || '';
    var duration = 1300;

    if (reduceMotion) { el.textContent = target + suffix; return; }

    var start = null;
    function step(ts) {
      if (start === null) start = ts;
      var p = Math.min((ts - start) / duration, 1);
      var eased = 1 - Math.pow(1 - p, 3);
      el.textContent = Math.round(target * eased) + suffix;
      if (p < 1) window.requestAnimationFrame(step);
    }
    window.requestAnimationFrame(step);
  }

  if ('IntersectionObserver' in window) {
    var countIO = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          runCounter(entry.target);
          countIO.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });
    counters.forEach(function (c) { countIO.observe(c); });
  } else {
    counters.forEach(runCounter);
  }

  /* ---------- 7. TECH MARQUEE ---------- */
  // The chips ship in the HTML. Clone them once so translateX(-50%) loops
  // seamlessly; with JS off the original list still renders as a static strip.
  var track = document.getElementById('marqueeTrack');
  if (track) {
    var chips = Array.prototype.slice.call(track.children);
    if (chips.length) {
      chips.forEach(function (chip) { track.appendChild(chip.cloneNode(true)); });
    }
  }

  /* ---------- 8. COPY EMAIL + TOAST ---------- */
  var toast = document.getElementById('toast');
  var toastTimer = null;

  function showToast(msg) {
    if (!toast) return;
    toast.textContent = msg;
    toast.classList.add('is-visible');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () { toast.classList.remove('is-visible'); }, 2200);
  }

  function fallbackCopy(text) {
    var ta = document.createElement('textarea');
    ta.value = text;
    ta.setAttribute('readonly', '');
    ta.style.cssText = 'position:fixed;top:-1000px;opacity:0';
    document.body.appendChild(ta);
    ta.select();
    var ok = false;
    try { ok = document.execCommand('copy'); } catch (e) { ok = false; }
    document.body.removeChild(ta);
    return ok;
  }

  Array.prototype.forEach.call(document.querySelectorAll('[data-email]'), function (btn) {
    var label = btn.querySelector('[data-copy-label]');
    var original = label ? label.textContent : '';

    btn.addEventListener('click', function () {
      var email = btn.getAttribute('data-email');
      var done = function () {
        if (label) label.textContent = 'Copied!';
        showToast('Email copied: ' + email);
        setTimeout(function () { if (label) label.textContent = original; }, 2200);
      };

      if (navigator.clipboard && window.isSecureContext) {
        navigator.clipboard.writeText(email).then(done, function () {
          if (fallbackCopy(email)) done(); else showToast('Copy failed — email: ' + email);
        });
      } else {
        if (fallbackCopy(email)) done(); else showToast('Copy failed — email: ' + email);
      }
    });
  });

  /* ---------- 9. MISC ---------- */
  var yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // Smooth-scroll with a sticky-nav offset. Native CSS scroll-behavior handles
  // the animation; this only corrects the landing position.
  Array.prototype.forEach.call(document.querySelectorAll('a[href^="#"]'), function (link) {
    link.addEventListener('click', function (e) {
      var id = link.getAttribute('href');
      if (!id || id === '#' || id.length < 2) return;
      var target = document.querySelector(id);
      if (!target) return;
      e.preventDefault();
      // Breathing room below the sticky nav so the section eyebrow never
      // sits tight against it.
      var offset = navWrap ? navWrap.offsetHeight + 28 : 100;
      var top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top: top, behavior: reduceMotion ? 'auto' : 'smooth' });
      // After a nav jump, tuck the sticky nav away so the landing always looks
      // like a downward scroll (full viewport for content). Any later scroll
      // re-applies the normal hide/show logic; never hide an open mobile menu.
      window.setTimeout(function () {
        if (navWrap && !navWrap.classList.contains('nav-open') && window.scrollY > 480) {
          navWrap.classList.add('is-hidden');
        }
      }, 1000);
      // replaceState throws on some file:// and sandboxed origins.
      try {
        if (window.history && history.replaceState) history.replaceState(null, '', id);
      } catch (err) { /* non-fatal */ }
    });
  });
})();
