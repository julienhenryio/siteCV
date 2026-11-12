/* Built-in art for the girl: body, head, eyes, mouth, makeup layers.
   Doll space is 600 x 1300, centre line x = 300. Key landmarks:
     head top y=56, chin y=291, eyes y=187 (x=257 / 343), mouth y=254,
     shoulders y=358 (x=207 / 393), waist y=520 (x=250 / 350), hips y=626 (x=224 / 376),
     crotch y=672, knees y=902, ankles y=1170, feet bottom y=1245, hands y=656-742 (x=150-190). */
(function (G) {
  'use strict';
  var S = G.svg, C = G.color, A = G.assets;
  var INK = '#3a1a26';

  function skinTones(sk) {
    return { line: C.mix(sk, '#7a2a22', 0.5), shade: C.mix(sk, '#b5523f', 0.24), light: C.light(sk, 0.35) };
  }
  /* Draw shapes twice (outline pass, then fill pass) so overlapping parts merge into one silhouette. */
  function merged(shapes, fill, line, w) {
    return '<g fill="' + fill + '" stroke="' + line + '" stroke-width="' + (w || 5) + '" stroke-linejoin="round">' + shapes + '</g>' +
      '<g fill="' + fill + '">' + shapes + '</g>';
  }
  G.art = G.art || {};
  G.art.merged = merged;
  G.art.skinTones = skinTones;

  /* ---------- body ---------- */
  var LEG = '<path d="M224,612 C220,720 232,820 240,902 C237,962 246,1080 254,1172 L282,1172 C286,1080 293,962 289,902 C295,820 301,740 300,664 Z"/>' +
    '<path d="M254,1166 C250,1195 240,1222 242,1236 C246,1249 280,1251 286,1238 C290,1222 284,1195 282,1166 Z"/>';
  var ARM = '<path d="M207,352 C192,362 186,430 178,520 C172,580 164,620 159,660 L183,664 C190,622 200,582 205,524 C214,470 230,430 234,398 Z"/>' +
    '<path d="M160,654 C152,684 150,712 157,732 C164,746 178,744 183,732 C188,712 186,686 183,660 Z"/>' +
    '<path d="M181,672 C192,680 194,696 188,706 C184,708 181,702 181,694 Z"/>';
  var TORSO = S.sym([300, 336], [[268, 336], [250, 338, 222, 342, 207, 360], [232, 404], [228, 450, 247, 485, 250, 520], [252, 562, 226, 584, 224, 626], [224, 650], [262, 668, 300, 674]]);
  var NECK = 'M279,258 L279,320 Q278,334 262,338 L338,338 Q322,334 321,320 L321,258 Z';

  A.register('doll.body', {
    space: 'doll', desc: 'Girl body without head: legs, arms, torso, neck. Front view, arms slightly away from the body. Colored by skin tone.',
    draw: function (o) {
      var t = skinTones(o.color);
      var shapes = S.mir(LEG) + S.mir(ARM) + '<path d="' + NECK + '"/><path d="' + TORSO + '"/>';
      return merged(shapes, o.color, t.line) +
        '<path d="M279,276 Q300,306 321,276 L321,262 L279,262 Z" fill="' + t.shade + '" opacity=".75"/>' +
        '<g fill="none" stroke="' + t.shade + '" stroke-width="2.5" stroke-linecap="round">' +
        S.mir('<path d="M266,352 Q246,356 232,352"/><path d="M252,896 Q262,906 274,898"/><path d="M262,1010 Q258,1060 262,1100" opacity=".5"/>') +
        '<path d="M300,566 q2,6 0,9"/></g>';
    }
  });

  A.register('doll.undies', {
    space: 'doll', recolor: false, desc: 'Basic white underwear (bandeau and brief) always worn under the clothes.',
    draw: function () {
      var st = ' fill="#fff" stroke="#f3a9cf" stroke-width="2.5" stroke-linejoin="round"';
      return '<path d="' + S.sym([300, 400], [[231, 398], [229, 425, 232, 440, 236, 454], [268, 462, 300, 458]]) + '"' + st + '/>' +
        '<path d="' + S.sym([300, 600], [[229, 596], [226, 612, 224, 626, 224, 642], [250, 652, 285, 664, 300, 676]]) + '"' + st + '/>' +
        '<path d="' + S.heart(300, 412, 6) + '" fill="#ff8cc6"/><path d="' + S.heart(300, 612, 5) + '" fill="#ff8cc6"/>';
    }
  });

  /* ---------- head ---------- */
  var HEAD = S.sym([300, 56], [[238, 56, 203, 104, 203, 168], [203, 214, 222, 248, 252, 272], [270, 285, 286, 291, 300, 291]]);

  A.register('doll.head', {
    space: 'doll', desc: 'Girl head and ears without face features or hair. Colored by skin tone.',
    draw: function (o) {
      var t = skinTones(o.color);
      var shapes = S.mir('<ellipse cx="203" cy="192" rx="11" ry="19"/>') + '<path d="' + HEAD + '"/>';
      return merged(shapes, o.color, t.line) +
        S.mir('<path d="M199,183 Q206,192 200,203" fill="none" stroke="' + t.shade + '" stroke-width="2.5" stroke-linecap="round"/>') +
        S.mir('<ellipse cx="238" cy="228" rx="26" ry="15" fill="' + G.defs.radial('#ff7aa8') + '" opacity=".28"/>') +
        '<path d="M293,225 Q300,232 307,225" fill="none" stroke="' + t.line + '" stroke-width="2.2" stroke-linecap="round" opacity=".75"/>';
    }
  });

  /* ---------- eyes ---------- */
  var EYE_W = 'M229,188 C236,170 250,163 262,164 C276,165 285,176 287,190 C279,202 268,207 256,207 C244,207 234,200 229,188 Z';
  function clipEye() {
    G.defs.ensure('doll-eye-clip', '<clipPath id="doll-eye-clip"><path d="' + EYE_W + '"/></clipPath>');
    return 'url(#doll-eye-clip)';
  }
  function eyeOpen(iris) {
    var dk = C.dark(iris, 0.6);
    return '<path d="' + EYE_W + '" fill="#fff"/>' +
      '<g clip-path="' + clipEye() + '">' +
      '<circle cx="258" cy="187" r="17.5" fill="' + iris + '"/>' +
      '<path d="M240,187 a18,18 0 0 1 36,0 Z" fill="' + dk + '" opacity=".5"/>' +
      '<circle cx="258" cy="187" r="17.5" fill="none" stroke="' + dk + '" stroke-width="3"/>' +
      '<circle cx="258" cy="188" r="7.5" fill="#2a1420"/>' +
      '<ellipse cx="258" cy="199" rx="9" ry="4" fill="#fff" opacity=".4"/>' +
      '<path d="M226,186 C236,164 252,160 264,161 C278,162 288,174 290,188 C280,174 268,170 258,170 C246,170 234,176 226,186 Z" fill="#5a2038" opacity=".16"/>' +
      '</g>' +
      '<path d="M226,190 C234,168 250,160 263,161 C278,162 287,174 289,191" fill="none" stroke="' + INK + '" stroke-width="4.5" stroke-linecap="round"/>' +
      '<path d="M228,189 L219,181" stroke="' + INK + '" stroke-width="3.2" stroke-linecap="round"/>' +
      '<path d="M233,197 C242,208 264,212 283,199" fill="none" stroke="' + INK + '" stroke-width="1.6" stroke-linecap="round" opacity=".4"/>' +
      '<path d="M234,171 C245,156 268,154 283,167" fill="none" stroke="#7a2a22" stroke-width="1.8" stroke-linecap="round" opacity=".3"/>';
  }
  function eyeShine(cx) {
    return '<circle cx="' + (cx - 6) + '" cy="180" r="5.5" fill="#fff"/><circle cx="' + (cx + 7) + '" cy="193" r="2.6" fill="#fff" opacity=".85"/>';
  }
  function eyeClosed() {
    return '<path d="M229,190 Q258,208 287,190" fill="none" stroke="' + INK + '" stroke-width="4.5" stroke-linecap="round"/>' +
      '<path d="M233,195 L226,203 M241,200 L236,209 M251,203 L249,212" stroke="' + INK + '" stroke-width="2.6" stroke-linecap="round"/>';
  }
  function eyeHappy() {
    return '<path d="M230,197 Q258,170 286,197" fill="none" stroke="' + INK + '" stroke-width="4.8" stroke-linecap="round"/>' +
      '<path d="M231,195 L222,190" stroke="' + INK + '" stroke-width="3" stroke-linecap="round"/>';
  }
  var MIR = function (m) { return '<g transform="matrix(-1 0 0 1 600 0)">' + m + '</g>'; };
  var eyeDesc = 'Both eyes of the girl. Colored by eye color. ';
  A.register('doll.eyes.open', { space: 'doll', desc: eyeDesc + 'Open, big and glossy.',
    draw: function (o) { return eyeOpen(o.color) + MIR(eyeOpen(o.color)) + eyeShine(258) + eyeShine(342); } });
  A.register('doll.eyes.closed', { space: 'doll', desc: eyeDesc + 'Gently closed (relaxing, kiss).',
    draw: function () { return eyeClosed() + MIR(eyeClosed()); } });
  A.register('doll.eyes.happy', { space: 'doll', desc: eyeDesc + 'Closed in a happy laughing arc.',
    draw: function () { return eyeHappy() + MIR(eyeHappy()); } });
  A.register('doll.eyes.wink', { space: 'doll', desc: eyeDesc + 'One open, one winking.',
    draw: function (o) { return eyeOpen(o.color) + eyeShine(258) + MIR(eyeHappy()); } });

  A.register('doll.brows', {
    space: 'doll', desc: 'Eyebrows. Colored from the hair color.',
    draw: function (o) {
      return S.mir('<path d="M228,157 Q252,139 285,150" fill="none" stroke="' + o.color + '" stroke-width="5.5" stroke-linecap="round"/>');
    }
  });

  /* ---------- mouth ---------- */
  function mouthSmile(c) {
    var d = C.dark(c, 0.4);
    return '<path d="M276,251 C284,246 292,243 300,247 C308,243 316,246 324,251 C314,255 306,256 300,256 C294,256 286,255 276,251 Z" fill="' + C.dark(c, 0.12) + '"/>' +
      '<path d="M276,251 C286,256 294,257 300,257 C306,257 314,256 324,251 C318,265 310,271 300,271 C290,271 282,265 276,251 Z" fill="' + c + '"/>' +
      '<path d="M274,250 C290,258 310,258 326,250" fill="none" stroke="' + d + '" stroke-width="2" stroke-linecap="round"/>' +
      '<ellipse cx="300" cy="264" rx="8" ry="2.6" fill="#fff" opacity=".35"/>';
  }
  function mouthLaugh(c) {
    return '<path d="M273,248 C290,253 310,253 327,248 C324,271 313,282 300,282 C287,282 276,271 273,248 Z" fill="#8a2540" stroke="' + c + '" stroke-width="5" stroke-linejoin="round"/>' +
      '<path d="M279,251 C292,255 308,255 321,251 C320,259 280,259 279,251 Z" fill="#fff"/>' +
      '<ellipse cx="300" cy="274" rx="11" ry="5.5" fill="#ff7d9c"/>';
  }
  function mouthKiss(c) {
    var d = C.dark(c, 0.4);
    return '<path d="M288,252 C290,244 297,243 300,247 C303,243 310,244 312,252 C312,262 306,267 300,267 C294,267 288,262 288,252 Z" fill="' + c + '"/>' +
      '<path d="M290,254 Q300,258 310,254" fill="none" stroke="' + d + '" stroke-width="2" stroke-linecap="round"/>' +
      '<ellipse cx="300" cy="261" rx="4.5" ry="2" fill="#fff" opacity=".4"/>';
  }
  var mouthDesc = 'Mouth of the girl. Colored by lip color. ';
  A.register('doll.mouth.smile', { space: 'doll', desc: mouthDesc + 'Soft closed smile.', draw: function (o) { return mouthSmile(o.color); } });
  A.register('doll.mouth.laugh', { space: 'doll', desc: mouthDesc + 'Open laughing mouth with teeth.', draw: function (o) { return mouthLaugh(o.color); } });
  A.register('doll.mouth.kiss', { space: 'doll', desc: mouthDesc + 'Small kiss pout.', draw: function (o) { return mouthKiss(o.color); } });

  /* ---------- makeup layers ---------- */
  A.register('makeup.blush', {
    space: 'doll', desc: 'Blush: two soft color blobs on the cheeks.',
    draw: function (o) {
      return S.mir('<ellipse cx="238" cy="228" rx="33" ry="20" fill="' + G.defs.radial(o.color) + '"/>');
    }
  });
  A.register('makeup.shadow', {
    space: 'doll', desc: 'Eyeshadow: color on both eyelids up to under the brows.',
    draw: function (o) {
      return S.mir('<path d="M219,192 C224,158 250,146 268,147 C286,148 295,166 294,194 C284,206 268,210 256,210 C240,210 226,204 219,192 Z" fill="' + o.color + '" opacity=".4"/>' +
        '<path d="M224,190 C230,165 250,154 265,155 C281,156 290,170 291,192 C282,204 268,208 256,208 C242,208 230,202 224,190 Z" fill="' + o.color + '" opacity=".75"/>' +
        '<path d="M240,166 Q256,158 274,164" fill="none" stroke="#fff" stroke-width="3" stroke-linecap="round" opacity=".5"/>');
    }
  });
  /* o.only === 'left': draw on the viewer's-left eye only (the other one is winking). */
  function eyesBoth(o, m) { return o.only === 'left' ? m : S.mir(m); }
  var LINER = 'M226,190 C234,168 250,160 263,161 C278,162 287,174 289,191';
  var WING = '<path d="M229,191 C222,186 214,178 208,167 C212,180 219,190 231,196 Z" stroke-width="2" stroke-linejoin="round"';
  A.register('makeup.liner.classic', { space: 'doll', desc: 'Eyeliner, classic line along the upper lashes.',
    draw: function (o) { return eyesBoth(o, '<path d="' + LINER + '" fill="none" stroke="' + o.color + '" stroke-width="7" stroke-linecap="round"/>'); } });
  A.register('makeup.liner.wing', { space: 'doll', desc: 'Eyeliner with a winged cat-eye flick.',
    draw: function (o) { return eyesBoth(o, '<path d="' + LINER + '" fill="none" stroke="' + o.color + '" stroke-width="7" stroke-linecap="round"/>' + WING + ' fill="' + o.color + '" stroke="' + o.color + '"/>'); } });
  A.register('makeup.liner.bold', { space: 'doll', desc: 'Bold eyeliner: thick wing plus lower lash line.',
    draw: function (o) {
      return eyesBoth(o, '<path d="' + LINER + '" fill="none" stroke="' + o.color + '" stroke-width="8.5" stroke-linecap="round"/>' + WING + ' fill="' + o.color + '" stroke="' + o.color + '"/>' +
        '<path d="M231,196 C242,209 264,213 285,199" fill="none" stroke="' + o.color + '" stroke-width="3.6" stroke-linecap="round"/>');
    } });
  A.register('makeup.lashes', {
    space: 'doll', recolor: false, desc: 'Mascara: long curled upper lashes on both eyes.',
    draw: function (o) {
      return eyesBoth(o, '<g fill="none" stroke="#2a1420" stroke-width="2.8" stroke-linecap="round">' +
        '<path d="M229,186 Q222,180 214,172"/><path d="M234,178 Q228,170 223,160"/><path d="M242,170 Q238,161 235,152"/>' +
        '<path d="M252,165 Q250,156 249,148"/><path d="M263,163 Q263,155 265,148"/><path d="M273,165 Q275,158 279,152"/></g>');
    }
  });
  function gemPts(fn) { return fn(213, 206, 8) + fn(206, 186, 5.5) + fn(221, 224, 4.5); }
  A.register('makeup.gems.stars', { space: 'doll', desc: 'Face gems: little stars beside each eye.',
    draw: function (o) { return S.mir(gemPts(function (x, y, r) { return '<path d="' + S.star(x, y, r) + '" fill="' + o.color + '" stroke="#fff" stroke-width="1.5"/>'; })); } });
  A.register('makeup.gems.hearts', { space: 'doll', desc: 'Face gems: little hearts beside each eye.',
    draw: function (o) { return S.mir(gemPts(function (x, y, r) { return '<path d="' + S.heart(x, y, r * 0.8) + '" fill="' + o.color + '" stroke="#fff" stroke-width="1.5"/>'; })); } });
  A.register('makeup.gems.dots', { space: 'doll', desc: 'Face gems: a curve of rhinestones under each eye.',
    draw: function (o) {
      var b = '', pts = [[226, 208, 3.4], [236, 215, 4], [248, 219, 4.4], [261, 220, 4], [273, 217, 3.4]];
      pts.forEach(function (p) { b += '<circle cx="' + p[0] + '" cy="' + p[1] + '" r="' + p[2] + '" fill="' + o.color + '" stroke="#fff" stroke-width="1.6"/><circle cx="' + (p[0] - 1) + '" cy="' + (p[1] - 1) + '" r="1.1" fill="#fff"/>'; });
      return S.mir(b);
    } });
  A.register('makeup.gloss', {
    space: 'doll', recolor: false, desc: 'Lip gloss: shiny highlights on the lips.',
    draw: function () {
      return '<ellipse cx="300" cy="263" rx="12" ry="3.6" fill="#fff" opacity=".85"/><ellipse cx="291" cy="249" rx="5" ry="1.8" fill="#fff" opacity=".7"/>' +
        '<path d="' + S.spark(314, 262, 4) + '" fill="#fff"/>';
    }
  });

  /* ---------- spa overlays (used by the makeover) ---------- */
  A.register('spa.foam', {
    space: 'doll', recolor: false, desc: 'Cleanser foam: white bubbles covering the face.',
    draw: function () {
      var b = '', seed = 11;
      var rnd = function () { seed = (seed * 16807) % 2147483647; return seed / 2147483647; };
      for (var i = 0; i < 46; i++) {
        var a = rnd() * Math.PI * 2, r = Math.sqrt(rnd());
        var x = 300 + Math.cos(a) * r * 88, y = 185 + Math.sin(a) * r * 100, s = 9 + rnd() * 14;
        b += '<circle cx="' + x.toFixed(0) + '" cy="' + y.toFixed(0) + '" r="' + s.toFixed(0) + '" fill="#fff" stroke="#bfe9ff" stroke-width="1.5" opacity=".95"/>' +
          '<circle cx="' + (x - s * 0.3).toFixed(0) + '" cy="' + (y - s * 0.3).toFixed(0) + '" r="' + (s * 0.22).toFixed(1) + '" fill="#dff5ff"/>';
      }
      return b;
    }
  });
  A.register('spa.mask', {
    space: 'doll', desc: 'Face mask: a creamy layer over the face with holes for the eyes and mouth.',
    draw: function (o) {
      var hole = function (cx, cy, rx, ry) { return ' M' + (cx - rx) + ',' + cy + ' a' + rx + ',' + ry + ' 0 1 0 ' + (rx * 2) + ',0 a' + rx + ',' + ry + ' 0 1 0 ' + (-rx * 2) + ',0 Z'; };
      var face = S.sym([300, 78], [[246, 78, 214, 118, 213, 170], [213, 212, 230, 242, 256, 264], [272, 276, 288, 281, 300, 281]]);
      return '<path fill-rule="evenodd" d="' + face + hole(257, 187, 36, 27) + hole(343, 187, 36, 27) + hole(300, 256, 32, 18) + '" fill="' + o.color + '" stroke="' + C.dark(o.color, 0.2) + '" stroke-width="2"/>' +
        '<path d="M236,120 Q262,104 292,106" fill="none" stroke="#fff" stroke-width="5" stroke-linecap="round" opacity=".45"/>';
    }
  });
  A.register('spa.cucumber', {
    space: 'unit', recolor: false, desc: 'One cucumber slice (spa).',
    draw: function () {
      var seeds = '';
      for (var i = 0; i < 8; i++) {
        var a = Math.PI * 2 * i / 8;
        seeds += '<ellipse cx="' + (50 + Math.cos(a) * 17).toFixed(1) + '" cy="' + (50 + Math.sin(a) * 17).toFixed(1) + '" rx="3" ry="6" transform="rotate(' + (a * 180 / Math.PI + 90).toFixed(0) + ' ' + (50 + Math.cos(a) * 17).toFixed(1) + ' ' + (50 + Math.sin(a) * 17).toFixed(1) + ')" fill="#f4ffd6"/>';
      }
      return '<circle cx="50" cy="50" r="44" fill="#4fae52" stroke="#2f7f3a" stroke-width="4"/><circle cx="50" cy="50" r="37" fill="#c9f09a"/><circle cx="50" cy="50" r="26" fill="#b4e684"/>' + seeds;
    }
  });
  A.register('spa.stray', {
    space: 'unit', recolor: false, desc: 'One stray eyebrow hair to pluck with the tweezers (spa).',
    draw: function () { return '<path d="M50,82 Q44,50 56,18" fill="none" stroke="#5a3324" stroke-width="9" stroke-linecap="round"/>'; }
  });
})(window.Game);
