"use client";

import { useRef, useCallback, useEffect, useState } from "react";
import type { TerminalId } from "./InteractiveTerminal";

interface TouchControlsProps {
  nearTerminal: TerminalId | null;
  onInteract: () => void;
  onMoveInput: (x: number, y: number) => void;
  onLookInput: (dx: number, dy: number) => void;
  isPanelOpen: boolean;
}

const JOYSTICK_SIZE = 120;
const KNOB_SIZE = 48;
const MAX_OFFSET = (JOYSTICK_SIZE - KNOB_SIZE) / 2;

export function TouchControls({
  nearTerminal,
  onInteract,
  onMoveInput,
  onLookInput,
  isPanelOpen,
}: TouchControlsProps) {
  const joystickRef = useRef<HTMLDivElement>(null);
  const joystickTouchIdRef = useRef<number | null>(null);
  const joystickOriginRef = useRef({ x: 0, y: 0 });
  const [knobOffset, setKnobOffset] = useState({ x: 0, y: 0 });
  const lookTouchIdRef = useRef<number | null>(null);
  const lastLookPosRef = useRef({ x: 0, y: 0 });

  const handleJoystickStart = useCallback(
    (e: React.TouchEvent) => {
      if (isPanelOpen) return;
      const touch = e.changedTouches[0];
      joystickTouchIdRef.current = touch.identifier;
      const rect = joystickRef.current?.getBoundingClientRect();
      if (rect) {
        joystickOriginRef.current = {
          x: rect.left + rect.width / 2,
          y: rect.top + rect.height / 2,
        };
      }
    },
    [isPanelOpen]
  );

  useEffect(() => {
    const handleTouchMove = (e: TouchEvent) => {
      for (let i = 0; i < e.changedTouches.length; i++) {
        const touch = e.changedTouches[i];

        if (touch.identifier === joystickTouchIdRef.current) {
          e.preventDefault();
          const dx = touch.clientX - joystickOriginRef.current.x;
          const dy = touch.clientY - joystickOriginRef.current.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const clampedDist = Math.min(dist, MAX_OFFSET);
          const angle = Math.atan2(dy, dx);
          const clampedX = Math.cos(angle) * clampedDist;
          const clampedY = Math.sin(angle) * clampedDist;
          setKnobOffset({ x: clampedX, y: clampedY });
          onMoveInput(clampedX / MAX_OFFSET, clampedY / MAX_OFFSET);
        }

        if (touch.identifier === lookTouchIdRef.current) {
          e.preventDefault();
          const dx = touch.clientX - lastLookPosRef.current.x;
          const dy = touch.clientY - lastLookPosRef.current.y;
          lastLookPosRef.current = { x: touch.clientX, y: touch.clientY };
          onLookInput(dx, dy);
        }
      }
    };

    const handleTouchEnd = (e: TouchEvent) => {
      for (let i = 0; i < e.changedTouches.length; i++) {
        const touch = e.changedTouches[i];

        if (touch.identifier === joystickTouchIdRef.current) {
          joystickTouchIdRef.current = null;
          setKnobOffset({ x: 0, y: 0 });
          onMoveInput(0, 0);
        }

        if (touch.identifier === lookTouchIdRef.current) {
          lookTouchIdRef.current = null;
        }
      }
    };

    window.addEventListener("touchmove", handleTouchMove, { passive: false });
    window.addEventListener("touchend", handleTouchEnd);
    window.addEventListener("touchcancel", handleTouchEnd);

    return () => {
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchend", handleTouchEnd);
      window.removeEventListener("touchcancel", handleTouchEnd);
    };
  }, [onMoveInput, onLookInput]);

  const handleLookAreaStart = useCallback(
    (e: React.TouchEvent) => {
      if (isPanelOpen) return;
      const touch = e.changedTouches[0];
      lookTouchIdRef.current = touch.identifier;
      lastLookPosRef.current = { x: touch.clientX, y: touch.clientY };
    },
    [isPanelOpen]
  );

  if (isPanelOpen) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-20 md:hidden">
      {/* Look area - right half of screen */}
      <div
        className="pointer-events-auto absolute inset-0 left-1/3"
        onTouchStart={handleLookAreaStart}
      />

      {/* Virtual joystick - bottom left */}
      <div className="pointer-events-auto absolute bottom-8 left-8">
        <div
          ref={joystickRef}
          className="relative flex items-center justify-center rounded-full border-2 border-[var(--accent)] bg-[var(--bg-card)]"
          style={{
            width: JOYSTICK_SIZE,
            height: JOYSTICK_SIZE,
            opacity: 0.7,
          }}
          onTouchStart={handleJoystickStart}
        >
          {/* Knob */}
          <div
            className="rounded-full bg-[var(--accent)]"
            style={{
              width: KNOB_SIZE,
              height: KNOB_SIZE,
              opacity: 0.8,
              transform: `translate(${knobOffset.x}px, ${knobOffset.y}px)`,
              transition:
                knobOffset.x === 0 && knobOffset.y === 0
                  ? "transform 0.15s ease-out"
                  : "none",
            }}
          />
        </div>
      </div>

      {/* Interact button - bottom center, only when near terminal */}
      {nearTerminal && (
        <div className="pointer-events-auto absolute bottom-10 left-1/2 -translate-x-1/2">
          <button
            className="game-interact-prompt rounded-lg border-2 border-[var(--accent)] bg-[var(--bg-card)] px-6 py-3 active:bg-[var(--accent)] active:text-[var(--bg-deep)]"
            onTouchStart={(e) => {
              e.stopPropagation();
              onInteract();
            }}
          >
            <span className="font-[family-name:var(--font-mono)] text-sm font-bold text-[var(--accent)]">
              INTERACT
            </span>
          </button>
        </div>
      )}
    </div>
  );
}
