/* Built-in Photo Shoot art: backdrops and frames (scene space, 1200 x 800) and stickers (unit space, 100 x 100).
   On backdrops the ground starts around y=560; the girl stands with her feet near y=760. */
(function (G) {
  'use strict';
  var S = G.svg, C = G.color, A = G.assets;
  var K = '#b5126f', GOLD = '#ffd84a', GOLD_L = '#b8860b';

  function reg(id, space, desc, draw, extra) {
    var def = { space: space, desc: desc, draw: draw, recolor: false };
    if (extra) for (var k in extra) def[k] = extra[k];
    A.register(id, def);
  }
  function sparks(pts, fill) { return pts.map(function (p) { return '<path d="' + S.spark(p[0], p[1], p[2]) + '" fill="' + (fill || '#fff') + '" opacity="' + (p[3] || 0.9) + '"/>'; }).join(''); }
  function cloud(x, y, s) { return '<g fill="#fff" transform="translate(' + x + ' ' + y + ') scale(' + s + ')"><ellipse cx="0" cy="0" rx="60" ry="22"/><ellipse cx="-24" cy="-16" rx="30" ry="22"/><ellipse cx="20" cy="-22" rx="36" ry="26"/></g>'; }

  /* ================= BACKDROPS ================= */
  reg('backdrop.room', 'scene', 'Her own bedroom, exactly as the player decorated it.', function () { return G.room ? G.room.markup(null, {}) : ''; });

  reg('backdrop.studio', 'scene', 'Photo studio: glossy pink backdrop with sparkles and a round stage.', function () {
    return '<rect width="1200" height="800" fill="' + G.defs.linear('#ff8ccb', '#ffe1f3') + '"/>' +
      '<circle cx="600" cy="330" r="330" fill="' + G.defs.radial('#ffffff') + '" opacity=".75"/>' +
      '<g fill="#fff" opacity=".28"><path d="' + S.heart(170, 190, 70) + '"/><path d="' + S.heart(1040, 150, 54) + '"/><path d="' + S.star(1010, 440, 60) + '"/><path d="' + S.star(210, 470, 46) + '"/></g>' +
      '<rect y="600" width="1200" height="200" fill="' + G.defs.linear('#ffc2e2', '#ff9ad0') + '"/><ellipse cx="600" cy="730" rx="360" ry="58" fill="#fff" opacity=".55"/><ellipse cx="600" cy="726" rx="300" ry="42" fill="#fff" opacity=".5"/>' +
      sparks([[120, 90, 22], [330, 60, 12], [900, 80, 18], [1100, 300, 14], [80, 360, 12], [700, 130, 10], [470, 180, 8]]);
  });

  reg('backdrop.beach', 'scene', 'Sunny beach with the sea, a palm tree and a parasol.', function () {
    var palm = '<path d="M150,640 C140,520 150,400 190,300 L214,306 C186,410 180,520 196,640 Z" fill="#c98a5a" stroke="#8a5a3c" stroke-width="3"/>' +
      '<g fill="#5fcf74" stroke="#2f8f4a" stroke-width="3" stroke-linejoin="round"><path d="M200,300 C120,250 60,270 20,330 C80,300 140,300 200,310 Z"/><path d="M200,300 C260,230 340,230 390,290 C330,270 260,280 204,310 Z"/><path d="M200,300 C170,220 110,180 50,190 C110,210 160,250 196,308 Z"/><path d="M200,300 C230,210 300,170 360,180 C300,200 240,250 206,308 Z"/><path d="M200,300 C196,230 210,180 240,140 C236,200 226,250 208,306 Z"/></g>' +
      '<circle cx="186" cy="312" r="13" fill="#8a5a3c"/><circle cx="210" cy="318" r="13" fill="#8a5a3c"/>';
    var parasol = '<path d="M960,470 L990,720" stroke="#fff" stroke-width="8" stroke-linecap="round"/><path d="M830,500 C850,400 1010,360 1110,440 Q1070,450 1052,474 Q1010,450 986,476 Q950,456 920,484 Q880,470 830,500 Z" fill="#ff5fb0" stroke="' + K + '" stroke-width="3" stroke-linejoin="round"/>' +
      '<path d="M920,484 Q950,400 1000,392 M986,476 Q1000,420 1000,392 M1052,474 Q1040,420 1000,392" fill="none" stroke="#fff" stroke-width="5" opacity=".7"/>';
    return '<rect width="1200" height="480" fill="' + G.defs.linear('#5fc4ff', '#d6f4ff') + '"/><circle cx="930" cy="130" r="170" fill="' + G.defs.radial('#fff7a8') + '"/><circle cx="930" cy="130" r="64" fill="#fff27a"/>' +
      cloud(330, 150, 1.3) + cloud(680, 90, 0.9) + cloud(1090, 260, 0.8) +
      '<rect y="440" width="1200" height="150" fill="' + G.defs.linear('#3fb6e8', '#8fe6f0') + '"/>' +
      '<path d="M0,470 Q60,460 120,470 T240,470 T360,470 T480,470 T600,470 T720,470 T840,470 T960,470 T1080,470 T1200,470" fill="none" stroke="#fff" stroke-width="4" opacity=".7"/>' +
      '<path d="M0,580 Q150,556 300,580 T600,580 T900,580 T1200,580 L1200,800 L0,800 Z" fill="#fff" opacity=".9"/>' +
      '<path d="M0,592 Q150,568 300,592 T600,592 T900,592 T1200,592 L1200,800 L0,800 Z" fill="' + G.defs.linear('#ffe9a8', '#ffd27a') + '"/>' +
      palm + parasol +
      '<g fill="#ff9ad0" stroke="' + K + '" stroke-width="2.5"><path d="' + S.star(420, 730, 26) + '"/></g><path d="M780,740 a22,18 0 0 1 44,0 Z" fill="#fff" stroke="#e7a9cf" stroke-width="3"/><path d="M790,740 L794,726 M802,740 L802,722 M814,740 L810,726" stroke="#e7a9cf" stroke-width="2.5"/>' +
      '<ellipse cx="1090" cy="752" rx="56" ry="14" fill="#7fd4ff" stroke="#3f8fd6" stroke-width="3"/><ellipse cx="1090" cy="744" rx="34" ry="24" fill="#ff5fb0" stroke="' + K + '" stroke-width="3"/><path d="M1058,744 Q1090,726 1122,744" fill="none" stroke="#fff" stroke-width="5"/>';
  });

  reg('backdrop.party', 'scene', 'Dance party: spotlights, disco ball and a glowing dance floor.', function () {
    var floor = '', cols = ['#ff4fa0', '#b06cff', '#5fb6ff', '#fff27a', '#59d6c0'], ys = [560, 606, 662, 728, 800];
    for (var r = 0; r < 4; r++) for (var c = -3; c < 12; c++) {
      var w0 = 150 + r * 22, w1 = 150 + (r + 1) * 22, x0 = 600 + (c - 4) * w0, x1 = 600 + (c - 4) * w1;
      floor += '<path d="M' + x0 + ',' + ys[r] + ' L' + (x0 + w0) + ',' + ys[r] + ' L' + (x1 + w1) + ',' + ys[r + 1] + ' L' + x1 + ',' + ys[r + 1] + ' Z" fill="' + cols[(r * 2 + c + 12) % 5] + '" stroke="#2a1244" stroke-width="3" opacity="' + ((r + c) % 2 ? 0.95 : 0.7) + '"/>';
    }
    var beams = [[200, '#ff4fa0', -30], [450, '#5fb6ff', -10], [750, '#fff27a', 10], [1000, '#b06cff', 30]].map(function (b) {
      return '<path d="M' + b[0] + ',0 L' + (b[0] + b[2] * 9 - 130) + ',600 L' + (b[0] + b[2] * 9 + 130) + ',600 Z" fill="' + b[1] + '" opacity=".22"/>';
    }).join('');
    var tiles = '';
    for (var i = -3; i <= 3; i++) for (var j = -3; j <= 3; j++) if (i * i + j * j < 12) tiles += '<rect x="' + (600 + i * 17 - 7) + '" y="' + (120 + j * 17 - 7) + '" width="14" height="14" rx="3" fill="' + ((i + j) % 2 ? '#fff' : '#d7c4ff') + '" opacity=".9"/>';
    var conf = '', seed = 9;
    var rnd = function () { seed = (seed * 16807) % 2147483647; return seed / 2147483647; };
    for (var k = 0; k < 60; k++) conf += '<rect x="' + (rnd() * 1200).toFixed(0) + '" y="' + (rnd() * 520).toFixed(0) + '" width="10" height="5" rx="2" fill="' + cols[k % 5] + '" transform="rotate(' + (rnd() * 180).toFixed(0) + ' ' + (rnd() * 1200).toFixed(0) + ' ' + (rnd() * 500).toFixed(0) + ')" opacity=".85"/>';
    return '<rect width="1200" height="800" fill="' + G.defs.linear('#2a1244', '#6b2a8a') + '"/>' + beams + conf +
      '<path d="M600,0 L600,60" stroke="#c9cfe0" stroke-width="4"/><circle cx="600" cy="120" r="170" fill="' + G.defs.radial('#ffffff') + '" opacity=".25"/><circle cx="600" cy="120" r="62" fill="#c9cfe0" stroke="#7d8496" stroke-width="3"/>' + tiles +
      '<rect y="556" width="1200" height="244" fill="#1a0a2e"/>' + floor +
      sparks([[540, 70, 18], [690, 160, 14], [120, 120, 14], [1080, 90, 18], [320, 300, 10], [920, 330, 12], [80, 420, 9], [1130, 440, 10]]);
  });

  reg('backdrop.park', 'scene', 'Sunny park with trees, flowers and a winding path.', function () {
    var tree = function (x, y, s) {
      return '<g transform="translate(' + x + ' ' + y + ') scale(' + s + ')"><rect x="-14" y="0" width="28" height="120" rx="8" fill="#b9825a" stroke="#8a5a3c" stroke-width="3"/>' +
        G.art.merged('<circle cx="0" cy="-60" r="70"/><circle cx="-56" cy="-20" r="50"/><circle cx="56" cy="-20" r="50"/><circle cx="-30" cy="-100" r="44"/><circle cx="34" cy="-104" r="46"/>', '#7fdc7a', '#3f9f52', 6) +
        '<circle cx="-20" cy="-70" r="8" fill="#ff8cc6"/><circle cx="30" cy="-30" r="8" fill="#ff8cc6"/><circle cx="-50" cy="-14" r="7" fill="#fff"/><circle cx="18" cy="-110" r="7" fill="#fff"/></g>';
    };
    var flowers = '', seed = 4, cols = ['#ff5fb0', '#fff', '#fff27a', '#b983ff'];
    var rnd = function () { seed = (seed * 16807) % 2147483647; return seed / 2147483647; };
    for (var i = 0; i < 26; i++) {
      var x = rnd() * 1200, y = 600 + rnd() * 190;
      if (Math.abs(x - 600) < 200 + (y - 600) * 0.6) continue;
      flowers += '<path d="M' + x.toFixed(0) + ',' + y.toFixed(0) + ' l0,-16" stroke="#3f9f52" stroke-width="3"/><circle cx="' + x.toFixed(0) + '" cy="' + (y - 20).toFixed(0) + '" r="8" fill="' + cols[i % 4] + '" stroke="' + K + '" stroke-width="1.5"/><circle cx="' + x.toFixed(0) + '" cy="' + (y - 20).toFixed(0) + '" r="3" fill="#ffd84a"/>';
    }
    return '<rect width="1200" height="560" fill="' + G.defs.linear('#7fd0ff', '#e3f8ff') + '"/><circle cx="170" cy="120" r="56" fill="#fff27a"/>' + cloud(480, 130, 1.2) + cloud(900, 90, 1) + cloud(1080, 230, 0.7) +
      '<path d="M0,470 Q200,380 420,450 Q640,360 860,440 Q1040,380 1200,450 L1200,620 L0,620 Z" fill="#a6e88f"/>' +
      '<rect y="540" width="1200" height="260" fill="' + G.defs.linear('#8fe07a', '#6fcf6a') + '"/>' +
      '<path d="M560,540 C520,620 420,700 300,800 L900,800 C780,700 680,620 640,540 Z" fill="#ffe3b8" stroke="#e8c48f" stroke-width="3"/>' +
      tree(150, 470, 1.25) + tree(1040, 460, 1.4) + tree(360, 440, 0.7) + tree(840, 440, 0.65) + flowers +
      '<g transform="translate(905 610)"><rect x="0" y="0" width="150" height="14" rx="5" fill="#ff8cc6" stroke="' + K + '" stroke-width="3"/><rect x="0" y="-34" width="150" height="12" rx="5" fill="#ff8cc6" stroke="' + K + '" stroke-width="3"/><path d="M14,-34 L14,44 M136,-34 L136,44" stroke="' + K + '" stroke-width="7" stroke-linecap="round"/></g>';
  });

  reg('backdrop.mall', 'scene', 'Shopping mall with cute shop windows.', function () {
    var shop = function (x, c, icon) {
      return '<rect x="' + x + '" y="150" width="330" height="410" fill="#fff" stroke="#e7a9cf" stroke-width="4"/><rect x="' + (x + 26) + '" y="250" width="180" height="230" rx="8" fill="' + G.defs.linear('#d7f3ff', '#f4e6ff') + '" stroke="' + c + '" stroke-width="5"/>' +
        '<rect x="' + (x + 226) + '" y="250" width="80" height="310" rx="6" fill="' + C.light(c, 0.5) + '" stroke="' + c + '" stroke-width="5"/><circle cx="' + (x + 240) + '" cy="410" r="6" fill="' + GOLD + '"/>' +
        '<path d="M' + (x - 10) + ',150 L' + (x + 340) + ',150 L' + (x + 340) + ',214 Q' + (x + 312) + ',240 ' + (x + 284) + ',214 Q' + (x + 256) + ',240 ' + (x + 228) + ',214 Q' + (x + 200) + ',240 ' + (x + 172) + ',214 Q' + (x + 144) + ',240 ' + (x + 116) + ',214 Q' + (x + 88) + ',240 ' + (x + 60) + ',214 Q' + (x + 32) + ',240 ' + (x - 10) + ',214 Z" fill="' + c + '" stroke="' + C.dark(c, 0.4) + '" stroke-width="3"/>' +
        '<g transform="translate(' + (x + 116) + ' 370)">' + icon + '</g><path d="M' + (x + 44) + ',270 L' + (x + 80) + ',270 L' + (x + 56) + ',330 Z" fill="#fff" opacity=".6"/>';
    };
    var dress = '<path d="M-20,-70 L-8,-70 Q0,-56 8,-70 L20,-70 L16,-30 L44,70 L-44,70 L-16,-30 Z" fill="#ff5fb0" stroke="' + K + '" stroke-width="3"/>';
    var shoe = '<path d="M-50,-10 C-30,-8 -10,20 20,28 C44,30 56,40 56,54 L-8,54 C-16,40 -30,30 -38,28 L-38,60 L-52,60 Z" fill="#b983ff" stroke="#7a3fd0" stroke-width="3"/><path d="' + S.heart(0, -50, 20) + '" fill="#ff8cc6"/>';
    var gem = '<path d="M-36,-40 L36,-40 L60,-6 L0,60 L-60,-6 Z" fill="#7fd4ff" stroke="#3f8fd6" stroke-width="3"/><path d="M-60,-6 L60,-6 M-36,-40 L-18,-6 L0,60 L18,-6 L36,-40" fill="none" stroke="#3f8fd6" stroke-width="2.5"/>';
    var tiles = '';
    for (var i = 0; i < 9; i++) tiles += '<path d="M' + (600 + (i - 4) * 150) + ',560 L' + (600 + (i - 4) * 330) + ',800" stroke="#f2bfdd" stroke-width="3"/>';
    return '<rect width="1200" height="560" fill="' + G.defs.linear('#ffe1f3', '#fff7fc') + '"/><rect width="1200" height="110" fill="#ffc2e2"/>' +
      '<g fill="#fff" opacity=".7"><circle cx="150" cy="56" r="30"/><circle cx="450" cy="56" r="30"/><circle cx="750" cy="56" r="30"/><circle cx="1050" cy="56" r="30"/></g>' +
      shop(40, '#ff5fb0', dress) + shop(435, '#b983ff', shoe) + shop(830, '#59d6c0', gem) +
      '<rect y="560" width="1200" height="240" fill="#fff5fb"/>' + tiles + '<path d="M0,620 L1200,620 M0,700 L1200,700" stroke="#f2bfdd" stroke-width="3"/>' +
      '<g transform="translate(400 600)"><path d="M-26,0 L26,0 L20,60 L-20,60 Z" fill="#ff8cc6" stroke="' + K + '" stroke-width="3"/><g fill="#6fcf6a" stroke="#2f7f3a" stroke-width="3"><path d="M0,0 C-30,-30 -40,-70 -30,-100 C-6,-70 0,-40 0,0 Z"/><path d="M0,0 C30,-30 40,-70 30,-100 C6,-70 0,-40 0,0 Z"/><path d="M0,0 C-10,-50 -4,-100 0,-124 C4,-100 10,-50 0,0 Z"/></g></g>' +
      '<g transform="translate(800 600)"><path d="M-26,0 L26,0 L20,60 L-20,60 Z" fill="#ff8cc6" stroke="' + K + '" stroke-width="3"/><g fill="#6fcf6a" stroke="#2f7f3a" stroke-width="3"><path d="M0,0 C-30,-30 -40,-70 -30,-100 C-6,-70 0,-40 0,0 Z"/><path d="M0,0 C30,-30 40,-70 30,-100 C6,-70 0,-40 0,0 Z"/><path d="M0,0 C-10,-50 -4,-100 0,-124 C4,-100 10,-50 0,0 Z"/></g></g>';
  });

  reg('backdrop.stage', 'scene', 'Star stage with red curtains, spotlights and a red carpet. A reward item.', function () {
    var curtain = '<path d="M0,0 L250,0 C230,200 150,330 60,400 C100,520 90,650 70,800 L0,800 Z" fill="#e0245e" stroke="#8a1238" stroke-width="4"/><path d="M60,0 C50,160 30,300 34,420 M150,0 C140,140 110,250 80,340" fill="none" stroke="#8a1238" stroke-width="3" opacity=".5"/>' +
      '<path d="M40,390 Q70,376 92,402 Q70,424 38,414 Z" fill="' + GOLD + '" stroke="' + GOLD_L + '" stroke-width="3"/>';
    var stars = '';
    [[330, 120, 22], [470, 70, 14], [600, 150, 26], [740, 80, 16], [880, 130, 22], [420, 250, 12], [800, 260, 14], [600, 300, 10]].forEach(function (p) { stars += '<path d="' + S.star(p[0], p[1], p[2]) + '" fill="' + GOLD + '" stroke="' + GOLD_L + '" stroke-width="2"/>'; });
    return '<rect width="1200" height="800" fill="' + G.defs.linear('#3a1060', '#8a2a9a') + '"/>' +
      '<path d="M380,0 L250,600 L560,600 Z" fill="#fff" opacity=".14"/><path d="M820,0 L640,600 L950,600 Z" fill="#fff" opacity=".14"/><path d="M600,0 L470,600 L730,600 Z" fill="#fff7a8" opacity=".16"/>' + stars +
      '<rect y="580" width="1200" height="220" fill="#5a1a7a"/><path d="M470,580 L730,580 L900,800 L300,800 Z" fill="#e0245e" stroke="#8a1238" stroke-width="4"/><path d="M500,580 L350,800 M700,580 L850,800" stroke="' + GOLD + '" stroke-width="5"/>' +
      curtain + '<g transform="matrix(-1 0 0 1 1200 0)">' + curtain + '</g>' +
      '<path d="M0,0 L1200,0 L1200,70 Q1125,110 1050,70 Q975,110 900,70 Q825,110 750,70 Q675,110 600,70 Q525,110 450,70 Q375,110 300,70 Q225,110 150,70 Q75,110 0,70 Z" fill="#c2184f" stroke="#8a1238" stroke-width="4"/>' +
      sparks([[300, 420, 14], [920, 400, 16], [560, 440, 10], [690, 380, 8]]);
  });

  /* ================= FRAMES ================= */
  var HOLE = ' M70,70 L70,730 L1130,730 L1130,70 Z';
  reg('frame.hearts', 'scene', 'Pink photo frame with hearts in the corners.', function () {
    return '<path fill-rule="evenodd" d="M0,0 L1200,0 L1200,800 L0,800 Z' + HOLE + '" fill="' + G.defs.linear('#ff7fc4', '#ff4fa0') + '"/><rect x="66" y="66" width="1068" height="668" rx="18" fill="none" stroke="#fff" stroke-width="8"/>' +
      [[70, 70], [1130, 70], [70, 730], [1130, 730]].map(function (p) { return '<path d="' + S.heart(p[0], p[1], 44) + '" fill="#fff" stroke="' + K + '" stroke-width="4"/><path d="' + S.heart(p[0], p[1], 24) + '" fill="#ff4fa0"/>'; }).join('') +
      [[300, 34], [600, 34], [900, 34], [300, 766], [600, 766], [900, 766]].map(function (p) { return '<path d="' + S.heart(p[0], p[1], 16) + '" fill="#fff" opacity=".85"/>'; }).join('');
  });
  reg('frame.polaroid', 'scene', 'White instant-photo frame with tape.', function () {
    return '<path fill-rule="evenodd" d="M0,0 L1200,0 L1200,800 L0,800 Z M60,50 L60,650 L1140,650 L1140,50 Z" fill="#fff"/><rect x="60" y="50" width="1080" height="600" fill="none" stroke="#e7d3de" stroke-width="4"/>' +
      '<rect x="2" y="2" width="1196" height="796" fill="none" stroke="#e7d3de" stroke-width="4"/><rect x="500" y="-14" width="200" height="50" fill="#ffc2e2" opacity=".85" transform="rotate(-3 600 10)"/>' +
      '<path d="' + S.heart(1090, 726, 26) + '" fill="#ff5fb0"/><path d="' + S.star(1030, 730, 20) + '" fill="' + GOLD + '"/>';
  });
  reg('frame.stars', 'scene', 'Purple glitter frame with stars.', function () {
    var st = '';
    for (var i = 0; i < 14; i++) st += '<path d="' + S.star(50 + i * 85, i % 2 ? 30 : 40, i % 2 ? 16 : 22) + '" fill="' + GOLD + '" stroke="#fff" stroke-width="2"/><path d="' + S.star(50 + i * 85, i % 2 ? 770 : 760, i % 2 ? 16 : 22) + '" fill="' + GOLD + '" stroke="#fff" stroke-width="2"/>';
    for (var j = 1; j < 8; j++) st += '<path d="' + S.star(34, j * 100, 18) + '" fill="#fff" opacity=".9"/><path d="' + S.star(1166, j * 100, 18) + '" fill="#fff" opacity=".9"/>';
    return '<path fill-rule="evenodd" d="M0,0 L1200,0 L1200,800 L0,800 Z' + HOLE + '" fill="' + G.patterns.fill('glitter', '#a55cff', 1.4) + '"/><rect x="66" y="66" width="1068" height="668" rx="18" fill="none" stroke="#fff" stroke-width="8"/>' + st;
  });
  reg('frame.gold', 'scene', 'Fancy golden frame. A reward item.', function () {
    return '<path fill-rule="evenodd" d="M0,0 L1200,0 L1200,800 L0,800 Z' + HOLE + '" fill="' + G.defs.linear('#ffe889', '#e0a92a') + '"/>' +
      '<rect x="12" y="12" width="1176" height="776" rx="10" fill="none" stroke="#b8860b" stroke-width="6"/><rect x="34" y="34" width="1132" height="732" rx="14" fill="none" stroke="#fff3b0" stroke-width="5"/><rect x="66" y="66" width="1068" height="668" rx="14" fill="none" stroke="#b8860b" stroke-width="6"/>' +
      [[70, 70], [1130, 70], [70, 730], [1130, 730]].map(function (p) { return '<circle cx="' + p[0] + '" cy="' + p[1] + '" r="40" fill="#ffe889" stroke="#b8860b" stroke-width="5"/><path d="' + S.star(p[0], p[1], 26) + '" fill="#fff" stroke="#b8860b" stroke-width="3"/>'; }).join('') +
      '<path d="M540,34 Q600,-10 660,34 Q600,60 540,34 Z" fill="#ff4fa0" stroke="' + K + '" stroke-width="4"/><path d="' + S.heart(600, 30, 16) + '" fill="#fff"/>';
  });

  /* ================= STICKERS ================= */
  var stick = function (id, desc, body) { reg('sticker.' + id, 'unit', desc, typeof body === 'function' ? body : function () { return body; }); };
  var o = ' stroke="#fff" stroke-width="6" stroke-linejoin="round" paint-order="stroke"';
  stick('heart', 'Pink heart sticker.', '<path d="' + S.heart(50, 52, 36) + '" fill="#ff4fa0"' + o + '/><ellipse cx="34" cy="38" rx="9" ry="5" fill="#fff" opacity=".7" transform="rotate(-30 34 38)"/>');
  stick('star', 'Yellow star sticker.', '<path d="' + S.star(50, 52, 44, 20) + '" fill="#ffd84a"' + o + '/><ellipse cx="38" cy="40" rx="8" ry="5" fill="#fff" opacity=".7" transform="rotate(-30 38 40)"/>');
  stick('sparkle', 'Sparkle sticker.', '<path d="' + S.spark(46, 54, 40) + '" fill="#fff27a"' + o + '/><path d="' + S.spark(82, 20, 15) + '" fill="#fff"/><path d="' + S.spark(18, 16, 9) + '" fill="#fff"/>');
  stick('butterfly', 'Butterfly sticker.', '<g' + o + '><path d="M50,50 C36,10 2,14 8,44 C2,72 34,84 50,56 Z" fill="#b983ff"/><path d="M50,50 C64,10 98,14 92,44 C98,72 66,84 50,56 Z" fill="#b983ff"/></g><circle cx="26" cy="36" r="7" fill="#fff" opacity=".7"/><circle cx="74" cy="36" r="7" fill="#fff" opacity=".7"/><ellipse cx="50" cy="52" rx="5" ry="26" fill="#5a2a8a"/>');
  stick('flower', 'Daisy sticker.', function () {
    var b = '';
    for (var i = 0; i < 6; i++) { var a = Math.PI * 2 * i / 6; b += '<circle cx="' + (50 + Math.cos(a) * 24).toFixed(1) + '" cy="' + (50 + Math.sin(a) * 24).toFixed(1) + '" r="17" fill="#ff8cc6"' + o + '/>'; }
    return b + '<circle cx="50" cy="50" r="15" fill="#ffd84a"/>';
  });
  stick('kiss', 'Lipstick kiss sticker.', '<path d="M8,48 C24,26 40,26 50,36 C60,26 76,26 92,48 C76,80 24,80 8,48 Z" fill="#e0245e"' + o + '/><path d="M14,48 Q50,58 86,48" fill="none" stroke="#8a1238" stroke-width="3"/><ellipse cx="36" cy="40" rx="8" ry="3" fill="#fff" opacity=".6"/>');
  stick('rainbow', 'Rainbow sticker.', '<g fill="none" stroke-width="10" stroke-linecap="round"><path d="M10,76 a40,40 0 0 1 80,0" stroke="#ff5a5a"/><path d="M20,76 a30,30 0 0 1 60,0" stroke="#ffd84a"/><path d="M30,76 a20,20 0 0 1 40,0" stroke="#59d6c0"/><path d="M40,76 a10,10 0 0 1 20,0" stroke="#7fd4ff"/></g><ellipse cx="14" cy="78" rx="14" ry="9" fill="#fff"/><ellipse cx="86" cy="78" rx="14" ry="9" fill="#fff"/>');
  stick('note', 'Music note sticker.', '<path d="M34,22 L78,12 L78,62 C78,78 54,78 54,64 C54,54 66,52 70,56 L70,30 L42,36 L42,74 C42,90 18,90 18,76 C18,66 30,64 34,68 Z" fill="#7fd4ff"' + o + '/>');
  stick('bow', 'Bow sticker.', function () { return G.art.bow(50, 48, 1.6, '#ff5fb0', K); });
  stick('cherry', 'Cherries sticker.', '<path d="M34,62 C34,36 50,20 72,12 M68,66 C66,40 68,24 72,12" fill="none" stroke="#2f7f3a" stroke-width="4" stroke-linecap="round"/><path d="M72,12 C84,10 94,18 94,28 C84,30 76,24 72,12 Z" fill="#6fcf6a"/><circle cx="32" cy="72" r="20" fill="#e0245e"' + o + '/><circle cx="70" cy="76" r="20" fill="#e0245e"' + o + '/><circle cx="25" cy="65" r="5" fill="#fff" opacity=".7"/><circle cx="63" cy="69" r="5" fill="#fff" opacity=".7"/>');
  stick('cupcake', 'Cupcake sticker.', '<path d="M24,56 L76,56 L68,92 L32,92 Z" fill="#7fd4ff"' + o + '/><path d="M34,58 L38,90 M50,58 L50,90 M66,58 L62,90" stroke="#3f8fd6" stroke-width="3"/><path d="M18,58 C10,40 26,30 34,34 C36,16 64,16 66,34 C76,30 90,40 82,58 Z" fill="#ff8cc6"' + o + '/><circle cx="50" cy="16" r="9" fill="#e0245e"/><circle cx="36" cy="44" r="3" fill="#fff"/><circle cx="60" cy="40" r="3" fill="#fff27a"/><circle cx="50" cy="50" r="3" fill="#7fd4ff"/>');
  stick('icecream', 'Ice cream sticker.', '<path d="M30,50 L70,50 L50,96 Z" fill="#f2c48a"' + o + '/><path d="M36,58 L60,74 M64,56 L44,80" stroke="#c98a5a" stroke-width="3"/><circle cx="36" cy="40" r="18" fill="#ff8cc6"' + o + '/><circle cx="64" cy="40" r="18" fill="#fff7c4"' + o + '/><circle cx="50" cy="22" r="18" fill="#b9f2e2"' + o + '/><circle cx="50" cy="6" r="6" fill="#e0245e"/>');
  stick('sun', 'Smiling sun sticker.', function () {
    var rays = '';
    for (var i = 0; i < 10; i++) { var a = Math.PI * 2 * i / 10; rays += '<path d="M' + (50 + Math.cos(a) * 32).toFixed(1) + ',' + (50 + Math.sin(a) * 32).toFixed(1) + ' L' + (50 + Math.cos(a) * 46).toFixed(1) + ',' + (50 + Math.sin(a) * 46).toFixed(1) + '" stroke="#ffb347" stroke-width="7" stroke-linecap="round"/>'; }
    return rays + '<circle cx="50" cy="50" r="27" fill="#ffd84a"' + o + '/><circle cx="41" cy="45" r="3.5" fill="#8a5a1a"/><circle cx="59" cy="45" r="3.5" fill="#8a5a1a"/><path d="M40,56 Q50,66 60,56" fill="none" stroke="#8a5a1a" stroke-width="3" stroke-linecap="round"/>';
  });
  stick('crown', 'Crown sticker.', '<path d="M12,80 L6,28 L32,52 L50,14 L68,52 L94,28 L88,80 Z" fill="#ffd84a"' + o + '/><circle cx="50" cy="60" r="8" fill="#ff4fa0"/><circle cx="26" cy="66" r="5" fill="#7fd4ff"/><circle cx="74" cy="66" r="5" fill="#7fd4ff"/>');
  stick('paw', 'Paw print sticker.', '<g fill="#b983ff"' + o + '><ellipse cx="50" cy="66" rx="24" ry="20"/><ellipse cx="22" cy="42" rx="10" ry="13"/><ellipse cx="40" cy="24" rx="10" ry="13"/><ellipse cx="62" cy="24" rx="10" ry="13"/><ellipse cx="80" cy="42" rx="10" ry="13"/></g>');
  stick('disc', 'Shiny CD sticker.', function () {
    G.patterns.defs.holo('#ffffff'); // makes sure the rainbow gradient exists
    return '<circle cx="50" cy="50" r="42" fill="url(#holo-grad)"' + o + '/><circle cx="50" cy="50" r="12" fill="#fff" stroke="#c9cfe0" stroke-width="3"/><path d="M22,34 A34,34 0 0 1 50,16" fill="none" stroke="#fff" stroke-width="6" stroke-linecap="round" opacity=".8"/>';
  });
})(window.Game);
