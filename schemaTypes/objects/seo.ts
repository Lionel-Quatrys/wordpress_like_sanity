import { defineField, defineType } from "sanity";

export const seoType = defineType({
  name: "seo",
  title: "SEO",
  type: "object",
  groups: [
    { name: "meta", title: "Meta", default: true },
    { name: "social", title: "Reseaux sociaux" },
    { name: "advanced", title: "Avance" },
  ],
  fields: [
    // ---- Meta ----
    defineField({
      name: "metaTitle",
      title: "Meta title",
      type: "string",
      group: "meta",
      description: "Titre affiche dans les resultats de recherche. 50-60 caracteres recommandes.",
      validation: (Rule) => Rule.required().max(60),
    }),
    defineField({
      name: "metaDescription",
      title: "Meta description",
      type: "text",
      rows: 3,
      group: "meta",
      description: "Description affichee dans les resultats de recherche. 140-160 caracteres recommandes.",
      validation: (Rule) => Rule.required().max(160),
    }),
    defineField({
      name: "focusKeyword",
      title: "Mot-cle principal",
      type: "string",
      group: "meta",
      description: "Mot-cle cible pour cette page. Verifie qu'il apparait dans le titre, la description et le contenu.",
      validation: (Rule) => Rule.max(80),
    }),
    defineField({
      name: "noIndex",
      title: "Masquer des moteurs de recherche (noindex)",
      type: "boolean",
      group: "meta",
      initialValue: false,
      description: "Active noindex pour empecher l'indexation de cette page.",
    }),
    defineField({
      name: "canonicalUrl",
      title: "URL canonique",
      type: "url",
      group: "meta",
      description: "Laisse vide pour utiliser l'URL de la page. Renseigne uniquement si cette page est une copie d'une autre.",
      validation: (Rule) =>
        Rule.uri({ allowRelative: false, scheme: ["http", "https"] }),
    }),

    // ---- Réseaux sociaux (Open Graph / Twitter) ----
    defineField({
      name: "ogTitle",
      title: "Titre Open Graph",
      type: "string",
      group: "social",
      description: "Titre affiche lors du partage sur les reseaux sociaux. Si vide, utilise le meta title.",
      validation: (Rule) => Rule.max(70),
    }),
    defineField({
      name: "ogDescription",
      title: "Description Open Graph",
      type: "text",
      rows: 3,
      group: "social",
      description: "Description affichee lors du partage. Si vide, utilise la meta description.",
      validation: (Rule) => Rule.max(200),
    }),
    defineField({
      name: "ogImage",
      title: "Image Open Graph",
      type: "imageWithAlt",
      group: "social",
      description: "Recommande : 1200x630px. Utilisee pour Facebook, LinkedIn, Twitter.",
    }),
    defineField({
      name: "twitterCardType",
      title: "Format Twitter / X",
      type: "string",
      group: "social",
      initialValue: "summary_large_image",
      options: {
        list: [
          { title: "Grande image (summary_large_image)", value: "summary_large_image" },
          { title: "Vignette (summary)", value: "summary" },
        ],
        layout: "radio",
      },
    }),
  ],
  preview: {
    select: {
      title: "metaTitle",
      subtitle: "metaDescription",
    },
    prepare: ({ title, subtitle }) => ({
      title: title || "SEO",
      subtitle: subtitle || "Aucune description",
    }),
  },
});
