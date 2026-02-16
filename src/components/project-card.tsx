import { FeaturedProject } from "@/lib/projects";
import { GitHubRepo } from "@/lib/types";
import { BentoCard } from "./bento-card";

interface ProjectCardProps {
  project: FeaturedProject;
  repo?: GitHubRepo;
  className?: string;
  style?: React.CSSProperties;
}

export function ProjectCard({
  project,
  repo,
  className,
  style,
}: ProjectCardProps) {
  return (
    <BentoCard
      className={`animate-fade-in-up flex flex-col justify-between ${className ?? ""}`}
      style={style}
    >
      <div>
        <p className="font-[family-name:var(--font-mono)] text-xs uppercase tracking-[0.2em] text-[var(--text-accent)]">
          // project
        </p>
        <div className="mt-2 flex items-baseline justify-between">
          <h2 className="font-[family-name:var(--font-mono)] text-sm font-bold text-white">
            {project.title}
          </h2>
          {repo && repo.stargazers_count > 0 && (
            <span className="font-[family-name:var(--font-mono)] text-xs text-[var(--text-secondary)]">
              ★ {repo.stargazers_count}
            </span>
          )}
        </div>
        <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-[var(--text-secondary)]">
          {project.description}
        </p>
        <p className="mt-2 font-[family-name:var(--font-mono)] text-xs text-[var(--text-secondary)]">
          {project.tags.join(" · ")}
        </p>
      </div>
      <div className="mt-4 flex gap-4">
        <a
          href={
            repo?.html_url ??
            `https://github.com/jedymatt/${project.repoName}`
          }
          target="_blank"
          rel="noopener noreferrer"
          className="font-[family-name:var(--font-mono)] text-xs text-[var(--text-accent)] transition-transform hover:translate-x-0.5"
        >
          code →
        </a>
        {project.liveUrl && (
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="font-[family-name:var(--font-mono)] text-xs text-[var(--text-accent)] transition-transform hover:translate-x-0.5"
          >
            live →
          </a>
        )}
      </div>
    </BentoCard>
  );
}
