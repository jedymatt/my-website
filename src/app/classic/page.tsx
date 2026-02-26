import { AboutCard } from "@/components/about-card";
import { ContactCard } from "@/components/contact-card";
import { HeroCard } from "@/components/hero-card";
import { ProjectCard } from "@/components/project-card";
import { StatsCard } from "@/components/stats-card";
import { TechCard } from "@/components/tech-card";
import { fetchGitHubStats } from "@/lib/github";
import { featuredProjects } from "@/lib/projects";
import Link from "next/link";

export default async function ClassicPage() {
  const stats = await fetchGitHubStats();

  return (
    <main className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="mb-6 flex justify-end">
        <Link
          href="/"
          className="font-[family-name:var(--font-mono)] text-xs text-[var(--text-accent)] transition-colors hover:text-white"
        >
          [enter 3D world →]
        </Link>
      </div>
      <div className="grid grid-cols-1 gap-[3px] sm:grid-cols-2 lg:grid-cols-4 lg:grid-rows-[minmax(200px,auto)_minmax(180px,auto)_minmax(180px,auto)]">
        <HeroCard style={{ animationDelay: "0ms" }} />
        <StatsCard stats={stats} style={{ animationDelay: "80ms" }} />

        <AboutCard style={{ animationDelay: "160ms" }} />
        <TechCard style={{ animationDelay: "240ms" }} />
        <ProjectCard
          project={featuredProjects[0]}
          repo={stats.repos.find(
            (r) => r.name === featuredProjects[0].repoName
          )}
          style={{ animationDelay: "320ms" }}
        />

        <ProjectCard
          project={featuredProjects[2]}
          repo={stats.repos.find(
            (r) => r.name === featuredProjects[2].repoName
          )}
          className="sm:col-span-2"
          style={{ animationDelay: "400ms" }}
        />
        <ProjectCard
          project={featuredProjects[1]}
          repo={stats.repos.find(
            (r) => r.name === featuredProjects[1].repoName
          )}
          style={{ animationDelay: "480ms" }}
        />
        <ContactCard style={{ animationDelay: "560ms" }} />
      </div>
    </main>
  );
}
