import { getAllProjectSlugs } from "@/lib/sanity/fetch";

export default async function sitemap() {
  const routes = ["", "info"].map((route) => ({
    url: `${process.env.SITE_URL}/${route}`,
    lastModified: new Date().toISOString(),
    changeFrequence: 'monthly',
    priority: route === "" ? 1 : 0.9,
  }));

  const allProjectSlugs = await getAllProjectSlugs();

  const projectRoutes = allProjectSlugs.map((projectSlug: any) => ({
    url: `${process.env.SITE_URL}/${projectSlug}`,
    lastModified: new Date().toISOString(),
    changeFrequence: 'yearly',
    priority: projectSlug === "i-am-everything-you-want-me-to-be" ? 0.8 : 0.6
  }));

  return [
    ...routes,
    ...projectRoutes,
  ]
}