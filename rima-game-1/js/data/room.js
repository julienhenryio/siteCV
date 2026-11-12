/* Catalog: bedroom decoration. Data only; pictures are in js/art/roomart.js.
   Each slot holds one choice. `variants` are asset ids; `none: true` allows an empty slot;
   `patterns: true` adds the pattern picker (wallpaper). */
(function (G) {
  'use strict';
  G.data = G.data || {};

  G.data.roomSlots = [
    { id: 'wall', icon: 'wall', variants: ['room.wall'], patterns: true, name: { en: 'Wallpaper', fr: 'Papier peint' } },
    { id: 'floor', icon: 'floor', variants: ['room.floor.wood', 'room.floor.carpet', 'room.floor.tiles'], name: { en: 'Floor', fr: 'Sol' } },
    { id: 'bed', icon: 'bed', variants: ['room.bed.heart', 'room.bed.canopy', 'room.bed.daybed'], view: '740 180 460 480', name: { en: 'Bed', fr: 'Lit' } },
    { id: 'rug', icon: 'rug', variants: ['room.rug.round', 'room.rug.heart', 'room.rug.star'], none: true, view: '340 600 520 200', name: { en: 'Rug', fr: 'Tapis' } },
    { id: 'curtains', icon: 'curtains', variants: ['room.curtains.drapes', 'room.curtains.ruffle', 'room.curtains.beads'], none: true, view: '420 70 360 380', name: { en: 'Curtains', fr: 'Rideaux' } },
    { id: 'lamp', icon: 'lamp', variants: ['room.lamp.lava', 'room.lamp.table', 'room.lamp.disco'], none: true, view: '625 330 200 200', views: { 'room.lamp.disco': '280 40 200 220' }, name: { en: 'Lamp', fr: 'Lampe' } },
    { id: 'art', icon: 'art', variants: ['room.art.heart', 'room.art.star', 'room.art.butterfly', 'room.art.collage'], none: true, view: '850 110 250 200', name: { en: 'Wall art', fr: 'Déco murale' } },
    { id: 'lights', icon: 'lights', variants: ['room.lights.fairy', 'room.lights.hearts'], none: true, view: '300 0 600 130', name: { en: 'Lights', fr: 'Guirlandes' } },
    { id: 'furniture', icon: 'furniture', variants: ['room.wardrobe'], view: '0 100 310 520', name: { en: 'Furniture color', fr: 'Couleur des meubles' } },
    { id: 'decor', icon: 'plush', free: true, name: { en: 'Decorations', fr: 'Décorations' },
      variants: ['decor.teddy', 'decor.bunny', 'decor.cushion', 'decor.beanbag', 'decor.inflatable', 'decor.plant', 'decor.vase', 'decor.boombox', 'decor.phone', 'decor.shelfcd'] }
  ];

  /* Reward items: asset id -> stars needed. */
  G.data.roomUnlocks = { 'room.lamp.disco': 9 };

  /* Default colors of free decorations. */
  G.data.decorColors = {
    'decor.teddy': '#d9a66b', 'decor.bunny': '#ffffff', 'decor.cushion': '#ff5a5a', 'decor.beanbag': '#b983ff', 'decor.inflatable': '#ff5fb0',
    'decor.plant': '#ff8cc6', 'decor.vase': '#7fd4ff', 'decor.boombox': '#7fd4ff', 'decor.phone': '#ff5fb0', 'decor.shelfcd': '#ff8cc6'
  };

  /* Wall and furniture colors are softer than the clothes palette. */
  G.data.roomPalette = ['#ffffff', '#ffe3f1', '#ffc2e2', '#ff8cc6', '#ff4fa0', '#e3c6ff', '#b983ff', '#bfe6ff', '#7fd4ff',
    '#b9f2e2', '#d8f5a2', '#fff7a8', '#ffd9a8', '#e8b98a', '#b98a66', '#9aa0b0', '#3a2a4a', '#ffd84a'];

  /* The room a new game starts with. */
  G.data.defaultRoom = {
    wall: { id: 'room.wall', color: '#ffc2e2', pattern: 'hearts' },
    floor: { id: 'room.floor.wood', color: '#e8b98a' },
    furniture: { id: 'room.wardrobe', color: '#ffffff' },
    bed: { id: 'room.bed.heart', color: '#ff8cc6' },
    rug: { id: 'room.rug.round', color: '#b983ff' },
    curtains: { id: 'room.curtains.drapes', color: '#ff4fa0' },
    lamp: { id: 'room.lamp.lava', color: '#b983ff' },
    art: { id: 'room.art.star', color: '#ff8cc6' },
    lights: { id: 'room.lights.fairy', color: '#ff8cc6' },
    decor: [{ id: 'decor.teddy', x: 880, y: 470, color: '#d9a66b', s: 1 }]
  };
})(window.Game);
