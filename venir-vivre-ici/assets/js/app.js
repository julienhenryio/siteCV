/* ==========================================================================
   Gabarit commun : nom du service, en-tête, pied de page, données d'exemple.
   Chargé de façon synchrone en fin de <body>, avant le JS du DSFR.
   Le <body> déclare :
     data-titre   titre de la page (onglet du navigateur), {commune} remplacé
     data-espace  "candidat" (défaut) ou "mairie"
     data-nav     identifiant de l'entrée de menu active
     data-racine  chemin vers la racine du site pour les pages en sous-dossier (ex. "../")
   ========================================================================== */

(function () {
  "use strict";

  /* ---------- Nom du service (surcharge possible via ?nom=...) ---------- */
  function lireNom() {
    let nom = NOM_STARTUP;
    try {
      const param = new URLSearchParams(window.location.search).get("nom");
      if (param) sessionStorage.setItem("nom-startup", param);
      nom = sessionStorage.getItem("nom-startup") || NOM_STARTUP;
    } catch (e) { /* stockage indisponible : on garde la constante */ }
    return nom;
  }

  const NOM = lireNom();
  const body = document.body;
  const espace = body.dataset.espace || "candidat";
  const navActive = body.dataset.nav || "";
  const R = body.dataset.racine || "";

  /* ---------- Menus ---------- */
  const MENU_CANDIDAT = [
    { id: "accueil", label: "Accueil", href: "index.html" },
    { id: "recherche", label: "Trouver ma commune", href: "recherche.html" },
    { id: "simulateur", label: "Simuler mon budget", href: "simulateur.html" },
    { id: "sejour", label: "Séjours d'essai", href: "sejour.html" },
    { id: "logements", label: "Logements", href: "commune.html#logements" },
    { id: "emplois", label: "Emplois et reprises", href: "commune.html#emplois" }
  ];

  const MENU_MAIRIE = [
    { id: "tableau", label: "Tableau de bord", href: "mairie.html" },
    { id: "fiche", label: "Ma fiche commune", href: "mairie.html#fiche" },
    { id: "candidats", label: "Candidats", href: "mairie.html#candidats" },
    { id: "offres", label: "Logements, séjours et reprises", href: "mairie.html#offres" },
    { id: "messagerie", label: "Messagerie (3)", href: "mairie.html#messagerie" }
  ];

  function menuHTML(items) {
    return items.map(function (it) {
      const actif = it.id === navActive ? ' aria-current="page"' : "";
      return '<li class="fr-nav__item"><a class="fr-nav__link" href="' + it.href + '"' + actif + ">" + it.label + "</a></li>";
    }).join("");
  }

  function outilsHTML() {
    if (espace === "mairie") {
      return (
        '<li><a class="fr-btn fr-icon-government-line" href="mairie.html"><span>Mairie de <span data-demo="commune.nom"></span></span></a></li>' +
        '<li><a class="fr-btn fr-icon-arrow-go-back-line" href="index.html">Voir le site candidat</a></li>'
      );
    }
    return (
      '<li><a class="fr-btn fr-icon-government-line" href="mairie.html">Espace mairie</a></li>' +
      '<li><a class="fr-btn fr-icon-account-circle-line" href="sejour.html">Mon projet d\'installation</a></li>'
    );
  }

  /* ---------- En-tête DSFR ---------- */
  const tagline = espace === "mairie" ? "Espace des communes" : BASELINE;
  const enTete =
    '<header role="banner" class="fr-header">' +
      '<div class="fr-header__body"><div class="fr-container"><div class="fr-header__body-row">' +
        '<div class="fr-header__brand fr-enlarge-link">' +
          '<div class="fr-header__brand-top">' +
            '<div class="fr-header__logo"><p class="fr-logo">République<br>Française</p></div>' +
            '<div class="fr-header__navbar">' +
              '<button class="fr-btn--menu fr-btn" data-fr-opened="false" aria-controls="menu-principal" aria-haspopup="menu" id="bouton-menu" title="Menu">Menu</button>' +
            "</div>" +
          "</div>" +
          '<div class="fr-header__service">' +
            '<a href="' + (espace === "mairie" ? "mairie.html" : "index.html") + '" title="Accueil - ' + NOM + ' - République Française">' +
              '<p class="fr-header__service-title">' + NOM + ' <span class="fr-badge fr-badge--sm fr-badge--green-emeraude">BETA</span></p>' +
            "</a>" +
            '<p class="fr-header__service-tagline">' + tagline + "</p>" +
          "</div>" +
        "</div>" +
        '<div class="fr-header__tools"><div class="fr-header__tools-links"><ul class="fr-btns-group">' + outilsHTML() + "</ul></div></div>" +
      "</div></div></div>" +
      '<div class="fr-header__menu fr-modal" id="menu-principal" aria-labelledby="bouton-menu">' +
        '<div class="fr-container">' +
          '<button class="fr-btn--close fr-btn" aria-controls="menu-principal" title="Fermer">Fermer</button>' +
          '<div class="fr-header__menu-links"></div>' +
          '<nav class="fr-nav" role="navigation" aria-label="Menu principal"><ul class="fr-nav__list">' +
            menuHTML(espace === "mairie" ? MENU_MAIRIE : MENU_CANDIDAT) +
          "</ul></nav>" +
        "</div>" +
      "</div>" +
    "</header>";

  const bandeau = AFFICHER_BANDEAU_MAQUETTE
    ? '<div class="fr-notice fr-notice--info"><div class="fr-container"><div class="fr-notice__body"><p>' +
        '<span class="fr-notice__title">Maquette de démonstration.</span> ' +
        '<span class="fr-notice__desc">Les communes, les personnes et les chiffres présentés sont fictifs.</span>' +
      "</p></div></div></div>"
    : "";

  /* ---------- Pied de page DSFR ---------- */
  const pied =
    '<footer class="fr-footer fr-mt-0" role="contentinfo" id="footer">' +
      '<div class="fr-container">' +
        '<div class="fr-footer__body">' +
          '<div class="fr-footer__brand fr-enlarge-link">' +
            '<a href="index.html" title="Retour à l\'accueil du site - ' + NOM + ' - République Française"><p class="fr-logo">République<br>Française</p></a>' +
          "</div>" +
          '<div class="fr-footer__content">' +
            '<p class="fr-footer__content-desc"><span data-nom></span> met en relation les personnes qui souhaitent quitter la ville avec les communes rurales qui veulent les accueillir. ' +
            "Projet proposé à l'Incubateur des territoires de l'Agence nationale de la cohésion des territoires, selon l'approche beta.gouv.fr.</p>" +
            '<ul class="fr-footer__content-list">' +
              '<li class="fr-footer__content-item"><a class="fr-footer__content-link" target="_blank" rel="noopener" title="agence-cohesion-territoires.gouv.fr - nouvelle fenêtre" href="https://agence-cohesion-territoires.gouv.fr">agence-cohesion-territoires.gouv.fr</a></li>' +
              '<li class="fr-footer__content-item"><a class="fr-footer__content-link" target="_blank" rel="noopener" title="beta.gouv.fr - nouvelle fenêtre" href="https://beta.gouv.fr">beta.gouv.fr</a></li>' +
              '<li class="fr-footer__content-item"><a class="fr-footer__content-link" target="_blank" rel="noopener" title="data.gouv.fr - nouvelle fenêtre" href="https://www.data.gouv.fr">data.gouv.fr</a></li>' +
              '<li class="fr-footer__content-item"><a class="fr-footer__content-link" target="_blank" rel="noopener" title="service-public.gouv.fr - nouvelle fenêtre" href="https://www.service-public.gouv.fr">service-public.gouv.fr</a></li>' +
            "</ul>" +
          "</div>" +
        "</div>" +
        '<div class="fr-footer__bottom">' +
          '<ul class="fr-footer__bottom-list">' +
            '<li class="fr-footer__bottom-item"><a class="fr-footer__bottom-link" href="parcours.html">Parcours de démonstration</a></li>' +
            '<li class="fr-footer__bottom-item"><a class="fr-footer__bottom-link" href="video/">Vidéo de présentation</a></li>' +
            '<li class="fr-footer__bottom-item"><a class="fr-footer__bottom-link" href="#footer">Accessibilité : non conforme</a></li>' +
            '<li class="fr-footer__bottom-item"><a class="fr-footer__bottom-link" href="#footer">Mentions légales</a></li>' +
            '<li class="fr-footer__bottom-item"><a class="fr-footer__bottom-link" href="#footer">Données personnelles</a></li>' +
            '<li class="fr-footer__bottom-item"><a class="fr-footer__bottom-link" href="credits.html">Crédits photos</a></li>' +
          "</ul>" +
          '<div class="fr-footer__bottom-copy"><p>Sauf mention contraire, les contenus de ce site sont proposés sous <a href="https://github.com/etalab/licence-ouverte/blob/master/LO.md" target="_blank" rel="noopener" title="licence etalab-2.0 - nouvelle fenêtre">licence etalab-2.0</a></p></div>' +
        "</div>" +
      "</div>" +
    "</footer>";

  /* ---------- Fenêtre d'avertissement (site publié en ligne) ---------- */
  const avertissement =
    '<dialog id="avertissement" class="fr-modal" aria-labelledby="avertissement-titre" data-fr-concealing-backdrop="false">' +
      '<div class="fr-container fr-container--fluid fr-container-md"><div class="fr-grid-row fr-grid-row--center"><div class="fr-col-12 fr-col-md-10 fr-col-lg-8">' +
        '<div class="fr-modal__body">' +
          '<div class="fr-modal__header"></div>' +
          '<div class="fr-modal__content">' +
            '<h1 id="avertissement-titre" class="fr-modal__title"><span class="fr-icon-warning-line fr-icon--lg" aria-hidden="true"></span> Projet personnel, site non officiel</h1>' +
            "<p>Ce site est une <strong>maquette</strong> réalisée par " + AUTEUR + " à titre personnel, pour soumettre une idée à des proches.</p>" +
            "<p><strong>Il ne constitue en aucun cas un site officiel.</strong> Il n'émane d'aucune administration et n'engage aucun service de l'État. " +
            "Le Système de Design de l'État y est utilisé uniquement à titre d'illustration. Les communes, les personnes et les chiffres de démonstration sont fictifs.</p>" +
            '<div class="fr-callout fr-icon-lightbulb-line fr-mb-0">' +
              '<p class="fr-callout__title">Pour comprendre l\'idée en quelques minutes</p>' +
              '<p class="fr-callout__text fr-text--md">Le parcours de démonstration raconte, écran par écran, l\'histoire d\'une famille qui quitte Lyon pour un village.</p>' +
              '<ul class="fr-btns-group fr-btns-group--inline-md fr-btns-group--icon-left fr-btns-group--sm fr-mt-2w fr-mb-0">' +
                '<li><a class="fr-btn fr-icon-road-map-line" data-accepter href="parcours.html">Voir le parcours en 8 écrans</a></li>' +
                '<li><a class="fr-btn fr-btn--secondary fr-icon-play-circle-line" data-accepter href="video/">Regarder la vidéo</a></li>' +
              "</ul>" +
            "</div>" +
          "</div>" +
          '<div class="fr-modal__footer"><ul class="fr-btns-group fr-btns-group--right fr-btns-group--inline-lg">' +
            '<li><button class="fr-btn" type="button" data-accepter>J\'ai bien compris</button></li>' +
          "</ul></div>" +
        "</div>" +
      "</div></div></div>" +
    "</dialog>";

  /* ---------- Injection ---------- */
  const slotTete = document.getElementById("en-tete");
  const slotPied = document.getElementById("pied");
  if (slotTete) slotTete.outerHTML = enTete + bandeau;
  if (slotPied) slotPied.outerHTML = pied;

  let dejaAccepte = false;
  try { dejaAccepte = sessionStorage.getItem("avertissement-accepte") === "1"; } catch (e) { /* stockage indisponible */ }
  if (AFFICHER_AVERTISSEMENT && !dejaAccepte) {
    body.insertAdjacentHTML("beforeend", avertissement);
    const fenetre = document.getElementById("avertissement");
    fenetre.querySelectorAll("[data-accepter]").forEach(function (el) {
      el.addEventListener("click", function () {
        try { sessionStorage.setItem("avertissement-accepte", "1"); } catch (e) { /* stockage indisponible */ }
        if (el.tagName === "BUTTON") window.dsfr(fenetre).modal.conceal();
      });
    });
    // Ouverture dès que le JavaScript du DSFR a initialisé la modale (nouvel essai sinon)
    (function ouvrir(essai) {
      let modale = null;
      try { modale = window.dsfr && window.dsfr(fenetre).modal; } catch (e) { /* pas encore prêt */ }
      if (modale) modale.disclose();
      else if (essai < 100) setTimeout(function () { ouvrir(essai + 1); }, 50);
    })(0);
  }

  // Pages en sous-dossier : on préfixe les liens relatifs du gabarit
  if (R) {
    document.querySelectorAll(".fr-header a[href], .fr-footer a[href], #avertissement a[href]").forEach(function (a) {
      const href = a.getAttribute("href");
      if (!/^(https?:|#|\/)/.test(href)) a.setAttribute("href", R + href);
    });
  }

  const titre = (body.dataset.titre || "").replace("{commune}", DEMO.commune.nom);
  document.title = (titre ? titre + " — " : "") + NOM;

  document.querySelectorAll("[data-nom]").forEach(function (el) {
    el.textContent = NOM;
  });

  /* Données d'exemple : <span data-demo="commune.nom"></span> */
  document.querySelectorAll("[data-demo]").forEach(function (el) {
    const valeur = el.dataset.demo.split(".").reduce(function (obj, cle) {
      return obj == null ? undefined : obj[cle];
    }, DEMO);
    if (valeur !== undefined) el.textContent = valeur;
  });

  window.NOM_SERVICE = NOM;
})();
