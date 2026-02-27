"use client";

import { useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { Text } from "@react-three/drei";
import * as THREE from "three";

export type TerminalId = "about" | "projects" | "tech" | "contact" | "stats";

interface InteractiveTerminalProps {
  id: TerminalId;
  position: [number, number, number];
  label: string;
  rotation?: [number, number, number];
  onProximity: (id: TerminalId | null) => void;
  activeTerminal: TerminalId | null;
  playerRef: React.RefObject<THREE.Group | null>;
}

const INTERACT_DISTANCE = 4;

export function InteractiveTerminal({
  id,
  position,
  label,
  rotation = [0, 0, 0],
  onProximity,
  activeTerminal,
  playerRef,
}: InteractiveTerminalProps) {
  const groupRef = useRef<THREE.Group>(null);
  const screenRef = useRef<THREE.Mesh>(null);
  const [isNear, setIsNear] = useState(false);
  const wasNearRef = useRef(false);

  useFrame(({ clock }) => {
    if (!groupRef.current) return;

    // Floating animation
    groupRef.current.position.y =
      position[1] + Math.sin(clock.elapsedTime * 0.8 + position[0]) * 0.05;

    // Check proximity to player (not camera, since we're in 3rd person)
    const terminalPos = new THREE.Vector3(position[0], 0, position[2]);
    const playerPos = playerRef.current
      ? new THREE.Vector3(
          playerRef.current.position.x,
          0,
          playerRef.current.position.z
        )
      : new THREE.Vector3(0, 0, 0);
    const dist = playerPos.distanceTo(terminalPos);
    const isNow = dist < INTERACT_DISTANCE;

    if (isNow !== wasNearRef.current) {
      wasNearRef.current = isNow;
      setIsNear(isNow);
      if (isNow) {
        onProximity(id);
      } else if (activeTerminal === id) {
        onProximity(null);
      }
    }

    // Screen glow pulse
    if (screenRef.current) {
      const mat = screenRef.current.material as THREE.MeshStandardMaterial;
      const baseIntensity = wasNearRef.current ? 0.8 : 0.3;
      mat.emissiveIntensity =
        baseIntensity + Math.sin(clock.elapsedTime * 2) * 0.1;
    }
  });

  return (
    <group ref={groupRef} position={position} rotation={rotation}>
      {/* Monitor body */}
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[2.2, 1.5, 0.15]} />
        <meshStandardMaterial color="#111114" metalness={0.8} roughness={0.3} />
      </mesh>

      {/* Screen */}
      <mesh ref={screenRef} position={[0, 0, 0.08]}>
        <planeGeometry args={[1.9, 1.2]} />
        <meshStandardMaterial
          color="#0a0a0c"
          emissive="#b8ff00"
          emissiveIntensity={0.3}
        />
      </mesh>

      {/* Screen label */}
      <Text
        position={[0, 0.25, 0.09]}
        fontSize={0.15}
        color="#b8ff00"
        anchorX="center"
        anchorY="middle"
      >
        {label}
      </Text>

      {/* Secondary label */}
      <Text
        position={[0, -0.1, 0.09]}
        fontSize={0.08}
        color="#6b6b76"
        anchorX="center"
        anchorY="middle"
      >
        {isNear ? "[E] interact" : "approach to interact"}
      </Text>

      {/* Stand */}
      <mesh position={[0, -0.95, 0]}>
        <boxGeometry args={[0.15, 0.4, 0.15]} />
        <meshStandardMaterial color="#111114" metalness={0.8} roughness={0.3} />
      </mesh>

      {/* Base */}
      <mesh position={[0, -1.15, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[0.5, 16]} />
        <meshStandardMaterial color="#111114" metalness={0.8} roughness={0.3} />
      </mesh>

      {/* Point light for glow effect */}
      <pointLight
        position={[0, 0, 0.5]}
        color="#b8ff00"
        intensity={0.5}
        distance={3}
      />
    </group>
  );
}
