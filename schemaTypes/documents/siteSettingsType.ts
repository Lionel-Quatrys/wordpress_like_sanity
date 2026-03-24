import { defineField, defineType } from "sanity";

export const siteSettingsType = defineType({
  name: "siteSettings",
  title: "Reglages du site",
  type: "document",
  groups: [
    { name: "settings", title: "Reglages", default: true },
    { name: "defaultHero", title: "En-tete par defaut" },
    { name: "contact", title: "Contact" },
    { name: "seo", title: "SEO" },
    { name: "ai", title: "IA" },
    { name: "social", title: "Reseaux sociaux" },
    { name: "tracking", title: "Tracking" },
    { name: "legal", title: "Mentions legales" },
  ],
  fields: [
    // --- En-tête par défaut (fallback pages sans hero) ---
    defineField({
      name: "defaultHeroImage",
      title: "Image d'en-tete par defaut",
      type: "imageWithAlt",
      group: "defaultHero",
      description:
        "Utilisee comme banniere sur les pages qui n'ont pas de section Hero. Dimensions recommandees : 1920 x 600 px (ratio 16/3).",
    }),
    defineField({
      name: "defaultHeroColor",
      title: "Couleur de fond par defaut",
      type: "string",
      group: "defaultHero",
      description:
        "Couleur utilisee si aucune image n'est definie. Format hexadecimal, ex : #1E3A5F. Laisse vide pour utiliser la couleur principale de la charte.",
      validation: (Rule) =>
        Rule.custom((value: string | undefined) => {
          if (!value) return true;
          return /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/.test(value)
            ? true
            : "Utilise le format hexadecimal, ex : #1E3A5F";
        }),
    }),
    defineField({
      name: "defaultHeroHeight",
      title: "Hauteur de l'en-tete",
      type: "string",
      group: "defaultHero",
      initialValue: "medium",
      options: {
        list: [
          { title: "Compact (300px)", value: "compact" },
          { title: "Normal (500px)", value: "medium" },
          { title: "Grand (700px)", value: "large" },
        ],
        layout: "radio",
      },
    }),
    defineField({
      name: "defaultHeroTextColor",
      title: "Couleur du texte sur l'en-tete",
      type: "string",
      group: "defaultHero",
      initialValue: "light",
      description: "Assure le contraste entre le texte et le fond ou l'image.",
      options: {
        list: [
          { title: "Clair (blanc)", value: "light" },
          { title: "Sombre (noir)", value: "dark" },
        ],
        layout: "radio",
      },
    }),

    // --- Réglages généraux ---
    defineField({
      name: "siteName",
      title: "Nom du site",
      type: "string",
      group: "settings",
      validation: (Rule) => Rule.required().min(2).max(80),
    }),
    defineField({
      name: "siteUrl",
      title: "URL du site",
      type: "url",
      group: "settings",
      validation: (Rule) => Rule.required().uri({ scheme: ["http", "https"] }),
    }),
    defineField({
      name: "logo",
      title: "Logo",
      type: "imageWithAlt",
      group: "settings",
    }),
    defineField({
      name: "redirects",
      title: "Redirections",
      type: "array",
      group: "settings",
      description: "Redirections 301 a configurer cote front (ex : anciens slugs).",
      of: [
        {
          type: "object",
          name: "redirect",
          fields: [
            {
              name: "from",
              title: "Depuis",
              type: "string",
              description: "Chemin source, ex : /ancienne-page",
              validation: (Rule: any) => Rule.required(),
            },
            {
              name: "to",
              title: "Vers",
              type: "string",
              description: "Chemin ou URL de destination, ex : /nouvelle-page",
              validation: (Rule: any) => Rule.required(),
            },
          ],
          preview: {
            select: { from: "from", to: "to" },
            prepare: ({ from, to }: { from?: string; to?: string }) => ({
              title: `${from || "?"} → ${to || "?"}`,
            }),
          },
        },
      ],
    }),

    // --- Contact ---
    defineField({
      name: "contactEmail",
      title: "Email de contact",
      type: "string",
      group: "contact",
      validation: (Rule) => Rule.email(),
    }),
    defineField({
      name: "contactPhone",
      title: "Telephone",
      type: "string",
      group: "contact",
    }),
    defineField({
      name: "address",
      title: "Adresse",
      type: "text",
      rows: 3,
      group: "contact",
    }),
    defineField({
      name: "openingHours",
      title: "Horaires d'ouverture",
      type: "array",
      group: "contact",
      of: [
        {
          type: "object",
          name: "openingHour",
          fields: [
            {
              name: "days",
              title: "Jours",
              type: "string",
              description: "Ex : Lundi - Vendredi",
              validation: (Rule: any) => Rule.required().max(40),
            },
            {
              name: "hours",
              title: "Horaires",
              type: "string",
              description: "Ex : 9h - 18h ou Ferme",
              validation: (Rule: any) => Rule.required().max(40),
            },
          ],
          preview: {
            select: { days: "days", hours: "hours" },
            prepare: ({ days, hours }: { days?: string; hours?: string }) => ({
              title: days || "Jours",
              subtitle: hours || "Horaires",
            }),
          },
        },
      ],
    }),

    // --- SEO ---
    defineField({
      name: "globalSeo",
      title: "SEO global",
      type: "seo",
      group: "seo",
    }),
    defineField({
      name: "googleSiteVerification",
      title: "Code verification Google Search Console",
      type: "string",
      group: "seo",
      description: "Valeur du meta tag <meta name='google-site-verification' content='...' />",
    }),
    defineField({
      name: "bingSiteVerification",
      title: "Code verification Bing Webmaster",
      type: "string",
      group: "seo",
      description: "Valeur du meta tag <meta name='msvalidate.01' content='...' />",
    }),
    defineField({
      name: "robotsDisallow",
      title: "Chemins bloques (robots.txt)",
      type: "array",
      group: "seo",
      description: "Chemins a interdire aux robots d'indexation. Ex : /merci, /confirmation",
      of: [{ type: "string" }],
      initialValue: [],
    }),

    // --- IA ---
    defineField({
      name: "globalAi",
      title: "IA globale (valeurs par defaut)",
      type: "aiMetadata",
      group: "ai",
      description: "Utilise ces valeurs comme base pour les pages/articles si besoin.",
      initialValue: {
        structuredDataType: "WebPage",
        allowLlmIndexing: true,
      },
    }),

    // --- Réseaux sociaux ---
    defineField({
      name: "socialLinks",
      title: "Reseaux sociaux",
      type: "array",
      group: "social",
      of: [
        {
          type: "object",
          name: "socialLink",
          fields: [
            {
              name: "platform",
              title: "Plateforme",
              type: "string",
              options: {
                list: [
                  { title: "X / Twitter", value: "x" },
                  { title: "LinkedIn", value: "linkedin" },
                  { title: "Instagram", value: "instagram" },
                  { title: "Facebook", value: "facebook" },
                  { title: "YouTube", value: "youtube" },
                ],
              },
              validation: (Rule: any) => Rule.required(),
            },
            {
              name: "url",
              title: "URL",
              type: "url",
              validation: (Rule: any) =>
                Rule.required().uri({ scheme: ["http", "https"] }),
            },
          ],
          preview: {
            select: { title: "platform", subtitle: "url" },
            prepare: ({
              title,
              subtitle,
            }: {
              title?: string;
              subtitle?: string;
            }) => ({
              title: title || "Reseau social",
              subtitle: subtitle || "URL manquante",
            }),
          },
        },
      ],
    }),

    // --- Tracking ---
    defineField({
      name: "googleTagId",
      title: "Google Tag ID",
      type: "string",
      group: "tracking",
      description: "Ex : G-XXXXXXXXXX ou GTM-XXXXXXX",
      validation: (Rule) => Rule.max(20),
    }),
    defineField({
      name: "plausibleDomain",
      title: "Domaine Plausible Analytics",
      type: "string",
      group: "tracking",
      description: "Ex : monsite.fr (sans https://)",
    }),

    // --- Mentions légales / RGPD ---
    defineField({
      name: "cookieBannerText",
      title: "Texte de la banniere cookies",
      type: "text",
      rows: 3,
      group: "legal",
      initialValue:
        "Ce site utilise des cookies pour ameliorer votre experience. En continuant, vous acceptez notre politique de confidentialite.",
    }),
    defineField({
      name: "privacyPolicyPage",
      title: "Page politique de confidentialite",
      type: "reference",
      to: [{ type: "page" }],
      group: "legal",
    }),
    defineField({
      name: "legalNoticePage",
      title: "Page mentions legales",
      type: "reference",
      to: [{ type: "page" }],
      group: "legal",
    }),
  ],
  initialValue: {
    siteName: "Mon site",
    socialLinks: [],
    redirects: [],
    openingHours: [],
  },
  preview: {
    select: {
      title: "siteName",
      media: "logo.image",
      subtitle: "siteUrl",
    },
    prepare: ({ title, media, subtitle }) => ({
      title: title || "Reglages globaux",
      subtitle: subtitle || "URL non definie",
      media,
    }),
  },
});
