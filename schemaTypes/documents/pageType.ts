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
        defineArrayMember({ type: "gallerySection" }),
        defineArrayMember({ type: "ctaSection" }),
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
      name: "ai",
      title: "IA et donnees structurees",
      type: "aiMetadata",
      group: "ai",
      initialValue: {
        structuredDataType: "WebPage",
        allowLlmIndexing: true,
      },
    }),
    defineField({
      name: "isPublished",
      title: "Visible sur le site",
      type: "boolean",
      initialValue: true,
      group: "settings",
    }),
  ],
  preview: {
    select: {
      title: "title",
      slug: "slug.current",
      sectionCount: "content",
    },
    prepare: ({ title, slug, sectionCount }) => ({
      title: title || "Page sans titre",
      subtitle: `/${slug || "sans-slug"} - ${sectionCount?.length || 0} section(s)`,
    }),
  },
});
