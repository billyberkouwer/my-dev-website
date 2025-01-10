"use client";

import { OrbitControls, useGLTF, useProgress } from "@react-three/drei";
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
} from "three";
import {
  flowerFragmentShader,
  flowerVertexShader,
} from "@/lib/three/customFlowerShader";
import { customBackgroundShader } from "../home/shader";
import gsap from "gsap";

export default function HomepageScene() {
  const { scene, camera } = useThree();
  const gltf = useGLTF("/three/flower.glb");
  const flower = useRef<Mesh>(null);
  const materials = useRef<Material[]>([]);
  const backgroundMesh = useRef(null);
  const backgroundShaderRef = useRef(null);
  const { active, progress, errors, item, loaded, total } = useProgress();

  useEffect(() => {
    if (progress >= 100 && flower.current) {
      gsap.to(flower.current.scale, {
        x: 1,
        y: 1,
        z: 1,
        duration: 1,
      });

      gsap.to(camera.position, {
        x: -3,
        y: -2,
        z: 5,
        duration: 0.5,
      });
    }
  }, [progress, camera]);

  useEffect(() => {
    scene.matrixAutoUpdate = true;
    scene.matrixWorldNeedsUpdate = true;
    gltf.scene.traverse((node) => {
      if ((node as SkinnedMesh)?.isSkinnedMesh) {
        const skinnedMesh = node as SkinnedMesh;
        const material = skinnedMesh.material as MeshPhysicalMaterial;
        material.transmission = 0.2;
        material.roughness = 0.75;
        const uTime = Date.now();
        const onBeforeCompile = (shader: any) => {
          shader.uniforms.uTime = { value: uTime };
          shader.vertexShader = flowerVertexShader;
          shader.fragmentShader = flowerFragmentShader;
          material.userData.shader = shader;
        };
        material.onBeforeCompile = onBeforeCompile;
        material.needsUpdate = true;
        materials.current.push(material);
      }
    });
  }, [scene, gltf]);

  useFrame((state, delta) => {
    if (materials.current.length) {
      materials.current.forEach((material) => {
        const uTime = material.userData.shader?.uniforms?.uTime;
        if (uTime) {
          uTime.value = performance.now() / 5000;
        }
      });
      gltf.scene.rotateY(-delta / 10);
    }
  });

  return (
    <>
      <primitive scale={[0, 0, 0]} object={gltf.scene} ref={flower} />
      <OrbitControls maxDistance={20} minDistance={2} />
    </>
  );
}
