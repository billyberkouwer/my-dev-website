import { ReactElement, ReactNode } from "react";
import NavBar from "../nav/Nav";
import "./layout.scss";
import { client } from "../../../sanity/config/client";
import { usePathname } from "next/navigation";
import Main from "./Main";

export default async function Layout({ children }: { children: ReactNode }) {
  const projects = await client.fetch<any>(`*[_type == "project"]|order(orderRank) { 
        ...,
        "thumbnail": {"src": thumbnail.image.asset->, "alt": thumbnail.imageAltText},
    }`);

  return (
    <div className="container__page-layout">
      <NavBar projects={projects} />
      <Main>{children}</Main>
    </div>
  );
}
