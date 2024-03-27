import { groq } from "next-sanity";
import { client } from "../../../sanity/config/client";

export const allProjectSlugs = groq`
	*[_type == 'project'] | order(projectDate desc) [].slug.current
`;

export async function getAllProjectSlugs() {
	const projectSlugs = await client.fetch(allProjectSlugs);
	return projectSlugs;
}