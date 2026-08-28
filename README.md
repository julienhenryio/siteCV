# julienhenry.io

Site personnel de Julien Henry — freelance IA & automatisation (Nantes).
Statique, déployé sur Netlify depuis la racine du repo. Chaque sous-dossier est servi tel quel sous son URL (`julienhenry.io/<dossier>/`).

## Carte du repo

| Dossier / fichier | Rôle | Statut | URL |
|---|---|---|---|
| `index.html` | **Page d'offre** — services, méthode, études de cas chiffrées, labo, contact | En prod | [julienhenry.io](https://julienhenry.io) |
| `cv/` | Parcours & CV détaillé (lié depuis le pied de page, pas depuis la nav) | En prod | [/cv/](https://julienhenry.io/cv/) |
| `projets/` | Hub listant les projets publics | En prod | [/projets/](https://julienhenry.io/projets/) |
| `projets/quiz-dossierfacile/` | Quiz DossierFacile — formation opérateurs (cas de tolérance) | **En prod — utilisé** | [/projets/quiz-dossierfacile/quiz.html](https://julienhenry.io/projets/quiz-dossierfacile/quiz.html) |
| `projets/quiz-logement-jeunes/` | Quiz DossierFacile — Forum Logement Jeunes (QR code partagé) | **En prod — utilisé** | [/projets/quiz-logement-jeunes/](https://julienhenry.io/projets/quiz-logement-jeunes/) |
| `projets/verification-cni/` | POC validation MRZ de CNI françaises | POC — partageable | [/projets/verification-cni/](https://julienhenry.io/projets/verification-cni/) |
| `projets/poker/` | App poker sans jetons (build Vite compilé, base patchée vers `/projets/poker/`) | Perso | [/projets/poker/](https://julienhenry.io/projets/poker/) |
| `links/` | Page de liens type Linktree (URL courte volontairement à la racine) | En prod — **pas encore restylée batik** | [/links/](https://julienhenry.io/links/) |
| `assets/css/batik.css` | **Source unique** des jetons et composants batik v3 (thèmes terang + malam) | — | — |
| `assets/js/theme.js` | Bascule jour/nuit (mémorisée) + révélations au défilement | — | — |
| `design_system/v3-batik.html` | Planche de référence du design system batik v3 | Référence interne | — |
| `assets/` | Images et favicons partagés | — | — |
| `_headers` | Headers Netlify (cache favicons) | — | — |
| `_redirects` | Redirects Netlify : anciennes URLs des apps (pré-2026-07) → `/projets/...` | Ne pas supprimer (QR codes imprimés) | — |

## Design

- **Toute page batik charge `assets/css/batik.css`.** Ne jamais recopier une valeur hexadécimale dans une page : utiliser `var(--jeton)`. C'est ce qui avait produit le drift v2/v3 sur `verification-cni`.
- **Thèmes** : `terang` (jour) et `malam` (nuit). Un script inline dans le `<head>` pose `data-theme` sur `<html>` avant le rendu (sinon flash blanc au rechargement en nuit). Sans choix mémorisé, la page suit `prefers-color-scheme`.
- **Écarts assumés par rapport à `design_system/v3-batik.html`** — cinq jetons corrigés pour cause de contraste sous 4,5:1, à reporter dans la planche :
  | Jeton | Thème | v3 | Corrigé | Paire concernée |
  |---|---|---|---|---|
  | `--soga` | nuit | `#C9622C` | `#B85A28` | bouton primaire : 3,67 → 4,56 |
  | `--on-soga` | nuit | `#FFF4E7` | `#FFFDFA` | idem |
  | `--soga-dark` | nuit | `#DC7038` | `#9C4A1F` | survol du bouton : 3,22 → 6,06 |
  | `--tinta-soft` | jour | `#756450` | `#71614E` | badge neutre : 4,34 → 4,55 |
  | `--placeholder` | jour / nuit | `#B6A489` / `#6E7A93` | `#826E51` / `#848EA4` | placeholder : 2,25 → 4,53 |

  Conséquence : en thème nuit, le survol du bouton primaire **fonce** au lieu d'éclaircir. La règle v3 « en nuit le survol éclaircit » était incompatible avec un texte lisible.
- Les **2 quiz DossierFacile restent volontairement en design système de l'État** (mission DossierFacile) — **ne pas** leur appliquer le design system batik.
- `verification-cni` consomme `batik.css` via une couche de correspondance (`--bg`, `--card`, `--accent`… → jetons batik), pour ne pas toucher au HTML généré en JS.

## Archives

Les anciens brouillons (`trash/`, `testchat/`, `opentermarchives/`, `css/`) ont été supprimés de `main` le 8 juillet 2026. Tout l'état antérieur est conservé sous le tag **`archive/2026-07-pre-refonte`** :

```
git show archive/2026-07-pre-refonte --stat
```

L'ancien CV one-page (bleu / Poppins / Font Awesome) est dans l'historique git, avant la refonte du 28 août 2026.

## Favicons

Marque « JH » en Georgia crème (`--on-soga`) sur fond soga (`--soga` `#B4501F`), régénérée le 28 août 2026 depuis un master 1024 px.

| Fichier | Usage |
|---|---|
| `favicon.svg` | Préféré par les navigateurs modernes, net à toute taille |
| `favicon.ico` | Repli — contient 16, 32 et 48 px (PNG embarqués) |
| `favicon-16x16.png`, `favicon-32x32.png` | Onglets |
| `apple-touch-icon.png` (180) | iOS — **plein cadre, sans coins arrondis** : iOS applique son propre masque |
| `android-chrome-{192,512}.png` | Manifest |

Une copie de `favicon.ico` est aussi à la **racine** : c'est le chemin que les navigateurs demandent d'office.

**Piège de `_headers`** : la règle générique `/assets/favicon/*` force `Content-Type: image/png` sur tout le dossier. Chaque fichier non-PNG doit redéclarer son type — c'est déjà fait pour `.ico`, `.svg` et `site.webmanifest`. Ce dernier était servi en `image/png` et donc ignoré par les navigateurs depuis le début.

## Reste à faire

- Restyler `links/` aux tokens batik — elle est encore en bleu/Poppins avec Font Awesome.
- Reporter les 5 correctifs de contraste dans `design_system/v3-batik.html`.
- Éventuelle coquille **Next.js 15 en export statique** (`output: 'export'`) avec études de cas en MDX, si le volume de contenu le justifie. Les apps resteraient servies depuis `public/projets/...`, **URLs inchangées**.
