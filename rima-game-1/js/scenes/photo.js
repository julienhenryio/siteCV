/* Photo Shoot: backdrop, expression, stickers, frame and caption; saves a PNG and keeps an album. */
(function (G) {
  'use strict';
  var U = G.ui, A = G.assets;
  var W = 1200, H = 800;
  var FONT = "600 54px Fredoka, 'Arial Rounded MT Bold', sans-serif";

  function defaults() {
    return { backdrop: 'backdrop.studio', expr: 'smile', girl: { x: 520, y: 400, s: 0.95 }, pet: { x: 800, y: 600, s: 1 }, showPet: true, stickers: [], frame: null, caption: '', captionColor: '#ffffff' };
  }
  function girlTf(o) { return 'translate(' + o.x + ' ' + o.y + ') scale(' + (0.5 * o.s) + ') translate(-300 -640)'; }
  function petTf(o) { return 'translate(' + o.x + ' ' + o.y + ') scale(' + (0.46 * o.s) + ') translate(-200 -190)'; }
  function stickerTf(o) { return 'translate(' + o.x + ' ' + o.y + ') scale(' + (1.3 * o.s) + ') translate(-50 -50)'; }
  function captionY(ph) { return ph.frame === 'frame.polaroid' ? 742 : (ph.frame ? 706 : 752); }

  /* The picture itself (without selection marks). Also used for the export. */
  function sceneMarkup(ph, forExport) {
    var m = '<g data-part="backdrop">' + A.markup(ph.backdrop) + '</g>';
    m += '<g data-obj="girl" transform="' + girlTf(ph.girl) + '">' + G.doll.markup({ expr: ph.expr }) + '</g>';
    if (ph.showPet) m += '<g data-obj="pet" transform="' + petTf(ph.pet) + '">' + G.pet.markup({ mood: 'happy', mud: 0 }) + '</g>';
    ph.stickers.forEach(function (s, i) { m += '<g data-obj="s' + i + '" transform="' + stickerTf(s) + '">' + A.markup(s.id) + '</g>'; });
    if (ph.frame) m += '<g data-part="frame" style="pointer-events:none">' + A.markup(ph.frame) + '</g>';
    if (!forExport && ph.caption) {
      m += '<text data-part="caption" x="600" y="' + captionY(ph) + '" text-anchor="middle" style="font:' + FONT + ';pointer-events:none" fill="' + ph.captionColor +
        '" stroke="' + (ph.captionColor === '#ffffff' ? '#c2187a' : '#ffffff') + '" stroke-width="10" stroke-linejoin="round" paint-order="stroke">' +
        ph.caption.replace(/&/g, '&amp;').replace(/</g, '&lt;') + '</text>';
    }
    return m;
  }

  /* Turn file overrides into embedded data so the exported image can contain them. */
  function inlineImages(xml) {
    var urls = {}, re = /href="([^"]+)"/g, m;
    while ((m = re.exec(xml))) if (m[1].indexOf('data:') !== 0 && m[1][0] !== '#') urls[m[1]] = null;
    var list = Object.keys(urls);
    if (!list.length) return Promise.resolve(xml);
    return Promise.all(list.map(function (u) {
      return fetch(u).then(function (r) { if (!r.ok) throw new Error(u); return r.blob(); }).then(function (b) {
        return new Promise(function (res, rej) { var fr = new FileReader(); fr.onload = function () { urls[u] = fr.result; res(); }; fr.onerror = rej; fr.readAsDataURL(b); });
      });
    })).then(function () {
      list.forEach(function (u) { xml = xml.split('href="' + u + '"').join('href="' + urls[u] + '"'); });
      return xml;
    });
  }

  /* Render the photo to a canvas. Resolves with the canvas. */
  function render(ph) {
    var xml = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ' + W + ' ' + H + '" width="' + W + '" height="' + H + '">';
    var body = sceneMarkup(ph, true);            // generating the markup also registers the defs it needs
    xml += '<defs>' + G.defs.all() + '</defs>' + body + '</svg>';
    return inlineImages(xml).then(function (full) {
      return new Promise(function (res, rej) {
        var img = new Image();
        img.onload = function () {
          try {
            var c = document.createElement('canvas'); c.width = W; c.height = H;
            var x = c.getContext('2d');
            x.drawImage(img, 0, 0, W, H);
            if (ph.caption) {
              x.font = FONT; x.textAlign = 'center'; x.lineJoin = 'round'; x.lineWidth = 10;
              x.strokeStyle = ph.captionColor === '#ffffff' ? '#c2187a' : '#ffffff';
              x.strokeText(ph.caption, 600, captionY(ph));
              x.fillStyle = ph.captionColor; x.fillText(ph.caption, 600, captionY(ph));
            }
            c.toDataURL('image/png', 0.5).length;   // throws here if the canvas cannot be read back
            res(c);
          } catch (e) { rej(e); }
        };
        img.onerror = function () { rej(new Error('image')); };
        img.src = 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(full);
      });
    });
  }
  function download(href, name) {
    var a = document.createElement('a');
    a.href = href; a.download = name;
    document.body.appendChild(a); a.click(); a.remove();
  }

  G.scenes.add('photo', {
    title: 'photo',
    enter: function (root) {
      var st = G.state.data;
      if (!st.photo) st.photo = defaults();
      var ph = st.photo, d0 = defaults();
      for (var k in d0) if (ph[k] === undefined) ph[k] = d0[k];
      if (G.unlocks.locked(ph.backdrop) || !A.has(ph.backdrop)) ph.backdrop = d0.backdrop;

      var ui = U.layout(root, { cls: 'wide' });
      var svg = G.svg.make('0 0 ' + W + ' ' + H, '', 'main');
      ui.stage.appendChild(svg);

      var tabsDef = [
        { id: 'backdrop', icon: 'backdrop', name: G.t('backdrop') },
        { id: 'face', icon: 'face', name: G.t('expression') },
        { id: 'stickers', icon: 'sticker', name: G.t('stickers') },
        { id: 'frame', icon: 'frame', name: G.t('frame') },
        { id: 'caption', icon: 'text', name: G.t('caption') }
      ];
      var tab = 'backdrop', sel = null, offs = [], busy = false;

      function obj(key) { return key === 'girl' ? ph.girl : key === 'pet' ? ph.pet : ph.stickers[+key.slice(1)]; }
      function tfOf(key) { var o = obj(key); return key === 'girl' ? girlTf(o) : key === 'pet' ? petTf(o) : stickerTf(o); }

      function draw() {
        offs.forEach(function (f) { f(); }); offs = [];
        svg.innerHTML = sceneMarkup(ph, false) + '<rect class="sel-box" id="ph-sel" width="0" height="0" rx="14"/>';
        Array.prototype.forEach.call(svg.querySelectorAll('[data-obj]'), function (g) {
          var key = g.getAttribute('data-obj');
          offs.push(G.drag.move(g, {
            svg: svg,
            get: function () { var o = obj(key); return { x: o.x, y: o.y }; },
            set: function (x, y) {
              var o = obj(key);
              o.x = Math.max(20, Math.min(W - 20, x)); o.y = Math.max(20, Math.min(H - 20, y));
              g.setAttribute('transform', tfOf(key));
              box();
            },
            onStart: function () { if (sel !== key) { sel = key; box(); } },
            onEnd: function (moved) { if (moved) G.audio.play('sfx.drop'); G.state.save(); panel(); }
          }));
        });
        box();
      }
      function box() {
        var b = svg.querySelector('#ph-sel'), g = sel && svg.querySelector('[data-obj="' + sel + '"]');
        if (!b) return;
        if (!g) { b.setAttribute('width', 0); b.setAttribute('height', 0); return; }
        var r = g.getBoundingClientRect(), p1 = G.svg.pt(svg, r.left, r.top), p2 = G.svg.pt(svg, r.right, r.bottom);
        b.setAttribute('x', p1.x - 6); b.setAttribute('y', p1.y - 6); b.setAttribute('width', p2.x - p1.x + 12); b.setAttribute('height', p2.y - p1.y + 12);
      }

      function selectedControls(b) {
        var o = sel && obj(sel);
        if (!o) return;
        b.appendChild(U.label(G.t('size'), 'resize'));
        var row = U.el('div', 'row');
        var sl = U.el('input', 'slider');
        sl.type = 'range'; sl.min = 0.5; sl.max = sel === 'girl' ? 1.6 : 2.4; sl.step = 0.05; sl.value = o.s; sl.style.flex = '1'; sl.setAttribute('aria-label', G.t('size'));
        sl.addEventListener('input', function () { o.s = +sl.value; var g = svg.querySelector('[data-obj="' + sel + '"]'); if (g) g.setAttribute('transform', tfOf(sel)); box(); G.state.save(); });
        row.appendChild(sl);
        if (sel[0] === 's') {
          row.appendChild(U.btn({ icon: 'trash', cls: 'round small ghost', title: G.t('remove'), sound: 'sfx.trash', onClick: function () { ph.stickers.splice(+sel.slice(1), 1); sel = null; draw(); panel(); G.state.save(); } }));
        }
        b.appendChild(row);
      }

      function panel() {
        var b = ui.body, t = tabsDef.filter(function (x) { return x.id === tab; })[0];
        b.innerHTML = '';
        ui.title(t.icon, G.tn(t.name));
        if (tab === 'backdrop') {
          b.appendChild(U.grid(G.data.backdrops, {
            cls: 'big', tileCls: 'wide',
            render: function (d) { return U.thumb(d.id, null, '0 0 1200 800'); },
            isSel: function (d) { return d.id === ph.backdrop; },
            lockOf: function (d) { return G.unlocks.need(d.id); },
            onPick: function (d) { ph.backdrop = d.id; draw(); panel(); G.state.save(); }
          }));
          var petBtn = U.btn({ icon: st.pet.type, label: G.t('showPet'), cls: 'small ' + (ph.showPet ? 'on' : 'ghost'), onClick: function () { ph.showPet = !ph.showPet; if (sel === 'pet') sel = null; draw(); panel(); G.state.save(); } });
          var row = U.el('div', 'row center'); row.appendChild(petBtn); b.appendChild(row);
        } else if (tab === 'face') {
          b.appendChild(U.grid(G.data.expressions.filter(function (e) { return !e.hidden; }), {
            cls: 'big',
            render: function (e) { return G.doll.svg({ expr: e.id, bare: true }, '90 -60 420 420', 'thumb'); },
            isSel: function (e) { return e.id === ph.expr; },
            onPick: function (e) { ph.expr = e.id; if (e.id === 'kiss') G.audio.play('sfx.kiss'); draw(); panel(); G.state.save(); }
          }));
        } else if (tab === 'stickers') {
          b.appendChild(U.grid(G.data.stickers, {
            render: function (s) { return U.thumb(s.id, null, '-8 -8 116 116'); },
            lockOf: function (s) { return G.unlocks.need(s.id); },
            label: function () { return G.t('stickers'); },
            onPick: function (s) {
              if (ph.stickers.length >= 30) ph.stickers.shift();
              ph.stickers.push({ id: s.id, x: 200 + Math.random() * 800, y: 130 + Math.random() * 380, s: 1 });
              sel = 's' + (ph.stickers.length - 1);
              G.audio.play('sfx.drop'); draw(); panel(); G.state.save();
              var g = svg.querySelector('[data-obj="' + sel + '"]'); if (g) G.fx.on(g, { n: 6, spread: 60 });
            }
          }));
        } else if (tab === 'frame') {
          var grid = U.grid(G.data.frames, {
            cls: 'big', tileCls: 'wide',
            render: function (f) { return G.svg.make('0 0 1200 800', A.markup(ph.backdrop) + A.markup(f.id), 'thumb'); },
            isSel: function (f) { return f.id === ph.frame; },
            lockOf: function (f) { return G.unlocks.need(f.id); },
            onPick: function (f) { ph.frame = f.id; draw(); panel(); G.state.save(); }
          });
          U.noneTile(grid, !ph.frame, function () { ph.frame = null; draw(); panel(); G.state.save(); });
          b.appendChild(grid);
        } else {
          var inp = U.el('input', 'text-input');
          inp.type = 'text'; inp.maxLength = 26; inp.value = ph.caption; inp.placeholder = G.t('captionPlaceholder'); inp.setAttribute('aria-label', G.t('caption'));
          inp.addEventListener('input', function () { ph.caption = inp.value; draw(); G.state.save(); });
          b.appendChild(inp);
          b.appendChild(U.label(G.t('color')));
          b.appendChild(U.swatches(G.data.captionColors, ph.captionColor, function (c) { ph.captionColor = c; draw(); G.state.save(); }));
        }
        selectedControls(b);
        ui.hint(sel ? '' : G.t('photoHint'));
      }

      function snap() {
        if (busy) return;
        busy = true; sel = null; box();
        G.audio.play('sfx.shutter'); G.fx.flash();
        render(ph).then(function (canvas) {
          var small = document.createElement('canvas'); small.width = 480; small.height = 320;
          small.getContext('2d').drawImage(canvas, 0, 0, 480, 320);
          st.album.push(small.toDataURL('image/jpeg', 0.82));
          while (st.album.length > G.data.albumMax) st.album.shift();
          G.state.saveNow();
          canvas.toBlob(function (blob) {
            var url = URL.createObjectURL(blob);
            download(url, 'glossy-days-' + Date.now() + '.png');
            setTimeout(function () { URL.revokeObjectURL(url); }, 4000);
          }, 'image/png');
          G.fx.confetti(); G.audio.play('sfx.sparkle');
          U.toast(G.t('saved'), 'photo');
          busy = false;
        }).catch(function (e) {
          console.warn('photo export failed', e);
          busy = false;
          U.popup({ body: G.t('exportFail') });
        });
      }

      function album() {
        var body;
        if (!st.album.length) body = U.note(G.t('albumEmpty'));
        else {
          body = U.el('div', 'album-grid');
          st.album.slice().reverse().forEach(function (src, ri) {
            var i = st.album.length - 1 - ri, it = U.el('div', 'album-item');
            var img = U.el('img'); img.src = src; img.alt = G.t('album') + ' ' + (i + 1); it.appendChild(img);
            var acts = U.el('div', 'acts');
            acts.appendChild(U.btn({ icon: 'photo', cls: 'round small', title: G.t('download'), onClick: function () { download(src, 'glossy-days-album-' + (i + 1) + '.jpg'); } }));
            acts.appendChild(U.btn({ icon: 'trash', cls: 'round small ghost', title: G.t('del'), sound: 'sfx.trash', onClick: function () { st.album.splice(i, 1); G.state.saveNow(); pop.close(); album(); } }));
            it.appendChild(acts);
            body.appendChild(it);
          });
        }
        var pop = U.popup({ title: G.t('album'), cls: 'wide', body: body, buttons: [{ label: G.t('close'), icon: 'check' }] });
      }

      U.tabs(ui.tabs, tabsDef, tab, function (t) { tab = t.id; panel(); });
      ui.foot.appendChild(U.btn({ icon: 'album', label: G.t('album'), cls: 'purple small', onClick: album }));
      ui.foot.appendChild(U.btn({ icon: 'photo', label: G.t('snap'), cls: 'gold', sound: 'sfx.click', onClick: snap }));
      ui.foot.appendChild(U.btn({ icon: 'check', label: G.t('done'), cls: 'small', onClick: function () { G.scenes.go('hub'); } }));
      G.challenges.attach(ui, 'photo', function () { return { photo: ph }; });

      // tapping the empty backdrop clears the selection
      var bgTap = function (ev) { if (!(ev.target.closest && ev.target.closest('[data-obj]')) && sel) { sel = null; box(); panel(); } };
      svg.addEventListener('pointerdown', bgTap);

      draw(); panel();
      var onResize = function () { box(); };
      window.addEventListener('resize', onResize);
      return function () { offs.forEach(function (f) { f(); }); window.removeEventListener('resize', onResize); };
    }
  });

  G.photo = { render: render, sceneMarkup: sceneMarkup };
})(window.Game);
