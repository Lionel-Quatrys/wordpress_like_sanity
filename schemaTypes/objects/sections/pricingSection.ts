import { defineArrayMember, defineField, defineType } from "sanity";

export const pricingSectionType = defineType({
  name: "pricingSection",
  title: "Section tarifs",
  type: "object",
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
      name: "plans",
      title: "Offres",
      type: "array",
      of: [
        {
          type: "object",
          name: "pricingPlan",
          fields: [
            {
              name: "name",
              title: "Nom de l'offre",
              type: "string",
              validation: (Rule: any) => Rule.required().max(60),
            },
            {
              name: "price",
              title: "Prix",
              type: "string",
              description: "Ex : 29, Gratuit, Sur devis",
              validation: (Rule: any) => Rule.required().max(20),
            },
            {
              name: "period",
              title: "Periode",
              type: "string",
              description: "Ex : / mois, / an, unique",
              validation: (Rule: any) => Rule.max(20),
            },
            {
              name: "description",
              title: "Description courte",
              type: "string",
              validation: (Rule: any) => Rule.max(150),
            },
            {
              name: "features",
              title: "Caracteristiques incluses",
              type: "array",
              of: [{ type: "string" }],
              validation: (Rule: any) => Rule.required().min(1),
            },
            {
              name: "cta",
              title: "Bouton d'action",
              type: "link",
            },
            {
              name: "highlighted",
              title: "Offre mise en avant",
              type: "boolean",
              initialValue: false,
              description: "Met visuellement cette offre en valeur (ex : badge 'Populaire').",
            },
          ],
          preview: {
            select: {
              name: "name",
              price: "price",
              period: "period",
              highlighted: "highlighted",
            },
            prepare: ({
              name,
              price,
              period,
              highlighted,
            }: {
              name?: string;
              price?: string;
              period?: string;
              highlighted?: boolean;
            }) => ({
              title: `${name || "Offre"}${highlighted ? " ★" : ""}`,
              subtitle: `${price || "?"}${period ? ` ${period}` : ""}`,
            }),
          },
        },
      ],
      validation: (Rule) => Rule.required().min(1).max(5),
    }),
  ],
  preview: {
    select: {
      title: "title",
      plans: "plans",
    },
    prepare: ({ title, plans }) => ({
      title: title || "Section tarifs",
      subtitle: `${plans?.length || 0} offre(s)`,
    }),
  },
});
