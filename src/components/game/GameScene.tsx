"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import { Canvas } from "@react-three/fiber";
import { CyberpunkWorld } from "./CyberpunkWorld";
import { PlayerController } from "./PlayerController";
import { PlayerCharacter } from "./PlayerCharacter";
import { InteractiveTerminal, TerminalId } from "./InteractiveTerminal";
import { HUD } from "./HUD";
import { InfoPanel } from "./InfoPanel";
import { TouchControls } from "./TouchControls";
import type { GitHubStats } from "@/lib/types";
import type * as THREE from "three";

interface GameSceneProps {
  stats: GitHubStats;
}

const TERMINALS: {
  id: TerminalId;
  position: [number, number, number];
  label: string;
  rotation: [number, number, number];
}[] = [
  { id: "about", position: [-8, 1.2, -5], label: "// about", rotation: [0, 0.3, 0] },
  { id: "projects", position: [8, 1.2, -8], label: "// projects", rotation: [0, -0.3, 0] },
  { id: "tech", position: [-6, 1.2, 5], label: "// tech_stack", rotation: [0, 0.5, 0] },
  { id: "contact", position: [6, 1.2, 5], label: "// contact", rotation: [0, -0.5, 0] },
  { id: "stats", position: [3, 1.2, -3], label: "// stats", rotation: [0, -0.2, 0] },
];

export default function GameScene({ stats }: GameSceneProps) {
  const [nearTerminal, setNearTerminal] = useState<TerminalId | null>(null);
  const [openPanel, setOpenPanel] = useState<TerminalId | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [isPortrait, setIsPortrait] = useState(false);
  const touchMoveRef = useRef({ x: 0, y: 0 });
  const touchLookRef = useRef({ dx: 0, dy: 0 });
  const playerRef = useRef<THREE.Group>(null);

  useEffect(() => {
    const check = () => {
      const hasTouchScreen = "ontouchstart" in window;
      const narrow = window.innerWidth < 1024;
      setIsMobile(hasTouchScreen && narrow);
      setIsPortrait(hasTouchScreen && window.innerHeight > window.innerWidth);
    };
    check();
    window.addEventListener("resize", check);
    window.addEventListener("orientationchange", check);
    return () => {
      window.removeEventListener("resize", check);
      window.removeEventListener("orientationchange", check);
    };
  }, []);

  const handleProximity = useCallback((id: TerminalId | null) => {
    setNearTerminal(id);
  }, []);

  const handleInteract = useCallback(() => {
    if (nearTerminal && !openPanel) {
      setOpenPanel(nearTerminal);
    }
  }, [nearTerminal, openPanel]);

  const handleClosePanel = useCallback(() => {
    setOpenPanel(null);
  }, []);

  const handleTouchMove = useCallback((x: number, y: number) => {
    touchMoveRef.current = { x, y };
  }, []);

  const handleTouchLook = useCallback((dx: number, dy: number) => {
    touchLookRef.current = {
      dx: touchLookRef.current.dx + dx,
      dy: touchLookRef.current.dy + dy,
    };
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === "KeyE" && nearTerminal && !openPanel) {
        handleInteract();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [nearTerminal, openPanel, handleInteract]);

  // Landscape-only overlay for mobile portrait
  if (isMobile && isPortrait) {
    return (
      <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[var(--bg-deep)]">
        <div className="rotate-landscape-icon mb-6 text-5xl text-[var(--accent)]">
          ⟳
        </div>
        <p className="font-[family-name:var(--font-mono)] text-sm font-bold text-white">
          Rotate your device
        </p>
        <p className="mt-2 max-w-xs text-center font-[family-name:var(--font-mono)] text-xs text-[var(--text-secondary)]">
          This experience is best in landscape mode. Please rotate your phone sideways.
        </p>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 touch-none">
      <Canvas
        camera={{
          fov: 60,
          near: 0.1,
          far: 200,
          position: [0, 4, 14],
        }}
        gl={{ antialias: true, alpha: false }}
        style={{ background: "#0a0a0c" }}
      >
        <CyberpunkWorld />
        <PlayerCharacter playerRef={playerRef} />
        <PlayerController
          isPanelOpen={openPanel !== null}
          touchMoveRef={touchMoveRef}
          touchLookRef={touchLookRef}
          playerRef={playerRef}
        />
        {TERMINALS.map((t) => (
          <InteractiveTerminal
            key={t.id}
            id={t.id}
            position={t.position}
            label={t.label}
            rotation={t.rotation}
            onProximity={handleProximity}
            activeTerminal={nearTerminal}
            playerRef={playerRef}
          />
        ))}
      </Canvas>

      <HUD
        nearTerminal={nearTerminal}
        isPanelOpen={openPanel !== null}
        isMobile={isMobile}
      />

      {isMobile && (
        <TouchControls
          nearTerminal={nearTerminal}
          onInteract={handleInteract}
          onMoveInput={handleTouchMove}
          onLookInput={handleTouchLook}
          isPanelOpen={openPanel !== null}
        />
      )}

      {openPanel && (
        <InfoPanel
          terminalId={openPanel}
          stats={stats}
          onClose={handleClosePanel}
        />
      )}
    </div>
  );
}
