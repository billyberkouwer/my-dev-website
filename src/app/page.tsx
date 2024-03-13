"use client";

import HomepageScene from "@/components/three/HomepageScene";
import { Canvas } from "@react-three/fiber";
import "./home.scss";
import { Suspense } from "react";

export default function Home() {
  return (
    <section className="wrapper__full-width">
      <Suspense>
        <Canvas>
          <HomepageScene />
        </Canvas>
      </Suspense>
    </section>
  );
}
