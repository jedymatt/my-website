"use client";

import { useRef, useEffect } from "react";
import { useThree, useFrame } from "@react-three/fiber";
import * as THREE from "three";

const MOVE_SPEED = 2.5;
const MOUSE_SENSITIVITY = 0.001;
const TOUCH_LOOK_SENSITIVITY = 0.003;
const BOUNDARY = 30;
const PLAYER_HEIGHT = 0;

// 3rd person camera offset
const CAM_DISTANCE = 6;
const CAM_HEIGHT = 4;
const CAM_LERP = 0.08;

interface PlayerControllerProps {
  isPanelOpen: boolean;
  touchMoveRef: React.RefObject<{ x: number; y: number }>;
  touchLookRef: React.RefObject<{ dx: number; dy: number }>;
  playerRef: React.RefObject<THREE.Group | null>;
}

export function PlayerController({
  isPanelOpen,
  touchMoveRef,
  touchLookRef,
  playerRef,
}: PlayerControllerProps) {
  const { camera, gl } = useThree();
  const keysRef = useRef<Set<string>>(new Set());
  const velocityRef = useRef(new THREE.Vector3());
  const directionRef = useRef(new THREE.Vector3());
  const yawRef = useRef(0);
  const isLockedRef = useRef(false);

  useEffect(() => {
    if (playerRef.current) {
      playerRef.current.position.set(0, PLAYER_HEIGHT, 8);
    }
    camera.position.set(0, CAM_HEIGHT, 8 + CAM_DISTANCE);
    camera.lookAt(0, 1, 8);
  }, [camera, playerRef]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (isPanelOpen) return;
      keysRef.current.add(e.code);
    };
    const handleKeyUp = (e: KeyboardEvent) => {
      keysRef.current.delete(e.code);
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (!isLockedRef.current || isPanelOpen) return;
      yawRef.current -= e.movementX * MOUSE_SENSITIVITY;
    };

    const handleLockChange = () => {
      isLockedRef.current = document.pointerLockElement === gl.domElement;
    };

    const handleClick = () => {
      if (!isLockedRef.current && !isPanelOpen && "requestPointerLock" in gl.domElement) {
        gl.domElement.requestPointerLock();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("pointerlockchange", handleLockChange);
    gl.domElement.addEventListener("click", handleClick);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("pointerlockchange", handleLockChange);
      gl.domElement.removeEventListener("click", handleClick);
    };
  }, [camera, gl, isPanelOpen]);

  // Release pointer lock when panel opens
  useEffect(() => {
    if (isPanelOpen && document.pointerLockElement) {
      document.exitPointerLock();
    }
  }, [isPanelOpen]);

  useFrame(() => {
    if (isPanelOpen || !playerRef.current) return;

    const keys = keysRef.current;
    const velocity = velocityRef.current;
    const direction = directionRef.current;

    // Damping
    velocity.x *= 0.88;
    velocity.z *= 0.88;

    // Get movement direction from keyboard
    direction.set(0, 0, 0);
    if (keys.has("KeyW") || keys.has("ArrowUp")) direction.z -= 1;
    if (keys.has("KeyS") || keys.has("ArrowDown")) direction.z += 1;
    if (keys.has("KeyA") || keys.has("ArrowLeft")) direction.x -= 1;
    if (keys.has("KeyD") || keys.has("ArrowRight")) direction.x += 1;

    // Apply touch joystick input
    const touchMove = touchMoveRef.current;
    if (touchMove && (touchMove.x !== 0 || touchMove.y !== 0)) {
      direction.x += touchMove.x;
      direction.z += touchMove.y;
    }

    // Apply touch look input
    const touchLook = touchLookRef.current;
    if (touchLook && (touchLook.dx !== 0 || touchLook.dy !== 0)) {
      yawRef.current -= touchLook.dx * TOUCH_LOOK_SENSITIVITY;
      touchLook.dx = 0;
      touchLook.dy = 0;
    }

    if (direction.length() > 0) {
      direction.normalize();

      // Movement is relative to camera yaw
      const forward = new THREE.Vector3(
        -Math.sin(yawRef.current),
        0,
        -Math.cos(yawRef.current)
      );
      const right = new THREE.Vector3(
        Math.cos(yawRef.current),
        0,
        -Math.sin(yawRef.current)
      );

      const moveDir = new THREE.Vector3()
        .addScaledVector(forward, -direction.z)
        .addScaledVector(right, direction.x)
        .normalize();

      velocity.addScaledVector(moveDir, MOVE_SPEED * 0.016);

      // Rotate player to face movement direction
      const targetAngle = Math.atan2(moveDir.x, moveDir.z);
      const currentAngle = playerRef.current.rotation.y;
      let angleDiff = targetAngle - currentAngle;
      // Normalize to -PI..PI
      while (angleDiff > Math.PI) angleDiff -= Math.PI * 2;
      while (angleDiff < -Math.PI) angleDiff += Math.PI * 2;
      playerRef.current.rotation.y += angleDiff * 0.12;
    }

    // Apply velocity to player
    playerRef.current.position.add(velocity);

    // Keep player within bounds
    playerRef.current.position.clamp(
      new THREE.Vector3(-BOUNDARY, PLAYER_HEIGHT, -BOUNDARY),
      new THREE.Vector3(BOUNDARY, PLAYER_HEIGHT, BOUNDARY)
    );

    // Camera follows player from behind (3rd person)
    const playerPos = playerRef.current.position;
    const idealCamPos = new THREE.Vector3(
      playerPos.x + Math.sin(yawRef.current) * CAM_DISTANCE,
      playerPos.y + CAM_HEIGHT,
      playerPos.z + Math.cos(yawRef.current) * CAM_DISTANCE
    );

    // Smooth camera follow
    camera.position.lerp(idealCamPos, CAM_LERP);

    // Camera looks at player
    const lookTarget = new THREE.Vector3(
      playerPos.x,
      playerPos.y + 1.2,
      playerPos.z
    );
    camera.lookAt(lookTarget);
  });

  return null;
}
