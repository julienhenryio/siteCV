/* Built-in clothes: tops, bottoms, dresses, shoes, jackets. Doll space (600 x 1300).
   Every draw(o) gets: o.fill (color or pattern), o.color, o.line (outline), o.dark, o.light.
   Body landmarks are listed at the top of js/art/doll.js. */
(function (G) {
  'use strict';
  var S = G.svg, C = G.color, A = G.assets;

  /* --- small drawing helpers --- */
  function P(d, o, fill) { return '<path d="' + d + '" fill="' + (fill || o.fill) + '" stroke="' + o.line + '" stroke-width="2.5" stroke-linejoin="round"/>'; }
  function L(d, o, w, op, col) { return '<path d="' + d + '" fill="none" stroke="' + (col || o.line) + '" stroke-width="' + (w || 2) + '" stroke-linecap="round" stroke-linejoin="round"' + (op ? ' opacity="' + op + '"' : '') + '/>'; }
  function SH(d, op) { return '<path d="' + d + '" fill="#3b0f33" opacity="' + (op || 0.12) + '"/>'; }
  function HI(d, op) { return '<path d="' + d + '" fill="#fff" opacity="' + (op || 0.3) + '"/>'; }
  function sparkles(pts) { return pts.map(function (p) { return '<path d="' + S.spark(p[0], p[1], p[2] || 6) + '" fill="#fff" opacity=".9"/>'; }).join(''); }
  function bow(x, y, s, fill, line) {
    return '<g transform="translate(' + x + ' ' + y + ') scale(' + s + ')" fill="' + fill + '" stroke="' + line + '" stroke-width="' + (2.5 / s) + '" stroke-linejoin="round">' +
      '<path d="M0,0 C-10,-14 -26,-16 -28,-4 C-30,8 -14,14 0,2 Z"/><path d="M0,0 C10,-14 26,-16 28,-4 C30,8 14,14 0,2 Z"/>' +
      '<path d="M-3,3 L-10,22 L-1,16 Z"/><path d="M3,3 L10,22 L1,16 Z"/><circle cx="0" cy="1" r="5.5"/></g>';
  }
  /* scalloped (ruffled) hem from (xl,y) to the centre, as sym() segments */
  function scallops(xl, y, n, depth) {
    var segs = [], w = (300 - xl) / n;
    for (var i = 0; i < n; i++) segs.push([xl + w * (i + 0.5), y + depth, xl + w * (i + 1), y]);
    return segs;
  }
  G.art.P = P; G.art.L = L; G.art.SH = SH; G.art.HI = HI; G.art.bow = bow; G.art.sparkles = sparkles; G.art.scallops = scallops;

  /* sleeves (viewer's left; mirrored for the other arm) */
  var SLEEVE_SHORT = 'M211,346 C192,354 183,392 179,428 L227,438 C230,420 234,408 239,398 Z';
  var SLEEVE_LONG = 'M211,346 C190,356 181,430 172,520 C166,580 158,622 153,658 L189,667 C195,624 205,584 211,526 C219,474 233,432 239,398 Z';
  var SLEEVE_PUFF = 'M214,344 C182,340 166,376 174,412 C180,432 206,442 230,436 C234,420 236,408 240,398 Z';

  function reg(id, desc, draw, extra) {
    var def = { space: 'doll', desc: desc, draw: draw };
    if (extra) for (var k in extra) def[k] = extra[k];
    A.register('clothes.' + id, def);
  }

  /* ================= TOPS ================= */
  reg('top.babytee', 'Cropped 2000s baby tee with short sleeves and a small heart on the chest.', function (o) {
    return S.mir(P(SLEEVE_SHORT, o) + L('M182,420 L228,430', o, 2, 0.6)) +
      P(S.sym([300, 358], [[284, 358, 272, 350, 266, 335], [246, 337, 224, 342, 211, 352], [234, 402], [228, 440, 243, 476, 247, 504], [272, 512, 300, 510]]), o) +
      L('M267,337 Q274,352 300,362 Q326,352 333,337', o, 5, 1, o.light) + L('M267,337 Q274,352 300,362 Q326,352 333,337', o, 1.5, 0.7) +
      '<path d="' + S.heart(300, 420, 17) + '" fill="' + o.light + '" stroke="' + o.line + '" stroke-width="2"/>' +
      L('M250,498 Q276,506 300,504 Q324,506 350,498', o, 1.5, 0.5);
  });

  reg('top.cami', 'Camisole with thin straps and a lace hem.', function (o) {
    var lace = '';
    for (var x = 242; x <= 358; x += 14.5) lace += '<circle cx="' + x + '" cy="578" r="7" fill="#fff" stroke="' + o.line + '" stroke-width="1.5"/>';
    return L('M252,394 L263,338 M348,394 L337,338', o, 6) + L('M252,394 L263,338 M348,394 L337,338', o, 2.5, 1, o.color) + lace +
      P(S.sym([300, 412], [[272, 414, 250, 392], [232, 408], [228, 446, 246, 486, 247, 520], [249, 545, 240, 560, 236, 574], [268, 582, 300, 580]]), o) +
      L('M252,396 Q274,416 300,414 Q326,416 348,396', o, 4, 0.9, '#fff') + bow(300, 420, 0.42, '#fff', o.line);
  });

  reg('top.butterfly', 'Butterfly-shaped halter crop top, a 2000s icon.', function (o) {
    return L('M266,388 C276,360 284,340 288,322 M334,388 C324,360 316,340 312,322', o, 4) +
      L('M240,470 L232,474 M360,470 L368,474', o, 4) +
      P(S.sym([300, 408], [[284, 378, 244, 368, 230, 398], [222, 430, 240, 452, 264, 452], [240, 462, 238, 494, 258, 504], [282, 508, 300, 484]]), o) +
      S.mir('<path d="M286,410 C272,392 248,388 242,404 C238,424 256,436 280,436 Z" fill="' + o.light + '" opacity=".75"/><path d="M284,456 C268,456 254,470 258,486 C268,496 282,486 288,470 Z" fill="' + o.light + '" opacity=".75"/>' +
        '<circle cx="250" cy="408" r="4" fill="#fff"/><circle cx="262" cy="488" r="3" fill="#fff"/>') +
      '<ellipse cx="300" cy="446" rx="7" ry="38" fill="' + o.line + '"/>' + L('M298,410 Q290,394 282,392 M302,410 Q310,394 318,392', o, 2.5);
  });

  reg('top.hoodie', 'Cosy hoodie with long sleeves, front pocket and drawstrings.', function (o) {
    return S.mir(P(SLEEVE_LONG, o) + P('M152,650 L190,659 L187,676 L149,667 Z', o, o.dark)) +
      P(S.sym([300, 352], [[286, 354, 274, 346, 266, 334], [246, 336, 222, 340, 206, 352], [234, 404], [224, 450, 230, 520, 226, 592], [226, 616], [264, 624, 300, 622]]), o) +
      P(S.sym([300, 596], [[226, 592], [226, 618], [264, 626, 300, 624]]), o, o.dark) +
      P(S.sym([300, 520], [[258, 520], [240, 584], [300, 588]]), o) +
      P(S.sym([300, 372], [[280, 368, 262, 352, 258, 326], [244, 330, 236, 342], [246, 372, 276, 392, 300, 396]]), o, o.dark) +
      L('M288,378 L286,436 M312,378 L314,436', o, 3.5, 1, '#fff') + '<circle cx="286" cy="440" r="4" fill="#fff" stroke="' + o.line + '" stroke-width="1.5"/><circle cx="314" cy="440" r="4" fill="#fff" stroke="' + o.line + '" stroke-width="1.5"/>';
  });

  reg('top.halter', 'Glam halter top with a pointed hem, made to sparkle.', function (o) {
    return P(S.sym([300, 394], [[292, 374, 286, 350, 285, 328], [274, 326], [262, 366, 244, 392, 233, 410], [228, 446, 246, 486, 247, 520], [248, 540, 244, 552, 242, 562], [270, 572, 300, 598]]), o) +
      HI(S.sym([300, 400], [[290, 384, 284, 356, 284, 332], [278, 332], [270, 366, 256, 392, 246, 410], [262, 430, 300, 424]]), 0.18) +
      sparkles([[262, 440, 7], [330, 478, 6], [286, 520, 5], [338, 420, 4]]) + L('M285,330 Q300,322 315,330', o, 4);
  });

  reg('top.offshoulder', 'Off-the-shoulder top with long flared sleeves and a ruffle neckline.', function (o) {
    return S.mir(P('M186,392 C176,440 168,520 146,654 L198,670 C202,600 208,540 214,500 C222,460 232,430 238,400 Z', o) + L('M152,640 L196,654', o, 2, 0.5)) +
      P(S.sym([300, 398], [[236, 396], [228, 446, 246, 486, 247, 520], [249, 556, 232, 580, 226, 610], [262, 620, 300, 616]]), o) +
      P(S.sym([300, 386], [[240, 384, 196, 380, 180, 388], [174, 402, 180, 418]].concat(scallops(180, 418, 6, 12))), o, o.light) +
      L('M184,398 Q240,392 300,396 Q360,392 416,398', o, 1.5, 0.5);
  });

  reg('top.sportcrop', 'Sporty crop top with a contrast band and side stripes.', function (o) {
    return P(S.sym([300, 374], [[284, 374, 272, 358, 268, 336], [252, 338], [246, 368, 238, 392, 232, 408], [228, 440, 240, 470, 244, 492], [272, 500, 300, 498]]), o) +
      P(S.sym([300, 478], [[242, 472], [244, 492], [272, 500, 300, 498]]), o, '#fff') +
      S.mir(L('M240,410 Q236,440 246,470', o, 5, 0.9, '#fff')) +
      '<path d="' + S.star(300, 428, 13) + '" fill="#fff" stroke="' + o.line + '" stroke-width="1.5"/>';
  });

  reg('top.bikini', 'Triangle bikini top with string ties.', function (o) {
    return L('M262,402 C272,372 282,348 288,326 M338,402 C328,372 318,348 312,326 M238,452 L232,448 M362,452 L368,448 M292,452 L308,452', o, 3) +
      S.mir(P('M262,400 L297,452 Q270,464 237,452 Z', o) + HI('M262,408 L276,440 Q258,446 246,444 Z', 0.25)) +
      bow(300, 452, 0.36, o.color, o.line);
  });

  reg('top.tube', 'Stretchy tube top with gathered lines.', function (o) {
    return P(S.sym([300, 404], [[232, 400], [228, 440, 243, 476, 247, 506], [272, 514, 300, 512]]), o) +
      P(S.sym([300, 404], [[232, 400], [232, 416], [300, 420]]), o, o.light) +
      L('M246,440 Q300,452 354,440 M248,468 Q300,480 352,468 M250,492 Q300,502 350,492', o, 1.6, 0.45);
  });

  /* ================= BOTTOMS ================= */
  var JEANS = S.sym([300, 570], [[236, 570], [224, 600, 218, 650, 220, 700], [224, 800, 232, 860, 236, 906], [230, 1000, 214, 1110, 200, 1214], [298, 1214], [298, 1100, 294, 980, 292, 906], [296, 830, 300, 760, 300, 696]]);
  function waistband(o, y, x) { return P(S.sym([300, y], [[x, y], [x - 3, y + 18], [300, y + 20]]), o, o.dark); }

  reg('bottom.flarejeans', 'Low-rise flared jeans, the classic 2000s look.', function (o) {
    return P(JEANS, o) + waistband(o, 570, 236) +
      S.mir(L('M240,596 Q256,620 272,598', o, 2, 0.7) + L('M226,700 Q232,820 240,906 Q236,1000 214,1200', o, 1.6, 0.45, '#fff') +
        L('M250,880 Q262,890 276,884 M252,920 Q264,928 278,922', o, 1.5, 0.35) + HI('M250,640 C246,740 252,840 258,900 L270,900 C266,820 262,720 264,640 Z', 0.16)) +
      L('M300,590 L300,696', o, 2, 0.7) + L('M306,594 Q314,640 304,680', o, 1.5, 0.5) +
      '<circle cx="300" cy="580" r="5" fill="#ffd84a" stroke="' + o.line + '" stroke-width="1.5"/>';
  }, { sample: '#6fa8ff' });

  reg('bottom.pleatskirt', 'Pleated mini skirt.', function (o) {
    return P(S.sym([300, 570], [[236, 570], [222, 620, 206, 690, 198, 744], [250, 758, 300, 754]]), o) + waistband(o, 570, 236) +
      L('M258,590 L232,750 M279,590 L266,754 M300,590 L300,754 M321,590 L334,754 M342,590 L368,750', o, 1.8, 0.5) +
      SH('M258,590 L232,750 L250,753 L268,590 Z M300,590 L300,754 L318,753 L310,590 Z M342,590 L368,750 L384,748 L352,590 Z', 0.08);
  });

  reg('bottom.cargo', 'Baggy cargo pants with big side pockets.', function (o) {
    return P(S.sym([300, 570], [[236, 570], [222, 600, 212, 650, 212, 700], [208, 860, 208, 1040, 210, 1206], [296, 1206], [298, 1040, 296, 900, 300, 696]]), o) + waistband(o, 570, 236) +
      S.mir(P('M206,820 L250,820 L252,900 L206,904 Z', o) + P('M204,812 L252,812 L252,836 L204,838 Z', o, o.dark) + '<circle cx="228" cy="826" r="3.5" fill="#fff"/>' +
        L('M240,596 Q256,620 272,598', o, 2, 0.7) + L('M214,1180 L294,1180', o, 1.6, 0.5)) +
      L('M300,590 L300,696', o, 2, 0.7) + L('M292,592 L286,640 M308,592 L314,640', o, 3, 1, '#fff');
  });

  reg('bottom.shorts', 'Denim cut-off shorts with a frayed hem.', function (o) {
    var fray = '';
    for (var x = 222; x < 296; x += 9) fray += 'M' + x + ',' + (718 + (x - 222) * 0.14).toFixed(0) + ' l-1,9 ';
    return P(S.sym([300, 570], [[236, 570], [224, 600, 216, 650, 216, 718], [294, 730], [298, 710, 300, 700, 300, 694]]), o) + waistband(o, 570, 236) +
      S.mir(L(fray, o, 2, 0.8, '#fff') + L('M240,596 Q256,620 272,598', o, 2, 0.7) + L('M218,704 L294,716', o, 1.5, 0.5)) +
      L('M300,590 L300,694', o, 2, 0.7) + '<circle cx="300" cy="580" r="5" fill="#ffd84a" stroke="' + o.line + '" stroke-width="1.5"/>';
  }, { sample: '#6fa8ff' });

  reg('bottom.trackpants', 'Track pants with side stripes and ankle cuffs.', function (o) {
    return P(S.sym([300, 570], [[236, 570], [222, 600, 214, 650, 216, 700], [220, 800, 228, 860, 232, 906], [234, 1000, 240, 1100, 246, 1160], [290, 1160], [294, 1100, 296, 980, 294, 906], [298, 830, 300, 760, 300, 696]]), o) +
      waistband(o, 570, 236) +
      S.mir(L('M226,592 C218,700 228,860 236,906 C238,1000 244,1100 250,1158', o, 5, 1, '#fff') + L('M236,594 C228,700 238,860 246,906 C248,1000 254,1100 259,1158', o, 2.5, 1, '#fff') +
        P('M244,1156 L292,1156 L290,1180 L248,1180 Z', o, o.dark)) +
      L('M300,590 L300,696', o, 2, 0.6) + L('M292,592 L288,632 M308,592 L312,632', o, 3, 1, '#fff');
  });

  reg('bottom.glamskirt', 'Tight sparkly party mini skirt.', function (o) {
    return P(S.sym([300, 566], [[237, 566], [224, 610, 218, 660, 222, 732], [262, 742, 300, 740]]), o) +
      HI(S.sym([300, 566], [[237, 566], [232, 580], [300, 586]]), 0.3) + sparkles([[250, 630, 7], [330, 600, 5], [300, 690, 8], [352, 690, 5], [262, 708, 4]]);
  });

  reg('bottom.sarong', 'Beach sarong tied on the hip.', function (o) {
    return P('M236,574 L364,574 C380,640 392,770 396,892 C350,868 276,806 208,744 C216,690 226,620 236,574 Z', o) +
      L('M352,590 C368,680 380,790 390,880 M330,590 C340,680 352,760 360,850', o, 1.6, 0.4) +
      P('M236,574 L364,574 L362,592 L236,592 Z', o, o.dark) +
      P('M352,580 C372,566 392,572 386,590 C400,596 396,618 378,612 C372,630 352,622 356,604 Z', o) + L('M366,600 C376,640 372,680 384,716 M360,604 C356,650 362,690 352,730', o, 5, 1, o.color) + L('M366,600 C376,640 372,680 384,716 M360,604 C356,650 362,690 352,730', o, 1.5, 0.6);
  });

  reg('bottom.capri', 'Fitted capri pants ending at the calf with a little bow.', function (o) {
    return P(S.sym([300, 570], [[236, 570], [224, 600, 218, 650, 220, 700], [224, 800, 232, 860, 237, 906], [236, 960, 240, 1010, 244, 1050], [290, 1050], [292, 1000, 294, 950, 292, 906], [296, 830, 300, 760, 300, 696]]), o) +
      waistband(o, 570, 236) + L('M300,590 L300,696', o, 2, 0.6) +
      S.mir(P('M242,1030 L292,1030 L291,1052 L244,1052 Z', o, o.light) + bow(246, 1040, 0.34, o.light, o.line));
  });

  reg('bottom.sportshorts', 'Loose sport shorts with a side stripe.', function (o) {
    return P(S.sym([300, 570], [[236, 570], [220, 610, 206, 670, 206, 734], [294, 742], [298, 716, 300, 700, 300, 696]]), o) + waistband(o, 570, 236) +
      S.mir(L('M222,596 Q212,670 214,732', o, 6, 1, '#fff') + L('M208,722 L294,730', o, 3, 0.9, '#fff')) +
      L('M300,590 L300,696', o, 2, 0.6) + L('M292,592 L288,626 M308,592 L312,626', o, 3, 1, '#fff');
  });

  /* ================= DRESSES ================= */
  reg('dress.slip', 'Silky slip dress with thin straps and a lace hem.', function (o) {
    var lace = '';
    for (var x = 206; x <= 394; x += 15.6) lace += '<circle cx="' + x.toFixed(0) + '" cy="' + (806 + Math.abs(x - 300) * -0.06).toFixed(0) + '" r="8" fill="#fff" stroke="' + o.line + '" stroke-width="1.5"/>';
    return L('M252,394 L263,338 M348,394 L337,338', o, 6) + L('M252,394 L263,338 M348,394 L337,338', o, 2.5, 1, o.color) + lace +
      P(S.sym([300, 412], [[272, 414, 250, 392], [232, 408], [228, 446, 246, 486, 247, 520], [240, 580, 212, 700, 198, 800], [250, 816, 300, 812]]), o) +
      HI('M262,540 C252,620 236,720 226,796 L250,802 C256,720 266,620 276,540 Z', 0.2) +
      L('M252,396 Q274,416 300,414 Q326,416 348,396', o, 4, 0.9, '#fff') + L('M330,560 C340,640 356,730 366,800', o, 1.6, 0.4);
  });

  reg('dress.party', 'Strapless party dress with a three-tier ruffle skirt and a bow.', function (o) {
    var tiers = '';
    for (var k = 2; k >= 0; k--) {
      var y0 = 512 + k * 78, xl = 232 - k * 20, xb = 214 - k * 22;
      tiers += P(S.sym([300, y0], [[xl + 14, y0], [xl, y0 + 30, xb + 6, y0 + 60, xb, y0 + 92]].concat(scallops(xb, y0 + 92, 5, 14))), o) +
        SH(S.sym([300, y0 + 70], [[xb + 4, y0 + 70], [xb, y0 + 92]].concat(scallops(xb, y0 + 92, 5, 14))), 0.07);
    }
    return tiers +
      P(S.sym([300, 414], [[290, 396, 262, 390, 232, 402], [228, 446, 246, 486, 248, 526], [300, 534]]), o) +
      HI(S.sym([300, 414], [[290, 396, 262, 390, 232, 402], [232, 418], [264, 406, 300, 430]]), 0.25) +
      P(S.sym([300, 510], [[246, 506], [247, 530], [300, 536]]), o, o.dark) + bow(300, 522, 0.8, o.light, o.line);
  });

  reg('dress.sundress', 'Flowy knee-length sundress with a square neckline and ruffle hem.', function (o) {
    return L('M254,398 L262,338 M346,398 L338,338', o, 9) + L('M254,398 L262,338 M346,398 L338,338', o, 5.5, 1, o.color) +
      P(S.sym([300, 880], [[196, 876], [188, 906]].concat(scallops(188, 906, 6, 14))), o, o.light) +
      P(S.sym([300, 400], [[250, 398], [232, 408], [228, 446, 246, 486, 247, 520], [238, 600, 206, 760, 194, 880], [250, 894, 300, 890]]), o) +
      P(S.sym([300, 506], [[246, 502], [247, 526], [300, 530]]), o, o.light) +
      L('M270,540 C262,660 244,790 232,884 M330,540 C338,660 356,790 368,884 M300,540 L300,888', o, 1.6, 0.35) + bow(300, 406, 0.4, o.light, o.line);
  });

  reg('dress.gown', 'Long evening gown with a halter neck and a mermaid hem.', function (o) {
    return P(S.sym([300, 396], [[292, 374, 286, 350, 285, 328], [274, 326], [262, 366, 244, 392, 233, 410], [228, 446, 246, 486, 247, 520], [249, 556, 222, 584, 220, 630], [220, 780, 240, 940, 226, 1080], [214, 1160, 176, 1210, 150, 1238], [226, 1256, 300, 1250]]), o) +
      HI('M258,560 C246,700 262,900 250,1060 C244,1140 220,1200 200,1236 L236,1244 C262,1180 276,1100 280,1040 C286,880 270,700 280,560 Z', 0.16) +
      L('M226,1080 C262,1100 338,1100 374,1080', o, 1.6, 0.4) + L('M285,330 Q300,322 315,330', o, 4) +
      sparkles([[262, 460, 7], [336, 500, 6], [300, 620, 6], [250, 760, 5], [344, 860, 7], [280, 980, 5], [220, 1190, 6], [380, 1200, 7], [300, 1160, 5]]);
  });

  reg('dress.swimsuit', 'One-piece swimsuit with a scoop neck and a side bow.', function (o) {
    return P(S.sym([300, 404], [[270, 402, 262, 372, 262, 338], [250, 339], [246, 368, 238, 392, 232, 408], [228, 446, 246, 486, 247, 520], [249, 556, 228, 580, 226, 604], [248, 630, 280, 660, 300, 678]]), o) +
      S.mir(L('M240,412 C236,450 250,490 252,522 C254,560 238,584 234,606', o, 5, 0.95, '#fff')) +
      bow(262, 420, 0.42, '#fff', o.line);
  });

  reg('dress.tennis', 'Sporty tennis dress with a polo collar and a pleated skirt.', function (o) {
    return P(S.sym([300, 560], [[240, 556], [226, 610, 208, 680, 200, 742], [250, 756, 300, 752]]), o) +
      L('M262,580 L236,748 M281,580 L268,752 M300,580 L300,752 M319,580 L332,752 M338,580 L364,748', o, 1.8, 0.5) +
      L('M204,726 Q250,740 300,736 Q350,740 396,726', o, 5, 1, '#fff') +
      P(S.sym([300, 380], [[282, 372, 270, 352, 268, 336], [250, 338], [244, 368, 238, 392, 232, 408], [228, 446, 246, 486, 247, 520], [246, 540, 242, 552, 240, 562], [270, 570, 300, 568]]), o) +
      P('M268,334 L246,352 L276,384 L300,366 Z', o, '#fff') + P('M332,334 L354,352 L324,384 L300,366 Z', o, '#fff') +
      L('M300,366 L300,440', o, 2, 0.6) + '<circle cx="300" cy="396" r="3.5" fill="#fff" stroke="' + o.line + '" stroke-width="1.2"/><circle cx="300" cy="420" r="3.5" fill="#fff" stroke="' + o.line + '" stroke-width="1.2"/>';
  });

  reg('dress.teedress', 'Oversized t-shirt dress with a big star.', function (o) {
    return S.mir(P('M211,346 C188,356 176,400 170,452 L224,462 C228,436 234,414 240,398 Z', o) + L('M173,440 L224,450', o, 2, 0.5)) +
      P(S.sym([300, 358], [[284, 358, 272, 350, 266, 335], [246, 337, 224, 342, 211, 352], [234, 402], [222, 480, 216, 600, 210, 730], [256, 742, 300, 740]]), o) +
      L('M267,337 Q274,352 300,362 Q326,352 333,337', o, 5, 1, o.light) +
      '<path d="' + S.star(300, 500, 44) + '" fill="' + o.light + '" stroke="' + o.line + '" stroke-width="2.5"/>' + L('M214,716 Q256,728 300,726 Q344,728 386,716', o, 1.6, 0.5);
  });

  reg('dress.ballgown', 'Princess ball gown with a huge layered skirt and bows. A reward item.', function (o) {
    var skirt = S.sym([300, 520], [[250, 516], [170, 640, 96, 960, 78, 1200]].concat(scallops(78, 1200, 6, 30)));
    return P(skirt, o) +
      P(S.sym([300, 520], [[258, 518], [220, 660, 190, 900, 176, 1100]].concat(scallops(176, 1100, 4, 24))), o, o.light) +
      HI(S.sym([300, 520], [[270, 520], [262, 700, 250, 900, 244, 1090], [300, 1100]]), 0.3) +
      S.mir(L('M222,640 C196,800 150,1000 130,1196 M200,720 C160,880 120,1060 104,1190', o, 1.8, 0.35) + bow(182, 1098, 0.7, o.color, o.line)) +
      P(S.sym([300, 414], [[290, 396, 262, 390, 232, 402], [228, 446, 246, 486, 248, 526], [300, 540]]), o) +
      S.mir(P(SLEEVE_PUFF, o, o.light)) +
      L('M300,424 L300,536 M284,440 L316,456 M316,440 L284,456 M284,472 L316,488 M316,472 L284,488', o, 1.8, 0.6, '#fff') +
      bow(300, 528, 0.9, o.light, o.line) + sparkles([[150, 1000, 9], [450, 960, 8], [300, 800, 7], [230, 1160, 6], [390, 1150, 7], [120, 1150, 6]]);
  });

  /* ================= SHOES (one foot drawn, mirrored) ================= */
  function pair(m) { return S.mir(m); }

  reg('shoes.platform', 'Chunky platform sandals with two straps.', function (o) {
    return pair(P('M236,1238 Q264,1230 292,1238 L294,1268 Q264,1276 234,1268 Z', o) + HI('M238,1242 Q264,1235 290,1242 L290,1248 Q264,1241 238,1248 Z', 0.4) +
      P('M244,1206 Q264,1196 286,1206 L287,1224 Q264,1214 243,1224 Z', o) + P('M252,1168 L284,1168 L284,1182 L252,1182 Z', o) +
      '<circle cx="268" cy="1175" r="3.5" fill="#ffd84a" stroke="' + o.line + '" stroke-width="1.2"/>');
  });

  reg('shoes.sneakers', 'Chunky sneakers with white toe caps and laces.', function (o) {
    return pair(P('M250,1158 L286,1158 C290,1200 296,1230 294,1248 C292,1264 238,1264 234,1248 C232,1230 244,1200 250,1158 Z', o) +
      P('M238,1232 C246,1218 284,1218 292,1232 C296,1244 294,1252 292,1254 L236,1254 C234,1250 234,1242 238,1232 Z', o, '#fff') +
      P('M233,1250 Q264,1260 295,1250 L295,1262 Q264,1272 233,1262 Z', o, '#fff') +
      L('M254,1176 L282,1182 M253,1190 L283,1196 M252,1204 L284,1210', o, 3, 1, '#fff') + P('M250,1156 L286,1156 L286,1168 L250,1168 Z', o, o.light));
  });

  reg('shoes.heels', 'Pointed high-heel pumps with a tiny bow.', function (o) {
    return pair(P('M248,1196 C240,1222 246,1254 264,1270 C282,1254 290,1222 286,1196 Q267,1210 248,1196 Z', o) +
      HI('M254,1214 C250,1232 256,1250 264,1260 C258,1244 258,1228 262,1214 Z', 0.35) + bow(267, 1210, 0.3, o.light, o.line));
  });

  reg('shoes.boots', 'Knee-high boots with a cuff.', function (o) {
    return pair(P('M236,932 C240,1000 248,1090 250,1170 C244,1200 232,1232 236,1250 C242,1266 290,1266 294,1250 C296,1232 290,1200 286,1170 C290,1090 294,1000 293,932 Z', o) +
      P('M233,926 L296,926 L295,958 L236,958 Z', o, o.dark) + HI('M252,970 C256,1040 260,1110 260,1170 L268,1170 C268,1110 266,1040 262,970 Z', 0.22) +
      P('M233,1252 Q264,1262 296,1252 L296,1264 Q264,1274 233,1264 Z', o, o.dark) + L('M250,1170 Q268,1180 286,1170', o, 1.6, 0.5));
  });

  reg('shoes.flipflops', 'Beach flip-flops.', function (o) {
    return pair(P('M238,1242 Q264,1262 290,1242 L292,1256 Q264,1276 236,1256 Z', o) + L('M264,1214 L244,1242 M264,1214 L286,1242', o, 7) + L('M264,1214 L244,1242 M264,1214 L286,1242', o, 3.5, 1, o.light) +
      '<circle cx="264" cy="1214" r="6" fill="' + o.light + '" stroke="' + o.line + '" stroke-width="1.5"/>');
  });

  reg('shoes.flats', 'Ballet flats with a bow.', function (o) {
    return pair(P('M244,1208 C238,1228 238,1246 244,1252 C254,1262 278,1262 286,1252 C292,1244 290,1226 286,1208 Q266,1226 244,1208 Z', o) +
      bow(265, 1222, 0.32, o.light, o.line));
  });

  reg('shoes.fluffy', 'Fluffy winter boots with a soft trim.', function (o) {
    var fur = '';
    for (var x = 240; x <= 296; x += 11) fur += '<circle cx="' + x + '" cy="1064" r="10"/>';
    return pair(P('M240,1066 C244,1110 248,1140 250,1170 C244,1200 230,1232 234,1250 C240,1266 292,1266 296,1250 C298,1232 290,1200 288,1170 C290,1140 292,1110 294,1066 Z', o) +
      P('M231,1252 Q264,1262 298,1252 L298,1264 Q264,1274 231,1264 Z', o, o.dark) +
      G.art.merged(fur, '#fff', o.line, 4));
  });

  /* ================= JACKETS (open front; one side drawn, mirrored) ================= */
  reg('jacket.denim', 'Cropped denim jacket with a collar and pockets.', function (o) {
    return S.mir(P(SLEEVE_LONG, o) + P('M152,646 L191,655 L188,672 L149,663 Z', o, o.dark) +
      P('M268,333 L246,336 C224,341 211,347 208,354 L236,404 C228,450 240,500 244,536 L284,540 L288,430 Q282,372 268,333 Z', o) +
      P('M244,518 L284,522 L284,540 L244,536 Z', o, o.dark) +
      P('M266,330 L244,340 L262,386 L290,366 Z', o, o.light) +
      P('M248,440 L276,442 L276,456 L262,464 L248,456 Z', o, o.dark) + '<circle cx="262" cy="448" r="3" fill="#ffd84a"/>' +
      L('M284,400 L282,520', o, 1.6, 0.5, '#fff') + '<circle cx="279" cy="420" r="3.2" fill="#ffd84a" stroke="' + o.line + '" stroke-width="1"/><circle cx="278" cy="470" r="3.2" fill="#ffd84a" stroke="' + o.line + '" stroke-width="1"/>');
  }, { sample: '#6fa8ff' });

  reg('jacket.track', 'Zip-up track jacket with striped sleeves.', function (o) {
    return S.mir(P(SLEEVE_LONG, o) + L('M196,360 C184,430 176,520 162,654', o, 5, 1, '#fff') + L('M207,356 C194,430 186,520 172,656', o, 2.5, 1, '#fff') +
      P('M152,646 L191,655 L188,672 L149,663 Z', o, o.dark)) +
      P(S.sym([300, 392], [[284, 372, 274, 350, 268, 326], [258, 326], [246, 336, 222, 340, 208, 352], [236, 404], [226, 450, 232, 520, 228, 590], [228, 606], [264, 614, 300, 612]]), o) +
      P(S.sym([300, 590], [[228, 586], [228, 608], [264, 616, 300, 614]]), o, o.dark) +
      S.mir(P('M268,324 L258,326 L262,354 L296,392 L300,380 Z', o, o.light)) +
      L('M300,392 L300,612', o, 3, 1, '#fff') + '<rect x="295" y="396" width="10" height="16" rx="3" fill="#ffd84a" stroke="' + o.line + '" stroke-width="1.2"/>';
  });

  reg('jacket.furshrug', 'Fluffy faux-fur shrug for party nights.', function (o) {
    var pts = [[262, 340, 20], [238, 346, 22], [214, 360, 24], [200, 392, 24], [192, 428, 24], [186, 464, 23], [182, 498, 22], [228, 400, 22], [222, 440, 20], [214, 478, 20], [244, 380, 20], [256, 420, 18], [206, 516, 18]];
    var shapes = pts.map(function (p) { return '<circle cx="' + p[0] + '" cy="' + p[1] + '" r="' + p[2] + '"/>'; }).join('');
    return S.mir(G.art.merged(shapes, o.fill, o.line, 5) +
      pts.slice(0, 7).map(function (p) { return '<circle cx="' + (p[0] - 5) + '" cy="' + (p[1] - 6) + '" r="6" fill="#fff" opacity=".35"/>'; }).join(''));
  }, { sample: '#ffffff' });

  reg('jacket.cardigan', 'Long soft cardigan with buttons.', function (o) {
    return S.mir(P(SLEEVE_LONG, o) + P('M152,646 L191,655 L188,672 L149,663 Z', o, o.light) +
      P('M268,333 L246,336 C224,341 211,347 208,354 L236,404 C226,460 232,540 222,640 L276,650 L284,470 Q286,390 268,333 Z', o) +
      P('M268,333 L258,335 C270,390 274,470 266,649 L276,650 L284,470 Q286,390 268,333 Z', o, o.light) +
      P('M228,560 L262,562 L262,604 L228,602 Z', o, o.light) +
      '<circle cx="274" cy="480" r="4" fill="#fff" stroke="' + o.line + '" stroke-width="1.2"/><circle cx="273" cy="530" r="4" fill="#fff" stroke="' + o.line + '" stroke-width="1.2"/><circle cx="272" cy="580" r="4" fill="#fff" stroke="' + o.line + '" stroke-width="1.2"/>');
  });
})(window.Game);
