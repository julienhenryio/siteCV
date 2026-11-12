/* Puts the girl together from asset IDs, in the right layer order.
   Nothing is drawn here: every layer comes from G.assets.markup(id, options). */
(function (G) {
  'use strict';
  var A = G.assets, C = G.color;

  var D = G.doll = {
    VIEW: { full: '0 -30 600 1330', face: '100 -40 400 400', bust: '40 -40 520 600' },

    /* Outfit slots, in drawing order. */
    BACK: ['wings'],
    BODY: ['shoes', 'bottom', 'top', 'dress', 'belt', 'necklace', 'jacket', 'bag'],
    TOP: ['earrings', 'glasses', 'hairacc', 'hat'],

    /* The head (and everything attached to it) is drawn a little bigger than the art's
       native size, around the chin, for a cuter doll. Art files keep the native coordinates. */
    HEAD_TF: 'translate(300 292) scale(1.16) translate(-300 -292)',

    browColor: function (hair) { return C.dark(hair, 0.42); },
    lipColor: function (skin) { return C.mix(skin, '#e2557c', 0.6); },

    /* cfg: { girl, makeup, outfit, expr, face (extra markup over the face), bare } */
    markup: function (cfg) {
      var st = G.state ? G.state.data : {};
      var g = cfg.girl || st.girl, mk = cfg.makeup || st.makeup || {}, of = cfg.bare ? {} : (cfg.outfit || st.outfit || {});
      var ex = null;
      (G.data.expressions || []).forEach(function (e) { if (e.id === (cfg.expr || 'smile')) ex = e; });
      ex = ex || { eyes: 'open', mouth: 'smile' };

      var slot = function (name) {
        var it = of[name];
        if (!it || !it.id || !A.has(it.id)) return '';
        return '<g data-slot="' + name + '">' + A.markup(it.id, { color: it.color, pattern: it.pattern }) + '</g>';
      };
      var slots = function (list) { return list.map(slot).join(''); };
      // eyeliner and mascara only go on open eyes
      var only = ex.eyes === 'open' ? 'both' : ex.eyes === 'wink' ? 'left' : 'none';
      var layer = function (name, id, eyeOnly) {
        var m = mk[name];
        if (!m || !id || !A.has(id) || eyeOnly === 'none') return '';
        return '<g data-layer="' + name + '" opacity="' + (m.a || 0) + '">' + A.markup(id, { color: m.c, only: eyeOnly }) + '</g>';
      };
      var head = function (inner) { return '<g transform="' + D.HEAD_TF + '">' + inner + '</g>'; };

      var skin = { color: g.skin }, hair = { color: g.hairColor };
      var lip = D.lipColor(g.skin);
      var mouthId = 'doll.mouth.' + ex.mouth;

      return head('<g data-part="hairback">' + A.markup('hair.' + g.hair + '.back', hair) + '</g>') +
        slots(D.BACK) +
        '<g data-part="body">' + A.markup('doll.body', skin) + A.markup('doll.undies') + '</g>' +
        slots(D.BODY) +
        head('<g data-part="head">' + A.markup('doll.head', skin) +
          layer('blush', 'makeup.blush') +
          layer('shadow', 'makeup.shadow') +
          A.markup('doll.eyes.' + ex.eyes, { color: g.eyes }) +
          layer('liner', mk.liner && mk.liner.s ? 'makeup.liner.' + mk.liner.s : null, only) +
          layer('lashes', 'makeup.lashes', only) +
          '<g data-layer="brows">' + A.markup('doll.brows', { color: D.browColor(g.hairColor) }) + '</g>' +
          A.markup(mouthId, { color: lip }) +
          layer('lips', mouthId) +
          layer('gloss', 'makeup.gloss') +
          layer('gems', mk.gems && mk.gems.s ? 'makeup.gems.' + mk.gems.s : null) +
          '<g data-part="face-extra">' + (cfg.face || '') + '</g>' +
        '</g>' +
        '<g data-part="hairfront">' + A.markup('hair.' + g.hair + '.front', hair) + '</g>' +
        slots(D.TOP));
    },

    svg: function (cfg, view, cls) {
      return G.svg.make(D.VIEW[view] || view || D.VIEW.full, D.markup(cfg || {}), cls || 'doll');
    },

    /* Re-draw an existing doll <svg> or <g> in place. */
    update: function (el, cfg) { el.innerHTML = D.markup(cfg || {}); }
  };
})(window.Game);
