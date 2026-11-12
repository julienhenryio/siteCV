/* Makeover: a spa ritual first, then makeup applied by rubbing tools on her face, plus hair. */
(function (G) {
  'use strict';
  var U = G.ui, A = G.assets;

  /* Where each tool works, in the head's own coordinates (see js/art/doll.js). Generous on purpose. */
  var ZONES = {
    face: function (p) { var dx = (p.x - 300) / 112, dy = (p.y - 180) / 128; return dx * dx + dy * dy < 1; },
    cheeks: function (p) { return Math.abs(Math.abs(p.x - 300) - 62) < 50 && Math.abs(p.y - 226) < 38; },
    eyes: function (p) { return Math.abs(Math.abs(p.x - 300) - 43) < 50 && p.y > 132 && p.y < 218; },
    lips: function (p) { return Math.abs(p.x - 300) < 46 && Math.abs(p.y - 258) < 28; },
    temples: function (p) { return Math.abs(Math.abs(p.x - 300) - 80) < 46 && p.y > 160 && p.y < 250; }
  };
  var HINTS = { face: 'rubFace', cheeks: 'rubCheeks', eyes: 'rubEyes', lips: 'rubLips', temples: 'rubTemples' };
  var EYES = [[257, 187], [343, 187]];
  var STRAYS = [[232, 132, -20], [258, 124, -6], [284, 134, 12], [316, 134, -12], [342, 124, 6], [368, 132, 20]];

  G.scenes.add('makeover', {
    title: 'makeover',
    enter: function (root) {
      var st = G.state.data, mk = st.makeup;
      var ui = U.layout(root, {});
      var svg = G.svg.make(G.doll.VIEW.face, '', 'main');
      ui.stage.appendChild(svg);

      var mode = st.spaDone ? 'makeup' : 'spa';
      var spa = null, stepIndex = 0, progress = 0, busy = false;
      var tool = G.data.makeupTools[0], chosen = {};      // chosen[toolId] = { c, s }
      var fxDist = 0, meter = null, rub;

      G.data.makeupTools.forEach(function (t) {
        var cur = t.layer && mk[t.layer];
        chosen[t.id] = { c: (cur && cur.c) || (t.colors && t.colors[0]), s: (cur && cur.s) || (t.styles && t.styles[0]) };
      });

      function head() { return svg.querySelector('[data-part="head"]'); }

      /* ---------- drawing ---------- */
      function faceExtra() {
        if (mode !== 'spa' || !spa) return '';
        var m = '';
        if (spa.mask > 0) m += '<g data-fx="mask" opacity="' + spa.mask + '">' + A.markup('spa.mask', { color: spa.maskColor }) + '</g>';
        spa.cuc.forEach(function (on, i) {
          if (on) m += '<g transform="translate(' + (EYES[i][0] - 36) + ' ' + (EYES[i][1] - 36) + ') scale(0.72)">' + A.markup('spa.cucumber') + '</g>';
        });
        if (spa.foam > 0) m += '<g data-fx="foam" opacity="' + spa.foam + '">' + A.markup('spa.foam') + '</g>';
        if (spa.strays) spa.strays.forEach(function (alive, i) {
          var s = STRAYS[i];
          if (alive) m += '<g data-stray="' + i + '" transform="translate(' + (s[0] - 9) + ' ' + (s[1] - 14) + ') rotate(' + s[2] + ' 9 14) scale(0.18)">' + A.markup('spa.stray') + '</g>';
        });
        return m;
      }
      function expr() {
        if (mode !== 'spa' || !spa) return 'smile';
        var id = G.data.spaSteps[stepIndex].id;
        return id === 'tweeze' ? 'smile' : 'relax';
      }
      function draw() { G.doll.update(svg, { expr: expr(), face: faceExtra() }); }
      function setOpacity(sel, v) {
        var e = svg.querySelector(sel);
        if (!e) { draw(); return; }
        e.setAttribute('opacity', v);
      }
      function sparkleAt(p, opts) { G.fx.burst(p.cx, p.cy, opts || { n: 3, spread: 36, size: 16 }); }

      /* ---------- spa ---------- */
      function startSpa() {
        mode = 'spa'; stepIndex = 0; progress = 0;
        spa = { foam: 0, mask: 0, maskColor: G.data.maskColors[0], cuc: [false, false], strays: null };
        renderAll();
      }
      function step() { return G.data.spaSteps[stepIndex]; }
      function setProgress(v) {
        progress = Math.max(0, Math.min(1, v));
        if (meter) meter.style.width = Math.round(progress * 100) + '%';
      }
      function nextStep() {
        if (busy) return;
        busy = true;
        G.audio.play('sfx.sparkle');
        G.fx.on(svg, { n: 14, spread: 150 });
        setTimeout(function () {
          busy = false;
          if (G.scenes.current !== 'makeover') return;
          if (stepIndex >= G.data.spaSteps.length - 1) { finishSpa(); return; }
          stepIndex++; progress = 0;
          if (step().id === 'tweeze') spa.strays = STRAYS.map(function () { return true; });
          renderAll();
        }, 550);
      }
      function finishSpa() {
        st.spaDone = true; G.state.save();
        mode = 'makeup'; spa = null;
        G.fx.confetti(); G.audio.play('sfx.win');
        U.toast(G.t('spaDone'), 'sparkle');
        renderAll();
      }
      function spaRub(p, dist) {
        var s = step();
        if (busy || s.kind !== 'rub' || !ZONES.face(p)) return;
        setProgress(progress + dist / 900);
        G.audio.play(s.sound, { gap: 160 });
        fxDist += dist;
        if (s.id === 'cleanser') { spa.foam = progress; setOpacity('[data-fx="foam"]', spa.foam); }
        if (s.id === 'rinse') { spa.foam = 1 - progress; setOpacity('[data-fx="foam"]', spa.foam); }
        if (s.id === 'mask') { spa.mask = progress; setOpacity('[data-fx="mask"]', spa.mask); }
        if (s.id === 'wipe') {
          spa.mask = 1 - progress;
          if (progress > 0.35 && (spa.cuc[0] || spa.cuc[1])) { spa.cuc = [false, false]; draw(); }
          setOpacity('[data-fx="mask"]', spa.mask);
        }
        if (fxDist > 40) {
          fxDist = 0;
          sparkleAt(p, { kind: s.id === 'cleanser' ? 'bubble' : s.id === 'rinse' ? 'drop' : 'sparkle', n: 2, spread: 40, size: 18, rise: s.id === 'rinse' ? 40 : -20 });
        }
        if (progress >= 1) nextStep();
      }
      function spaTap(p) {
        var s = step();
        if (busy) return;
        if (s.kind === 'place') {
          var i = p.x < 300 ? 0 : 1;
          if (!ZONES.face(p)) return;
          if (!spa.cuc[i]) {
            spa.cuc[i] = true; G.audio.play('sfx.pop'); draw();
            sparkleAt(p, { kind: 'heart', n: 5, spread: 50 });
            setProgress((spa.cuc[0] ? 0.5 : 0) + (spa.cuc[1] ? 0.5 : 0));
          }
          if (spa.cuc[0] && spa.cuc[1]) {
            ui.hint(G.t('relaxing'));
            busy = true;
            var n = 0, t = setInterval(function () {
              if (G.scenes.current !== 'makeover') { clearInterval(t); return; }
              G.fx.on(svg, { kind: 'heart', n: 3, spread: 120, rise: -80, dur: 1200 });
              if (++n >= 3) { clearInterval(t); busy = false; nextStep(); }
            }, 480);
          }
        } else if (s.kind === 'pluck') {
          var best = -1, bd = 34 * 34;
          STRAYS.forEach(function (h, k) {
            if (!spa.strays[k]) return;
            var d = (p.x - h[0]) * (p.x - h[0]) + (p.y - h[1]) * (p.y - h[1]);
            if (d < bd) { bd = d; best = k; }
          });
          if (best < 0) return;
          spa.strays[best] = false;
          G.audio.play('sfx.snip'); draw(); sparkleAt(p, { n: 5, spread: 40 });
          var left = spa.strays.filter(Boolean).length;
          setProgress(1 - left / STRAYS.length);
          if (!left) nextStep();
        }
      }

      /* ---------- makeup ---------- */
      function layerOf(t) {
        if (!mk[t.layer]) mk[t.layer] = { a: 0 };
        return mk[t.layer];
      }
      function applyChoice(t) {
        // a new color or style shows at once on makeup that is already there
        var m = mk[t.layer];
        if (!m) return;
        if (t.colors) m.c = chosen[t.id].c;
        if (t.styles) m.s = chosen[t.id].s;
        draw(); G.state.save();
      }
      function makeupRub(p, dist) {
        if (tool.id === 'hair') return;
        if (!ZONES[tool.zone](p)) return;
        G.audio.play('sfx.rub', { gap: 170 });
        fxDist += dist;
        if (tool.erase) {
          var any = false;
          ['blush', 'shadow', 'liner', 'lashes', 'lips', 'gloss', 'gems'].forEach(function (l) {
            var m = mk[l];
            if (!m || !m.a) return;
            m.a = Math.max(0, m.a - dist / 260);
            any = true;
            var e = svg.querySelector('[data-layer="' + l + '"]');
            if (e) e.setAttribute('opacity', m.a);
          });
          if (any && fxDist > 50) { fxDist = 0; sparkleAt(p, { kind: 'bubble', n: 2, spread: 30, size: 14 }); }
          G.state.save();
          return;
        }
        var m = layerOf(tool), was = m.a || 0, redraw = false;
        if (tool.colors && m.c !== chosen[tool.id].c) { m.c = chosen[tool.id].c; redraw = true; }
        if (tool.styles && m.s !== chosen[tool.id].s) { m.s = chosen[tool.id].s; redraw = true; }
        m.a = Math.min(1, was + dist / 300);
        if (redraw || !svg.querySelector('[data-layer="' + tool.layer + '"]')) draw();
        else svg.querySelector('[data-layer="' + tool.layer + '"]').setAttribute('opacity', m.a);
        if (fxDist > 45) { fxDist = 0; sparkleAt(p, { n: 2, spread: 34, size: 15, colors: [m.c || '#fff', '#fff', '#ffd84a'] }); }
        if (was < 1 && m.a >= 1) { G.audio.play('sfx.sparkle'); sparkleAt(p, { n: 10, spread: 70 }); }
        G.state.save();
      }

      /* ---------- panel ---------- */
      function stylePreview(t, s) {
        // close-up of one eye (or the temple) with that style applied
        var m = {}; m[t.layer] = { s: s, c: chosen[t.id].c, a: 1 };
        return G.doll.svg({ makeup: m, bare: true, expr: 'smile' }, t.id === 'liner' ? '180 100 140 140' : '150 105 170 170', 'thumb');
      }
      function hairPanel(b) {
        b.appendChild(U.label(G.t('hairStyle'), 'hair'));
        b.appendChild(U.grid(G.data.hairStyles, {
          render: function (h) { return G.doll.svg({ girl: { skin: st.girl.skin, eyes: st.girl.eyes, hair: h.id, hairColor: st.girl.hairColor }, makeup: {}, bare: true }, '70 -70 460 460', 'thumb'); },
          isSel: function (h) { return h.id === st.girl.hair; },
          onPick: function (h) { st.girl.hair = h.id; draw(); panel(); G.fx.on(svg, { n: 10, spread: 140 }); G.state.save(); }
        }));
        b.appendChild(U.label(G.t('hairColor'), 'haircolor'));
        b.appendChild(U.swatches(G.data.hairColors, st.girl.hairColor, function (c) { st.girl.hairColor = c; draw(); panel(); G.state.save(); }));
        var accs = G.data.clothes.filter(function (c) { return c.slot === 'hairacc'; });
        var cur = st.outfit.hairacc;
        b.appendChild(U.label(G.t('hairAcc'), 'sparkle'));
        b.appendChild(U.grid(accs, {
          render: function (c) { return G.unlocks.dollThumb(c, G.data.slotViews.hairacc, { color: cur && cur.id === c.id ? cur.color : c.color }); },
          isSel: function (c) { return cur && cur.id === c.id; },
          lockOf: function (c) { return G.unlocks.need(c.id); },
          onPick: function (c) {
            if (cur && cur.id === c.id) delete st.outfit.hairacc; else st.outfit.hairacc = { id: c.id, color: c.color, pattern: 'solid' };
            draw(); panel(); G.state.save();
          }
        }));
        if (cur) b.appendChild(U.swatches(G.data.palette, cur.color, function (c) { cur.color = c; draw(); panel(); G.state.save(); }));
      }
      function panel() {
        var b = ui.body;
        b.innerHTML = ''; ui.foot.innerHTML = ''; ui.bottom.innerHTML = '';
        ui.top.querySelectorAll('.meter').forEach(function (m) { m.remove(); });
        meter = null;

        if (mode === 'spa') {
          var s = step();
          ui.title('sparkle', G.t('spa') + ' · ' + G.tn(s.name));
          U.tabs(ui.tabs, G.data.spaSteps.map(function (x, i) { return { id: x.id, icon: x.icon, name: x.name, done: i < stepIndex }; }), s.id, function (t) {
            stepIndex = G.data.spaSteps.map(function (x) { return x.id; }).indexOf(t.id);
            progress = 0;
            if (t.id === 'tweeze' && !spa.strays) spa.strays = STRAYS.map(function () { return true; });
            renderAll();
          });
          var big = G.icon(s.icon); big.style.cssText = 'width:110px;height:110px;align-self:center';
          b.appendChild(big);
          b.appendChild(U.note(G.t(s.kind === 'rub' ? 'rubHint' : s.kind === 'place' ? 'placeHint' : 'pluckHint')));
          if (s.id === 'mask') {
            b.appendChild(U.label(G.t('color')));
            b.appendChild(U.swatches(G.data.maskColors, spa.maskColor, function (c) { spa.maskColor = c; draw(); }));
          }
          var mt = U.el('div', 'meter');
          mt.appendChild(G.icon(s.icon));
          var bar = U.el('div', 'bar'); meter = U.el('i'); bar.appendChild(meter); mt.appendChild(bar);
          ui.top.insertBefore(mt, ui.top.firstChild);
          setProgress(progress);
          ui.hint(G.t(s.kind === 'rub' ? 'rubHint' : s.kind === 'place' ? 'placeHint' : 'pluckHint'));
          ui.foot.appendChild(U.btn({ label: G.t('skip'), icon: 'skip', cls: 'ghost', onClick: finishSpa }));
          rub.setTool(s.kind === 'place' ? null : s.icon);
          return;
        }

        var tools = G.data.makeupTools.concat([{ id: 'hair', icon: 'hair', name: G.t('hair') }]);
        ui.title(tool.icon, G.tn(tool.name));
        U.tabs(ui.tabs, tools, tool.id, function (t) { tool = t; panel(); });
        if (tool.id === 'hair') {
          hairPanel(b);
          ui.hint(''); rub.setTool(null);
        } else {
          if (tool.styles) {
            b.appendChild(U.label(G.t('style')));
            b.appendChild(U.grid(tool.styles.map(function (s) { return { id: s }; }), {
              render: function (s) { return stylePreview(tool, s.id); },
              isSel: function (s) { return chosen[tool.id].s === s.id; },
              label: function (s) { return s.id; },
              onPick: function (s) { chosen[tool.id].s = s.id; applyChoice(tool); panel(); }
            }));
          }
          if (tool.colors) {
            b.appendChild(U.label(G.t('color')));
            b.appendChild(U.swatches(tool.colors, chosen[tool.id].c, function (c) { chosen[tool.id].c = c; applyChoice(tool); if (tool.styles) panel(); }));
          }
          var big2 = G.icon(tool.icon); big2.style.cssText = 'width:96px;height:96px;align-self:center;margin-top:4px';
          b.appendChild(big2);
          b.appendChild(U.note(G.t(HINTS[tool.zone])));
          ui.hint(G.t(HINTS[tool.zone]));
          rub.setTool(tool.icon);
        }
        ui.foot.appendChild(U.btn({ label: G.t('spaAgain'), icon: 'mask', cls: 'ghost small', onClick: startSpa }));
        ui.foot.appendChild(U.btn({ label: G.t('done'), icon: 'check', onClick: function () { G.scenes.go('hub'); } }));
      }
      function renderAll() { draw(); panel(); }

      rub = G.drag.rub(svg, {
        ref: head,
        onRub: function (p, dist) { if (mode === 'spa') spaRub(p, dist); else makeupRub(p, dist); },
        onTap: function (p) { if (mode === 'spa') spaTap(p); }
      });
      G.challenges.attach(ui, 'makeover');

      if (mode === 'spa') startSpa(); else renderAll();
      return function () { rub.off(); };
    }
  });
})(window.Game);
