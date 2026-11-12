/* Title screen. */
(function (G) {
  'use strict';
  var U = G.ui;

  /* A ready-made girl shown before the player has created her own. */
  var SHOWCASE = {
    girl: { skin: '#fcd3b6', eyes: '#5aa9f0', hair: 'wavy', hairColor: '#ff7fc4' },
    makeup: { blush: { c: '#ff5fa0', a: 0.8 }, shadow: { c: '#b06cff', a: 0.9 }, liner: { s: 'wing', c: '#2a1420', a: 1 }, lashes: { a: 1 }, lips: { c: '#e0245e', a: 1 }, gems: { s: 'stars', c: '#ffd84a', a: 1 } },
    outfit: {
      top: { id: 'clothes.top.butterfly', color: '#c58bff', pattern: 'glitter' }, bottom: { id: 'clothes.bottom.flarejeans', color: '#6fa8ff' },
      shoes: { id: 'clothes.shoes.platform', color: '#ff4fa0' }, bag: { id: 'acc.bag.shoulder', color: '#ff4fa0' },
      necklace: { id: 'acc.necklace.choker', color: '#2b2330' }, earrings: { id: 'acc.earrings.hoops', color: '#ffd84a' }, hairacc: { id: 'acc.hairacc.clips', color: '#7fd4ff' }
    }
  };

  G.scenes.add('title', {
    hud: false,
    enter: function (root) {
      var st = G.state.data, wrap = U.el('div', 'title-scene');
      root.appendChild(wrap);

      var dollBox = U.el('div', 'title-doll');
      dollBox.appendChild(G.doll.svg(st.created ? { expr: 'smile' } : { girl: SHOWCASE.girl, makeup: SHOWCASE.makeup, outfit: SHOWCASE.outfit, expr: 'wink' }, 'full'));
      [[12, 14, 0], [78, 8, 0.5], [86, 46, 1], [6, 60, 1.4], [70, 78, 0.8]].forEach(function (t) {
        var s = G.svg.make('0 0 24 24', '<path d="' + G.svg.spark(12, 12, 11) + '" fill="#fff"/>', 'twinkle');
        s.style.left = t[0] + '%'; s.style.top = t[1] + '%'; s.style.animationDelay = t[2] + 's';
        dollBox.appendChild(s);
      });
      wrap.appendChild(dollBox);

      var side = U.el('div', 'title-side');
      var logo = U.el('h1', 'logo'); logo.textContent = G.t('title'); logo.style.margin = '0';
      side.appendChild(logo);
      var tag = U.el('div', 'tagline'); tag.textContent = G.t('tagline'); side.appendChild(tag);

      side.appendChild(U.btn({
        label: st.created ? G.t('continue') : G.t('play'), icon: 'heart', cls: 'big', sound: 'sfx.sparkle',
        onClick: function (ev, b) {
          G.audio.unlock(); G.audio.music(true);
          G.fx.on(b, { kind: 'heart', n: 14, spread: 120 });
          G.scenes.go(st.created ? 'hub' : 'create');
        }
      }));

      var row = U.el('div', 'row center');
      if (st.created) {
        row.appendChild(U.btn({ label: G.t('newGame'), cls: 'ghost small', onClick: function () {
          U.confirm(G.t('newGameAsk'), function () { G.state.reset(); G.audio.music(true); G.scenes.go('create'); });
        } }));
      }
      row.appendChild(U.btn({ label: G.t('language'), cls: 'ghost small', onClick: function () { G.i18n.toggle(); G.scenes.refresh(); } }));
      row.appendChild(U.btn({ icon: st.muted ? 'mute' : 'music', cls: 'round purple small', title: G.t('sound'), onClick: function () {
        st.muted = !st.muted; G.state.save(); G.audio.setMuted(st.muted); G.scenes.refresh();
      } }));
      side.appendChild(row);
      wrap.appendChild(side);
    }
  });
})(window.Game);
