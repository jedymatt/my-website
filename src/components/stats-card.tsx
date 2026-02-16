import { GitHubStats } from "@/lib/types";
import { BentoCard } from "./bento-card";

interface StatsCardProps {
  stats: GitHubStats;
  style?: React.CSSProperties;
}

export function StatsCard({ stats, style }: StatsCardProps) {
  const statItems = [
    { label: "repos", value: stats.user.public_repos },
    { label: "stars", value: stats.totalStars },
    { label: "followers", value: stats.user.followers },
  ];

  return (
    <BentoCard
      className="animate-fade-in-up lg:row-span-2 flex flex-col justify-between"
      style={style}
    >
      <div>
        <p className="font-[family-name:var(--font-mono)] text-xs uppercase tracking-[0.2em] text-[var(--text-accent)]">
          // stats
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
    </BentoCard>
  );
}
