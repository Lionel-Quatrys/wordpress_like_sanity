import { ControlsIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

const moduleField = (name: string, title: string, description: string) =>
  defineField({
    name,
    title,
    description,
    type: "boolean",
    initialValue: true,
  });

export const moduleSettingsType = defineType({
  name: "moduleSettings",
  title: "Modules editeurs",
  type: "document",
  icon: ControlsIcon,
  fields: [
    // -- Menu : Contenu
    moduleField(
      "blog",
      "Blog",
      "Acces a la page blog, aux articles, categories et auteurs",
    ),
    moduleField(
      "testimonials",
      "Temoignages",
      "Acces a la liste des temoignages + section page builder",
    ),
    // -- Menu : Structure
    moduleField("header", "En-tete", "Acces a la configuration de l'en-tete"),
    moduleField(
      "footer",
      "Pied de page",
      "Acces a la configuration du pied de page",
    ),
    // -- Menu : Reglages
    moduleField(
      "siteSettings",
      "Reglages globaux",
      "Acces aux reglages globaux du site",
    ),
    moduleField("theme", "Charte graphique", "Acces a la charte graphique"),
    // -- Page builder : sections
    moduleField(
      "gallery",
      "Section Galerie",
      "Section galerie d'images dans le page builder",
    ),
    moduleField(
      "faq",
      "Section FAQ",
      "Section questions / reponses dans le page builder",
    ),
    moduleField(
      "video",
      "Section Video",
      "Section video dans le page builder",
    ),
    moduleField(
      "pricing",
      "Section Tarifs",
      "Section grille tarifaire dans le page builder",
    ),
    moduleField(
      "team",
      "Section Equipe",
      "Section equipe dans le page builder",
    ),
    moduleField(
      "contact",
      "Formulaire de contact",
      "Section formulaire de contact dans le page builder",
    ),
  ],
  preview: {
    prepare: () => ({
      title: "Modules editeurs",
      media: ControlsIcon,
    }),
  },
});
