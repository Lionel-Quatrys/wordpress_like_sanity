import { defineArrayMember, defineField, defineType } from "sanity";

export const pageType = defineType({
  name: "page",
  title: "Page",
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
      validation: (Rule) => Rule.required().min(3).max(120),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slugObject",
      group: "settings",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "content",
      title: "Page builder",
      type: "array",
      group: "content",
      of: [
        defineArrayMember({ type: "heroSection" }),
        defineArrayMember({ type: "textSection" }),
        defineArrayMember({ type: "imageSection" }),
        defineArrayMember({ type: "ctaSection" }),
        defineArrayMember({ type: "gallerySection" }),
        defineArrayMember({ type: "faqSection" }),
        defineArrayMember({ type: "videoSection" }),
        defineArrayMember({ type: "pricingSection" }),
        defineArrayMember({ type: "teamSection" }),
        defineArrayMember({ type: "contactSection" }),
        defineArrayMember({ type: "testimonialsSection" }),
      ],
      validation: (Rule) => Rule.required().min(1),
    }),
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
      initialValue: "0.5",
      description: "Importance relative de cette page dans le sitemap (1.0 = max).",
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
      initialValue: "monthly",
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
    defineField({
      name: "ai",
      title: "IA et donnees structurees",
      type: "aiMetadata",
      group: "ai",
      initialValue: {
        structuredDataType: "WebPage",
        allowLlmIndexing: true,
      },
    }),
  ],
  preview: {
    select: {
      title: "title",
      slug: "slug.current.current",
      sectionCount: "content",
    },
    prepare: ({ title, slug, sectionCount }) => ({
      title: title || "Page sans titre",
      subtitle: `/${slug || "sans-slug"} - ${sectionCount?.length || 0} section(s)`,
    }),
  },
});
