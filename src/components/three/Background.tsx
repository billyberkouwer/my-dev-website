"use client";

import { OrbitControls, useGLTF } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import { MutableRefObject, useEffect, useRef } from "react";
import {
  Object3D,
  Object3DEventMap,
  SkinnedMesh,
  Material,
  MeshPhysicalMaterial,
  Color,
  Uniform,
  DoubleSide,
  Mesh,
  ShaderMaterial,
  PointLight,
} from "three";
import {
  flowerFragmentShader,
  flowerVertexShader,
} from "@/lib/three/customFlowerShader";
import { customBackgroundShader } from "../home/shader";

export default function Background() {
  const backgroundShaderRef = useRef<ShaderMaterial | null>(null);
  const lightRef = useRef<PointLight>(null);
  const backgroundMesh = useRef<Mesh>(null);

  useEffect(() => {
    if (backgroundMesh.current) {
      const backgroundMaterial = new MeshPhysicalMaterial();
      backgroundMaterial.emissive = new Color(0.5, 0.1, 0).offsetHSL(0, 0, 0.1);
      backgroundMaterial.side = DoubleSide;

      const backgroundShaderCompile = function (shader: any) {
        backgroundShaderRef.current = shader;
        shader.uniforms.time = new Uniform(1);
        shader.fragmentShader = customBackgroundShader;
      };
      if (backgroundMaterial) {
        backgroundMaterial.onBeforeCompile = backgroundShaderCompile;
      }
      backgroundMesh.current.material = backgroundMaterial;
      console.log(backgroundMesh);
    }
  }, []);

  useFrame((state) => {
    if (backgroundShaderRef.current) {
      backgroundShaderRef.current.uniforms.time.value =
        state.clock.elapsedTime * 6;
    }
  });

  return (
    <>
      <pointLight intensity={80} position={[1, 6, 5]} />
      <pointLight
        ref={lightRef}
        intensity={4}
        position={[0, 4, 2.5]}
      />
      <ambientLight intensity={1} />
      <mesh ref={backgroundMesh}>
        <sphereGeometry args={[30]} />
      </mesh>
    </>
  );
}
