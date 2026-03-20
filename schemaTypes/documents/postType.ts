import { defineField, defineType } from "sanity";

export const postType = defineType({
  name: "post",
  title: "Article",
  type: "document",
  groups: [
    { name: "content", title: "Contenu", default: true },
    { name: "seo", title: "SEO" },
    { name: "ai", title: "IA" },
    { name: "settings", title: "Reglages" },
  ],
  fields: [
    defineField({
      name: "title",
      title: "Titre",
      type: "string",
      group: "content",
      validation: (Rule) => Rule.required().min(3).max(140),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slugObject",
      group: "settings",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "excerpt",
      title: "Extrait",
      type: "text",
      rows: 3,
      group: "content",
      validation: (Rule) => Rule.required().max(220),
    }),
    defineField({
      name: "mainImage",
      title: "Image principale",
      type: "imageWithAlt",
      group: "content",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "content",
      title: "Contenu riche",
      type: "richText",
      group: "content",
      validation: (Rule) => Rule.required().min(1),
    }),
    defineField({
      name: "categories",
      title: "Categories",
      type: "array",
      group: "settings",
      of: [{ type: "reference", to: [{ type: "category" }] }],
      validation: (Rule) => Rule.required().min(1),
    }),
    defineField({
      name: "author",
      title: "Auteur",
      type: "reference",
      to: [{ type: "author" }],
      group: "settings",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "publishedAt",
      title: "Date de publication",
      type: "datetime",
      group: "settings",
      initialValue: () => new Date().toISOString(),
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "seo",
      title: "SEO",
      type: "seo",
      group: "seo",
    }),
    defineField({
      name: "ai",
      title: "IA et donnees structurees",
      type: "aiMetadata",
      group: "ai",
      initialValue: {
        structuredDataType: "Article",
        allowLlmIndexing: true,
      },
    }),
  ],
  orderings: [
    {
      title: "Date de publication (recent d abord)",
      name: "publishedAtDesc",
      by: [{ field: "publishedAt", direction: "desc" }],
    },
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "author.name",
      media: "mainImage.image",
      date: "publishedAt",
    },
    prepare: ({ title, subtitle, media, date }) => ({
      title: title || "Article sans titre",
      subtitle: `${subtitle || "Auteur inconnu"} - ${date ? new Date(date).toLocaleDateString("fr-FR") : "Sans date"}`,
      media,
    }),
  },
});
