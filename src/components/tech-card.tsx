import { BentoCard } from "./bento-card";

const technologies = [
  "TypeScript",
  "PHP",
  "Dart",
  "Python",
  "Java",
  "Kotlin",
  "Laravel",
  "Next.js",
  "Flutter",
  "Vue",
];

export function TechCard() {
  return (
    <BentoCard>
      <h2 className="text-sm font-medium text-neutral-400">Tech Stack</h2>
      <div className="mt-3 flex flex-wrap gap-2">
        {technologies.map((tech) => (
          <span
            key={tech}
            className="rounded-lg bg-neutral-800 px-3 py-1.5 text-xs font-medium text-neutral-200"
          >
            {tech}
          </span>
        ))}
      </div>
    </BentoCard>
  );
}
