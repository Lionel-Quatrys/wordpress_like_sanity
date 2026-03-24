# Guide de construction du front-end React

Ce document est la référence principale pour construire et maintenir le front-end React qui consomme le studio Sanity **WordPress Like Studio**.
Il doit être maintenu à jour à chaque modification du studio.

---

## Connexion Sanity

```ts
// sanity.ts (client)
import { createClient } from "@sanity/client";

export const client = createClient({
  projectId: "995ry9bs",
  dataset: "production",
  apiVersion: "2024-01-01",
  useCdn: true, // false pour les previews/ISR
});
```

```ts
// images.ts
import imageUrlBuilder from "@sanity/image-url";
import { client } from "./sanity";

const builder = imageUrlBuilder(client);

export const urlFor = (source: any) => builder.image(source);
// Utilisation : urlFor(image).width(800).format("webp").url()
```

Dépendances à installer :

```bash
npm install @sanity/client @sanity/image-url @portabletext/react
```

---

## Structure des routes

| Route | Source Sanity | ID / Query |
|---|---|---|
| `/` | `homepage` (singleton) | `_id == "homepage"` |
| `/{slug}` | `page` | `slug.current == $slug` |
| `/{blogSlug}` | `blogPage` (singleton) | `_id == "blogPage"` — le slug est configurable |
| `/{blogSlug}/{postSlug}` | `post` | `slug.current == $slug` |
| `*` (404) | `notFound` (singleton) | `_id == "notFound"` |

> Le slug du blog (`/blog` par défaut) est configurable dans `blogPage.slug.current`. Le front doit le résoudre dynamiquement.

---

## Singletons — requêtes GROQ

Les singletons ont un `_id` fixe et ne s'interrogent **pas** par slug.

### Données globales (à charger une seule fois, layout)

```groq
// siteSettings
*[_id == "siteSettings"][0] {
  siteName, siteUrl,
  "logo": logo { "url": image.asset->url, alt },
  contactEmail, contactPhone, address,
  openingHours[] { days, hours },
  socialLinks[] { platform, url },
  googleTagId, plausibleDomain,
  googleSiteVerification, bingSiteVerification,
  robotsDisallow,
  redirects[] { from, to },
  cookieBannerText,
  "privacyPolicySlug": privacyPolicyPage->slug.current,
  "legalNoticeSlug": legalNoticePage->slug.current,
  defaultHeroImage { "url": image.asset->url, alt },
  defaultHeroColor, defaultHeroHeight, defaultHeroTextColor
}
```

```groq
// themeSettings
*[_id == "themeSettings"][0] {
  primaryColor, secondaryColor, accentColor,
  backgroundColor, surfaceColor,
  textColor, mutedTextColor, borderColor,
  headingFont, bodyFont,
  h1Size, h2Size, h3Size, bodySize,
  headingWeight, lineHeight,
  buttonRadius, cardRadius, inputRadius, imageRadius,
  sectionPadding, containerMaxWidth
}
```

```groq
// header
*[_id == "header"][0] {
  layout, isSticky, transparentOnHero, hideOnScroll,
  "navigation": navigation-> {
    items[] {
      link { label, linkType, externalUrl, openInNewTab, "internalSlug": internalReference->slug.current, "internalType": internalReference->_type },
      children[] { label, linkType, externalUrl, openInNewTab, "internalSlug": internalReference->slug.current, "internalType": internalReference->_type }
    }
  },
  cta { label, linkType, externalUrl, openInNewTab, "internalSlug": internalReference->slug.current }
}
```

```groq
// footer
*[_id == "footer"][0] {
  columns[] {
    title,
    links[] { label, linkType, externalUrl, openInNewTab, "internalSlug": internalReference->slug.current }
  },
  bottomText, showSocialLinks
}
```

---

## Page d'accueil

```groq
*[_id == "homepage"][0] {
  isPublished,
  content[] { ...sectionFields },  // voir section "Page builder" ci-dessous
  featuredPosts[]-> { _id, title, excerpt, "slug": slug.current, publishedAt, mainImage { "url": image.asset->url, alt }, "author": author->{ name }, "categories": categories[]->{ title } },
  showLatestPosts, latestPostsCount,
  seo { metaTitle, metaDescription, ogTitle, ogDescription, "ogImageUrl": ogImage.image.asset->url, noIndex, canonicalUrl, twitterCardType, focusKeyword },
  sitemapPriority, sitemapChangefreq,
  ai { structuredDataType, allowLlmIndexing, aiSummary, keyPoints, contentIntent, jsonLdOverride }
}
```

