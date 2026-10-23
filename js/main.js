/* ============================================================
   Portfolio runtime
   - theme + language preference
   - navigation state, anchors, active section
   - scroll reveal (once, fail-open)
   - ticker pause rules
   - contact form states
   - command palette (Ctrl/Cmd + K)
   - back to top + subtle parallax
   Contract: assets/docs/motion-interaction-handoff.md
   ============================================================ */

(function () {
  "use strict";

  var CONFIG = window.AMF_CONFIG || {};

  // Fallback copy, used only when i18n.js fails to load so the UI never shows raw keys.
  var FALLBACK_COPY = {
    "form.delivered": "MESSAGE LOGGED - DELIVERY CONFIRMED.",
    "form.noEndpoint": "DELIVERY NOT CONFIGURED - ADD AN ENDPOINT IN js/config.js",
    "form.error": "CHECK INPUTS - MESSAGE NOT SENT.",
    "form.sending": "SENDING.",
    "form.mailto": "CONTINUE IN YOUR EMAIL APP. THIS WEBSITE HAS NOT SENT YOUR MESSAGE.",
    "form.required": "THIS FIELD IS REQUIRED.",
    "form.submit": "SEND PRIVATE MESSAGE",
  };

  var T = function (key) {
    if (window.AMF_I18N) return window.AMF_I18N.t(key);
    return FALLBACK_COPY[key] !== undefined ? FALLBACK_COPY[key] : key;
  };

  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  var coarsePointer = window.matchMedia("(pointer: coarse)");

  function read(key, fallback) {
    try {
      return localStorage.getItem(key) || fallback;
    } catch (error) {
      return fallback;
    }
  }

  function write(key, value) {
    try {
      localStorage.setItem(key, value);
    } catch (error) {
      /* private mode: preference stays in memory for this session */
    }
  }

  /* ----------------------------- THEME ---------------------------- */

  var themeToggle = document.querySelector("[data-theme-toggle]");
  var themeIcon = document.querySelector("[data-theme-icon]");
  var themeMeta = document.querySelector('meta[name="theme-color"]');

  function setTheme(theme, persist) {
    document.documentElement.setAttribute("data-theme", theme);
    if (themeToggle) {
      themeToggle.setAttribute("aria-pressed", String(theme === "light"));
      themeToggle.setAttribute("aria-label", T(theme === "light" ? "theme.toDark" : "theme.toLight"));
    }
    if (themeIcon) {
      themeIcon.textContent = theme === "light" ? "◑" : "◐";
    }
    if (themeMeta) {
      themeMeta.setAttribute("content", theme === "light" ? "#E7E3DA" : "#15151A");
    }
    if (persist) {
      write("amf-theme", theme);
    }
  }

  setTheme(document.documentElement.getAttribute("data-theme") || "dark", false);

  if (themeToggle) {
    themeToggle.addEventListener("click", function () {
      var next =
        document.documentElement.getAttribute("data-theme") === "light" ? "dark" : "light";
      setTheme(next, true);
    });
  }

  /* ---------------------------- LANGUAGE -------------------------- */

  var langToggle = document.querySelector("[data-lang-toggle]");
  var langLabel = document.querySelector("[data-lang-label]");

  function setLang(lang, persist) {
    if (window.AMF_I18N) {
      window.AMF_I18N.apply(lang);
    }
    if (langLabel) {
      langLabel.textContent = lang === "id" ? "ID" : "EN";
    }
    if (langToggle) {
      langToggle.setAttribute("aria-label", T(lang === "id" ? "lang.toEn" : "lang.toId"));
    }
    if (persist) {
      write("amf-lang", lang);
    }
  }

  setLang(read("amf-lang", "en"), false);

  if (langToggle) {
    langToggle.addEventListener("click", function () {
      var next = document.documentElement.getAttribute("lang") === "id" ? "en" : "id";
      setLang(next, true);
    });
  }

  /* ------------------------------ NAV ----------------------------- */

  var nav = document.querySelector("[data-nav]");
  var navToggle = document.querySelector("[data-nav-toggle]");
  var navLinks = Array.prototype.slice.call(document.querySelectorAll("[data-nav-link]"));
  var navHero = document.querySelector("#hero");
  var previousNavScroll = Math.max(0, window.scrollY);
  var navWasPastHero = false;

  function onScrollNav() {
    if (!nav) return;
    var scroll = Math.max(0, window.scrollY);
    var pastHero = navHero ? navHero.getBoundingClientRect().bottom <= 0 : scroll > 0;
    var delta = scroll - previousNavScroll;
    var keepVisible = nav.classList.contains("is-open") || nav.contains(document.activeElement);
    nav.classList.toggle("is-stuck", scroll > 8);
    if (!pastHero || keepVisible) {
      nav.classList.remove("is-hidden");
    } else if (!navWasPastHero || delta > 0) {
      nav.classList.add("is-hidden");
    } else if (delta < 0) {
      nav.classList.remove("is-hidden");
    }
    previousNavScroll = scroll;
    navWasPastHero = pastHero;
  }

  onScrollNav();
  if (nav) {
    nav.addEventListener("focusin", function () {
      nav.classList.remove("is-hidden");
    });
  }

  var navMobile = window.matchMedia("(max-width: 900px)");

  function syncNavScrollLock(open) {
    // The mobile panel is a fixed overlay, so the page behind must not scroll.
    document.documentElement.classList.toggle("is-nav-open", Boolean(open) && navMobile.matches);
  }

  function closeNav() {
    if (!nav) return;
    nav.classList.remove("is-open");
    syncNavScrollLock(false);
    if (navToggle) {
      navToggle.setAttribute("aria-expanded", "false");
    }
  }

  if (navToggle) {
    navToggle.addEventListener("click", function () {
      var open = nav.classList.toggle("is-open");
      navToggle.setAttribute("aria-expanded", String(open));
      syncNavScrollLock(open);
    });

    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape" && nav.classList.contains("is-open")) {
        closeNav();
        navToggle.focus();
      }
    });

    // Leaving the mobile breakpoint must not leave the page locked.
    var onNavBreakpointChange = function () {
      if (!navMobile.matches) syncNavScrollLock(false);
      else syncNavScrollLock(nav.classList.contains("is-open"));
    };
    if (navMobile.addEventListener) {
      navMobile.addEventListener("change", onNavBreakpointChange);
    } else if (navMobile.addListener) {
      navMobile.addListener(onNavBreakpointChange);
    }
  }

  /* -------------------------- ANCHOR SCROLL ----------------------- */

  if (window.location.hash && history.replaceState) {
    history.replaceState(null, "", window.location.pathname + window.location.search);
  }

  function scrollToTarget(target, focus) {
    if (!target) return;
    var navH = nav ? nav.getBoundingClientRect().height : 0;
    var top = target.getBoundingClientRect().top + window.scrollY - navH - 12;
    window.scrollTo({
      top: Math.max(0, top),
      behavior: reduceMotion.matches ? "auto" : "smooth"
    });

    if (focus) {
      var heading = target.querySelector("h1, h2, h3") || target;
      heading.setAttribute("tabindex", "-1");
      heading.focus({ preventScroll: true });
      heading.addEventListener(
        "blur",
        function () {
          heading.removeAttribute("tabindex");
        },
        { once: true }
      );
    }
  }

  document.addEventListener("click", function (event) {
    var link = event.target.closest('a[href^="#"]');
    if (!link) return;
    var hash = link.getAttribute("href");
    if (!hash || hash === "#") return;
    var target = document.querySelector(hash);
    if (!target) return;
    event.preventDefault();
    closeNav();
    scrollToTarget(target, true);
  });

  /* ------------------------ ACTIVE NAV SECTION -------------------- */

  if (navLinks.length) {
    var sections = navLinks
      .map(function (link) {
        var id = link.getAttribute("href");
        var section = id ? document.querySelector(id) : null;
        return section ? { link: link, section: section } : null;
      })
      .filter(Boolean);

    function syncActiveSection() {
      var line = window.scrollY + (nav ? nav.getBoundingClientRect().height : 0) + 90;
      var active = null;
      sections.forEach(function (entry) {
        var top = entry.section.getBoundingClientRect().top + window.scrollY;
        if (top <= line && (!active || top > active.top)) {
          active = { entry: entry, top: top };
        }
      });

      sections.forEach(function (entry) {
        if (active && entry === active.entry) {
          entry.link.setAttribute("aria-current", "true");
        } else {
          entry.link.removeAttribute("aria-current");
        }
      });
    }

    syncActiveSection();
    window.addEventListener("scroll", syncActiveSection, { passive: true });
  }

  /* --------------------------- SCROLL REVEAL ---------------------- */

  var revealNodes = Array.prototype.slice.call(document.querySelectorAll("[data-reveal]"));

  function showAll() {
    revealNodes.forEach(function (node) {
      node.classList.add("is-in");
    });
  }

  if (!("IntersectionObserver" in window) || reduceMotion.matches) {
    showAll();
  } else {
    var revealObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          var node = entry.target;
          var siblings = node.parentElement ? Array.prototype.slice.call(node.parentElement.children) : [];
          var index = Math.max(0, siblings.indexOf(node));
          node.style.setProperty("--reveal-delay", Math.min(index, 4) * 55 + "ms");
          node.classList.add("is-in");
          revealObserver.unobserve(node);
        });
      },
      { rootMargin: "0px 0px -10% 0px", threshold: 0.12 }
    );

    revealNodes.forEach(function (node) {
      revealObserver.observe(node);
    });

    // Fail open after a slow network / stalled observer.
    window.setTimeout(function () {
      revealNodes.forEach(function (node) {
        var rect = node.getBoundingClientRect();
        if (rect.top < window.innerHeight) {
          node.classList.add("is-in");
        }
      });
    }, 2500);

    window.addEventListener("load", function () {
      window.setTimeout(function () {
        revealNodes.forEach(function (node) {
          if (node.getBoundingClientRect().top < window.innerHeight * 0.94) {
            node.classList.add("is-in");
          }
        });
      }, 120);
    });
  }

  reduceMotion.addEventListener("change", function (event) {
    if (event.matches) showAll();
  });

  // Safety net: reveal anything that has entered the viewport even if the
  // observer callback was missed (fast scroll, restored scroll position).
  function checkReveals() {
    if (reduceMotion.matches) return;
    revealNodes.forEach(function (node) {
      if (node.classList.contains("is-in")) return;
      var rect = node.getBoundingClientRect();
      if (rect.top < window.innerHeight * 0.94) {
        node.classList.add("is-in");
      }
    });
  }

  /* ------------------------------ TICKER -------------------------- */

  var ticker = document.querySelector("[data-ticker]");
  if (ticker) {
    var tickerToggle = ticker.querySelector("[data-ticker-toggle]");
    var tickerLabel = ticker.querySelector("[data-ticker-label]");
    var tickerPausedByUser = false;
    var tickerOffscreen = false;

    function syncTicker() {
      var paused = tickerPausedByUser || tickerOffscreen || document.hidden;
      ticker.classList.toggle("is-paused", paused);
      if (tickerToggle) {
        tickerToggle.setAttribute("aria-pressed", String(tickerPausedByUser));
        if (tickerLabel) {
          tickerLabel.textContent = tickerPausedByUser ? T("ticker.resume") : T("ticker.pause");
        }
      }
    }

    if (tickerToggle) {
      tickerToggle.addEventListener("click", function () {
        tickerPausedByUser = !tickerPausedByUser;
        syncTicker();
      });
    }

    if ("IntersectionObserver" in window) {
      new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          tickerOffscreen = !entry.isIntersecting;
          syncTicker();
        });
      }).observe(ticker);
    }

    document.addEventListener("visibilitychange", syncTicker);
    syncTicker();
  }

  /* ------------------------------ TAPE ---------------------------- */

  var heroMarquee = document.querySelector(".diagonal-marquee");
  if (heroMarquee) {
    var heroMarqueeOffscreen = false;
    function syncHeroMarquee() {
      var paused = heroMarqueeOffscreen || document.hidden || reduceMotion.matches;
      heroMarquee.classList.toggle("is-paused", paused);
      var stickers = document.querySelector(".hero__stickers");
      if (stickers) stickers.classList.toggle("is-paused", paused);
    }
    if ("IntersectionObserver" in window) {
      new IntersectionObserver(function (entries) {
        heroMarqueeOffscreen = !entries[0].isIntersecting;
        syncHeroMarquee();
      }).observe(heroMarquee);
    }
    document.addEventListener("visibilitychange", syncHeroMarquee);
    reduceMotion.addEventListener("change", syncHeroMarquee);
    syncHeroMarquee();
  }

  document.querySelectorAll(".sheet a").forEach(function (link) {
    link.addEventListener("click", function () {
      link.closest(".sheet").classList.add("is-opened");
    });
  });

  Array.prototype.slice.call(document.querySelectorAll("[data-tape]")).forEach(function (tape) {
    var count = 90;
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < count; i += 1) {
      var bar = document.createElement("span");
      if (i % 6 === 0) {
        bar.className = "is-accent";
      }
      fragment.appendChild(bar);
    }
    tape.appendChild(fragment);
  });

  /* -------------------------- AMBIENT MOTION ---------------------- */

  /* Infinite loops (HUD pulse, scan line, ghost drift) only play while
     their node is on screen and the tab is visible. Fail open when
     IntersectionObserver is unavailable. */

  var ambientNodes = Array.prototype.slice.call(document.querySelectorAll("[data-ambient]"));
  var ambientOnScreen = ambientNodes.map(function () {
    return true;
  });

  function syncAmbient() {
    ambientNodes.forEach(function (node, index) {
      var live = ambientOnScreen[index] && !document.hidden && !reduceMotion.matches;
      node.classList.toggle("is-live", live);
    });
    document.documentElement.classList.toggle("is-hidden", document.hidden);
  }

  if (ambientNodes.length) {
    if ("IntersectionObserver" in window) {
      var ambientObserver = new IntersectionObserver(
        function (entries) {
          entries.forEach(function (entry) {
            var index = ambientNodes.indexOf(entry.target);
            if (index === -1) return;
            ambientOnScreen[index] = entry.isIntersecting;
          });
          syncAmbient();
        },
        { rootMargin: "80px 0px" }
      );

      ambientNodes.forEach(function (node) {
        ambientObserver.observe(node);
      });
    }

    document.addEventListener("visibilitychange", syncAmbient);
    reduceMotion.addEventListener("change", syncAmbient);
    syncAmbient();
  }

  /* --------------------------- CONTACT DIALOG --------------------- */

  var contactDialog = document.querySelector("[data-contact-dialog]");
  var contactForm = document.querySelector("[data-contact-form]");
  var formStatus = document.querySelector("[data-form-status]");
  var submitButton = document.querySelector("[data-submit]");
  var submitLabel = document.querySelector("[data-submit-label]");
  var lastFocus = null;

  function openDialog(dialog) {
    if (!dialog) return;
    lastFocus = document.activeElement;
    if (typeof dialog.showModal === "function") {
      dialog.showModal();
    } else {
      dialog.setAttribute("open", "");
    }
    document.body.classList.add("is-locked");
    var focusTarget = dialog.querySelector("input, textarea, button");
    if (focusTarget) {
      window.setTimeout(function () {
        focusTarget.focus();
      }, 30);
    }
  }

  function closeDialog(dialog) {
    if (!dialog || !dialog.open) return;
    dialog.close();
  }

  document.querySelectorAll("[data-contact-open]").forEach(function (button) {
    button.addEventListener("click", function () {
      closeNav();
      openDialog(contactDialog);
    });
  });

  if (contactDialog) {
    contactDialog.querySelectorAll("[data-contact-close]").forEach(function (button) {
      button.addEventListener("click", function () {
        closeDialog(contactDialog);
      });
    });

    contactDialog.addEventListener("click", function (event) {
      if (event.target === contactDialog) {
        closeDialog(contactDialog);
      }
    });

    contactDialog.addEventListener("close", function () {
      document.body.classList.toggle("is-locked", !!document.querySelector("dialog[open]"));
      if (formStatus) {
        formStatus.textContent = "";
        formStatus.removeAttribute("data-state");
      }
      if (lastFocus && typeof lastFocus.focus === "function") {
        lastFocus.focus();
      }
    });
  }

  /* ------------------------------ FORM ---------------------------- */

  function fieldOf(name) {
    return contactForm ? contactForm.elements.namedItem(name) : null;
  }

  function errorNode(name) {
    return contactForm ? contactForm.querySelector('[data-error-for="' + name + '"]') : null;
  }

  function setFieldError(name, message) {
    var input = fieldOf(name);
    var node = errorNode(name);
    if (!input || !node) return;
    if (message) {
      input.setAttribute("aria-invalid", "true");
      node.textContent = message;
      node.hidden = false;
    } else {
      input.removeAttribute("aria-invalid");
      node.textContent = "";
      node.hidden = true;
    }
  }

  function validate() {
    var errors = 0;
    var name = fieldOf("name");
    var email = fieldOf("email");
    var message = fieldOf("message");

    if (!name || !name.value.trim()) {
      setFieldError("name", T("form.required"));
      errors += 1;
    } else {
      setFieldError("name", "");
    }

    var emailValue = email ? email.value.trim() : "";
    var emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(emailValue);
    if (!emailOk) {
      setFieldError("email", T(emailValue ? "form.email.invalid" : "form.required"));
      errors += 1;
    } else {
      setFieldError("email", "");
    }

    if (!message || !message.value.trim()) {
      setFieldError("message", T("form.required"));
      errors += 1;
    } else {
      setFieldError("message", "");
    }

    return errors === 0;
  }

  function setStatus(message, state) {
    if (!formStatus) return;
    formStatus.textContent = message || "";
    if (state) {
      formStatus.setAttribute("data-state", state);
    } else {
      formStatus.removeAttribute("data-state");
    }
  }

  if (contactForm) {
    contactForm.addEventListener("input", function (event) {
      var field = event.target;
      if (field && field.name && field.getAttribute("aria-invalid") === "true") {
        setFieldError(field.name, "");
      }
    });

    contactForm.addEventListener("submit", function (event) {
      event.preventDefault();

      var honeypot = fieldOf("company");
      if (honeypot && honeypot.value) {
        // Silent drop for bots; never claim delivery.
        setStatus(T("form.error"), "error");
        return;
      }

      if (!validate()) {
        setStatus(T("form.error"), "error");
        var firstInvalid = contactForm.querySelector('[aria-invalid="true"]');
        if (firstInvalid) firstInvalid.focus();
        return;
      }

      var payload = {
        name: fieldOf("name").value.trim(),
        email: fieldOf("email").value.trim(),
        message: fieldOf("message").value.trim()
      };

      if (!CONFIG.contactEndpoint) {
        // No delivery configured yet: fall back to the visitor's mail client.
        if (CONFIG.contactEmail) {
          var subject = encodeURIComponent("Private request from " + payload.name);
          var body = encodeURIComponent(payload.message + "\n\n— " + payload.name + " <" + payload.email + ">");
          window.location.href =
            "mailto:" + CONFIG.contactEmail + "?subject=" + subject + "&body=" + body;
          setStatus(T("form.mailto"), "success");
        } else {
          setStatus(T("form.noEndpoint"), "error");
        }
        return;
      }

      submitButton.disabled = true;
      if (submitLabel) submitLabel.textContent = T("form.sending");
      setStatus(T("form.sending"), "pending");

      fetch(CONFIG.contactEndpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(payload)
      })
        .then(function (response) {
          if (!response.ok) throw new Error("Request failed");
          return response.json().catch(function () {
            return {};
          });
        })
        .then(function () {
          contactForm.reset();
          setStatus(T("form.delivered"), "success");
        })
        .catch(function () {
          setStatus(T("form.error"), "error");
        })
        .then(function () {
          submitButton.disabled = false;
          if (submitLabel) submitLabel.textContent = T("form.submit");
        });
    });
  }

  /* --------------------------- PALETTE ---------------------------- */

  var palette = document.querySelector("[data-palette]");
  var paletteInput = document.querySelector("[data-palette-input]");
  var paletteList = document.querySelector("[data-palette-list]");
  var paletteItems = [];
  var paletteIndex = 0;

  function buildPalette() {
    if (!paletteList) return;
    var commands = [];

    /* HOME is not in the nav; the palette is where it lives. */
    var heroSection = document.querySelector("#hero");
    if (heroSection) {
      commands.push({ label: T("palette.home"), hint: "SECTION", run: function () {
        closeDialog(palette);
        scrollToTarget(heroSection, true);
      }});
    }

    Array.prototype.slice.call(document.querySelectorAll("[data-nav-link]")).forEach(function (link) {
      commands.push({ label: link.textContent.trim(), hint: "SECTION", run: function () {
        var target = document.querySelector(link.getAttribute("href"));
        closeDialog(palette);
        scrollToTarget(target, true);
      }});
    });

    Array.prototype.slice.call(document.querySelectorAll("main section[id]")).forEach(function (section) {
      var heading = section.querySelector("h1, h2");
      if (!heading) return;
      commands.push({ label: heading.textContent.replace(/\s+/g, " ").trim(), hint: "JUMP", run: function () {
        closeDialog(palette);
        scrollToTarget(section, true);
      }});
    });

    commands.push({ label: T("palette.cv"), hint: "FILE", run: function () {
      closeDialog(palette);
      window.location.href = "assets/docs/Aldan-Maulana-Fajri-CV.pdf";
    }});
    commands.push({ label: T("palette.contact"), hint: "FORM", run: function () {
      closeDialog(palette);
      openDialog(contactDialog);
    }});
    commands.push({ label: T("palette.theme"), hint: "SYSTEM", run: function () {
      closeDialog(palette);
      setTheme(document.documentElement.getAttribute("data-theme") === "light" ? "dark" : "light", true);
    }});

    paletteItems = commands;
    renderPalette(commands);
  }

  function renderPalette(items) {
    if (!paletteList) return;
    paletteList.innerHTML = "";
    paletteIndex = 0;

    if (!items.length) {
      paletteInput.removeAttribute("aria-activedescendant");
      var empty = document.createElement("li");
      empty.className = "palette__empty";
      empty.textContent = T("palette.empty");
      paletteList.appendChild(empty);
      return;
    }

    items.forEach(function (command, index) {
      var li = document.createElement("li");
      li.setAttribute("role", "presentation");

      var button = document.createElement("button");
      button.type = "button";
      button.className = "palette__item";
      button.setAttribute("role", "option");
      button.id = "palette-option-" + index;
      button.tabIndex = -1;
      button.setAttribute("aria-selected", String(index === 0));

      var label = document.createElement("span");
      label.textContent = command.label;

      var hint = document.createElement("small");
      hint.textContent = command.hint;

      button.appendChild(label);
      button.appendChild(hint);

      button.addEventListener("click", function () {
        command.run();
      });

      li.appendChild(button);
      paletteList.appendChild(li);
    });
    highlight(0);
  }

  function highlight(index) {
    if (!paletteList) return;
    var options = paletteList.querySelectorAll(".palette__item");
    if (!options.length) {
      paletteInput.removeAttribute("aria-activedescendant");
      return;
    }
    paletteIndex = Math.max(0, Math.min(index, options.length - 1));
    Array.prototype.forEach.call(options, function (option, i) {
      option.setAttribute("aria-selected", String(i === paletteIndex));
    });
    options[paletteIndex].scrollIntoView({ block: "nearest" });
    paletteInput.setAttribute("aria-activedescendant", options[paletteIndex].id);
  }

  function openPalette() {
    if (!palette) return;
    buildPalette();
    if (paletteInput) paletteInput.value = "";
    if (!palette.open) {
      lastFocus = document.activeElement;
      if (typeof palette.showModal === "function") {
        palette.showModal();
      } else {
        palette.setAttribute("open", "");
      }
      document.body.classList.add("is-locked");
    }
    if (paletteInput) {
      window.setTimeout(function () {
        paletteInput.focus();
      }, 30);
    }
  }

  document.querySelectorAll("[data-palette-open]").forEach(function (button) {
    button.addEventListener("click", openPalette);
  });

  if (palette) {
    palette.addEventListener("click", function (event) {
      if (event.target === palette) closeDialog(palette);
    });

    palette.addEventListener("close", function () {
      var anotherDialog = document.querySelector("dialog[open]");
      document.body.classList.toggle("is-locked", !!anotherDialog);
      if (!anotherDialog && lastFocus && typeof lastFocus.focus === "function") lastFocus.focus();
    });

    if (paletteInput) {
      paletteInput.addEventListener("input", function () {
        var query = paletteInput.value.toLowerCase().trim();
        var filtered = paletteItems.filter(function (command) {
          return (
            command.label.toLowerCase().indexOf(query) !== -1 ||
            command.hint.toLowerCase().indexOf(query) !== -1
          );
        });
        renderPalette(filtered);
      });
    }
  }

  document.addEventListener("keydown", function (event) {
    var isMac = /Mac|iPhone|iPad/.test(navigator.platform || "");
    var modifier = isMac ? event.metaKey : event.ctrlKey;

    if (modifier && event.key.toLowerCase() === "k") {
      event.preventDefault();
      if (palette && palette.open) {
        closeDialog(palette);
      } else {
        openPalette();
      }
      return;
    }

    if (!palette || !palette.open) return;

    if (event.key === "ArrowDown") {
      event.preventDefault();
      highlight(paletteIndex + 1);
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      highlight(paletteIndex - 1);
    } else if (event.key === "Enter") {
      var options = paletteList ? paletteList.querySelectorAll(".palette__item") : [];
      if (options[paletteIndex]) {
        event.preventDefault();
        options[paletteIndex].click();
      }
    }
  });

  /* --------------------------- BACK TO TOP ------------------------ */

  var backTop = document.querySelector("[data-back-top]");
  if (backTop) {
    backTop.addEventListener("click", function (event) {
      event.preventDefault();
      window.scrollTo({ top: 0, behavior: reduceMotion.matches ? "auto" : "smooth" });
      var brand = document.querySelector(".site-nav__brand");
      if (brand) brand.setAttribute("tabindex", "-1");
    });
  }

  /* ---------------------------- PARALLAX -------------------------- */

  var parallaxNodes = Array.prototype.slice.call(document.querySelectorAll("[data-parallax]"));
  var ticking = false;

  function applyParallax() {
    ticking = false;
    if (reduceMotion.matches || coarsePointer.matches) {
      parallaxNodes.forEach(function (node) { node.style.transform = ""; });
      return;
    }
    parallaxNodes.forEach(function (node) {
      var rect = node.getBoundingClientRect();
      if (rect.bottom < 0 || rect.top > window.innerHeight) return;
      var progress = (rect.top + rect.height / 2 - window.innerHeight / 2) / window.innerHeight;
      var shift = Math.max(-24, Math.min(24, progress * -18));
      node.style.transform = "scale(1.06) translateY(" + shift.toFixed(1) + "px)";
    });
  }

  function onScrollParallax() {
    if (ticking) return;
    ticking = true;
    window.requestAnimationFrame(applyParallax);
  }

  /* --------------------------- SCROLL HOOKS ----------------------- */

  var scrollHandler = function () {
    onScrollNav();
    onScrollParallax();
    checkReveals();
    if (backTop) {
      backTop.hidden = window.scrollY < 700;
    }
  };

  window.addEventListener("scroll", scrollHandler, { passive: true });
  window.addEventListener("resize", onScrollParallax);
  reduceMotion.addEventListener("change", onScrollParallax);
  coarsePointer.addEventListener("change", onScrollParallax);
  scrollHandler();

  /* Hide the mobile menu when a desktop width is restored. */
  window.matchMedia("(min-width: 901px)").addEventListener("change", function (event) {
    if (event.matches) closeNav();
  });

  /* Signal to the head watchdog that the enhanced layer is live, and cancel the
     fail-open fallback in case it already fired on a slow connection. */
  document.documentElement.removeAttribute("data-pending");
  document.documentElement.classList.remove("no-js");
  document.documentElement.setAttribute("data-ready", "");
})();
