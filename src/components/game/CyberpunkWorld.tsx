"use client";

import { useMemo } from "react";
import { NeonBuilding } from "./NeonBuilding";
import { MatrixRain } from "./MatrixRain";
import * as THREE from "three";

function GridFloor() {
  const gridTexture = useMemo(() => {
    const canvas = document.createElement("canvas");
    canvas.width = 512;
    canvas.height = 512;
    const ctx = canvas.getContext("2d")!;

    ctx.fillStyle = "#0a0a0c";
    ctx.fillRect(0, 0, 512, 512);

    ctx.strokeStyle = "rgba(184, 255, 0, 0.12)";
    ctx.lineWidth = 1;

    const gridSize = 32;
    for (let i = 0; i <= 512; i += gridSize) {
      ctx.beginPath();
      ctx.moveTo(i, 0);
      ctx.lineTo(i, 512);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(0, i);
      ctx.lineTo(512, i);
      ctx.stroke();
    }

    const texture = new THREE.CanvasTexture(canvas);
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    texture.repeat.set(8, 8);
    return texture;
  }, []);

  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]}>
      <planeGeometry args={[100, 100]} />
      <meshStandardMaterial
        map={gridTexture}
        emissive="#b8ff00"
        emissiveIntensity={0.02}
      />
    </mesh>
  );
}

function GroundMarker({ position }: { position: [number, number, number] }) {
  return (
    <mesh
      rotation={[-Math.PI / 2, 0, 0]}
      position={[position[0], 0.01, position[2]]}
    >
      <ringGeometry args={[0.8, 1.2, 32]} />
      <meshStandardMaterial
        color="#b8ff00"
        emissive="#b8ff00"
        emissiveIntensity={0.3}
        transparent
        opacity={0.25}
        side={THREE.DoubleSide}
      />
    </mesh>
  );
}

const BUILDINGS: { pos: [number, number, number]; size: [number, number, number]; pulse: number }[] = [
  { pos: [-20, 5, -20], size: [4, 10, 4], pulse: 0.8 },
  { pos: [-15, 8, -25], size: [3, 16, 3], pulse: 1.2 },
  { pos: [20, 6, -18], size: [5, 12, 3], pulse: 0.6 },
  { pos: [25, 4, -22], size: [3, 8, 5], pulse: 1.0 },
  { pos: [-22, 7, 15], size: [4, 14, 4], pulse: 0.9 },
  { pos: [18, 5, 20], size: [3, 10, 3], pulse: 1.1 },
  { pos: [-25, 9, -5], size: [3, 18, 3], pulse: 0.7 },
  { pos: [22, 6, 5], size: [4, 12, 4], pulse: 1.3 },
  { pos: [0, 4, -28], size: [6, 8, 3], pulse: 0.5 },
  { pos: [-10, 6, 22], size: [3, 12, 5], pulse: 1.0 },
  { pos: [12, 7, -25], size: [3, 14, 3], pulse: 0.8 },
  { pos: [-28, 5, 8], size: [4, 10, 4], pulse: 1.2 },
  { pos: [28, 3, -10], size: [3, 6, 6], pulse: 0.9 },
  { pos: [15, 8, 25], size: [4, 16, 3], pulse: 0.6 },
];

const TERMINAL_POSITIONS: [number, number, number][] = [
  [-8, 0, -5],
  [8, 0, -8],
  [-6, 0, 5],
  [6, 0, 5],
  [3, 0, -3],
];

export function CyberpunkWorld() {
  return (
    <>
      {/* Lighting */}
      <ambientLight intensity={0.15} />
      <pointLight position={[0, 10, 0]} color="#b8ff00" intensity={0.5} distance={40} />
      <pointLight position={[-10, 8, -10]} color="#b8ff00" intensity={0.3} distance={30} />
      <pointLight position={[10, 8, 10]} color="#b8ff00" intensity={0.3} distance={30} />

      {/* Fog */}
      <fog attach="fog" args={["#0a0a0c", 15, 50]} />

      {/* Background color */}
      <color attach="background" args={["#0a0a0c"]} />

      {/* Grid floor */}
      <GridFloor />

      {/* Neon buildings around perimeter */}
      {BUILDINGS.map((b, i) => (
        <NeonBuilding
          key={i}
          position={b.pos}
          size={b.size}
          pulseSpeed={b.pulse}
        />
      ))}

      {/* Ground markers at terminal locations */}
      {TERMINAL_POSITIONS.map((pos, i) => (
        <GroundMarker key={i} position={pos} />
      ))}

      {/* Matrix rain particles */}
      <MatrixRain />
    </>
  );
}
