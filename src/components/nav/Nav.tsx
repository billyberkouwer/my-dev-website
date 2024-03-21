"use client";

import { useEffect, useLayoutEffect, useState } from "react";
import "./nav.scss";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function NavBar({ projects }: { projects: any }) {
  const [isSubMenuOpen, setIsSubMenuOpen] = useState(false);
  const pathname = usePathname();
  console.log(pathname)

  // change page layout when submenu is open
  useEffect(() => {
    const pageLayout = document.querySelector(".container__page-layout");
    if (isSubMenuOpen && pageLayout) {
      pageLayout.classList.add("open");
    } else if (!isSubMenuOpen && pageLayout) {
      pageLayout.classList.remove("open");
    }
  }, [isSubMenuOpen]);

  useLayoutEffect(() => {
    const mainContainer = document.querySelector(".container__main");

    function hideNav() {
      setTimeout(() => {
        if (pathname && pathname === "/") {
          setIsSubMenuOpen(false);
        }
      }, 500);
    }

    if (mainContainer) {
      mainContainer.addEventListener("mouseover", hideNav);
    }

    return () => {
      if (mainContainer) {
        mainContainer.removeEventListener("mouseover", hideNav);
      }
    };
  }, [pathname]);

  return (
    <>
      <nav className="wrapper__main-nav">
        <ul className="container__main-nav">
          <Link href={"/"}>
            <li>Billy Myles-Berkouwer</li>
          </Link>
          <button onClick={() => setIsSubMenuOpen(!isSubMenuOpen)}>
            selected projects
          </button>
          <Link href={"/info"}>
            <li>info</li>
          </Link>
        </ul>
      </nav>
      <nav className="wrapper__sub-nav">
        <ul className="container__sub-nav">
          {projects.map((project: any) => (
            <Link key={project.title} href={`/${project.slug.current}`}>
              <li className="project__thumbnail">
                <Image
                  src={project.thumbnail.src.url}
                  alt={project.thumbnail.alt}
                  width={
                    100 * project.thumbnail.src.metadata.dimensions.aspectRatio
                  }
                  height={100}
                  style={{ objectFit: "contain", opacity: '/' + project.slug.current === pathname ? 1 : 0.65 }}
                />
              </li>
            </Link>
          ))}
        </ul>
      </nav>
    </>
  );
}
