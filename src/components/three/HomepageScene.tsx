"use client";

import { OrbitControls, useGLTF } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import { MutableRefObject, useEffect, useLayoutEffect, useRef, useState } from "react";
import {
  Object3D,
  Object3DEventMap,
  SkinnedMesh,
  Mesh,
  Material,
  SphereGeometry,
  DoubleSide,
  MeshPhysicalMaterial,
  TextureLoader
} from "three";
import { useProgress } from "@react-three/drei";
import {
  backgroundFragmentShader,
  backgroundVertexShader,
} from "@/lib/three/customBackgroundShader";
import {
  flowerFragmentShader,
  flowerVertexShader,
} from "@/lib/three/customFlowerShader";

export const Loader = ({
  setIsLoaded,
}: {
  setIsLoaded: (boolean: boolean) => void;
}) => {
  const { progress } = useProgress();

  useEffect(() => {
    if (progress >= 100) {
      setIsLoaded(true);
    }
    console.log(progress);
  }, [progress, setIsLoaded]);

  return <></>;
};

export default function HomepageScene() {
  const lightRef = useRef<Object3D<Object3DEventMap>>() as MutableRefObject<
    Object3D<Object3DEventMap>
  >;
  const { scene } = useThree();
  const gltf = useGLTF("/three/flower.glb");
  const [circle, setCircle] = useState<Mesh>();
  const materials = useRef<Material[]>([]);
  const bgMaterials = useRef<Material[]>([]);

  useLayoutEffect(() => {
    const geo = new SphereGeometry(100, 32, 64);
    const mat = new MeshPhysicalMaterial({
      transmission: 0.2,
    });

    new TextureLoader().load('/bgColorMap.jpg', (tex) => {
      mat.emissiveMap = tex;
      mat.map = tex;
    })

    function customBackground(shader: any) {
      shader.uniforms.uTime = { value: Date.now() };
      shader.fragmentShader = backgroundFragmentShader;
      shader.vertexShader = backgroundVertexShader;
      mat.userData.shader = shader;
    }
    mat.onBeforeCompile = customBackground;
    bgMaterials.current.push(mat);
    const mesh = new Mesh(geo, mat);
    mat.side = DoubleSide;
    setCircle(mesh);
  }, []);

  useLayoutEffect(() => {
    scene.matrixAutoUpdate = true;
    scene.matrixWorldNeedsUpdate = true;
    gltf.scene.traverse((node) => {
      if ((node as SkinnedMesh)?.isSkinnedMesh) {
        const skinnedMesh = node as SkinnedMesh;
        skinnedMesh.normalizeSkinWeights();
        skinnedMesh.geometry.normalizeNormals();
        const material = skinnedMesh.material as MeshPhysicalMaterial;
        material.transmission = 0.1;
        material.roughness = 0.9;
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

  useFrame(() => {
    if (materials.current) {
      materials.current.forEach((material) => {
        const uTime = material.userData.shader?.uniforms?.uTime;
        if (uTime) {
          uTime.value = performance.now() / 5000;
        }
      });
    }

    if (bgMaterials.current) {
      bgMaterials.current.forEach((material) => {
        const uTime = material.userData.shader?.uniforms?.uTime;
        if (uTime) {
          uTime.value = performance.now() / 5000;
        }
      });
    }
  });

  return (
    <>
      <primitive object={gltf.scene} />
      {circle ? <primitive object={circle} /> : null}
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
