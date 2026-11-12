/* Built-in pets: puppy and kitten, plus their accessories and bath-time overlays.
   Pet space is 400 x 400. Both pets sit facing the viewer and share the same proportions,
   so every accessory fits both:
     head centre (200,160) radius ~92, eyes (165,152) / (235,152), neck y~245,
     body centre (200,300), paws y~365. */
(function (G) {
  'use strict';
  var S = G.svg, C = G.color, A = G.assets;
  var INK = '#3a1a26', GOLD = '#ffd84a', GOLD_L = '#b8860b';

  function fur(o) { return { c: o.color, line: C.mix(o.color, '#5a2a2a', 0.55), dark: C.mix(o.color, '#8a4a3a', 0.28), light: C.light(o.color, 0.55) }; }
  function reg(id, desc, draw, extra) {
    var def = { space: 'pet', desc: desc, draw: draw };
    if (extra) for (var k in extra) def[k] = extra[k];
    A.register(id, def);
  }
  var merged = G.art.merged;

  /* ---------- bodies ---------- */
  function bodyShapes() {
    return '<ellipse cx="124" cy="360" rx="30" ry="20"/><ellipse cx="276" cy="360" rx="30" ry="20"/>' +
      '<ellipse cx="200" cy="300" rx="84" ry="82"/>' +
      '<ellipse cx="166" cy="366" rx="27" ry="19"/><ellipse cx="234" cy="366" rx="27" ry="19"/>';
  }
  function bodyDetail(f) {
    return '<ellipse cx="200" cy="310" rx="46" ry="54" fill="' + f.light + '"/>' +
      '<path d="M158,364 l0,10 M166,366 l0,10 M174,364 l0,10 M226,364 l0,10 M234,366 l0,10 M242,364 l0,10" stroke="' + f.line + '" stroke-width="2.5" stroke-linecap="round" opacity=".6"/>';
  }
  reg('pet.puppy.body', 'Puppy body: sitting, front view, with a wagging tail. Colored by fur color.', function (o) {
    var f = fur(o);
    return merged('<path d="M270,300 C320,290 340,250 322,222 C314,212 302,220 308,232 C316,252 296,268 266,270 Z"/>' + bodyShapes(), f.c, f.line, 6) + bodyDetail(f);
  }, { sample: '#f2c48a' });
  reg('pet.kitten.body', 'Kitten body: sitting, front view, with a long curled tail. Colored by fur color.', function (o) {
    var f = fur(o);
    return merged('<path d="M268,330 C330,340 366,300 352,250 C346,226 322,222 318,240 C316,252 330,254 332,262 C338,290 310,306 270,300 Z"/>' + bodyShapes(), f.c, f.line, 6) + bodyDetail(f) +
      '<path d="M334,246 C344,262 340,284 326,296" fill="none" stroke="' + f.dark + '" stroke-width="7" stroke-linecap="round" opacity=".7"/>';
  }, { sample: '#d9dbe8' });

  /* ---------- heads ---------- */
  reg('pet.puppy.head', 'Puppy head with floppy ears and a white muzzle (no eyes or mouth). Colored by fur color.', function (o) {
    var f = fur(o);
    var ear = '<path d="M130,92 C92,84 70,130 78,190 C82,224 104,236 118,214 C128,190 126,140 150,104 Z" fill="' + f.dark + '" stroke="' + f.line + '" stroke-width="3" stroke-linejoin="round"/>';
    return S.mir(ear, 200) +
      '<ellipse cx="200" cy="160" rx="96" ry="90" fill="' + f.c + '" stroke="' + f.line + '" stroke-width="3"/>' +
      '<path d="M236,84 C276,88 296,126 290,168 C270,172 240,150 236,84 Z" fill="' + f.dark + '" opacity=".8"/>' +
      '<ellipse cx="200" cy="198" rx="46" ry="36" fill="' + f.light + '"/>' +
      '<ellipse cx="170" cy="100" rx="22" ry="10" fill="#fff" opacity=".3" transform="rotate(-20 170 100)"/>';
  }, { sample: '#f2c48a' });
  reg('pet.kitten.head', 'Kitten head with pointed ears and whiskers (no eyes or mouth). Colored by fur color.', function (o) {
    var f = fur(o);
    var ear = '<path d="M116,128 L112,40 L186,84 Z" fill="' + f.c + '" stroke="' + f.line + '" stroke-width="3" stroke-linejoin="round"/><path d="M128,104 L126,62 L160,84 Z" fill="#ffb3d0"/>';
    return S.mir(ear, 200) +
      '<path d="M200,72 C262,72 300,112 300,164 C300,216 258,248 200,248 C142,248 100,216 100,164 C100,112 138,72 200,72 Z" fill="' + f.c + '" stroke="' + f.line + '" stroke-width="3"/>' +
      '<path d="M188,74 L194,104 M200,72 L200,108 M212,74 L206,104" stroke="' + f.dark + '" stroke-width="6" stroke-linecap="round" opacity=".8"/>' +
      '<ellipse cx="200" cy="204" rx="36" ry="26" fill="' + f.light + '"/>' +
      S.mir('<path d="M150,200 L92,188 M150,208 L90,212 M152,216 L98,234" stroke="' + f.line + '" stroke-width="2.2" stroke-linecap="round" opacity=".7"/>', 200) +
      '<ellipse cx="166" cy="104" rx="20" ry="9" fill="#fff" opacity=".3" transform="rotate(-20 166 104)"/>';
  }, { sample: '#d9dbe8' });

  /* ---------- faces ---------- */
  function eye(x, col) {
    return '<ellipse cx="' + x + '" cy="152" rx="17" ry="19" fill="' + INK + '"/><ellipse cx="' + x + '" cy="156" rx="11" ry="12" fill="' + col + '"/>' +
      '<circle cx="' + (x - 5) + '" cy="144" r="6.5" fill="#fff"/><circle cx="' + (x + 6) + '" cy="160" r="3" fill="#fff" opacity=".85"/>';
  }
  function eyesClosed() { return S.mir('<path d="M148,156 Q165,170 182,156" fill="none" stroke="' + INK + '" stroke-width="5" stroke-linecap="round"/>', 200); }
  function eyesHappy() { return S.mir('<path d="M148,160 Q165,140 182,160" fill="none" stroke="' + INK + '" stroke-width="5.5" stroke-linecap="round"/>', 200); }
  function eyesLove() { return S.mir('<path d="' + S.heart(165, 154, 17) + '" fill="#ff4fa0" stroke="#b5126f" stroke-width="2.5"/><circle cx="159" cy="148" r="4" fill="#fff" opacity=".8"/>', 200); }
  var cheeks = S.mir('<ellipse cx="128" cy="190" rx="16" ry="10" fill="#ff8cc6" opacity=".5"/>', 200);

  function puppyMouth(open) {
    return '<ellipse cx="200" cy="184" rx="15" ry="11" fill="' + INK + '"/><ellipse cx="195" cy="180" rx="5" ry="3" fill="#fff" opacity=".5"/>' +
      (open ? '<path d="M178,204 Q200,214 222,204 Q220,236 200,238 Q180,236 178,204 Z" fill="#8a2540" stroke="' + INK + '" stroke-width="3" stroke-linejoin="round"/><path d="M188,220 Q200,212 212,220 Q212,244 200,246 Q188,244 188,220 Z" fill="#ff7d9c" stroke="' + INK + '" stroke-width="2.5"/>' : '') +
      '<path d="M200,194 L200,204 M176,202 Q188,214 200,204 Q212,214 224,202" fill="none" stroke="' + INK + '" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>';
  }
  function kittenMouth(open) {
    return '<path d="M190,190 L210,190 L200,201 Z" fill="#ff7fa8" stroke="' + INK + '" stroke-width="2.5" stroke-linejoin="round"/>' +
      (open ? '<path d="M188,212 Q200,206 212,212 Q210,230 200,232 Q190,230 188,212 Z" fill="#ff7d9c" stroke="' + INK + '" stroke-width="2.5"/>' : '') +
      '<path d="M200,201 L200,208 M182,208 Q192,218 200,208 Q208,218 218,208" fill="none" stroke="' + INK + '" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round"/>';
  }
  [['puppy', puppyMouth, '#6b3a1e'], ['kitten', kittenMouth, '#5fb94a']].forEach(function (p) {
    var name = p[0], mouth = p[1], eyeCol = p[2];
    reg('pet.' + name + '.face.happy', name + ' face: big shiny eyes and a happy open mouth.', function () { return eye(165, eyeCol) + eye(235, eyeCol) + cheeks + mouth(true); }, { recolor: false });
    reg('pet.' + name + '.face.calm', name + ' face: big shiny eyes, mouth closed.', function () { return eye(165, eyeCol) + eye(235, eyeCol) + cheeks + mouth(false); }, { recolor: false });
    reg('pet.' + name + '.face.closed', name + ' face: eyes closed (during the bath).', function () { return eyesClosed() + cheeks + mouth(false); }, { recolor: false });
    reg('pet.' + name + '.face.joy', name + ' face: eyes squeezed shut with joy, mouth open.', function () { return eyesHappy() + cheeks + mouth(true); }, { recolor: false });
    reg('pet.' + name + '.face.love', name + ' face: heart eyes.', function () { return eyesLove() + cheeks + mouth(true); }, { recolor: false });
  });

  /* ---------- bath overlays ---------- */
  var SPOTS = [[150, 120, 26], [258, 200, 22], [140, 300, 30], [250, 320, 26], [200, 260, 18], [280, 130, 16], [110, 200, 16], [200, 366, 20]];
  reg('pet.fx.mud', 'Mud splats on a dirty pet.', function () {
    return SPOTS.map(function (s, i) {
      return '<path d="M' + (s[0] - s[2]) + ',' + s[1] + ' C' + (s[0] - s[2]) + ',' + (s[1] - s[2] * 0.9) + ' ' + (s[0] + s[2] * 0.4) + ',' + (s[1] - s[2] * 1.1) + ' ' + (s[0] + s[2] * 0.9) + ',' + (s[1] - s[2] * 0.3) +
        ' C' + (s[0] + s[2] * 1.3) + ',' + (s[1] + s[2] * 0.6) + ' ' + (s[0] + s[2] * 0.2) + ',' + (s[1] + s[2]) + ' ' + (s[0] - s[2] * 0.5) + ',' + (s[1] + s[2] * 0.7) + ' C' + (s[0] - s[2] * 1.1) + ',' + (s[1] + s[2] * 0.6) + ' ' + (s[0] - s[2] * 1.2) + ',' + (s[1] + s[2] * 0.2) + ' ' + (s[0] - s[2]) + ',' + s[1] + ' Z" fill="' + (i % 2 ? '#8a5a3c' : '#a06a44') + '" opacity=".9"/>' +
        '<circle cx="' + (s[0] + s[2] * 1.2) + '" cy="' + (s[1] - s[2] * 0.9) + '" r="' + (s[2] * 0.18) + '" fill="#8a5a3c"/>';
    }).join('');
  }, { recolor: false });
  reg('pet.fx.foam', 'Shampoo bubbles covering the pet.', function () {
    var b = '', seed = 21;
    var rnd = function () { seed = (seed * 16807) % 2147483647; return seed / 2147483647; };
    for (var i = 0; i < 60; i++) {
      var head = i < 26, a = rnd() * Math.PI * 2, r = Math.sqrt(rnd());
      var x = head ? 200 + Math.cos(a) * r * 96 : 200 + Math.cos(a) * r * 92, y = head ? 130 + Math.sin(a) * r * 62 : 310 + Math.sin(a) * r * 70, s = 10 + rnd() * 16;
      if (head && y > 130 && Math.abs(x - 200) < 70) y -= 60; // keep the face visible
      b += '<circle cx="' + x.toFixed(0) + '" cy="' + y.toFixed(0) + '" r="' + s.toFixed(0) + '" fill="#fff" stroke="#bfe9ff" stroke-width="2" opacity=".95"/><circle cx="' + (x - s * 0.3).toFixed(0) + '" cy="' + (y - s * 0.3).toFixed(0) + '" r="' + (s * 0.22).toFixed(1) + '" fill="#dff5ff"/>';
    }
    return b;
  }, { recolor: false });
  reg('pet.fx.wet', 'Water drops on a wet pet.', function () {
    var b = '';
    [[120, 110], [286, 120], [96, 220], [306, 230], [140, 330], [264, 340], [200, 60], [70, 300], [330, 310], [200, 392]].forEach(function (p, i) {
      b += '<path d="M' + p[0] + ',' + (p[1] - 14) + ' C' + (p[0] - 9) + ',' + p[1] + ' ' + (p[0] - 9) + ',' + (p[1] + 10) + ' ' + p[0] + ',' + (p[1] + 10) + ' C' + (p[0] + 9) + ',' + (p[1] + 10) + ' ' + (p[0] + 9) + ',' + p[1] + ' ' + p[0] + ',' + (p[1] - 14) + ' Z" fill="#8fd8ff" stroke="#4aa8e0" stroke-width="2"' + (i % 2 ? ' opacity=".8"' : '') + '/>';
    });
    return b;
  }, { recolor: false });
  reg('pet.fx.shine', 'Sparkles on a clean, brushed pet.', function () {
    return [[96, 96, 16], [310, 150, 13], [84, 300, 12], [320, 320, 16], [200, 30, 12], [262, 60, 8]].map(function (p) { return '<path d="' + S.spark(p[0], p[1], p[2]) + '" fill="#fff" stroke="#ffd84a" stroke-width="2"/>'; }).join('');
  }, { recolor: false });

  /* ---------- accessories ---------- */
  var acc = function (id, desc, draw, extra) { reg('petacc.' + id, desc, draw, extra); };
  function os(o, fill, w) { return ' fill="' + (fill || o.fill) + '" stroke="' + o.line + '" stroke-width="' + (w || 3) + '" stroke-linejoin="round"'; }

  acc('bow.classic', 'Big bow on the pet\'s head.', function (o) { return G.art.bow(262, 84, 1.7, o.fill, o.line); });
  acc('bow.tie', 'Bow tie at the neck.', function (o) { return G.art.bow(200, 252, 1.5, o.fill, o.line); });
  acc('bow.flower', 'Flower behind the ear.', function (o) {
    var b = '';
    for (var i = 0; i < 6; i++) { var a = Math.PI * 2 * i / 6; b += '<circle cx="' + (126 + Math.cos(a) * 19).toFixed(1) + '" cy="' + (92 + Math.sin(a) * 19).toFixed(1) + '" r="14"' + os(o, null, 2.5) + '/>'; }
    return b + '<circle cx="126" cy="92" r="12" fill="' + GOLD + '" stroke="' + GOLD_L + '" stroke-width="2.5"/>';
  });

  var BAND = 'M128,232 Q200,270 272,232 L276,250 Q200,290 124,250 Z';
  acc('collar.heart', 'Collar with a heart tag.', function (o) { return '<path d="' + BAND + '"' + os(o) + '/><path d="' + S.heart(200, 284, 15) + '" fill="' + GOLD + '" stroke="' + GOLD_L + '" stroke-width="2.5"/>'; });
  acc('collar.bell', 'Collar with a little bell.', function (o) {
    return '<path d="' + BAND + '"' + os(o) + '/><circle cx="200" cy="286" r="15" fill="' + GOLD + '" stroke="' + GOLD_L + '" stroke-width="2.5"/><path d="M190,288 L210,288 M200,288 L200,298" stroke="' + GOLD_L + '" stroke-width="3" stroke-linecap="round"/>';
  });
  acc('collar.bandana', 'Bandana scarf around the neck.', function (o) {
    return '<path d="M124,234 Q200,268 276,234 L270,252 Q230,270 200,326 Q170,270 130,252 Z"' + os(o) + '/><path d="M128,238 Q200,272 272,238" fill="none" stroke="#fff" stroke-width="3" opacity=".6"/>';
  });
  acc('collar.pearls', 'Pearl necklace for a fancy pet.', function (o) {
    var b = '';
    for (var i = 0; i <= 10; i++) { var t = i / 10, x = 130 + 140 * t, y = 238 + Math.sin(Math.PI * t) * 30; b += '<circle cx="' + x.toFixed(0) + '" cy="' + y.toFixed(0) + '" r="9" fill="' + o.light + '" stroke="' + o.line + '" stroke-width="2"/><circle cx="' + (x - 3).toFixed(0) + '" cy="' + (y - 3).toFixed(0) + '" r="2.4" fill="#fff"/>'; }
    return b;
  }, { sample: '#fff5fb' });

  acc('hat.party', 'Party hat with a pompom.', function (o) {
    return '<path d="M200,-6 L152,84 Q200,100 248,84 Z"' + os(o) + '/><circle cx="200" cy="-4" r="13" fill="#fff" stroke="' + o.line + '" stroke-width="3"/>' +
      '<path d="M150,84 Q200,102 250,84" fill="none" stroke="#fff" stroke-width="7" stroke-linecap="round"/><path d="' + S.star(200, 52, 12) + '" fill="' + GOLD + '"/>';
  });
  acc('hat.crown', 'Tiny royal crown.', function (o) {
    return '<path d="M150,86 L142,30 L172,56 L200,18 L228,56 L258,30 L250,86 Q200,98 150,86 Z" fill="' + GOLD + '" stroke="' + GOLD_L + '" stroke-width="3" stroke-linejoin="round"/>' +
      '<circle cx="200" cy="62" r="9"' + os(o, o.color, 2.5) + '/><circle cx="168" cy="72" r="5" fill="#fff"/><circle cx="232" cy="72" r="5" fill="#fff"/><path d="' + S.spark(200, 12, 9) + '" fill="#fff"/>';
  });
  acc('hat.beanie', 'Woolly beanie with a pompom.', function (o) {
    return '<circle cx="200" cy="30" r="20" fill="#fff" stroke="' + o.line + '" stroke-width="3"/><path d="M118,112 C118,30 282,30 282,112 Q200,96 118,112 Z"' + os(o) + '/><path d="M112,104 Q200,84 288,104 L288,128 Q200,108 112,128 Z"' + os(o, o.light) + '/>' +
      '<path d="M140,104 L140,122 M170,98 L170,116 M200,96 L200,114 M230,98 L230,116 M260,104 L260,122" stroke="' + o.line + '" stroke-width="2" opacity=".5"/>';
  });

  acc('outfit.tee', 'Striped pet t-shirt.', function (o) {
    return '<path d="M124,262 Q200,236 276,262 C292,300 288,340 270,356 Q200,372 130,356 C112,340 108,300 124,262 Z"' + os(o) + '/>' +
      '<path d="M116,290 Q200,304 284,290 M114,318 Q200,332 286,318 M124,344 Q200,358 276,344" fill="none" stroke="#fff" stroke-width="9" opacity=".75"/>';
  });
  acc('outfit.tutu', 'Fluffy ballet tutu.', function (o) {
    var b = 'M96,330';
    for (var x = 96; x < 304; x += 26) b += ' Q' + (x + 13) + ',384 ' + (x + 26) + ',336';
    return '<path d="' + b + ' L286,306 Q200,286 114,306 Z"' + os(o, o.light) + '/><path d="M118,300 Q200,276 282,300 L284,320 Q200,298 116,320 Z"' + os(o) + '/>' + G.art.sparkles([[130, 340, 7], [200, 348, 8], [270, 340, 7]]);
  });
  acc('outfit.cape', 'Superstar cape with a star. A reward item.', function (o) {
    return '<path d="M132,246 C70,290 60,360 76,392 Q200,410 324,392 C340,360 330,290 268,246 Q200,280 132,246 Z"' + os(o) + '/>' +
      '<path d="M132,246 Q200,280 268,246 L272,262 Q200,298 128,262 Z" fill="' + GOLD + '" stroke="' + GOLD_L + '" stroke-width="2.5"/><path d="' + S.star(200, 340, 26) + '" fill="' + GOLD + '" stroke="' + GOLD_L + '" stroke-width="2.5"/>';
  }, { sample: '#b06cff' });
})(window.Game);
