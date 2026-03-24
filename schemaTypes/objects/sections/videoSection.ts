import { PlayIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

export const videoSectionType = defineType({
  name: "videoSection",
  title: "Section video",
  type: "object",
  icon: PlayIcon,
  fields: [
    defineField({
      name: "title",
      title: "Titre",
      type: "string",
      validation: (Rule) => Rule.max(120),
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      rows: 3,
      validation: (Rule) => Rule.max(300),
    }),
    defineField({
      name: "videoUrl",
      title: "URL de la video",
      type: "url",
      description: "URL YouTube ou Vimeo. Ex : https://www.youtube.com/watch?v=XXXXXX",
      validation: (Rule) =>
        Rule.required().uri({
          scheme: ["https"],
        }),
    }),
    defineField({
      name: "autoplay",
      title: "Lecture automatique",
      type: "boolean",
      initialValue: false,
      description: "Demarre la video automatiquement (sans son, selon les navigateurs).",
    }),
  ],
  preview: {
    select: {
      title: "title",
      url: "videoUrl",
    },
    prepare: ({ title, url }) => ({
      title: title || "Section video",
      subtitle: url || "URL non definie",
      media: PlayIcon,
    }),
  },
});
