"use client";

import HomepageScene from "@/components/three/HomepageScene";
import { Canvas, CanvasProps } from "@react-three/fiber";
import "./home.scss";
import { Suspense, useEffect, useLayoutEffect, useRef, useState } from "react";
import Loader from "../three/Loader";
import Background from "../three/Background";

export default function Homepage() {
  const fullWidthSectionRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
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
      ref={fullWidthSectionRef}
    >
      <Canvas
        ref={canvasRef}
        style={{ width: canvasSize.x + "px", height: canvasSize.y + "px" }}
        id="three-canvas"
      >
        <Background />
        <Suspense fallback={<Loader />}>
          <HomepageScene />
          {/* <Loader /> */}
        </Suspense>
      </Canvas>
    </section>
  );
}
