import { defineField, defineType } from "sanity";

export const aiMetadataType = defineType({
  name: "aiMetadata",
  title: "IA et donnees structurees",
  type: "object",
  fields: [
    defineField({
      name: "structuredDataType",
      title: "Type Schema.org",
      type: "string",
      initialValue: "WebPage",
      options: {
        list: [
          { title: "WebPage", value: "WebPage" },
          { title: "Article", value: "Article" },
          { title: "BlogPosting", value: "BlogPosting" },
          { title: "FAQPage", value: "FAQPage" },
          { title: "HowTo", value: "HowTo" },
          { title: "CollectionPage", value: "CollectionPage" },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "aiSummary",
      title: "Resume IA",
      type: "text",
      rows: 4,
      description:
        "Resume factuel du contenu pour assistants IA et moteurs de reponse.",
      validation: (Rule) => Rule.required().min(40).max(500),
    }),
    defineField({
      name: "keyPoints",
      title: "Points cles",
      type: "array",
      of: [{ type: "string" }],
      validation: (Rule) => Rule.required().min(2).max(8).unique(),
    }),
    defineField({
      name: "contentIntent",
      title: "Intention du contenu",
      type: "string",
      options: {
        list: [
          { title: "Informationnelle", value: "informational" },
          { title: "Transactionnelle", value: "transactional" },
          { title: "Navigationnelle", value: "navigational" },
          { title: "Comparative", value: "comparative" },
        ],
        layout: "radio",
      },
      initialValue: "informational",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "targetAudience",
      title: "Audience cible",
      type: "array",
      of: [{ type: "string" }],
      validation: (Rule) => Rule.max(6).unique(),
    }),
    defineField({
      name: "allowLlmIndexing",
      title: "Autoriser l'indexation IA",
      type: "boolean",
      initialValue: true,
      description:
        "Controle editorial pour l'exposition du contenu aux agents IA.",
    }),
    defineField({
      name: "jsonLdOverride",
      title: "JSON-LD (override)",
      type: "text",
      rows: 12,
      description:
        "Optionnel. Fournit un JSON-LD personnalise pour remplacer la generation automatique.",
      validation: (Rule) =>
        Rule.custom((value) => {
          if (!value) return true;
          try {
            JSON.parse(value);
            return true;
          } catch {
            return "Le JSON-LD doit etre un JSON valide.";
          }
        }),
    }),
  ],
  preview: {
    select: {
      type: "structuredDataType",
      summary: "aiSummary",
      allowLlmIndexing: "allowLlmIndexing",
    },
    prepare: ({ type, summary, allowLlmIndexing }) => ({
      title: type || "IA et donnees structurees",
      subtitle: `${allowLlmIndexing ? "IA activee" : "IA desactivee"} - ${summary || "Resume manquant"}`,
    }),
  },
});
