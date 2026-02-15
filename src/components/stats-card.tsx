import { GitHubStats } from "@/lib/types";
import { BentoCard } from "./bento-card";

interface StatsCardProps {
  stats: GitHubStats;
}

export function StatsCard({ stats }: StatsCardProps) {
  return (
    <BentoCard className="flex flex-col justify-between">
      <h2 className="text-sm font-medium text-neutral-400">GitHub</h2>
      <div className="mt-4 grid grid-cols-3 gap-4">
        <div>
          <p className="text-2xl font-bold text-white">
            {stats.user.public_repos}
          </p>
          <p className="text-xs text-neutral-500">Repos</p>
        </div>
        <div>
          <p className="text-2xl font-bold text-white">{stats.totalStars}</p>
          <p className="text-xs text-neutral-500">Stars</p>
        </div>
        <div>
          <p className="text-2xl font-bold text-white">
            {stats.user.followers}
          </p>
          <p className="text-xs text-neutral-500">Followers</p>
        </div>
      </div>
      <div className="mt-4">
        <p className="text-xs text-neutral-500">Top Languages</p>
        <div className="mt-2 flex flex-wrap gap-1.5">
          {stats.topLanguages.slice(0, 6).map((lang) => (
            <span
              key={lang.name}
              className="rounded-full bg-neutral-800 px-2.5 py-0.5 text-xs text-neutral-300"
            >
              {lang.name}
            </span>
          ))}
        </div>
      </div>
    </BentoCard>
  );
}
