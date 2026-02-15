import { AboutCard } from "@/components/about-card";
import { ContactCard } from "@/components/contact-card";
import { HeroCard } from "@/components/hero-card";
import { ProjectCard } from "@/components/project-card";
import { StatsCard } from "@/components/stats-card";
import { TechCard } from "@/components/tech-card";
import { fetchGitHubStats } from "@/lib/github";
import { featuredProjects } from "@/lib/projects";

export default async function Home() {
  const stats = await fetchGitHubStats();

  return (
    <main className="mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="grid auto-rows-[minmax(180px,auto)] grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {/* Row 1 */}
        <HeroCard />
        <StatsCard stats={stats} />

        {/* Row 2 */}
        <AboutCard />
        <TechCard />
        <ProjectCard
          project={featuredProjects[0]}
          repo={stats.repos.find(
            (r) => r.name === featuredProjects[0].repoName
          )}
        />

        {/* Row 3 */}
        <ProjectCard
          project={featuredProjects[1]}
          repo={stats.repos.find(
            (r) => r.name === featuredProjects[1].repoName
          )}
          className="sm:col-span-2"
        />
        <ContactCard />
      </div>
    </main>
  );
}
