/* Rewards: some items need a number of stars. The table is built from the catalogs
   (any entry with `unlock: N`) plus G.data.roomUnlocks and G.data.extraUnlocks. */
(function (G) {
  'use strict';

  var U = G.unlocks = {
    table: {},   // id -> stars needed
    info: {},    // id -> { name, thumb() }

    build: function () {
      var D = G.data, T = U.table = {}, I = U.info = {};
      var add = function (id, n, name, thumb) { T[id] = n; I[id] = { name: name, thumb: thumb }; };
      D.clothes.forEach(function (c) {
        if (!c.unlock) return;
        var view = (D.slotViews[c.slot]) || (D.wardrobeTabs.filter(function (t) { return t.slots.indexOf(c.slot) >= 0; })[0] || {}).view;
        add(c.id, c.unlock, c.name, function () { return U.dollThumb(c, view); });
      });
      D.petAcc.forEach(function (a) {
        if (a.unlock) add(a.id, a.unlock, a.name, function () { return G.svg.make('0 -40 400 450', G.pet.markup({ pet: { type: G.state.data.pet.type, color: G.state.data.pet.color, acc: (function () { var o = {}; o[a.slot] = { id: a.id, color: a.color }; return o; })(), mud: 0 } })); });
      });
      Object.keys(D.roomUnlocks || {}).forEach(function (id) {
        var slot = D.roomSlots.filter(function (s) { return s.variants.indexOf(id) >= 0; })[0] || {};
        add(id, D.roomUnlocks[id], D.rewardNames[id], function () { return G.assets.thumb(id, { color: '#b06cff' }, (slot.views && slot.views[id]) || slot.view); });
      });
      D.backdrops.concat(D.frames).forEach(function (b) {
        if (b.unlock) add(b.id, b.unlock, b.name, function () { return G.assets.thumb(b.id, null, '0 0 1200 800'); });
      });
      D.stickers.forEach(function (s) {
        if (s.unlock) add(s.id, s.unlock, D.rewardNames[s.id], function () { return G.assets.thumb(s.id, null, '0 0 100 100'); });
      });
      Object.keys(D.extraUnlocks || {}).forEach(function (id) {
        add(id, D.extraUnlocks[id], D.rewardNames[id], function () {
          return G.svg.make('0 0 60 60', '<rect width="60" height="60" rx="10" fill="' + G.patterns.fill(id.split('.')[1], '#ff8cc6', 0.5) + '"/>');
        });
      });
    },

    /* Picture of a clothing item alone, cropped to its slot. Head items get the head scaling. */
    dollThumb: function (c, view, o) {
      var m = G.assets.markup(c.id, o || { color: c.color, pattern: c.pattern });
      var head = G.doll.TOP.indexOf(c.slot) >= 0;
      return G.svg.make(view || G.doll.VIEW.full, head ? '<g transform="' + G.doll.HEAD_TF + '">' + m + '</g>' : m, 'thumb');
    },

    /* Stars still needed for this id (0 = available). */
    need: function (id) {
      var n = U.table[id];
      return n && G.state.totalStars() < n ? n : 0;
    },
    locked: function (id) { return U.need(id) > 0; },

    /* Rewards reached but not announced yet -> popup for each, then mark as seen. */
    announce: function (after) {
      var stars = G.state.totalStars(), seen = G.state.data.seenUnlocks, fresh = [];
      Object.keys(U.table).forEach(function (id) { if (U.table[id] <= stars && seen.indexOf(id) < 0) fresh.push(id); });
      fresh.sort(function (a, b) { return U.table[a] - U.table[b]; });
      var next = function () {
        var id = fresh.shift();
        if (!id) { if (after) after(); return; }
        seen.push(id); G.state.save();
        var box = G.ui.el('div', 'reward');
        box.appendChild(U.info[id].thumb());
        var name = G.ui.el('div'); name.textContent = G.tn(U.info[id].name);
        G.audio.play('sfx.unlock'); G.fx.confetti();
        G.ui.popup({ title: G.t('unlocked'), body: [box, name], buttons: [{ label: G.t('ok'), icon: 'check', cls: 'gold' }], onClose: next });
      };
      next();
    },

    /* List for the rewards popup: [{id, need, got}] sorted by stars. */
    list: function () {
      var stars = G.state.totalStars();
      return Object.keys(U.table).map(function (id) { return { id: id, need: U.table[id], got: stars >= U.table[id] }; })
        .sort(function (a, b) { return a.need - b.need; });
    }
  };
})(window.Game);
