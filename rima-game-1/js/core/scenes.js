/* Screen switching and the top bar (home, title, stars, language, sound). */
(function (G) {
  'use strict';

  var Sc = G.scenes = {
    defs: {},
    current: null,
    params: null,
    cleanup: null,

    /* def: { title: i18n key, hud: false to hide the top bar, home: false to hide the home button, enter(root, params) -> optional cleanup() } */
    add: function (name, def) { Sc.defs[name] = def; },

    go: function (name, params) {
      var def = Sc.defs[name];
      if (!def) return;
      if (Sc.cleanup) { try { Sc.cleanup(); } catch (e) { console.error(e); } Sc.cleanup = null; }
      G.challenges.active = null;
      G.ui.closePopups();
      Array.prototype.forEach.call(document.querySelectorAll('.tool-cursor'), function (c) { c.remove(); });
      G.state.saveNow();
      var host = document.getElementById('scene');
      host.innerHTML = '';
      var root = G.ui.el('div', 'scene scene-' + name);
      host.appendChild(root);
      Sc.current = name; Sc.params = params || {};
      G.hud.render(def);
      Sc.cleanup = def.enter(root, Sc.params) || null;
    },

    /* Re-draw the current screen (after a language change). */
    refresh: function () { if (Sc.current) Sc.go(Sc.current, Sc.params); }
  };

  G.hud = {
    render: function (def) {
      var hud = document.getElementById('hud');
      hud.innerHTML = '';
      hud.classList.toggle('hidden', def.hud === false);
      if (def.hud === false) return;
      if (def.home !== false) {
        hud.appendChild(G.ui.btn({ icon: 'home', cls: 'round', title: G.t('home'), sound: 'sfx.whoosh', onClick: function () { Sc.go('hub'); } }));
      }
      var title = G.ui.el('div');
      title.id = 'hud-title';
      title.textContent = def.title ? G.t(def.title) : G.t('title');
      hud.appendChild(title);

      var stars = G.ui.el('button', 'pill');
      stars.type = 'button'; stars.id = 'hud-stars'; stars.title = G.t('rewards'); stars.setAttribute('aria-label', G.t('rewards'));
      stars.appendChild(G.icon('star'));
      stars.appendChild(G.ui.el('span', '', String(G.state.totalStars())));
      stars.addEventListener('click', function () { G.audio.play('sfx.click'); G.hud.rewards(); });
      hud.appendChild(stars);

      hud.appendChild(G.ui.btn({ label: G.i18n.lang() === 'en' ? 'FR' : 'EN', cls: 'round ghost', title: G.t('language'), onClick: function () { G.i18n.toggle(); Sc.refresh(); } }));
      hud.appendChild(G.ui.btn({ icon: G.state.data.muted ? 'mute' : 'music', cls: 'round purple', title: G.t('sound'), onClick: function () {
        G.state.data.muted = !G.state.data.muted; G.state.save();
        G.audio.setMuted(G.state.data.muted);
        G.hud.render(def);
      } }));
    },

    stars: function () {
      var s = document.querySelector('#hud-stars span');
      if (s) { s.textContent = String(G.state.totalStars()); G.fx.on(s.parentNode, { kind: 'star', n: 6, spread: 40 }); }
    },

    /* Popup listing all rewards and how many stars each needs. */
    rewards: function () {
      var grid = G.ui.grid(G.unlocks.list(), {
        cls: 'big',
        render: function (r) { return G.unlocks.info[r.id].thumb(); },
        lockOf: function (r) { return r.got ? 0 : r.need; },
        label: function (r) { return G.tn(G.unlocks.info[r.id].name); },
        onPick: function () {}
      });
      var total = G.ui.el('div', 'pill');
      total.appendChild(G.icon('star'));
      total.appendChild(document.createTextNode(G.state.totalStars() + ' / ' + G.data.challenges.length * 3));
      G.ui.popup({ title: G.t('rewards'), cls: 'wide', body: [total, grid], buttons: [{ label: G.t('ok'), icon: 'check' }] });
    }
  };
})(window.Game);
