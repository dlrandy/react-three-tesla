import * as THREE from "three";
import React, { useMemo, useRef, useState } from "react";
import { Canvas, extend, useFrame, useThree } from "@react-three/fiber";
import "../src/types/types";
import { InstancedMesh } from "three";
const Orbit = () => {
  const { camera, gl } = useThree();
  return <orbitControls args={[camera, gl.domElement]} />;
};
function Dots() {
  const ref = useRef<InstancedMesh>(null!);
  const { vec, transform, positions } = useMemo<{
    vec: THREE.Vector3;
    transform: THREE.Matrix4;
    positions: THREE.Vector3[];
  }>(() => {
    const vec = new THREE.Vector3();
    const transform = new THREE.Matrix4();
    const positions = [...Array(10000)].map((_, i) => {
      const position = new THREE.Vector3();
      position.x = (i % 100) - 50;
      position.y = Math.floor(i / 100) - 50;
      position.y += (i % 2) * 0.5;
      // position.z = 10 - Math.random() * 5;
      position.x += Math.random() * 0.3;
      position.y += Math.random() * 0.3;
      return position;
    });
    return { vec, transform, positions };
  }, []);
  useFrame(({ clock }) => {
    const scale = 1 + Math.sin(clock.elapsedTime) * 0.3;
    for (let i = 0; i < 10000; i++) {
      vec.copy(positions[i]).multiplyScalar(scale);
      transform.setPosition(vec);
      ref.current.setMatrixAt(i, transform);
    }
    ref.current.instanceMatrix.needsUpdate = true;
  });
  return (
    <instancedMesh ref={ref} count={10000}>
      <circleGeometry args={[1]}></circleGeometry>
      <meshBasicMaterial></meshBasicMaterial>
    </instancedMesh>
  );
}
export default () => {
  const pointCount = 3;
  const [positions, colors] = useMemo(() => {
    const pos = [];
    const cols = [];
    for (let i = 0; i < pointCount; i++) {
      pos.push(15 - Math.random() * 15);
      pos.push(15 - Math.random() * 15);
      pos.push(15 - Math.random() * 5);

      cols.push(Math.random()); // r
      cols.push(Math.random()); // g
      cols.push(Math.random()); // b
      cols.push(0.5); // alpha
    }
    return [new Float32Array(pos), new Float32Array(cols)];
  }, [pointCount]);
  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      <Canvas orthographic camera={{ zoom: 5,position:[15,15,15]}}>
        <ambientLight></ambientLight>
        {/* <color attach="background" args={["black"]} /> */}
        <Orbit></Orbit>
        <axesHelper args={[10]}></axesHelper>
        {/* <points>
          <bufferGeometry attach="geometry">
            <bufferAttribute
              attachObject={["attributes", "position"]}
              count={positions.length / 3}
              array={positions}
              itemSize={3}
            />
            <bufferAttribute
              attachObject={["attributes", "rgba"]}
              count={colors.length / 4}
              array={colors}
              itemSize={4}
            />
          </bufferGeometry>
          <meshBasicMaterial color="#ff6545"></meshBasicMaterial>
        </points> */}
        {/* <line>
          <bufferGeometry attach="geometry">
            <bufferAttribute
              attachObject={["attributes", "position"]}
              count={positions.length / 3}
              array={positions}
              itemSize={3}
            />
            <bufferAttribute
              attachObject={["attributes", "rgba"]}
              count={colors.length / 4}
              array={colors}
              itemSize={4}
            />
          </bufferGeometry>
          <meshBasicMaterial color="#ff6545"></meshBasicMaterial>
        </line> */}
        
        <mesh>
          <bufferGeometry attach="geometry">
            <bufferAttribute
              attachObject={["attributes", "position"]}
              count={positions.length / 3}
              array={positions}
              itemSize={3}
            />
            <bufferAttribute
              attachObject={["attributes", "rgba"]}
              count={colors.length / 4}
              array={colors}
              itemSize={4}
            />
          </bufferGeometry>
          <meshBasicMaterial side={THREE.DoubleSide} color="#ff6545"></meshBasicMaterial>
        </mesh>
      </Canvas>
    </div>
  );
};
