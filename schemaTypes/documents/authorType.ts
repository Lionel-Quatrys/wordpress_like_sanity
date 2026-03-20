import { defineField, defineType } from "sanity";

export const authorType = defineType({
  name: "author",
  title: "Auteur",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Nom",
      type: "string",
      validation: (Rule) => Rule.required().min(2).max(80),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slugObject",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "image",
      title: "Photo",
      type: "imageWithAlt",
    }),
    defineField({
      name: "bio",
      title: "Bio",
      type: "richText",
    }),
  ],
  preview: {
    select: {
      title: "name",
      media: "image.image",
      subtitle: "slug.current",
    },
    prepare: ({ title, media, subtitle }) => ({
      title: title || "Auteur sans nom",
      subtitle: subtitle ? `/${subtitle}` : "Sans slug",
      media,
    }),
  },
});
