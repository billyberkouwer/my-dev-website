"use client";

import Image from "next/image";
import "./image-section.scss";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import MuxPlayer from "@mux/mux-player-react";

function sizeImages(
  containerSize: { x: number; y: number },
  aspectRatio: number | undefined
) {
  if (aspectRatio) {
    if (containerSize.x / aspectRatio > containerSize.y) {
      return { x: containerSize.y * aspectRatio, y: containerSize.y };
    }
    return { x: containerSize.x, y: containerSize.x / aspectRatio };
  }
  return containerSize;
}

export default function VisualContentSection({
  projectImages,
}: {
  projectImages: any;
}) {
  const [imageSectionDimensions, setImageSectionDimensions] = useState({
    x: 0,
    y: 0,
  });
  const dragContainerButton = useRef<HTMLDivElement>();
  const [isDragButtonDown, setIsDragButtonDown] = useState(false);

  useLayoutEffect(() => {
    const navbar = document.querySelector(".wrapper__main-nav");
    const imageList = document.querySelector(".list__images");

    if (navbar) {
      setImageSectionDimensions({
        x: window.innerWidth - navbar?.getBoundingClientRect().x || 0,
        y: window.innerHeight - navbar?.getBoundingClientRect().x || 0,
      });
    }

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
        {projectImages.map((asset: any, i: number) => {
          if (asset?.src?._type === "sanity.imageAsset") {
            return (
              <li
                key={projectImages[i].alt + "image" + i}
                className="list__image-project"
                style={{
                  width: sizeImages(
                    imageSectionDimensions,
                    asset?.src?.metadata?.dimensions?.aspectRatio
                  ).x,
                  height: sizeImages(
                    imageSectionDimensions,
                    asset?.src?.metadata?.dimensions?.aspectRatio
                  ).y,
                }}
              >
                <Image
                  src={asset?.src.url}
                  alt={asset?.alt}
                  className="img__project"
                  fill
                />
              </li>
            );
          }

          if (asset?.src._type === "mux.videoAsset" && asset.src.playbackId) {
            return (
              <li
                key={asset.src.playbackId}
                className="wrapper__mux-video"
                style={{
                  width: sizeImages(
                    imageSectionDimensions,
                    asset.src.sourceWidth / asset.src.sourceHeight
                  ).x,
                  height: sizeImages(
                    imageSectionDimensions,
                    asset.src.sourceWidth / asset.src.sourceHeight
                  ).y,
                }}
              >
                <MuxPlayer
                  playbackId={asset.src.playbackId}
                  streamType="on-demand"
                  autoPlay
                  loop
                  placeholder={asset.src.blurHash}
                  style={{
                    aspectRatio: asset.src.sourceWidth / asset.src.sourceHeight,
                    height: "inherit",
                  }}
                />
              </li>
            );
          }
        })}
      </ul>
    </section>
  );
}