Si `showLatestPosts == true`, charger séparément :

```groq
*[_type == "post"] | order(publishedAt desc) [0...$count] {
  _id, title, excerpt, publishedAt,
  "slug": slug.current,
  "image": mainImage { "url": image.asset->url, alt },
  "author": author->{ name },
  "categories": categories[]->{ title }
}
```

---

## Pages génériques

```groq
// Liste des slugs (pour generateStaticParams / getStaticPaths)
*[_type == "page" && isPublished == true] { "slug": slug.current }

// Détail d'une page
*[_type == "page" && slug.current == $slug && isPublished == true][0] {
  title,
  content[] { ...sectionFields },
  seo { metaTitle, metaDescription, ogTitle, ogDescription, "ogImageUrl": ogImage.image.asset->url, noIndex, canonicalUrl, twitterCardType },
  sitemapPriority, sitemapChangefreq,
  ai { structuredDataType, allowLlmIndexing, jsonLdOverride }
}
```

---

## Blog — liste des articles

```groq
// Config de la page blog
*[_id == "blogPage"][0] {
  title, description,
  heroImage { "url": image.asset->url, alt },
  "featuredPost": featuredPost-> { _id, title, excerpt, publishedAt, "slug": slug.current, mainImage { "url": image.asset->url, alt }, "author": author->{ name }, "categories": categories[]->{ title } },
  "featuredCategories": featuredCategories[]->{ _id, title },
  postsPerPage, layout,
  showAuthor, showDate, showExcerpt, showCategory, showReadTime, showCategoryFilter,
  "slug": slug.current,
  seo { metaTitle, metaDescription, ogTitle, ogDescription, "ogImageUrl": ogImage.image.asset->url, noIndex, canonicalUrl, twitterCardType },
  sitemapPriority, sitemapChangefreq
}

// Articles paginés (page 1 = offset 0)
*[_type == "post"] | order(publishedAt desc) [$offset...$limit] {
  _id, title, excerpt, publishedAt,
  "slug": slug.current,
  "image": mainImage { "url": image.asset->url, alt },
  "author": author->{ name, "avatar": photo { "url": image.asset->url } },
  "categories": categories[]->{ _id, title }
}

// Nombre total d'articles (pour la pagination)
count(*[_type == "post"])

// Filtre par catégorie
*[_type == "post" && $categoryId in categories[]._ref] | order(publishedAt desc) [$offset...$limit] { ... }
```

---

## Article de blog

```groq
// Liste des slugs
*[_type == "post"] { "slug": slug.current }

// Détail
*[_type == "post" && slug.current == $slug][0] {
  title, excerpt, publishedAt,
  "image": mainImage { "url": image.asset->url, alt },
  content,   // Portable Text — voir section richText
  "author": author->{ name, bio, "avatar": photo { "url": image.asset->url } },
  "categories": categories[]->{ _id, title },
  seo { metaTitle, metaDescription, ogTitle, ogDescription, "ogImageUrl": ogImage.image.asset->url, noIndex, canonicalUrl, twitterCardType },
  sitemapPriority, sitemapChangefreq,
  ai { structuredDataType, allowLlmIndexing, jsonLdOverride }
}

// Articles liés (même catégorie, hors article courant)
*[_type == "post" && slug.current != $slug && count(categories[@._ref in $categoryIds]) > 0] | order(publishedAt desc) [0..2] {
  _id, title, excerpt, publishedAt, "slug": slug.current, mainImage { "url": image.asset->url, alt }
}
```

---

## Page 404

```groq
*[_id == "notFound"][0] {
  title, description,
  cta { label, linkType, externalUrl, "internalSlug": internalReference->slug.current },
  seo { metaTitle, metaDescription }
}
```

---

## Page builder — rendu des sections

Chaque section possède un champ `_type`. Le front doit router selon ce `_type` :

