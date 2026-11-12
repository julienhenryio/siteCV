/* Catalog: pets, bath tools and pet accessories. Data only; pictures are in js/art/petart.js. */
(function (G) {
  'use strict';
  G.data = G.data || {};

  G.data.petTypes = [
    { id: 'puppy', icon: 'puppy', color: '#f2c48a', sound: 'sfx.bark', name: { en: 'Puppy', fr: 'Chiot' } },
    { id: 'kitten', icon: 'kitten', color: '#d9dbe8', sound: 'sfx.meow', name: { en: 'Kitten', fr: 'Chaton' } }
  ];

  G.data.petColors = ['#f2c48a', '#d9a066', '#8a5a3c', '#ffffff', '#d9dbe8', '#5a5360', '#ffb86b', '#ffc2e2'];

  /* Bath tools, in the natural order. `needs` = what must be true before the tool does anything. */
  G.data.petTools = [
    { id: 'shampoo', icon: 'shampoo', sound: 'sfx.bubble', name: { en: 'Shampoo', fr: 'Shampoing' } },
    { id: 'shower', icon: 'shower', sound: 'sfx.splash', name: { en: 'Rinse', fr: 'Rincer' } },
    { id: 'towel', icon: 'towel', sound: 'sfx.rub', name: { en: 'Dry', fr: 'Sécher' } },
    { id: 'brush', icon: 'brush', sound: 'sfx.rub', name: { en: 'Brush', fr: 'Brosser' } },
    { id: 'treat', icon: 'treat', sound: 'sfx.pop', name: { en: 'Treat', fr: 'Friandise' } }
  ];

  /* Accessories: one per slot. */
  G.data.petSlots = [
    { id: 'bow', icon: 'petbow', view: '60 0 280 300', name: { en: 'Bows', fr: 'Nœuds' } },
    { id: 'collar', icon: 'collar', view: '80 190 240 160', name: { en: 'Collars', fr: 'Colliers' } },
    { id: 'hat', icon: 'hat', view: '80 -40 240 190', name: { en: 'Hats', fr: 'Chapeaux' } },
    { id: 'outfit', icon: 'petoutfit', view: '40 220 320 200', name: { en: 'Outfits', fr: 'Tenues' } }
  ];
  G.data.petAcc = [
    { id: 'petacc.bow.classic', slot: 'bow', color: '#ff4fa0', name: { en: 'Head bow', fr: 'Nœud' } },
    { id: 'petacc.bow.flower', slot: 'bow', color: '#ff8cc6', name: { en: 'Flower', fr: 'Fleur' } },
    { id: 'petacc.bow.tie', slot: 'bow', color: '#7fd4ff', name: { en: 'Bow tie', fr: 'Nœud papillon' } },
    { id: 'petacc.collar.heart', slot: 'collar', color: '#ff4fa0', name: { en: 'Heart collar', fr: 'Collier cœur' } },
    { id: 'petacc.collar.bell', slot: 'collar', color: '#e0245e', name: { en: 'Bell collar', fr: 'Collier grelot' } },
    { id: 'petacc.collar.bandana', slot: 'collar', color: '#7fd4ff', pattern: 'dots', name: { en: 'Bandana', fr: 'Bandana' } },
    { id: 'petacc.collar.pearls', slot: 'collar', color: '#fff5fb', name: { en: 'Pearls', fr: 'Perles' } },
    { id: 'petacc.hat.party', slot: 'hat', color: '#b06cff', pattern: 'stripes', name: { en: 'Party hat', fr: 'Chapeau de fête' } },
    { id: 'petacc.hat.beanie', slot: 'hat', color: '#ff8cc6', name: { en: 'Beanie', fr: 'Bonnet' } },
    { id: 'petacc.hat.crown', slot: 'hat', color: '#ff4fa0', name: { en: 'Crown', fr: 'Couronne' } },
    { id: 'petacc.outfit.tee', slot: 'outfit', color: '#ff4fa0', name: { en: 'Striped tee', fr: 'T-shirt rayé' } },
    { id: 'petacc.outfit.tutu', slot: 'outfit', color: '#ff8cc6', name: { en: 'Tutu', fr: 'Tutu' } },
    { id: 'petacc.outfit.cape', slot: 'outfit', color: '#b06cff', unlock: 16, name: { en: 'Superstar cape', fr: 'Cape de star' } }
  ];
  G.data.petAccById = {};
  G.data.petAcc.forEach(function (a) { G.data.petAccById[a.id] = a; });
})(window.Game);
