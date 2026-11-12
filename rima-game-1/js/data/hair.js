/* Catalog: what the girl herself can look like (skin, eyes, hair). Data only. */
(function (G) {
  'use strict';
  G.data = G.data || {};

  G.data.skins = ['#ffe6d6', '#fcd3b6', '#efb98f', '#d49a6a', '#a8704a', '#74482c'];

  G.data.eyeColors = ['#5aa9f0', '#3fc7b2', '#63b54a', '#8a5a2b', '#3d2a22', '#9a6cf0', '#ff6fb5', '#7d8ea3'];

  G.data.hairColors = ['#ffe07a', '#f2b24a', '#c9743a', '#8a4b2a', '#4a2c1e', '#1f1a22',
    '#e84a3c', '#ff7fc4', '#ff4fa0', '#b06cff', '#5fb6ff', '#59d6c0'];

  G.data.hairStyles = [
    { id: 'long', name: { en: 'Long straight', fr: 'Longs et lisses' } },
    { id: 'wavy', name: { en: 'Long wavy', fr: 'Longs ondulés' } },
    { id: 'pony', name: { en: 'Ponytail', fr: 'Queue de cheval' } },
    { id: 'pigtails', name: { en: 'Pigtails', fr: 'Couettes' } },
    { id: 'bob', name: { en: 'Bob', fr: 'Carré' } },
    { id: 'buns', name: { en: 'Space buns', fr: 'Chignons' } },
    { id: 'curly', name: { en: 'Big curls', fr: 'Grosses boucles' } },
    { id: 'pixie', name: { en: 'Pixie', fr: 'Coupe courte' } }
  ];

  /* Photo-shoot expressions: which eye and mouth asset each one uses. */
  G.data.expressions = [
    { id: 'smile', eyes: 'open', mouth: 'smile', name: { en: 'Smile', fr: 'Sourire' } },
    { id: 'wink', eyes: 'wink', mouth: 'smile', name: { en: 'Wink', fr: 'Clin d\'œil' } },
    { id: 'laugh', eyes: 'happy', mouth: 'laugh', name: { en: 'Laugh', fr: 'Rire' } },
    { id: 'kiss', eyes: 'closed', mouth: 'kiss', name: { en: 'Kiss', fr: 'Bisou' } },
    { id: 'relax', eyes: 'closed', mouth: 'smile', hidden: true, name: { en: 'Relax', fr: 'Détente' } }
  ];
})(window.Game);
