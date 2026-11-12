/* The bedroom: the main page. Objects in the room open the five features. */
(function (G) {
  'use strict';
  var U = G.ui, A = G.assets;

  /* Where the girl and the pet stand in the room (room space). */
  var GIRL = 'translate(468 214) scale(0.44)';
  var PET = 'translate(930 566) scale(0.4)';

  /* Hotspots: badge position, clickable area [x, y, w, h], destination. */
  var SPOTS = [
    { go: 'dressup', icon: 'dressup', at: [155, 300], area: [30, 110, 250, 500] },
    { go: 'makeover', icon: 'makeover', at: [375, 250], area: [286, 240, 180, 430] },
    { go: 'room', icon: 'room', at: [975, 180], area: [850, 110, 250, 200] },
    { go: 'pet', icon: 'pet', at: [1120, 620], area: [900, 560, 280, 220] },
    { go: 'photo', icon: 'photo', at: [200, 520], area: [40, 540, 190, 250] }
  ];

  function badge(s) {
    var label = G.t(s.go), w = Math.max(120, label.length * 15 + 36), x = s.at[0], y = s.at[1];
    return '<g class="hot" data-go="' + s.go + '" role="button" tabindex="0" aria-label="' + label + '">' +
      '<rect x="' + s.area[0] + '" y="' + s.area[1] + '" width="' + s.area[2] + '" height="' + s.area[3] + '" rx="20" fill="#fff" opacity="0"/>' +
      '<rect class="glow" x="' + s.area[0] + '" y="' + s.area[1] + '" width="' + s.area[2] + '" height="' + s.area[3] + '" rx="24" fill="#fff" fill-opacity=".22" stroke="#fff" stroke-width="5" stroke-dasharray="14 10"/>' +
      '<g class="badge">' +
      '<circle cx="' + x + '" cy="' + y + '" r="44" fill="' + G.defs.linear('#ff9ad6', '#ff3d9c') + '" stroke="#fff" stroke-width="5"/>' +
      '<ellipse cx="' + x + '" cy="' + (y - 20) + '" rx="28" ry="13" fill="#fff" opacity=".4"/>' +
      '<g transform="translate(' + (x - 29) + ' ' + (y - 29) + ') scale(0.58)">' + A.markup('icon.' + s.icon) + '</g>' +
      '</g>' +
      '<g transform="translate(' + x + ' ' + (y + 62) + ')"><rect x="' + (-w / 2) + '" y="-17" width="' + w + '" height="34" rx="17" fill="#fff" stroke="#ff4fa8" stroke-width="3"/>' +
      '<text x="0" y="7" text-anchor="middle" font-family="Fredoka, Arial Rounded MT Bold, sans-serif" font-weight="600" font-size="21" fill="#c2187a">' + label + '</text></g>' +
      '</g>';
  }

  G.scenes.add('hub', {
    title: 'title',
    home: false,
    enter: function (root) {
      var st = G.state.data, wrap = U.el('div', 'hub');
      root.appendChild(wrap);

      var stage = U.el('div', 'stage'), scroll = U.el('div', 'stage-scroll');
      var svg = G.svg.make(G.room.VIEW,
        G.room.markup(st.room, { hubObjects: true }) +
        '<g class="hot" data-go="create" role="button" tabindex="0" aria-label="' + G.t('editGirl') + '"><g transform="' + GIRL + '">' + G.doll.markup({ expr: 'smile' }) + '</g></g>' +
        '<g class="hot" data-go="pet"><g transform="' + PET + '">' + G.pet.markup({ mood: st.pet.mud > 0.3 ? 'calm' : 'happy' }) + '</g></g>' +
        SPOTS.map(badge).join(''));
      svg.setAttribute('preserveAspectRatio', 'xMidYMid meet');
      scroll.appendChild(svg);
      stage.appendChild(scroll);

      var top = U.el('div', 'stage-top');
      var tag = U.el('div', 'name-tag'); tag.textContent = st.girl.name + ' & ' + st.pet.name;
      top.appendChild(tag);
      top.appendChild(U.btn({ icon: 'mirror', label: G.t('editGirl'), cls: 'small purple', onClick: function () { G.scenes.go('create', { edit: true }); } }));
      stage.appendChild(top);
      wrap.appendChild(stage);

      function go(name) {
        G.audio.play('sfx.whoosh');
        G.scenes.go(name, name === 'create' ? { edit: true } : {});
      }
      svg.addEventListener('click', function (ev) {
        var h = ev.target.closest ? ev.target.closest('.hot') : null;
        if (h) go(h.getAttribute('data-go'));
      });
      svg.addEventListener('keydown', function (ev) {
        if (ev.key !== 'Enter' && ev.key !== ' ') return;
        var h = ev.target.closest ? ev.target.closest('.hot') : null;
        if (h) { ev.preventDefault(); go(h.getAttribute('data-go')); }
      });

      // glossy shortcut buttons under the room (handy on small screens)
      var dock = U.el('div', 'dock');
      ['makeover', 'dressup', 'room', 'pet', 'photo'].forEach(function (f, i) {
        dock.appendChild(U.btn({ icon: f, label: G.t(f), cls: i % 2 ? 'purple' : '', sound: 'sfx.whoosh', onClick: function () { G.scenes.go(f); } }));
      });
      wrap.appendChild(dock);

      // on narrow screens the room scrolls sideways: start centred on the girl
      setTimeout(function () { scroll.scrollLeft = (scroll.scrollWidth - scroll.clientWidth) / 2; }, 0);

      G.audio.music(true);
      // rewards earned earlier but never announced (for example after an update)
      setTimeout(function () { if (G.scenes.current === 'hub') G.unlocks.announce(); }, 400);
    }
  });
})(window.Game);
