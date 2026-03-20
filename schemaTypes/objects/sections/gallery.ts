import { defineField, defineType } from "sanity";

export const gallerySectionType = defineType({
  name: "gallerySection",
  title: "Galerie",
  type: "object",
  fields: [
    defineField({
      name: "title",
      title: "Titre",
      type: "string",
    }),
    defineField({
      name: "images",
      title: "Images",
      type: "array",
      of: [{ type: "imageWithAlt" }],
      validation: (Rule) => Rule.required().min(1).max(12),
    }),
  ],
  preview: {
    select: {
      title: "title",
      count: "images",
    },
    prepare: ({ title, count }) => ({
      title: title || "Galerie",
      subtitle: `${count?.length || 0} image(s)`,
    }),
  },
});