```tsx
// PageBuilder.tsx
const sectionComponents: Record<string, React.ComponentType<any>> = {
  heroSection: HeroSection,
  textSection: TextSection,
  imageSection: ImageSection,
  videoSection: VideoSection,
  gallerySection: GallerySection,
  ctaSection: CtaSection,
  faqSection: FaqSection,
  pricingSection: PricingSection,
  teamSection: TeamSection,
  testimonialsSection: TestimonialsSection,
  contactSection: ContactSection,
};

export function PageBuilder({ sections }: { sections: any[] }) {
  return (
    <>
      {sections?.map((section) => {
        const Component = sectionComponents[section._type];
        return Component ? <Component key={section._key} {...section} /> : null;
      })}
    </>
  );
}
```

### Détail des champs par section

#### `heroSection`
| Champ | Type | Notes |
|---|---|---|
| `eyebrow` | string | Sur-titre optionnel |
| `title` | string | Obligatoire |
| `subtitle` | string | Texte long optionnel |
| `backgroundImage` | imageWithAlt | `{ image: { asset: { _ref } }, alt }` |
| `primaryCta` | link | Voir objet `link` ci-dessous |
| `secondaryCta` | link | Voir objet `link` ci-dessous |

#### `textSection`
| Champ | Type | Notes |
|---|---|---|
| `content` | PortableText | Rendu avec `@portabletext/react` |

#### `imageSection`
| Champ | Type | Notes |
|---|---|---|
| `image` | imageWithAlt | |
| `caption` | string | Légende optionnelle |
| `fullWidth` | boolean | |

#### `videoSection`
| Champ | Type | Notes |
|---|---|---|
| `title` | string | Optionnel |
| `description` | string | Optionnel |
| `videoUrl` | string | URL YouTube ou Vimeo |
| `autoplay` | boolean | |

Extraire l'ID de la vidéo depuis l'URL pour construire l'embed :
```ts
// YouTube : https://youtube.com/watch?v=ID → https://www.youtube.com/embed/ID
// Vimeo   : https://vimeo.com/ID         → https://player.vimeo.com/video/ID
```

#### `gallerySection`
| Champ | Type | Notes |
|---|---|---|
| `title` | string | Optionnel |
| `images` | imageWithAlt[] | Tableau d'images |

#### `ctaSection`
| Champ | Type | Notes |
|---|---|---|
| `title` | string | |
| `description` | string | Optionnel |
| `cta` | link | |

#### `faqSection`
| Champ | Type | Notes |
|---|---|---|
| `title` | string | |
| `items` | `{ question, answer }[]` | Accordéon |

#### `pricingSection`
| Champ | Type | Notes |
|---|---|---|
| `title` | string | |
| `subtitle` | string | Optionnel |
| `plans` | pricingPlan[] | |

Champs d'un `pricingPlan` :
| Champ | Type |
|---|---|
| `name` | string |
| `price` | string (ex : "29", "Gratuit") |
| `period` | string (ex : "/ mois") |
| `description` | string |
| `features` | string[] |
| `cta` | link |
| `highlighted` | boolean — mettre en valeur visuellement |

#### `teamSection`
La section contient des références — il faut les résoudre dans la requête GROQ :

```groq
// dans la projection content[]
_type == "teamSection" => {
  _type, _key, title, subtitle,
  "members": members[]-> { name, bio, "avatar": photo { "url": image.asset->url }, "slug": slug.current }
}
```

Champs d'un membre (`author`) :
| Champ | Type |
|---|---|
| `name` | string |
| `bio` | string |
| `avatar.url` | string (résolu) |

#### `testimonialsSection`
Même principe — références à résoudre :

```groq
_type == "testimonialsSection" => {
  _type, _key, title,
  "testimonials": testimonials[]-> { name, role, company, quote, rating, "avatar": photo { "url": image.asset->url } }
}
```

Champs d'un `testimonial` :
| Champ | Type |
|---|---|
| `name` | string |
| `role` | string |
| `company` | string |
| `quote` | string |
| `rating` | number (1–5) |
| `avatar.url` | string |

#### `contactSection`
| Champ | Type | Notes |
|---|---|---|
| `title` | string | |
| `description` | string | Optionnel |
| `recipientEmail` | string | À envoyer au service tiers |
| `fields` | formField[] | Champs du formulaire |
| `submitLabel` | string | Libellé du bouton |
| `successMessage` | string | Message post-envoi |

Champs d'un `formField` :
| Champ | Type | Valeurs |
|---|---|---|
| `label` | string | |
| `fieldType` | string | `text`, `email`, `tel`, `textarea` |
| `required` | boolean | |

