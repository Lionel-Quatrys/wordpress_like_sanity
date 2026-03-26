import { StarIcon } from "@sanity/icons";
import { defineArrayMember, defineField, defineType } from "sanity";
import { isModuleEnabled } from "../../../src/moduleCache";

export const testimonialsSectionType = defineType({
  name: "testimonialsSection",
  title: "Section temoignages",
  type: "object",
  icon: StarIcon,
  hidden: ({ currentUser }) =>
    !currentUser?.roles?.some((r: any) => r.name === "editor") &&
    !isModuleEnabled("testimonials"),
  fields: [
    defineField({
      name: "title",
      title: "Titre",
      type: "string",
      validation: (Rule) => Rule.required().max(120),
    }),
    defineField({
      name: "subtitle",
      title: "Sous-titre",
      type: "string",
      validation: (Rule) => Rule.max(200),
    }),
    defineField({
      name: "testimonials",
      title: "Temoignages",
      type: "array",
      of: [
        defineArrayMember({
          type: "reference",
          to: [{ type: "testimonial" }],
        }),
      ],
      validation: (Rule) => Rule.required().min(1).unique(),
    }),
  ],
  preview: {
    select: {
      title: "title",
      count: "testimonials",
    },
    prepare: ({ title, count }) => ({
      title: title || "Section temoignages",
      subtitle: `${count?.length || 0} temoignage(s)`,
      media: StarIcon,
    }),
  },
});
