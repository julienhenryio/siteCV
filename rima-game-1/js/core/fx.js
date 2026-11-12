/* Visual effects: sparkles, hearts, bubbles, confetti, camera flash.
   Particles live in the fixed #fx layer and are positioned in screen coordinates. */
(function (G) {
  'use strict';
  var S = G.svg;

  var SHAPES = {
    sparkle: function (c) { return '<path d="' + S.spark(12, 12, 11) + '" fill="' + c + '" stroke="#fff" stroke-width="1"/>'; },
    heart: function (c) { return '<path d="' + S.heart(12, 12, 9) + '" fill="' + c + '" stroke="#fff" stroke-width="1.5"/>'; },
    star: function (c) { return '<path d="' + S.star(12, 12, 11) + '" fill="' + c + '" stroke="#fff" stroke-width="1.5"/>'; },
    bubble: function () { return '<circle cx="12" cy="12" r="10" fill="rgba(255,255,255,.75)" stroke="#9fdcff" stroke-width="1.5"/><circle cx="8.500" cy="8.500" r="2.500" fill="#fff"/>'; },
    drop: function () { return '<path d="M12,2 C6,11 4,14 4,17 C4,21 8,23 12,23 C16,23 20,21 20,17 C20,14 18,11 12,2 Z" fill="#8fd8ff" stroke="#fff" stroke-width="1.5"/>'; },
    confetti: function (c) { return '<rect x="6" y="9" width="12" height="6" rx="2" fill="' + c + '"/>'; }
  };
  var COLORS = ['#ff4fa8', '#ffd84a', '#ffffff', '#b983ff', '#7fd4ff', '#ff8fd0'];

  function layer() { return document.getElementById('fx'); }
  function reduced() { return window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches; }

  var F = G.fx = {
    /* Burst of particles at screen position (x, y).
       opts: kind, n, colors, spread (px), size (px), rise (negative = float up), dur (ms) */
    burst: function (x, y, opts) {
      var L = layer();
      if (!L || reduced()) return;
      opts = opts || {};
      var kind = opts.kind || 'sparkle', n = opts.n || 8, cols = opts.colors || COLORS;
      var spread = opts.spread || 70, size = opts.size || 22, dur = opts.dur || 750;
      for (var i = 0; i < n; i++) {
        var el = document.createElement('div');
        var sz = size * (0.6 + Math.random() * 0.8);
        el.className = 'p';
        el.innerHTML = '<svg viewBox="0 0 24 24" width="' + sz + '" height="' + sz + '">' + (SHAPES[kind] || SHAPES.sparkle)(cols[i % cols.length]) + '</svg>';
        L.appendChild(el);
        var a = Math.random() * Math.PI * 2, d = spread * (0.35 + Math.random() * 0.65);
        var dx = Math.cos(a) * d, dy = Math.sin(a) * d + (opts.rise || 0);
        var rot = (Math.random() - 0.5) * 240;
        var anim = el.animate([
          { transform: 'translate(' + (x - sz / 2) + 'px,' + (y - sz / 2) + 'px) scale(0.2) rotate(0deg)', opacity: 1 },
          { transform: 'translate(' + (x - sz / 2 + dx * 0.7) + 'px,' + (y - sz / 2 + dy * 0.7) + 'px) scale(1) rotate(' + rot * 0.6 + 'deg)', opacity: 1, offset: 0.5 },
          { transform: 'translate(' + (x - sz / 2 + dx) + 'px,' + (y - sz / 2 + dy) + 'px) scale(0.3) rotate(' + rot + 'deg)', opacity: 0 }
        ], { duration: dur * (0.7 + Math.random() * 0.6), easing: 'ease-out' });
        anim.onfinish = (function (e) { return function () { e.remove(); }; })(el);
      }
    },

    /* Same, but at a point given in an SVG element's own coordinates. */
    at: function (svgEl, sx, sy, opts) {
      var p = F.screen(svgEl, sx, sy);
      F.burst(p.x, p.y, opts);
    },
    screen: function (svgEl, sx, sy) {
      var root = svgEl.ownerSVGElement || svgEl, pt = root.createSVGPoint();
      pt.x = sx; pt.y = sy;
      var m = svgEl.getScreenCTM();
      if (!m) return { x: 0, y: 0 };
      var r = pt.matrixTransform(m);
      return { x: r.x, y: r.y };
    },
    /* Burst at the centre of any element. */
    on: function (el, opts) {
      var r = el.getBoundingClientRect();
      F.burst(r.left + r.width / 2, r.top + r.height / 2, opts);
    },

    confetti: function () {
      var L = layer();
      if (!L || reduced()) return;
      var w = window.innerWidth, h = window.innerHeight;
      for (var i = 0; i < 70; i++) {
        var el = document.createElement('div'), kind = i % 4 === 0 ? 'heart' : i % 4 === 1 ? 'star' : 'confetti';
        el.className = 'p';
        el.innerHTML = '<svg viewBox="0 0 24 24" width="22" height="22">' + SHAPES[kind](COLORS[i % COLORS.length]) + '</svg>';
        L.appendChild(el);
        var x = Math.random() * w, drift = (Math.random() - 0.5) * 200, rot = (Math.random() - 0.5) * 900;
        var anim = el.animate([
          { transform: 'translate(' + x + 'px,-30px) rotate(0deg)', opacity: 1 },
          { transform: 'translate(' + (x + drift) + 'px,' + (h + 30) + 'px) rotate(' + rot + 'deg)', opacity: 1 }
        ], { duration: 1600 + Math.random() * 1600, delay: Math.random() * 500, easing: 'cubic-bezier(.2,.4,.6,1)', fill: 'backwards' });
        anim.onfinish = (function (e) { return function () { e.remove(); }; })(el);
      }
    },

    flash: function () {
      var L = layer();
      if (!L) return;
      var el = document.createElement('div');
      el.className = 'flash';
      L.appendChild(el);
      var anim = el.animate([{ opacity: 0.95 }, { opacity: 0 }], { duration: 420, easing: 'ease-out' });
      anim.onfinish = function () { el.remove(); };
    }
  };
})(window.Game);
