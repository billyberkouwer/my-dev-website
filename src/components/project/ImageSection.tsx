"use client";

import Image from "next/image";
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

  useLayoutEffect(() => {
    const imageSection = document.querySelector(".section__images");
    const imageList = document.querySelector(".list__images");
    console.log(imageSection);
    setImageSectionDimensions({
      x: imageSection?.getBoundingClientRect().width || 0,
      y: imageSection?.getBoundingClientRect().height || 0,
    });
    imageList?.addEventListener("mousewheel", function (e: any) {
      imageList?.scrollTo(imageList.scrollLeft -= e.deltaY, 0);
    });
  }, []);

  return (
    <section className="section__images">
      <ul className="list__images">
        {projectImages.src.map((src: any, i: number) => (
          <li
            key={projectImages.alt[i]}
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
              fill
              style={{ objectFit: "contain" }}
            />
          </li>
        ))}
      </ul>
    </section>
  );
}
