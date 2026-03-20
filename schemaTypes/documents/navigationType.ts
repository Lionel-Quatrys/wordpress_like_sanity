import { defineField, defineType } from "sanity";

export const navigationType = defineType({
  name: "navigation",
  title: "Navigation",
  type: "document",
  groups: [
    { name: "content", title: "Contenu", default: true },
    { name: "settings", title: "Reglages" },
  ],
  fields: [
    defineField({
      name: "title",
      title: "Nom du menu",
      type: "string",
      group: "settings",
      initialValue: "Menu principal",
      validation: (Rule) => Rule.required().max(80),
    }),
    defineField({
      name: "items",
      title: "Liens du menu",
      type: "array",
      group: "content",
      of: [
        {
          type: "object",
          name: "navigationItem",
          title: "Lien",
          fields: [
            {
              name: "link",
              title: "Lien",
              type: "link",
              validation: (Rule: any) => Rule.required(),
            },
            {
              name: "children",
              title: "Sous-liens",
              type: "array",
              of: [{ type: "link" }],
            },
          ],
          preview: {
            select: {
              title: "link.label",
              subtitleExternal: "link.externalUrl",
              subtitleInternal: "link.internalReference.title",
            },
            prepare: ({
              title,
              subtitleExternal,
              subtitleInternal,
            }: {
              title?: string;
              subtitleExternal?: string;
              subtitleInternal?: string;
            }) => ({
              title: title || "Lien",
              subtitle:
                subtitleInternal || subtitleExternal || "Sans destination",
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
      count: "items",
    },
    prepare: ({ title, count }) => ({
      title: title || "Navigation",
      subtitle: `${count?.length || 0} lien(s)`,
    }),
  },
});
