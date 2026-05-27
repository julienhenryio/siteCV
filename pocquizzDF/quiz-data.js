// ─────────────────────────────────────────────────────────────────────────
// Banque de questions — Cas de tolérance DossierFacile (portail opérateur)
//
// Champs :
//   id          : identifiant stable
//   type        : 'tf' (vrai/faux) | 'single' (QCM) | 'multi' (QCM multi-réponses)
//   profile     : 'locataire' | 'garant' | 'both' | 'cross'
//                 → 'cross' = question testant la différence entre profils
//   category    : intitulé court (affiché en tag)
//   question    : énoncé
//   options     : tableau (pour tf, options = ['Vrai','Faux'] implicite)
//   correct     : tableau d'indices corrects (TOUJOURS un tableau)
//                 - tf    : [0] = Vrai, [1] = Faux
//                 - single: [idx]
//                 - multi : [idx1, idx2, ...]
//   explanation : feedback affiché après réponse
// ─────────────────────────────────────────────────────────────────────────

window.QUIZ_TOLERANCE = [

  // ═══════════════════════════════════════════════════
  // LOCATAIRE — règles spécifiques
  // ═══════════════════════════════════════════════════

  {
    id: 'L-quittance-1passage',
    type: 'single',
    profile: 'locataire',
    category: 'Quittance de loyer',
    question: "Au 1er passage, le locataire fournit des quittances de novembre et janvier (les 3 derniers mois demandés étant novembre, décembre, janvier). Que faire ?",
    options: [
      "Refuser, exiger les 3 mois consécutifs",
      "Accepter — 2 quittances non consécutives parmi les 3 derniers mois suffisent",
      "Refuser et basculer en preuve de virement"
    ],
    correct: [1],
    explanation: "Au 1er passage, on accepte 2 quittances non consécutives parmi les 3 derniers mois. La règle ne se durcit qu'après un 1er refus (1 seule quittance suffit), puis après un 2e refus (facture, avis d'échéance non soldé ou quittance initialement refusée)."
  },
  {
    id: 'L-quittance-1refus',
    type: 'tf',
    profile: 'locataire',
    category: 'Quittance de loyer',
    question: "Après un 1er refus sur les quittances, 1 seule quittance parmi les 3 derniers mois suffit — même si ce n'est pas la plus récente.",
    correct: [0],
    explanation: "Vrai. Après un 1er refus, on accepte 1 seule quittance parmi les 3 derniers mois — la plus récente n'est pas exigée."
  },
  {
    id: 'L-quittance-2refus',
    type: 'multi',
    profile: 'locataire',
    category: 'Quittance de loyer',
    question: "Après un 2e refus sur les quittances de loyer, quels documents peut-on tolérer ?",
    options: [
      "Une facture",
      "Un avis d'échéance non soldé",
      "Une quittance initialement non acceptée",
      "Un échange de mails avec le propriétaire"
    ],
    correct: [0, 1, 2],
    explanation: "Après un 2e refus, on tolère : une facture, un avis d'échéance non soldé, ou une quittance initialement non acceptée. Un simple échange de mails avec le propriétaire n'est pas une preuve recevable."
  },
  {
    id: 'L-crous-cadre-vide',
    type: 'tf',
    profile: 'locataire',
    category: "Avis d'échéance CROUS",
    question: "L'avis d'échéance CROUS est accepté même si le cadre en bas à droite est vide.",
    correct: [0],
    explanation: "Vrai. Cette tolérance évite de bloquer les dossiers étudiants pour un encart administratif non rempli par le CROUS."
  },
  {
    id: 'L-attest-heberg-etudiant',
    type: 'single',
    profile: 'locataire',
    category: "Attestation d'hébergement",
    question: "Un locataire étudiant fournit une attestation d'hébergement non datée. Comment réagir au 1er passage ?",
    options: [
      "Accepter directement — c'est toléré pour les étudiants",
      "Refuser au 1er passage ; l'attestation pourra être acceptée après un 1er refus",
      "Refuser et exiger une attestation datée de moins de 6 mois"
    ],
    correct: [1],
    explanation: "Pour un étudiant, une attestation d'hébergement non datée est refusée au 1er passage, mais acceptée au 1er refus. Pour un non-étudiant, on exige systématiquement une attestation datée de moins de 6 mois."
  },
  {
    id: 'L-attest-heberg-non-etudiant',
    type: 'tf',
    profile: 'locataire',
    category: "Attestation d'hébergement",
    question: "Pour un locataire non-étudiant, une attestation d'hébergement non datée peut être acceptée après un 1er refus.",
    correct: [1],
    explanation: "Faux. Pour un non-étudiant, l'attestation non datée est refusée — on demande systématiquement une attestation datée de moins de 6 mois. La tolérance « 1er refus » ne s'applique qu'aux étudiants."
  },
  {
    id: 'L-dossier-couple',
    type: 'single',
    profile: 'locataire',
    category: 'Dossier couple',
    question: "Dans un dossier couple locataire, les quittances de loyer sont au nom du conjoint et non au nom du locataire titulaire du dossier. Comment réagir ?",
    options: [
      "Refuser, exiger des quittances au nom du locataire",
      "Accepter — le document au nom du conjoint est valide dans un dossier couple",
      "Demander un acte de mariage ou un PACS en complément"
    ],
    correct: [1],
    explanation: "Dans un dossier couple, si les quittances ou la taxe foncière sont au nom du conjoint plutôt qu'au nom du locataire, c'est accepté sans condition supplémentaire."
  },
  {
    id: 'L-fonction-publique-1passage',
    type: 'single',
    profile: 'locataire',
    category: 'Fonction publique',
    question: "Un agent de la fonction publique fournit une capture d'écran de son espace carrière comme justificatif de situation professionnelle. Au 1er passage, comment réagir ?",
    options: [
      "Refuser, exiger l'arrêté de nomination ou une attestation employeur",
      "Accepter — la capture d'écran de l'espace carrière vaut justificatif au 1er passage",
      "Refuser et demander un bulletin de paie de moins de 3 mois"
    ],
    correct: [1],
    explanation: "Au 1er passage, une capture d'écran de l'espace carrière de l'agent est acceptée. Ce n'est qu'après un 1er refus qu'un bulletin de paie de moins de 3 mois peut être accepté en remplacement de l'arrêté de nomination ou de l'attestation employeur."
  },
  {
    id: 'L-fonction-publique-apres-refus',
    type: 'tf',
    profile: 'locataire',
    category: 'Fonction publique',
    question: "Après un 1er refus sur la situation professionnelle d'un agent de la fonction publique, un bulletin de paie de moins de 3 mois peut être accepté en remplacement de l'arrêté de nomination.",
    correct: [0],
    explanation: "Vrai. Le bulletin de paie de moins de 3 mois est une tolérance applicable après un 1er refus dans le cas de la fonction publique."
  },
  {
    id: 'L-bulletin-decalage',
    type: 'single',
    profile: 'locataire',
    category: 'Bulletin de paie',
    question: "Les bulletins de paie attendus sont février, mars et avril. Le locataire fournit janvier, février et mars. Que faire ?",
    options: [
      "Refuser l'ensemble — les mois ne correspondent pas",
      "Accepter — un décalage d'1 mois par rapport aux mois demandés est toléré"
    ],
    correct: [1],
    explanation: "On accepte avec 1 mois de décalage par rapport aux mois demandés. Un décalage supérieur (ex : décembre/janvier/février quand février/mars/avril sont attendus) serait en revanche refusé."
  },
  {
    id: 'L-caf-msa',
    type: 'tf',
    profile: 'locataire',
    category: 'CAF / MSA',
    question: "Si la dernière attestation CAF/MSA (mois M-1 ou plus récent) est présente, le dossier peut être accepté dès le 1er passage, même si les attestations des mois antérieurs sont manquantes.",
    correct: [0],
    explanation: "Vrai. La présence de la dernière attestation (M-1 ou plus récent) suffit à valider la cohérence des ressources et permet d'accepter le dossier dès le 1er passage."
  },
  {
    id: 'L-bourse-crous-ete',
    type: 'single',
    profile: 'locataire',
    category: 'Bourse / CROUS',
    question: "Durant la période estivale, quel document spécifique le CROUS délivre-t-il et qui est accepté comme justificatif de bourse ?",
    options: [
      "Un récapitulatif des bourses de l'année précédente",
      "La notification d'attribution conditionnelle",
      "Aucun document n'est accepté pendant l'été"
    ],
    correct: [1],
    explanation: "Durant la période estivale, la « Notification d'attribution conditionnelle » délivrée par le CROUS est acceptée comme justificatif de bourse."
  },
  {
    id: 'L-avis-impo-commentaires',
    type: 'tf',
    profile: 'locataire',
    category: "Avis d'imposition",
    question: "Pour les avis d'imposition, l'opérateur doit lire attentivement les commentaires laissés par l'utilisateur lors du dépôt du document.",
    correct: [0],
    explanation: "Vrai. Les commentaires de l'utilisateur peuvent expliquer une situation particulière (ex : avis 2025 pas encore reçu) et conditionner l'acceptation du document."
  },

  // ═══════════════════════════════════════════════════
  // GARANT — règles spécifiques
  // ═══════════════════════════════════════════════════

  {
    id: 'G-conjoint-2-noms',
    type: 'single',
    profile: 'garant',
    category: 'Document au nom du conjoint',
    question: "Le justificatif d'hébergement du garant est au nom de son conjoint. Que faire ?",
    options: [
      "Refuser systématiquement — chaque document doit être au nom du garant lui-même",
      "Accepter sans condition — un document au nom du conjoint est toujours valide",
      "Vérifier que l'avis d'imposition mentionne les deux noms ; si oui, accepter"
    ],
    correct: [2],
    explanation: "Pour un garant, on accepte uniquement si l'avis d'imposition mentionne les deux noms — cela confirme la vie commune et justifie l'utilisation du document du conjoint. C'est plus restrictif que pour le locataire (dans un dossier couple, le document conjoint est accepté sans condition supplémentaire)."
  },
  {
    id: 'G-facture-assurance',
    type: 'single',
    profile: 'garant',
    category: "Justificatif d'hébergement",
    question: "Pour un garant, quelle est l'ancienneté maximale acceptée d'une facture (téléphone, électricité, eau) ou d'une attestation d'assurance habitation utilisée comme justificatif d'hébergement ?",
    options: [
      "Moins de 3 mois",
      "Moins de 6 mois",
      "Moins de 12 mois"
    ],
    correct: [1],
    explanation: "Une facture (téléphone, électricité ou eau) ou une attestation d'assurance habitation est acceptée à condition qu'elle date de moins de 6 mois."
  },
  {
    id: 'G-justificatifs-heberg-multi',
    type: 'multi',
    profile: 'garant',
    category: "Justificatif d'hébergement",
    question: "Pour un garant, parmi ces documents, lesquels sont explicitement listés comme justificatifs d'hébergement acceptés (à condition d'être datés de moins de 6 mois) ?",
    options: [
      "Une facture de téléphone",
      "Une facture d'électricité",
      "Une facture d'eau",
      "Une attestation d'assurance habitation",
      "Une quittance de loyer du logement précédent du garant"
    ],
    correct: [0, 1, 2, 3],
    explanation: "Les factures de téléphone, électricité et eau ainsi que l'attestation d'assurance habitation sont explicitement listées comme justificatifs d'hébergement pour le garant (< 6 mois). Une ancienne quittance de loyer n'est pas dans la liste — le garant doit fournir un justificatif sur son logement actuel."
  },
  {
    id: 'G-bulletin-recent',
    type: 'tf',
    profile: 'garant',
    category: 'Situation professionnelle',
    question: "Pour un garant, si un bulletin de paie de moins de 3 mois est présent en situation professionnelle, le document est accepté.",
    correct: [0],
    explanation: "Vrai. Un bulletin de paie de moins de 3 mois est directement accepté comme justificatif de situation professionnelle pour un garant."
  },
  {
    id: 'G-bulletin-ancien-compense',
    type: 'tf',
    profile: 'garant',
    category: 'Situation professionnelle',
    question: "Pour un garant, un bulletin de paie de plus de 3 mois en situation professionnelle peut être accepté si les 3 derniers bulletins sont présents dans la catégorie « Justificatif de ressources ».",
    correct: [0],
    explanation: "Vrai. Les bulletins récents en justificatif de ressources compensent l'ancienneté du document en situation professionnelle — la cohérence d'ensemble prime sur la catégorie isolée."
  },

  // ═══════════════════════════════════════════════════
  // RÈGLES COMMUNES — applicables locataire ET garant
  // ═══════════════════════════════════════════════════

  {
    id: 'C-piece-id-recto',
    type: 'multi',
    profile: 'both',
    category: "Pièce d'identité",
    question: "Pour quel(s) document(s) le recto seul est-il suffisant pour valider la pièce d'identité ?",
    options: [
      "Carte d'identité nouvelle génération",
      "Carte d'identité ancienne génération",
      "Titre de séjour",
      "Permis de conduire nouvelle génération",
      "Passeport"
    ],
    correct: [0, 2, 3],
    explanation: "Le recto seul suffit pour la carte d'identité nouvelle génération, le titre de séjour et le permis de conduire nouvelle génération. Pour la CNI ancienne génération, le verso reste exigé. Le passeport est un document de nature différente (livret à plusieurs pages) — la règle « recto seul » ne s'y applique pas."
  },
  {
    id: 'C-attest-validite',
    type: 'single',
    profile: 'both',
    category: "Attestation d'hébergement",
    question: "Quel est le délai maximal de validité d'une attestation d'hébergement pour qu'elle soit acceptée ?",
    options: [
      "Moins de 3 mois",
      "Moins de 6 mois",
      "Moins de 12 mois",
      "Aucune limite de validité"
    ],
    correct: [1],
    explanation: "Une attestation d'hébergement est acceptée à condition qu'elle ait été établie il y a moins de 6 mois (règle valable pour le locataire comme pour le garant)."
  },
  {
    id: 'C-virement-attestation',
    type: 'single',
    profile: 'both',
    category: "Situation d'hébergement",
    question: "Lorsqu'une preuve de virement est fournie à la place d'une quittance, que faut-il demander en complément ?",
    options: [
      "Un relevé bancaire complet des 3 derniers mois",
      "Une attestation sur l'honneur datée et signée décrivant la situation d'hébergement",
      "Une nouvelle preuve de virement plus récente",
      "Rien, la preuve de virement suffit"
    ],
    correct: [1],
    explanation: "Une attestation sur l'honneur datée et signée décrivant la situation d'hébergement doit être demandée en complément de la preuve de virement (cas fréquent pour les locataires étrangers ou sans quittance disponible)."
  },
  {
    id: 'C-contrat-signature',
    type: 'tf',
    profile: 'both',
    category: 'Contrat de travail',
    question: "Si la signature en bas du contrat de travail est absente côté locataire (ou garant) mais que la signature de l'employeur est bien présente, le contrat est accepté.",
    correct: [0],
    explanation: "Vrai. C'est généralement un double du contrat — l'absence de la signature côté locataire ou garant n'est pas bloquante dès lors que l'employeur a signé."
  },
  {
    id: 'C-attestation-employeur',
    type: 'single',
    profile: 'both',
    category: 'Situation professionnelle',
    question: "Quelle est l'ancienneté maximale acceptée pour une attestation employeur ?",
    options: [
      "Moins de 3 mois",
      "Moins de 6 mois",
      "Moins de 12 mois",
      "Aucune limite tant que le contrat est en cours"
    ],
    correct: [1],
    explanation: "L'attestation employeur est acceptée à condition qu'elle ait été établie il y a moins de 6 mois (règle valable pour le locataire comme pour le garant)."
  },
  {
    id: 'C-retraite-coherence',
    type: 'single',
    profile: 'both',
    category: 'Dossier retraité',
    question: "Un dossier retraité contient un avis d'imposition 2022 dans la catégorie « Situation professionnelle », mais un avis d'imposition 2024 est correctement présent dans « Justificatif de ressources ». Comment réagir ?",
    options: [
      "Refuser — chaque catégorie doit contenir un avis récent",
      "Accepter — l'avis 2024 dans une autre catégorie compense ; la cohérence d'ensemble prime",
      "Demander un nouvel avis 2024 spécifiquement dans la catégorie situation professionnelle"
    ],
    correct: [1],
    explanation: "Pour un dossier retraité, si l'avis récent (2024) est présent dans une autre catégorie, il compense la version ancienne. La cohérence d'ensemble prime sur la catégorie isolée."
  },
  {
    id: 'C-avis-rfr0',
    type: 'tf',
    profile: 'both',
    category: "Avis d'imposition",
    question: "Si l'avis d'imposition 2025 sur les revenus 2024 ne contient que la page de garde et que le revenu fiscal de référence (RFR) est à 0 €, le document peut être accepté.",
    correct: [0],
    explanation: "Vrai. Un RFR à 0 € indique l'absence de revenus imposables — la page de garde seule suffit à le confirmer."
  },
  {
    id: 'C-avis-feuillet',
    type: 'single',
    profile: 'both',
    category: "Avis d'imposition",
    question: "Le dossier contient la page de couverture et le feuillet 1/2 de l'avis d'imposition (avec le RFR bien lisible en bas de page), mais le feuillet 2/2 est absent. Comment réagir ?",
    options: [
      "Refuser, l'avis doit contenir les deux feuillets",
      "Accepter — le feuillet 2/2 ne contient généralement pas d'info utile dès lors que tous les montants sont sur le feuillet 1/2",
      "Refuser et demander un avis de situation déclarative en remplacement"
    ],
    correct: [1],
    explanation: "Si tous les montants sont présents sur le feuillet 1/2, l'absence du feuillet 2/2 n'est pas bloquante : il ne contient généralement aucune information complémentaire. Un avis de situation déclarative est un document de nature différente — il n'a pas vocation à remplacer l'avis d'imposition ici."
  },

  // ═══════════════════════════════════════════════════
  // CROSS — différences locataire / garant
  // ═══════════════════════════════════════════════════

  {
    id: 'X-quittance-garant',
    type: 'tf',
    profile: 'cross',
    category: 'Différence L / G',
    question: "La règle progressive sur les quittances de loyer (2 quittances non consécutives au 1er passage, 1 seule après refus, puis facture / avis d'échéance après 2e refus) s'applique aussi au garant.",
    correct: [1],
    explanation: "Faux. Cette règle progressive est documentée uniquement pour le locataire. Pour le garant, les justificatifs d'hébergement standards sont la facture (téléphone, électricité, eau) ou l'attestation d'assurance habitation (< 6 mois) — pas la quittance de loyer."
  },
  {
    id: 'X-crous-cadre-garant',
    type: 'tf',
    profile: 'cross',
    category: 'Différence L / G',
    question: "La règle « avis d'échéance CROUS accepté même avec le cadre en bas à droite vide » s'applique aussi au garant.",
    correct: [1],
    explanation: "Faux. Cette tolérance ne concerne que le locataire (étudiant). Un garant n'est pas dans une situation où il fournit un avis d'échéance CROUS."
  },
  {
    id: 'X-fonction-pub-garant',
    type: 'tf',
    profile: 'cross',
    category: 'Différence L / G',
    question: "La règle « capture d'écran de l'espace carrière acceptée au 1er passage pour la fonction publique » s'applique aux deux profils (locataire et garant).",
    correct: [1],
    explanation: "Faux. Cette tolérance est documentée uniquement pour le locataire. Pour un garant fonctionnaire, on revient à la règle standard d'attestation employeur ou de bulletin de paie."
  },
  {
    id: 'X-bourse-crous-garant',
    type: 'tf',
    profile: 'cross',
    category: 'Différence L / G',
    question: "La règle « notification d'attribution conditionnelle CROUS acceptée pendant la période estivale » s'applique aussi au garant.",
    correct: [1],
    explanation: "Faux. Cette règle est spécifique au locataire boursier. Le garant n'est typiquement pas dans cette situation."
  },
  {
    id: 'X-piece-id-deux-profils',
    type: 'tf',
    profile: 'cross',
    category: 'Différence L / G',
    question: "La règle « recto seul suffit pour la CNI nouvelle génération, le titre de séjour et le permis de conduire nouvelle génération » s'applique aux deux profils (locataire et garant).",
    correct: [0],
    explanation: "Vrai. Cette tolérance est valable de manière identique pour le locataire et pour le garant."
  },
  {
    id: 'X-contrat-signature-deux',
    type: 'tf',
    profile: 'cross',
    category: 'Différence L / G',
    question: "La règle « contrat sans signature de la personne mais avec signature de l'employeur → accepté » est valable pour le locataire ET pour le garant.",
    correct: [0],
    explanation: "Vrai. Cette tolérance est explicitement listée pour les deux profils."
  },
  {
    id: 'X-virement-deux',
    type: 'tf',
    profile: 'cross',
    category: 'Différence L / G',
    question: "La règle « preuve de virement à la place d'une quittance → demander une attestation sur l'honneur datée et signée en complément » s'applique aux deux profils.",
    correct: [0],
    explanation: "Vrai. La règle de complément par attestation sur l'honneur est documentée pour les deux profils."
  },
  {
    id: 'X-conjoint-difference',
    type: 'single',
    profile: 'cross',
    category: 'Différence L / G',
    question: "Pour quel profil la règle « document au nom du conjoint » nécessite-t-elle de vérifier que l'avis d'imposition mentionne les deux noms ?",
    options: [
      "Locataire uniquement (dossier couple)",
      "Garant uniquement",
      "Les deux profils",
      "Aucun des deux — c'est toujours refusé"
    ],
    correct: [1],
    explanation: "Pour un dossier couple locataire, le document au nom du conjoint est accepté sans condition supplémentaire. En revanche, pour un garant, il faut vérifier que l'avis d'imposition mentionne les deux noms — c'est la condition d'acceptation."
  },
  {
    id: 'X-facture-assurance-profil',
    type: 'single',
    profile: 'cross',
    category: 'Différence L / G',
    question: "Pour quel profil la règle « facture (téléphone, électricité, eau) ou attestation d'assurance habitation < 6 mois » est-elle explicitement listée comme justificatif d'hébergement ?",
    options: [
      "Locataire uniquement",
      "Garant uniquement",
      "Les deux profils",
      "Aucun des deux"
    ],
    correct: [1],
    explanation: "Cette règle est documentée uniquement pour le garant. Pour le locataire, les justificatifs d'hébergement sont la quittance, la preuve de virement, l'attestation d'hébergement, etc."
  },
  {
    id: 'X-validite-attestation-deux',
    type: 'tf',
    profile: 'cross',
    category: 'Différence L / G',
    question: "Le délai de validité de 6 mois pour une attestation d'hébergement s'applique aux deux profils (locataire et garant).",
    correct: [0],
    explanation: "Vrai. La règle « attestation d'hébergement < 6 mois » est explicitement listée pour les deux profils."
  },
  {
    id: 'X-bulletin-decalage-profil',
    type: 'single',
    profile: 'cross',
    category: 'Différence L / G',
    question: "La règle de tolérance « 1 mois de décalage sur les bulletins de paie demandés » est explicitement documentée pour :",
    options: [
      "Le locataire uniquement",
      "Le garant uniquement",
      "Les deux profils"
    ],
    correct: [0],
    explanation: "Cette règle de décalage d'1 mois est documentée pour le locataire. Pour le garant, la règle est différente : on attend un bulletin de paie de moins de 3 mois (avec possibilité de compensation par les 3 derniers bulletins dans la catégorie « Justificatif de ressources »)."
  },
  {
    id: 'X-bulletin-compensation-profil',
    type: 'single',
    profile: 'cross',
    category: 'Différence L / G',
    question: "La règle « bulletin de paie de plus de 3 mois en situation professionnelle accepté si les 3 derniers bulletins sont dans la catégorie justificatif de ressources » est explicitement documentée pour :",
    options: [
      "Le locataire uniquement",
      "Le garant uniquement",
      "Les deux profils"
    ],
    correct: [1],
    explanation: "Cette règle de compensation est documentée uniquement pour le garant. Elle reflète l'importance de la cohérence d'ensemble du dossier de cautionnement."
  },
  {
    id: 'X-rfr0-feuillet-deux',
    type: 'single',
    profile: 'cross',
    category: 'Différence L / G',
    question: "Les tolérances « RFR à 0 € — page de garde suffit » et « feuillet 2/2 manquant si montants sur feuillet 1/2 » s'appliquent à :",
    options: [
      "Locataire uniquement",
      "Garant uniquement",
      "Les deux profils"
    ],
    correct: [2],
    explanation: "Ces deux tolérances sur les avis d'imposition sont documentées identiquement pour le locataire et pour le garant."
  },
  {
    id: 'X-retraite-deux',
    type: 'tf',
    profile: 'cross',
    category: 'Différence L / G',
    question: "La règle de tolérance « dossier retraité — avis ancien dans une catégorie compensé par avis récent dans une autre » s'applique aux deux profils.",
    correct: [0],
    explanation: "Vrai. Cette règle de cohérence d'ensemble est documentée à l'identique pour le locataire et pour le garant."
  },
  {
    id: 'X-multi-specifiques-locataire',
    type: 'multi',
    profile: 'cross',
    category: 'Différence L / G',
    question: "Parmi ces tolérances, lesquelles sont spécifiques au locataire (et ne s'appliquent pas au garant) ?",
    options: [
      "Quittance de loyer — règle progressive (1er passage, 1er refus, 2e refus)",
      "Avis d'échéance CROUS accepté avec cadre vide",
      "Validité < 6 mois d'une attestation d'hébergement",
      "Capture d'écran de l'espace carrière (fonction publique)",
      "Notification d'attribution conditionnelle CROUS (période estivale)"
    ],
    correct: [0, 1, 3, 4],
    explanation: "Les règles spécifiques au locataire sont : la règle progressive sur les quittances, l'avis CROUS au cadre vide, la capture d'écran espace carrière, et la notification d'attribution CROUS estivale. La validité < 6 mois de l'attestation d'hébergement est une règle commune aux deux profils."
  },
  {
    id: 'X-multi-specifiques-garant',
    type: 'multi',
    profile: 'cross',
    category: 'Différence L / G',
    question: "Parmi ces règles, lesquelles sont spécifiques au garant (et ne sont pas documentées pour le locataire) ?",
    options: [
      "Document au nom du conjoint accepté seulement si l'avis d'imposition mentionne les deux noms",
      "Facture (téléphone / électricité / eau) ou attestation d'assurance habitation < 6 mois comme justificatif d'hébergement",
      "Validité < 6 mois d'une attestation d'hébergement",
      "Bulletin de paie ancien (> 3 mois) compensé par les 3 derniers bulletins en justificatif de ressources",
      "Recto seul suffit pour la CNI nouvelle génération"
    ],
    correct: [0, 1, 3],
    explanation: "Les règles spécifiques au garant sont : la vérification des deux noms sur l'avis d'imposition pour le document conjoint, l'acceptation des factures/attestation d'assurance comme justificatif d'hébergement, et la compensation du bulletin ancien par les 3 derniers en justificatif de ressources. Les deux autres règles sont communes aux deux profils."
  }
];
