"use client";

import { useEffect, useCallback } from "react";
import type { TerminalId } from "./InteractiveTerminal";
import type { GitHubStats } from "@/lib/types";
import { featuredProjects } from "@/lib/projects";

interface InfoPanelProps {
  terminalId: TerminalId;
  stats: GitHubStats;
  onClose: () => void;
}

function AboutContent() {
  return (
    <div>
      <p className="font-[family-name:var(--font-mono)] text-xs uppercase tracking-[0.2em] text-[var(--text-accent)]">
        {"// about"}
      </p>
      <p className="mt-4 text-sm leading-relaxed text-[var(--text-secondary)]">
        I&apos;m a software engineer from the Philippines who loves building
        tools that make people&apos;s lives easier. From mobile barcode scanners
        to bill reminder apps, I enjoy shipping products that solve real
        problems.
      </p>
      <p className="mt-3 text-sm leading-relaxed text-[var(--text-secondary)]">
        I build web and mobile applications with Laravel, Flutter, Next.js, and
        more. I enjoy solving problems and shipping useful tools.
      </p>
    </div>
  );
}

function ProjectsContent({ stats }: { stats: GitHubStats }) {
  return (
    <div>
      <p className="font-[family-name:var(--font-mono)] text-xs uppercase tracking-[0.2em] text-[var(--text-accent)]">
        {"// projects"}
      </p>
      <div className="mt-4 space-y-4">
        {featuredProjects.map((project) => {
          const repo = stats.repos.find((r) => r.name === project.repoName);
          return (
            <div key={project.slug} className="border-l-2 border-[var(--border)] pl-3">
              <div className="flex items-baseline justify-between">
                <h3 className="font-[family-name:var(--font-mono)] text-sm font-bold text-white">
                  {project.title}
                </h3>
                {repo && repo.stargazers_count > 0 && (
                  <span className="font-[family-name:var(--font-mono)] text-xs text-[var(--text-secondary)]">
                    ★ {repo.stargazers_count}
                  </span>
                )}
              </div>
              <p className="mt-1 text-sm text-[var(--text-secondary)]">
                {project.description}
              </p>
              <p className="mt-1 font-[family-name:var(--font-mono)] text-xs text-[var(--text-secondary)]">
                {project.tags.join(" · ")}
              </p>
              <div className="mt-2 flex gap-4">
                <a
                  href={repo?.html_url ?? `https://github.com/jedymatt/${project.repoName}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-[family-name:var(--font-mono)] text-xs text-[var(--text-accent)] hover:underline"
                >
                  code →
                </a>
                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-[family-name:var(--font-mono)] text-xs text-[var(--text-accent)] hover:underline"
                  >
                    live →
                  </a>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function TechContent() {
  const technologies = [
    "TypeScript", "PHP", "Dart", "Python", "Java",
    "Kotlin", "Laravel", "Next.js", "Flutter", "Vue",
  ];

  return (
    <div>
      <p className="font-[family-name:var(--font-mono)] text-xs uppercase tracking-[0.2em] text-[var(--text-accent)]">
        {"// stack"}
      </p>
      <div className="mt-4 flex flex-col gap-1.5">
        {technologies.map((tech) => (
          <span
            key={tech}
            className="font-[family-name:var(--font-mono)] text-sm text-[var(--text-primary)]"
          >
            <span className="text-[var(--text-accent)]">&gt;</span> {tech}
          </span>
        ))}
      </div>
    </div>
  );
}

function ContactContent() {
  const links = [
    { label: "GitHub", href: "https://github.com/jedymatt" },
    { label: "LinkedIn", href: "https://linkedin.com/in/jedymatt" },
    { label: "Email", href: "mailto:hello@jedymatt.dev" },
  ];

  return (
    <div>
      <p className="font-[family-name:var(--font-mono)] text-xs uppercase tracking-[0.2em] text-[var(--text-accent)]">
        {"// contact"}
      </p>
      <ul className="mt-4 space-y-2">
        {links.map((link) => (
          <li key={link.label}>
            <a
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center rounded-[2px] px-2 py-1.5 font-[family-name:var(--font-mono)] text-sm text-[var(--text-primary)] transition-colors hover:bg-[var(--accent)] hover:text-[var(--bg-deep)]"
            >
              <span className="mr-2 text-[var(--text-accent)] group-hover:text-[var(--bg-deep)]">
                $
              </span>
              {link.label}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

function StatsContent({ stats }: { stats: GitHubStats }) {
  const statItems = [
    { label: "repos", value: stats.user.public_repos },
    { label: "stars", value: stats.totalStars },
    { label: "followers", value: stats.user.followers },
  ];

  return (
    <div>
      <p className="font-[family-name:var(--font-mono)] text-xs uppercase tracking-[0.2em] text-[var(--text-accent)]">
        {"// stats"}
      </p>
      <div className="mt-4 space-y-2">
        {statItems.map((item) => (
          <div
            key={item.label}
            className="flex items-baseline justify-between font-[family-name:var(--font-mono)] text-sm"
          >
            <span className="text-[var(--text-secondary)]">{item.label}</span>
            <span className="mx-2 flex-1 border-b border-dashed border-[var(--border)]" />
            <span className="font-bold text-[var(--text-accent)]">
              {item.value}
            </span>
          </div>
        ))}
      </div>
      <div className="mt-4">
        <p className="font-[family-name:var(--font-mono)] text-xs text-[var(--text-secondary)]">
          languages
        </p>
        <div className="mt-2 space-y-1">
          {stats.topLanguages.slice(0, 6).map((lang) => (
            <span
              key={lang.name}
              className="mr-2 inline-block border-l-2 border-[var(--text-accent)] pl-2 font-[family-name:var(--font-mono)] text-xs text-[var(--text-primary)]"
            >
              {lang.name}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

const CONTENT_MAP: Record<TerminalId, React.FC<{ stats: GitHubStats }>> = {
  about: AboutContent,
  projects: ProjectsContent,
  tech: TechContent,
  contact: ContactContent,
  stats: StatsContent,
};

export function InfoPanel({ terminalId, stats, onClose }: InfoPanelProps) {
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.code === "Escape") {
        onClose();
      }
    },
    [onClose]
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  const Content = CONTENT_MAP[terminalId];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Panel */}
      <div className="animate-fade-in-up card-noise relative mx-4 w-full max-w-lg rounded-[4px] border border-[var(--border)] bg-[var(--bg-card)] p-6 shadow-[0_0_40px_var(--accent-dim)]">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute right-3 top-3 font-[family-name:var(--font-mono)] text-xs text-[var(--text-secondary)] transition-colors hover:text-[var(--accent)]"
        >
          [x] close
        </button>

        {/* Content */}
        <Content stats={stats} />

        {/* Footer */}
        <div className="mt-6 border-t border-[var(--border)] pt-3">
          <p className="font-[family-name:var(--font-mono)] text-[10px] text-[var(--text-secondary)]">
            Press <span className="text-[var(--accent)]">ESC</span> to close
          </p>
        </div>
      </div>
    </div>
  );
}
