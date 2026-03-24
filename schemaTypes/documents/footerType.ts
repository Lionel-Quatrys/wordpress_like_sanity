import { defineArrayMember, defineField, defineType } from "sanity";

export const footerType = defineType({
  name: "footer",
  title: "Pied de page",
  type: "document",
  groups: [
    { name: "content", title: "Contenu", default: true },
    { name: "settings", title: "Reglages" },
  ],
  fields: [
    defineField({
      name: "columns",
      title: "Colonnes de liens",
      type: "array",
      group: "content",
      description: "Organisez les liens du footer en colonnes.",
      of: [
        {
          type: "object",
          name: "footerColumn",
          fields: [
            {
              name: "title",
              title: "Titre de la colonne",
              type: "string",
              validation: (Rule: any) => Rule.required().max(60),
            },
            {
              name: "links",
              title: "Liens",
              type: "array",
              of: [defineArrayMember({ type: "link" })],
              validation: (Rule: any) => Rule.required().min(1),
            },
          ],
          preview: {
            select: { title: "title", links: "links" },
            prepare: ({
              title,
              links,
            }: {
              title?: string;
              links?: unknown[];
            }) => ({
              title: title || "Colonne sans titre",
              subtitle: `${links?.length || 0} lien(s)`,
            }),
          },
        },
      ],
    }),
    defineField({
      name: "bottomText",
      title: "Texte de bas de page",
      type: "string",
      group: "content",
      description: "Ex : © 2025 Mon Site. Tous droits reserves.",
      initialValue: `© ${new Date().getFullYear()} Mon Site. Tous droits reserves.`,
      validation: (Rule) => Rule.max(200),
    }),
    defineField({
      name: "showSocialLinks",
      title: "Afficher les reseaux sociaux",
      type: "boolean",
      group: "settings",
      description: "Affiche les reseaux sociaux definis dans les Reglages du site.",
      initialValue: true,
    }),
  ],
  preview: {
    select: {
      columns: "columns",
      bottomText: "bottomText",
    },
    prepare: ({ columns, bottomText }) => ({
      title: "Pied de page",
      subtitle: `${columns?.length || 0} colonne(s) — ${bottomText || ""}`,
    }),
  },
});
