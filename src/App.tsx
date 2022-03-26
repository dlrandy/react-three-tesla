import * as THREE from "three";
import React, { useRef, useState } from "react";
import { Canvas, MeshProps, useFrame, useLoader } from "@react-three/fiber";
import Orbit from "../src/components/Orbit";
import moduleName from './assets/wood.jpg';
function Box(props: JSX.IntrinsicElements["mesh"]) {
  const mesh = useRef<THREE.Mesh>(null!);
  const [hovered, setHover] = useState(false);
  const [active, setActive] = useState(false);
  // const texture = useLoader(
  //   THREE.TextureLoader,
  //   ''
  // )
  useFrame((state, delta) => (mesh.current.rotation.y += 0.01));
  return (
    <mesh
      {...props}
      ref={mesh}
      castShadow
      receiveShadow
      scale={active ? 1.5 : 1}
      onClick={(event) => setActive(!active)}
      onPointerOver={(event) => setHover(true)}
      onPointerOut={(event) => setHover(false)}
    >
      <boxGeometry args={[2, 2, 2]} />
      <meshPhysicalMaterial
        // opacity={0.5}
        // wireframe
        // transparent
        // metalness={1}
        roughness={0}
        clearcoat={1}
        transmission={0.5}
        color={hovered ? "hotpink" : "orange"}
      />
    </mesh>
  );
}

function Floor(props: MeshProps) {
  return (
    <mesh {...props} receiveShadow>
      <boxBufferGeometry args={[10, 1, 10]} />
      <meshPhysicalMaterial></meshPhysicalMaterial>
    </mesh>
  );
}
function Bulb(props: MeshProps) {
  return (
    <mesh {...props}>
      <pointLight castShadow></pointLight>
      <sphereBufferGeometry args={[0.3]}></sphereBufferGeometry>
      <meshPhongMaterial emissive={"yellow"}></meshPhongMaterial>
    </mesh>
  );
}
export default () => (
  <div style={{ height: "100vh", width: "100vw" }}>
    <Canvas
      shadows
      camera={{ position: [1, 2, 1] }}
      style={{ background: "black" }}
    >
      <ambientLight intensity={0.3} />
      <>
        <Orbit></Orbit>
      </>

      <Bulb position={[0, 5, 0]}></Bulb>
      <Box position={[0, 2, 0]} />
      <fog attach="fog" args={["white", 1, 12]}></fog>
      <axesHelper args={[7]}></axesHelper>
      <Floor position={[0, -0.5, 0]} />
    </Canvas>
  </div>
);
