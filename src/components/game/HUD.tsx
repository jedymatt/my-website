"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import type { TerminalId } from "./InteractiveTerminal";

interface HUDProps {
  nearTerminal: TerminalId | null;
  isPanelOpen: boolean;
}

const TERMINAL_LABELS: Record<TerminalId, string> = {
  about: "about",
  projects: "projects",
  tech: "tech_stack",
  contact: "contact",
  stats: "stats",
};

export function HUD({ nearTerminal, isPanelOpen }: HUDProps) {
  const [showControls, setShowControls] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setShowControls(false), 6000);
    return () => clearTimeout(timer);
  }, []);

  if (isPanelOpen) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-10">
      {/* Crosshair */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
        <div className="h-1 w-1 rounded-full bg-[var(--accent)] opacity-70" />
      </div>

      {/* Click to start prompt */}
      <div className="absolute left-1/2 top-[35%] -translate-x-1/2 text-center">
        <p className="font-[family-name:var(--font-mono)] text-sm text-[var(--text-secondary)] opacity-60">
          click to look around
        </p>
      </div>

      {/* Interaction prompt */}
      {nearTerminal && (
        <div className="absolute bottom-24 left-1/2 -translate-x-1/2 text-center">
          <div className="game-interact-prompt rounded border border-[var(--accent)] bg-[var(--bg-card)] px-4 py-2">
            <p className="font-[family-name:var(--font-mono)] text-sm text-[var(--accent)]">
              Press [E] to open{" "}
              <span className="text-white">
                {"// "}
                {TERMINAL_LABELS[nearTerminal]}
              </span>
            </p>
          </div>
        </div>
      )}

      {/* Controls hint */}
      <div
        className={`absolute bottom-6 left-6 transition-opacity duration-500 ${
          showControls ? "opacity-100" : "opacity-0 hover:opacity-100"
        }`}
        onMouseEnter={() => setShowControls(true)}
        onMouseLeave={() => setShowControls(false)}
      >
        <div className="pointer-events-auto space-y-1 rounded border border-[var(--border)] bg-[var(--bg-card)] p-3">
          <p className="font-[family-name:var(--font-mono)] text-[10px] text-[var(--text-secondary)]">
            <span className="text-[var(--accent)]">WASD</span> move
          </p>
          <p className="font-[family-name:var(--font-mono)] text-[10px] text-[var(--text-secondary)]">
            <span className="text-[var(--accent)]">MOUSE</span> look
          </p>
          <p className="font-[family-name:var(--font-mono)] text-[10px] text-[var(--text-secondary)]">
            <span className="text-[var(--accent)]">E</span> interact
          </p>
          <p className="font-[family-name:var(--font-mono)] text-[10px] text-[var(--text-secondary)]">
            <span className="text-[var(--accent)]">ESC</span> release cursor
          </p>
        </div>
      </div>

      {/* Classic portfolio link */}
      <div className="absolute right-6 top-6 pointer-events-auto">
        <Link
          href="/classic"
          className="rounded border border-[var(--border)] bg-[var(--bg-card)] px-3 py-1.5 font-[family-name:var(--font-mono)] text-[10px] text-[var(--text-accent)] transition-colors hover:border-[var(--accent)] hover:bg-[var(--bg-card-hover)]"
        >
          [classic view →]
        </Link>
      </div>

      {/* Name badge */}
      <div className="absolute left-6 top-6">
        <p className="font-[family-name:var(--font-mono)] text-xs font-bold uppercase tracking-widest text-white">
          Jedy Matt Tabasco
        </p>
        <p className="font-[family-name:var(--font-mono)] text-[10px] text-[var(--text-secondary)]">
          Software Engineer
          <span className="animate-blink ml-1 text-[var(--accent)]">▊</span>
        </p>
      </div>
    </div>
  );
}
