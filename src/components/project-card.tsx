import { FeaturedProject } from "@/lib/projects";
import { GitHubRepo } from "@/lib/types";
import { BentoCard } from "./bento-card";

interface ProjectCardProps {
  project: FeaturedProject;
  repo?: GitHubRepo;
  className?: string;
}

export function ProjectCard({ project, repo, className }: ProjectCardProps) {
  return (
    <BentoCard className={`flex flex-col justify-between ${className ?? ""}`}>
      <div>
        <div className="flex items-center justify-between">
          <h2 className="font-semibold text-white">{project.title}</h2>
          {repo && (
            <span className="text-xs text-neutral-500">
              {repo.stargazers_count} stars
            </span>
          )}
        </div>
        <p className="mt-2 text-sm leading-relaxed text-neutral-400">
          {project.description}
        </p>
      </div>
      <div className="mt-4 flex items-center justify-between">
        <div className="flex flex-wrap gap-1.5">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full bg-neutral-800 px-2 py-0.5 text-xs text-neutral-400"
            >
              {tag}
            </span>
          ))}
        </div>
        <div className="flex gap-3">
          <a
            href={repo?.html_url ?? `https://github.com/jedymatt/${project.repoName}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-neutral-400 underline-offset-2 hover:text-white hover:underline"
          >
            Code
          </a>
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-neutral-400 underline-offset-2 hover:text-white hover:underline"
            >
              Live
            </a>
          )}
        </div>
      </div>
    </BentoCard>
  );
}
