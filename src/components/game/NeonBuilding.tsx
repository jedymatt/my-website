"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface NeonBuildingProps {
  position: [number, number, number];
  size: [number, number, number];
  pulseSpeed?: number;
}

export function NeonBuilding({
  position,
  size,
  pulseSpeed = 1,
}: NeonBuildingProps) {
  const edgesRef = useRef<THREE.LineSegments>(null);
  const geometry = new THREE.BoxGeometry(...size);
  const edges = new THREE.EdgesGeometry(geometry);

  useFrame(({ clock }) => {
    if (edgesRef.current) {
      const material = edgesRef.current.material as THREE.LineBasicMaterial;
      const pulse = 0.3 + Math.sin(clock.elapsedTime * pulseSpeed) * 0.2;
      material.opacity = pulse;
    }
  });

  return (
    <group position={position}>
      {/* Solid dark fill */}
      <mesh>
        <boxGeometry args={size} />
        <meshStandardMaterial
          color="#0a0a0c"
          transparent
          opacity={0.8}
        />
      </mesh>
      {/* Glowing wireframe edges */}
      <lineSegments ref={edgesRef} geometry={edges}>
        <lineBasicMaterial
          color="#b8ff00"
          transparent
          opacity={0.4}
        />
      </lineSegments>
    </group>
  );
}
