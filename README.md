# WordPress Like Sanity Studio

Studio de gestion de contenu (CMS) construit sur [Sanity v3](https://www.sanity.io/), conçu pour alimenter de petits sites vitrines React. L'objectif est de proposer une expérience éditoriale proche de WordPress — singletons, page builder par sections, blog, navigation — tout en restant léger et simple à vendre/déployer.

**Project ID Sanity :** `995ry9bs` | **Dataset :** `production`

---

## Stack

| Outil | Rôle |
|---|---|
| Sanity v3 | CMS headless (ce repo) |
| React (repo séparé) | Front-end consommant l'API Sanity |
| TypeScript | Typage des schémas |
| `@sanity/vision` | Requêtes GROQ dans le studio |

---

## Lancer le studio

```bash
npm install
npm run dev        # studio local sur http://localhost:3333
npm run build      # build de production
npm run deploy     # déploie le studio sur sanity.io
```

---

## Architecture des schémas

### Documents

| Schéma | Type | Description |
|---|---|---|
| `homepage` | Singleton | Page d'accueil — page builder + articles mis en avant + derniers articles |
| `page` | Multiple | Pages génériques — page builder complet |
| `post` | Multiple | Articles de blog — titre, extrait, image, contenu riche, catégorie(s), auteur, date |
| `author` | Multiple | Auteurs — nom, bio, photo |
| `category` | Multiple | Catégories d'articles |
| `testimonial` | Multiple | Témoignages clients — nom, rôle, photo, citation, note (3-5 étoiles) |
| `siteSettings` | Singleton | Réglages globaux — nom du site, URL, logo, SEO global, réseaux sociaux |
| `navigation` | Multiple | Menus de navigation |
| `notFound` | Singleton | Page 404 — titre, description, lien de retour, SEO |

### Objets réutilisables

| Schéma | Description |
|---|---|
| `seo` | Titre SEO, meta description, image Open Graph |
| `aiMetadata` | Type Schema.org, résumé IA, points clés, intention, audience, JSON-LD, contrôle d'indexation LLM |
| `imageWithAlt` | Image Sanity + texte alternatif obligatoire |
| `link` | Lien interne (homepage / page / post) ou externe, avec option nouvel onglet |
| `richText` | Contenu riche (blocks Portable Text) |
| `slugObject` | Slug avec génération automatique depuis le titre |

### Sections du page builder

Disponibles dans `homepage` et `page` :

| Section | Description |
|---|---|
| `heroSection` | Sur-titre, titre, sous-titre, image de fond, 2 CTA |
| `textSection` | Bloc de contenu riche |
| `imageSection` | Image pleine largeur avec légende optionnelle |
| `gallerySection` | Galerie d'images |
| `ctaSection` | Appel à l'action avec titre, description et lien |
| `faqSection` | Accordéon de questions/réponses |
| `testimonialsSection` | Sélection de témoignages (références vers `testimonial`) |
| `contactSection` | Config du formulaire de contact : champs personnalisables, email destinataire, message de confirmation |

> **Note :** La soumission du formulaire de contact est gérée côté front (Formspree, Resend, Netlify Forms…). La `contactSection` stocke uniquement la configuration éditoriale.

---

## Singletons

Les singletons (une seule instance possible) sont : `homepage`, `siteSettings`, `notFound`.

Ils sont déclarés dans `src/singletons.ts` et apparaissent comme entrées directes dans la sidebar du studio (pas de liste, accès direct au document).

---

## Structure des fichiers

```
schemaTypes/
├── documents/
│   ├── homepageType.ts
│   ├── pageType.ts
│   ├── postType.ts
│   ├── authorType.ts
│   ├── categoryType.ts
│   ├── testimonialType.ts
│   ├── siteSettingsType.ts
│   ├── navigationType.ts
│   └── notFoundType.ts
├── objects/
│   ├── aiMetadata.ts
│   ├── imageWithAlt.ts
│   ├── link.ts
│   ├── richText.ts
│   ├── seo.ts
│   ├── slug.ts
│   └── sections/
│       ├── hero.ts
│       ├── textSection.ts
│       ├── imageSection.ts
│       ├── gallery.ts
│       ├── cta.ts
│       ├── faq.ts
│       ├── testimonialsSection.ts
│       └── contactSection.ts
└── index.ts

src/
├── deskStructure.ts   # Structure de la sidebar du studio
└── singletons.ts      # Déclaration des types singleton

sanity.config.ts       # Config principale Sanity
sanity.cli.ts          # Config CLI
```

---

## Sidebar du studio (ordre)

1. Page d'accueil *(singleton)*
2. *(séparateur)*
3. Pages
4. Articles
5. Catégories
6. Auteurs
7. Témoignages
8. *(séparateur)*
9. Médias
10. *(séparateur)*
11. Navigation
12. Page 404 *(singleton)*
13. Réglages *(singleton)*

---

## Front-end (repo séparé)

Le front React consomme ce studio via l'API GROQ de Sanity. Points d'attention :

- Utiliser `_type` pour router chaque section du page builder vers son composant React.
- La `contactSection` fournit `recipientEmail`, `fields`, `submitLabel` et `successMessage` — l'envoi effectif est délégué à un service tiers.
- Les singletons (`homepage`, `siteSettings`, `notFound`) se requêtent par `_id` fixe (ex. `*[_id == "homepage"][0]`).
- `aiMetadata` peut servir à générer automatiquement le JSON-LD dans le `<head>`.
