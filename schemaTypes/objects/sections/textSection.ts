import { defineField, defineType } from "sanity";

export const textSectionType = defineType({
  name: "textSection",
  title: "Texte",
  type: "object",
  fields: [
    defineField({
      name: "title",
      title: "Titre",
      type: "string",
      validation: (Rule) => Rule.required().max(120),
    }),
    defineField({
      name: "body",
      title: "Contenu",
      type: "richText",
      validation: (Rule) => Rule.required().min(1),
    }),
  ],
  preview: {
    select: {
      title: "title",
    },
    prepare: ({ title }) => ({
      title: title || "Section texte",
      subtitle: "Bloc de texte enrichi",
    }),
  },
});
