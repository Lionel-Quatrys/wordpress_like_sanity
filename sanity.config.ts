import { visionTool } from "@sanity/vision";
import { defineConfig } from "sanity";
import { deskTool } from "sanity/desk";
import { colorInput } from "@sanity/color-input";
import { moduleVisibilityPlugin } from "./src/plugins/moduleVisibility";
import { schemaTypes } from "./schemaTypes";
import { deskStructure } from "./src/deskStructure";
import { singletonActions, singletonTypes } from "./src/singletons";

export default defineConfig({
  name: "default",
  title: "WordPress Like Studio",
  projectId: "995ry9bs",
  dataset: "production",
  plugins: [
    deskTool({
      structure: deskStructure,
    }),
    visionTool(),
    colorInput(),
    moduleVisibilityPlugin(),
  ],
  schema: {
    types: schemaTypes,
    templates: (templates) =>
      templates.filter(({ schemaType }) => !singletonTypes.has(schemaType)),
  },
  document: {
    actions: (prev, context) => {
      if (singletonTypes.has(context.schemaType)) {
        return prev.filter(
          ({ action }) => action !== undefined && singletonActions.has(action),
        );
      }

      return prev;
    },
  },
});
