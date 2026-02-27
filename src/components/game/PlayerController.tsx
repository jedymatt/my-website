"use client";

import { useRef, useEffect, useCallback } from "react";
import { useThree, useFrame } from "@react-three/fiber";
import * as THREE from "three";

const MOVE_SPEED = 5;
const MOUSE_SENSITIVITY = 0.002;
const TOUCH_LOOK_SENSITIVITY = 0.004;
const BOUNDARY = 30;
const PLAYER_HEIGHT = 1.6;

interface PlayerControllerProps {
  isPanelOpen: boolean;
  touchMoveRef: React.RefObject<{ x: number; y: number }>;
  touchLookRef: React.RefObject<{ dx: number; dy: number }>;
}

export function PlayerController({
  isPanelOpen,
  touchMoveRef,
  touchLookRef,
}: PlayerControllerProps) {
  const { camera, gl } = useThree();
  const keysRef = useRef<Set<string>>(new Set());
  const eulerRef = useRef(new THREE.Euler(0, 0, 0, "YXZ"));
  const velocityRef = useRef(new THREE.Vector3());
  const directionRef = useRef(new THREE.Vector3());
  const isLockedRef = useRef(false);

  const requestLock = useCallback(() => {
    if (!isPanelOpen && "requestPointerLock" in gl.domElement) {
      gl.domElement.requestPointerLock();
    }
  }, [gl, isPanelOpen]);

  useEffect(() => {
    camera.position.set(0, PLAYER_HEIGHT, 8);
    camera.rotation.set(0, 0, 0);
  }, [camera]);

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
      eulerRef.current.setFromQuaternion(camera.quaternion);
      eulerRef.current.y -= e.movementX * MOUSE_SENSITIVITY;
      eulerRef.current.x -= e.movementY * MOUSE_SENSITIVITY;
      eulerRef.current.x = Math.max(
        -Math.PI / 2.5,
        Math.min(Math.PI / 2.5, eulerRef.current.x)
      );
      camera.quaternion.setFromEuler(eulerRef.current);
    };

    const handleLockChange = () => {
      isLockedRef.current = document.pointerLockElement === gl.domElement;
    };

    const handleClick = () => {
      if (!isLockedRef.current && !isPanelOpen) {
        requestLock();
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
  }, [camera, gl, isPanelOpen, requestLock]);

  // Release pointer lock when panel opens
  useEffect(() => {
    if (isPanelOpen && document.pointerLockElement) {
      document.exitPointerLock();
    }
  }, [isPanelOpen]);

  useFrame((_, delta) => {
    if (isPanelOpen) return;

    const keys = keysRef.current;
    const velocity = velocityRef.current;
    const direction = directionRef.current;

    // Damping
    velocity.x *= 0.85;
    velocity.z *= 0.85;

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

    if (direction.length() > 0) {
      direction.normalize();

      // Apply movement relative to camera direction
      const forward = new THREE.Vector3(0, 0, -1);
      forward.applyQuaternion(camera.quaternion);
      forward.y = 0;
      forward.normalize();

      const right = new THREE.Vector3(1, 0, 0);
      right.applyQuaternion(camera.quaternion);
      right.y = 0;
      right.normalize();

      velocity.add(
        forward
          .multiplyScalar(-direction.z * MOVE_SPEED * delta)
          .add(right.multiplyScalar(direction.x * MOVE_SPEED * delta))
      );
    }

    // Apply touch look input
    const touchLook = touchLookRef.current;
    if (touchLook && (touchLook.dx !== 0 || touchLook.dy !== 0)) {
      eulerRef.current.setFromQuaternion(camera.quaternion);
      eulerRef.current.y -= touchLook.dx * TOUCH_LOOK_SENSITIVITY;
      eulerRef.current.x -= touchLook.dy * TOUCH_LOOK_SENSITIVITY;
      eulerRef.current.x = Math.max(
        -Math.PI / 2.5,
        Math.min(Math.PI / 2.5, eulerRef.current.x)
      );
      camera.quaternion.setFromEuler(eulerRef.current);
      touchLook.dx = 0;
      touchLook.dy = 0;
    }

    camera.position.add(velocity);

    // Keep player within bounds
    camera.position.clamp(
      new THREE.Vector3(-BOUNDARY, PLAYER_HEIGHT, -BOUNDARY),
      new THREE.Vector3(BOUNDARY, PLAYER_HEIGHT, BOUNDARY)
    );
  });

  return null;
}
