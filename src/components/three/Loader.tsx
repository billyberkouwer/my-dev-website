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
  MeshToonMaterial,
} from "three";
export default function Loader() {
  const { active, progress, errors, item, loaded, total } = useProgress();
  const [countUp, setCountUp] = useState({ prev: 0, curr: 0 });
  const meshRef = useRef<Mesh>(null);
  const groupRef = useRef<Group>(null);
  const [toonMat, setToonMat] = useState(() => {
    const mat = new MeshToonMaterial();
    mat.color = new Color("white");
    return mat;
  });
  const [elipses, setElipses] = useState("...");

  useFrame((gl) => {
    if (meshRef.current) meshRef.current.rotation.y = gl.clock.elapsedTime;
  });

  // useEffect(() => {
  //   if (groupRef.current)
  //     gsap.to(groupRef.current.scale, {
  //       duration: 1,
  //       x: (100 - progress) / 100,
  //       y: (100 - progress) / 100,
  //       z: (100 - progress) / 100,
  //     });
  // }, [progress]);

  useEffect(() => {
    let elipses = 1;
    const interval = setInterval(() => {
      if (elipses === 3) {
        setElipses("...");
        elipses = 1;
        return;
      }
      if (elipses === 2) {
        setElipses("..");
        elipses = 3;
        return;
      }
      if (elipses === 1) {
        setElipses(".");
        elipses = 2;
        return;
      }
    }, 500);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <>
      <group ref={groupRef} position={[0,0.5,0]} scale={[0.75,0.75,0.75]}>
        <mesh ref={meshRef}>
          <torusGeometry args={[1, 0.1, 16, 100]} />
          <meshToonMaterial color="lightgrey" />
        </mesh>
        <Text
          font="/fonts/m.otf"
          material={toonMat}
          scale={[0.4, 0.4, 0.4]}
          position={[-0.7, -1.5, 0]}
          anchorX={"left"}
        >
          Loading{elipses}
        </Text>
      </group>
    </>
  );
}
