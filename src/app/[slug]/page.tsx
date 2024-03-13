import { PortableText } from "next-sanity";
import { client } from "../../../sanity/config/client";
import Layout from "@/components/layout/Layout";
import Image from "next/image";
import ImageSection from "@/components/project/ImageSection";
import MuxPlayer from '@mux/mux-player-react';

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
  const project =
    await client.fetch<any>(`*[_type == "project" && slug.current == "${params.slug}"][0] { 
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
  }`);

  return (
    <>
      <section className="section__info">
        <h1>{project.title}</h1>
        <PortableText value={project.info} />
      </section>
      <ImageSection projectImages={project.images} />
    </>
  );
}
