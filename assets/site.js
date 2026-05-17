/* ============================================================
   Eden Life Experience Centre — site.js v3
   ============================================================ */

(function () {
  'use strict';

  /* ---- SCROLL: header shadow ---- */
  const header = document.getElementById('site-header');
  if (header) {
    const onScroll = () => {
      header.classList.toggle('scrolled', window.scrollY > 8);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  /* ---- MOBILE NAV TOGGLE ---- */
  const navToggle = document.getElementById('navToggle');
  const navMenu   = document.getElementById('navMenu');

  if (navToggle && navMenu) {
    navToggle.addEventListener('click', () => {
      const isOpen = navMenu.classList.toggle('open');
      navToggle.setAttribute('aria-expanded', isOpen);
      document.body.style.overflow = isOpen ? 'hidden' : '';
    });

    // Close on outside click
    document.addEventListener('click', (e) => {
      if (navMenu.classList.contains('open') &&
          !navMenu.contains(e.target) &&
          !navToggle.contains(e.target)) {
        navMenu.classList.remove('open');
        navToggle.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      }
    });

    // Close on Escape
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && navMenu.classList.contains('open')) {
        navMenu.classList.remove('open');
        navToggle.setAttribute('aria-expanded', 'false');
        navToggle.focus();
        document.body.style.overflow = '';
      }
    });
  }

  /* ---- DESKTOP DROPDOWN MENUS ---- */
  const dropdowns = document.querySelectorAll('.nav-dropdown');

  dropdowns.forEach((dd) => {
    const trigger = dd.querySelector('.dropdown-trigger');
    const menu    = dd.querySelector('.dropdown-menu');
    if (!trigger || !menu) return;

    const alignMenu = () => {
      // Use trigger position (always measurable) to decide alignment BEFORE opening
      const tr = dd.getBoundingClientRect();
      const menuW = 220; // min-width of dropdown
      const centreX = tr.left + tr.width / 2;
      const wouldOverflow = (centreX + menuW / 2) > (window.innerWidth - 12);
      menu.classList.toggle('align-right', wouldOverflow);
    };
    const open  = () => { alignMenu(); dd.classList.add('open'); trigger.setAttribute('aria-expanded', 'true'); };
    const close = () => { dd.classList.remove('open'); trigger.setAttribute('aria-expanded', 'false'); };

    // Hover (desktop)
    dd.addEventListener('mouseenter', open);
    dd.addEventListener('mouseleave', close);

    // Click (touch + keyboard)
    trigger.addEventListener('click', (e) => {
      if (window.innerWidth <= 768) {
        e.preventDefault();
        dd.classList.toggle('open');
        trigger.setAttribute('aria-expanded', dd.classList.contains('open'));
      } else {
        dd.classList.contains('open') ? close() : open();
      }
    });

    // Close when focus leaves
    dd.addEventListener('focusout', (e) => {
      if (!dd.contains(e.relatedTarget)) close();
    });

    // Keyboard navigation inside dropdown
    const items = menu.querySelectorAll('a');
    trigger.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowDown') { e.preventDefault(); open(); items[0]?.focus(); }
      if (e.key === 'Escape') close();
    });
    items.forEach((item, i) => {
      item.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowDown') { e.preventDefault(); items[i + 1]?.focus(); }
        if (e.key === 'ArrowUp')   { e.preventDefault(); i === 0 ? trigger.focus() : items[i - 1]?.focus(); }
        if (e.key === 'Escape')    { close(); trigger.focus(); }
      });
    });
  });

  /* ---- ACCORDION ---- */
  document.querySelectorAll('.accordion-trigger').forEach((trigger) => {
    trigger.addEventListener('click', () => {
      const item     = trigger.closest('.accordion-item');
      const body     = item?.querySelector('.accordion-body');
      const isOpen   = trigger.getAttribute('aria-expanded') === 'true';

      // Close all siblings in same group
      const group = trigger.closest('[data-accordion-group]');
      if (group) {
        group.querySelectorAll('.accordion-trigger[aria-expanded="true"]').forEach((t) => {
          if (t !== trigger) {
            t.setAttribute('aria-expanded', 'false');
            t.closest('.accordion-item')?.querySelector('.accordion-body')?.classList.remove('open');
          }
        });
      }

      trigger.setAttribute('aria-expanded', !isOpen);
      body?.classList.toggle('open', !isOpen);
    });
  });

  /* ---- AUTO-REVEAL: mark elements for scroll animation ---- */
  (function autoReveal() {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    if (!('IntersectionObserver' in window)) return;

    // Returns true if el already has a .reveal ancestor (parent handles the fade)
    function inReveal(el) {
      let n = el.parentElement;
      while (n && n !== document.body) {
        if (n.classList.contains('reveal')) return true;
        n = n.parentElement;
      }
      return false;
    }

    // Mark a single element; skip if already animated or inside a reveal block
    function mark(el, variant, delay) {
      if (!el || el.classList.contains('reveal') || inReveal(el)) return;
      el.classList.add('reveal');
      if (variant) el.classList.add(variant);
      if (delay)   el.style.transitionDelay = delay + 'ms';
    }

    // Mark a group of same-type siblings with a cascade stagger
    function markGroup(selector) {
      const byParent = new Map();
      document.querySelectorAll(selector).forEach((el) => {
        if (el.classList.contains('reveal') || inReveal(el)) return;
        const p = el.parentElement;
        if (!p) return;
        if (!byParent.has(p)) byParent.set(p, []);
        byParent.get(p).push(el);
      });
      byParent.forEach((els) => {
        els.forEach((el, i) => {
          el.classList.add('reveal');
          if (i > 0) el.style.transitionDelay = Math.min(i * 110, 550) + 'ms';
        });
      });
    }

    /* ── ALL PAGES: section labels ──────────────────────────── */
    document.querySelectorAll('.section-label').forEach((el) => mark(el, 'reveal-from-left'));

    /* ── ALL PAGES: CTA section content ─────────────────────── */
    document.querySelectorAll('.cta-section h2').forEach((el)    => mark(el, '', 60));
    document.querySelectorAll('.cta-section p:not(.section-label)').forEach((el) => mark(el, '', 160));
    document.querySelectorAll('.cta-section .btn-group').forEach((el) => mark(el, '', 280));

    /* ── ALL PAGES: card & item groups (staggered) ───────────── */
    markGroup('.info-card');
    markGroup('.schedule-item');
    markGroup('.card-link');
    markGroup('.pathway-step');

    /* ── ALL PAGES: page-section plain h2 (not inside reveal) ── */
    document.querySelectorAll('.page-section h2').forEach((el) => mark(el, '', 0));

    /* ── HOMEPAGE: scripture ──────────────────────────────────── */
    document.querySelectorAll('.scripture blockquote').forEach((el) => mark(el, '', 0));
    document.querySelectorAll('.scripture cite').forEach((el)        => mark(el, '', 120));

    /* ── HOMEPAGE: community slideshow ──────────────────────── */
    document.querySelectorAll('.collage-text > *').forEach((el, i) =>
      mark(el, i === 0 ? 'reveal-from-left' : '', i * 90)
    );
    mark(document.querySelector('.slideshow'), '', 120);

    /* ── HOMEPAGE: discipleship pathway ──────────────────────── */
    document.querySelectorAll('.pathway-top > *').forEach((el, i) => mark(el, '', i * 100));

    /* ── HOMEPAGE: campuses heading ──────────────────────────── */
    document.querySelectorAll('.campuses .section-title').forEach((el) => mark(el, '', 80));
    document.querySelectorAll('.campuses .section-label').forEach((el) => mark(el, 'reveal-from-left'));

    /* ── HOMEPAGE: pastor section ────────────────────────────── */
    mark(document.querySelector('.pastor-photo'), 'reveal-from-left', 0);
    document.querySelectorAll('.pastor-panel > *').forEach((el, i) => mark(el, '', i * 90));

    /* ── HOMEPAGE: events heading ────────────────────────────── */
    document.querySelectorAll('.events-top > *').forEach((el, i) => mark(el, '', i * 80));

    /* ── HOMEPAGE: full-bleed CTA ────────────────────────────── */
    document.querySelectorAll('.fullcta-body > *').forEach((el, i) => mark(el, '', i * 120));

  })();

  /* ---- SCROLL REVEAL ---- */
  if ('IntersectionObserver' in window && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );
    document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));
  } else {
    // Reduce-motion: show everything immediately
    document.querySelectorAll('.reveal').forEach((el) => el.classList.add('visible'));
  }

  /* ---- GIVING PAGE ---- */
  const giveForm = document.getElementById('giveForm');
  if (giveForm) {
    const amountBtns  = document.querySelectorAll('.amount-btn');
    const customInput = document.getElementById('customAmount');
    const payBtn      = document.getElementById('payBtn');
    const emailInput  = document.getElementById('donorEmail');
    const typeSelect  = document.getElementById('givingType');
    let selectedAmount = 0;

    // Amount selection
    amountBtns.forEach((btn) => {
      btn.addEventListener('click', () => {
        amountBtns.forEach((b) => { b.classList.remove('selected'); b.setAttribute('aria-pressed', 'false'); });
        btn.classList.add('selected');
        btn.setAttribute('aria-pressed', 'true');
        selectedAmount = parseInt(btn.dataset.amount, 10);
        if (customInput) { customInput.value = ''; customInput.removeAttribute('aria-invalid'); }
        updatePayBtn();
      });
    });

    if (customInput) {
      customInput.addEventListener('input', () => {
        amountBtns.forEach((b) => b.classList.remove('selected'));
        selectedAmount = parseInt(customInput.value, 10) || 0;
        updatePayBtn();
      });
    }

    function updatePayBtn() {
      if (!payBtn) return;
      const valid = selectedAmount >= 100;
      payBtn.disabled = !valid;
      payBtn.style.opacity = valid ? '1' : '.55';
    }

    // Giving tabs
    document.querySelectorAll('.giving-tab').forEach((tab) => {
      tab.addEventListener('click', () => {
        document.querySelectorAll('.giving-tab').forEach((t) => {
          t.classList.remove('active');
          t.setAttribute('aria-selected', 'false');
        });
        tab.classList.add('active');
        tab.setAttribute('aria-selected', 'true');
        const target = document.getElementById(tab.dataset.target);
        document.querySelectorAll('.giving-panel').forEach((p) => p.hidden = true);
        if (target) target.hidden = false;
      });
    });

    // Paystack payment
    if (payBtn) {
      payBtn.addEventListener('click', () => {
        const email  = emailInput?.value?.trim();
        const amount = customInput?.value ? parseInt(customInput.value, 10) : selectedAmount;
        const type   = typeSelect?.value || 'Offering';

        if (!email || !email.includes('@')) {
          showFieldError(emailInput, 'Please enter a valid email address.');
          emailInput?.focus();
          return;
        }
        if (!amount || amount < 100) {
          showNotice('Please select or enter an amount of at least ₦100.', 'warning');
          return;
        }

        // Check Paystack loaded
        if (typeof PaystackPop === 'undefined') {
          showNotice('Payment service is loading. Please try again in a moment.', 'warning');
          return;
        }

        payBtn.classList.add('btn-loading');
        payBtn.textContent = 'Opening payment…';

        const reference = 'EL_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9).toUpperCase();

        const handler = PaystackPop.setup({
          key:       'pk_live_YOUR_PAYSTACK_PUBLIC_KEY', // Replace with your actual Paystack public key
          email:     email,
          amount:    amount * 100, // Paystack uses kobo (smallest unit)
          currency:  'NGN',
          ref:       reference,
          metadata: {
            custom_fields: [
              { display_name: 'Giving Type', variable_name: 'giving_type', value: type },
              { display_name: 'Church',      variable_name: 'church',      value: 'Eden Life Experience Centre' }
            ]
          },
          callback: function (response) {
            payBtn.classList.remove('btn-loading');
            payBtn.textContent = 'Give Now';
            showNotice('Thank you! Your gift of ₦' + amount.toLocaleString() + ' has been received. Reference: ' + response.reference, 'success');
            giveForm.reset();
            amountBtns.forEach((b) => b.classList.remove('selected'));
            selectedAmount = 0;
            updatePayBtn();
          },
          onClose: function () {
            payBtn.classList.remove('btn-loading');
            payBtn.textContent = 'Give Now';
          }
        });
        handler.openIframe();
      });
    }

    function showFieldError(field, msg) {
      if (!field) return;
      field.setAttribute('aria-invalid', 'true');
      let err = field.parentElement.querySelector('.form-error');
      if (!err) {
        err = document.createElement('p');
        err.className = 'form-error';
        field.parentElement.appendChild(err);
      }
      err.textContent = msg;
      field.addEventListener('input', () => {
        field.removeAttribute('aria-invalid');
        if (err) err.remove();
      }, { once: true });
    }

    function showNotice(msg, type = 'info') {
      const area = document.getElementById('noticeArea');
      if (!area) return;
      area.innerHTML = '';
      const el = document.createElement('div');
      el.className = 'notice notice-' + type;
      el.setAttribute('role', 'alert');
      el.textContent = msg;
      area.appendChild(el);
      el.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      setTimeout(() => { if (area.contains(el)) el.remove(); }, 8000);
    }
  }

  /* ---- CONTACT FORM ---- */
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const btn = contactForm.querySelector('[type="submit"]');
      if (btn) {
        btn.textContent = 'Sending…';
        btn.disabled = true;
      }
      // Simulate submission — replace with real endpoint/FormSubmit/Netlify
      setTimeout(() => {
        const area = document.getElementById('contactNotice');
        if (area) {
          area.innerHTML = '<div class="notice notice-success" role="alert">Thank you for your message! We will get back to you within 24–48 hours.</div>';
          area.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }
        contactForm.reset();
        if (btn) { btn.textContent = 'Send Message'; btn.disabled = false; }
      }, 1200);
    });
  }

  /* ---- COMMUNITY SLIDESHOW ---- */
  const slideshowTrack = document.getElementById('slideshowTrack');
  if (slideshowTrack) {
    const slides   = slideshowTrack.querySelectorAll('.slide');
    const dots     = document.querySelectorAll('.slide-dots .dot');
    const prevBtn  = document.querySelector('.slide-prev');
    const nextBtn  = document.querySelector('.slide-next');
    const total    = slides.length;
    let current    = 0;
    let autoTimer  = null;
    const reduced  = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    function goTo(idx) {
      current = ((idx % total) + total) % total;
      slideshowTrack.style.transform = `translateX(-${current * 100}%)`;
      dots.forEach((d, i) => {
        const active = i === current;
        d.classList.toggle('active', active);
        d.setAttribute('aria-current', active ? 'true' : 'false');
      });
    }

    function startAuto() {
      if (reduced) return;
      clearInterval(autoTimer);
      autoTimer = setInterval(() => goTo(current + 1), 4500);
    }

    function stopAuto() { clearInterval(autoTimer); }

    prevBtn?.addEventListener('click', () => { goTo(current - 1); startAuto(); });
    nextBtn?.addEventListener('click', () => { goTo(current + 1); startAuto(); });
    dots.forEach((d, i) => d.addEventListener('click', () => { goTo(i); startAuto(); }));

    // Keyboard arrows when slideshow is focused
    slideshowTrack.closest('.slideshow')?.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowLeft')  { goTo(current - 1); startAuto(); }
      if (e.key === 'ArrowRight') { goTo(current + 1); startAuto(); }
    });

    // Touch swipe
    let touchStartX = 0;
    slideshowTrack.addEventListener('touchstart', (e) => {
      touchStartX = e.touches[0].clientX;
    }, { passive: true });
    slideshowTrack.addEventListener('touchend', (e) => {
      const dx = e.changedTouches[0].clientX - touchStartX;
      if (Math.abs(dx) > 44) { goTo(dx < 0 ? current + 1 : current - 1); startAuto(); }
    }, { passive: true });

    // Pause on hover
    const slideshowEl = slideshowTrack.closest('.slideshow');
    slideshowEl?.addEventListener('mouseenter', stopAuto);
    slideshowEl?.addEventListener('mouseleave', startAuto);

    // Disable transition if reduced-motion
    if (reduced) slideshowTrack.style.transition = 'none';

    startAuto();
  }

  /* ---- TYPEWRITER (homepage hero only) ---- */
  const twTarget = document.querySelector('.hero-h1 .hl');
  if (twTarget) {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!reducedMotion) {
      const words = ['People.', 'Disciples.', 'Leaders.', 'Communities.'];
      let wIdx    = 0;
      let cIdx    = 0;
      let erasing = false;

      // Empty the span — we'll type the first word in
      twTarget.textContent = '';

      // Cursor element (after the span, so underline stays on typed text)
      const cur = document.createElement('span');
      cur.className = 'tw-cursor';
      cur.setAttribute('aria-hidden', 'true');
      twTarget.after(cur);

      // Keep a static accessible label so screen readers aren't confused
      const h1 = twTarget.closest('h1');
      if (h1) h1.setAttribute('aria-label', 'We Equip People, Disciples, Leaders, Communities');

      function twTick() {
        const word = words[wIdx];
        if (!erasing) {
          cIdx++;
          twTarget.textContent = word.slice(0, cIdx);
          if (cIdx === word.length) {
            erasing = true;
            setTimeout(twTick, 1900);   // pause before erasing
          } else {
            setTimeout(twTick, 88);     // typing speed
          }
        } else {
          cIdx--;
          twTarget.textContent = word.slice(0, cIdx);
          if (cIdx === 0) {
            erasing = false;
            wIdx    = (wIdx + 1) % words.length;
            setTimeout(twTick, 320);    // pause before next word
          } else {
            setTimeout(twTick, 48);     // erasing speed
          }
        }
      }

      // Start after hero entrance animation finishes (~hero-foot delay 0.54s + duration 0.65s)
      setTimeout(twTick, 1000);
    }
  }


  /* ---- ACTIVE NAV LINK ---- */
  const path = window.location.pathname;
  document.querySelectorAll('.nav-link, .dropdown-menu a').forEach((link) => {
    const href = link.getAttribute('href');
    if (!href) return;
    const linkPath = new URL(href, window.location.origin).pathname;
    if (linkPath === path || (path.startsWith(linkPath) && linkPath !== '/')) {
      link.classList.add('active');
      link.setAttribute('aria-current', 'page');
    }
  });

})();
