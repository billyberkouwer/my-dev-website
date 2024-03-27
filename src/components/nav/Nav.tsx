"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import "./nav.scss";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function NavBar({ projects }: { projects: any }) {
  const [isSubMenuOpen, setIsSubMenuOpen] = useState(false);
  const pathname = usePathname();
  const containerWrapper = useRef<HTMLElement>();

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

    function imageListScroll(e: any) {
      containerWrapper.current?.scrollTo(
        (containerWrapper.current.scrollLeft += e.deltaY),
        0
      );
    }
    containerWrapper.current?.addEventListener("mousewheel", (e) =>
      imageListScroll(e)
    );

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
      <nav
        className="wrapper__sub-nav"
        ref={(el) => (el ? (containerWrapper.current = el) : null)}
      >
        <ul className="container__sub-nav">
          {projects.map((project: any) => (
            <Link className="project__thumbnail" key={project.title} href={`/${project.slug.current}`}>
              <li>
                <Image
                  src={project.thumbnail.src.url}
                  alt={project.thumbnail.alt}
                  width={
                    project.thumbnail.src.metadata.dimensions.aspectRatio < 3
                      ? 100 *
                        project.thumbnail.src.metadata.dimensions.aspectRatio
                      : 300
                  }
                  height={
                    project.thumbnail.src.metadata.dimensions.aspectRatio < 3
                      ? 100
                      : 300 /
                        project.thumbnail.src.metadata.dimensions.aspectRatio
                  }
                  style={{
                    objectFit: "contain",
                    opacity: "/" + project.slug.current === pathname ? 1 : 0.65,
                    aspectRatio: project.thumbnail.src.metadata.dimensions.aspectRatio
                  }}
                />
              </li>
            </Link>
          ))}
        </ul>
      </nav>
    </>
  );
}
