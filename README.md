# julienhenry.io

Site personnel de Julien Henry — freelance IA & automatisation (Nantes).
Statique, déployé sur Netlify depuis la racine du repo. Chaque sous-dossier est servi tel quel sous son URL (`julienhenry.io/<dossier>/`).

## Carte du repo

| Dossier / fichier | Rôle | Statut | URL |
|---|---|---|---|
| `index.html` | CV one-page (hero, compétences, expériences, contact) | En prod — refonte prévue (Mission 2) | [julienhenry.io](https://julienhenry.io) |
| `pocquizzDF/` | Quiz DossierFacile — formation opérateurs (cas de tolérance) | **En prod — utilisé, ne pas casser les URLs** | [/pocquizzDF/quiz.html](https://julienhenry.io/pocquizzDF/quiz.html) |
| `backupquizzDF/` | Quiz DossierFacile — Forum Logement Jeunes (QR code partagé) | **En prod — utilisé, ne pas casser les URLs** | [/backupquizzDF/](https://julienhenry.io/backupquizzDF/) |
| `verification-cni/` | POC validation MRZ de CNI françaises | POC — partageable | [/verification-cni/](https://julienhenry.io/verification-cni/) |
| `pokerwithoutchips/` | App poker sans jetons (build Vite compilé) | Perso | [/pokerwithoutchips/](https://julienhenry.io/pokerwithoutchips/) |
| `links/` | Page de liens type Linktree | En prod | [/links/](https://julienhenry.io/links/) |
| `design_system/` | Planche de référence du design system batik v2 (tokens couleurs, Fraunces + Inter, composants) | Référence interne | — |
| `assets/` | Images et favicons partagés | — | — |
| `_headers` | Headers Netlify (cache favicons) | — | — |

## Archives

Les anciens brouillons (`trash/`, `testchat/`, `opentermarchives/`, `css/`) ont été supprimés de `main` le 8 juillet 2026. Tout l'état antérieur est conservé sous le tag **`archive/2026-07-pre-refonte`** :

```
git show archive/2026-07-pre-refonte --stat
```

## Refonte prévue (Mission 2)

- Coquille **Next.js 15 en export statique** (`output: 'export'`) : vitrine + offre/services + hub projets + études de cas en **MDX**.
- Les apps existantes (quiz, verification-cni, poker, links) resteront servies en statique depuis `public/`, **URLs inchangées**.
- Design : tokens du design system batik (`design_system/design_system_v2_batik.html`).
