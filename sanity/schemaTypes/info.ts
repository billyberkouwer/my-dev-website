import { defineType, defineField } from "sanity";

export const infoSchema = defineType({
  name: "info",
  title: "Info",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Info Title",
      type: "string",
    }),
    defineField({
      name: "details",
      title: "Info Details",
      type: "array",
      of: [{ type: "block" }],
    }),
    defineField({
      name: "images",
      title: "Info Images",
      type: "array",
      of: [{ type: "imageWithAlt" }, { type: "video" }],
    }),
  ],
});
