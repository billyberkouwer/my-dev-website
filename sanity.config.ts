import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";
import { schemaTypes } from "./sanity/schemaTypes";
import { muxInput } from "sanity-plugin-mux-input";
import { orderableDocumentListDeskItem } from "@sanity/orderable-document-list";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "";
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";

export const structure = (S: any, context: any) => {
  return S.list()
    .title("Content")
    .items([
      orderableDocumentListDeskItem({
        type: "project",
        title: "Custom Pages",
        S,
        context,
      }),
    ]);
};

export default defineConfig({
  basePath: "/admin",
  name: "default",
  title: "my-dev-website",
  projectId: projectId,
  dataset: dataset,
  plugins: [structureTool({ structure }), visionTool(), muxInput()],
  schema: {
    types: schemaTypes,
  },
});
