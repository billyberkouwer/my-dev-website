import { PortableText } from "next-sanity";
import { client } from "../../../sanity/config/client";
import Layout from "@/components/layout/Layout";
import Image from "next/image";
import MuxPlayer from "@mux/mux-player-react";
import muxBlurHash from "@mux/blurhash";
import VisualContentSection from "@/components/project/VisualContentSection";
import TextContentSection from "@/components/project/TextContentSection";
import { Metadata, ResolvingMetadata } from "next";
import { MetaProps } from "@/lib/sanity/fetch";

export async function generateStaticParams() {
  const projects = await client.fetch<any>(`*[_type == "project"] { 
        ...,
    }`);

  return projects.map((project: any, i: number) => ({
    slug: project.slug.current,
  }));
}


export async function generateMetadata(
  { params, searchParams }: MetaProps,
  parent: ResolvingMetadata
): Promise<Metadata> {
  // read route params
  const id = params.slug;

  // fetch data
  const data = await client.fetch<any>(
    `*[_type == "project" ${id ? `&& slug.current == "${id}"` : ""}][0] { 
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

export default async function Project({
  params,
}: {
  params: { slug: string };
}) {
  const project = await client
    .fetch<any>(
      `*[_type == "project" && slug.current == "${params.slug}"][0] { 
    ...,
    images[]{
      _type == 'imageWithAlt' => {
        "src": image.asset->, 
        "alt": imageAltText
      },
      _type == 'video' => {
        ...,
        "src": video.asset->,
      },
    }
  }`
    )
    .then(async (project) => {
      const projectWithData = { ...project };
      for (let i = 0; i < projectWithData.images.length; i++) {
        if (projectWithData.images[i]?.src._type === "mux.videoAsset") {
          const playbackId = projectWithData.images[i].src.playbackId;
          const { blurHashBase64, sourceWidth, sourceHeight } =
            await muxBlurHash(playbackId);
          Object.assign(projectWithData.images[i].src, {
            blurHash: blurHashBase64,
          });
          Object.assign(projectWithData.images[i].src, {
            sourceWidth: sourceWidth,
          });
          Object.assign(projectWithData.images[i].src, {
            sourceHeight: sourceHeight,
          });
        }
      }
      return projectWithData;
    });


  return (
    <>
      <TextContentSection projectTitle={project?.title} projectInfo={project?.info} />
      <VisualContentSection projectImages={project?.images} />
    </>
  );
}
