/* Puts the bedroom together from asset IDs, in layer order. Used by the hub, the room
   decorator and the "my room" photo backdrop. */
(function (G) {
  'use strict';
  var A = G.assets;

  var R = G.room = {
    VIEW: '0 0 1200 800',
    DECOR_SIZE: 130, // on-screen size of a free decoration at scale 1 (room units)

    decorMarkup: function (d, i) {
      var sz = R.DECOR_SIZE * (d.s || 1);
      return '<g data-decor="' + i + '" transform="translate(' + (d.x - sz / 2) + ' ' + (d.y - sz / 2) + ') scale(' + (sz / 100) + ')">' +
        A.markup(d.id, { color: d.color }) + '</g>';
    },

    /* opts.hubObjects: draw the pet bed and the camera (hub only). */
    markup: function (room, opts) {
      room = room || (G.state && G.state.data && G.state.data.room) || G.data.defaultRoom;
      opts = opts || {};
      var slot = function (name) {
        var it = room[name];
        if (!it || !it.id || !A.has(it.id)) return '';
        return '<g data-slot="' + name + '">' + A.markup(it.id, { color: it.color, pattern: it.pattern }) + '</g>';
      };
      var furn = { color: (room.furniture && room.furniture.color) || '#ffffff' };
      var decor = (room.decor || []).map(function (d, i) { return { d: d, i: i }; })
        .sort(function (a, b) { return a.d.y - b.d.y; })
        .map(function (e) { return R.decorMarkup(e.d, e.i); }).join('');

      return slot('wall') + slot('floor') +
        A.markup('room.window') + slot('curtains') + slot('lights') + slot('art') +
        '<g data-slot="furniture">' + A.markup('room.wardrobe', furn) + A.markup('room.vanity', furn) + A.markup('room.nightstand', furn) + '</g>' +
        slot('lamp') + slot('rug') + slot('bed') +
        (opts.hubObjects ? A.markup('room.petbed', { color: '#b983ff' }) + A.markup('room.camera') : '') +
        '<g data-part="decor">' + decor + '</g>';
    },

    svg: function (room, opts, cls) { return G.svg.make(R.VIEW, R.markup(room, opts), cls || 'room'); }
  };
})(window.Game);
