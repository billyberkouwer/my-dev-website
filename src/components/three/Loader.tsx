import { Html, Text, useProgress } from "@react-three/drei";
import "./loading.scss";
import CountUp from "react-countup";
import { useEffect, useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import gsap from "gsap";
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
  Group,
} from "three";
export default function Loader() {
  const { active, progress, errors, item, loaded, total } = useProgress();
  const [countUp, setCountUp] = useState({ prev: 0, curr: 0 });
  const meshRef = useRef<Mesh>(null);
  const groupRef = useRef<Group>(null);

  useEffect(() => {
    setCountUp((state) => ({ prev: state.curr, curr: progress }));
  }, [progress]);

  useFrame((gl) => {
    if (meshRef.current) meshRef.current.rotation.y = gl.clock.elapsedTime;
  });

  useEffect(() => {
    if (groupRef.current)
      gsap.to(groupRef.current.scale, {
        duration: 1,
        x: (100 - progress) / 100,
        y: (100 - progress) / 100,
        z: (100 - progress) / 100,
      });
  }, [progress]);

  return (
    <>
      <pointLight />
      <group ref={groupRef}>
        <mesh ref={meshRef}>
          <torusGeometry args={[1, 0.1, 16, 100]} />
          <meshToonMaterial color="pink" />
        </mesh>
        <Text font="/fonts/m.otf" color="white" scale={[0.5, 0.5, 0.5]}>
          Loading
        </Text>
      </group>
    </>
  );
}
