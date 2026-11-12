/* Puts the pet together from asset IDs, in layer order. */
(function (G) {
  'use strict';
  var A = G.assets;

  var P = G.pet = {
    VIEW: '0 -40 400 450',

    /* cfg: { pet, mood ('happy'|'calm'|'closed'|'joy'|'love'), mud, foam, wet, shine (0..1 each), bare } */
    markup: function (cfg) {
      cfg = cfg || {};
      var pet = cfg.pet || G.state.data.pet, base = 'pet.' + pet.type, fur = { color: pet.color };
      var acc = cfg.bare ? {} : (pet.acc || {});
      var slot = function (name) {
        var it = acc[name];
        if (!it || !it.id || !A.has(it.id)) return '';
        return '<g data-slot="' + name + '">' + A.markup(it.id, { color: it.color, pattern: it.pattern }) + '</g>';
      };
      var fx = function (name, v) {
        return '<g data-fx="' + name + '" opacity="' + (v || 0) + '" style="pointer-events:none">' + A.markup('pet.fx.' + name) + '</g>';
      };
      var bowAtNeck = acc.bow && acc.bow.id === 'petacc.bow.tie';
      return '<g data-part="petbody">' + A.markup(base + '.body', fur) + '</g>' + slot('outfit') + slot('collar') + (bowAtNeck ? slot('bow') : '') +
        '<g data-part="pethead">' + A.markup(base + '.head', fur) + '<g data-part="petface">' + A.markup(base + '.face.' + (cfg.mood || 'happy')) + '</g></g>' +
        slot('hat') + (bowAtNeck ? '' : slot('bow')) +
        fx('mud', cfg.mud == null ? pet.mud : cfg.mud) + fx('foam', cfg.foam) + fx('wet', cfg.wet) + fx('shine', cfg.shine);
    },

    svg: function (cfg, cls) { return G.svg.make(P.VIEW, P.markup(cfg), cls || 'pet'); }
  };
})(window.Game);
