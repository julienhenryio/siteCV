/* Catalog: optional challenges and reward thresholds. Data only; scoring rules are in js/core/challenges.js.
   Every challenge gives 1 to 3 stars, never zero. Total stars unlock reward items. */
(function (G) {
  'use strict';
  G.data = G.data || {};

  /* rule + args are read by G.challenges.rules[rule]. icon is any asset id. */
  G.data.challenges = [
    // Dress Up: wear clothes of one style
    { id: 'dress.beach', feature: 'dressup', icon: 'sticker.sun', rule: 'style', style: 'beach', name: { en: 'Beach day', fr: 'Journée plage' } },
    { id: 'dress.party', feature: 'dressup', icon: 'sticker.disc', rule: 'style', style: 'glam', name: { en: 'Party night', fr: 'Soirée' } },
    { id: 'dress.sport', feature: 'dressup', icon: 'sticker.star', rule: 'style', style: 'sporty', name: { en: 'Sport class', fr: 'Cours de sport' } },
    { id: 'dress.pink', feature: 'dressup', icon: 'sticker.heart', rule: 'outfitColor', families: ['pink', 'red'], name: { en: 'Pink power', fr: 'Tout en rose' } },

    // Makeover
    { id: 'make.natural', feature: 'makeover', icon: 'sticker.flower', rule: 'makeup', want: ['blush', 'lashes', 'gloss'], avoid: ['gems'], name: { en: 'Natural glow', fr: 'Éclat naturel' } },
    { id: 'make.disco', feature: 'makeover', icon: 'sticker.disc', rule: 'makeup', want: ['shadow', 'liner', 'lips', 'gems'], name: { en: 'Disco diva', fr: 'Diva disco' } },
    { id: 'make.pink', feature: 'makeover', icon: 'sticker.kiss', rule: 'makeupColor', layers: ['blush', 'shadow', 'lips'], families: ['pink', 'red'], name: { en: 'Pretty in pink', fr: 'Rose bonbon' } },

    // Room
    { id: 'room.pink', feature: 'room', icon: 'sticker.heart', rule: 'roomColor', families: ['pink', 'red'], name: { en: 'Pink dream', fr: 'Rêve rose' } },
    { id: 'room.ocean', feature: 'room', icon: 'sticker.rainbow', rule: 'roomColor', families: ['blue', 'green', 'purple'], name: { en: 'Ocean vibes', fr: 'Ambiance océan' } },
    { id: 'room.cozy', feature: 'room', icon: 'sticker.cupcake', rule: 'roomCozy', name: { en: 'Extra cosy', fr: 'Super cosy' } },

    // Pet
    { id: 'pet.clean', feature: 'pet', icon: 'sticker.sparkle', rule: 'petClean', name: { en: 'Squeaky clean', fr: 'Tout propre' } },
    { id: 'pet.fancy', feature: 'pet', icon: 'sticker.bow', rule: 'petFancy', name: { en: 'Fancy pet', fr: 'Animal chic' } },
    { id: 'pet.love', feature: 'pet', icon: 'sticker.paw', rule: 'petLove', name: { en: 'Best friends', fr: 'Meilleurs amis' } },

    // Photo
    { id: 'photo.beach', feature: 'photo', icon: 'sticker.icecream', rule: 'photo', place: 'beach', stickers: 2, name: { en: 'Beach postcard', fr: 'Carte postale' } },
    { id: 'photo.besties', feature: 'photo', icon: 'sticker.paw', rule: 'photo', frame: true, pet: true, stickers: 1, name: { en: 'Me and my pet', fr: 'Moi et mon animal' } },
    { id: 'photo.star', feature: 'photo', icon: 'sticker.star', rule: 'photo', place: 'party', frame: true, stickers: 3, caption: true, name: { en: 'Magazine cover', fr: 'Couverture de magazine' } }
  ];

  /* Extra reward thresholds for things that are not catalog items. */
  G.data.extraUnlocks = { 'pattern.holo': 6 };

  /* Names of rewards whose catalog entry has no name of its own. */
  G.data.rewardNames = {
    'pattern.holo': { en: 'Holographic pattern', fr: 'Motif holographique' },
    'room.lamp.disco': { en: 'Disco ball', fr: 'Boule disco' },
    'sticker.crown': { en: 'Crown sticker', fr: 'Sticker couronne' }
  };

  /* Kind messages by number of stars (index 1..3). */
  G.data.starMessages = {
    en: ['', 'Cute start!', 'So pretty!', 'Absolutely fabulous!'],
    fr: ['', 'Joli début !', 'Trop joli !', 'Absolument fabuleux !']
  };
})(window.Game);
