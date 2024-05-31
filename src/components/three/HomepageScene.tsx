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
} from "three";
import {
  flowerFragmentShader,
  flowerVertexShader,
} from "@/lib/three/customFlowerShader";

export default function HomepageScene() {
  const lightRef = useRef<Object3D<Object3DEventMap>>() as MutableRefObject<
    Object3D<Object3DEventMap>
  >;
  const { scene } = useThree();
  const gltf = useGLTF("/three/flower.glb");
  const materials = useRef<Material[]>([]);

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

  useFrame((gl, delta) => {
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
      <primitive object={gltf.scene} />
      <pointLight intensity={80} position={[1, 6, 5]} />
      <pointLight
        ref={(el) => (el ? (lightRef.current = el) : null)}
        intensity={4}
        position={[0, 4, 2.5]}
      />
      <ambientLight intensity={1} />
      <OrbitControls maxDistance={20} minDistance={2}/>
    </>
  );
}
