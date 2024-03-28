import { groq } from "next-sanity";
import { client } from "../../../sanity/config/client";
import { Metadata, ResolvingMetadata } from "next";

export const allProjectSlugs = groq`
	*[_type == 'project'] | order(projectDate desc) [].slug.current
`;

export async function getAllProjectSlugs() {
  const projectSlugs = await client.fetch(allProjectSlugs);
  return projectSlugs;
}

export type MetaProps = {
  params: { slug: string };
  searchParams: { [key: string]: string | string[] | undefined };
};
