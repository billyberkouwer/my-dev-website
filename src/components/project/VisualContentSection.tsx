"use client";

import Image from "next/image";
import "./image-section.scss";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import MuxPlayer from "@mux/mux-player-react";
import { lerp } from "@/utils/lerp";
import { motion } from "framer-motion";
import { container, itemUp } from "@/lib/framer/animations";

export default function VisualContentSection({
  projectImages,
}: {
  projectImages: any;
}) {
  const visualContentItemsRef = useRef<HTMLLIElement[]>([]);
  const dragContainerButton = useRef<HTMLDivElement>();
  const sectionImagesContainerRef = useRef<HTMLElement>();
  const [isDragButtonDown, setIsDragButtonDown] = useState(false);
  const [isMouseDown, setIsMouseDown] = useState(false);
  const mouseDownPosition = useRef<{
    x: undefined | number;
    y: undefined | number;
  }>({ x: undefined, y: undefined });
  const currentMousePosition = useRef<{
    x: undefined | number;
    y: undefined | number;
  }>({ x: undefined, y: undefined });

  useLayoutEffect(() => {
    const navbar = document.querySelector(".wrapper__main-nav");
    const imageList = document.querySelector(".list__images");
    const container__main = document.querySelector(
      ".container__main"
    ) as HTMLElement;

    function resizeVisualContent() {
      const mainContainer = document.querySelector(
        ".container__main"
      ) as HTMLElement;

      const isMobile = window.innerWidth <= 768;
      if (mainContainer && !isMobile && navbar) {
        visualContentItemsRef.current.forEach((item, i) => {
          const aspectRatio =
            projectImages[i]?.src?.metadata?.dimensions?.aspectRatio ||
            projectImages[i]?.src?.sourceWidth /
              projectImages[i]?.src?.sourceHeight;
          if (aspectRatio < 1) {
            item.style.width =
              Math.round((window.innerHeight -
                navbar?.getBoundingClientRect().height -
                5) *
                aspectRatio) +
              "px";
          } else {
            item.style.height =
              Math.round((window.innerHeight -
                navbar?.getBoundingClientRect().height -
                5) /
                aspectRatio) +
              "px";
            item.style.width =
              Math.round(window.innerHeight -
              navbar?.getBoundingClientRect().height -
              5) +
              "px";
          }
        });
      } else if (mainContainer && isMobile && navbar) {
        visualContentItemsRef.current.forEach((item, i) => {
          const aspectRatio =
            projectImages[i]?.src?.metadata?.dimensions?.aspectRatio ||
            projectImages[i]?.src?.sourceWidth /
              projectImages[i]?.src?.sourceHeight;
          if (aspectRatio < 1) {
            item.style.width =
              (window.innerHeight / 2 -
                navbar?.getBoundingClientRect().height -
                2) *
                aspectRatio +
              "px";
          } else {
            item.style.height =
              (window.innerHeight / 2 -
                navbar?.getBoundingClientRect().height -
                2) /
                aspectRatio +
              "px";
            item.style.width =
              window.innerHeight / 2 -
              navbar?.getBoundingClientRect().height -
              1 +
              "px";
          }
        });
      }
    }

    function resizeMainContainer() {
      const mainContainer = document.querySelector(
        ".container__main"
      ) as HTMLElement;
      if (mainContainer && window.innerWidth > 768 && navbar) {
        mainContainer.style.gridTemplateColumns = `${window.innerWidth / 3}fr ${
          (window.innerWidth / 3) * 2
        }fr`;
      } else if (mainContainer && window.innerWidth <= 768 && navbar) {
        mainContainer.style.gridTemplateColumns = "none";
      }
    }

    resizeVisualContent();

    function resize() {
      resizeMainContainer();
      resizeVisualContent();
    }

    function imageListScroll(e: any) {
      imageList?.scrollTo((imageList.scrollLeft += e.deltaY), 0);
    }

    function mouseUp() {
      setIsDragButtonDown(false);
      setIsMouseDown(false);
    }

    imageList?.addEventListener("mousewheel", (e) => imageListScroll(e));
    imageList?.addEventListener("mousedown", () => {
      setIsMouseDown(true);
    });
    window.addEventListener("mouseup", mouseUp);
    window.addEventListener("resize", resize);

    return () => {
      imageList?.removeEventListener("mousewheel", (e) => imageListScroll(e));
      window.removeEventListener("mouseup", mouseUp);
      window.removeEventListener("resize", resize);
    };
  }, [projectImages]);

  useLayoutEffect(() => {
    const imageList = document.querySelector(".list__images");

    function handleImageListDrag(e: MouseEventInit) {
      const mouseDownX = mouseDownPosition.current.x;
      const mouseDownY = mouseDownPosition.current.y;
      if (isMouseDown && !mouseDownX && !mouseDownY) {
        mouseDownPosition.current.x = e.clientX;
        mouseDownPosition.current.y = e.clientY;
      }
      if (isMouseDown && mouseDownX && mouseDownY) {
        mouseDownPosition.current.x = currentMousePosition.current.x;
        mouseDownPosition.current.y = currentMousePosition.current.y;
        currentMousePosition.current.x = e.clientX;
        currentMousePosition.current.y = e.clientY;

        if (currentMousePosition.current.x && mouseDownPosition.current.x) {
          const amountToMove =
            currentMousePosition.current.x - mouseDownPosition.current.x;

          imageList?.scrollTo(
            lerp(
              imageList.scrollLeft - amountToMove * 2,
              imageList.scrollLeft,
              0.6
            ),
            0
          );
        }
      }
      if (!isMouseDown) {
        mouseDownPosition.current.x = undefined;
        mouseDownPosition.current.y = undefined;
        currentMousePosition.current.x = undefined;
        currentMousePosition.current.y = undefined;
      }
    }
    imageList?.addEventListener("mousemove", handleImageListDrag);
    return () => {
      imageList?.removeEventListener("mousemove", handleImageListDrag);
    };
  }, [isMouseDown]);

  useLayoutEffect(() => {
    function mouseMove(e: MouseEvent) {
      e.preventDefault();
      if (isDragButtonDown) {
        const mainContainer = document.querySelector(
          ".container__main"
        ) as HTMLElement;
        if (mainContainer) {
          mainContainer.style.gridTemplateColumns = `${e.clientX}fr ${
            window.innerWidth - e.clientX
          }fr`;
        }
      }
    }

    document.addEventListener("mousemove", mouseMove);

    return () => {
      document.removeEventListener("mousemove", mouseMove);
    };
  }, [isDragButtonDown]);

  useEffect(() => {
    const container__main = document.querySelector(".container__main") as
      | HTMLElement
      | undefined;

    if (isDragButtonDown) {
      if (container__main) {
        container__main.style.transition = "none";
      }
    } else {
      if (container__main) {
        container__main.style.transition = "1000ms";
      }
    }

    return () => {
      if (container__main) {
        container__main.style.transition = "1000ms";
      }
    };
  }, [isDragButtonDown]);

  return (
    <section
      className="section__images"
      ref={(el) => (el ? (sectionImagesContainerRef.current = el) : null)}
    >
      <div
        className="controller__tab-resize"
        draggable="true"
        ref={(el) => (el ? (dragContainerButton.current = el) : null)}
        onMouseDown={() => setIsDragButtonDown(true)}
      >
        <div className="controller__tab-resize-vertical"></div>
      </div>
      {projectImages.length ? (
        <motion.ul
          variants={container}
          initial="hidden"
          animate="show"
          className="list__images"
        >
          {projectImages.map((asset: any, i: number) => {
            if (asset?.src?._type === "sanity.imageAsset") {
              return (
                <motion.li
                  key={projectImages[i].alt + "image" + i}
                  className="list__image-project"
                  variants={itemUp}
                  ref={(el) =>
                    el ? (visualContentItemsRef.current[i] = el) : null
                  }
                >
                  <Image
                    src={asset?.src.url}
                    alt={asset?.alt}
                    className="img__project"
                    fill
                    style={{
                      aspectRatio:
                        asset?.src?.metadata?.dimensions?.aspectRatio,
                      height: "100%",
                    }}
                  />
                </motion.li>
              );
            }

            if (asset?.src._type === "mux.videoAsset" && asset.src.playbackId) {
              return (
                <motion.li
                  key={asset.src.playbackId + i}
                  className="wrapper__mux-video"
                  ref={(el) =>
                    el ? (visualContentItemsRef.current[i] = el) : null
                  }
                  variants={itemUp}
                  aria-description={asset.title}
                >
                  <MuxPlayer
                    playbackId={asset.src.playbackId}
                    streamType="on-demand"
                    metadataVideoTitle={asset.title}
                    autoPlay
                    loop
                    placeholder={asset.src.blurHash}
                    style={{
                      aspectRatio:
                        asset.src.sourceWidth / asset.src.sourceHeight,
                      width: "100%",
                      height: "100%",
                      backgroundColor: 'transparent',
                      background: 'transparent',
                      // overflow: 'hidden',
                    }}
                  />
                </motion.li>
              );
            }
          })}
        </motion.ul>
      ) : null}
    </section>
  );
}
