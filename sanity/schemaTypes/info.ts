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
    {
      name: "details",
      title: "Info Details",
      type: "array",
      of: [{ type: "block" }],
    },
    {
      name: "images",
      title: "Info Images",
      type: "array",
      of: [{ type: "imageWithAlt" }, { type: "video" }],
    },
  ],
});
