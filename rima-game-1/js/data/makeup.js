/* Catalog: makeover (spa steps and makeup tools). Data only. */
(function (G) {
  'use strict';
  G.data = G.data || {};

  /* Spa steps, played in this order.
     kind: 'rub' fills a meter by rubbing the face; 'place' = tap each eye; 'pluck' = tap the stray hairs. */
  G.data.spaSteps = [
    { id: 'cleanser', icon: 'cleanser', kind: 'rub', sound: 'sfx.bubble', name: { en: 'Wash', fr: 'Nettoyer' } },
    { id: 'rinse', icon: 'water', kind: 'rub', sound: 'sfx.splash', name: { en: 'Rinse', fr: 'Rincer' } },
    { id: 'mask', icon: 'mask', kind: 'rub', sound: 'sfx.rub', name: { en: 'Mask', fr: 'Masque' } },
    { id: 'cucumber', icon: 'cucumber', kind: 'place', sound: 'sfx.pop', name: { en: 'Relax', fr: 'Détente' } },
    { id: 'wipe', icon: 'sponge', kind: 'rub', sound: 'sfx.rub', name: { en: 'Wipe', fr: 'Essuyer' } },
    { id: 'tweeze', icon: 'tweezers', kind: 'pluck', sound: 'sfx.snip', name: { en: 'Brows', fr: 'Sourcils' } }
  ];
  G.data.maskColors = ['#b9f2c9', '#ffc2e2', '#d9c2ff', '#ffe9a8'];

  var PINKS = ['#ffb3d0', '#ff7fb0', '#ff4fa0', '#e0245e', '#c2185b', '#ff8a5c', '#d98a6a', '#a0456e'];
  /* Makeup tools. layer = key in the saved makeup state; zone = where to rub (see makeover.js).
     styles = variants picked before applying; colors = palette. */
  G.data.makeupTools = [
    { id: 'blush', icon: 'blush', layer: 'blush', zone: 'cheeks', colors: ['#ff8cb8', '#ff5fa0', '#ff8a5c', '#f06a8a', '#d86aa8', '#ffb07a'], name: { en: 'Blush', fr: 'Blush' } },
    { id: 'shadow', icon: 'shadow', layer: 'shadow', zone: 'eyes', colors: ['#ff8cc6', '#b06cff', '#5fb6ff', '#59d6c0', '#ffd84a', '#ff5a5a', '#c9a27a', '#e3e6f5', '#7a5cff', '#3fc7b2'], name: { en: 'Eyeshadow', fr: 'Fard à paupières' } },
    { id: 'liner', icon: 'liner', layer: 'liner', zone: 'eyes', styles: ['classic', 'wing', 'bold'], colors: ['#2a1420', '#6b3a1e', '#3f5fd6', '#7a3fd0', '#e0245e', '#1f8f7a'], name: { en: 'Eyeliner', fr: 'Eyeliner' } },
    { id: 'mascara', icon: 'mascara', layer: 'lashes', zone: 'eyes', name: { en: 'Mascara', fr: 'Mascara' } },
    { id: 'lips', icon: 'lips', layer: 'lips', zone: 'lips', colors: PINKS.concat(['#b06cff', '#7a1f3a']), name: { en: 'Lipstick', fr: 'Rouge à lèvres' } },
    { id: 'gloss', icon: 'gloss', layer: 'gloss', zone: 'lips', name: { en: 'Gloss', fr: 'Gloss' } },
    { id: 'gems', icon: 'gems', layer: 'gems', zone: 'temples', styles: ['stars', 'hearts', 'dots'], colors: ['#ffd84a', '#ff4fa0', '#7fd4ff', '#b983ff', '#ffffff', '#59d6c0'], name: { en: 'Face gems', fr: 'Strass' } },
    { id: 'remover', icon: 'remover', zone: 'face', erase: true, name: { en: 'Remove', fr: 'Démaquiller' } }
  ];

  /* Makeup a brand-new game starts with: none, so the first makeover is a blank canvas. */
  G.data.defaultMakeup = {};
})(window.Game);
