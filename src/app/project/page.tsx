import { PortableText } from "next-sanity";
import { client } from "../../../sanity/config/client";
import Layout from "@/components/layout/Layout";
import Image from "next/image";
import ImageSection from "@/components/project/ImageSection";

export default async function Project() {
  const projects = await client.fetch<any>(`*[_type == "project"] { 
        ...,
        "images": {"src": images[].image.asset->, "alt": images[].imageAltText}   
    }`);

    console.log(projects[0].images.src)
  return (
    <Layout>
      <section className="section__info">
        <h1>{projects[0].title}</h1>
        <PortableText value={projects[0].info} />
      </section>
      <ImageSection projectImages={projects[0].images} />
    </Layout>
  );
}
