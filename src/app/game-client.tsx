"use client";

import dynamic from "next/dynamic";
import { useState, useEffect } from "react";
import type { GitHubStats } from "@/lib/types";

const GameScene = dynamic(() => import("@/components/game/GameScene"), {
  ssr: false,
});

interface GameClientProps {
  stats: GitHubStats;
}

function LoadingScreen({ onReady }: { onReady: () => void }) {
  const [lines, setLines] = useState<string[]>([]);
  const [done, setDone] = useState(false);

  useEffect(() => {
    const messages = [
      "> Initializing system...",
      "> Loading environment...",
      "> Compiling shaders...",
      "> Spawning terminals...",
      "> System ready.",
    ];

    let i = 0;
    const interval = setInterval(() => {
      if (i < messages.length) {
        setLines((prev) => [...prev, messages[i]]);
        i++;
      } else {
        clearInterval(interval);
        setDone(true);
        setTimeout(onReady, 600);
      }
    }, 400);

    return () => clearInterval(interval);
  }, [onReady]);

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[var(--bg-deep)]">
      <div className="w-full max-w-md px-8">
        <h1 className="mb-6 font-[family-name:var(--font-mono)] text-lg font-bold uppercase tracking-widest text-white">
          Jedy Matt Tabasco
        </h1>
        <div className="space-y-1.5">
          {lines.map((line, i) => (
            <p
              key={i}
              className="animate-fade-in-up font-[family-name:var(--font-mono)] text-xs text-[var(--accent)]"
            >
              {line}
            </p>
          ))}
        </div>
        {done && (
          <p className="mt-6 animate-fade-in-up font-[family-name:var(--font-mono)] text-xs text-[var(--text-secondary)]">
            Entering world...
          </p>
        )}
        {!done && (
          <div className="mt-6 h-0.5 w-full overflow-hidden rounded bg-[var(--border)]">
            <div className="loading-bar h-full bg-[var(--accent)]" />
          </div>
        )}
      </div>
    </div>
  );
}

export function GameClient({ stats }: GameClientProps) {
  const [showLoading, setShowLoading] = useState(true);
  const [gameReady, setGameReady] = useState(false);

  return (
    <>
      {showLoading && (
        <LoadingScreen
          onReady={() => {
            setGameReady(true);
            setTimeout(() => setShowLoading(false), 500);
          }}
        />
      )}
      <div
        className={`transition-opacity duration-500 ${
          gameReady ? "opacity-100" : "opacity-0"
        }`}
      >
        <GameScene stats={stats} />
      </div>
    </>
  );
}
