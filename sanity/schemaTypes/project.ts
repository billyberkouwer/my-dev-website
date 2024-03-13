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
      title: "Slug",
      name: "slug",
      type: "slug",
      options: {
        source: "title",
        slugify: (input) =>
          input.toLowerCase().replace(/\s+/g, "-").slice(0, 200),
      },
    }),
    defineField({
      name: "thumbnail",
      title: "Project Thumbnail",
      type: "imageWithAlt",
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
      of: [{ type: "imageWithAlt" }, { type: "video" }],
    }),
  ],
});
