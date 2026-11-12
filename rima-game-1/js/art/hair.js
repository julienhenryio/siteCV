/* Built-in hairstyles. Each style has two assets in doll space:
     hair.<style>.back   drawn behind the body
     hair.<style>.front  drawn over the head (fringe, locks) and over the clothes
   Colored by hair color. */
(function (G) {
  'use strict';
  var S = G.svg, C = G.color, A = G.assets;

  function st(o) { return ' fill="' + o.color + '" stroke="' + C.dark(o.color, 0.45) + '" stroke-width="2.5" stroke-linejoin="round"'; }
  function strands(o, d) { return '<path d="' + d + '" fill="none" stroke="' + C.dark(o.color, 0.3) + '" stroke-width="2" stroke-linecap="round" opacity=".7"/>'; }
  function shine(o, d) { return '<path d="' + (d || 'M226,92 Q300,58 374,92 Q300,76 226,92 Z') + '" fill="' + C.light(o.color, 0.55) + '" opacity=".6"/>'; }

  /* fringes (front of the head) */
  var SWEPT = 'M300,32 C236,32 186,84 186,160 C185,186 190,212 198,238 C202,210 207,182 214,160 C252,172 322,140 352,76 C372,98 386,126 390,158 C394,182 398,210 402,238 C410,212 415,186 414,160 C414,84 364,32 300,32 Z';
  var STRAIGHT = 'M300,32 C236,32 186,84 186,160 C184,192 190,222 198,252 C202,212 206,182 212,152 L213,140 Q256,128 300,132 Q344,128 387,140 L388,152 C394,182 398,212 402,252 C410,222 416,192 414,160 C414,84 364,32 300,32 Z';
  var CURTAIN = S.sym([300, 32], [[240, 32, 186, 84, 186, 160], [184, 192, 188, 222, 198, 252], [202, 216, 204, 182, 209, 152], [250, 112, 284, 72, 300, 46]]);
  var CAP = S.sym([300, 30], [[230, 30, 182, 84, 184, 165], [186, 200, 196, 232, 212, 252], [300, 252]]);

  function reg(id, name, back, front) {
    A.register('hair.' + id + '.back', { space: 'doll', desc: name + ' hairstyle, the part behind the head and body. Colored by hair color.', draw: back });
    A.register('hair.' + id + '.front', { space: 'doll', desc: name + ' hairstyle, the fringe and locks in front of the face and clothes. Colored by hair color.', draw: front });
  }

  /* 1. long straight, side-swept fringe */
  reg('long', 'Long straight',
    function (o) {
      return '<path d="' + S.sym([300, 28], [[226, 28, 178, 84, 180, 170], [176, 300, 168, 470, 160, 612], [190, 634, 238, 624], [300, 628]]) + '"' + st(o) + '/>' +
        strands(o, 'M184,300 Q180,460 176,600 M418,300 Q422,460 424,600 M200,330 Q196,480 200,612 M400,330 Q404,480 400,612');
    },
    function (o) {
      return '<path d="' + SWEPT + '"' + st(o) + '/>' + strands(o, 'M338,84 C306,120 262,146 226,154') + shine(o);
    });

  /* 2. long wavy, centre parting */
  reg('wavy', 'Long wavy',
    function (o) {
      return '<path d="' + S.sym([300, 28], [[224, 28, 174, 84, 176, 170], [150, 230, 190, 280, 162, 340], [140, 400, 186, 440, 158, 500], [146, 540, 170, 570, 176, 590], [210, 600, 250, 580], [300, 584]]) + '"' + st(o) + '/>' +
        strands(o, 'M190,250 Q170,300 186,350 Q200,400 178,460 M410,250 Q430,300 414,350 Q400,400 422,460');
    },
    function (o) {
      return '<path d="' + CURTAIN + '"' + st(o) + '/>' +
        S.mir('<path d="M200,236 C176,270 208,300 190,340 C180,366 190,390 204,402 C198,372 222,348 216,310 C212,282 214,258 210,236 Z"' + st(o) + '/>') +
        strands(o, 'M292,56 C270,92 240,124 212,148 M308,56 C330,92 360,124 388,148') + shine(o);
    });

  /* 3. high ponytail, straight fringe */
  reg('pony', 'High ponytail',
    function (o) {
      return '<path d="' + CAP + '"' + st(o) + '/>' +
        '<path d="M356,62 C430,22 492,96 470,196 C456,262 474,338 444,430 C436,386 410,336 416,270 C422,200 410,140 368,104 Z"' + st(o) + '/>' +
        strands(o, 'M392,70 C452,80 462,160 448,220 C440,280 452,340 444,400 M380,92 C424,112 436,176 430,240') +
        '<ellipse cx="366" cy="80" rx="14" ry="24" transform="rotate(-38 366 80)" fill="#ff5fb0" stroke="#c2187a" stroke-width="2.5"/>';
    },
    function (o) {
      return '<path d="' + STRAIGHT + '"' + st(o) + '/>' + strands(o, 'M240,100 L236,134 M270,92 L268,130 M300,90 L300,131 M330,92 L332,130 M360,100 L364,134') + shine(o);
    });

  /* 4. pigtails, side-swept fringe */
  reg('pigtails', 'Pigtails',
    function (o) { return '<path d="' + CAP + '"' + st(o) + '/>'; },
    function (o) {
      var tail = '<path d="M196,196 C150,214 138,300 150,380 C158,436 178,470 204,492 C196,440 214,392 218,336 C222,284 220,236 212,198 Z"' + st(o) + '/>' +
        strands(o, 'M190,230 C166,290 166,370 186,440 M204,236 C192,300 196,372 200,436') +
        '<ellipse cx="204" cy="208" rx="17" ry="10" fill="#ff5fb0" stroke="#c2187a" stroke-width="2.5"/>';
      return S.mir(tail) + '<path d="' + SWEPT + '"' + st(o) + '/>' + strands(o, 'M338,84 C306,120 262,146 226,154') + shine(o);
    });

  /* 5. bob with straight fringe */
  reg('bob', 'Bob',
    function (o) {
      return '<path d="' + S.sym([300, 28], [[226, 28, 174, 84, 176, 170], [172, 224, 176, 276, 192, 308], [250, 322, 300, 314]]) + '"' + st(o) + '/>';
    },
    function (o) {
      return '<path d="' + STRAIGHT + '"' + st(o) + '/>' +
        S.mir('<path d="M198,246 C192,270 186,290 192,308 C206,300 214,280 212,252 Z"' + st(o) + '/>') +
        strands(o, 'M240,100 L236,134 M270,92 L268,130 M300,90 L300,131 M330,92 L332,130 M360,100 L364,134') + shine(o);
    });

  /* 6. space buns, centre parting */
  reg('buns', 'Space buns',
    function (o) {
      var bun = '<circle cx="222" cy="52" r="40"' + st(o) + '/>' + strands(o, 'M196,44 Q222,20 248,44 M200,64 Q222,44 246,62');
      return S.mir(bun) + '<path d="' + CAP + '"' + st(o) + '/>';
    },
    function (o) {
      return '<path d="' + CURTAIN + '"' + st(o) + '/>' +
        S.mir('<path d="M200,240 C192,270 196,300 206,322 C210,296 214,268 211,240 Z"' + st(o) + '/>' +
          '<ellipse cx="234" cy="78" rx="20" ry="7" transform="rotate(-38 234 78)" fill="#ff5fb0" stroke="#c2187a" stroke-width="2.5"/>') +
        shine(o);
    });

  /* 7. big curls */
  function curls(pts, o) {
    var shapes = '';
    pts.forEach(function (p) { shapes += '<circle cx="' + p[0] + '" cy="' + p[1] + '" r="' + p[2] + '"/>'; });
    return G.art.merged(shapes, o.color, C.dark(o.color, 0.45), 5);
  }
  reg('curly', 'Big curls',
    function (o) {
      var pts = [], i;
      for (i = 0; i <= 12; i++) {
        var a = Math.PI * (1.0 + i / 12);
        pts.push([Math.round(300 + Math.cos(a) * 118), Math.round(160 + Math.sin(a) * 118), 46]);
      }
      [[176, 210, 44], [166, 270, 42], [176, 330, 40], [198, 380, 34], [424, 210, 44], [434, 270, 42], [424, 330, 40], [402, 380, 34], [300, 130, 90]].forEach(function (p) { pts.push(p); });
      return curls(pts, o);
    },
    function (o) {
      var pts = [[214, 132, 30], [250, 104, 30], [292, 92, 30], [334, 98, 30], [370, 116, 28], [392, 146, 24], [200, 172, 22], [404, 182, 20], [196, 214, 18], [404, 220, 17]];
      var hi = '';
      [[242, 92, 9], [300, 78, 10], [350, 92, 8], [206, 126, 7]].forEach(function (p) { hi += '<circle cx="' + p[0] + '" cy="' + p[1] + '" r="' + p[2] + '" fill="' + C.light(o.color, 0.5) + '" opacity=".55"/>'; });
      return curls(pts, o) + hi;
    });

  /* 8. pixie cut */
  reg('pixie', 'Pixie cut',
    function (o) { return '<path d="' + S.sym([300, 30], [[230, 30, 184, 84, 186, 165], [188, 196, 194, 220, 204, 236], [300, 240]]) + '"' + st(o) + '/>'; },
    function (o) {
      return '<path d="M300,32 C236,32 188,84 188,158 C188,180 192,204 198,226 C202,200 208,178 216,160 C224,168 232,160 236,146 C246,156 260,150 266,134 C280,146 300,138 308,120 C322,134 344,130 354,112 C366,126 380,134 386,152 C392,176 398,200 402,226 C408,204 412,180 412,158 C412,84 364,32 300,32 Z"' + st(o) + '/>' +
        strands(o, 'M300,50 C290,80 276,108 266,130 M330,52 C326,80 316,102 308,118 M262,58 C250,90 240,120 236,144') + shine(o);
    });
})(window.Game);
