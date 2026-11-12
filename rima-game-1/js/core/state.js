/* Save data: one JSON object in localStorage. Everything the player made lives in G.state.data. */
(function (G) {
  'use strict';
  var KEY = 'glossy-days-save-v1';
  var timer = null;

  function clone(o) { return JSON.parse(JSON.stringify(o)); }

  function defaults() {
    var lang = 'en';
    try { if (/^fr/i.test(navigator.language || '')) lang = 'fr'; } catch (e) {}
    return {
      v: 1,
      created: false,          // has the player finished character creation?
      lang: lang,
      muted: false,
      girl: { name: '', skin: G.data.skins[1], eyes: G.data.eyeColors[0], hair: 'long', hairColor: G.data.hairColors[0] },
      makeup: clone(G.data.defaultMakeup || {}),
      spaDone: false,
      outfit: clone(G.data.sampleOutfits[0]),
      room: clone(G.data.defaultRoom),
      pet: { type: 'puppy', name: '', color: G.data.petTypes[0].color, mud: 1, acc: {} },
      photo: null,             // last photo setup (backdrop, stickers...)
      stars: {},               // challenge id -> best stars (1..3)
      seenUnlocks: [],         // reward ids already announced
      album: []                // saved photo thumbnails (data URLs)
    };
  }

  var S = G.state = {
    data: null,
    storageOk: true,

    load: function () {
      var d = defaults(), saved = null;
      try { saved = JSON.parse(localStorage.getItem(KEY) || 'null'); } catch (e) { S.storageOk = false; }
      if (saved && saved.v === 1) {
        // shallow-merge so new fields added in later versions get their defaults
        for (var k in d) if (saved[k] === undefined) saved[k] = d[k];
        d = saved;
      }
      S.data = d;
      return d;
    },

    /* Saves soon (batched), so sliders and rubbing do not write on every frame. */
    save: function () {
      if (timer) return;
      timer = setTimeout(function () { timer = null; S.saveNow(); }, 250);
    },
    saveNow: function () {
      try { localStorage.setItem(KEY, JSON.stringify(S.data)); S.storageOk = true; }
      catch (e) {
        S.storageOk = false;
        // most likely the album is too big: drop the oldest photo and retry once
        if (S.data.album && S.data.album.length > 1) {
          S.data.album.shift();
          try { localStorage.setItem(KEY, JSON.stringify(S.data)); S.storageOk = true; } catch (e2) {}
        }
      }
    },

    reset: function () {
      var keep = { lang: S.data.lang, muted: S.data.muted };
      try { localStorage.removeItem(KEY); } catch (e) {}
      S.data = defaults();
      S.data.lang = keep.lang; S.data.muted = keep.muted;
      S.saveNow();
    },

    totalStars: function () {
      var n = 0;
      for (var k in S.data.stars) n += S.data.stars[k] || 0;
      return n;
    },
    clone: clone
  };

  if (typeof window !== 'undefined') {
    window.addEventListener('pagehide', function () { if (S.data) S.saveNow(); });
    document.addEventListener('visibilitychange', function () { if (document.hidden && S.data) S.saveNow(); });
  }
})(window.Game);