> L'envoi du formulaire est géré côté front. Services recommandés : **Resend**, **Formspree**, **Netlify Forms**. Le champ `recipientEmail` est passé dans les headers/body de la requête vers le service choisi.

---

## Objet `link` — résolution

```ts
// resolveLink.ts
type SanityLink = {
  label: string;
  linkType: "internal" | "external";
  internalSlug?: string;
  internalType?: string;
  externalUrl?: string;
  openInNewTab?: boolean;
};

export function resolveHref(link: SanityLink, blogSlug = "blog"): string {
  if (link.linkType === "external") return link.externalUrl ?? "#";
  if (!link.internalSlug) return "/";
  if (link.internalType === "homepage") return "/";
  if (link.internalType === "blogPage") return `/${blogSlug}`;
  if (link.internalType === "post") return `/${blogSlug}/${link.internalSlug}`;
  return `/${link.internalSlug}`;
}
```

> La requête GROQ doit résoudre `internalReference->slug.current` et `internalReference->_type` (voir exemples header/footer ci-dessus).

---

## Objet `imageWithAlt`

```ts
type SanityImage = {
  image: { asset: { _ref: string } };
  alt: string;
};

// Utilisation
urlFor(image.image).width(1200).height(630).format("webp").url()
```

---

## Rendu du `richText` (Portable Text)

```tsx
import { PortableText } from "@portabletext/react";

const richTextComponents = {
  types: {
    image: ({ value }: any) => (
      <img src={urlFor(value).width(800).format("webp").url()} alt={value.alt || ""} />
    ),
  },
  marks: {
    link: ({ value, children }: any) => (
      <a href={value.href} target={value.blank ? "_blank" : "_self"} rel="noopener noreferrer">
        {children}
      </a>
    ),
  },
};

<PortableText value={content} components={richTextComponents} />
```

---

## themeSettings — CSS custom properties

Injecter les valeurs de `themeSettings` en CSS custom properties au niveau du `<html>` ou `:root` :

```ts
// injectTheme.ts
export function buildCssVariables(theme: ThemeSettings): string {
  return `
    --color-primary: ${theme.primaryColor};
    --color-secondary: ${theme.secondaryColor};
    --color-accent: ${theme.accentColor};
    --color-bg: ${theme.backgroundColor};
    --color-surface: ${theme.surfaceColor};
    --color-text: ${theme.textColor};
    --color-muted: ${theme.mutedTextColor};
    --color-border: ${theme.borderColor};
    --font-heading: '${theme.headingFont}', sans-serif;
    --font-body: '${theme.bodyFont}', sans-serif;
    --size-h1: ${theme.h1Size};
    --size-h2: ${theme.h2Size};
    --size-h3: ${theme.h3Size};
    --size-body: ${theme.bodySize};
    --weight-heading: ${theme.headingWeight};
    --line-height: ${theme.lineHeight};
    --radius-button: ${theme.buttonRadius};
    --radius-card: ${theme.cardRadius};
    --radius-input: ${theme.inputRadius};
    --radius-image: ${theme.imageRadius};
    --section-padding: ${theme.sectionPadding};
    --container-max-width: ${theme.containerMaxWidth};
  `;
}
```

Charger les Google Fonts dynamiquement :

```ts
export function buildGoogleFontsUrl(headingFont: string, bodyFont: string): string {
  const fonts = [...new Set([headingFont, bodyFont])];
  const query = fonts.map((f) => `family=${f.replace(/ /g, "+")}:wght@400;500;600;700;800`).join("&");
  return `https://fonts.googleapis.com/css2?${query}&display=swap`;
}
```

---

## SEO — implémentation

Chaque page expose un objet `seo`. Règles de fallback :

```ts
const title = seo.ogTitle || seo.metaTitle;
const description = seo.ogDescription || seo.metaDescription;
const image = seo.ogImageUrl;
```

Balises à injecter dans `<head>` :

```html
<title>{seo.metaTitle}</title>
<meta name="description" content="{seo.metaDescription}" />
<meta name="keywords" content="{seo.focusKeyword}" />
{seo.noIndex && <meta name="robots" content="noindex, nofollow" />}
{seo.canonicalUrl && <link rel="canonical" href="{seo.canonicalUrl}" />}

