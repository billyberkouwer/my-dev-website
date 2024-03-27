import { getAllProjectSlugs } from "@/lib/sanity/fetch";

export default async function sitemap() {
  const routes = ["", "info"].map((route) => ({
    url: `${process.env.SITE_URL}/${route}`,
    lastModified: new Date().toISOString(),
  }));

  const allProjectSlugs = await getAllProjectSlugs();

  const projectRoutes = allProjectSlugs.map((projectSlug: any) => ({
    url: `${process.env.SITE_URL}/${projectSlug}`,
    lastModified: new Date().toISOString(),
  }));

  return [
    ...routes,
    ...projectRoutes,
  ]
}