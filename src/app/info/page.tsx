import { PortableText } from "next-sanity";
import { client } from "../../../sanity/config/client";
import Layout from "@/components/layout/Layout";
import Image from "next/image";
import ImageSection from "@/components/project/VisualContentSection";
import VisualContentSection from "@/components/project/VisualContentSection";
import TextContentSection from "@/components/project/TextContentSection";

export default async function Info() {
  const info = await client.fetch<any>(
    `*[_type == "info"][0] { 
    ...,
    images[]{
      _type == 'imageWithAlt' => {
        "src": image.asset->, 
        "alt": imageAltText
      },
    }
  }`
  );

  return (
    <>
      <TextContentSection projectTitle={info?.title} projectInfo={info?.details} />
      <VisualContentSection projectImages={info?.images} />
    </>
  );
}
