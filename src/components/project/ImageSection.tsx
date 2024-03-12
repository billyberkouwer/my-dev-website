"use client";

import Image from "next/image";
import "./image-section.scss";
import { useEffect, useLayoutEffect, useRef, useState } from "react";

function sizeImages(
  containerSize: { x: number; y: number },
  aspectRatio: number
) {
  if (containerSize.x / aspectRatio > containerSize.y) {
    return { x: containerSize.y * aspectRatio, y: containerSize.y };
  }
  return { x: containerSize.x, y: containerSize.x / aspectRatio };
}

export default function ImageSection({
  projectImages,
}: {
  projectImages: any;
}) {
  const [imageSectionDimensions, setImageSectionDimensions] = useState({
    x: 0,
    y: 0,
  });
  const scrollYRef = useRef(0);
  const dragContainerButton = useRef<HTMLDivElement>();
  const [isDragButtonDown, setIsDragButtonDown] = useState(false);

  useLayoutEffect(() => {
    const imageSection = document.querySelector(".section__images");
    const imageList = document.querySelector(".list__images");

    setImageSectionDimensions({
      x: imageSection?.getBoundingClientRect().width || 0,
      y: imageSection?.getBoundingClientRect().height || 0,
    });

    imageList?.addEventListener("mousewheel", function (e: any) {
      imageList?.scrollTo((imageList.scrollLeft += e.deltaY), 0);
    });

    document.addEventListener("mouseup", function () {
      setIsDragButtonDown(false);
    });

    window.addEventListener("resize", function () {
      const mainContainer = document.querySelector(
        ".container__main"
      ) as HTMLElement;
      if (mainContainer) {
        mainContainer.style.gridTemplateColumns = `${window.innerWidth / 3}px ${
          (window.innerWidth / 3) * 2
        }px`;
      }
    });
  }, []);

  useLayoutEffect(() => {
    function mouseMove(e: MouseEvent) {
      e.preventDefault();
      if (isDragButtonDown) {
        const mainContainer = document.querySelector(
          ".container__main"
        ) as HTMLElement;
        if (mainContainer) {
          mainContainer.style.gridTemplateColumns = `${e.clientX}px ${
            window.innerWidth - e.clientX
          }px`;
        }
      }
    }

    document.addEventListener("mousemove", mouseMove);

    return () => {
      document.removeEventListener("mousemove", mouseMove);
    };
  }, [isDragButtonDown]);

  useEffect(() => {
    if (isDragButtonDown) {
    }
  }, [isDragButtonDown]);

  return (
    <section className="section__images">
      <div
        className="controller__tab-resize"
        draggable="true"
        ref={(el) => (el ? (dragContainerButton.current = el) : null)}
        onMouseDown={() => setIsDragButtonDown(true)}
      />
      <ul className="list__images">
        {projectImages.src.map((src: any, i: number) => (
          <li
            key={projectImages.alt[i]}
            className="list__image-project"
            style={{
              width: sizeImages(
                imageSectionDimensions,
                src.metadata.dimensions.aspectRatio
              ).x,
              height: sizeImages(
                imageSectionDimensions,
                src.metadata.dimensions.aspectRatio
              ).y,
            }}
          >
            <Image
              src={src.url}
              alt={projectImages.alt[i]}
              className="img__project"
              fill
            />
          </li>
        ))}
      </ul>
    </section>
  );
}
