import { HomeIcon } from "@sanity/icons";
import { defineArrayMember, defineField, defineType } from "sanity";

export const homepageType = defineType({
  name: "homepage",
  title: "Page d'accueil",
  type: "document",
  icon: HomeIcon,
  groups: [
    { name: "content", title: "Contenu", default: true },
    { name: "posts", title: "Articles" },
    { name: "seo", title: "SEO" },
    { name: "ai", title: "IA" },
    { name: "settings", title: "Reglages" },
  ],
  fields: [
    defineField({
      name: "title",
      title: "Titre interne",
      type: "string",
      group: "content",
      description: "Titre utilise uniquement dans le studio (non affiche sur le site).",
      initialValue: "Page d'accueil",
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
    }),
    defineField({
      name: "featuredPosts",
      title: "Articles mis en avant",
      type: "array",
      group: "posts",
      description: "Selectionnez les articles a mettre en avant sur la page d'accueil.",
      of: [
        defineArrayMember({
          type: "reference",
          to: [{ type: "post" }],
        }),
      ],
      validation: (Rule) => Rule.unique().max(6),
    }),
    defineField({
      name: "showLatestPosts",
      title: "Afficher les derniers articles",
      type: "boolean",
      group: "posts",
      description: "Affiche automatiquement les derniers articles publies sur la page d'accueil.",
      initialValue: true,
    }),
    defineField({
      name: "latestPostsCount",
      title: "Nombre d'articles recents a afficher",
      type: "number",
      group: "posts",
      initialValue: 3,
      hidden: ({ document }) => !document?.showLatestPosts,
      validation: (Rule) => Rule.min(1).max(12).integer(),
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
        structuredDataType: "WebSite",
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
      sectionCount: "content",
    },
    prepare: ({ title, sectionCount }) => ({
      title: title || "Page d'accueil",
      subtitle: `${sectionCount?.length || 0} section(s)`,
      media: HomeIcon,
    }),
  },
});
