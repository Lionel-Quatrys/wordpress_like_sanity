import { ErrorOutlineIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

export const notFoundType = defineType({
  name: "notFound",
  title: "Page 404",
  type: "document",
  icon: ErrorOutlineIcon,
  fields: [
    defineField({
      name: "title",
      title: "Titre",
      type: "string",
      description: "Titre principal affiche sur la page 404.",
      initialValue: "Page introuvable",
      validation: (Rule) => Rule.required().max(120),
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      rows: 3,
      description: "Message explicatif affiche sous le titre.",
      initialValue:
        "La page que vous cherchez n'existe pas ou a ete deplacee.",
      validation: (Rule) => Rule.required().max(300),
    }),
    defineField({
      name: "cta",
      title: "Lien de retour",
      type: "object",
      fields: [
        {
          name: "label",
          title: "Libelle du bouton",
          type: "string",
          initialValue: "Retour a l'accueil",
          validation: (Rule: any) => Rule.required().max(60),
        },
        {
          name: "url",
          title: "URL",
          type: "string",
          initialValue: "/",
          validation: (Rule: any) => Rule.required(),
        },
      ],
    }),
    defineField({
      name: "seo",
      title: "SEO",
      type: "seo",
    }),
  ],
  preview: {
    select: {
      title: "title",
    },
    prepare: ({ title }) => ({
      title: title || "Page 404",
      media: ErrorOutlineIcon,
    }),
  },
});
