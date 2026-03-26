import { EnvelopeIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";
import { isModuleEnabled } from "../../../src/moduleCache";

export const contactSectionType = defineType({
  name: "contactSection",
  title: "Section contact",
  type: "object",
  icon: EnvelopeIcon,
  hidden: ({ currentUser }) =>
    !currentUser?.roles?.some((r: any) => r.name === "editor") &&
    !isModuleEnabled("contact"),
  groups: [
    { name: "content", title: "Contenu", default: true },
    { name: "form", title: "Formulaire" },
  ],
  fields: [
    defineField({
      name: "title",
      title: "Titre",
      type: "string",
      group: "content",
      validation: (Rule) => Rule.required().max(120),
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      rows: 3,
      group: "content",
    }),
    defineField({
      name: "recipientEmail",
      title: "Email destinataire",
      type: "string",
      group: "form",
      description: "Adresse email qui recevra les messages du formulaire.",
      validation: (Rule) =>
        Rule.required().email().error("Renseigne une adresse email valide."),
    }),
    defineField({
      name: "fields",
      title: "Champs du formulaire",
      type: "array",
      group: "form",
      of: [
        {
          type: "object",
          name: "formField",
          fields: [
            {
              name: "label",
              title: "Libelle",
              type: "string",
              validation: (Rule: any) => Rule.required().max(60),
            },
            {
              name: "fieldType",
              title: "Type de champ",
              type: "string",
              options: {
                list: [
                  { title: "Texte court", value: "text" },
                  { title: "Email", value: "email" },
                  { title: "Telephone", value: "tel" },
                  { title: "Message (texte long)", value: "textarea" },
                ],
                layout: "radio",
              },
              initialValue: "text",
              validation: (Rule: any) => Rule.required(),
            },
            {
              name: "required",
              title: "Champ obligatoire",
              type: "boolean",
              initialValue: true,
            },
          ],
          preview: {
            select: {
              title: "label",
              fieldType: "fieldType",
              required: "required",
            },
            prepare: ({
              title,
              fieldType,
              required,
            }: {
              title?: string;
              fieldType?: string;
              required?: boolean;
            }) => ({
              title: title || "Champ sans libelle",
              subtitle: `${fieldType || "text"}${required ? " · obligatoire" : ""}`,
            }),
          },
        },
      ],
      initialValue: [
        { label: "Nom", fieldType: "text", required: true },
        { label: "Email", fieldType: "email", required: true },
        { label: "Message", fieldType: "textarea", required: true },
      ],
    }),
    defineField({
      name: "submitLabel",
      title: "Libelle du bouton d'envoi",
      type: "string",
      group: "form",
      initialValue: "Envoyer",
      validation: (Rule) => Rule.required().max(40),
    }),
    defineField({
      name: "successMessage",
      title: "Message de confirmation",
      type: "string",
      group: "form",
      description: "Affiche ce message apres l'envoi reussi du formulaire.",
      initialValue: "Votre message a bien ete envoye, merci !",
      validation: (Rule) => Rule.required().max(200),
    }),
  ],
  preview: {
    select: {
      title: "title",
      email: "recipientEmail",
    },
    prepare: ({ title, email }) => ({
      title: title || "Section contact",
      subtitle: email || "Email non configure",
      media: EnvelopeIcon,
    }),
  },
});
