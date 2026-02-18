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
    slug: "remindmebills",
    title: "RemindMeBills",
    description:
      "A bill reminder application that helps users track and manage their upcoming payments and due dates.",
    repoName: "remindmebills",
    liveUrl: "https://remindmebills.com",
    tags: ["TypeScript", "Next.js", "Web App"],
  },
];
