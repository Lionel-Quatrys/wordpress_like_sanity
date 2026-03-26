import { defineField, defineType } from "sanity";
import { isModuleEnabled } from "../../../src/moduleCache";

export const faqSectionType = defineType({
  name: "faqSection",
  title: "FAQ",
  type: "object",
  hidden: ({ currentUser }) =>
    !currentUser?.roles?.some((r: any) => r.name === "administrator") &&
    !isModuleEnabled("faq"),
  fields: [
    defineField({
      name: "title",
      title: "Titre",
      type: "string",
      initialValue: "Questions frequentes",
    }),
    defineField({
      name: "items",
      title: "Questions",
      type: "array",
      of: [
        {
          type: "object",
          name: "faqItem",
          title: "Question / reponse",
          fields: [
            {
              name: "question",
              title: "Question",
              type: "string",
              validation: (Rule: any) => Rule.required().max(140),
            },
            {
              name: "answer",
              title: "Reponse",
              type: "richText",
              validation: (Rule: any) => Rule.required().min(1),
            },
          ],
          preview: {
            select: {
              title: "question",
            },
            prepare: ({ title }: { title?: string }) => ({
              title: title || "Question sans titre",
            }),
          },
        },
      ],
      validation: (Rule) => Rule.required().min(1),
    }),
  ],
  preview: {
    select: {
      title: "title",
      items: "items",
    },
    prepare: ({ title, items }) => ({
      title: title || "FAQ",
      subtitle: `${items?.length || 0} question(s)`,
    }),
  },
});
