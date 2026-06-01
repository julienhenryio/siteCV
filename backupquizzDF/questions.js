/* =============================================================
   CONTENU DU QUIZ DOSSIERFACILE
   =============================================================

   👉 Ce fichier contient TOUTES les questions et réponses.
      C'est le SEUL fichier à modifier pour changer le quiz.
      (Le fichier "index.html" ne doit pas être touché.)

   COMMENT ÇA MARCHE :
   -------------------
   Le quiz est composé de 2 parcours : "general" et "scam".
   Chaque parcours a un titre, une description, et une liste
   de questions.

   POUR CHAQUE QUESTION, il y a 4 informations :

     question      : la question posée.
     reponses      : la liste des réponses proposées
                     (2, 3 ou 4 réponses, séparées par des virgules).
     bonneReponse  : la lettre de la bonne réponse :
                       "A" = 1re réponse
                       "B" = 2e réponse
                       "C" = 3e réponse
                       "D" = 4e réponse
                     👉 Pour PLUSIEURS bonnes réponses, séparez les
                        lettres par une virgule : "B, C".
                        Le joueur devra alors toutes les sélectionner
                        puis cliquer sur « Valider ».
     explication   : le petit texte affiché après la réponse.

   ⚠️ RÈGLES À RESPECTER (sinon le quiz ne s'affiche plus) :
   --------------------------------------------------------
   1. Toujours garder les guillemets droits " " autour des textes.
      (Pas les guillemets « » ni " ").
   2. Si un texte contient un guillemet ", remplacez-le par une
      apostrophe ' ou par « » à l'intérieur du texte.
   3. Garder les virgules à la fin des lignes comme dans l'exemple.
   4. Ne pas effacer les accolades { } ni les crochets [ ].

   💡 ASTUCE : pour ajouter une question, copiez un bloc complet
      (de { jusqu'à }, ) et collez-le, puis modifiez le texte.

   ============================================================= */


