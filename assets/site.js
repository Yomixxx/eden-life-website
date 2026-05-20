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

  /* ---- SCROLL REVEAL (IO fallback — GSAP takes over if available) ---- */
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
    window._edenIO = observer; // exposed so GSAP can disconnect on takeover
  } else {
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

  /* ---- WHATSAPP FLOAT ---- */
  (function () {
    const wa = document.createElement('a');
    wa.href = 'https://wa.me/2348000000000';
    wa.target = '_blank';
    wa.rel = 'noopener noreferrer';
    wa.setAttribute('aria-label', 'Chat with Eden Life on WhatsApp');
    wa.className = 'wa-float';
    wa.innerHTML = '<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" fill="#fff"/></svg>';
    document.body.appendChild(wa);
  }());

  /* ── GSAP + SCROLLTRIGGER + LENIS ──────────────────────── */
  (function initMotion() {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const SRCS = [
      'https://cdn.jsdelivr.net/npm/lenis@1.1.14/dist/lenis.min.js',
      'https://cdn.jsdelivr.net/npm/gsap@3.12.5/dist/gsap.min.js',
      'https://cdn.jsdelivr.net/npm/gsap@3.12.5/dist/ScrollTrigger.min.js',
    ];

    (function loadSeq(i) {
      if (i >= SRCS.length) { onReady(); return; }
      const s = document.createElement('script');
      s.src = SRCS[i];
      s.onload = () => loadSeq(i + 1);
      document.head.appendChild(s);
    }(0));

    function onReady() {
      gsap.registerPlugin(ScrollTrigger);

      /* ── Lenis smooth scroll ────────────────────────── */
      const lenis = new Lenis({
        duration: 1.4,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothTouch: false,
      });
      lenis.on('scroll', ScrollTrigger.update);
      gsap.ticker.add((time) => lenis.raf(time * 1000));
      gsap.ticker.lagSmoothing(0);

      /* ── IO owns all .reveal fades; GSAP handles images, parallax, cursor ── */
      // IO reliably handles every .reveal element on every page via CSS transitions.
      // Keeping IO running avoids any gap where a .reveal container could stay hidden.
      // GSAP only enhances with effects IO cannot produce (scale, scrub, cursor).
      const E = 'power3.out';

      /* Images — scale expansion reveal */
      gsap.utils.toArray('img').forEach((img) => {
        const wrap = img.closest('.page-section, .page-hero, .event-card, .sermon-card, [class*="card"], [class*="tile"], [class*="photo"], [class*="collage"], [class*="pastor"]');
        if (!wrap) return;
        gsap.fromTo(img,
          { scale: 1.08, opacity: 0 },
          { scale: 1, opacity: 1, duration: 1.65, ease: 'power2.out',
            scrollTrigger: { trigger: img, start: 'top 93%', once: true } }
        );
      });

      /* Hero bg parallax */
      gsap.utils.toArray('.page-hero-bg').forEach((bg) => {
        gsap.to(bg, { yPercent: 20, ease: 'none',
          scrollTrigger: { trigger: bg.closest('.page-hero'), start: 'top top', end: 'bottom top', scrub: 1.8 } });
      });

      /* Large image parallax depth */
      gsap.utils.toArray('.pastor-photo img, .campus-tile-img').forEach((img) => {
        gsap.to(img, { yPercent: 10, ease: 'none',
          scrollTrigger: { trigger: img.closest('section, .pastor, .campus-tile') || img,
            start: 'top bottom', end: 'bottom top', scrub: 2 } });
      });

      /* ── Custom cursor ──────────────────────────────── */
      if (window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
        const dot  = document.createElement('div'); dot.className  = 'el-cur-dot';
        const ring = document.createElement('div'); ring.className = 'el-cur-ring';
        document.body.append(dot, ring);
        document.body.classList.add('has-custom-cursor');
        gsap.set([dot, ring], { xPercent: -50, yPercent: -50, x: -200, y: -200 });

        window.addEventListener('mousemove', (e) => {
          gsap.to(dot,  { x: e.clientX, y: e.clientY, duration: 0.08, ease: 'none',       overwrite: true });
          gsap.to(ring, { x: e.clientX, y: e.clientY, duration: 0.55, ease: 'power3.out', overwrite: true });
        });

        document.querySelectorAll('a, button, .btn, .sermon-card, .event-card, .info-card, .campus-tile, .pathway-step, .card-link, .accordion-trigger, .amount-btn').forEach((el) => {
          el.addEventListener('mouseenter', () => {
            gsap.to(ring, { scale: 2.5, borderColor: 'rgba(94,201,87,.9)', duration: 0.3, ease: 'power2.out' });
            gsap.to(dot,  { scale: 0.35, duration: 0.3, ease: 'power2.out' });
          });
          el.addEventListener('mouseleave', () => {
            gsap.to(ring, { scale: 1, borderColor: 'rgba(94,201,87,.5)', duration: 0.4, ease: 'power2.out' });
            gsap.to(dot,  { scale: 1, duration: 0.35, ease: 'power2.out' });
          });
        });
      }
    }
  }());

})();
