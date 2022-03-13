import * as THREE from "three";
import React, { useRef, useState } from "react";
import { Canvas, extend, useFrame, useThree } from "@react-three/fiber";
import '../src/types/types';
const Orbit = () => {
  const { camera, gl } = useThree();
  return <orbitControls args={[camera, gl.domElement]} />;
};
function Box(props: JSX.IntrinsicElements["mesh"]) {
  const mesh = useRef<THREE.Mesh>(null!);
  useFrame((state, delta) => {
    mesh.current.rotation.x += delta;
    mesh.current.rotation.y += delta;
  });
  return (
    <mesh ref={mesh} {...props}>
      <boxBufferGeometry />
      <meshBasicMaterial color="blue" />
    </mesh>
  );
}

export default () => (
  <div style={{ width: "100vw", height: "100vh" }}>
    <Canvas style={{ background: "black" }} camera={{ position: [3, 3, 3] }}>
      <Box position={[-1,1,1]}/>
      <Orbit></Orbit>
      <axesHelper args={[5]}></axesHelper>
    </Canvas>
  </div>
);
