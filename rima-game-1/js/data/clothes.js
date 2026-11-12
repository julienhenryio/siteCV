/* Catalog: wardrobe. Data only; the pictures live in js/art/clothes.js and js/art/accessories.js
   (or in assets/custom/ if overridden).

   To add an item: add a line here and register its art under the same id.
     slot    where it is worn (one item per slot)
     style   casual | glam | sporty | beach  (used by challenges)
     color   default color, pattern  default pattern
     unlock  stars needed (omit for free items) */
(function (G) {
  'use strict';
  G.data = G.data || {};

  var DENIM = '#6fa8ff';

  G.data.clothes = [
    // tops
    { id: 'clothes.top.babytee', slot: 'top', style: 'casual', color: '#ff8cc6', name: { en: 'Baby tee', fr: 'Baby tee' } },
    { id: 'clothes.top.butterfly', slot: 'top', style: 'glam', color: '#c58bff', pattern: 'glitter', name: { en: 'Butterfly top', fr: 'Haut papillon' } },
    { id: 'clothes.top.cami', slot: 'top', style: 'casual', color: '#fff27a', name: { en: 'Camisole', fr: 'Caraco' } },
    { id: 'clothes.top.hoodie', slot: 'top', style: 'sporty', color: '#b39dff', name: { en: 'Hoodie', fr: 'Sweat à capuche' } },
    { id: 'clothes.top.halter', slot: 'top', style: 'glam', color: '#ff4fa0', pattern: 'glitter', name: { en: 'Halter top', fr: 'Dos nu' } },
    { id: 'clothes.top.offshoulder', slot: 'top', style: 'casual', color: '#ffffff', name: { en: 'Off-shoulder top', fr: 'Haut épaules nues' } },
    { id: 'clothes.top.sportcrop', slot: 'top', style: 'sporty', color: '#59d6c0', name: { en: 'Sport crop', fr: 'Brassière de sport' } },
    { id: 'clothes.top.tube', slot: 'top', style: 'glam', color: '#ff5a5a', name: { en: 'Tube top', fr: 'Bustier' } },
    { id: 'clothes.top.bikini', slot: 'top', style: 'beach', color: '#ff7fc4', pattern: 'dots', name: { en: 'Bikini top', fr: 'Haut de bikini' } },

    // bottoms
    { id: 'clothes.bottom.flarejeans', slot: 'bottom', style: 'casual', color: DENIM, name: { en: 'Flared jeans', fr: 'Jean évasé' } },
    { id: 'clothes.bottom.pleatskirt', slot: 'bottom', style: 'casual', color: '#ff8cc6', pattern: 'plaid', name: { en: 'Pleated skirt', fr: 'Jupe plissée' } },
    { id: 'clothes.bottom.cargo', slot: 'bottom', style: 'casual', color: '#cdb892', name: { en: 'Cargo pants', fr: 'Pantalon cargo' } },
    { id: 'clothes.bottom.shorts', slot: 'bottom', style: 'beach', color: DENIM, name: { en: 'Denim shorts', fr: 'Short en jean' } },
    { id: 'clothes.bottom.capri', slot: 'bottom', style: 'casual', color: '#ffffff', name: { en: 'Capri pants', fr: 'Pantacourt' } },
    { id: 'clothes.bottom.glamskirt', slot: 'bottom', style: 'glam', color: '#b06cff', pattern: 'glitter', name: { en: 'Party skirt', fr: 'Jupe de soirée' } },
    { id: 'clothes.bottom.trackpants', slot: 'bottom', style: 'sporty', color: '#ff4fa0', name: { en: 'Track pants', fr: 'Jogging' } },
    { id: 'clothes.bottom.sportshorts', slot: 'bottom', style: 'sporty', color: '#5fb6ff', name: { en: 'Sport shorts', fr: 'Short de sport' } },
    { id: 'clothes.bottom.sarong', slot: 'bottom', style: 'beach', color: '#ffb347', pattern: 'flowers', name: { en: 'Sarong', fr: 'Paréo' } },

    // dresses (replace top + bottom)
    { id: 'clothes.dress.party', slot: 'dress', style: 'glam', color: '#ff4fa0', name: { en: 'Ruffle party dress', fr: 'Robe à volants' } },
    { id: 'clothes.dress.slip', slot: 'dress', style: 'glam', color: '#c58bff', name: { en: 'Slip dress', fr: 'Robe nuisette' } },
    { id: 'clothes.dress.gown', slot: 'dress', style: 'glam', color: '#e0245e', pattern: 'glitter', name: { en: 'Evening gown', fr: 'Robe de soirée' } },
    { id: 'clothes.dress.sundress', slot: 'dress', style: 'beach', color: '#7fd4ff', pattern: 'flowers', name: { en: 'Sundress', fr: 'Robe d\'été' } },
    { id: 'clothes.dress.teedress', slot: 'dress', style: 'casual', color: '#ff8cc6', name: { en: 'T-shirt dress', fr: 'Robe t-shirt' } },
    { id: 'clothes.dress.tennis', slot: 'dress', style: 'sporty', color: '#ffffff', name: { en: 'Tennis dress', fr: 'Robe de tennis' } },
    { id: 'clothes.dress.swimsuit', slot: 'dress', style: 'beach', color: '#ff5a5a', name: { en: 'Swimsuit', fr: 'Maillot de bain' } },
    { id: 'clothes.dress.ballgown', slot: 'dress', style: 'glam', color: '#ff9fd6', unlock: 12, name: { en: 'Princess gown', fr: 'Robe de princesse' } },

    // shoes
    { id: 'clothes.shoes.platform', slot: 'shoes', style: 'casual', color: '#ff4fa0', name: { en: 'Platform sandals', fr: 'Sandales compensées' } },
    { id: 'clothes.shoes.sneakers', slot: 'shoes', style: 'sporty', color: '#ff8cc6', name: { en: 'Sneakers', fr: 'Baskets' } },
    { id: 'clothes.shoes.heels', slot: 'shoes', style: 'glam', color: '#e0245e', name: { en: 'High heels', fr: 'Talons hauts' } },
    { id: 'clothes.shoes.boots', slot: 'shoes', style: 'glam', color: '#2b2330', name: { en: 'Knee boots', fr: 'Bottes hautes' } },
    { id: 'clothes.shoes.flats', slot: 'shoes', style: 'casual', color: '#c58bff', name: { en: 'Ballet flats', fr: 'Ballerines' } },
    { id: 'clothes.shoes.flipflops', slot: 'shoes', style: 'beach', color: '#59d6c0', name: { en: 'Flip-flops', fr: 'Tongs' } },
    { id: 'clothes.shoes.fluffy', slot: 'shoes', style: 'casual', color: '#d9a66b', name: { en: 'Fluffy boots', fr: 'Bottes fourrées' } },

    // jackets
    { id: 'clothes.jacket.denim', slot: 'jacket', style: 'casual', color: DENIM, name: { en: 'Denim jacket', fr: 'Veste en jean' } },
    { id: 'clothes.jacket.track', slot: 'jacket', style: 'sporty', color: '#ff4fa0', name: { en: 'Track jacket', fr: 'Veste de sport' } },
    { id: 'clothes.jacket.furshrug', slot: 'jacket', style: 'glam', color: '#ffffff', name: { en: 'Fluffy shrug', fr: 'Boléro en fourrure' } },
    { id: 'clothes.jacket.cardigan', slot: 'jacket', style: 'casual', color: '#ffd1ea', name: { en: 'Cardigan', fr: 'Gilet' } },

    // bags
    { id: 'acc.bag.shoulder', slot: 'bag', style: 'casual', color: '#ff4fa0', name: { en: 'Shoulder bag', fr: 'Sac baguette' } },
    { id: 'acc.bag.clutch', slot: 'bag', style: 'glam', color: '#ffd84a', pattern: 'glitter', name: { en: 'Clutch', fr: 'Pochette' } },
    { id: 'acc.bag.tote', slot: 'bag', style: 'beach', color: '#7fd4ff', pattern: 'stripes', name: { en: 'Beach tote', fr: 'Sac de plage' } },

    // jewelry
    { id: 'acc.necklace.choker', slot: 'necklace', style: 'casual', color: '#2b2330', name: { en: 'Choker', fr: 'Ras-du-cou' } },
    { id: 'acc.necklace.pearls', slot: 'necklace', style: 'glam', color: '#fff5fb', name: { en: 'Pearls', fr: 'Collier de perles' } },
    { id: 'acc.necklace.pendant', slot: 'necklace', style: 'casual', color: '#ff4fa0', name: { en: 'Heart pendant', fr: 'Pendentif cœur' } },
    { id: 'acc.earrings.hoops', slot: 'earrings', style: 'glam', color: '#ffd84a', name: { en: 'Hoops', fr: 'Créoles' } },
    { id: 'acc.earrings.stars', slot: 'earrings', style: 'casual', color: '#ffd84a', name: { en: 'Star studs', fr: 'Clous étoiles' } },
    { id: 'acc.earrings.drops', slot: 'earrings', style: 'glam', color: '#5fb6ff', name: { en: 'Gem drops', fr: 'Pendants' } },
    { id: 'acc.belt.chain', slot: 'belt', style: 'casual', color: '#ffffff', name: { en: 'Hip belt', fr: 'Ceinture taille basse' } },

    // head
    { id: 'acc.glasses.shades', slot: 'glasses', style: 'beach', color: '#ff7fc4', name: { en: 'Tinted shades', fr: 'Lunettes teintées' } },
    { id: 'acc.glasses.hearts', slot: 'glasses', style: 'casual', color: '#ff5a5a', name: { en: 'Heart glasses', fr: 'Lunettes cœur' } },
    { id: 'acc.hat.bucket', slot: 'hat', style: 'casual', color: '#ff8cc6', name: { en: 'Bucket hat', fr: 'Bob' } },
    { id: 'acc.hat.cap', slot: 'hat', style: 'sporty', color: '#5fb6ff', name: { en: 'Cap', fr: 'Casquette' } },
    { id: 'acc.hat.sunhat', slot: 'hat', style: 'beach', color: '#ffe9a8', name: { en: 'Sun hat', fr: 'Chapeau de paille' } },
    { id: 'acc.hat.tiara', slot: 'hat', style: 'glam', color: '#ff4fa0', unlock: 3, name: { en: 'Tiara', fr: 'Diadème' } },
    { id: 'acc.hairacc.bow', slot: 'hairacc', style: 'casual', color: '#ff4fa0', name: { en: 'Hair bow', fr: 'Nœud' } },
    { id: 'acc.hairacc.clips', slot: 'hairacc', style: 'casual', color: '#7fd4ff', name: { en: 'Butterfly clips', fr: 'Barrettes papillon' } },
    { id: 'acc.hairacc.headband', slot: 'hairacc', style: 'sporty', color: '#b06cff', name: { en: 'Headband', fr: 'Serre-tête' } },
    { id: 'acc.hairacc.flower', slot: 'hairacc', style: 'beach', color: '#ff5a8a', name: { en: 'Hair flower', fr: 'Fleur' } },
    { id: 'acc.wings.fairy', slot: 'wings', style: 'glam', color: '#c9a4ff', pattern: 'holo', unlock: 20, name: { en: 'Fairy wings', fr: 'Ailes de fée' } }
  ];

  /* Wardrobe tabs: which slots each tab shows, and the thumbnail crop (doll space viewBox). */
  G.data.wardrobeTabs = [
    { id: 'top', icon: 'top', slots: ['top'], view: '150 300 300 300', name: { en: 'Tops', fr: 'Hauts' } },
    { id: 'bottom', icon: 'bottom', slots: ['bottom'], view: '100 540 400 700', name: { en: 'Bottoms', fr: 'Bas' } },
    { id: 'dress', icon: 'dress', slots: ['dress'], view: '40 300 520 960', name: { en: 'Dresses', fr: 'Robes' } },
    { id: 'shoes', icon: 'shoe', slots: ['shoes'], view: '180 900 240 390', name: { en: 'Shoes', fr: 'Chaussures' } },
    { id: 'jacket', icon: 'jacket', slots: ['jacket'], view: '120 300 360 400', name: { en: 'Jackets', fr: 'Vestes' } },
    { id: 'bag', icon: 'bag', slots: ['bag', 'belt', 'wings'], name: { en: 'Bags & extras', fr: 'Sacs et extras' } },
    { id: 'jewel', icon: 'gem', slots: ['necklace', 'earrings'], name: { en: 'Jewelry', fr: 'Bijoux' } },
    { id: 'head', icon: 'hat', slots: ['hat', 'glasses', 'hairacc'], name: { en: 'Head', fr: 'Tête' } }
  ];

  /* Thumbnail crops for accessory slots (head items use head-native coordinates). */
  G.data.slotViews = {
    bag: '90 560 420 400', belt: '200 520 200 200', wings: '20 200 560 480',
    necklace: '230 290 140 140', earrings: '160 150 280 130', glasses: '180 130 240 120',
    hat: '90 -40 420 240', hairacc: '170 20 260 160'
  };

  /* Colors offered for clothes, room items and pet accessories. */
  G.data.palette = ['#ffffff', '#2b2330', '#9aa0b0', '#ff4fa0', '#ff8cc6', '#ffd1ea', '#e0245e', '#ff5a5a', '#ffb347', '#fff27a',
    '#9be36a', '#59d6c0', '#7fd4ff', DENIM, '#3f5fd6', '#b06cff', '#e3c6ff', '#cdb892', '#8a5a3c', '#ffd84a'];

  var it = function (id, color, pattern) { return { id: id, color: color, pattern: pattern || 'solid' }; };
  /* Ready-made looks: the starting outfit and the gallery samples. */
  G.data.sampleOutfits = [
    { top: it('clothes.top.babytee', '#ff8cc6'), bottom: it('clothes.bottom.flarejeans', DENIM), shoes: it('clothes.shoes.platform', '#ff4fa0'), bag: it('acc.bag.shoulder', '#ff4fa0'), necklace: it('acc.necklace.choker', '#2b2330') },
    { dress: it('clothes.dress.party', '#ff4fa0'), shoes: it('clothes.shoes.heels', '#e0245e'), jacket: it('clothes.jacket.furshrug', '#ffffff'), bag: it('acc.bag.clutch', '#ffd84a', 'glitter'), earrings: it('acc.earrings.hoops', '#ffd84a') },
    { top: it('clothes.top.hoodie', '#b39dff'), bottom: it('clothes.bottom.trackpants', '#ff4fa0'), shoes: it('clothes.shoes.sneakers', '#ff8cc6'), hat: it('acc.hat.cap', '#5fb6ff') },
    { top: it('clothes.top.bikini', '#ff7fc4', 'dots'), bottom: it('clothes.bottom.sarong', '#ffb347', 'flowers'), shoes: it('clothes.shoes.flipflops', '#59d6c0'), bag: it('acc.bag.tote', '#7fd4ff', 'stripes'), glasses: it('acc.glasses.shades', '#ff7fc4'), hat: it('acc.hat.sunhat', '#ffe9a8') },
    { top: it('clothes.top.butterfly', '#c58bff', 'glitter'), bottom: it('clothes.bottom.pleatskirt', '#ff8cc6', 'plaid'), shoes: it('clothes.shoes.boots', '#2b2330'), jacket: it('clothes.jacket.denim', DENIM), hairacc: it('acc.hairacc.clips', '#7fd4ff'), belt: it('acc.belt.chain', '#ffffff') },
    { dress: it('clothes.dress.gown', '#e0245e', 'glitter'), shoes: it('clothes.shoes.heels', '#e0245e'), necklace: it('acc.necklace.pearls', '#fff5fb'), earrings: it('acc.earrings.drops', '#5fb6ff'), hat: it('acc.hat.tiara', '#ff4fa0') },
    { dress: it('clothes.dress.sundress', '#7fd4ff', 'flowers'), shoes: it('clothes.shoes.flats', '#c58bff'), hairacc: it('acc.hairacc.flower', '#ff5a8a'), necklace: it('acc.necklace.pendant', '#ff4fa0') },
    { dress: it('clothes.dress.ballgown', '#ff9fd6'), shoes: it('clothes.shoes.heels', '#ff8cc6'), wings: it('acc.wings.fairy', '#c9a4ff', 'holo'), hairacc: it('acc.hairacc.bow', '#ff4fa0') }
  ];

  G.data.clothesById = {};
  G.data.clothes.forEach(function (c) { G.data.clothesById[c.id] = c; });
})(window.Game);
