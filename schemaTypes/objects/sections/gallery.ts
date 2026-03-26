import { defineField, defineType } from "sanity";
import { isModuleEnabled } from "../../../src/moduleCache";

export const gallerySectionType = defineType({
  name: "gallerySection",
  title: "Galerie",
  type: "object",
  hidden: ({ currentUser }) =>
    !currentUser?.roles?.some((r: any) => r.name === "administrator") &&
    !isModuleEnabled("gallery"),
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
