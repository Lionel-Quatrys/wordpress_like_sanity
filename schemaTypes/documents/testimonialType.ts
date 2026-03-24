import { StarIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

export const testimonialType = defineType({
  name: "testimonial",
  title: "Temoignage",
  type: "document",
  icon: StarIcon,
  fields: [
    defineField({
      name: "author",
      title: "Nom",
      type: "string",
      validation: (Rule) => Rule.required().max(80),
    }),
    defineField({
      name: "role",
      title: "Poste / Entreprise",
      type: "string",
      validation: (Rule) => Rule.max(100),
    }),
    defineField({
      name: "avatar",
      title: "Photo",
      type: "imageWithAlt",
    }),
    defineField({
      name: "quote",
      title: "Temoignage",
      type: "text",
      rows: 4,
      validation: (Rule) => Rule.required().min(10).max(500),
    }),
    defineField({
      name: "rating",
      title: "Note",
      type: "number",
      options: {
        list: [
          { title: "★★★★★ (5)", value: 5 },
          { title: "★★★★☆ (4)", value: 4 },
          { title: "★★★☆☆ (3)", value: 3 },
        ],
        layout: "radio",
      },
      initialValue: 5,
    }),
  ],
  preview: {
    select: {
      title: "author",
      subtitle: "role",
      media: "avatar.image",
    },
    prepare: ({ title, subtitle, media }) => ({
      title: title || "Temoignage sans nom",
      subtitle: subtitle || "",
      media,
    }),
  },
});
