/**
 * main.js
 * Page interactions: pill alignment, product hover, scroll behaviour.
 */

(function () {
  'use strict';

  /* ── Best Seller pill: vertically centered via CSS, no JS needed ── */
  function alignPill() {
    // Pill is centered via CSS transform: translateY(-50%) top: 50%
  }

  /* ── Nav: transparent → solid on scroll ───────────────────── */
  function handleNavScroll() {
    const nav = document.querySelector('nav');
    if (!nav) return;

    function update() {
      if (window.scrollY > 60) {
        nav.classList.add('scrolled');
      } else {
        nav.classList.remove('scrolled');
      }
    }

    window.addEventListener('scroll', update, { passive: true });
    update(); // set correct state on initial load
  }

  /* ── Sticky bar: hide when footer is in view ─────────────── */
  function handleStickyBar() {
    const bar    = document.querySelector('.sticky-bar');
    const footer = document.querySelector('footer');
    if (!bar || !footer) return;

    const obs = new IntersectionObserver(
      ([entry]) => { bar.style.opacity = entry.isIntersecting ? '0' : '1'; },
      { threshold: 0.1 }
    );
    obs.observe(footer);
  }

  /* ── Scroll-reveal: fade sections in on scroll ───────────── */
  function handleScrollReveal() {
    const targets = document.querySelectorAll(
      '.section-card, .phil-card, .proof-section .section-inner, .community-wrap, .review-stats-row'
    );
    if (!targets.length) return;

    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.style.opacity  = '1';
            entry.target.style.transform = 'translateY(0)';
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.08 }
    );

    targets.forEach(el => {
      el.style.opacity   = '0';
      el.style.transform = 'translateY(32px)';
      el.style.transition = 'opacity 0.7s ease, transform 0.7s ease';
      obs.observe(el);
    });
  }

  /* ── Init ─────────────────────────────────────────────────── */
  function init() {
    alignPill();
    handleNavScroll();
    handleStickyBar();
    handleScrollReveal();

    // Re-align pill after fonts load
    setTimeout(alignPill, 150);
    window.addEventListener('resize', alignPill, { passive: true });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
