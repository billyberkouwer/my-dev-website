"use client";

import HomepageScene from "@/components/three/HomepageScene";
import { Canvas } from "@react-three/fiber";
import "./home.scss";
import { Suspense, useEffect, useLayoutEffect, useRef, useState } from "react";
import Loader from "../three/Loader";

export default function Homepage() {
  const fullWidthSectionRef = useRef<HTMLElement>();
  const canvasRef = useRef<HTMLElement>();
  const [canvasSize, setCanvasSize] = useState<{
    x: number | undefined;
    y: number | undefined;
  }>({ x: undefined, y: undefined });

  useEffect(() => {
    if (fullWidthSectionRef.current) {
      const container__main = fullWidthSectionRef.current?.parentElement;
      if (container__main) {
        if (container__main?.attributeStyleMap) {
          container__main.attributeStyleMap.clear();
        }
        fullWidthSectionRef.current.classList.add("hide-border");
        container__main.style.transition = "1000ms";
        container__main.classList.remove("is-content-split");
        return () => {
          if (container__main) {
            container__main.classList.add("is-content-split");
          }
        };
      }
    }
  }, []);

  useEffect(() => {
    function resizeCanvas() {
      setCanvasSize({
        x: window.innerWidth,
        y: window.innerHeight,
      });
    }
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);
    return () => {
      window.removeEventListener("resize", resizeCanvas);
    };
  }, []);

  return (
    <section
      className="wrapper__full-width"
      ref={(el) => (el ? (fullWidthSectionRef.current = el) : null)}
    >
      <Canvas
        ref={(el) => (el ? (canvasRef.current = el) : null)}
        style={{ width: canvasSize.x + "px", height: canvasSize.y + "px" }}
        id="three-canvas"
        camera={{ position: [-3, -2, 5] }}
      >
        <Suspense fallback={<Loader />}>
          <HomepageScene />
        </Suspense>
      </Canvas>
    </section>
  );
}
