import { defineField, defineType } from "sanity";

export const linkType = defineType({
  name: "link",
  title: "Lien",
  type: "object",
  fields: [
    defineField({
      name: "label",
      title: "Libelle",
      type: "string",
      validation: (Rule) => Rule.required().max(60),
    }),
    defineField({
      name: "linkType",
      title: "Type de lien",
      type: "string",
      initialValue: "internal",
      options: {
        list: [
          { title: "Interne", value: "internal" },
          { title: "Externe", value: "external" },
        ],
        layout: "radio",
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "internalReference",
      title: "Reference interne",
      type: "reference",
      to: [{ type: "homepage" }, { type: "page" }, { type: "post" }],
      hidden: ({ parent }) => parent?.linkType !== "internal",
    }),
    defineField({
      name: "externalUrl",
      title: "URL externe",
      type: "url",
      hidden: ({ parent }) => parent?.linkType !== "external",
      validation: (Rule) =>
        Rule.uri({
          allowRelative: false,
          scheme: ["http", "https", "mailto", "tel"],
        }),
    }),
    defineField({
      name: "openInNewTab",
      title: "Ouvrir dans un nouvel onglet",
      type: "boolean",
      initialValue: false,
      hidden: ({ parent }) => parent?.linkType !== "external",
    }),
  ],
  validation: (Rule) =>
    Rule.custom((value) => {
      if (!value) return true;
      if (value.linkType === "internal" && !value.internalReference) {
        return "Selectionne une reference interne.";
      }
      if (value.linkType === "external" && !value.externalUrl) {
        return "Renseigne une URL externe.";
      }
      return true;
    }),
  preview: {
    select: {
      title: "label",
      linkType: "linkType",
      externalUrl: "externalUrl",
      internalTitle: "internalReference.title",
    },
    prepare: ({ title, linkType, externalUrl, internalTitle }) => ({
      title: title || "Lien sans libelle",
      subtitle:
        linkType === "external"
          ? externalUrl || "Lien externe"
          : internalTitle || "Lien interne",
    }),
  },
});
