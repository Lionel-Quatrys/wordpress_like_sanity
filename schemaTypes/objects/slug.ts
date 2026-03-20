import { defineField, defineType } from "sanity";

export const slugType = defineType({
  name: "slugObject",
  title: "Slug",
  type: "object",
  fields: [
    defineField({
      name: "current",
      title: "Slug",
      type: "slug",
      options: {
        source: "title",
        maxLength: 96,
        slugify: (input: string) =>
          input
            .toLowerCase()
            .trim()
            .replace(/\s+/g, "-")
            .replace(/[^a-z0-9-]/g, "")
            .slice(0, 96),
      },
      validation: (Rule) => Rule.required(),
    }),
  ],
  validation: (Rule) =>
    Rule.custom((value) =>
      value?.current ? true : "Le slug est obligatoire.",
    ),
});
