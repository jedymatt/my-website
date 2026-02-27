"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface PlayerCharacterProps {
  playerRef: React.RefObject<THREE.Group | null>;
}

export function PlayerCharacter({ playerRef }: PlayerCharacterProps) {
  const headRef = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    // Subtle head bob
    if (headRef.current) {
      headRef.current.position.y = 1.55 + Math.sin(clock.elapsedTime * 2) * 0.02;
    }
  });

  return (
    <group ref={playerRef} position={[0, 0, 8]}>
      {/* Body */}
      <mesh position={[0, 0.85, 0]}>
        <boxGeometry args={[0.5, 0.7, 0.3]} />
        <meshStandardMaterial color="#111114" emissive="#b8ff00" emissiveIntensity={0.05} />
      </mesh>

      {/* Body wireframe */}
      <lineSegments position={[0, 0.85, 0]}>
        <edgesGeometry args={[new THREE.BoxGeometry(0.5, 0.7, 0.3)]} />
        <lineBasicMaterial color="#b8ff00" transparent opacity={0.5} />
      </lineSegments>

      {/* Head */}
      <mesh ref={headRef} position={[0, 1.55, 0]}>
        <boxGeometry args={[0.3, 0.3, 0.3]} />
        <meshStandardMaterial color="#111114" emissive="#b8ff00" emissiveIntensity={0.1} />
      </mesh>

      {/* Head wireframe */}
      <lineSegments position={[0, 1.55, 0]}>
        <edgesGeometry args={[new THREE.BoxGeometry(0.3, 0.3, 0.3)]} />
        <lineBasicMaterial color="#b8ff00" transparent opacity={0.6} />
      </lineSegments>

      {/* Visor (face screen) */}
      <mesh position={[0, 1.58, 0.16]}>
        <planeGeometry args={[0.24, 0.1]} />
        <meshStandardMaterial color="#0a0a0c" emissive="#b8ff00" emissiveIntensity={0.6} />
      </mesh>

      {/* Left leg */}
      <mesh position={[-0.12, 0.3, 0]}>
        <boxGeometry args={[0.15, 0.6, 0.2]} />
        <meshStandardMaterial color="#111114" emissive="#b8ff00" emissiveIntensity={0.03} />
      </mesh>
      <lineSegments position={[-0.12, 0.3, 0]}>
        <edgesGeometry args={[new THREE.BoxGeometry(0.15, 0.6, 0.2)]} />
        <lineBasicMaterial color="#b8ff00" transparent opacity={0.3} />
      </lineSegments>

      {/* Right leg */}
      <mesh position={[0.12, 0.3, 0]}>
        <boxGeometry args={[0.15, 0.6, 0.2]} />
        <meshStandardMaterial color="#111114" emissive="#b8ff00" emissiveIntensity={0.03} />
      </mesh>
      <lineSegments position={[0.12, 0.3, 0]}>
        <edgesGeometry args={[new THREE.BoxGeometry(0.15, 0.6, 0.2)]} />
        <lineBasicMaterial color="#b8ff00" transparent opacity={0.3} />
      </lineSegments>

      {/* Left arm */}
      <mesh position={[-0.38, 0.85, 0]}>
        <boxGeometry args={[0.12, 0.55, 0.15]} />
        <meshStandardMaterial color="#111114" emissive="#b8ff00" emissiveIntensity={0.03} />
      </mesh>
      <lineSegments position={[-0.38, 0.85, 0]}>
        <edgesGeometry args={[new THREE.BoxGeometry(0.12, 0.55, 0.15)]} />
        <lineBasicMaterial color="#b8ff00" transparent opacity={0.3} />
      </lineSegments>

      {/* Right arm */}
      <mesh position={[0.38, 0.85, 0]}>
        <boxGeometry args={[0.12, 0.55, 0.15]} />
        <meshStandardMaterial color="#111114" emissive="#b8ff00" emissiveIntensity={0.03} />
      </mesh>
      <lineSegments position={[0.38, 0.85, 0]}>
        <edgesGeometry args={[new THREE.BoxGeometry(0.12, 0.55, 0.15)]} />
        <lineBasicMaterial color="#b8ff00" transparent opacity={0.3} />
      </lineSegments>

      {/* Player glow light */}
      <pointLight position={[0, 1.2, 0]} color="#b8ff00" intensity={0.3} distance={4} />
    </group>
  );
}