const QUIZZES_CONTENT = {

  /* ===========================================================
     PARCOURS 1
     =========================================================== */
  general: {
    badge: "Parcours 1",
    title: "Découvrir DossierFacile",
    description: "10 questions sur le service, son fonctionnement et la protection de vos documents.",
    questions: [

      {
        question: "Quel est le rôle de DossierFacile ?",
        reponses: [
          "Créer un dossier de location propre, complet et vérifié",
          "Trouver un appartement à ma place",
          "Appeler les propriétaires pour moi"
        ],
        bonneReponse: "A",
        explication: "DossierFacile t'aide à constituer un dossier clair et sécurisé, accepté partout."
      },

      {
        question: "Combien coûte DossierFacile ?",
        reponses: [
          "10 €",
          "2 € par document",
          "C'est 100 % gratuit"
        ],
        bonneReponse: "C",
        explication: "DossierFacile est un service public gratuit."
      },

      {
        question: "Quels documents pouvez-vous importer dans DossierFacile ?",
        reponses: [
          "Une photo floue prise dans le bus",
          "Vos justificatifs lisibles (CNI, justificatif de ressources, avis d'imposition…)",
          "Votre carte de cantine"
        ],
        bonneReponse: "B",
        explication: "Plus c'est lisible, plus ton dossier sera rapidement validé."
      },

      {
        question: "DossierFacile refuse les faux documents. Pourquoi ?",
        reponses: [
          "Parce que l'administration n'aime pas les blagues",
          "Pour protéger les jeunes et éviter les arnaques",
          "Parce que c'est plus joli"
        ],
        bonneReponse: "B",
        explication: "DossierFacile sécurise ton dossier et évite les fraudes."
      },

      {
        question: "Une fois ton dossier validé, que dois-tu transmettre au propriétaire ?",
        reponses: [
          "Le lien sécurisé fourni par DossierFacile",
          "Toutes tes pièces justificatives en pièce jointe",
          "Une photo de ton dossier sur Snapchat"
        ],
        bonneReponse: "A",
        explication: "Ne diffuse jamais tes documents personnels. Envoie uniquement le lien sécurisé."
      },

      {
        question: "Sur quel site dois-tu faire très attention avant d'envoyer ton dossier ?",
        reponses: [
          "Le site du gouvernement",
          "Leboncoin ou tout autre site d'annonce entre particuliers",
          "Le site de ta mission locale"
        ],
        bonneReponse: "B",
        explication: "Ne partage jamais ton dossier avec quelqu'un que tu ne connais pas ou non identifié."
      },

      {
        question: "Un « propriétaire » te demande tes documents par SMS avant de te proposer une visite. Que fais-tu ?",
        reponses: [
          "Tu envoies tes justificatifs directement pour gagner du temps",
          "Tu refuses et tu attends une visite ou un vrai interlocuteur",
          "Tu envoies seulement ton DossierFacile sans les pièces justificatives",
          "Tu envoies ton DossierFacile avec les justificatifs "
        ],
        bonneReponse: "B, C",
        explication: "Je refuse d’envoyer mes documents par SMS et j’attends une vraie visite avec un interlocuteur identifié. Si j’accepte de transmettre un dossier, je le fais uniquement via une plateforme sécurisée comme DossierFacile, qui permet d’envoyer un dossier de location sans transmettre directement les pièces justificatives par message."
      },

      {
        question: "Pourquoi DossierFacile ajoute un filigrane sur chaque document ?",
        reponses: [
          "Pour faire joli",
          "Pour montrer que tu es quelqu'un de sérieux",
          "Pour éviter la réutilisation frauduleuse de tes documents"
        ],
        bonneReponse: "C",
        explication: "Le filigrane protège ton identité et tes documents."
      },

      {
        question: "Quelle est la durée moyenne pour valider un dossier complet ?",
        reponses: [
          "Quelques heures",
          "15 jours",
          "2 mois"
        ],
        bonneReponse: "A",
        explication: "DossierFacile est rapide : ton dossier peut être validé le jour même."
      },

      {
        question: "Si ton dossier est incomplet, que se passe-t-il ?",
        reponses: [
          "Il est rejeté pour toujours",
          "Les vérificateurs t'indiquent ce qu'il manque pour le valider",
          "On te supprime ton compte"
        ],
        bonneReponse: "B",
        explication: "DossierFacile t'accompagne jusqu'à la validation, même si tu débutes."
      }

    ]
  },

  /* ===========================================================
     PARCOURS 2
     =========================================================== */
  scam: {
    badge: "Parcours 2",
    title: "Repérer les arnaques",
    description: "10 questions pour apprendre à éviter les pièges des fausses annonces de location.",
    questions: [

      {
        question: "Tu trouves un appart trop beau pour être vrai : 300 € le T2 en plein centre. Le propriétaire veut tes documents avant même de te parler. Tu fais quoi ?",
        reponses: [
          "Tu envoies tout, let's go",
          "Tu demandes une visite ou un contact vérifié",
          "Tu envoies juste ta carte d'identité"
        ],
        bonneReponse: "B",
        explication: "Une vraie location commence toujours par une visite ou un interlocuteur identifié."
      },

      {
        question: "On te demande de payer l'acompte avant la visite. C'est…",
        reponses: [
          "Une pratique normale",
          "Une arnaque 99 % du temps",
          "Un moyen de réserver ton futur palace"
        ],
        bonneReponse: "B",
        explication: "Ne jamais payer avant d'avoir visité et signé un vrai bail."
      },

      {
        question: "À qui peux-tu envoyer tes pièces justificatives (CNI, fiche de paie…) ?",
        reponses: [
          "À n'importe qui, tant qu'il répond vite",
          "Seulement via le lien sécurisé DossierFacile",
          "À tous les propriétaires de Leboncoin, ça va plus vite"
        ],
        bonneReponse: "B",
        explication: "Ne partage jamais tes documents en clair. Utilise le lien sécurisé."
      },

      {
        question: "Le propriétaire communique uniquement par WhatsApp depuis un numéro étranger. Tu fais quoi ?",
        reponses: [
          "Tu continues, peut-être qu'il habite à Bali",
          "Tu demandes un contact vérifiable et officiel",
          "Tu envoies ton dossier pour gagner du temps"
        ],
        bonneReponse: "B",
        explication: "Les arnaqueurs passent souvent par WhatsApp, SMS et numéros étrangers."
      },

      {
        question: "Une annonce demande un garant qui gagne 10 fois le loyer. C'est…",
        reponses: [
          "Une exigence normale",
          "Un signe d'arnaque ou de redirection vers un site frauduleux",
          "Un concours de richesse"
        ],
        bonneReponse: "B",
        explication: "Exigences irréalistes = signal d'alerte."
      },

      {
        question: "Tu repères une annonce sans photo, sans description, juste « URGENT ». Tu fais quoi ?",
        reponses: [
          "Tu fonces",
          "Tu demandes plus d'infos et un rendez-vous",
          "Tu envoies ton dossier, on ne sait jamais"
        ],
        bonneReponse: "B",
        explication: "Les annonces floues ou vides sont très souvent suspectes."
      },

      {
        question: "Le propriétaire refuse de te montrer le logement, « car il est à l'étranger ». Il te demande d'envoyer ton dossier pour « réserver ».",
        reponses: [
          "C'est normal",
          "Arnaque ultra fréquente",
          "Peut-être, selon son humeur"
        ],
        bonneReponse: "B",
        explication: "Un propriétaire absent qui ne montre pas le logement = red flag."
      },

      {
        question: "Comment DossierFacile protège-t-il tes documents ?",
        reponses: [
          "En ajoutant un filigrane (watermark)",
          "En floutant tout",
          "En mettant ton nom en néon"
        ],
        bonneReponse: "A",
        explication: "Le filigrane empêche la réutilisation frauduleuse de tes documents."
      },

      {
        question: "Sur quel site dois-tu être particulièrement vigilant ?",
        reponses: [
          "Leboncoin et tout site de petites annonces entre particuliers",
          "Le site du gouvernement",
          "Le site de ta mission locale"
        ],
        bonneReponse: "A",
        explication: "Les arnaques sont très courantes sur les plateformes de petites annonces."
      },

      {
        question: "Quel est l'un des plus gros pièges ?",
        reponses: [
          "Croire qu'une bonne affaire existe encore à 300 € en centre-ville",
          "Penser que le wifi est gratuit",
          "Dire bonjour"
        ],
        bonneReponse: "A",
        explication: "Les arnaques jouent sur l'urgence et le prix trop attractif."
      }

    ]
  }

};
