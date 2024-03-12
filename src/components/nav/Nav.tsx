"use client";

import { useEffect, useState } from "react";
import { client } from "../../../sanity/config/client";
import "./nav.scss";
import Image from "next/image";

export default function NavBar({ projects }: { projects: any }) {
  const [isSubMenuOpen, setIsSubMenuOpen] = useState(false);

  // change page layout when submenu is open
  useEffect(() => {
    const pageLayout = document.querySelector(".container__page-layout");
    if (isSubMenuOpen && pageLayout) {
      pageLayout.classList.add("open");
    } else if (!isSubMenuOpen && pageLayout) {
      pageLayout.classList.remove("open");
    }
  }, [isSubMenuOpen]);

  return (
    <>
      <nav className="wrapper__main-nav">
        <ul className="container__main-nav">
          <li>Billy Myles-Berkouwer</li>
          <button onClick={() => setIsSubMenuOpen(!isSubMenuOpen)}>
            selected projects
          </button>
          <li>experiments</li>
          <li>info</li>
        </ul>
      </nav>
      <nav className="wrapper__sub-nav">
        <ul className="container__sub-nav">
          {projects.map((project: any) => (
            <li key={project.title} className="project__thumbnail">
              <Image
                src={project.thumbnail.src.url}
                alt={project.thumbnail.alt}
                width={200}
                height={200 / project.thumbnail.src.metadata.dimensions.aspectRatio}
                style={{ objectFit: "contain" }}
              />
            </li>
          ))}
        </ul>
      </nav>
    </>
  );
}
