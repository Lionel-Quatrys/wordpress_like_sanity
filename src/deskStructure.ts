import {
  CogIcon,
  DocumentIcon,
  DocumentsIcon,
  ErrorOutlineIcon,
  HomeIcon,
  MenuIcon,
  ColorWheelIcon,
  StarIcon,
  TagIcon,
  UsersIcon,
} from "@sanity/icons";
import type { StructureBuilder } from "sanity/desk";

export const deskStructure = (S: StructureBuilder) =>
  S.list()
    .title("Contenu")
    .items([
      S.listItem()
        .title("Page d'accueil")
        .icon(HomeIcon)
        .child(
          S.document()
            .schemaType("homepage")
            .documentId("homepage")
            .title("Page d'accueil"),
        ),
      S.listItem()
        .title("Page Blog")
        .icon(DocumentsIcon)
        .child(
          S.document()
            .schemaType("blogPage")
            .documentId("blogPage")
            .title("Page Blog"),
        ),
      S.divider(),
      S.documentTypeListItem("page").title("Pages").icon(DocumentIcon),
      S.documentTypeListItem("post").title("Articles").icon(DocumentsIcon),
      S.documentTypeListItem("category").title("Categories").icon(TagIcon),
      S.documentTypeListItem("author").title("Auteurs").icon(UsersIcon),
      S.documentTypeListItem("testimonial").title("Temoignages").icon(StarIcon),
      S.divider(),
      S.listItem()
        .title("Medias")
        .child(S.documentTypeList("sanity.imageAsset").title("Medias")),
      S.divider(),
      S.documentTypeListItem("navigation").title("Navigation").icon(MenuIcon),
      S.listItem()
        .title("Pied de page")
        .icon(MenuIcon)
        .child(
          S.document()
            .schemaType("footer")
            .documentId("footer")
            .title("Pied de page"),
        ),
      S.listItem()
        .title("Page 404")
        .icon(ErrorOutlineIcon)
        .child(
          S.document()
            .schemaType("notFound")
            .documentId("notFound")
            .title("Page 404"),
        ),
      S.listItem()
        .title("Charte graphique")
        .icon(ColorWheelIcon)
        .child(
          S.document()
            .schemaType("themeSettings")
            .documentId("themeSettings")
            .title("Charte graphique"),
        ),
      S.listItem()
        .title("Reglages")
        .icon(CogIcon)
        .child(
          S.document()
            .schemaType("siteSettings")
            .documentId("siteSettings")
            .title("Reglages globaux"),
        ),
    ]);
