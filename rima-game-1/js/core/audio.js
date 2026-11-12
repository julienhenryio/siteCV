/* Sound engine. Game code only ever calls G.audio.play('sfx.name') or G.audio.music(true/false).
   Each sound ID is either an audio file from assets/custom/ (if present) or a synth recipe
   from js/data/sounds.js played with the Web Audio API. */
(function (G) {
  'use strict';
  var ctx = null, master = null, sfxBus = null, musicBus = null, noiseBuf = null;
  var files = {};          // id -> HTMLAudioElement (custom overrides)
  var last = {};           // id -> last play time (throttle)
  var musicTimer = null, musicFile = null, musicOn = false, nextBar = 0, barIndex = 0, musicId = 'music.main';

  var NOTE = { C: 0, D: 2, E: 4, F: 5, G: 7, A: 9, B: 11 };
  function freq(n) {
    var m = /^([A-G])(#|b)?(\d)$/.exec(n);
    if (!m) return 0;
    var semi = NOTE[m[1]] + (m[2] === '#' ? 1 : m[2] === 'b' ? -1 : 0) + (parseInt(m[3], 10) + 1) * 12;
    return 440 * Math.pow(2, (semi - 69) / 12);
  }

  function ensure() {
    if (ctx) return ctx;
    var AC = window.AudioContext || window.webkitAudioContext;
    if (!AC) return null;
    try {
      ctx = new AC();
      master = ctx.createGain(); master.gain.value = 0.8; master.connect(ctx.destination);
      sfxBus = ctx.createGain(); sfxBus.gain.value = 0.7; sfxBus.connect(master);
      musicBus = ctx.createGain(); musicBus.gain.value = 0.22; musicBus.connect(master);
      var len = ctx.sampleRate * 0.5;
      noiseBuf = ctx.createBuffer(1, len, ctx.sampleRate);
      var d = noiseBuf.getChannelData(0);
      for (var i = 0; i < len; i++) d[i] = Math.random() * 2 - 1;
    } catch (e) { ctx = null; }
    return ctx;
  }

  /* One synthesized note. */
  function tone(n, at, bus) {
    var t0 = at + (n.t || 0), d = n.d || 0.1, g = ctx.createGain(), src;
    if (n.w === 'noise') {
      src = ctx.createBufferSource(); src.buffer = noiseBuf; src.loop = true;
    } else {
      src = ctx.createOscillator(); src.type = n.w || 'sine';
      src.frequency.setValueAtTime(n.f || 440, t0);
      if (n.f2) src.frequency.exponentialRampToValueAtTime(n.f2, t0 + d);
    }
    var node = src;
    if (n.hp) { var hp = ctx.createBiquadFilter(); hp.type = 'highpass'; hp.frequency.value = n.hp; node.connect(hp); node = hp; }
    if (n.lp) { var lp = ctx.createBiquadFilter(); lp.type = 'lowpass'; lp.frequency.value = n.lp; node.connect(lp); node = lp; }
    var peak = n.g == null ? 0.3 : n.g, a = n.a == null ? 0.008 : n.a;
    g.gain.setValueAtTime(0.0001, t0);
    g.gain.linearRampToValueAtTime(peak, t0 + a);
    g.gain.exponentialRampToValueAtTime(0.0001, t0 + d);
    node.connect(g); g.connect(bus);
    src.start(t0); src.stop(t0 + d + 0.03);
  }

  function customFile(id) {
    var m = G.assets && G.assets.manifest[id];
    return m && m.file ? G.assets.base + m.file : null;
  }

  /* ---------- music sequencer ---------- */
  function seq(str) { return (str || '').trim().split(/\s+/); }
  function scheduleBar(song, bar, t) {
    var step = 60 / song.bpm / 2, lead = seq(song.lead), bass = seq(song.bass), i, k;
    var kick = seq(song.kick), snare = seq(song.snare), hat = seq(song.hat);
    for (i = 0; i < 8; i++) {
      var at = t + i * step, idx = bar * 8 + i;
      var ln = lead[idx], bn = bass[idx];
      if (ln && ln !== '-') { tone({ w: 'square', f: freq(ln), d: step * 0.9, g: 0.16 }, at, musicBus); tone({ w: 'sine', f: freq(ln) * 2, d: step * 0.6, g: 0.07 }, at, musicBus); }
      if (bn && bn !== '-') tone({ w: 'triangle', f: freq(bn), d: step * 1.7, g: 0.5 }, at, musicBus);
      if (kick[i] === 'x') tone({ w: 'sine', f: 150, f2: 45, d: 0.16, g: 0.75 }, at, musicBus);
      if (snare[i] === 'x') tone({ w: 'noise', d: 0.1, g: 0.2, hp: 1500 }, at, musicBus);
      if (hat[i] === 'x') tone({ w: 'noise', d: 0.035, g: 0.09, hp: 6000 }, at, musicBus);
    }
    var ch = (song.chords[bar] || '').split(/\s+/);
    for (k = 0; k < ch.length; k++) if (ch[k]) tone({ w: 'triangle', f: freq(ch[k]), d: step * 7.6, g: 0.1, a: 0.04 }, t, musicBus);
  }
  function pump() {
    if (!ctx || !musicOn) return;
    var song = G.data.music[musicId];
    if (!song) return;
    var barLen = 60 / song.bpm * 4, bars = song.chords.length;
    if (nextBar < ctx.currentTime) nextBar = ctx.currentTime + 0.06;
    while (nextBar < ctx.currentTime + 0.6) {
      scheduleBar(song, barIndex % bars, nextBar);
      barIndex++; nextBar += barLen;
    }
  }

  var A = G.audio = {
    muted: false,

    /* Call from a tap/click: browsers only allow sound after a user gesture. */
    unlock: function () {
      if (!ensure()) return;
      if (ctx.state === 'suspended') {
        var p = ctx.resume();
        if (p && p.then) p.then(function () { if (musicOn) A._startMusic(); });
      }
      if (musicOn) A._startMusic();
    },

    play: function (id, opts) {
      if (A.muted) return;
      var now = (typeof performance !== 'undefined' ? performance.now() : Date.now());
      var gap = (opts && opts.gap) || 30;
      if (last[id] && now - last[id] < gap) return;
      last[id] = now;
      var file = customFile(id);
      if (file) {
        try {
          var base = files[id] || (files[id] = new Audio(file));
          var a = base.cloneNode(); a.volume = 0.8; a.play().catch(function () {});
        } catch (e) {}
        return;
      }
      var r = G.data.sounds[id];
      if (!r || !ensure() || ctx.state !== 'running') return;
      var at = ctx.currentTime + 0.005;
      for (var i = 0; i < r.notes.length; i++) tone(r.notes[i], at, sfxBus);
    },

    /* Turn the background music on or off (it only really starts after unlock()). */
    music: function (on) {
      musicOn = !!on;
      if (musicOn && !A.muted) A._startMusic(); else A._stopMusic();
    },
    _startMusic: function () {
      if (A.muted || !musicOn) return;
      var file = customFile(musicId);
      if (file) {
        if (!musicFile) { musicFile = new Audio(file); musicFile.loop = true; musicFile.volume = 0.35; }
        musicFile.play().catch(function () {});
        return;
      }
      if (!ensure() || ctx.state !== 'running' || musicTimer) return;
      nextBar = 0;
      musicBus.gain.cancelScheduledValues(ctx.currentTime);
      musicBus.gain.setValueAtTime(0.22, ctx.currentTime);
      pump();
      musicTimer = setInterval(pump, 120);
    },
    _stopMusic: function () {
      if (musicFile) musicFile.pause();
      if (musicTimer) { clearInterval(musicTimer); musicTimer = null; }
      if (ctx && musicBus) { musicBus.gain.cancelScheduledValues(ctx.currentTime); musicBus.gain.setTargetAtTime(0.0001, ctx.currentTime, 0.05); }
    },

    setMuted: function (m) {
      A.muted = !!m;
      if (A.muted) A._stopMusic(); else if (musicOn) A._startMusic();
    },

    /* The Web Audio context and its final output node (null until the first sound). For tools and tests. */
    context: function () { return ctx; },
    output: function () { return master; },

    /* Used by tools/gallery.html to audition the music. */
    toggleMusicPreview: function (id) { musicId = id || musicId; A.music(!musicTimer && !(musicFile && !musicFile.paused)); }
  };

  if (typeof document !== 'undefined') {
    document.addEventListener('visibilitychange', function () {
      if (document.hidden) A._stopMusic(); else if (musicOn && !A.muted) A._startMusic();
    });
  }
})(window.Game);
