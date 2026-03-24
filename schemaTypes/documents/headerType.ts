import { ComponentIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

export const headerType = defineType({
  name: "header",
  title: "En-tete",
  type: "document",
  icon: ComponentIcon,
  groups: [
    { name: "content", title: "Contenu", default: true },
    { name: "display", title: "Affichage" },
  ],
  fields: [
    // ---- Contenu ----
    defineField({
      name: "navigation",
      title: "Menu principal",
      type: "reference",
      to: [{ type: "navigation" }],
      group: "content",
      description: "Menu affiche dans le header. A configurer dans la section Navigation.",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "cta",
      title: "Bouton d'action",
      type: "link",
      group: "content",
      description: "Bouton mis en evidence dans le header (ex : Nous contacter, Devis gratuit).",
    }),

    // ---- Affichage ----
    defineField({
      name: "layout",
      title: "Disposition",
      type: "string",
      group: "display",
      initialValue: "logo-left",
      options: {
        list: [
          { title: "Logo a gauche, navigation a droite", value: "logo-left" },
          { title: "Logo centre, navigation en dessous", value: "logo-center" },
          { title: "Navigation a gauche, logo a droite", value: "logo-right" },
        ],
        layout: "radio",
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "isSticky",
      title: "Header fixe au scroll",
      type: "boolean",
      group: "display",
      initialValue: true,
      description: "Le header reste visible en haut de page lors du defilement.",
    }),
    defineField({
      name: "transparentOnHero",
      title: "Transparent sur les sections Hero",
      type: "boolean",
      group: "display",
      initialValue: false,
      description: "Rend le header transparent quand la page commence par une section Hero (effet de superposition sur l'image).",
    }),
    defineField({
      name: "hideOnScroll",
      title: "Masquer au scroll vers le bas",
      type: "boolean",
      group: "display",
      initialValue: false,
      description: "Masque le header quand l'utilisateur scrolle vers le bas, le reaffiche vers le haut.",
      hidden: ({ document }) => !document?.isSticky,
    }),
  ],
  preview: {
    select: {
      layout: "layout",
      isSticky: "isSticky",
    },
    prepare: ({ layout, isSticky }) => ({
      title: "En-tete",
      subtitle: `${layout || "Disposition non definie"}${isSticky ? " · fixe" : ""}`,
      media: ComponentIcon,
    }),
  },
});
