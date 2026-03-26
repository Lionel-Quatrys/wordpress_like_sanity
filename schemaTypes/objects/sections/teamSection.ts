import { UsersIcon } from "@sanity/icons";
import { defineArrayMember, defineField, defineType } from "sanity";
import { isModuleEnabled } from "../../../src/moduleCache";

export const teamSectionType = defineType({
  name: "teamSection",
  title: "Section equipe",
  type: "object",
  icon: UsersIcon,
  hidden: ({ currentUser }) =>
    !currentUser?.roles?.some((r: any) => r.name === "editor") &&
    !isModuleEnabled("team"),
  fields: [
    defineField({
      name: "title",
      title: "Titre",
      type: "string",
      validation: (Rule) => Rule.required().max(120),
    }),
    defineField({
      name: "subtitle",
      title: "Sous-titre",
      type: "string",
      validation: (Rule) => Rule.max(200),
    }),
    defineField({
      name: "members",
      title: "Membres",
      type: "array",
      of: [
        defineArrayMember({
          type: "reference",
          to: [{ type: "author" }],
        }),
      ],
      validation: (Rule) => Rule.required().min(1).unique(),
    }),
  ],
  preview: {
    select: {
      title: "title",
      members: "members",
    },
    prepare: ({ title, members }) => ({
      title: title || "Section equipe",
      subtitle: `${members?.length || 0} membre(s)`,
      media: UsersIcon,
    }),
  },
});
