import {
  CogIcon,
  DocumentsIcon,
  HomeIcon,
  TagIcon,
  UsersIcon,
} from "@sanity/icons";
import type { StructureBuilder } from "sanity/desk";

export const deskStructure = (S: StructureBuilder) =>
  S.list()
    .title("Contenu")
    .items([
      S.documentTypeListItem("page").title("Pages").icon(HomeIcon),
      S.documentTypeListItem("post").title("Articles").icon(DocumentsIcon),
      S.documentTypeListItem("category").title("Categories").icon(TagIcon),
      S.documentTypeListItem("author").title("Auteurs").icon(UsersIcon),
      S.divider(),
      S.listItem()
        .title("Medias")
        .child(S.documentTypeList("sanity.imageAsset").title("Medias")),
      S.divider(),
      S.documentTypeListItem("navigation").title("Navigation"),
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
