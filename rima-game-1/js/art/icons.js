/* Built-in UI icons and tool pictures (unit space, 100 x 100).
   Sticker style: white or bright fill, deep pink outline, so they read on any background.
   IDs: icon.<name>. Tools dragged over the girl or the pet reuse these pictures. */
(function (G) {
  'use strict';
  var S = G.svg, A = G.assets;
  var K = '#b5126f', W = '#ffffff', PK = '#ff5fb0', LP = '#ffc2e2', Y = '#ffd84a', B = '#7fd4ff', PU = '#b983ff', GR = '#8fe38a', BR = '#c98a5a';

  function s(fill, w) { return ' fill="' + (fill || W) + '" stroke="' + K + '" stroke-width="' + (w || 5) + '" stroke-linejoin="round" stroke-linecap="round"'; }
  function p(d, fill, w) { return '<path d="' + d + '"' + s(fill, w) + '/>'; }
  function c(x, y, r, fill, w) { return '<circle cx="' + x + '" cy="' + y + '" r="' + r + '"' + s(fill, w) + '/>'; }
  function r(x, y, w, h, rx, fill, sw, extra) { return '<rect x="' + x + '" y="' + y + '" width="' + w + '" height="' + h + '" rx="' + (rx || 0) + '"' + s(fill, sw) + (extra || '') + '/>'; }
  function l(d, w, col) { return '<path d="' + d + '" fill="none" stroke="' + (col || K) + '" stroke-width="' + (w || 5) + '" stroke-linecap="round" stroke-linejoin="round"/>'; }
  function sp(x, y, rad, fill) { return '<path d="' + S.spark(x, y, rad) + '" fill="' + (fill || W) + '" stroke="' + K + '" stroke-width="2.5" stroke-linejoin="round"/>'; }
  function I(name, desc, body) { A.register('icon.' + name, { space: 'unit', recolor: false, desc: desc, draw: typeof body === 'function' ? body : function () { return body; } }); }

  /* ---- navigation / generic ---- */
  I('home', 'Home button: little house.', p('M14,50 L50,16 L86,50 L76,50 L76,84 L58,84 L58,62 L42,62 L42,84 L24,84 L24,50 Z', W) + '<path d="' + S.heart(50, 44, 7) + '" fill="' + PK + '"/>');
  I('back', 'Back arrow.', p('M58,18 L24,50 L58,82 L58,62 L80,62 L80,38 L58,38 Z', W));
  I('check', 'Done / confirm tick.', p('M16,54 L40,78 L86,26 L74,16 L40,56 L28,42 Z', W));
  I('close', 'Close cross.', p('M24,14 L50,40 L76,14 L86,24 L60,50 L86,76 L76,86 L50,60 L24,86 L14,76 L40,50 L14,24 Z', W));
  I('star', 'Full star (score, challenge).', p(S.star(50, 52, 42, 19), Y) + '<ellipse cx="38" cy="40" rx="8" ry="5" fill="#fff" opacity=".7" transform="rotate(-30 38 40)"/>');
  I('starempty', 'Empty star (score not earned).', p(S.star(50, 52, 42, 19), '#f3d9e8'));
  I('lock', 'Padlock for locked reward items.', l('M32,46 L32,34 C32,12 68,12 68,34 L68,46', 8) + r(22, 44, 56, 42, 10, Y) + c(50, 62, 6, K, 0) + l('M50,64 L50,74', 6));
  I('music', 'Music on.', p('M34,22 L78,12 L78,62 C78,78 54,78 54,64 C54,54 66,52 70,56 L70,30 L42,36 L42,74 C42,90 18,90 18,76 C18,66 30,64 34,68 Z', W));
  I('mute', 'Sound off.', p('M34,22 L78,12 L78,62 C78,78 54,78 54,64 C54,54 66,52 70,56 L70,30 L42,36 L42,74 C42,90 18,90 18,76 C18,66 30,64 34,68 Z', '#f3d9e8') + l('M14,14 L86,86', 9, K) + l('M14,14 L86,86', 4, '#ff5a5a'));
  I('dice', 'Random outfit dice.', r(16, 16, 68, 68, 14, W) + c(34, 34, 6, PK, 0) + c(66, 34, 6, PK, 0) + c(50, 50, 6, PK, 0) + c(34, 66, 6, PK, 0) + c(66, 66, 6, PK, 0));
  I('trash', 'Remove / delete.', r(26, 30, 48, 56, 8, W) + r(18, 20, 64, 12, 5, LP) + r(40, 10, 20, 12, 4, LP) + l('M40,42 L40,74 M50,42 L50,74 M60,42 L60,74', 4));
  I('plus', 'Bigger / add.', p('M40,14 L60,14 L60,40 L86,40 L86,60 L60,60 L60,86 L40,86 L40,60 L14,60 L14,40 L40,40 Z', W));
  I('minus', 'Smaller.', r(14, 40, 72, 20, 6, W));
  I('heart', 'Heart.', p(S.heart(50, 52, 34), PK) + '<ellipse cx="34" cy="38" rx="8" ry="5" fill="#fff" opacity=".7" transform="rotate(-30 34 38)"/>');
  I('sparkle', 'Sparkle.', '<path d="' + S.spark(46, 54, 38) + '"' + s(Y) + '/>' + sp(80, 22, 14) + sp(20, 18, 8));
  I('undo', 'Undress / reset.', p('M20,30 L20,62 L52,62 L40,50 C58,36 78,48 72,68 C68,80 54,84 44,80 L40,90 C60,98 82,86 84,64 C86,36 54,22 32,42 Z', W));
  I('album', 'Photo album.', r(14, 20, 60, 60, 6, LP, 5, ' transform="rotate(-8 44 50)"') + r(26, 24, 60, 60, 6, W) + r(34, 32, 44, 30, 3, B, 3) + c(46, 44, 5, Y, 0) + l('M36,60 L50,48 L62,58 L70,52 L76,58', 3));
  I('skip', 'Skip this step.', p('M16,22 L48,50 L16,78 Z', W) + p('M48,22 L80,50 L48,78 Z', W) + r(78, 22, 10, 56, 3, W));
  I('gift', 'Reward unlocked.', r(18, 44, 64, 42, 6, PK) + r(12, 30, 76, 18, 5, LP) + r(43, 30, 14, 56, 0, Y, 4) + p('M50,30 C40,8 18,14 26,26 C30,32 42,30 50,30 C58,30 70,32 74,26 C82,14 60,8 50,30 Z', Y));

  /* ---- the five features + mirror ---- */
  I('makeover', 'Makeover feature: lipstick.', r(34, 52, 32, 38, 5, Y) + r(38, 38, 24, 18, 3, W) + p('M40,38 L40,20 L60,10 L60,38 Z', PK) + sp(78, 26, 12) + sp(22, 34, 8));
  I('dressup', 'Dress Up feature: dress on a hanger.', l('M50,22 C50,10 62,10 60,18 C59,24 50,22 50,30', 5) + p('M34,32 L66,32 L62,50 L80,88 L20,88 L38,50 Z', PK) + p('M38,48 L62,48 L64,56 L36,56 Z', LP, 4) + '<path d="' + S.heart(50, 72, 7) + '" fill="#fff"/>');
  I('room', 'Room feature: paint roller.', r(14, 14, 60, 26, 8, PK) + l('M74,27 L86,27 L86,50 L50,50 L50,60', 5) + r(42, 58, 16, 34, 5, Y) + '<rect x="20" y="19" width="30" height="6" rx="3" fill="#fff" opacity=".6"/>');
  I('pet', 'Pet Care feature: paw print.', '<ellipse cx="50" cy="66" rx="24" ry="20"' + s(PK) + '/><ellipse cx="22" cy="42" rx="10" ry="13"' + s(PK) + '/><ellipse cx="40" cy="24" rx="10" ry="13"' + s(PK) + '/><ellipse cx="62" cy="24" rx="10" ry="13"' + s(PK) + '/><ellipse cx="80" cy="42" rx="10" ry="13"' + s(PK) + '/>');
  I('photo', 'Photo Shoot feature: camera.', r(40, 14, 24, 14, 4, LP) + r(10, 24, 80, 60, 12, W) + c(50, 54, 20, B) + c(50, 54, 9, '#3f5fd6', 3) + c(44, 48, 4, '#fff', 0) + c(76, 36, 4, PK, 0));
  I('mirror', 'Change her features: hand mirror.', '<ellipse cx="50" cy="38" rx="30" ry="32"' + s(PK) + '/><ellipse cx="50" cy="38" rx="20" ry="22"' + s(B, 4) + '/>' + r(43, 68, 14, 28, 6, PK) + '<path d="M40,28 Q46,20 56,22" fill="none" stroke="#fff" stroke-width="5" stroke-linecap="round"/>');

  /* ---- wardrobe tabs ---- */
  I('top', 'Tops tab: t-shirt.', p('M34,16 Q50,30 66,16 L90,32 L78,50 L70,44 L70,86 L30,86 L30,44 L22,50 L10,32 Z', PK));
  I('bottom', 'Bottoms tab: skirt.', p('M30,22 L70,22 L88,82 Q50,94 12,82 Z', PK) + r(28, 14, 44, 12, 4, LP) + l('M40,30 L32,84 M50,30 L50,88 M60,30 L68,84', 3));
  I('dress', 'Dresses tab: dress.', p('M36,10 L44,10 Q50,22 56,10 L64,10 L62,40 L84,90 L16,90 L38,40 Z', PK) + p('M38,40 L62,40 L64,50 L36,50 Z', LP, 4));
  I('shoe', 'Shoes tab: high heel.', p('M12,34 C26,36 40,56 60,62 C78,64 90,70 90,82 L46,82 C40,72 30,64 24,62 L24,86 L14,86 Z', PK) + '<ellipse cx="40" cy="60" rx="5" ry="3" fill="#fff" opacity=".7"/>');
  I('jacket', 'Jackets tab: jacket.', p('M36,12 L50,24 L64,12 L90,28 L84,76 L70,74 L70,88 L30,88 L30,74 L16,76 L10,28 Z', B) + l('M50,24 L50,88 M36,12 L44,36 M64,12 L56,36', 4) + c(58, 50, 3, Y, 0) + c(58, 66, 3, Y, 0));
  I('bag', 'Bags tab: handbag.', l('M32,40 C32,8 68,8 68,40', 7) + p('M18,38 L82,38 L88,84 Q50,92 12,84 Z', PK) + p('M18,38 L82,38 L78,54 Q50,64 22,54 Z', LP, 4) + c(50, 58, 6, Y, 3));
  I('gem', 'Jewelry tab: gem.', p('M28,18 L72,18 L90,42 L50,88 L10,42 Z', B) + l('M10,42 L90,42 M28,18 L40,42 L50,88 L60,42 L72,18', 3.5) + sp(80, 16, 10));
  I('hat', 'Head tab: hat.', '<ellipse cx="50" cy="66" rx="42" ry="16"' + s(PK) + '/>' + p('M24,64 C24,26 76,26 76,64 Q50,74 24,64 Z', PK) + p('M24,56 Q50,66 76,56 L76,64 Q50,74 24,64 Z', LP, 4));

  /* ---- makeup tools ---- */
  I('blush', 'Blush brush.', r(42, 46, 16, 46, 6, Y) + r(40, 40, 20, 12, 3, W, 4) + p('M40,40 C26,22 34,6 50,6 C66,6 74,22 60,40 Z', PK));
  I('shadow', 'Eyeshadow palette.', r(8, 22, 84, 56, 10, W) + r(18, 32, 18, 18, 4, PU, 3) + r(41, 32, 18, 18, 4, PK, 3) + r(64, 32, 18, 18, 4, B, 3) + r(18, 58, 64, 10, 5, LP, 3));
  I('liner', 'Eyeliner pencil.', '<g transform="rotate(40 50 50)">' + r(42, 22, 16, 66, 5, '#3a2a4a') + p('M42,24 L50,2 L58,24 Z', LP) + '<path d="M47,10 L50,2 L53,10 Z" fill="#2a1420"/>' + r(42, 70, 16, 8, 0, Y, 3) + '</g>');
  I('mascara', 'Mascara wand.', '<g transform="rotate(40 50 50)">' + r(41, 50, 18, 44, 6, PK) + r(47, 30, 6, 22, 2, W, 3) + '<ellipse cx="50" cy="20" rx="9" ry="17"' + s('#3a2a4a', 4) + '/>' + l('M40,12 L60,12 M39,20 L61,20 M40,28 L60,28', 2.5, '#fff') + '</g>');
  I('lips', 'Lipstick.', '<g transform="rotate(20 50 50)">' + r(34, 54, 32, 38, 5, Y) + r(38, 40, 24, 18, 3, W) + p('M40,40 L40,22 L60,10 L60,40 Z', '#e0245e') + '</g>');
  I('gloss', 'Lip gloss tube.', '<g transform="rotate(-25 50 50)">' + r(38, 36, 24, 54, 8, LP) + r(42, 22, 16, 16, 3, W) + r(44, 6, 12, 18, 5, PK) + '<rect x="43" y="44" width="5" height="34" rx="2.5" fill="#fff" opacity=".8"/></g>' + sp(80, 24, 11));
  I('gems', 'Face gems.', p(S.star(34, 36, 24, 11), Y) + p(S.heart(70, 62, 17), PK) + c(30, 76, 9, B, 4) + sp(76, 22, 9));
  I('hair', 'Hair: comb.', r(14, 22, 72, 24, 8, PK) + l('M22,46 L22,82 M34,46 L34,82 M46,46 L46,82 M58,46 L58,82 M70,46 L70,82 M80,46 L80,82', 6));
  I('remover', 'Makeup remover pad.', c(50, 50, 36, W) + c(50, 50, 24, LP, 3) + l('M36,44 Q50,34 64,44', 3));

  /* ---- spa tools ---- */
  I('cleanser', 'Foaming face wash bottle.', r(30, 38, 40, 54, 10, B) + r(40, 22, 20, 18, 3, W) + p('M44,22 L44,12 L72,12 L72,22', W) + r(36, 54, 28, 20, 4, W, 3) + '<path d="' + S.heart(50, 64, 6) + '" fill="' + PK + '"/>');
  I('water', 'Water splash for rinsing.', p('M50,8 C30,36 20,50 20,66 C20,84 34,94 50,94 C66,94 80,84 80,66 C80,50 70,36 50,8 Z', B) + '<path d="M34,62 C34,74 40,82 50,84" fill="none" stroke="#fff" stroke-width="6" stroke-linecap="round"/>');
  I('mask', 'Face mask jar.', r(18, 40, 64, 48, 10, GR) + r(14, 26, 72, 18, 6, PK) + r(30, 54, 40, 20, 4, W, 3) + p('M36,26 C36,12 64,12 64,26 Z', '#d6f7c9', 4));
  I('cucumber', 'Cucumber slices for the eyes.', function () { return '<g transform="translate(4 14) scale(.56)">' + A.markup('spa.cucumber') + '</g><g transform="translate(40 30) scale(.56)">' + A.markup('spa.cucumber') + '</g>'; });
  I('sponge', 'Soft sponge to wipe the mask off.', r(12, 30, 76, 46, 16, Y) + c(32, 46, 5, '#f0b93a', 0) + c(52, 58, 6, '#f0b93a', 0) + c(70, 44, 4, '#f0b93a', 0) + c(40, 64, 3.5, '#f0b93a', 0) + c(62, 40, 3, '#f0b93a', 0));
  I('tweezers', 'Tweezers for the eyebrows.', '<g transform="rotate(35 50 50)">' + p('M42,6 L50,60 L46,94 L40,94 L38,60 Z', '#dfe6f5') + p('M58,6 L50,60 L54,94 L60,94 L62,60 Z', '#dfe6f5') + r(38, 4, 24, 12, 5, PK) + '</g>');

  /* ---- room tabs ---- */
  I('wall', 'Wallpaper tab.', r(12, 12, 76, 76, 8, LP) + '<path d="' + S.heart(34, 36, 9) + '" fill="' + PK + '"/><path d="' + S.heart(66, 36, 9) + '" fill="' + PK + '"/><path d="' + S.heart(50, 64, 9) + '" fill="' + PK + '"/>');
  I('floor', 'Floor tab.', p('M24,26 L76,26 L94,82 L6,82 Z', BR) + l('M19,44 L81,44 M13,62 L87,62 M50,26 L50,44 M34,44 L30,62 M66,44 L70,62 M50,62 L50,82', 3.5));
  I('bed', 'Bed tab.', p('M12,24 C12,8 40,8 40,24 L40,50 L12,50 Z', PK) + r(8, 46, 84, 28, 8, W) + r(8, 60, 84, 18, 6, LP) + l('M14,78 L14,90 M86,78 L86,90', 7) + r(44, 38, 26, 14, 6, W, 4));
  I('rug', 'Rug tab.', '<ellipse cx="50" cy="56" rx="42" ry="26"' + s(PU) + '/><ellipse cx="50" cy="56" rx="28" ry="16"' + s(LP, 4) + '/><path d="' + S.heart(50, 56, 8) + '" fill="' + PK + '"/>');
  I('curtains', 'Curtains tab.', r(18, 22, 64, 62, 4, B) + p('M16,20 L48,20 C48,50 30,64 18,88 Z', PK) + p('M84,20 L52,20 C52,50 70,64 82,88 Z', PK) + r(10, 12, 80, 10, 5, Y));
  I('lamp', 'Lamp tab.', p('M36,14 L64,14 L78,52 L22,52 Z', Y) + r(45, 52, 10, 28, 3, W, 4) + r(30, 78, 40, 12, 6, PK));
  I('art', 'Wall art tab.', r(12, 16, 76, 68, 6, Y) + r(22, 26, 56, 48, 3, B, 4) + p('M24,72 L42,48 L54,62 L62,54 L76,72 Z', GR, 3.5) + c(64, 38, 6, W, 3));
  I('lights', 'Fairy lights tab.', l('M6,24 Q50,58 94,24', 4) + c(22, 44, 9, Y, 4) + c(40, 54, 9, PK, 4) + c(60, 54, 9, B, 4) + c(78, 44, 9, GR, 4));
  I('plush', 'Decorations tab: teddy bear.', c(26, 24, 12, BR) + c(74, 24, 12, BR) + c(50, 46, 32, BR) + '<ellipse cx="50" cy="56" rx="14" ry="11"' + s('#f5dcc0', 4) + '/>' + c(38, 40, 4, K, 0) + c(62, 40, 4, K, 0) + '<ellipse cx="50" cy="52" rx="5" ry="3.5" fill="' + K + '"/>' + l('M50,56 L50,62 M44,62 Q50,66 56,62', 3));
  I('furniture', 'Furniture color tab: wardrobe.', r(18, 10, 64, 76, 6, PU) + l('M50,10 L50,86', 4) + c(43, 50, 4, Y, 0) + c(57, 50, 4, Y, 0) + l('M24,86 L24,94 M76,86 L76,94', 6));

  /* ---- pet tools ---- */
  I('shampoo', 'Pet shampoo bottle.', r(28, 36, 44, 56, 12, PU) + r(40, 20, 20, 18, 3, W) + r(36, 8, 28, 14, 5, PK) + c(50, 62, 12, W, 3) + c(76, 26, 8, '#e9f7ff', 3) + c(86, 44, 5, '#e9f7ff', 3));
  I('shower', 'Shower head.', l('M20,90 L20,36 C20,14 54,14 58,30', 8) + l('M20,90 L20,36 C20,14 54,14 58,30', 3, '#dfe6f5') + p('M40,36 L80,28 L84,42 L44,50 Z', '#dfe6f5') + l('M50,58 L46,70 M62,56 L62,72 M74,52 L80,66 M56,78 L54,88 M70,76 L74,88', 5, B));
  I('towel', 'Fluffy towel.', r(14, 22, 72, 60, 10, PK) + r(14, 58, 72, 12, 0, W, 4) + l('M20,82 L20,92 M32,82 L32,92 M44,82 L44,92 M56,82 L56,92 M68,82 L68,92 M80,82 L80,92', 4));
  I('brush', 'Pet brush.', '<g transform="rotate(-30 50 50)">' + r(22, 20, 56, 34, 14, PK) + r(42, 54, 16, 40, 7, PK) + l('M32,20 L32,6 M42,20 L42,4 M52,20 L52,4 M62,20 L62,6 M70,22 L72,10', 4) + '</g>');
  I('treat', 'Pet treat: bone biscuit.', '<g transform="rotate(-30 50 50)">' + p('M22,40 C10,40 10,24 22,26 C24,14 40,16 38,30 L62,30 C60,16 76,14 78,26 C90,24 90,40 78,40 C90,40 90,58 78,56 C76,68 60,66 62,52 L38,52 C40,66 24,68 22,56 C10,58 10,40 22,40 Z', '#f5dcc0') + '</g>');
  I('mud', 'Go play outside (gets muddy).', p('M10,70 C10,50 30,56 34,46 C40,30 62,32 66,48 C80,44 92,56 90,70 C88,88 12,88 10,70 Z', BR) + c(36, 62, 5, '#8a5a3c', 0) + c(60, 66, 7, '#8a5a3c', 0) + c(76, 26, 6, BR, 4) + c(24, 28, 4, BR, 3));
  I('petbow', 'Pet bows tab.', function () { return G.art.bow(50, 50, 1.5, PK, K); });
  I('collar', 'Pet collars tab.', '<ellipse cx="50" cy="44" rx="38" ry="22" fill="none" stroke="' + K + '" stroke-width="18"/><ellipse cx="50" cy="44" rx="38" ry="22" fill="none" stroke="' + PK + '" stroke-width="9"/>' + c(50, 74, 12, Y, 4));
  I('petoutfit', 'Pet outfits tab: little cape.', p('M30,16 L70,16 L88,84 Q50,96 12,84 Z', PU) + r(28, 10, 44, 14, 6, Y) + p(S.star(50, 56, 16), Y, 3.5));

  /* ---- photo tabs ---- */
  I('backdrop', 'Backdrops tab: landscape.', r(8, 16, 84, 68, 8, B) + c(70, 36, 9, Y, 3.5) + p('M10,82 L36,46 L54,66 L66,54 L90,82 Z', GR, 4));
  I('face', 'Expressions tab: smiley.', c(50, 50, 38, Y) + c(36, 42, 5, K, 0) + c(64, 42, 5, K, 0) + l('M32,58 Q50,76 68,58', 5));
  I('sticker', 'Stickers tab.', p('M14,14 L86,14 L86,56 L56,86 L14,86 Z', W) + p('M86,56 L56,56 L56,86 Z', LP, 4) + '<path d="' + S.heart(46, 42, 15) + '" fill="' + PK + '" stroke="' + K + '" stroke-width="3"/>');
  I('frame', 'Frames tab.', r(10, 14, 80, 72, 8, PK) + r(24, 28, 52, 44, 3, W, 4) + sp(18, 20, 8) + sp(82, 80, 8));
  I('text', 'Caption tab.', p('M18,16 L82,16 L82,36 L72,36 L70,30 L58,30 L58,74 L66,78 L66,86 L34,86 L34,78 L42,74 L42,30 L30,30 L28,36 L18,36 Z', W));
  I('resize', 'Size control.', p('M12,12 L44,12 L34,22 L50,38 L38,50 L22,34 L12,44 Z', W) + p('M88,88 L56,88 L66,78 L50,62 L62,50 L78,66 L88,56 Z', W));

  /* ---- character creation tabs ---- */
  I('skin', 'Skin tone tab.', c(50, 52, 36, '#f0c09c') + c(38, 46, 4, K, 0) + c(62, 46, 4, K, 0) + l('M38,64 Q50,74 62,64', 4) + '<ellipse cx="30" cy="60" rx="6" ry="4" fill="' + PK + '" opacity=".6"/><ellipse cx="70" cy="60" rx="6" ry="4" fill="' + PK + '" opacity=".6"/>');
  I('eye', 'Eye color tab.', p('M6,50 C24,20 76,20 94,50 C76,80 24,80 6,50 Z', W) + c(50, 50, 20, B) + c(50, 50, 9, '#2a1420', 0) + c(43, 43, 5, '#fff', 0));
  I('haircolor', 'Hair color tab: dye bottle.', p('M30,40 L70,40 L78,90 L22,90 Z', PU) + r(40, 24, 20, 18, 3, W) + p('M44,24 L48,8 L56,8 L56,24', PK) + p('M50,54 C42,66 42,78 50,78 C58,78 58,66 50,54 Z', W, 3));
  I('puppy', 'Choose a puppy.', p('M20,30 C6,34 8,62 22,60 Z', BR) + p('M80,30 C94,34 92,62 78,60 Z', BR) + c(50, 50, 32, '#f2c48a') + '<ellipse cx="50" cy="60" rx="15" ry="12"' + s(W, 4) + '/>' + c(38, 44, 4.5, K, 0) + c(62, 44, 4.5, K, 0) + '<ellipse cx="50" cy="55" rx="6" ry="4.5" fill="' + K + '"/>' + l('M44,64 Q50,70 56,64', 3.5));
  I('kitten', 'Choose a kitten.', p('M20,40 L22,10 L46,26 Z', '#d9dbe8') + p('M80,40 L78,10 L54,26 Z', '#d9dbe8') + c(50, 54, 32, '#d9dbe8') + c(38, 50, 5, K, 0) + c(62, 50, 5, K, 0) + p('M46,60 L54,60 L50,65 Z', PK, 3) + l('M50,65 L50,70 M43,72 Q50,76 57,72 M26,60 L10,56 M26,66 L10,70 M74,60 L90,56 M74,66 L90,70', 3));
})(window.Game);
