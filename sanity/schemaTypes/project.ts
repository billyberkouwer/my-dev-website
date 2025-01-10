import {
  orderRankField,
  orderRankOrdering,
} from "@sanity/orderable-document-list";
import { defineType, defineField } from "sanity";

export const projectSchema = defineType({
  name: "project",
  title: "Project",
  type: "document",
  orderings: [orderRankOrdering],
  fields: [
    defineField({
      name: "title",
      title: "Project Title",
      type: "string",
    }),
    orderRankField({ type: "project" }),
    defineField({
      title: "Slug",
      name: "slug",
      type: "slug",
      options: {
        source: "title",
        slugify: (input: string) =>
          input.toLowerCase().replace(/\s+/g, "-").slice(0, 200),
      },
    }),
    defineField({
      name: "thumbnail",
      title: "Project Thumbnail",
      type: "imageWithAlt",
    }),
    {
      name: "info",
      title: "Project Info",
      type: "array",
      of: [{ type: "block" }],
    },
    {
      name: "images",
      title: "Project Images",
      type: "array",
      of: [{ type: "imageWithAlt" }, { type: "video" }],
    },
    {
      name: "meta",
      title: "Meta Fields",
      type: "metaFields",
    },
  ],
});
