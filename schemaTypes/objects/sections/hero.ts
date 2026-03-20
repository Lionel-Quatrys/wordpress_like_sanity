import { defineField, defineType } from "sanity";

export const heroSectionType = defineType({
  name: "heroSection",
  title: "Hero",
  type: "object",
  fields: [
    defineField({
      name: "eyebrow",
      title: "Sur-titre",
      type: "string",
    }),
    defineField({
      name: "title",
      title: "Titre",
      type: "string",
      validation: (Rule) => Rule.required().max(120),
    }),
    defineField({
      name: "subtitle",
      title: "Sous-titre",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "backgroundImage",
      title: "Image de fond",
      type: "imageWithAlt",
    }),
    defineField({
      name: "primaryCta",
      title: "CTA principal",
      type: "link",
    }),
    defineField({
      name: "secondaryCta",
      title: "CTA secondaire",
      type: "link",
    }),
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "subtitle",
    },
    prepare: ({ title, subtitle }) => ({
      title: title || "Hero",
      subtitle: subtitle || "Section Hero",
    }),
  },
});
