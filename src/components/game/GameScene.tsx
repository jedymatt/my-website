"use client";

import { useState, useCallback, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import { CyberpunkWorld } from "./CyberpunkWorld";
import { PlayerController } from "./PlayerController";
import { InteractiveTerminal, TerminalId } from "./InteractiveTerminal";
import { HUD } from "./HUD";
import { InfoPanel } from "./InfoPanel";
import type { GitHubStats } from "@/lib/types";

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

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === "KeyE" && nearTerminal && !openPanel) {
        handleInteract();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [nearTerminal, openPanel, handleInteract]);

  return (
    <div className="fixed inset-0">
      <Canvas
        camera={{
          fov: 75,
          near: 0.1,
          far: 200,
          position: [0, 1.6, 8],
        }}
        gl={{ antialias: true, alpha: false }}
        style={{ background: "#0a0a0c" }}
      >
        <CyberpunkWorld />
        <PlayerController isPanelOpen={openPanel !== null} />
        {TERMINALS.map((t) => (
          <InteractiveTerminal
            key={t.id}
            id={t.id}
            position={t.position}
            label={t.label}
            rotation={t.rotation}
            onProximity={handleProximity}
            activeTerminal={nearTerminal}
          />
        ))}
      </Canvas>

      <HUD nearTerminal={nearTerminal} isPanelOpen={openPanel !== null} />

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
