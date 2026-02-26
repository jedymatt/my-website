"use client";

import { useRef, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

const PARTICLE_COUNT = 500;
const SPREAD = 60;
const HEIGHT = 30;

export function MatrixRain() {
  const pointsRef = useRef<THREE.Points>(null);
  const velocitiesRef = useRef<Float32Array | null>(null);

  useEffect(() => {
    if (!pointsRef.current) return;

    const positions = new Float32Array(PARTICLE_COUNT * 3);
    const velocities = new Float32Array(PARTICLE_COUNT);

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      positions[i * 3] = (Math.random() - 0.5) * SPREAD;
      positions[i * 3 + 1] = Math.random() * HEIGHT;
      positions[i * 3 + 2] = (Math.random() - 0.5) * SPREAD;
      velocities[i] = 1 + Math.random() * 3;
    }

    velocitiesRef.current = velocities;

    const geom = pointsRef.current.geometry;
    geom.setAttribute("position", new THREE.BufferAttribute(positions, 3));
  }, []);

  useFrame((_, delta) => {
    if (!pointsRef.current || !velocitiesRef.current) return;
    const posAttr = pointsRef.current.geometry.attributes
      .position as THREE.BufferAttribute | undefined;
    if (!posAttr) return;
    const arr = posAttr.array as Float32Array;
    const velocities = velocitiesRef.current;

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      arr[i * 3 + 1] -= velocities[i] * delta;
      if (arr[i * 3 + 1] < -1) {
        arr[i * 3 + 1] = HEIGHT;
        arr[i * 3] = (Math.random() - 0.5) * SPREAD;
        arr[i * 3 + 2] = (Math.random() - 0.5) * SPREAD;
      }
    }
    posAttr.needsUpdate = true;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry />
      <pointsMaterial
        color="#b8ff00"
        size={0.08}
        transparent
        opacity={0.6}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  );
}
