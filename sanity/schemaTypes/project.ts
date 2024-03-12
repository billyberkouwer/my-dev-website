import { defineType, defineField } from "sanity";

export const projectSchema = defineType({
  name: "project",
  title: "Project",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Project Title",
      type: "string",
    }),
    defineField({
      name: "thumbnail",
      title: "Project Thumbnail",
      type: "imageWithAlt"
    }),
    defineField({
      name: "info",
      title: "Project Info",
      type: "array",
      of: [{ type: "block" }],
    }),
    defineField({
        name: "images",
        title: "Project Images",
        type: "array",
        of: [{type: "imageWithAlt"}],
      }),
  ],
});
