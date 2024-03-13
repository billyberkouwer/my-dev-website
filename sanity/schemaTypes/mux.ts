import { defineType } from "sanity";

export const MuxVideo = defineType({
  title: "Video",
  name: "video",
  type: "object",
  fields: [
    { title: "Title", name: "title", type: "string" },
    {
      title: "Video file",
      name: "video",
      type: "mux.video",
    },
  ],
});
