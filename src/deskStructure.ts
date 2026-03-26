import {
  CogIcon,
  ColorWheelIcon,
  ComponentIcon,
  ControlsIcon,
  DocumentIcon,
  DocumentsIcon,
  ErrorOutlineIcon,
  HomeIcon,
  MenuIcon,
  StarIcon,
  TagIcon,
  UsersIcon,
} from "@sanity/icons";
import type { StructureBuilder } from "sanity/desk";
import { isModuleEnabled } from "./moduleCache";

export const deskStructure = (S: StructureBuilder, context: any) => {
  const isAdmin = !context.currentUser?.roles?.some(
    (r: any) => r.name === "editor",
  );

  const can = (module: Parameters<typeof isModuleEnabled>[0]) =>
    isAdmin || isModuleEnabled(module);

  const items = [
    S.listItem()
      .title("Page d'accueil")
      .icon(HomeIcon)
      .child(
        S.document()
          .schemaType("homepage")
          .documentId("homepage")
          .title("Page d'accueil"),
      ),

    can("blog") &&
      S.documentTypeListItem("post").title("Articles").icon(DocumentsIcon),

    can("blog") &&
      S.documentTypeListItem("category").title("Categories").icon(TagIcon),

    can("blog") &&
      S.listItem()
        .title("Page Blog")
        .icon(DocumentsIcon)
        .child(
          S.document()
            .schemaType("blogPage")
            .documentId("blogPage")
            .title("Page Blog"),
        ),

    S.documentTypeListItem("page").title("Pages").icon(DocumentIcon),

    can("blog") &&
      S.documentTypeListItem("author").title("Auteurs").icon(UsersIcon),

    can("testimonials") &&
      S.documentTypeListItem("testimonial").title("Temoignages").icon(StarIcon),

    S.divider(),

    S.listItem()
      .title("Medias")
      .child(S.documentTypeList("sanity.imageAsset").title("Medias")),

    S.divider(),

    can("header") &&
      S.listItem()
        .title("En-tete")
        .icon(ComponentIcon)
        .child(
          S.document()
            .schemaType("header")
            .documentId("header")
            .title("En-tete"),
        ),

    S.documentTypeListItem("navigation").title("Navigation").icon(MenuIcon),

    can("footer") &&
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

    S.divider(),

    can("siteSettings") &&
      S.listItem()
        .title("Reglages globaux")
        .icon(CogIcon)
        .child(
          S.document()
            .schemaType("siteSettings")
            .documentId("siteSettings")
            .title("Reglages globaux"),
        ),

    can("theme") &&
      S.listItem()
        .title("Charte graphique")
        .icon(ColorWheelIcon)
        .child(
          S.document()
            .schemaType("themeSettings")
            .documentId("themeSettings")
            .title("Charte graphique"),
        ),

    isAdmin &&
      S.listItem()
        .title("Modules editeurs")
        .icon(ControlsIcon)
        .child(
          S.document()
            .schemaType("moduleSettings")
            .documentId("moduleSettings")
            .title("Modules editeurs"),
        ),
  ].filter(Boolean) as any[];

  return S.list().title("Contenu").items(items);
};
