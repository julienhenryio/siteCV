/* Catalog: sounds and music, as synth recipes played by js/core/audio.js.
   To replace one with a recording, drop e.g. assets/custom/sfx.sparkle.mp3 or music.main.mp3
   and run tools/build-assets.mjs. No code change needed.

   Sound recipe = list of notes:
     w  wave: sine | square | triangle | sawtooth | noise
     f  start frequency (Hz), f2  end frequency (glide)
     t  start time (s), d  duration (s), g  volume (0..1)
     lp / hp  low-pass / high-pass filter frequency (mostly for noise) */
(function (G) {
  'use strict';
  G.data = G.data || {};

  var S = G.data.sounds = {
    'sfx.click':   { desc: 'Button tap.', notes: [{ w: 'triangle', f: 720, f2: 980, d: 0.07, g: 0.35 }] },
    'sfx.tab':     { desc: 'Switching tab.', notes: [{ w: 'triangle', f: 520, f2: 660, d: 0.06, g: 0.3 }] },
    'sfx.pick':    { desc: 'Choosing an item or a color.', notes: [{ w: 'sine', f: 880, d: 0.07, g: 0.3 }, { w: 'sine', f: 1320, t: 0.06, d: 0.1, g: 0.28 }] },
    'sfx.pop':     { desc: 'Bubble pop.', notes: [{ w: 'sine', f: 420, f2: 900, d: 0.08, g: 0.4 }] },
    'sfx.sparkle': { desc: 'Magic sparkle.', notes: [{ w: 'sine', f: 1568, d: 0.1, g: 0.2 }, { w: 'sine', f: 2093, t: 0.06, d: 0.1, g: 0.2 }, { w: 'sine', f: 2637, t: 0.12, d: 0.12, g: 0.2 }, { w: 'sine', f: 3136, t: 0.18, d: 0.22, g: 0.18 }] },
    'sfx.rub':     { desc: 'Soft rubbing (brush, towel).', notes: [{ w: 'noise', d: 0.12, g: 0.22, lp: 2400, hp: 700 }] },
    'sfx.bubble':  { desc: 'Foamy bubbles.', notes: [{ w: 'sine', f: 500, f2: 1100, d: 0.07, g: 0.2 }, { w: 'sine', f: 700, f2: 1500, t: 0.05, d: 0.07, g: 0.16 }] },
    'sfx.splash':  { desc: 'Water splash.', notes: [{ w: 'noise', d: 0.22, g: 0.3, lp: 5200, hp: 1200 }] },
    'sfx.snip':    { desc: 'Tweezers pluck.', notes: [{ w: 'square', f: 1800, f2: 2600, d: 0.03, g: 0.14 }] },
    'sfx.star':    { desc: 'Earning a star.', notes: [{ w: 'triangle', f: 1047, d: 0.12, g: 0.34 }, { w: 'triangle', f: 1568, t: 0.09, d: 0.25, g: 0.32 }] },
    'sfx.win':     { desc: 'Challenge finished fanfare.', notes: [{ w: 'triangle', f: 523, d: 0.12, g: 0.3 }, { w: 'triangle', f: 659, t: 0.11, d: 0.12, g: 0.3 }, { w: 'triangle', f: 784, t: 0.22, d: 0.12, g: 0.3 }, { w: 'triangle', f: 1047, t: 0.33, d: 0.4, g: 0.32 }, { w: 'sine', f: 2093, t: 0.33, d: 0.4, g: 0.12 }] },
    'sfx.unlock':  { desc: 'Reward unlocked.', notes: [{ w: 'sine', f: 784, f2: 1568, d: 0.3, g: 0.25 }, { w: 'sine', f: 1568, t: 0.28, d: 0.1, g: 0.22 }, { w: 'sine', f: 1976, t: 0.38, d: 0.1, g: 0.22 }, { w: 'sine', f: 2349, t: 0.48, d: 0.1, g: 0.22 }, { w: 'sine', f: 3136, t: 0.58, d: 0.4, g: 0.2 }] },
    'sfx.shutter': { desc: 'Camera shutter.', notes: [{ w: 'noise', d: 0.04, g: 0.4, hp: 1800 }, { w: 'noise', t: 0.09, d: 0.06, g: 0.3, hp: 900 }, { w: 'square', f: 180, t: 0.09, d: 0.04, g: 0.16 }] },
    'sfx.whoosh':  { desc: 'Moving to another screen.', notes: [{ w: 'noise', d: 0.2, g: 0.18, lp: 1800, hp: 300 }, { w: 'sine', f: 300, f2: 760, d: 0.18, g: 0.18 }] },
    'sfx.drop':    { desc: 'Placing a decoration or sticker.', notes: [{ w: 'sine', f: 620, f2: 300, d: 0.1, g: 0.35 }] },
    'sfx.trash':   { desc: 'Removing something.', notes: [{ w: 'triangle', f: 500, f2: 180, d: 0.16, g: 0.3 }] },
    'sfx.kiss':    { desc: 'Kiss.', notes: [{ w: 'sine', f: 1400, f2: 2600, d: 0.07, g: 0.22 }, { w: 'noise', t: 0.06, d: 0.04, g: 0.1, hp: 3000 }] },
    'sfx.chomp':   { desc: 'Pet eating a treat.', notes: [{ w: 'square', f: 240, f2: 150, d: 0.06, g: 0.2 }, { w: 'square', f: 260, f2: 150, t: 0.13, d: 0.06, g: 0.2 }, { w: 'square', f: 280, f2: 160, t: 0.26, d: 0.06, g: 0.2 }] },
    'sfx.bark':    { desc: 'Happy puppy bark.', notes: [{ w: 'sawtooth', f: 560, f2: 300, d: 0.11, g: 0.26, lp: 2200 }, { w: 'sawtooth', f: 620, f2: 320, t: 0.19, d: 0.13, g: 0.26, lp: 2200 }] },
    'sfx.meow':    { desc: 'Kitten meow.', notes: [{ w: 'sawtooth', f: 620, f2: 980, d: 0.16, g: 0.2, lp: 2600 }, { w: 'sawtooth', f: 980, f2: 560, t: 0.16, d: 0.3, g: 0.2, lp: 2600 }] }
  };

  /* Background music: an 8-bar bubblegum loop in C major (C  G  Am  F  C  G  F  G).
     Each string is 8 bars x 8 eighth-notes; "-" is a rest. */
  G.data.music = {
    'music.main': {
      desc: 'Cheerful looping bubblegum-pop tune.',
      bpm: 126,
      lead: 'E5 G5 C6 G5 E5 G5 C6 - ' + 'D5 G5 B5 G5 D5 G5 B5 - ' + 'C5 E5 A5 E5 C5 E5 A5 G5 ' + 'F5 A5 C6 A5 F5 - E5 D5 ' +
            'E5 - E5 G5 C6 - B5 C6 ' + 'D6 - B5 G5 D5 - G5 B5 ' + 'A5 - A5 C6 F5 - A5 G5 ' + 'G5 B5 D6 B5 G5 - - - ',
      bass: 'C3 - C3 - G3 - C3 - ' + 'G2 - G2 - D3 - G2 - ' + 'A2 - A2 - E3 - A2 - ' + 'F2 - F2 - C3 - F2 - ' +
            'C3 - C3 - G3 - C3 - ' + 'G2 - G2 - D3 - G2 - ' + 'F2 - F2 - C3 - F2 - ' + 'G2 - G2 - D3 - G2 B2 ',
      chords: ['C4 E4 G4', 'B3 D4 G4', 'A3 C4 E4', 'A3 C4 F4', 'C4 E4 G4', 'B3 D4 G4', 'A3 C4 F4', 'B3 D4 G4'],
      kick: 'x - - - x - - - ', snare: '- - x - - - x - ', hat: '- x - x - x - x '
    }
  };

  /* Listed in the asset registry too, so the gallery and asset-list show them. */
  if (G.assets) {
    Object.keys(S).forEach(function (id) { G.assets.register(id, { space: 'audio', desc: S[id].desc + ' Sound effect; override with ' + id + '.mp3/.ogg/.wav.' }); });
    Object.keys(G.data.music).forEach(function (id) { G.assets.register(id, { space: 'audio', desc: G.data.music[id].desc + ' Override with ' + id + '.mp3/.ogg (it will loop).' }); });
  }
})(window.Game);
