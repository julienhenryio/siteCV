/* Dress Up: wardrobe by category; every item can be recolored and given a pattern. */
(function (G) {
  'use strict';
  var U = G.ui;

  G.scenes.add('dressup', {
    title: 'dressup',
    enter: function (root) {
      var st = G.state.data, of = st.outfit;
      var ui = U.layout(root, { stageCls: 'pad' });
      var svg = G.svg.make(G.doll.VIEW.full, '', 'main');
      ui.stage.appendChild(svg);

      var tab = G.data.wardrobeTabs[0];
      var focus = null;          // slot whose color/pattern controls are shown
      var memory = {};           // item id -> last { color, pattern } the player gave it

      function draw() { G.doll.update(svg, { expr: 'smile' }); }
      function items() { return G.data.clothes.filter(function (c) { return tab.slots.indexOf(c.slot) >= 0; }); }
      function viewOf(c) { return tab.slots.length === 1 && tab.view ? tab.view : (G.data.slotViews[c.slot] || tab.view); }
      function look(c) {
        var w = of[c.slot];
        if (w && w.id === c.id) return { color: w.color, pattern: w.pattern };
        return memory[c.id] || { color: c.color, pattern: c.pattern || 'solid' };
      }
      function wear(c) {
        var l = look(c);
        of[c.slot] = { id: c.id, color: l.color, pattern: l.pattern };
        // a dress replaces top + bottom, and the other way round
        if (c.slot === 'dress') { delete of.top; delete of.bottom; }
        if (c.slot === 'top' || c.slot === 'bottom') delete of.dress;
        focus = c.slot;
      }
      function sparkleSlot(slot) {
        var g = svg.querySelector('[data-slot="' + slot + '"]');
        if (g) G.fx.on(g, { n: 10, spread: 90 });
      }

      function panel() {
        var b = ui.body;
        b.innerHTML = '';
        ui.title(tab.icon, G.tn(tab.name));
        var tall = tab.id === 'dress' || tab.id === 'bottom' || tab.id === 'shoes';
        b.appendChild(U.grid(items(), {
          tileCls: tall ? 'tall' : '',
          render: function (c) { return G.unlocks.dollThumb(c, viewOf(c), look(c)); },
          isSel: function (c) { return of[c.slot] && of[c.slot].id === c.id; },
          lockOf: function (c) { return G.unlocks.need(c.id); },
          onPick: function (c) {
            if (of[c.slot] && of[c.slot].id === c.id) { delete of[c.slot]; if (focus === c.slot) focus = null; G.audio.play('sfx.trash'); }
            else wear(c);
            draw(); panel(); sparkleSlot(c.slot); G.state.save();
          }
        }));

        var w = focus && of[focus];
        if (w && tab.slots.indexOf(focus) >= 0) {
          var def = G.data.clothesById[w.id];
          var set = function () { memory[w.id] = { color: w.color, pattern: w.pattern }; draw(); panel(); G.state.save(); };
          if (G.assets.recolorable(w.id)) {
            b.appendChild(U.label(G.tn(def.name) + ' · ' + G.t('color')));
            b.appendChild(U.swatches(G.data.palette, w.color, function (c) { w.color = c; set(); }));
            b.appendChild(U.label(G.t('pattern')));
            b.appendChild(U.patterns(w.pattern, w.color, function (p) { w.pattern = p; set(); }));
          }
        } else {
          b.appendChild(U.note(G.t('pickItem')));
        }
      }

      function random() {
        var free = G.data.clothes.filter(function (c) { return !G.unlocks.locked(c.id); });
        var pick = function (slot) { var l = free.filter(function (c) { return c.slot === slot; }); return l[Math.floor(Math.random() * l.length)]; };
        for (var k in of) delete of[k];
        if (Math.random() < 0.4) wear(pick('dress')); else { wear(pick('top')); wear(pick('bottom')); }
        wear(pick('shoes'));
        ['jacket', 'bag', 'necklace', 'earrings', 'hat', 'glasses', 'hairacc', 'belt'].forEach(function (s) {
          if (Math.random() < 0.35) { var c = pick(s); if (c) wear(c); }
        });
        focus = null;
        draw(); panel(); G.fx.on(svg, { n: 20, spread: 220 }); G.audio.play('sfx.sparkle'); G.state.save();
      }
      function clear() {
        for (var k in of) delete of[k];
        focus = null;
        draw(); panel(); G.state.save();
      }

      U.tabs(ui.tabs, G.data.wardrobeTabs, tab.id, function (t) {
        tab = t;
        focus = null;
        // show the controls of what she already wears in this category
        t.slots.forEach(function (s) { if (!focus && of[s]) focus = s; });
        panel();
      });
      if (of[tab.slots[0]]) focus = tab.slots[0];

      ui.foot.appendChild(U.btn({ icon: 'dice', label: G.t('random'), cls: 'purple small', onClick: random }));
      ui.foot.appendChild(U.btn({ icon: 'undo', label: G.t('undress'), cls: 'ghost small', sound: 'sfx.trash', onClick: clear }));
      ui.foot.appendChild(U.btn({ icon: 'check', label: G.t('done'), onClick: function () { G.scenes.go('hub'); } }));
      G.challenges.attach(ui, 'dressup');

      draw(); panel();
    }
  });
})(window.Game);
