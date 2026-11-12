/* Fabric patterns. Every recolorable item can use any of these with any color.
   To add a pattern: add an entry to `defs` (a function returning the tile) and to `list`. */
(function (G) {
  'use strict';
  var S = G.svg, C = G.color;

  function motif(c) {
    // motif color that stays visible on both light and dark bases
    return C.hsl(c)[2] > 0.72 ? C.mix(c, '#e0358f', 0.55) : C.light(c, 0.62);
  }

  var defs = {
    hearts: function (c) {
      var m = motif(c);
      return { w: 44, h: 44, body: '<path d="' + S.heart(11, 12, 7) + '" fill="' + m + '"/><path d="' + S.heart(33, 34, 7) + '" fill="' + m + '"/>' };
    },
    stripes: function (c) {
      return { w: 22, h: 22, rot: 45, body: '<rect width="11" height="22" fill="' + motif(c) + '"/>' };
    },
    plaid: function (c) {
      var d = C.dark(c, 0.35);
      return { w: 44, h: 44, body:
        '<rect x="0" y="0" width="44" height="14" fill="' + d + '" opacity=".45"/>' +
        '<rect x="0" y="0" width="14" height="44" fill="' + d + '" opacity=".45"/>' +
        '<rect x="0" y="27" width="44" height="3" fill="#fff" opacity=".6"/>' +
        '<rect x="27" y="0" width="3" height="44" fill="#fff" opacity=".6"/>' };
    },
    stars: function (c) {
      var m = motif(c);
      return { w: 46, h: 46, body: '<path d="' + S.star(12, 12, 9) + '" fill="' + m + '"/><path d="' + S.star(35, 35, 9) + '" fill="' + m + '"/>' };
    },
    dots: function (c) {
      var m = motif(c);
      return { w: 34, h: 34, body: '<circle cx="9" cy="9" r="5.5" fill="' + m + '"/><circle cx="26" cy="26" r="5.5" fill="' + m + '"/>' };
    },
    glitter: function (c) {
      var b = '', seed = 7;
      var rnd = function () { seed = (seed * 16807) % 2147483647; return seed / 2147483647; };
      for (var i = 0; i < 26; i++) {
        var x = rnd() * 60, y = rnd() * 60, r = 0.8 + rnd() * 1.6;
        b += '<circle cx="' + x.toFixed(1) + '" cy="' + y.toFixed(1) + '" r="' + r.toFixed(1) + '" fill="' + (i % 3 ? '#fff' : C.light(c, 0.5)) + '" opacity="' + (0.45 + rnd() * 0.5).toFixed(2) + '"/>';
      }
      b += '<path d="' + S.spark(15, 18, 7) + '" fill="#fff"/><path d="' + S.spark(44, 42, 9) + '" fill="#fff"/><path d="' + S.spark(46, 10, 4) + '" fill="#fff" opacity=".8"/>';
      return { w: 60, h: 60, body: b };
    },
    leopard: function (c) {
      var d = C.dark(c, 0.62), m = C.dark(c, 0.25);
      var spot = function (x, y, r) {
        return '<ellipse cx="' + x + '" cy="' + y + '" rx="' + (r * 0.6) + '" ry="' + (r * 0.45) + '" fill="' + m + '"/>' +
          '<path d="M' + (x - r) + ',' + y + ' Q' + (x - r) + ',' + (y - r * 0.9) + ' ' + x + ',' + (y - r * 0.8) + '" fill="none" stroke="' + d + '" stroke-width="3.2" stroke-linecap="round"/>' +
          '<path d="M' + (x + r) + ',' + (y + 1) + ' Q' + (x + r) + ',' + (y + r * 0.9) + ' ' + (x - 2) + ',' + (y + r * 0.8) + '" fill="none" stroke="' + d + '" stroke-width="3.2" stroke-linecap="round"/>';
      };
      return { w: 60, h: 60, body: spot(14, 14, 8) + spot(44, 26, 9) + spot(22, 46, 8) + '<circle cx="50" cy="52" r="2.5" fill="' + d + '"/><circle cx="34" cy="6" r="2" fill="' + d + '"/>' };
    },
    flowers: function (c) {
      var m = motif(c);
      var fl = function (x, y) {
        var b = '';
        for (var i = 0; i < 5; i++) {
          var a = Math.PI * 2 * i / 5;
          b += '<circle cx="' + (x + Math.cos(a) * 5.5).toFixed(1) + '" cy="' + (y + Math.sin(a) * 5.5).toFixed(1) + '" r="4" fill="' + m + '"/>';
        }
        return b + '<circle cx="' + x + '" cy="' + y + '" r="3" fill="#ffe14d"/>';
      };
      return { w: 52, h: 52, body: fl(13, 13) + fl(39, 39) };
    },
    holo: function (c) {
      G.defs.ensure('holo-grad', '<linearGradient id="holo-grad" x1="0" y1="0" x2="1" y2="1">' +
        '<stop offset="0" stop-color="#ff9de6"/><stop offset=".25" stop-color="#b9a4ff"/><stop offset=".5" stop-color="#8fe9ff"/>' +
        '<stop offset=".75" stop-color="#b6ffcf"/><stop offset="1" stop-color="#fff3a0"/></linearGradient>');
      return { w: 120, h: 120, body: '<rect width="120" height="120" fill="url(#holo-grad)" opacity=".78"/>' +
        '<path d="' + S.spark(30, 30, 9) + '" fill="#fff"/><path d="' + S.spark(88, 78, 12) + '" fill="#fff"/><path d="' + S.spark(92, 22, 5) + '" fill="#fff"/><path d="' + S.spark(24, 96, 6) + '" fill="#fff"/>' };
    }
  };

  G.patterns = {
    /* order shown in the pattern picker; `unlock` = stars needed */
    list: [
      { id: 'solid' }, { id: 'hearts' }, { id: 'stripes' }, { id: 'dots' }, { id: 'stars' },
      { id: 'plaid' }, { id: 'flowers' }, { id: 'leopard' }, { id: 'glitter' }, { id: 'holo', unlock: 6 }
    ],
    defs: defs,
    /* Returns a value usable in fill="": a plain color or url(#pattern). scale enlarges the tile. */
    fill: function (name, c, scale) {
      if (!name || name === 'solid' || !defs[name]) return c;
      scale = scale || 1;
      var id = 'pat-' + name + '-' + C.key(c) + (scale !== 1 ? '-' + Math.round(scale * 100) : '');
      if (!G.defs.seen[id]) {
        var p = defs[name](c);
        var tf = (p.rot ? 'rotate(' + p.rot + ') ' : '') + (scale !== 1 ? 'scale(' + scale + ')' : '');
        G.defs.ensure(id, '<pattern id="' + id + '" width="' + p.w + '" height="' + p.h + '" patternUnits="userSpaceOnUse"' +
          (tf ? ' patternTransform="' + tf.trim() + '"' : '') + '><rect width="' + p.w + '" height="' + p.h + '" fill="' + c + '"/>' + p.body + '</pattern>');
      }
      return 'url(#' + id + ')';
    }
  };
})(window.Game);
