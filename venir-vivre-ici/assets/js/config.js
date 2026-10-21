/* ==========================================================================
   CONFIGURATION DU PROTOTYPE
   --------------------------------------------------------------------------
   NOM_STARTUP est la SEULE définition du nom du service.
   Il est injecté partout (titres d'onglet, en-tête, pied de page, textes)
   via les éléments portant l'attribut [data-nom].

   Alternatives envisagées :
     - "Une place au village"
     - "Mon prochain village"

   Astuce démo : on peut tester un autre nom sans modifier ce fichier en
   ajoutant ?nom=Une%20place%20au%20village à l'URL (mémorisé pour la session).
   ========================================================================== */

const NOM_STARTUP = "Venir vivre ici";

/* Accroche affichée sous le nom du service dans l'en-tête */
const BASELINE = "Le service public pour s'installer dans une commune rurale";

/* Auteur du projet, cité dans la fenêtre d'avertissement */
const AUTEUR = "Julien Henry";

/* Fenêtre d'avertissement "projet personnel, non officiel" à l'ouverture (une fois par session) */
const AFFICHER_AVERTISSEMENT = true;

/* Bandeau "maquette" en haut de page (mettre à false pour les captures vidéo) */
const AFFICHER_BANDEAU_MAQUETTE = true;


/* ==========================================================================
   DONNÉES D'EXEMPLE — fictives et cohérentes d'un écran à l'autre
   ========================================================================== */

const DEMO = {
  /* La famille fictive qui sert de fil rouge */
  famille: {
    nom: "Moreau",
    adultes: "Camille et Thomas",
    enfants: [
      { prenom: "Léo", age: 7 },
      { prenom: "Jeanne", age: 4 }
    ],
    villeActuelle: "Lyon 7e",
    logementActuel: "T3 de 64 m²",
    loyerActuel: 1380,
    metiers: "Camille : cheffe de projet numérique en télétravail 4 jours sur 5 · Thomas : infirmier"
  },

  /* La commune fictive */
  commune: {
    nom: "Saint-Aurèle",
    departement: "Loire (42)",
    region: "Auvergne-Rhône-Alpes",
    habitants: 642,
    maire: "Hélène Garnier",
    referent: "Karim Benali"
  },

  /* Dates du séjour d'essai demandé */
  sejour: {
    debut: "lundi 16 novembre 2026",
    fin: "dimanche 29 novembre 2026",
    court: "du 16 au 29 novembre 2026"
  }
};
