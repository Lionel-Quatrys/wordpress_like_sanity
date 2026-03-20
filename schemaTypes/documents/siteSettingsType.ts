import { defineField, defineType } from "sanity";

export const siteSettingsType = defineType({
  name: "siteSettings",
  title: "Reglages du site",
  type: "document",
  groups: [
    { name: "settings", title: "Reglages", default: true },
    { name: "seo", title: "SEO" },
    { name: "ai", title: "IA" },
    { name: "social", title: "Reseaux sociaux" },
  ],
  fields: [
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
      name: "globalSeo",
      title: "SEO global",
      type: "seo",
      group: "seo",
    }),
    defineField({
      name: "globalAi",
      title: "IA globale (valeurs par defaut)",
      type: "aiMetadata",
      group: "ai",
      description:
        "Utilise ces valeurs comme base pour les pages/articles si besoin.",
      initialValue: {
        structuredDataType: "WebPage",
        allowLlmIndexing: true,
      },
    }),
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
            select: {
              title: "platform",
              subtitle: "url",
            },
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
  ],
  initialValue: {
    siteName: "Mon site",
    socialLinks: [],
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
