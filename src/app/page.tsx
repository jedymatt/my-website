import { fetchGitHubStats } from "@/lib/github";
import { GameClient } from "./game-client";

export default async function Home() {
  const stats = await fetchGitHubStats();

  return <GameClient stats={stats} />;
}
