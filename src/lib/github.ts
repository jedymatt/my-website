import { GitHubRepo, GitHubStats, GitHubUser } from "./types";

const GITHUB_USERNAME = "jedymatt";
const GITHUB_API = "https://api.github.com";

export async function fetchGitHubStats(): Promise<GitHubStats> {
  const [user, repos] = await Promise.all([
    fetch(`${GITHUB_API}/users/${GITHUB_USERNAME}`, {
      next: { revalidate: 3600 },
    }).then((res) => res.json() as Promise<GitHubUser>),
    fetch(
      `${GITHUB_API}/users/${GITHUB_USERNAME}/repos?per_page=100&sort=updated`,
      { next: { revalidate: 3600 } }
    ).then((res) => res.json() as Promise<GitHubRepo[]>),
  ]);

  const totalStars = repos.reduce(
    (sum, repo) => sum + repo.stargazers_count,
    0
  );

  const langMap = new Map<string, number>();
  for (const repo of repos) {
    if (repo.language) {
      langMap.set(repo.language, (langMap.get(repo.language) || 0) + 1);
    }
  }
  const topLanguages = Array.from(langMap.entries())
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 8);

  return { user, totalStars, topLanguages, repos };
}
