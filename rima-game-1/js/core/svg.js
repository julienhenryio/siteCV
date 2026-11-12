/* Core helpers: namespace, SVG building, colors, shared <defs>.
   Loaded first. Must not touch `document` at load time (tools/build-assets.mjs evaluates it in Node). */
(function (G) {
  'use strict';
  var NS = 'http://www.w3.org/2000/svg';
  var counter = 0;
  G.uid = function (p) { return (p || 'u') + (++counter); };

  /* ---------- SVG ---------- */
  var svg = G.svg = {
    NS: NS,

    /* Create an <svg> element from markup. */
    make: function (viewBox, markup, cls) {
      var s = document.createElementNS(NS, 'svg');
      s.setAttribute('viewBox', viewBox);
      s.setAttribute('xmlns', NS);
      if (cls) s.setAttribute('class', cls);
      if (markup) s.innerHTML = markup;
      return s;
    },

    /* Parse SVG markup into a detached <g>. */
    group: function (markup) {
      var g = document.createElementNS(NS, 'g');
      g.innerHTML = markup || '';
      return g;
    },

    /* Symmetric closed path around a vertical axis (default x=300, the doll's centre).
       start: [x,y]; segs: [x,y] line, [cx,cy,x,y] quadratic, [c1x,c1y,c2x,c2y,x,y] cubic.
       Describe the left half from top to bottom; the right half is mirrored. */
    sym: function (start, segs, cx) {
      cx = cx == null ? 300 : cx;
      var m = function (x) { return Math.round((2 * cx - x) * 100) / 100; };
      var d = 'M' + start[0] + ',' + start[1];
      var pts = [start];
      segs.forEach(function (s) {
        if (s.length === 2) { d += ' L' + s[0] + ',' + s[1]; pts.push([s[0], s[1]]); }
        else if (s.length === 4) { d += ' Q' + s[0] + ',' + s[1] + ' ' + s[2] + ',' + s[3]; pts.push([s[2], s[3]]); }
        else { d += ' C' + s[0] + ',' + s[1] + ' ' + s[2] + ',' + s[3] + ' ' + s[4] + ',' + s[5]; pts.push([s[4], s[5]]); }
      });
      var last = pts[pts.length - 1];
      if (last[0] !== cx) d += ' L' + m(last[0]) + ',' + last[1];
      for (var i = segs.length - 1; i >= 0; i--) {
        var s = segs[i], p = pts[i];
        if (s.length === 2) d += ' L' + m(p[0]) + ',' + p[1];
        else if (s.length === 4) d += ' Q' + m(s[0]) + ',' + s[1] + ' ' + m(p[0]) + ',' + p[1];
        else d += ' C' + m(s[2]) + ',' + s[3] + ' ' + m(s[0]) + ',' + s[1] + ' ' + m(p[0]) + ',' + p[1];
      }
      return d + ' Z';
    },

    /* Markup plus its mirror image around x = cx. */
    mir: function (markup, cx) {
      cx = cx == null ? 300 : cx;
      return markup + '<g transform="matrix(-1 0 0 1 ' + (2 * cx) + ' 0)">' + markup + '</g>';
    },

    /* Client (screen) coordinates -> user coordinates of an svg element. */
    pt: function (el, clientX, clientY) {
      var root = el.ownerSVGElement || el;
      var p = root.createSVGPoint();
      p.x = clientX; p.y = clientY;
      var ctm = el.getScreenCTM();
      if (!ctm) return { x: 0, y: 0 };
      var r = p.matrixTransform(ctm.inverse());
      return { x: r.x, y: r.y };
    },

    star: function (cx, cy, r, inner, n) {
      n = n || 5; inner = inner == null ? r * 0.45 : inner;
      var d = '';
      for (var i = 0; i < n * 2; i++) {
        var a = Math.PI * i / n - Math.PI / 2, rr = i % 2 ? inner : r;
        d += (i ? 'L' : 'M') + (cx + Math.cos(a) * rr).toFixed(1) + ',' + (cy + Math.sin(a) * rr).toFixed(1);
      }
      return d + 'Z';
    },

    heart: function (cx, cy, s) {
      // s = half width
      var x = cx, y = cy;
      return 'M' + x + ',' + (y + s * 0.9) +
        ' C' + (x - s * 1.5) + ',' + (y - s * 0.1) + ' ' + (x - s * 0.9) + ',' + (y - s * 1.2) + ' ' + x + ',' + (y - s * 0.45) +
        ' C' + (x + s * 0.9) + ',' + (y - s * 1.2) + ' ' + (x + s * 1.5) + ',' + (y - s * 0.1) + ' ' + x + ',' + (y + s * 0.9) + 'Z';
    },

    /* Four-point sparkle. */
    spark: function (cx, cy, r) {
      var k = r * 0.22;
      return 'M' + cx + ',' + (cy - r) + ' Q' + (cx + k) + ',' + (cy - k) + ' ' + (cx + r) + ',' + cy +
        ' Q' + (cx + k) + ',' + (cy + k) + ' ' + cx + ',' + (cy + r) +
        ' Q' + (cx - k) + ',' + (cy + k) + ' ' + (cx - r) + ',' + cy +
        ' Q' + (cx - k) + ',' + (cy - k) + ' ' + cx + ',' + (cy - r) + 'Z';
    }
  };

  /* ---------- Colors ---------- */
  function rgb(hex) {
    hex = String(hex).replace('#', '');
    if (hex.length === 3) hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
    var n = parseInt(hex, 16);
    return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
  }
  function hex(r, g, b) {
    var h = function (v) { v = Math.max(0, Math.min(255, Math.round(v))); return (v < 16 ? '0' : '') + v.toString(16); };
    return '#' + h(r) + h(g) + h(b);
  }
  var color = G.color = {
    rgb: rgb, hex: hex,
    mix: function (a, b, t) {
      var x = rgb(a), y = rgb(b);
      return hex(x[0] + (y[0] - x[0]) * t, x[1] + (y[1] - x[1]) * t, x[2] + (y[2] - x[2]) * t);
    },
    light: function (c, t) { return color.mix(c, '#ffffff', t); },
    /* Darken toward a deep plum rather than black: keeps outlines warm. */
    dark: function (c, t) { return color.mix(c, '#3b0f33', t); },
    hsl: function (c) {
      var v = rgb(c), r = v[0] / 255, g = v[1] / 255, b = v[2] / 255;
      var mx = Math.max(r, g, b), mn = Math.min(r, g, b), h = 0, s = 0, l = (mx + mn) / 2;
      if (mx !== mn) {
        var d = mx - mn;
        s = l > 0.5 ? d / (2 - mx - mn) : d / (mx + mn);
        if (mx === r) h = (g - b) / d + (g < b ? 6 : 0);
        else if (mx === g) h = (b - r) / d + 2;
        else h = (r - g) / d + 4;
        h *= 60;
      }
      return [h, s, l];
    },
    /* Rough color family, used by challenges ("wear something pink"). */
    family: function (c) {
      var v = color.hsl(c), h = v[0], s = v[1], l = v[2];
      if (l > 0.9 && s < 0.5) return 'white';
      if (l < 0.16) return 'black';
      if (s < 0.14) return l > 0.7 ? 'white' : (l < 0.3 ? 'black' : 'grey');
      if (h < 14 || h >= 345) return l > 0.62 ? 'pink' : 'red';
      if (h < 42) return l < 0.45 ? 'brown' : 'orange';
      if (h < 70) return 'yellow';
      if (h < 165) return 'green';
      if (h < 255) return 'blue';
      if (h < 290) return 'purple';
      return 'pink';
    },
    key: function (c) { return String(c).replace('#', '').toLowerCase(); }
  };

  /* ---------- Shared <defs> (patterns, gradients, masks) ----------
     One hidden <svg> holds every shared definition. Every other SVG in the page
     references them by id. Photo export copies them into the exported image. */
  G.defs = {
    seen: {},
    root: null,
    _root: function () {
      if (this.root) return this.root;
      var s = svg.make('0 0 1 1', '<defs></defs>');
      // Must stay "rendered" (not display:none, not zero-sized) or browsers drop the patterns.
      s.setAttribute('width', '2'); s.setAttribute('height', '2');
      s.setAttribute('aria-hidden', 'true');
      s.style.cssText = 'position:absolute;left:-9px;top:-9px;width:2px;height:2px;overflow:hidden;pointer-events:none';
      s.id = 'g-defs';
      document.body.insertBefore(s, document.body.firstChild);
      this.root = s.firstChild;
      return this.root;
    },
    ensure: function (id, markup) {
      if (this.seen[id]) return id;
      this.seen[id] = markup;
      var g = svg.group(markup), r = this._root();
      while (g.firstChild) r.appendChild(g.firstChild);
      return id;
    },
    all: function () {
      var out = '';
      for (var k in this.seen) out += this.seen[k];
      return out;
    },
    /* Soft radial blob of one color (blush, glows). */
    radial: function (c, inner) {
      var id = 'rg-' + color.key(c) + (inner ? '-' + Math.round(inner * 100) : '');
      this.ensure(id, '<radialGradient id="' + id + '"><stop offset="' + (inner || 0) + '" stop-color="' + c +
        '" stop-opacity="1"/><stop offset="1" stop-color="' + c + '" stop-opacity="0"/></radialGradient>');
      return 'url(#' + id + ')';
    },
    /* Vertical two-stop gradient. */
    linear: function (a, b, horizontal) {
      var id = 'lg-' + color.key(a) + '-' + color.key(b) + (horizontal ? 'h' : '');
      this.ensure(id, '<linearGradient id="' + id + '" x1="0" y1="0" x2="' + (horizontal ? 1 : 0) + '" y2="' + (horizontal ? 0 : 1) +
        '"><stop offset="0" stop-color="' + a + '"/><stop offset="1" stop-color="' + b + '"/></linearGradient>');
      return 'url(#' + id + ')';
    }
  };
})(window.Game = window.Game || {});
