import { GitHubRepo, GitHubStats, GitHubUser } from "./types";

const GITHUB_USERNAME = "jedymatt";
const GITHUB_API = "https://api.github.com";

const fallbackUser: GitHubUser = {
  login: GITHUB_USERNAME,
  name: "Jedy Matt Tabasco",
  bio: "Software Engineer",
  avatar_url: "",
  html_url: `https://github.com/${GITHUB_USERNAME}`,
  public_repos: 50,
  followers: 19,
};

export async function fetchGitHubStats(): Promise<GitHubStats> {
  try {
    const [userRes, reposRes] = await Promise.all([
      fetch(`${GITHUB_API}/users/${GITHUB_USERNAME}`, {
        next: { revalidate: 3600 },
      }),
      fetch(
        `${GITHUB_API}/users/${GITHUB_USERNAME}/repos?per_page=100&sort=updated`,
        { next: { revalidate: 3600 } }
      ),
    ]);

    if (!userRes.ok || !reposRes.ok) {
      console.error("GitHub API error:", userRes.status, reposRes.status);
      return { user: fallbackUser, totalStars: 0, topLanguages: [], repos: [] };
    }

    const user = (await userRes.json()) as GitHubUser;
    const repos = (await reposRes.json()) as GitHubRepo[];

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
  } catch (error) {
    console.error("Failed to fetch GitHub stats:", error);
    return { user: fallbackUser, totalStars: 0, topLanguages: [], repos: [] };
  }
}
