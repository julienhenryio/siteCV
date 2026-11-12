/* All interface wording, in English and French. Scene code never contains text: it calls G.t('key').
   Item names live in the catalogs (js/data/*.js) as { en, fr } and are read with G.tn(item.name). */
(function (G) {
  'use strict';

  var STR = {
    en: {
      title: 'Glossy Days', tagline: 'Makeover · Dress up · Decorate · Pets · Photos',
      play: 'Play', continue: 'Continue', newGame: 'New game', newGameAsk: 'Start over? Your girl, room and photos will be erased.',
      yes: 'Yes', no: 'No', ok: 'OK', done: 'Done', next: 'Next', back: 'Back', skip: 'Skip', close: 'Close',
      home: 'Bedroom', sound: 'Sound', language: 'Français',
      // creation
      createTitle: 'Create your girl', herName: 'Her name', namePlaceholder: 'Type a name', defaultGirl: 'Star',
      skin: 'Skin', eyes: 'Eyes', hairStyle: 'Hair', hairColor: 'Hair color', tabFace: 'Her face', hairAcc: 'Hair accessories',
      petTitle: 'Choose your pet', petName: 'Pet name', defaultPuppy: 'Biscuit', defaultKitten: 'Mimi', petColor: 'Fur',
      letsGo: 'Let\'s go!',
      // hub
      makeover: 'Makeover', dressup: 'Dress Up', room: 'My Room', pet: 'Pet Care', photo: 'Photo Shoot', editGirl: 'My look',
      hubHint: 'Tap something in the room!',
      // makeover
      spa: 'Spa', makeup: 'Makeup', hair: 'Hair', spaAgain: 'Spa again',
      rubHint: 'Rub her face', rubCheeks: 'Rub her cheeks', rubEyes: 'Rub her eyelids', rubLips: 'Rub her lips', rubTemples: 'Rub beside her eyes', rubFace: 'Rub to remove',
      placeHint: 'Tap each eye', pluckHint: 'Tap the little hairs', relaxing: 'So relaxing…', spaDone: 'Glowing skin!',
      style: 'Style', color: 'Color',
      // dress up
      random: 'Surprise', undress: 'Clear', pattern: 'Pattern', pickItem: 'Pick an item, then choose its color and pattern',
      // room
      add: 'Add', remove: 'Remove', size: 'Size', dragHint: 'Drag to move', none: 'None', tapDecor: 'Tap a decoration to add it',
      // pet
      bath: 'Bath', petDress: 'Dress up', playOutside: 'Play outside',
      treatHint: 'Tap your pet to give a treat',
      petDirty: 'Time for a bath!', petRub: 'Rub your pet', petRinseFirst: 'Shampoo first!', petDryFirst: 'Rinse first!', petTreat: 'Yummy!', petClean: 'All clean!',
      // photo
      backdrop: 'Backdrop', expression: 'Face', stickers: 'Stickers', frame: 'Frame', caption: 'Caption', captionPlaceholder: 'Write something',
      snap: 'Snap!', album: 'Album', albumEmpty: 'No photos yet. Take one!', saved: 'Photo saved!', download: 'Download', del: 'Delete',
      showPet: 'Pet', photoHint: 'Drag her, the pet and the stickers',
      exportFail: 'The photo could not be saved here. Open the game with Play.command (or online) to save photos that use imported images.',
      // challenges
      challenge: 'Challenge', challenges: 'Challenges', free: 'Free play', go: 'Go!', finish: 'Finish', tryAgain: 'Play again',
      best: 'Best', stars: 'stars', newBest: 'New best!',
      unlocked: 'New reward!', locked: 'Earn {n} stars to unlock', rewards: 'Rewards',
      storageWarn: 'Saving is blocked in this browser, so progress will be lost when you close the page.'
    },
    fr: {
      title: 'Glossy Days', tagline: 'Maquillage · Mode · Déco · Animaux · Photos',
      play: 'Jouer', continue: 'Continuer', newGame: 'Nouvelle partie', newGameAsk: 'Recommencer ? Ta fille, ta chambre et tes photos seront effacées.',
      yes: 'Oui', no: 'Non', ok: 'OK', done: 'Terminé', next: 'Suivant', back: 'Retour', skip: 'Passer', close: 'Fermer',
      home: 'Chambre', sound: 'Son', language: 'English',
      createTitle: 'Crée ta fille', herName: 'Son prénom', namePlaceholder: 'Écris un prénom', defaultGirl: 'Star',
      skin: 'Peau', eyes: 'Yeux', hairStyle: 'Coiffure', hairColor: 'Couleur des cheveux', tabFace: 'Son visage', hairAcc: 'Accessoires',
      petTitle: 'Choisis ton animal', petName: 'Son nom', defaultPuppy: 'Biscuit', defaultKitten: 'Mimi', petColor: 'Pelage',
      letsGo: 'C\'est parti !',
      makeover: 'Maquillage', dressup: 'Dressing', room: 'Ma chambre', pet: 'Mon animal', photo: 'Séance photo', editGirl: 'Mon look',
      hubHint: 'Touche un objet de la chambre !',
      spa: 'Spa', makeup: 'Maquillage', hair: 'Coiffure', spaAgain: 'Refaire le spa',
      rubHint: 'Frotte son visage', rubCheeks: 'Frotte ses joues', rubEyes: 'Frotte ses paupières', rubLips: 'Frotte ses lèvres', rubTemples: 'Frotte à côté des yeux', rubFace: 'Frotte pour enlever',
      placeHint: 'Touche chaque œil', pluckHint: 'Touche les petits poils', relaxing: 'Trop relaxant…', spaDone: 'Peau éclatante !',
      style: 'Style', color: 'Couleur',
      random: 'Surprise', undress: 'Vider', pattern: 'Motif', pickItem: 'Choisis un vêtement, puis sa couleur et son motif',
      add: 'Ajouter', remove: 'Enlever', size: 'Taille', dragHint: 'Fais glisser pour déplacer', none: 'Aucun', tapDecor: 'Touche une déco pour l\'ajouter',
      bath: 'Bain', petDress: 'Habiller', playOutside: 'Jouer dehors',
      treatHint: 'Touche ton animal pour lui donner une friandise',
      petDirty: 'C\'est l\'heure du bain !', petRub: 'Frotte ton animal', petRinseFirst: 'D\'abord le shampoing !', petDryFirst: 'D\'abord le rinçage !', petTreat: 'Miam !', petClean: 'Tout propre !',
      backdrop: 'Décor', expression: 'Visage', stickers: 'Stickers', frame: 'Cadre', caption: 'Légende', captionPlaceholder: 'Écris quelque chose',
      snap: 'Clic !', album: 'Album', albumEmpty: 'Pas encore de photo. Prends-en une !', saved: 'Photo enregistrée !', download: 'Télécharger', del: 'Supprimer',
      showPet: 'Animal', photoHint: 'Fais glisser la fille, l\'animal et les stickers',
      exportFail: 'La photo n\'a pas pu être enregistrée ici. Ouvre le jeu avec Play.command (ou en ligne) pour enregistrer des photos avec des images importées.',
      challenge: 'Défi', challenges: 'Défis', free: 'Jeu libre', go: 'Go !', finish: 'Terminer', tryAgain: 'Rejouer',
      best: 'Record', stars: 'étoiles', newBest: 'Nouveau record !',
      unlocked: 'Nouvelle récompense !', locked: 'Gagne {n} étoiles pour débloquer', rewards: 'Récompenses',
      storageWarn: 'La sauvegarde est bloquée dans ce navigateur : la progression sera perdue en fermant la page.'
    }
  };

  G.i18n = {
    strings: STR,
    lang: function () { return (G.state && G.state.data && G.state.data.lang) || 'en'; },
    set: function (lang) {
      G.state.data.lang = lang;
      G.state.save();
      document.documentElement.lang = lang;
    },
    toggle: function () { this.set(this.lang() === 'en' ? 'fr' : 'en'); }
  };

  /* Interface text by key, with {n}-style placeholders. */
  G.t = function (key, vars) {
    var s = (STR[G.i18n.lang()] || STR.en)[key];
    if (s == null) s = STR.en[key] != null ? STR.en[key] : key;
    if (vars) for (var k in vars) s = s.replace('{' + k + '}', vars[k]);
    return s;
  };
  /* Catalog name object { en, fr } -> text in the current language. */
  G.tn = function (name) {
    if (!name) return '';
    if (typeof name === 'string') return name;
    return name[G.i18n.lang()] || name.en || '';
  };
})(window.Game);
