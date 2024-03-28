import { PortableText } from "next-sanity";
import { client } from "../../../sanity/config/client";
import Layout from "@/components/layout/Layout";
import Image from "next/image";
import ImageSection from "@/components/project/VisualContentSection";
import VisualContentSection from "@/components/project/VisualContentSection";
import TextContentSection from "@/components/project/TextContentSection";
import { Metadata, ResolvingMetadata } from "next";
import { MetaProps } from "@/lib/sanity/fetch";

export async function generateMetadata(
  { params, searchParams }: MetaProps,
  parent: ResolvingMetadata
): Promise<Metadata> {
  // read route params
  const id = params.slug;

  // fetch data
  const data = await client.fetch<any>(
    `*[_type == "info" ${id ? `&& slug.current == "${id}"` : ""}][0] { 
     "meta": {
       "title": meta.metaTitle,
       "description": meta.metaDescription,
       "openGraphImage": meta.openGraphImage.asset->,
     }
  }`
  );

  return {
    title: data?.meta?.title,
    description: data?.meta?.description,
    openGraph: {
      images: [data?.meta?.openGraphImage?.url],
    },
  };
}

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
      <TextContentSection
        projectTitle={info?.title}
        projectInfo={info?.details}
      />
      <VisualContentSection projectImages={info?.images} />
    </>
  );
}
