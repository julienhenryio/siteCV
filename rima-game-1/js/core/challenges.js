/* Optional challenges. Each feature screen calls G.challenges.attach(ui, feature, getContext)
   to get a Challenge button; scoring rules below turn what the player made into 1..3 stars.
   Nothing here can fail: the lowest result is one star and a kind message. */
(function (G) {
  'use strict';
  var C = G.color;

  function fam(c, list) { return !!c && list.indexOf(C.family(c)) >= 0; }
  function worn() {
    var of = G.state.data.outfit, out = [];
    for (var k in of) if (of[k] && of[k].id && G.data.clothesById[of[k].id]) out.push({ slot: k, it: of[k], def: G.data.clothesById[of[k].id] });
    return out;
  }
  function on(layer) { var m = G.state.data.makeup[layer]; return !!(m && m.a >= 0.5); }

  var Ch = G.challenges = {
    active: null,

    /* Each rule returns a score from 0 to 1. ctx = extra facts from the current screen. */
    rules: {
      style: function (d) {
        var n = worn().filter(function (w) { return w.def.style === d.style; }).length;
        return Math.min(1, n / 4);
      },
      outfitColor: function (d) {
        var n = worn().filter(function (w) { return fam(w.it.color, d.families); }).length;
        return Math.min(1, n / 4);
      },
      makeup: function (d) {
        var got = d.want.filter(on).length, bad = (d.avoid || []).filter(on).length;
        return Math.max(0, got / d.want.length - bad * 0.25);
      },
      makeupColor: function (d) {
        var mk = G.state.data.makeup;
        var n = d.layers.filter(function (l) { return on(l) && fam(mk[l].c, d.families); }).length;
        return n / d.layers.length;
      },
      roomColor: function (d) {
        var r = G.state.data.room, n = 0;
        ['wall', 'bed', 'rug', 'curtains', 'lamp', 'art', 'lights', 'furniture'].forEach(function (s) { if (r[s] && r[s].id !== null && fam(r[s].color, d.families)) n++; });
        return Math.min(1, n / 5);
      },
      roomCozy: function () {
        var r = G.state.data.room, s = 0;
        if (r.rug && r.rug.id) s += 0.25;
        if (r.lights && r.lights.id) s += 0.25;
        if (r.art && r.art.id) s += 0.2;
        s += Math.min(0.3, (r.decor || []).length * 0.1);
        return s;
      },
      petClean: function (d, ctx) {
        return (G.state.data.pet.mud < 0.05 ? 0.4 : 0) + (ctx.dried ? 0.2 : 0) + (ctx.brushed ? 0.4 : 0);
      },
      petFancy: function () {
        var a = G.state.data.pet.acc || {}, n = 0;
        for (var k in a) if (a[k] && a[k].id) n++;
        return Math.min(1, n / 3);
      },
      petLove: function (d, ctx) {
        var a = G.state.data.pet.acc || {};
        return (ctx.treats ? 0.4 : 0) + (ctx.brushed ? 0.3 : 0) + ((a.collar && a.collar.id) || (a.bow && a.bow.id) ? 0.3 : 0);
      },
      photo: function (d, ctx) {
        var parts = 0, ok = 0, ph = ctx.photo || {};
        var place = (G.data.backdrops.filter(function (b) { return b.id === ph.backdrop; })[0] || {}).place;
        if (d.place) { parts++; if (place === d.place || (d.place === 'party' && place === 'stage')) ok++; }
        if (d.frame) { parts++; if (ph.frame) ok++; }
        if (d.pet) { parts++; if (ph.showPet) ok++; }
        if (d.stickers) { parts++; ok += Math.min(1, (ph.stickers || []).length / d.stickers); }
        if (d.caption) { parts++; if ((ph.caption || '').trim()) ok++; }
        return parts ? ok / parts : 1;
      }
    },

    forFeature: function (feature) { return G.data.challenges.filter(function (c) { return c.feature === feature; }); },
    best: function (id) { return G.state.data.stars[id] || 0; },

    score: function (def, ctx) {
      var rule = Ch.rules[def.rule];
      var v = rule ? rule(def, ctx || {}) : 1;
      return v >= 0.75 ? 3 : v >= 0.4 ? 2 : 1;
    },

    icon: function (def) { return G.assets.thumb(def.icon, null, '0 0 100 100', 'cico'); },

    /* Adds the challenge controls to a screen. ui = result of G.ui.layout().
       getContext() returns extra facts for scoring (optional). */
    attach: function (ui, feature, getContext) {
      var slot = G.ui.el('div');
      ui.top.appendChild(slot);

      function idle() {
        slot.innerHTML = '';
        slot.appendChild(G.ui.btn({ icon: 'star', label: G.t('challenge'), cls: 'gold small', onClick: choose }));
      }
      function choose() {
        var list = G.ui.el('div', 'challenge-list'), pop;
        Ch.forFeature(feature).forEach(function (def) {
          var b = G.ui.el('button', 'challenge-item');
          b.type = 'button';
          b.appendChild(Ch.icon(def));
          var n = G.ui.el('span', 'name'); n.textContent = G.tn(def.name); b.appendChild(n);
          b.appendChild(G.ui.starsRow(Ch.best(def.id)));
          b.addEventListener('click', function () { G.audio.play('sfx.pick'); pop.close(); start(def); });
          list.appendChild(b);
        });
        pop = G.ui.popup({ title: G.t('challenges'), body: list, buttons: [{ label: G.t('free'), icon: 'close', cls: 'ghost' }] });
      }
      function start(def) {
        Ch.active = def;
        slot.innerHTML = '';
        var banner = G.ui.el('div', 'challenge-banner');
        banner.appendChild(Ch.icon(def));
        var s = G.ui.el('span'); s.textContent = G.tn(def.name); banner.appendChild(s);
        banner.appendChild(G.ui.btn({ icon: 'check', label: G.t('finish'), cls: 'small', onClick: function () { finish(def); } }));
        slot.appendChild(banner);
        G.fx.on(banner, { kind: 'star', n: 8 });
      }
      function finish(def) {
        var stars = Ch.score(def, getContext ? getContext() : {});
        var best = Ch.best(def.id), isBest = stars > best;
        if (isBest) { G.state.data.stars[def.id] = stars; G.state.save(); G.hud.stars(); }
        Ch.active = null;
        idle();
        G.audio.play('sfx.win');
        if (stars === 3) G.fx.confetti();
        var msg = G.ui.el('div'); msg.textContent = G.data.starMessages[G.i18n.lang()][stars];
        var body = [Ch.icon(def), G.ui.starsRow(stars, true), msg];
        body[0].style.width = '70px'; body[0].style.height = '70px';
        if (isBest && best > 0) { var nb = G.ui.el('div', 'label'); nb.textContent = G.t('newBest'); body.push(nb); }
        for (var i = 1; i <= stars; i++) setTimeout(function () { G.audio.play('sfx.star'); }, 300 + i * 250);
        G.ui.popup({ title: G.tn(def.name), body: body, buttons: [{ label: G.t('ok'), icon: 'check' }], onClose: function () { G.unlocks.announce(); } });
      }
      idle();
      return { stop: function () { Ch.active = null; } };
    }
  };
})(window.Game);
