import { defineField, defineType } from "sanity";

export const imageWithAltType = defineType({
  name: "imageWithAlt",
  title: "Image avec alt",
  type: "object",
  fields: [
    defineField({
      name: "image",
      title: "Image",
      type: "image",
      options: { hotspot: true },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "alt",
      title: "Texte alternatif",
      type: "string",
      description:
        "Utilise une description concise et utile pour l'accessibilite.",
      validation: (Rule) => Rule.required().min(5).max(140),
    }),
  ],
  preview: {
    select: {
      title: "alt",
      media: "image",
    },
    prepare: ({ title, media }) => ({
      title: title || "Image",
      subtitle: "Image avec texte alternatif",
      media,
    }),
  },
});
