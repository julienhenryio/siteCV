/* The one list of game scripts, in load order.
   Used by index.html (the game), tools/gallery.html and tools/build-assets.mjs. */
window.GAME_SCRIPT_LIST = [
  'js/core/svg.js',
  'js/art/patterns.js',
  'js/core/assets.js',

  // catalogs (data only)
  'js/data/hair.js',
  'js/data/makeup.js',
  'js/data/clothes.js',
  'js/data/room.js',
  'js/data/pet.js',
  'js/data/photo.js',
  'js/data/sounds.js',
  'js/data/challenges.js',

  // built-in art, registered by ID
  'js/art/icons.js',
  'js/art/doll.js',
  'js/art/hair.js',
  'js/art/clothes.js',
  'js/art/accessories.js',
  'js/art/roomart.js',
  'js/art/petart.js',
  'js/art/backdrops.js',

  // engine
  'js/core/state.js',
  'js/core/i18n.js',
  'js/core/audio.js',
  'js/core/doll.js',
  'js/core/room.js',
  'js/core/pet.js',
  'js/core/fx.js',
  'js/core/ui.js',
  'js/core/drag.js',
  'js/core/unlocks.js',
  'js/core/challenges.js',
  'js/core/scenes.js',

  // screens
  'js/scenes/title.js',
  'js/scenes/create.js',
  'js/scenes/hub.js',
  'js/scenes/makeover.js',
  'js/scenes/dressup.js',
  'js/scenes/room.js',
  'js/scenes/pet.js',
  'js/scenes/photo.js',

  'js/main.js'
];
