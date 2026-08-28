/* ═══════════════════════════════════════════════════════════════
   Batik — bascule de thème + révélations au défilement
   Source : design_system/v3-batik.html

   Le thème est posé sur <html> AVANT le rendu par le script inline
   du <head> (voir les pages). Ce fichier ne gère que l'interaction.
   ═══════════════════════════════════════════════════════════════ */
(function () {
  'use strict';

  var root = document.documentElement;
  var KEY = 'batik-theme';
  var mq = window.matchMedia ? window.matchMedia('(prefers-color-scheme: dark)') : null;

  function stored() {
    try { return localStorage.getItem(KEY); } catch (e) { return null; }
  }
  function remember(theme) {
    try { localStorage.setItem(KEY, theme); } catch (e) { /* navigation privée */ }
  }
  function current() {
    return root.getAttribute('data-theme') || (mq && mq.matches ? 'malam' : 'terang');
  }

  function paint(theme) {
    root.setAttribute('data-theme', theme);
    document.querySelectorAll('[data-theme-toggle]').forEach(function (b) {
      b.setAttribute('aria-label', theme === 'malam' ? 'Passer en thème jour' : 'Passer en thème nuit');
      b.setAttribute('aria-pressed', theme === 'malam' ? 'true' : 'false');
    });
  }

  paint(current());

  document.querySelectorAll('[data-theme-toggle]').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var next = current() === 'malam' ? 'terang' : 'malam';
      remember(next);
      paint(next);
    });
  });

  /* Tant que personne n'a choisi, on suit le système en direct. */
  if (mq && mq.addEventListener) {
    mq.addEventListener('change', function (e) {
      if (!stored()) paint(e.matches ? 'malam' : 'terang');
    });
  }

  /* ── Révélations au défilement ── */
  var els = document.querySelectorAll('.rv');
  if (!els.length) return;

  if (!('IntersectionObserver' in window)) {
    els.forEach(function (el) { el.classList.add('on'); });
    return;
  }
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (e.isIntersecting) { e.target.classList.add('on'); io.unobserve(e.target); }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

  els.forEach(function (el) { io.observe(el); });

  /* Filet : tout ce qui est déjà visible au chargement s'affiche. */
  setTimeout(function () {
    els.forEach(function (el) {
      if (el.getBoundingClientRect().top < window.innerHeight) el.classList.add('on');
    });
  }, 80);
})();
