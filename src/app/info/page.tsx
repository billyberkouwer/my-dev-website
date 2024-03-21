import { PortableText } from "next-sanity";
import { client } from "../../../sanity/config/client";
import Layout from "@/components/layout/Layout";
import Image from "next/image";
import ImageSection from "@/components/project/VisualContentSection";

export default async function Info() {
  const info =
    await client.fetch<any>(`*[_type == "info"][0] { 
    ...,
    "images": {"src": images[].image.asset->, "alt": images[].imageAltText}   
  }`);

  return (
    <>
      <section className="section__info">
        <h1>{info.title}</h1>
        <PortableText value={info.details} />
      </section>
    </>
  );
}
