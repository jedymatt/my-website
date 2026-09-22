export interface FeaturedProject {
  slug: string;
  title: string;
  description: string;
  repoName: string;
  liveUrl?: string;
  tags: string[];
}

export const featuredProjects: FeaturedProject[] = [
  {
    slug: "sari-scan",
    title: "Sari Scan",
    description:
      "A barcode scanner app built for sari-sari store owners to quickly look up product prices and manage inventory.",
    repoName: "sari_scan",
    tags: ["Flutter", "Dart", "Mobile"],
  },
  {
    slug: "mystery-fruits-js",
    title: "Mystery Fruits",
    description:
      "A guessing game where you figure out 3 fruits in the correct order within 6 attempts.",
    repoName: "mystery-fruits-js",
    liveUrl: "https://mfjs.jedymatt.dev/",
    tags: ["Vue 3", "JavaScript", "Mini Game"],
  },
  {
    slug: "kadasahod",
    title: "Kada Sahod",
    description:
      "A bill tracker that lines up bills, subscriptions and BNPL installments against your pay cycle, so you know what's due before your next sahod lands.",
    repoName: "kadasahod",
    liveUrl: "https://kadasahod.com",
    tags: ["TypeScript", "Next.js", "Web App"],
  },
];
