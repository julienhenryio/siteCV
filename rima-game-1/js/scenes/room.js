/* Room Decorating: one choice per slot (wallpaper, floor, bed...) plus free decorations to drag around. */
(function (G) {
  'use strict';
  var U = G.ui, A = G.assets;

  G.scenes.add('room', {
    title: 'room',
    enter: function (root) {
      var st = G.state.data, room = st.room;
      var ui = U.layout(root, { cls: 'wide' });
      var scroll = U.el('div', 'stage-scroll');
      var svg = G.svg.make(G.room.VIEW, '', 'room');
      scroll.appendChild(svg);
      ui.stage.insertBefore(scroll, ui.stage.firstChild);

      var slot = G.data.roomSlots[0];
      var sel = -1;               // index of the selected free decoration
      var offs = [];

      function draw() {
        offs.forEach(function (o) { o(); }); offs = [];
        svg.innerHTML = G.room.markup(room, { hubObjects: true }) + '<rect class="sel-box" id="room-sel" width="0" height="0" rx="12"/>';
        Array.prototype.forEach.call(svg.querySelectorAll('[data-decor]'), function (g) {
          var i = +g.getAttribute('data-decor'), d = room.decor[i];
          offs.push(G.drag.move(g, {
            svg: svg,
            get: function () { return { x: d.x, y: d.y }; },
            set: function (x, y) {
              d.x = Math.max(40, Math.min(1160, x)); d.y = Math.max(60, Math.min(770, y));
              var sz = G.room.DECOR_SIZE * (d.s || 1);
              g.setAttribute('transform', 'translate(' + (d.x - sz / 2) + ' ' + (d.y - sz / 2) + ') scale(' + (sz / 100) + ')');
              box();
            },
            onStart: function () { if (sel !== i) { sel = i; box(); } },
            onEnd: function (moved) {
              if (moved) G.audio.play('sfx.drop');
              G.state.save();
              if (slot.id !== 'decor') { slot = G.data.roomSlots.filter(function (s) { return s.id === 'decor'; })[0]; tabs(); }
              draw(); panel();
            }
          }));
        });
        box();
      }
      function box() {
        var b = svg.querySelector('#room-sel'), d = room.decor[sel];
        if (!b) return;
        if (!d || slot.id !== 'decor') { b.setAttribute('width', 0); b.setAttribute('height', 0); return; }
        var sz = G.room.DECOR_SIZE * (d.s || 1) + 14;
        b.setAttribute('x', d.x - sz / 2); b.setAttribute('y', d.y - sz / 2); b.setAttribute('width', sz); b.setAttribute('height', sz);
      }
      function sparkleSlot(name) {
        var g = svg.querySelector('[data-slot="' + name + '"]');
        if (g) G.fx.on(g, { n: 10, spread: 110 });
      }
      function need(id) { return G.unlocks.need(id); }

      function decorPanel(b) {
        b.appendChild(U.note(G.t('tapDecor')));
        b.appendChild(U.grid(slot.variants.map(function (id) { return { id: id }; }), {
          render: function (v) { return U.thumb(v.id, { color: G.data.decorColors[v.id] }, '0 0 100 100'); },
          label: function () { return G.tn(slot.name); },
          onPick: function (v) {
            if (room.decor.length >= 24) room.decor.shift();
            room.decor.push({ id: v.id, x: 420 + Math.random() * 360, y: 640 + Math.random() * 90, color: G.data.decorColors[v.id], s: 1 });
            sel = room.decor.length - 1;
            G.audio.play('sfx.drop');
            draw(); panel(); G.state.save();
            var g = svg.querySelector('[data-decor="' + sel + '"]');
            if (g) { G.fx.on(g, { n: 8, spread: 70 }); if (g.scrollIntoView) g.scrollIntoView({ block: 'nearest', inline: 'center' }); }
          }
        }));
        var d = room.decor[sel];
        if (!d) return;
        b.appendChild(U.label(G.t('dragHint'), 'resize'));
        if (A.recolorable(d.id)) b.appendChild(U.swatches(G.data.palette, d.color, function (c) { d.color = c; draw(); G.state.save(); }));
        var row = U.el('div', 'row');
        var sl = U.el('input', 'slider');
        sl.type = 'range'; sl.min = 0.6; sl.max = 1.8; sl.step = 0.05; sl.value = d.s || 1; sl.setAttribute('aria-label', G.t('size'));
        sl.style.flex = '1';
        sl.addEventListener('input', function () { d.s = +sl.value; draw(); G.state.save(); });
        row.appendChild(sl);
        row.appendChild(U.btn({ icon: 'trash', cls: 'round small ghost', title: G.t('remove'), sound: 'sfx.trash', onClick: function () { room.decor.splice(sel, 1); sel = -1; draw(); panel(); G.state.save(); } }));
        b.appendChild(row);
      }

      function panel() {
        var b = ui.body;
        b.innerHTML = '';
        ui.title(slot.icon, G.tn(slot.name));
        if (slot.free) { decorPanel(b); return; }

        var cur = room[slot.id];
        if (slot.variants.length > 1 || slot.none) {
          var grid = U.grid(slot.variants.map(function (id) { return { id: id }; }), {
            tileCls: 'wide', cls: 'big',
            render: function (v) { return U.thumb(v.id, { color: (cur && cur.color) || '#ff8cc6' }, (slot.views && slot.views[v.id]) || slot.view || '0 0 1200 800'); },
            isSel: function (v) { return cur && cur.id === v.id; },
            lockOf: function (v) { return need(v.id); },
            label: function () { return G.tn(slot.name); },
            onPick: function (v) {
              room[slot.id] = { id: v.id, color: (cur && cur.color) || G.data.defaultRoom[slot.id].color, pattern: cur && cur.pattern };
              draw(); panel(); sparkleSlot(slot.id); G.state.save();
            }
          });
          if (slot.none) U.noneTile(grid, !cur || !cur.id, function () { room[slot.id] = null; draw(); panel(); G.state.save(); });
          b.appendChild(grid);
        }
        if (cur && cur.id) {
          b.appendChild(U.label(G.t('color')));
          b.appendChild(U.swatches(G.data.roomPalette, cur.color, function (c) { cur.color = c; draw(); panel(); G.state.save(); }));
          if (slot.patterns) {
            b.appendChild(U.label(G.t('pattern')));
            b.appendChild(U.patterns(cur.pattern, cur.color, function (p) { cur.pattern = p; draw(); G.state.save(); }));
          }
        }
      }
      function tabs() { U.tabs(ui.tabs, G.data.roomSlots, slot.id, function (s) { slot = s; box(); panel(); }); }

      ui.foot.appendChild(U.btn({ icon: 'check', label: G.t('done'), onClick: function () { G.scenes.go('hub'); } }));
      G.challenges.attach(ui, 'room');
      tabs(); draw(); panel();
      setTimeout(function () { scroll.scrollLeft = (scroll.scrollWidth - scroll.clientWidth) / 2; }, 0);
      return function () { offs.forEach(function (o) { o(); }); };
    }
  });
})(window.Game);
