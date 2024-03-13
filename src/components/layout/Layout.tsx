import { ReactElement, ReactNode } from "react";
import NavBar from "../nav/Nav";
import "./layout.scss";
import { client } from "../../../sanity/config/client";

export default async function Layout({ children }: { children: ReactNode }) {
  const projects = await client.fetch<any>(`*[_type == "project"] { 
        ...,
        "thumbnail": {"src": thumbnail.image.asset->, "alt": thumbnail.imageAltText},
    }`);

  return (
    <div className="container__page-layout">
      <NavBar projects={projects} />
      <main className="container__main">{children}</main>
    </div>
  );
}
