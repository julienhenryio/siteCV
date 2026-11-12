/* Pet Care: bath (shampoo, rinse, dry, brush), treats, and dressing the pet up. */
(function (G) {
  'use strict';
  var U = G.ui, A = G.assets;

  /* Bathroom corner drawn behind the pet (pet space, extended). */
  function backdrop() {
    // The wall and floor extend far beyond the view box, so they fill any stage shape.
    G.defs.ensure('bath-tiles', '<pattern id="bath-tiles" width="60" height="60" patternUnits="userSpaceOnUse"><rect width="60" height="60" fill="#bfe9ff"/><path d="M0,0 L60,0 M0,0 L0,60" stroke="#fff" stroke-width="4" opacity=".75"/></pattern>');
    return '<rect x="-3000" y="-3000" width="6400" height="3300" fill="url(#bath-tiles)"/>' +
      '<rect x="-3000" y="296" width="6400" height="3000" fill="#ffd9ec"/><rect x="-3000" y="290" width="6400" height="14" fill="#fff"/>' +
      '<ellipse cx="200" cy="384" rx="210" ry="40" fill="#ff8cc6" stroke="#c2187a" stroke-width="3"/><ellipse cx="200" cy="380" rx="170" ry="28" fill="#ffc2e2"/>' +
      '<g transform="translate(-110 190)"><rect x="0" y="40" width="70" height="80" rx="12" fill="#b983ff" stroke="#6a2fc0" stroke-width="3"/><rect x="20" y="16" width="30" height="28" rx="6" fill="#fff" stroke="#6a2fc0" stroke-width="3"/><circle cx="35" cy="80" r="16" fill="#fff"/></g>' +
      '<g transform="translate(440 200)"><ellipse cx="30" cy="100" rx="44" ry="14" fill="#ffe14d" stroke="#c98a00" stroke-width="3"/><circle cx="30" cy="70" r="34" fill="#ffe14d" stroke="#c98a00" stroke-width="3"/><circle cx="52" cy="50" r="20" fill="#ffe14d" stroke="#c98a00" stroke-width="3"/><path d="M68,50 l18,5 l-18,7 Z" fill="#ff8a3c" stroke="#c98a00" stroke-width="2"/><circle cx="58" cy="44" r="3.5" fill="#3a1a26"/></g>';
  }

  G.scenes.add('pet', {
    title: 'pet',
    enter: function (root) {
      var st = G.state.data, pet = st.pet;
      var type = G.data.petTypes.filter(function (t) { return t.id === pet.type; })[0];
      var ui = U.layout(root, {});
      var svg = G.svg.make('-150 -110 700 560', '', 'main');
      ui.stage.appendChild(svg);

      var s = { foam: 0, wet: 0, shine: 0, dried: false, brushed: false, treats: 0 };   // this visit only
      var tool = pet.mud > 0.05 ? G.data.petTools[0] : G.data.petTools[3];
      var slot = null, mood = null, moodTimer = null, fxDist = 0, rub;

      function baseMood() { return s.foam > 0.2 ? 'closed' : (pet.mud > 0.3 || s.wet > 0.3 ? 'calm' : 'happy'); }
      function draw() {
        svg.innerHTML = backdrop() + '<g id="pet-g">' + G.pet.markup({ mood: mood || baseMood(), foam: s.foam, wet: s.wet, shine: s.shine }) + '</g>';
      }
      function setFx(name, v) {
        var e = svg.querySelector('[data-fx="' + name + '"]');
        if (e) e.setAttribute('opacity', v);
      }
      function face() {
        var f = svg.querySelector('[data-part="petface"]');
        if (f) f.innerHTML = A.markup('pet.' + pet.type + '.face.' + (mood || baseMood()));
      }
      function feel(m, ms) {
        mood = m; face();
        clearTimeout(moodTimer);
        moodTimer = setTimeout(function () { mood = null; face(); }, ms || 1300);
      }
      function onPet(p) { var dx = (p.x - 200) / 150, dy = (p.y - 210) / 210; return dx * dx + dy * dy < 1; }
      function speak() { G.audio.play(type.sound, { gap: 600 }); }
      function celebrate(key) {
        G.fx.on(svg.querySelector('#pet-g'), { n: 18, spread: 180 });
        G.audio.play('sfx.sparkle'); speak(); feel('joy', 1600);
        U.toast(G.t(key), 'sparkle');
      }

      function onRub(p, dist) {
        if (slot || !onPet(p)) return;
        fxDist += dist;
        var burst = function (kind, rise) { if (fxDist > 45) { fxDist = 0; G.fx.burst(p.cx, p.cy, { kind: kind, n: 2, spread: 44, size: 20, rise: rise || -20 }); } };
        if (tool.id === 'shampoo') {
          s.foam = Math.min(1, s.foam + dist / 1300); s.shine = 0;
          pet.mud = Math.min(pet.mud, 1 - s.foam);
          setFx('foam', s.foam); setFx('mud', pet.mud); setFx('shine', 0);
          if (!mood) face();
          G.audio.play('sfx.bubble', { gap: 170 }); burst('bubble');
        } else if (tool.id === 'shower') {
          if (s.foam <= 0 && pet.mud > 0.05) { ui.hint(G.t('petRinseFirst')); return; }
          var had = s.foam > 0;
          s.foam = Math.max(0, s.foam - dist / 1000); s.wet = 1;
          setFx('foam', s.foam); setFx('wet', 1);
          if (!mood) face();
          G.audio.play('sfx.splash', { gap: 220 }); burst('drop', 50);
          if (had && s.foam <= 0) { pet.mud = 0; setFx('mud', 0); G.audio.play('sfx.pop'); hint(); }
        } else if (tool.id === 'towel') {
          if (s.foam > 0) { ui.hint(G.t('petDryFirst')); return; }
          if (s.wet <= 0) return;
          s.wet = Math.max(0, s.wet - dist / 900);
          setFx('wet', s.wet);
          G.audio.play('sfx.rub', { gap: 170 }); burst('sparkle');
          if (s.wet <= 0) { s.dried = true; if (pet.mud < 0.05) celebrate('petClean'); hint(); }
        } else if (tool.id === 'brush') {
          if (s.foam > 0 || s.wet > 0) return;
          var was = s.shine;
          s.shine = Math.min(1, s.shine + dist / 900);
          setFx('shine', s.shine);
          G.audio.play('sfx.rub', { gap: 170 }); burst('heart');
          if (was < 1 && s.shine >= 1) { s.brushed = true; feel('love', 1600); speak(); G.fx.on(svg.querySelector('#pet-g'), { kind: 'heart', n: 14, spread: 170 }); }
        }
        G.state.save();
      }
      function onTap(p) {
        if (!onPet(p)) return;
        if (!slot && tool.id === 'treat') {
          s.treats++;
          G.audio.play('sfx.chomp'); feel('love', 1500);
          G.fx.burst(p.cx, p.cy, { kind: 'heart', n: 10, spread: 90, rise: -40 });
          setTimeout(speak, 450);
          U.toast(G.t('petTreat'), 'heart');
        } else {
          speak(); feel('joy', 900);
          G.fx.burst(p.cx, p.cy, { kind: 'heart', n: 5, spread: 60, rise: -30 });
        }
      }

      function hint() {
        if (slot) { ui.hint(''); return; }
        if (tool.id === 'treat') ui.hint(pet.name);
        else if (pet.mud > 0.05 && s.foam <= 0 && tool.id !== 'shampoo') ui.hint(G.t('petDirty'));
        else ui.hint(G.t('petRub'));
      }

      function panel() {
        var b = ui.body;
        b.innerHTML = '';
        var tabs = G.data.petTools.concat(G.data.petSlots);
        U.tabs(ui.tabs, tabs, slot ? slot.id : tool.id, function (t) {
          if (G.data.petTools.indexOf(t) >= 0) { tool = t; slot = null; } else slot = t;
          panel();
        });
        if (!slot) {
          ui.title(tool.icon, G.t('bath') + ' · ' + G.tn(tool.name));
          var big = G.icon(tool.icon); big.style.cssText = 'width:120px;height:120px;align-self:center';
          b.appendChild(big);
          b.appendChild(U.note(tool.id === 'treat' ? G.t('treatHint') : G.t('petRub')));
          rub.setTool(tool.icon);
        } else {
          ui.title(slot.icon, G.t('petDress') + ' · ' + G.tn(slot.name));
          rub.setTool(null);
          var cur = pet.acc[slot.id];
          var grid = U.grid(G.data.petAcc.filter(function (a) { return a.slot === slot.id; }), {
            cls: 'big',
            render: function (a) {
              var acc = {}; acc[a.slot] = { id: a.id, color: cur && cur.id === a.id ? cur.color : a.color, pattern: cur && cur.id === a.id ? cur.pattern : a.pattern };
              return G.svg.make('0 -40 400 450', G.pet.markup({ pet: { type: pet.type, color: pet.color, acc: acc, mud: 0 }, mood: 'calm' }), 'thumb');
            },
            isSel: function (a) { return cur && cur.id === a.id; },
            lockOf: function (a) { return G.unlocks.need(a.id); },
            onPick: function (a) {
              pet.acc[slot.id] = { id: a.id, color: a.color, pattern: a.pattern || 'solid' };
              draw(); panel(); G.state.save(); speak(); feel('joy', 1000);
              G.fx.on(svg.querySelector('#pet-g'), { n: 10, spread: 150 });
            }
          });
          U.noneTile(grid, !cur, function () { delete pet.acc[slot.id]; draw(); panel(); G.state.save(); });
          b.appendChild(grid);
          if (cur && A.recolorable(cur.id)) {
            b.appendChild(U.label(G.t('color')));
            b.appendChild(U.swatches(G.data.palette, cur.color, function (c) { cur.color = c; draw(); panel(); G.state.save(); }));
            b.appendChild(U.label(G.t('pattern')));
            b.appendChild(U.patterns(cur.pattern, cur.color, function (p) { cur.pattern = p; draw(); panel(); G.state.save(); }));
          }
        }
        hint();
      }

      rub = G.drag.rub(svg, { ref: function () { return svg.querySelector('#pet-g') || svg; }, onRub: onRub, onTap: onTap });

      ui.foot.appendChild(U.btn({ icon: 'mud', label: G.t('playOutside'), cls: 'ghost small', onClick: function () {
        pet.mud = 1; s.foam = 0; s.wet = 0; s.shine = 0; s.dried = false; s.brushed = false;
        tool = G.data.petTools[0]; slot = null;
        draw(); panel(); speak(); G.state.save();
        U.toast(G.t('petDirty'), 'shampoo');
      } }));
      ui.foot.appendChild(U.btn({ icon: 'check', label: G.t('done'), onClick: function () { G.scenes.go('hub'); } }));
      G.challenges.attach(ui, 'pet', function () { return s; });

      var name = U.el('div', 'name-tag'); name.textContent = pet.name;
      ui.top.insertBefore(name, ui.top.firstChild);

      draw(); panel();
      return function () { rub.off(); clearTimeout(moodTimer); };
    }
  });
})(window.Game);
