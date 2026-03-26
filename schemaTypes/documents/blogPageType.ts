import { DocumentsIcon } from "@sanity/icons";
import { defineArrayMember, defineField, defineType } from "sanity";

export const blogPageType = defineType({
  name: "blogPage",
  title: "Page Blog",
  type: "document",
  icon: DocumentsIcon,
  groups: [
    { name: "content", title: "Contenu", default: true },
    { name: "display", title: "Affichage" },
    { name: "seo", title: "SEO" },
    { name: "ai", title: "IA" },
    { name: "settings", title: "Reglages" },
  ],
  fields: [
    // ---- Contenu ----
    defineField({
      name: "title",
      title: "Titre de la page",
      type: "string",
      group: "content",
      description: "Titre H1 affiche en haut de la liste des articles. Ex : Blog, Actualites",
      initialValue: "Blog",
      validation: (Rule) => Rule.required().max(120),
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      rows: 3,
      group: "content",
      description: "Texte d'introduction affiche sous le titre.",
      validation: (Rule) => Rule.max(300),
    }),
    defineField({
      name: "heroImage",
      title: "Image d'en-tete",
      type: "imageWithAlt",
      group: "content",
      description: "Image de banniere optionnelle en haut de la page.",
    }),
    defineField({
      name: "featuredPost",
      title: "Article mis en avant",
      type: "reference",
      to: [{ type: "post" }],
      group: "content",
      description: "Article epingle en haut de la liste, mis en evidence visuellement.",
    }),
    defineField({
      name: "featuredCategories",
      title: "Categories mises en avant",
      type: "array",
      group: "content",
      description: "Ordre d'affichage des categories dans le filtre. Laisse vide pour tout afficher.",
      of: [
        defineArrayMember({
          type: "reference",
          to: [{ type: "category" }],
        }),
      ],
      validation: (Rule) => Rule.unique(),
    }),

    // ---- Affichage ----
    defineField({
      name: "postsPerPage",
      title: "Articles par page",
      type: "number",
      group: "display",
      initialValue: 9,
      options: {
        list: [
          { title: "6", value: 6 },
          { title: "9", value: 9 },
          { title: "12", value: 12 },
          { title: "15", value: 15 },
        ],
        layout: "radio",
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "layout",
      title: "Disposition des articles",
      type: "string",
      group: "display",
      initialValue: "grid-3",
      options: {
        list: [
          { title: "Grille 3 colonnes", value: "grid-3" },
          { title: "Grille 2 colonnes", value: "grid-2" },
          { title: "Liste", value: "list" },
        ],
        layout: "radio",
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "showAuthor",
      title: "Afficher l'auteur",
      type: "boolean",
      group: "display",
      initialValue: true,
    }),
    defineField({
      name: "showDate",
      title: "Afficher la date",
      type: "boolean",
      group: "display",
      initialValue: true,
    }),
    defineField({
      name: "showExcerpt",
      title: "Afficher l'extrait",
      type: "boolean",
      group: "display",
      initialValue: true,
    }),
    defineField({
      name: "showCategory",
      title: "Afficher la categorie",
      type: "boolean",
      group: "display",
      initialValue: true,
    }),
    defineField({
      name: "showReadTime",
      title: "Afficher le temps de lecture estim\u00e9",
      type: "boolean",
      group: "display",
      initialValue: false,
      description: "Calcule automatiquement une estimation cote front (~200 mots/min).",
    }),
    defineField({
      name: "showCategoryFilter",
      title: "Afficher le filtre par categorie",
      type: "boolean",
      group: "display",
      initialValue: true,
    }),

    // ---- SEO ----
    defineField({
      name: "seo",
      title: "SEO",
      type: "seo",
      group: "seo",
    }),
    defineField({
      name: "sitemapPriority",
      title: "Priorite dans le sitemap",
      type: "string",
      group: "seo",
      initialValue: "0.8",
      options: {
        list: [
          { title: "Tres haute (1.0)", value: "1.0" },
          { title: "Haute (0.8)", value: "0.8" },
          { title: "Normale (0.5)", value: "0.5" },
          { title: "Basse (0.3)", value: "0.3" },
          { title: "Tres basse (0.1)", value: "0.1" },
        ],
        layout: "radio",
      },
    }),
    defineField({
      name: "sitemapChangefreq",
      title: "Frequence de mise a jour (sitemap)",
      type: "string",
      group: "seo",
      initialValue: "daily",
      description: "La page blog se met a jour a chaque nouvel article.",
      options: {
        list: [
          { title: "Toujours (always)", value: "always" },
          { title: "Chaque heure (hourly)", value: "hourly" },
          { title: "Quotidienne (daily)", value: "daily" },
          { title: "Hebdomadaire (weekly)", value: "weekly" },
          { title: "Mensuelle (monthly)", value: "monthly" },
          { title: "Annuelle (yearly)", value: "yearly" },
          { title: "Jamais (never)", value: "never" },
        ],
        layout: "radio",
      },
    }),

    // ---- IA ----
    defineField({
      name: "ai",
      title: "IA et donnees structurees",
      type: "aiMetadata",
      group: "ai",
      initialValue: {
        structuredDataType: "CollectionPage",
        allowLlmIndexing: true,
      },
    }),

    // ---- Réglages ----
    defineField({
      name: "slug",
      title: "Chemin URL",
      type: "slugObject",
      group: "settings",
      description: "Chemin d'acces au blog. Ex : 'blog' donnera /blog, 'actualites' donnera /actualites",
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: {
      title: "title",
      slug: "slug.current",
    },
    prepare: ({ title, slug }) => ({
      title: title || "Page Blog",
      subtitle: slug ? `/${slug}` : "Slug non defini",
      media: DocumentsIcon,
    }),
  },
});
