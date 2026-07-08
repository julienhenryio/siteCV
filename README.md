# julienhenry.io

Site personnel de Julien Henry — freelance IA & automatisation (Nantes).
Statique, déployé sur Netlify depuis la racine du repo. Chaque sous-dossier est servi tel quel sous son URL (`julienhenry.io/<dossier>/`).

## Carte du repo

| Dossier / fichier | Rôle | Statut | URL |
|---|---|---|---|
| `index.html` | CV one-page (hero, compétences, expériences, contact) | En prod — refonte prévue (Mission 2) | [julienhenry.io](https://julienhenry.io) |
| `projets/quiz-dossierfacile/` | Quiz DossierFacile — formation opérateurs (cas de tolérance) | **En prod — utilisé** | [/projets/quiz-dossierfacile/quiz.html](https://julienhenry.io/projets/quiz-dossierfacile/quiz.html) |
| `projets/quiz-logement-jeunes/` | Quiz DossierFacile — Forum Logement Jeunes (QR code partagé) | **En prod — utilisé** | [/projets/quiz-logement-jeunes/](https://julienhenry.io/projets/quiz-logement-jeunes/) |
| `projets/verification-cni/` | POC validation MRZ de CNI françaises | POC — partageable | [/projets/verification-cni/](https://julienhenry.io/projets/verification-cni/) |
| `projets/poker/` | App poker sans jetons (build Vite compilé, base patchée vers `/projets/poker/`) | Perso | [/projets/poker/](https://julienhenry.io/projets/poker/) |
| `links/` | Page de liens type Linktree (URL courte volontairement à la racine) | En prod | [/links/](https://julienhenry.io/links/) |
| `design_system/` | Planche de référence du design system batik v2 (tokens couleurs, Fraunces + Inter, composants) | Référence interne | — |
| `assets/` | Images et favicons partagés | — | — |
| `_headers` | Headers Netlify (cache favicons) | — | — |
| `_redirects` | Redirects Netlify : anciennes URLs des apps (pré-2026-07) → `/projets/...` | Ne pas supprimer (QR codes imprimés) | — |

`projets/` accueillera aussi les futurs POC clients et petites apps perso. En Mission 2 (Next.js), `/projets` deviendra la page hub qui les liste.

## Design

- Les **2 quiz DossierFacile restent volontairement en design système de l'État** (mission DossierFacile) — **ne pas** leur appliquer le design system batik.
- `verification-cni` utilise les **tokens batik** (repassé le 8 juillet 2026) — première app consommant le design system.

## Archives

Les anciens brouillons (`trash/`, `testchat/`, `opentermarchives/`, `css/`) ont été supprimés de `main` le 8 juillet 2026. Tout l'état antérieur est conservé sous le tag **`archive/2026-07-pre-refonte`** :

```
git show archive/2026-07-pre-refonte --stat
```

## Refonte prévue (Mission 2)

- Coquille **Next.js 15 en export statique** (`output: 'export'`) : vitrine + offre/services + hub projets + études de cas en **MDX**.
- Les apps existantes resteront servies en statique depuis `public/projets/...`, **URLs inchangées**.
- Design : tokens du design system batik (`design_system/design_system_v2_batik.html`).