<!-- Open Graph -->
<meta property="og:title" content="{ogTitle}" />
<meta property="og:description" content="{ogDescription}" />
<meta property="og:image" content="{seo.ogImageUrl}" />
<meta property="og:type" content="website" />

<!-- Twitter / X -->
<meta name="twitter:card" content="{seo.twitterCardType}" />
<meta name="twitter:title" content="{ogTitle}" />
<meta name="twitter:description" content="{ogDescription}" />
<meta name="twitter:image" content="{seo.ogImageUrl}" />

<!-- Vérification Search Console -->
<meta name="google-site-verification" content="{siteSettings.googleSiteVerification}" />
<meta name="msvalidate.01" content="{siteSettings.bingSiteVerification}" />
```

---

## Sitemap XML

Générer `/sitemap.xml` en agrégeant :

```groq
// Toutes les URLs
[
  *[_id == "homepage"][0] { "slug": "/", sitemapPriority, sitemapChangefreq, _updatedAt },
  *[_id == "blogPage"][0] { "slug": "/" + slug.current, sitemapPriority, sitemapChangefreq, _updatedAt },
  *[_type == "page" && isPublished == true] { "slug": "/" + slug.current, sitemapPriority, sitemapChangefreq, _updatedAt },
  *[_type == "post"] { "slug": "/" + $blogSlug + "/" + slug.current, sitemapPriority, sitemapChangefreq, _updatedAt }
]
```

---

## robots.txt

Générer `/robots.txt` dynamiquement :

```ts
// robots.ts
export function buildRobotsTxt(siteUrl: string, disallow: string[]): string {
  const rules = disallow.map((path) => `Disallow: ${path}`).join("\n");
  return `User-agent: *\nAllow: /\n${rules}\n\nSitemap: ${siteUrl}/sitemap.xml`;
}
```

---

## Tracking — injection des scripts

Injecter conditionnellement dans `<head>` selon `siteSettings` :

```tsx
// Google Tag Manager / GA4
{googleTagId && (
  <script async src={`https://www.googletagmanager.com/gtag/js?id=${googleTagId}`} />
)}

// Plausible Analytics
{plausibleDomain && (
  <script defer data-domain={plausibleDomain} src="https://plausible.io/js/script.js" />
)}
```

---

## Redirections 301

Appliquer le tableau `siteSettings.redirects` au niveau serveur (Next.js, Astro, etc.) :

```ts
// next.config.ts (exemple Next.js)
const redirects = await client.fetch(`*[_id == "siteSettings"][0].redirects[] { from, to }`);

return redirects.map(({ from, to }: any) => ({
  source: from,
  destination: to,
  permanent: true,
}));
```

---

## Fallback hero (pages sans heroSection)

Si une page ne commence pas par une `heroSection`, utiliser `siteSettings.defaultHero*` :

```ts
function needsDefaultHero(sections: any[]): boolean {
  return !sections?.length || sections[0]._type !== "heroSection";
}

// Hauteurs correspondantes
const heights = { compact: "300px", medium: "500px", large: "700px" };
```

---

## En-tête configurable

L'objet `header` expose :

| Champ | Utilisation front |
|---|---|
| `layout` | `logo-left` / `logo-center` / `logo-right` — classe CSS ou logique de rendu |
| `isSticky` | `position: sticky; top: 0` |
| `transparentOnHero` | Ajouter une classe `header--transparent` si la première section est un `heroSection` |
| `hideOnScroll` | Masquer avec un listener scroll (n'activer que si `isSticky == true`) |
| `navigation.items` | Liens du menu principal, avec `children` pour les sous-menus |
| `cta` | Bouton d'action — résoudre via `resolveHref()` |

---

## Temps de lecture estimé

Si `blogPage.showReadTime == true`, calculer côté front :

```ts
export function estimateReadTime(portableTextContent: any[]): number {
  const text = portableTextContent
    .filter((b) => b._type === "block")
    .flatMap((b) => b.children?.map((c: any) => c.text) ?? [])
    .join(" ");
  const words = text.trim().split(/\s+/).length;
  return Math.max(1, Math.ceil(words / 200)); // ~200 mots/min
}
```

---

## Changelog

| Date | Modification Sanity |
|---|---|
| 2026-03-24 | Création initiale — homepage, pages, posts, blog, 404, header, footer, siteSettings, themeSettings, toutes les sections |
