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
      var active = a.getAttribute('href') === '#' + currentId;
      a.classList.toggle('is-active', active);
      if (active) a.setAttribute('aria-current', 'true');
      else a.removeAttribute('aria-current');
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

    // Suffix mid-tween reads wrong (e.g. "3/6" while counting to "6 / 6"):
    // count bare digits, stamp the formatted value on completion.
    if (reduceMotion) { el.textContent = target + suffix; return; }

    var start = null;
    function step(ts) {
      if (start === null) start = ts;
      var p = Math.min((ts - start) / duration, 1);
      var eased = 1 - Math.pow(1 - p, 3);
      if (p < 1) {
        el.textContent = String(Math.round(target * eased));
        window.requestAnimationFrame(step);
      } else {
        el.textContent = target + suffix;
      }
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

  /* ---------- 8. PROTECTED CONTACT LINKS + COPY EMAIL ---------- */
  // Email + WhatsApp number ship base64-encoded in data attributes so the raw
  // values never appear in the HTML source; decoded here at runtime.
  function b64decode(b64) {
    try { return window.atob ? window.atob(b64) : ''; } catch (e) { return ''; }
  }

  var copyBtn = document.getElementById('copyEmail');
  var EMAIL_B64 = copyBtn ? copyBtn.getAttribute('data-email-b64') : '';
  function getEmail() { return EMAIL_B64 ? b64decode(EMAIL_B64) : ''; }

  // WhatsApp: build the wa.me URL at runtime on load.
  Array.prototype.forEach.call(document.querySelectorAll('[data-wa-link]'), function (link) {
    var num = b64decode(link.getAttribute('data-wa-b64') || '');
    if (num) link.setAttribute('href', 'https://wa.me/' + num);
  });

  // Email links: set the mailto: href on focus/click so scrapers see no address.
  Array.prototype.forEach.call(document.querySelectorAll('[data-email-link]'), function (link) {
    var arm = function () {
      var email = getEmail();
      if (email && link.getAttribute('href') !== 'mailto:' + email) {
        link.setAttribute('href', 'mailto:' + email);
      }
    };
    link.addEventListener('focus', arm);
    link.addEventListener('click', arm);
  });

  Array.prototype.forEach.call(document.querySelectorAll('[data-email-b64]'), function (btn) {
    var label = btn.querySelector('[data-copy-label]');
    var original = label ? label.textContent : '';

    btn.addEventListener('click', function () {
      // Lock the button width before swapping the label so "Copied!" (shorter
      // text) doesn't shrink the button and shift the hero-cta row.
      if (!btn.style.minWidth) btn.style.minWidth = btn.offsetWidth + 'px';
      var email = b64decode(btn.getAttribute('data-email-b64') || '');
      if (!email) { showToast('Copy failed — try again'); return; }
      var done = function () {
        if (label) label.textContent = 'Copied!';
        showToast('Email copied to clipboard');
        setTimeout(function () { if (label) label.textContent = original; }, 2200);
      };

      if (navigator.clipboard && window.isSecureContext) {
        navigator.clipboard.writeText(email).then(done, function () {
          if (fallbackCopy(email)) done(); else showToast('Copy failed — try again');
        });
      } else {
        if (fallbackCopy(email)) done(); else showToast('Copy failed — try again');
      }
    });
  });
  /* ---------- 8b. QA CASE-STUDY DIALOGS ---------- */
  // Native <dialog> when available; hidden-attribute fallback keeps content
  var caseOpener = null;
  function openCase(id) {
    var dlg = document.getElementById('case-' + id);
    if (!dlg) return;
    caseOpener = document.activeElement;
    if (typeof dlg.showModal === 'function') {
      if (!dlg.open) dlg.showModal();
    } else {
      dlg.setAttribute('open', '');
      dlg.classList.add('is-fallback-open');
    }
    document.body.style.overflow = 'hidden';
    var focusTarget = dlg.querySelector('[data-case-close]') || dlg;
    if (focusTarget && focusTarget.focus) focusTarget.focus();
  }
  function closeCase(dlg) {
    if (!dlg) return;
    if (typeof dlg.close === 'function' && dlg.open) {
      dlg.close();
    } else {
      dlg.removeAttribute('open');
      dlg.classList.remove('is-fallback-open');
    }
    document.body.style.overflow = '';
    if (caseOpener && caseOpener.focus) caseOpener.focus();
  }
  Array.prototype.forEach.call(document.querySelectorAll('[data-case-open]'), function (btn) {
    btn.addEventListener('click', function () { openCase(btn.getAttribute('data-case-open')); });
  });
  Array.prototype.forEach.call(document.querySelectorAll('.case-dialog'), function (dlg) {
    Array.prototype.forEach.call(dlg.querySelectorAll('[data-case-close]'), function (btn) {
      btn.addEventListener('click', function () { closeCase(dlg); });
    });
    dlg.addEventListener('click', function (e) {
      if (e.target === dlg) closeCase(dlg);
    });
    // Keep keyboard users inside the open dialog (both native showModal and
    // the non-modal fallback); Escape covers the fallback path, where the
    // browser provides no native Esc-to-close.
    dlg.addEventListener('keydown', function (e) {
      var isTab = e.key === 'Tab' || e.keyCode === 9;
      var isEsc = e.key === 'Escape' || e.key === 'Esc' || e.keyCode === 27;
      if (isEsc) { closeCase(dlg); return; }
      if (!isTab) return;
      var focusables = dlg.querySelectorAll(
        'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])');
      var list = Array.prototype.filter.call(focusables, function (el) {
        return el.offsetParent !== null || el === document.activeElement;
      });
      if (!list.length) { e.preventDefault(); return; }
      var first = list[0];
      var last = list[list.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault(); last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault(); first.focus();
      }
    });
    dlg.addEventListener('close', function () {
      document.body.style.overflow = '';
      if (caseOpener && caseOpener.focus) caseOpener.focus();
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
      // Contact links start as href="#contact" but arm to mailto: on focus/click
      // (spam protection) — re-read the live attribute and let those navigate.
      if (!id || id.charAt(0) !== '#' || id.length < 2) return;
      var target = null;
      try { target = document.querySelector(id); } catch (e) { return; }
      if (!target) return;
      e.preventDefault();
      // Top-aligned landing: park the section top just below the sticky nav
      // with breathing room (≈118px desktop / ≈112px mobile).
      var offset = navWrap ? navWrap.offsetHeight + 46 : 118;
      var top = target.getBoundingClientRect().top + window.scrollY - offset;
      var maxTop = document.documentElement.scrollHeight - window.innerHeight;
      top = Math.max(0, Math.min(top, Math.max(0, maxTop)));
      window.scrollTo({ top: top, behavior: reduceMotion ? 'auto' : 'smooth' });
      // After a nav jump, tuck the sticky nav away so the landing always looks
      // like a downward scroll (full viewport for content). Any later scroll
      // re-applies the normal hide/show logic; never hide an open mobile menu.
      window.setTimeout(function () {
        if (navWrap && !navWrap.classList.contains('nav-open') && window.scrollY > 480) {
          navWrap.classList.add('is-hidden');
        }
      }, 1000);
      // NOTE: the URL hash is intentionally left untouched so the address bar
      // stays clean (no #section suffix) after nav clicks. preventDefault()
      // above already stops the native jump that would set it.
    });
  });
})();
