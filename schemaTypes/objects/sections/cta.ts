import { defineField, defineType } from "sanity";

export const ctaSectionType = defineType({
  name: "ctaSection",
  title: "CTA",
  type: "object",
  fields: [
    defineField({
      name: "title",
      title: "Titre",
      type: "string",
      validation: (Rule) => Rule.required().max(120),
    }),
    defineField({
      name: "text",
      title: "Texte",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "button",
      title: "Bouton",
      type: "link",
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: {
      title: "title",
    },
    prepare: ({ title }) => ({
      title: title || "CTA",
      subtitle: "Call to action",
    }),
  },
});
