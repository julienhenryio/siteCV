/* Built-in accessories: bags, jewelry, glasses, hats, hair accessories, belt, wings.
   Doll space (600 x 1300). Items worn on the head use the head's native coordinates
   (the game scales the whole head group, see G.doll.HEAD_TF). */
(function (G) {
  'use strict';
  var S = G.svg, C = G.color, A = G.assets;
  var P = G.art.P, L = G.art.L, SH = G.art.SH, HI = G.art.HI, bow = G.art.bow, sparkles = G.art.sparkles;
  var GOLD = '#ffd84a', GOLD_L = '#b8860b';

  function reg(id, desc, draw, extra) {
    var def = { space: 'doll', desc: desc, draw: draw };
    if (extra) for (var k in extra) def[k] = extra[k];
    A.register('acc.' + id, def);
  }

  /* ---------- bags ---------- */
  reg('bag.shoulder', 'Small shoulder bag hanging at the hip.', function (o) {
    return L('M388,346 C378,430 396,540 410,600 M396,346 C446,420 470,520 464,600', o, 6) + L('M388,346 C378,430 396,540 410,600 M396,346 C446,420 470,520 464,600', o, 3, 1, o.color) +
      P('M398,598 L476,598 C484,598 488,606 486,616 L480,664 C478,674 470,680 460,680 L414,680 C404,680 396,674 394,664 L388,616 C386,606 390,598 398,598 Z', o) +
      P('M394,598 L480,598 C486,620 470,640 437,640 C404,640 388,620 394,598 Z', o, o.light) +
      '<circle cx="437" cy="640" r="7" fill="' + GOLD + '" stroke="' + GOLD_L + '" stroke-width="1.5"/>';
  });
  reg('bag.clutch', 'Party clutch held in the hand.', function (o) {
    return '<g transform="rotate(-8 168 730)">' + P('M122,712 L214,712 Q220,712 220,718 L220,756 Q220,762 214,762 L122,762 Q116,762 116,756 L116,718 Q116,712 122,712 Z', o) +
      P('M116,716 L220,716 L168,744 Z', o, o.light) + '<circle cx="168" cy="744" r="6" fill="' + GOLD + '" stroke="' + GOLD_L + '" stroke-width="1.5"/></g>' +
      sparkles([[134, 754, 5], [204, 748, 4]]);
  });
  reg('bag.tote', 'Big beach tote bag carried by the handles.', function (o) {
    return L('M150,794 C150,740 164,726 172,726 C182,726 196,740 196,794', o, 7) + L('M150,794 C150,740 164,726 172,726 C182,726 196,740 196,794', o, 3.5, 1, o.light) +
      P('M112,790 L234,790 L224,896 Q222,906 212,906 L134,906 Q124,906 122,896 Z', o) + P('M112,790 L234,790 L232,812 L114,812 Z', o, o.light) +
      '<path d="' + S.heart(173, 858, 20) + '" fill="' + o.light + '" stroke="' + o.line + '" stroke-width="2"/>';
  });

  /* ---------- necklaces ---------- */
  reg('necklace.choker', 'Choker with a heart charm.', function (o) {
    return P('M279,306 Q300,320 321,306 L321,318 Q300,332 279,318 Z', o) + '<path d="' + S.heart(300, 332, 8) + '" fill="' + GOLD + '" stroke="' + GOLD_L + '" stroke-width="1.5"/>';
  });
  reg('necklace.pearls', 'Pearl necklace.', function (o) {
    var b = '';
    for (var i = 0; i <= 12; i++) {
      var t = i / 12, x = 268 + 64 * t, y = 340 + Math.sin(Math.PI * t) * 44;
      b += '<circle cx="' + x.toFixed(1) + '" cy="' + y.toFixed(1) + '" r="5.6" fill="' + o.light + '" stroke="' + o.line + '" stroke-width="1.3"/><circle cx="' + (x - 1.6).toFixed(1) + '" cy="' + (y - 1.6).toFixed(1) + '" r="1.6" fill="#fff"/>';
    }
    return b;
  }, { sample: '#fff5fb' });
  reg('necklace.pendant', 'Thin chain with a heart pendant.', function (o) {
    return L('M269,338 Q280,384 300,396 Q320,384 331,338', o, 2.2, 1, GOLD_L) +
      '<path d="' + S.heart(300, 406, 13) + '" fill="' + o.color + '" stroke="' + o.line + '" stroke-width="2"/><circle cx="295" cy="401" r="2.6" fill="#fff" opacity=".9"/>';
  });

  /* ---------- earrings (head space) ---------- */
  reg('earrings.hoops', 'Big hoop earrings.', function (o) {
    return S.mir('<circle cx="202" cy="230" r="17" fill="none" stroke="' + o.line + '" stroke-width="6.5"/><circle cx="202" cy="230" r="17" fill="none" stroke="' + o.color + '" stroke-width="3.5"/>');
  }, { sample: '#ffd84a' });
  reg('earrings.stars', 'Star stud earrings.', function (o) {
    return S.mir('<path d="' + S.star(202, 211, 11) + '" fill="' + o.color + '" stroke="' + o.line + '" stroke-width="1.8"/>');
  }, { sample: '#ffd84a' });
  reg('earrings.drops', 'Dangling gem drop earrings.', function (o) {
    return S.mir(L('M202,208 L202,228', o, 2, 1, GOLD_L) + '<path d="M202,226 C192,240 194,254 202,256 C210,254 212,240 202,226 Z" fill="' + o.color + '" stroke="' + o.line + '" stroke-width="1.8"/><circle cx="199" cy="244" r="2.2" fill="#fff" opacity=".9"/>');
  });

  /* ---------- glasses (head space) ---------- */
  reg('glasses.shades', 'Tinted 2000s sunglasses.', function (o) {
    var lens = 'M222,174 Q256,164 290,174 Q294,202 278,212 Q256,220 234,212 Q218,202 222,174 Z';
    return S.mir('<path d="' + lens + '" fill="' + o.color + '" opacity=".62"/><path d="' + lens + '" fill="none" stroke="' + o.line + '" stroke-width="3.5" stroke-linejoin="round"/>' +
      HI('M232,178 Q246,172 262,174 L246,206 Q234,202 230,194 Z', 0.35) + L('M222,180 L200,184', o, 3.5)) + L('M290,180 Q300,174 310,180', o, 3.5);
  });
  reg('glasses.hearts', 'Heart-shaped sunglasses.', function (o) {
    return S.mir('<path d="' + S.heart(257, 192, 26) + '" fill="' + o.color + '" opacity=".7"/><path d="' + S.heart(257, 192, 26) + '" fill="none" stroke="' + o.line + '" stroke-width="3.5" stroke-linejoin="round"/>' +
      '<ellipse cx="245" cy="182" rx="6" ry="4" fill="#fff" opacity=".6" transform="rotate(-30 245 182)"/>' + L('M222,184 L200,186', o, 3.5)) + L('M288,186 Q300,180 312,186', o, 3.5);
  });

  /* ---------- hats (head space) ---------- */
  reg('hat.bucket', 'Bucket hat.', function (o) {
    return P(S.sym([300, 14], [[246, 14, 208, 40, 200, 102], [300, 110]]), o) +
      P(S.sym([300, 92], [[236, 92, 190, 100, 168, 146], [232, 154, 300, 150]]), o) +
      SH(S.sym([300, 92], [[240, 92, 206, 98, 198, 106], [240, 114, 300, 112]]), 0.14) + L('M186,132 Q300,150 414,132', o, 1.6, 0.4);
  });
  reg('hat.cap', 'Baseball cap with a star.', function (o) {
    return P(S.sym([300, 18], [[238, 18, 194, 58, 190, 124], [300, 130]]), o) +
      P(S.sym([300, 110], [[248, 110, 204, 118, 184, 140], [236, 166, 300, 164]]), o, o.dark) +
      L('M300,20 L300,110 M254,30 Q238,70 236,116 M346,30 Q362,70 364,116', o, 1.6, 0.4) +
      '<circle cx="300" cy="20" r="6" fill="' + o.light + '" stroke="' + o.line + '" stroke-width="1.5"/><path d="' + S.star(300, 72, 20) + '" fill="#fff" stroke="' + o.line + '" stroke-width="2"/>';
  });
  reg('hat.sunhat', 'Wide straw sun hat with a ribbon.', function (o) {
    return '<ellipse cx="300" cy="104" rx="196" ry="46" fill="' + o.fill + '" stroke="' + o.line + '" stroke-width="2.5"/>' +
      '<ellipse cx="300" cy="104" rx="150" ry="32" fill="none" stroke="' + o.line + '" stroke-width="1.4" opacity=".4"/>' +
      P(S.sym([300, 10], [[240, 10, 212, 40, 208, 100], [250, 116, 300, 114]]), o) +
      P(S.sym([300, 76], [[212, 72], [208, 100], [250, 116, 300, 114]]), o, '#fff') + bow(378, 96, 0.6, '#fff', o.line);
  }, { sample: '#ffe9a8' });
  reg('hat.tiara', 'Sparkling princess tiara. A reward item.', function (o) {
    return P('M214,104 Q300,60 386,104 L382,118 Q300,78 218,118 Z', o, GOLD) +
      '<path d="M236,92 L246,56 L262,82 L280,40 L300,74 L320,40 L338,82 L354,56 L364,92 Q300,66 236,92 Z" fill="' + GOLD + '" stroke="' + GOLD_L + '" stroke-width="2.5" stroke-linejoin="round"/>' +
      '<path d="' + S.heart(300, 52, 9) + '" fill="' + o.color + '" stroke="' + o.line + '" stroke-width="1.5"/><circle cx="280" cy="42" r="5" fill="#fff" stroke="' + GOLD_L + '" stroke-width="1.2"/><circle cx="320" cy="42" r="5" fill="#fff" stroke="' + GOLD_L + '" stroke-width="1.2"/>' +
      '<circle cx="246" cy="58" r="4" fill="' + o.color + '"/><circle cx="354" cy="58" r="4" fill="' + o.color + '"/>' + sparkles([[300, 26, 8], [226, 70, 5], [376, 66, 6]]);
  });

  /* ---------- hair accessories (head space) ---------- */
  reg('hairacc.bow', 'Big hair bow.', function (o) { return bow(232, 74, 1.5, o.fill, o.line); });
  reg('hairacc.clips', 'Three little butterfly clips.', function (o) {
    var fly = function (x, y, r) {
      return '<g transform="translate(' + x + ' ' + y + ') rotate(' + r + ')" fill="' + o.color + '" stroke="' + o.line + '" stroke-width="1.6" stroke-linejoin="round">' +
        '<path d="M0,0 C-6,-14 -20,-12 -17,-2 C-20,6 -8,10 0,2 Z"/><path d="M0,0 C6,-14 20,-12 17,-2 C20,6 8,10 0,2 Z"/><ellipse cx="0" cy="0" rx="2.4" ry="8" fill="' + o.line + '" stroke="none"/></g>';
    };
    return fly(222, 124, -20) + fly(250, 94, -10) + fly(376, 110, 16);
  });
  reg('hairacc.headband', 'Headband with a star.', function (o) {
    return P('M190,150 C196,86 244,44 300,44 C356,44 404,86 410,150 L396,152 C390,96 348,60 300,60 C252,60 210,96 204,152 Z', o) +
      '<path d="' + S.star(364, 82, 17) + '" fill="' + GOLD + '" stroke="' + GOLD_L + '" stroke-width="1.8"/>';
  });
  reg('hairacc.flower', 'Tropical flower tucked in the hair.', function (o) {
    var b = '';
    for (var i = 0; i < 5; i++) {
      var a = Math.PI * 2 * i / 5 - Math.PI / 2;
      b += '<ellipse cx="' + (376 + Math.cos(a) * 17).toFixed(1) + '" cy="' + (112 + Math.sin(a) * 17).toFixed(1) + '" rx="15" ry="12" transform="rotate(' + (a * 180 / Math.PI).toFixed(0) + ' ' + (376 + Math.cos(a) * 17).toFixed(1) + ' ' + (112 + Math.sin(a) * 17).toFixed(1) + ')" fill="' + o.color + '" stroke="' + o.line + '" stroke-width="1.8"/>';
    }
    return b + '<circle cx="376" cy="112" r="8" fill="' + GOLD + '" stroke="' + GOLD_L + '" stroke-width="1.5"/>';
  });

  /* ---------- belt ---------- */
  reg('belt.chain', 'Slanted hip belt with a big heart buckle.', function (o) {
    return P('M232,580 Q300,602 370,604 L370,620 Q300,618 230,596 Z', o) +
      '<path d="' + S.heart(318, 608, 15) + '" fill="' + GOLD + '" stroke="' + GOLD_L + '" stroke-width="2"/>' +
      L('M330,622 Q336,650 328,676', o, 3, 1, GOLD_L) + '<circle cx="328" cy="680" r="5" fill="' + GOLD + '" stroke="' + GOLD_L + '" stroke-width="1.5"/>';
  });

  /* ---------- wings ---------- */
  reg('wings.fairy', 'Shimmering fairy wings worn on the back. A reward item.', function (o) {
    return S.mir('<path d="M292,400 C210,250 70,236 52,330 C40,420 160,470 292,440 Z" fill="' + o.fill + '" opacity=".72" stroke="' + o.line + '" stroke-width="2.5"/>' +
      '<path d="M292,440 C190,470 116,548 150,628 C206,652 272,544 294,470 Z" fill="' + o.fill + '" opacity=".72" stroke="' + o.line + '" stroke-width="2.5"/>' +
      L('M290,410 C220,330 130,290 70,330 M288,426 C210,390 130,380 76,392 M290,450 C230,490 180,550 164,612', o, 1.6, 0.5, '#fff') +
      sparkles([[120, 320, 9], [190, 400, 6], [180, 560, 7], [90, 380, 5]]));
  }, { sample: '#c9a4ff' });
})(window.Game);
