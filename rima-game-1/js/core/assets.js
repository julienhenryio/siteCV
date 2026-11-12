/* Asset registry: the ONLY place game code gets pictures from.

   Every picture has an ID (for example "clothes.top.babytee"). Each ID has a built-in
   version drawn in code (registered from js/art/*.js) and can be overridden by a file
   dropped in assets/custom/ (see tools/build-assets.mjs, which writes manifest.js).

   Override file naming, for an ID `x.y.z`:
     x.y.z.png                    shown as-is (no recolor)
     x.y.z.mask.png               shape; filled with the chosen color/pattern (recolorable)
     x.y.z.detail.png             optional, drawn on top of the mask (lines, shading, fixed colors)
   (x.y.z.png + x.y.z.detail.png is also read as mask + detail.)

   Every image must be the full canvas of its "space" so it lines up:
     doll 600x1300, pet 400x400, room 1200x800, scene 1200x800, unit 100x100. */
(function (G) {
  'use strict';
  var C = G.color;

  var A = G.assets = {
    spaces: { doll: [600, 1300], pet: [400, 400], room: [1200, 800], scene: [1200, 800], unit: [100, 100] },
    patternScale: { doll: 1, pet: 0.8, room: 1.4, scene: 1.4, unit: 0.35 },
    builtins: {},
    order: [],
    manifest: (typeof window !== 'undefined' && window.GAME_CUSTOM_MANIFEST) || {},
    base: (typeof window !== 'undefined' && window.GAME_ASSET_BASE) || 'assets/custom/',

    /* def: { space, desc, draw(o) -> svg markup, recolor: false to hide color controls } */
    register: function (id, def) {
      if (!this.builtins[id]) this.order.push(id);
      def.id = id;
      this.builtins[id] = def;
    },
    has: function (id) { return !!(this.builtins[id] || this.manifest[id]); },
    custom: function (id) { return this.manifest[id] || null; },
    space: function (id) { var b = this.builtins[id]; return (b && b.space) || 'unit'; },
    size: function (id) { return this.spaces[this.space(id)]; },

    /* Can the player recolor this ID right now? */
    recolorable: function (id) {
      var m = this.manifest[id];
      if (m) return !!m.mask;
      var b = this.builtins[id];
      return !!b && b.recolor !== false;
    },

    /* Fill in derived colors: o.fill (color or pattern), o.line (outline), o.dark, o.light. */
    opts: function (id, o) {
      o = o || {};
      var out = {};
      for (var k in o) out[k] = o[k];
      var c = out.color || '#ff69b4';
      out.color = c;
      out.fill = G.patterns.fill(out.pattern, c, this.patternScale[this.space(id)] || 1);
      out.line = C.dark(c, 0.5);
      out.dark = C.dark(c, 0.22);
      out.light = C.light(c, 0.45);
      return out;
    },

    /* SVG markup for an ID, in the coordinates of its space. */
    markup: function (id, o) {
      var m = this.manifest[id], b = this.builtins[id];
      if (m) return this._custom(id, m, this.opts(id, o));
      if (!b || !b.draw) return '';
      return b.draw(this.opts(id, o));
    },

    _custom: function (id, m, o) {
      var sz = this.size(id), w = sz[0], h = sz[1];
      var img = function (file, extra) {
        return '<image href="' + A.base + file + '" x="0" y="0" width="' + w + '" height="' + h + '" preserveAspectRatio="xMidYMid meet"' + (extra || '') + '/>';
      };
      if (!m.mask) return img(m.file);
      var mid = 'cm-' + id.replace(/[^a-z0-9]/gi, '-');
      G.defs.ensure(mid, '<mask id="' + mid + '" maskUnits="userSpaceOnUse" x="0" y="0" width="' + w + '" height="' + h +
        '" style="mask-type:alpha">' + img(m.mask) + '</mask>');
      return '<rect x="0" y="0" width="' + w + '" height="' + h + '" fill="' + o.fill + '" mask="url(#' + mid + ')"/>' +
        (m.detail ? img(m.detail) : '');
    },

    /* A small standalone <svg> showing one asset (item tiles, icons). viewBox defaults to the full space. */
    thumb: function (id, o, viewBox, cls) {
      var sz = this.size(id);
      return G.svg.make(viewBox || ('0 0 ' + sz[0] + ' ' + sz[1]), this.markup(id, o), cls || 'thumb');
    },

    ids: function () { return this.order.slice(); }
  };

  /* Shortcut used everywhere for UI icons: <svg class="ico"> of asset "icon.<name>". */
  G.icon = function (name, cls) {
    return A.thumb('icon.' + name, null, '0 0 100 100', 'ico' + (cls ? ' ' + cls : ''));
  };
})(window.Game);
