/* Built-in bedroom art. Room space is 1200 x 800: wall from y=0 to 560, floor from 560 to 800.
   Fixed positions: wardrobe x40-270, vanity x290-460, window x470-730, nightstand x690-760, bed x770-1170,
   rug centre (600,700), pet bed (1010,725), camera (120,650).
   Small free decorations (decor.*) are in unit space (100 x 100) and placed by the player. */
(function (G) {
  'use strict';
  var S = G.svg, C = G.color, A = G.assets;
  var GOLD = '#ffd84a', GOLD_L = '#b8860b';

  function st(o, fill, w) { return ' fill="' + (fill || o.fill) + '" stroke="' + o.line + '" stroke-width="' + (w || 3) + '" stroke-linejoin="round"'; }
  function R(x, y, w, h, rx, o, fill, sw) { return '<rect x="' + x + '" y="' + y + '" width="' + w + '" height="' + h + '" rx="' + (rx || 0) + '"' + st(o, fill, sw) + '/>'; }
  function P(d, o, fill, sw) { return '<path d="' + d + '"' + st(o, fill, sw) + '/>'; }
  function L(d, o, w, op, col) { return '<path d="' + d + '" fill="none" stroke="' + (col || o.line) + '" stroke-width="' + (w || 2) + '" stroke-linecap="round" stroke-linejoin="round"' + (op ? ' opacity="' + op + '"' : '') + '/>'; }
  function reg(id, space, desc, draw, extra) {
    var def = { space: space, desc: desc, draw: draw };
    if (extra) for (var k in extra) def[k] = extra[k];
    A.register(id, def);
  }
  var room = function (id, desc, draw, extra) { reg('room.' + id, 'room', desc, draw, extra); };

  /* ---------- wall and floors ---------- */
  room('wall', 'Back wall with wallpaper (any color and pattern) and a white baseboard.', function (o) {
    return '<rect x="0" y="0" width="1200" height="560" fill="' + o.fill + '"/>' +
      '<rect x="0" y="0" width="1200" height="560" fill="' + G.defs.linear('#ffffff', '#3b0f33') + '" opacity=".1"/>' +
      '<rect x="0" y="532" width="1200" height="28" fill="#fff" stroke="' + C.dark(o.color, 0.25) + '" stroke-width="2"/>';
  }, { sample: '#ffc2e2' });

  room('floor.wood', 'Wooden plank floor.', function (o) {
    var lines = 'M0,606 L1200,606 M0,660 L1200,660 M0,724 L1200,724';
    [[120, 560, 606], [460, 560, 606], [820, 560, 606], [1080, 560, 606], [260, 606, 660], [640, 606, 660], [980, 606, 660], [90, 660, 724], [430, 660, 724], [790, 660, 724], [1130, 660, 724], [280, 724, 800], [680, 724, 800], [1000, 724, 800]]
      .forEach(function (v) { lines += ' M' + v[0] + ',' + v[1] + ' L' + (v[0] - 14) + ',' + v[2]; });
    return '<rect x="0" y="560" width="1200" height="240" fill="' + o.color + '"/>' + L(lines, o, 2.5, 0.5) +
      '<rect x="0" y="560" width="1200" height="26" fill="#3b0f33" opacity=".1"/>';
  }, { sample: '#e8b98a' });
  room('floor.carpet', 'Soft fluffy carpet.', function (o) {
    var b = '', seed = 5;
    var rnd = function () { seed = (seed * 16807) % 2147483647; return seed / 2147483647; };
    for (var i = 0; i < 150; i++) b += '<circle cx="' + (rnd() * 1200).toFixed(0) + '" cy="' + (566 + rnd() * 230).toFixed(0) + '" r="' + (2 + rnd() * 3).toFixed(1) + '" fill="' + (i % 2 ? o.light : o.dark) + '" opacity=".5"/>';
    return '<rect x="0" y="560" width="1200" height="240" fill="' + o.color + '"/>' + b + '<rect x="0" y="560" width="1200" height="26" fill="#3b0f33" opacity=".1"/>';
  }, { sample: '#e3c6ff' });
  room('floor.tiles', 'Checkerboard tiles.', function (o) {
    var b = '', ys = [560, 600, 650, 716, 800];
    for (var r = 0; r < 4; r++) for (var c = -2; c < 14; c++) {
      if ((r + c) % 2) continue;
      var w0 = 100 + r * 14, w1 = 100 + (r + 1) * 14, x0 = 600 + (c - 6) * w0, x1 = 600 + (c - 6) * w1;
      b += '<path d="M' + x0 + ',' + ys[r] + ' L' + (x0 + w0) + ',' + ys[r] + ' L' + (x1 + w1) + ',' + ys[r + 1] + ' L' + x1 + ',' + ys[r + 1] + ' Z" fill="#fff" opacity=".8"/>';
    }
    return '<rect x="0" y="560" width="1200" height="240" fill="' + o.color + '"/>' + b + '<rect x="0" y="560" width="1200" height="26" fill="#3b0f33" opacity=".1"/>';
  }, { sample: '#ff8cc6' });

  /* ---------- window and curtains ---------- */
  room('window', 'Window with a sunny sky view.', function () {
    return '<rect x="470" y="110" width="260" height="270" rx="16" fill="#fff" stroke="#e7a9cf" stroke-width="3"/>' +
      '<rect x="486" y="126" width="228" height="238" rx="8" fill="' + G.defs.linear('#8fd8ff', '#e9f9ff') + '"/>' +
      '<g fill="#fff"><ellipse cx="540" cy="190" rx="34" ry="14"/><ellipse cx="566" cy="180" rx="24" ry="14"/><ellipse cx="660" cy="250" rx="30" ry="12"/><ellipse cx="640" cy="242" rx="20" ry="12"/></g>' +
      '<circle cx="672" cy="168" r="20" fill="#fff27a"/><path d="M486,330 Q540,300 600,326 Q660,300 714,322 L714,364 L486,364 Z" fill="#a8e6a0"/>' +
      '<path d="M600,126 L600,364 M486,240 L714,240" stroke="#fff" stroke-width="9"/>' +
      '<rect x="456" y="374" width="288" height="18" rx="8" fill="#fff" stroke="#e7a9cf" stroke-width="3"/>';
  }, { recolor: false });
  var ROD = function (o) { return '<rect x="440" y="88" width="320" height="12" rx="6" fill="' + GOLD + '" stroke="' + GOLD_L + '" stroke-width="2"/><circle cx="440" cy="94" r="10" fill="' + GOLD + '" stroke="' + GOLD_L + '" stroke-width="2"/><circle cx="760" cy="94" r="10" fill="' + GOLD + '" stroke="' + GOLD_L + '" stroke-width="2"/>'; };
  room('curtains.drapes', 'Long curtains tied back on each side.', function (o) {
    return S.mir(P('M452,98 L560,98 C556,180 520,236 486,268 C500,320 500,380 496,430 L452,430 Z', o) + L('M476,104 C474,200 470,300 472,424 M510,104 C504,170 494,220 480,262', o, 2, 0.4) +
      '<path d="M476,262 Q490,256 500,270 Q490,282 474,276 Z" fill="' + GOLD + '" stroke="' + GOLD_L + '" stroke-width="2"/>', 600) + ROD(o);
  });
  room('curtains.ruffle', 'Short ruffled valance curtain.', function (o) {
    var b = 'M452,98 L748,98 L748,170';
    for (var x = 748; x > 452; x -= 37) b += ' Q' + (x - 18.5) + ',206 ' + (x - 37) + ',170';
    return P(b + ' Z', o) + L('M489,104 L489,172 M526,104 L526,172 M563,104 L563,172 M600,104 L600,172 M637,104 L637,172 M674,104 L674,172 M711,104 L711,172', o, 2, 0.35) +
      P('M452,98 L748,98 L748,124 L452,124 Z', o, o.light) + ROD(o);
  });
  room('curtains.beads', 'Bead curtain, very 2000s.', function (o) {
    var b = '';
    for (var x = 470; x <= 730; x += 20) {
      var len = 250 + ((x * 7) % 60);
      for (var y = 108; y < 100 + len; y += 16) b += '<circle cx="' + x + '" cy="' + y + '" r="6" fill="' + ((y / 16 | 0) % 3 ? o.color : o.light) + '" stroke="' + o.line + '" stroke-width="1.2"/>';
    }
    return b + ROD(o);
  });

  /* ---------- fixed furniture (colored by the furniture color) ---------- */
  room('wardrobe', 'Tall wardrobe with two doors (opens Dress Up).', function (o) {
    return R(58, 580, 16, 20, 4, o, o.dark) + R(236, 580, 16, 20, 4, o, o.dark) +
      R(40, 150, 230, 436, 14, o) + P('M30,150 Q155,108 280,150 L280,170 L30,170 Z', o, o.light) +
      R(54, 184, 96, 384, 10, o, o.light) + R(160, 184, 96, 384, 10, o, o.light) +
      R(66, 198, 72, 150, 8, o) + R(172, 198, 72, 150, 8, o) + R(66, 362, 72, 192, 8, o) + R(172, 362, 72, 192, 8, o) +
      '<path d="' + S.heart(142, 372, 9) + '" fill="' + GOLD + '" stroke="' + GOLD_L + '" stroke-width="2"/><path d="' + S.heart(168, 372, 9) + '" fill="' + GOLD + '" stroke="' + GOLD_L + '" stroke-width="2"/>' +
      '<path d="' + S.star(155, 136, 13) + '" fill="' + GOLD + '" stroke="' + GOLD_L + '" stroke-width="2"/>';
  }, { sample: '#ffffff' });
  room('vanity', 'Vanity table with a round light-up mirror and a stool (opens Makeover).', function (o) {
    var bulbs = '';
    for (var i = 0; i < 12; i++) {
      var a = Math.PI * 2 * i / 12;
      bulbs += '<circle cx="' + (375 + Math.cos(a) * 86).toFixed(0) + '" cy="' + (330 + Math.sin(a) * 86).toFixed(0) + '" r="8" fill="#fff9c4" stroke="' + GOLD_L + '" stroke-width="1.5"/>';
    }
    return R(366, 400, 18, 50, 0, o, o.dark) + '<circle cx="375" cy="330" r="86"' + st(o) + '/>' +
      '<circle cx="375" cy="330" r="66" fill="' + G.defs.linear('#d7f3ff', '#f4e6ff') + '" stroke="' + o.line + '" stroke-width="3"/>' +
      '<path d="M336,300 Q352,276 380,274" fill="none" stroke="#fff" stroke-width="9" stroke-linecap="round" opacity=".8"/>' + bulbs +
      R(306, 560, 14, 38, 4, o, o.dark) + R(430, 560, 14, 38, 4, o, o.dark) +
      R(300, 462, 150, 100, 8, o) + R(312, 476, 126, 34, 6, o, o.light) + R(312, 518, 126, 34, 6, o, o.light) +
      '<circle cx="375" cy="493" r="6" fill="' + GOLD + '" stroke="' + GOLD_L + '" stroke-width="1.5"/><circle cx="375" cy="535" r="6" fill="' + GOLD + '" stroke="' + GOLD_L + '" stroke-width="1.5"/>' +
      R(288, 442, 174, 22, 10, o, o.light) +
      '<rect x="318" y="418" width="14" height="26" rx="4" fill="#ff5fb0" stroke="#b5126f" stroke-width="2"/><rect x="338" y="424" width="12" height="20" rx="4" fill="#b983ff" stroke="#7a3fd0" stroke-width="2"/><circle cx="420" cy="432" r="11" fill="#7fd4ff" stroke="#3f8fd6" stroke-width="2"/>' +
      '<rect x="356" y="632" width="8" height="34" fill="' + o.dark + '" stroke="' + o.line + '" stroke-width="2"/><rect x="398" y="632" width="8" height="34" fill="' + o.dark + '" stroke="' + o.line + '" stroke-width="2"/>' +
      '<ellipse cx="381" cy="626" rx="46" ry="18" fill="#ff8cc6" stroke="#b5126f" stroke-width="3"/><ellipse cx="372" cy="620" rx="20" ry="6" fill="#fff" opacity=".4"/>';
  }, { sample: '#ffffff' });
  room('nightstand', 'Small bedside table (the lamp stands on it).', function (o) {
    return R(694, 602, 10, 22, 3, o, o.dark) + R(746, 602, 10, 22, 3, o, o.dark) + R(688, 520, 74, 86, 8, o) + R(696, 534, 58, 28, 5, o, o.light) + R(696, 568, 58, 28, 5, o, o.light) +
      '<circle cx="725" cy="548" r="4.5" fill="' + GOLD + '"/><circle cx="725" cy="582" r="4.5" fill="' + GOLD + '"/>';
  }, { sample: '#ffffff' });

  /* ---------- beds ---------- */
  function mattress(o) {
    return R(790, 610, 16, 34, 4, o, '#fff') + R(1140, 610, 16, 34, 4, o, '#fff') +
      R(776, 500, 394, 70, 16, o, '#fff') +
      '<path d="M800,486 Q850,462 900,486 Q902,514 850,516 Q798,514 800,486 Z" fill="#fff" stroke="' + o.line + '" stroke-width="3"/>' +
      P('M776,540 Q780,522 800,522 L900,522 Q960,500 1010,520 L1150,520 Q1170,522 1170,540 L1170,604 Q1170,620 1154,620 L792,620 Q776,620 776,604 Z', o) +
      P('M900,522 Q960,500 1010,520 Q1000,548 950,546 Q910,544 900,522 Z', o, o.light) +
      L('M790,596 L1156,596', o, 2, 0.4);
  }
  room('bed.heart', 'Bed with a big heart headboard.', function (o) {
    return '<g transform="translate(860 430)">' + P(S.heart(0, 0, 92), o, o.dark) + '<path d="' + S.heart(0, -2, 66) + '" fill="' + o.light + '" opacity=".7"/></g>' + mattress(o);
  });
  room('bed.canopy', 'Princess canopy bed with draped fabric.', function (o) {
    return R(782, 250, 12, 380, 4, o, '#fff') + R(1152, 250, 12, 380, 4, o, '#fff') +
      P('M770,250 Q973,190 1176,250 L1176,290 Q1130,330 1084,290 Q1038,330 992,290 Q946,330 900,290 Q854,330 808,290 Q790,310 770,290 Z', o) +
      P('M776,286 C790,360 792,440 784,520 L810,500 C820,430 812,350 800,290 Z', o, o.light) + P('M1170,286 C1156,360 1154,440 1162,520 L1136,500 C1126,430 1134,350 1146,290 Z', o, o.light) +
      '<path d="' + S.star(973, 224, 16) + '" fill="' + GOLD + '" stroke="' + GOLD_L + '" stroke-width="2"/>' + mattress(o);
  });
  room('bed.daybed', 'Cosy daybed with cushions.', function (o) {
    return R(770, 400, 406, 150, 26, o, o.dark) + mattress(o) +
      R(930, 448, 70, 66, 14, o, o.light) + R(1010, 440, 76, 74, 14, o, '#fff') + '<path d="' + S.heart(1048, 478, 16) + '" fill="' + o.color + '"/>' +
      '<ellipse cx="1126" cy="492" rx="34" ry="26"' + st(o, o.light) + '/>';
  });

  /* ---------- rugs ---------- */
  room('rug.round', 'Round fluffy rug.', function (o) {
    return '<ellipse cx="600" cy="704" rx="236" ry="66"' + st(o) + '/><ellipse cx="600" cy="704" rx="190" ry="50" fill="none" stroke="' + o.light + '" stroke-width="8"/><ellipse cx="600" cy="704" rx="120" ry="30" fill="' + o.light + '" opacity=".5"/>';
  });
  room('rug.heart', 'Heart-shaped rug.', function (o) {
    return '<g transform="translate(600 698) scale(1 .36)">' + P(S.heart(0, 0, 200), o, null, 6) + '<path d="' + S.heart(0, -6, 140) + '" fill="' + o.light + '" opacity=".55"/></g>';
  });
  room('rug.star', 'Star-shaped rug.', function (o) {
    return '<g transform="translate(600 704) scale(1 .36)">' + P(S.star(0, 0, 250, 130), o, null, 6) + '<path d="' + S.star(0, 0, 170, 90) + '" fill="' + o.light + '" opacity=".55"/></g>';
  });

  /* ---------- lamps ---------- */
  room('lamp.lava', 'Lava lamp on the nightstand.', function (o) {
    return P('M708,520 L742,520 L736,496 L714,496 Z', o, '#c9cfe0') + P('M714,496 L736,496 L744,420 C744,396 706,396 706,420 Z', o, o.light) +
      '<ellipse cx="725" cy="470" rx="12" ry="16" fill="' + o.color + '"/><ellipse cx="722" cy="436" rx="8" ry="10" fill="' + o.color + '"/><circle cx="730" cy="416" r="5" fill="' + o.color + '"/>' +
      P('M710,404 L740,404 L734,384 L716,384 Z', o, '#c9cfe0') + '<ellipse cx="725" cy="450" rx="60" ry="70" fill="' + G.defs.radial(o.color) + '" opacity=".35"/>';
  });
  room('lamp.table', 'Table lamp with a shade.', function (o) {
    return '<ellipse cx="725" cy="430" rx="80" ry="70" fill="' + G.defs.radial('#fff7b0') + '" opacity=".55"/>' +
      R(720, 456, 10, 54, 3, o, GOLD) + '<ellipse cx="725" cy="514" rx="22" ry="8" fill="' + GOLD + '" stroke="' + GOLD_L + '" stroke-width="2.5"/>' +
      P('M704,400 L746,400 L762,460 L688,460 Z', o) + L('M694,446 L756,446', o, 2, 0.5, '#fff');
  });
  room('lamp.disco', 'Disco ball hanging from the ceiling. A reward item.', function (o) {
    var tiles = '';
    for (var r = -2; r <= 2; r++) for (var c = -3; c <= 3; c++) {
      var x = 380 + c * 13, y = 150 + r * 13;
      if ((x - 380) * (x - 380) + (y - 150) * (y - 150) < 44 * 44) tiles += '<rect x="' + (x - 5) + '" y="' + (y - 5) + '" width="10" height="10" rx="2" fill="' + ((r + c) % 2 ? '#fff' : o.light) + '" opacity=".85"/>';
    }
    return '<path d="M380,0 L380,104" stroke="#9aa0b0" stroke-width="3"/>' + '<circle cx="380" cy="150" r="130" fill="' + G.defs.radial(o.color) + '" opacity=".3"/>' +
      '<circle cx="380" cy="150" r="48" fill="#c9cfe0" stroke="#7d8496" stroke-width="3"/>' + tiles +
      '<path d="' + S.spark(345, 118, 16) + '" fill="#fff"/><path d="' + S.spark(425, 180, 12) + '" fill="#fff"/><path d="' + S.spark(300, 196, 10) + '" fill="' + o.light + '"/><path d="' + S.spark(462, 100, 10) + '" fill="' + o.light + '"/>';
  }, { sample: '#b06cff' });

  /* ---------- wall art (above the bed) ---------- */
  function frame(o, inner) { return R(880, 130, 190, 150, 10, o, '#fff', 4) + R(892, 142, 166, 126, 6, o, o.light, 2) + inner; }
  room('art.heart', 'Framed heart poster.', function (o) { return frame(o, '<path d="' + S.heart(975, 208, 44) + '" fill="' + o.color + '" stroke="' + o.line + '" stroke-width="3"/><ellipse cx="955" cy="190" rx="10" ry="6" fill="#fff" opacity=".6" transform="rotate(-30 955 190)"/>'); });
  room('art.star', 'Framed pop-star poster with stars.', function (o) { return frame(o, '<path d="' + S.star(975, 206, 50) + '" fill="' + GOLD + '" stroke="' + GOLD_L + '" stroke-width="3"/><path d="' + S.star(916, 164, 12) + '" fill="' + o.color + '"/><path d="' + S.star(1034, 246, 12) + '" fill="' + o.color + '"/>'); });
  room('art.butterfly', 'Framed butterfly picture.', function (o) {
    return frame(o, '<g transform="translate(975 206)" fill="' + o.color + '" stroke="' + o.line + '" stroke-width="3" stroke-linejoin="round"><path d="M0,0 C-20,-50 -70,-44 -60,-8 C-66,22 -26,36 0,6 Z"/><path d="M0,0 C20,-50 70,-44 60,-8 C66,22 26,36 0,6 Z"/><ellipse cx="0" cy="2" rx="6" ry="30" fill="' + o.line + '" stroke="none"/></g>');
  });
  room('art.collage', 'Photo collage with fairy pegs.', function (o) {
    var ph = function (x, y, r, c) { return '<g transform="rotate(' + r + ' ' + (x + 34) + ' ' + (y + 40) + ')"><rect x="' + x + '" y="' + y + '" width="68" height="80" rx="4" fill="#fff" stroke="' + o.line + '" stroke-width="2.5"/><rect x="' + (x + 7) + '" y="' + (y + 7) + '" width="54" height="50" fill="' + c + '"/><path d="' + S.heart(x + 34, y + 33, 12) + '" fill="#fff" opacity=".8"/></g>'; };
    return ph(866, 140, -8, o.color) + ph(942, 128, 5, o.light) + ph(1018, 144, -4, '#7fd4ff') + ph(904, 214, 6, '#fff27a') + ph(984, 220, -7, o.color);
  });

  /* ---------- string lights ---------- */
  function garland(fn) {
    var b = '<path d="M0,26 Q150,96 300,40 Q450,96 600,40 Q750,96 900,40 Q1050,96 1200,26" fill="none" stroke="#8a6f86" stroke-width="2.5"/>';
    for (var i = 0; i < 16; i++) {
      var t = (i + 0.5) / 16, x = t * 1200, seg = (x % 300) / 300, y = 40 + Math.sin(Math.PI * seg) * 28 + (x < 300 || x > 900 ? -6 * (1 - seg) : 0);
      b += fn(x, y + 10, i);
    }
    return b;
  }
  room('lights.fairy', 'String of glowing fairy lights along the ceiling.', function (o) {
    var cols = [o.color, '#fff27a', o.light, '#7fd4ff'];
    return garland(function (x, y, i) {
      return '<circle cx="' + x.toFixed(0) + '" cy="' + y.toFixed(0) + '" r="26" fill="' + G.defs.radial(cols[i % 4]) + '" opacity=".5"/><circle cx="' + x.toFixed(0) + '" cy="' + y.toFixed(0) + '" r="9" fill="' + cols[i % 4] + '" stroke="#fff" stroke-width="2"/>';
    });
  });
  room('lights.hearts', 'Garland of paper hearts.', function (o) {
    return garland(function (x, y, i) { return '<path d="' + S.heart(x, y + 4, 13) + '" fill="' + (i % 2 ? o.color : o.light) + '" stroke="' + o.line + '" stroke-width="2"/>'; });
  });

  /* ---------- hub hotspots that are objects in the room ---------- */
  room('petbed', 'Round pet bed with a paw print (opens Pet Care).', function (o) {
    return '<ellipse cx="1010" cy="738" rx="104" ry="36"' + st(o, o.dark) + '/><ellipse cx="1010" cy="724" rx="104" ry="36"' + st(o) + '/><ellipse cx="1010" cy="722" rx="74" ry="22"' + st(o, o.light, 2) + '/>' +
      '<g fill="' + o.color + '" opacity=".8"><ellipse cx="1010" cy="726" rx="12" ry="8"/><ellipse cx="992" cy="716" rx="5" ry="4"/><ellipse cx="1004" cy="710" rx="5" ry="4"/><ellipse cx="1017" cy="710" rx="5" ry="4"/><ellipse cx="1029" cy="716" rx="5" ry="4"/></g>';
  }, { sample: '#b983ff' });
  room('camera', 'Camera on a tripod (opens Photo Shoot).', function () {
    return '<path d="M120,640 L84,786 M120,640 L156,786 M120,640 L120,790" stroke="#5a4a66" stroke-width="7" stroke-linecap="round"/>' +
      '<rect x="100" y="552" width="30" height="16" rx="4" fill="#ffc2e2" stroke="#b5126f" stroke-width="3"/><rect x="66" y="564" width="108" height="76" rx="14" fill="#ff5fb0" stroke="#b5126f" stroke-width="3.5"/>' +
      '<circle cx="120" cy="602" r="27" fill="#fff" stroke="#b5126f" stroke-width="3.5"/><circle cx="120" cy="602" r="18" fill="#7fd4ff" stroke="#3f5fd6" stroke-width="3"/><circle cx="113" cy="595" r="5" fill="#fff"/>' +
      '<circle cx="158" cy="578" r="5" fill="#fff27a" stroke="#b5126f" stroke-width="2"/><path d="' + S.spark(176, 548, 12) + '" fill="#fff" stroke="#ffb3dc" stroke-width="1.5"/>';
  }, { recolor: false });

  /* ---------- free decorations (unit space) ---------- */
  var decor = function (id, desc, draw, extra) { reg('decor.' + id, 'unit', desc, draw, extra); };
  decor('teddy', 'Teddy bear plush.', function (o) {
    return '<g' + st(o, null, 3) + '><circle cx="28" cy="18" r="10"/><circle cx="72" cy="18" r="10"/><ellipse cx="22" cy="62" rx="10" ry="14"/><ellipse cx="78" cy="62" rx="10" ry="14"/><ellipse cx="34" cy="90" rx="13" ry="9"/><ellipse cx="66" cy="90" rx="13" ry="9"/><ellipse cx="50" cy="68" rx="26" ry="26"/><circle cx="50" cy="32" r="25"/></g>' +
      '<ellipse cx="50" cy="40" rx="11" ry="8.5" fill="' + o.light + '"/><ellipse cx="50" cy="70" rx="14" ry="15" fill="' + o.light + '"/><circle cx="41" cy="28" r="3.2" fill="#3a1a26"/><circle cx="59" cy="28" r="3.2" fill="#3a1a26"/><ellipse cx="50" cy="37" rx="4" ry="3" fill="#3a1a26"/>' +
      '<path d="M45,43 Q50,47 55,43" fill="none" stroke="#3a1a26" stroke-width="2" stroke-linecap="round"/><path d="' + S.heart(50, 68, 6) + '" fill="#ff5fb0"/>';
  }, { sample: '#d9a66b' });
  decor('bunny', 'Bunny plush.', function (o) {
    return '<g' + st(o, null, 3) + '><ellipse cx="36" cy="18" rx="9" ry="20" transform="rotate(-10 36 18)"/><ellipse cx="64" cy="18" rx="9" ry="20" transform="rotate(10 64 18)"/><ellipse cx="50" cy="72" rx="24" ry="24"/><ellipse cx="32" cy="92" rx="12" ry="7"/><ellipse cx="68" cy="92" rx="12" ry="7"/><circle cx="50" cy="44" r="22"/></g>' +
      '<ellipse cx="36" cy="18" rx="4" ry="13" fill="#ffb3dc" transform="rotate(-10 36 18)"/><ellipse cx="64" cy="18" rx="4" ry="13" fill="#ffb3dc" transform="rotate(10 64 18)"/>' +
      '<circle cx="42" cy="42" r="3" fill="#3a1a26"/><circle cx="58" cy="42" r="3" fill="#3a1a26"/><path d="M47,49 L53,49 L50,53 Z" fill="#ff5fb0"/><ellipse cx="36" cy="50" rx="5" ry="3" fill="#ff8cc6" opacity=".6"/><ellipse cx="64" cy="50" rx="5" ry="3" fill="#ff8cc6" opacity=".6"/>';
  }, { sample: '#ffffff' });
  decor('plant', 'Potted plant.', function (o) {
    return '<g fill="#6fcf6a" stroke="#2f7f3a" stroke-width="3" stroke-linejoin="round"><path d="M50,62 C30,50 20,30 26,12 C44,22 52,42 50,62 Z"/><path d="M50,62 C70,50 80,30 74,12 C56,22 48,42 50,62 Z"/><path d="M50,62 C40,40 44,16 50,4 C56,16 60,40 50,62 Z"/></g>' +
      '<path d="M28,60 L72,60 L66,94 Q50,100 34,94 Z"' + st(o, null, 3) + '/><rect x="24" y="54" width="52" height="12" rx="5"' + st(o, o.light, 3) + '/>';
  }, { sample: '#ff8cc6' });
  decor('beanbag', 'Squishy beanbag chair.', function (o) {
    return '<path d="M12,70 C6,40 26,22 48,26 C54,10 78,12 82,32 C98,44 96,80 82,88 C60,98 28,96 12,70 Z"' + st(o, null, 3) + '/><path d="M28,58 C40,44 62,44 74,58 C62,70 40,70 28,58 Z" fill="#3b0f33" opacity=".13"/><ellipse cx="34" cy="38" rx="10" ry="5" fill="#fff" opacity=".4" transform="rotate(-30 34 38)"/>';
  }, { sample: '#b983ff' });
  decor('inflatable', 'Inflatable see-through armchair, a 2000s classic.', function (o) {
    return '<g fill="' + o.color + '" fill-opacity=".7" stroke="' + o.line + '" stroke-width="3"><rect x="22" y="10" width="56" height="56" rx="22"/><rect x="6" y="40" width="26" height="48" rx="13"/><rect x="68" y="40" width="26" height="48" rx="13"/><rect x="22" y="58" width="56" height="34" rx="14"/></g>' +
      '<path d="M32,22 Q40,16 50,18" fill="none" stroke="#fff" stroke-width="5" stroke-linecap="round" opacity=".8"/><path d="M12,54 L12,70 M74,54 L74,70" stroke="#fff" stroke-width="4" stroke-linecap="round" opacity=".7"/>';
  }, { sample: '#ff5fb0' });
  decor('boombox', 'Boombox CD player.', function (o) {
    return '<path d="M26,30 C26,8 74,8 74,30" fill="none" stroke="' + o.line + '" stroke-width="5"/><rect x="6" y="28" width="88" height="56" rx="10"' + st(o, null, 3) + '/>' +
      '<circle cx="28" cy="58" r="15" fill="#3a2a4a" stroke="' + o.line + '" stroke-width="2.5"/><circle cx="72" cy="58" r="15" fill="#3a2a4a" stroke="' + o.line + '" stroke-width="2.5"/><circle cx="28" cy="58" r="6" fill="#c9cfe0"/><circle cx="72" cy="58" r="6" fill="#c9cfe0"/>' +
      '<rect x="42" y="38" width="16" height="10" rx="2" fill="#fff" stroke="' + o.line + '" stroke-width="2"/><path d="M82,14 q4,-8 8,0 v10 M90,24 a3,3 0 1 1 -3,-3" fill="none" stroke="#b5126f" stroke-width="2.5" stroke-linecap="round"/>';
  }, { sample: '#7fd4ff' });
  decor('cushion', 'Heart cushion.', function (o) {
    return '<path d="' + S.heart(50, 52, 38) + '"' + st(o, null, 3) + '/><path d="' + S.heart(50, 50, 24) + '" fill="' + o.light + '" opacity=".6"/><ellipse cx="34" cy="36" rx="8" ry="5" fill="#fff" opacity=".6" transform="rotate(-30 34 36)"/>';
  }, { sample: '#ff5a5a' });
  decor('vase', 'Vase of flowers.', function (o) {
    var fl = function (x, y, c) {
      var b = '';
      for (var i = 0; i < 5; i++) { var a = Math.PI * 2 * i / 5; b += '<circle cx="' + (x + Math.cos(a) * 8).toFixed(1) + '" cy="' + (y + Math.sin(a) * 8).toFixed(1) + '" r="6.5" fill="' + c + '" stroke="#b5126f" stroke-width="1.5"/>'; }
      return b + '<circle cx="' + x + '" cy="' + y + '" r="5" fill="#ffd84a"/>';
    };
    return '<path d="M50,58 L36,26 M50,58 L50,18 M50,58 L66,28" stroke="#2f7f3a" stroke-width="3.5" stroke-linecap="round"/>' + fl(34, 22, '#ff8cc6') + fl(50, 14, '#fff') + fl(68, 24, '#b983ff') +
      '<path d="M38,56 L62,56 C74,70 70,96 50,96 C30,96 26,70 38,56 Z"' + st(o, null, 3) + '/><rect x="36" y="50" width="28" height="9" rx="4"' + st(o, o.light, 3) + '/>';
  }, { sample: '#7fd4ff' });
  decor('phone', 'Fluffy retro telephone.', function (o) {
    return '<path d="M14,34 C14,14 86,14 86,34 L86,44 L66,44 L66,36 L34,36 L34,44 L14,44 Z"' + st(o, null, 3) + '/><path d="M22,90 L30,48 L70,48 L78,90 Z"' + st(o, o.light, 3) + '/><circle cx="50" cy="68" r="14" fill="#fff" stroke="' + o.line + '" stroke-width="3"/><circle cx="50" cy="68" r="5" fill="' + o.color + '"/>';
  }, { sample: '#ff5fb0' });
  decor('shelfcd', 'Stack of CDs and a tiny trophy.', function (o) {
    return '<rect x="14" y="70" width="60" height="9" rx="2"' + st(o, '#7fd4ff', 2.5) + '/><rect x="18" y="60" width="60" height="9" rx="2"' + st(o, '#fff27a', 2.5) + '/><rect x="12" y="50" width="60" height="9" rx="2"' + st(o, null, 2.5) + '/><rect x="16" y="80" width="60" height="9" rx="2"' + st(o, '#b983ff', 2.5) + '/>' +
      '<path d="M46,14 L74,14 C74,34 66,40 60,40 C54,40 46,34 46,14 Z" fill="#ffd84a" stroke="#b8860b" stroke-width="2.5"/><rect x="56" y="40" width="8" height="10" fill="#ffd84a" stroke="#b8860b" stroke-width="2"/><path d="' + S.star(60, 24, 7) + '" fill="#fff"/>';
  }, { sample: '#ff8cc6' });
})(window.Game);
