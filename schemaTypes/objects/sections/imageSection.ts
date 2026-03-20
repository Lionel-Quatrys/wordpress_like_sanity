import { defineField, defineType } from "sanity";

export const imageSectionType = defineType({
  name: "imageSection",
  title: "Image",
  type: "object",
  fields: [
    defineField({
      name: "title",
      title: "Titre",
      type: "string",
    }),
    defineField({
      name: "image",
      title: "Image",
      type: "imageWithAlt",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "caption",
      title: "Legende",
      type: "string",
    }),
    defineField({
      name: "alignment",
      title: "Alignement",
      type: "string",
      initialValue: "center",
      options: {
        list: [
          { title: "Gauche", value: "left" },
          { title: "Centre", value: "center" },
          { title: "Droite", value: "right" },
        ],
        layout: "radio",
      },
    }),
  ],
  preview: {
    select: {
      title: "title",
      media: "image.image",
    },
    prepare: ({ title, media }) => ({
      title: title || "Section image",
      subtitle: "Image simple",
      media,
    }),
  },
});
