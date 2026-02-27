"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import type { TerminalId } from "./InteractiveTerminal";

interface HUDProps {
  nearTerminal: TerminalId | null;
  isPanelOpen: boolean;
  isMobile: boolean;
}

const TERMINAL_LABELS: Record<TerminalId, string> = {
  about: "about",
  projects: "projects",
  tech: "tech_stack",
  contact: "contact",
  stats: "stats",
};

export function HUD({ nearTerminal, isPanelOpen, isMobile }: HUDProps) {
  const [showControls, setShowControls] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setShowControls(false), 6000);
    return () => clearTimeout(timer);
  }, []);

  if (isPanelOpen) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-10">
      {/* Click to start prompt - desktop only */}
      {!isMobile && (
        <div className="absolute left-1/2 top-[35%] -translate-x-1/2 text-center">
          <p className="font-[family-name:var(--font-mono)] text-sm text-[var(--text-secondary)] opacity-60">
            click to orbit camera
          </p>
        </div>
      )}

      {/* Interaction prompt - desktop only (mobile has its own button) */}
      {!isMobile && nearTerminal && (
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

      {/* Mobile interaction prompt - shown above touch controls */}
      {isMobile && nearTerminal && (
        <div className="absolute bottom-36 left-1/2 -translate-x-1/2 text-center">
          <div className="rounded border border-[var(--accent)] bg-[var(--bg-card)] px-3 py-1.5">
            <p className="font-[family-name:var(--font-mono)] text-xs text-[var(--accent)]">
              {"// "}
              {TERMINAL_LABELS[nearTerminal]}
            </p>
          </div>
        </div>
      )}

      {/* Controls hint - desktop */}
      <div
        className={`absolute bottom-6 left-6 transition-opacity duration-500 ${
          showControls ? "opacity-100" : "opacity-0 hover:opacity-100"
        } ${isMobile ? "hidden" : ""}`}
        onMouseEnter={() => setShowControls(true)}
        onMouseLeave={() => setShowControls(false)}
      >
        <div className="pointer-events-auto space-y-1 rounded border border-[var(--border)] bg-[var(--bg-card)] p-3">
          <p className="font-[family-name:var(--font-mono)] text-[10px] text-[var(--text-secondary)]">
            <span className="text-[var(--accent)]">WASD</span> move
          </p>
          <p className="font-[family-name:var(--font-mono)] text-[10px] text-[var(--text-secondary)]">
            <span className="text-[var(--accent)]">MOUSE</span> orbit
          </p>
          <p className="font-[family-name:var(--font-mono)] text-[10px] text-[var(--text-secondary)]">
            <span className="text-[var(--accent)]">E</span> interact
          </p>
        </div>
      </div>

      {/* Mobile hint - shown initially */}
      {isMobile && (
        <div
          className={`absolute bottom-6 right-6 transition-opacity duration-500 ${
            showControls ? "opacity-100" : "opacity-0"
          }`}
        >
          <div className="space-y-1 rounded border border-[var(--border)] bg-[var(--bg-card)] p-2.5">
            <p className="font-[family-name:var(--font-mono)] text-[10px] text-[var(--text-secondary)]">
              <span className="text-[var(--accent)]">LEFT</span> joystick: move
            </p>
            <p className="font-[family-name:var(--font-mono)] text-[10px] text-[var(--text-secondary)]">
              <span className="text-[var(--accent)]">RIGHT</span> swipe: orbit
            </p>
          </div>
        </div>
      )}

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
