import { PortableText } from "next-sanity";
import { client } from "../../../sanity/config/client";
import Layout from "@/components/layout/Layout";
import Image from "next/image";
import MuxPlayer from "@mux/mux-player-react";
import muxBlurHash from "@mux/blurhash";
import VisualContentSection from "@/components/project/VisualContentSection";

export async function generateStaticParams() {
  const projects = await client.fetch<any>(`*[_type == "project"] { 
        ...,
        "images": {"src": images[].image.asset->, "alt": images[].imageAltText}   
    }`);

  return projects.map((project: any, i: number) => ({
    slug: project.slug.current,
  }));
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
      <section className="section__info">
        <h1>{project.title}</h1>
        <PortableText value={project.info} />
      </section>
      <VisualContentSection projectImages={project.images} />
    </>
  );
}
