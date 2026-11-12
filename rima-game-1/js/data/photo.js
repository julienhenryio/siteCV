/* Catalog: Photo Shoot (backdrops, stickers, frames). Data only; pictures are in js/art/backdrops.js. */
(function (G) {
  'use strict';
  G.data = G.data || {};

  /* place: 'beach' etc. is used by photo challenges. */
  G.data.backdrops = [
    { id: 'backdrop.studio', place: 'studio', name: { en: 'Studio', fr: 'Studio' } },
    { id: 'backdrop.room', place: 'room', name: { en: 'My room', fr: 'Ma chambre' } },
    { id: 'backdrop.beach', place: 'beach', name: { en: 'Beach', fr: 'Plage' } },
    { id: 'backdrop.party', place: 'party', name: { en: 'Party', fr: 'Fête' } },
    { id: 'backdrop.mall', place: 'mall', name: { en: 'Mall', fr: 'Centre commercial' } },
    { id: 'backdrop.park', place: 'park', name: { en: 'Park', fr: 'Parc' } },
    { id: 'backdrop.stage', place: 'stage', unlock: 24, name: { en: 'Star stage', fr: 'Scène de star' } }
  ];

  G.data.stickers = [
    { id: 'sticker.heart' }, { id: 'sticker.star' }, { id: 'sticker.sparkle' }, { id: 'sticker.butterfly' }, { id: 'sticker.flower' },
    { id: 'sticker.kiss' }, { id: 'sticker.bow' }, { id: 'sticker.rainbow' }, { id: 'sticker.note' }, { id: 'sticker.disc' },
    { id: 'sticker.sun' }, { id: 'sticker.icecream' }, { id: 'sticker.cupcake' }, { id: 'sticker.cherry' }, { id: 'sticker.paw' },
    { id: 'sticker.crown', unlock: 14 }
  ];

  G.data.frames = [
    { id: 'frame.hearts', name: { en: 'Hearts', fr: 'Cœurs' } },
    { id: 'frame.polaroid', name: { en: 'Instant photo', fr: 'Photo instantanée' } },
    { id: 'frame.stars', name: { en: 'Stars', fr: 'Étoiles' } },
    { id: 'frame.gold', unlock: 28, name: { en: 'Gold', fr: 'Or' } }
  ];

  G.data.captionColors = ['#ffffff', '#ff4fa0', '#b06cff', '#3f5fd6', '#ffd84a', '#2b2330'];
  G.data.albumMax = 12;
})(window.Game);
