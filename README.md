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
| `author` | Multiple | Auteurs — nom, bio, photo (réutilisés dans la section équipe) |
| `category` | Multiple | Catégories d'articles |
| `testimonial` | Multiple | Témoignages clients — nom, rôle, photo, citation, note (3-5 étoiles) |
| `siteSettings` | Singleton | Réglages globaux — voir détail ci-dessous |
| `footer` | Singleton | Pied de page — colonnes de liens, copyright, affichage des réseaux sociaux |
| `navigation` | Multiple | Menus de navigation |
| `notFound` | Singleton | Page 404 — titre, description, lien de retour, SEO |
| `themeSettings` | Singleton | Charte graphique — couleurs, typographie, rayons, espacements |

#### Détail de `themeSettings`

| Groupe | Champs |
|---|---|
| Couleurs | Principale, secondaire, accentuation, fond, surfaces, texte, texte discret, bordures (format hex `#RRGGBB`) |
| Typographie | Police titres, police corps, tailles H1/H2/H3/body (en rem), graisse des titres, interligne |
| Formes et rayons | Rayon boutons, cartes/blocs, champs, images (de 0px à 9999px) |
| Espacements | Padding vertical des sections, largeur max du conteneur |

> Les valeurs de `themeSettings` sont destinées à être transformées en CSS custom properties (`--color-primary`, `--font-heading`, etc.) côté front.

#### Détail de `siteSettings`

| Groupe | Champs |
|---|---|
| Réglages | Nom du site, URL, logo, redirections (tableau from → to) |
| Contact | Email, téléphone, adresse, horaires d'ouverture |
| SEO | SEO global, codes de vérification Google Search Console et Bing, chemins bloqués pour robots.txt |
| IA | Métadonnées IA globales par défaut |
| Réseaux sociaux | X, LinkedIn, Instagram, Facebook, YouTube |
| Tracking | Google Tag ID, domaine Plausible Analytics |
| Mentions légales | Texte bannière cookies, référence page politique de confidentialité, référence page mentions légales |

### Objets réutilisables

| Schéma | Description |
|---|---|
| `seo` | Meta title/description, mot-clé principal, noindex, canonical, OG title/description/image, Twitter card type |
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
| `videoSection` | Embed YouTube / Vimeo — titre, description, lecture auto optionnelle |
| `gallerySection` | Galerie d'images |
| `ctaSection` | Appel à l'action avec titre, description et lien |
| `faqSection` | Accordéon de questions/réponses |
| `pricingSection` | Grilles tarifaires — offres avec prix, période, caractéristiques, CTA, mise en avant |
| `teamSection` | Références vers des `author` — titre, sous-titre |
| `testimonialsSection` | Sélection de témoignages (références vers `testimonial`) |
| `contactSection` | Config du formulaire de contact : champs personnalisables, email destinataire, message de confirmation |

> **Note :** La soumission du formulaire de contact est gérée côté front (Formspree, Resend, Netlify Forms…). La `contactSection` stocke uniquement la configuration éditoriale.

---

## Singletons

Les singletons (une seule instance possible) sont : `homepage`, `siteSettings`, `themeSettings`, `footer`, `notFound`.

Déclarés dans [src/singletons.ts](src/singletons.ts), ils apparaissent comme entrées directes dans la sidebar (accès direct au document, sans liste).

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
│   ├── themeSettingsType.ts
│   ├── footerType.ts
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
│       ├── videoSection.ts
│       ├── gallery.ts
│       ├── cta.ts
│       ├── faq.ts
│       ├── pricingSection.ts
│       ├── teamSection.ts
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
12. Pied de page *(singleton)*
13. Page 404 *(singleton)*
14. Charte graphique *(singleton)*
15. Réglages *(singleton)*

---

## Front-end (repo séparé)

Le front React consomme ce studio via l'API GROQ de Sanity. Points d'attention :

- Utiliser `_type` pour router chaque section du page builder vers son composant React.
- La `contactSection` fournit `recipientEmail`, `fields`, `submitLabel` et `successMessage` — l'envoi effectif est délégué à un service tiers.
- Les singletons se requêtent par `_id` fixe : `*[_id == "homepage"][0]`, `*[_id == "siteSettings"][0]`, `*[_id == "footer"][0]`, `*[_id == "notFound"][0]`.
- `siteSettings.googleTagId` et `siteSettings.plausibleDomain` permettent d'injecter les scripts de tracking sans toucher au code.
- `siteSettings.redirects` fournit le tableau des redirections 301 à implémenter côté serveur (Next.js `redirects`, Astro middleware, etc.).
- `siteSettings.robotsDisallow` alimente le fichier `robots.txt` généré côté front. `siteSettings.googleSiteVerification` / `bingSiteVerification` s'injectent en balises `<meta>` dans le `<head>`.
- `seo.canonicalUrl` permet de surcharger l'URL canonique par défaut page par page.
- `seo.ogTitle` / `seo.ogDescription` : si vides, le front utilise `metaTitle` / `metaDescription` en fallback.
- `sitemapPriority` et `sitemapChangefreq` (présents sur `homepage`, `page`, `post`) alimentent le `sitemap.xml` généré côté front.
- `aiMetadata` peut servir à générer automatiquement le JSON-LD dans le `<head>`.
