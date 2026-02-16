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

interface TechCardProps {
  style?: React.CSSProperties;
}

export function TechCard({ style }: TechCardProps) {
  return (
    <BentoCard className="animate-fade-in-up" style={style}>
      <p className="font-[family-name:var(--font-mono)] text-xs uppercase tracking-[0.2em] text-[var(--text-accent)]">
        // stack
      </p>
      <div className="mt-3 flex flex-col gap-1">
        {technologies.map((tech) => (
          <span
            key={tech}
            className="font-[family-name:var(--font-mono)] text-xs text-[var(--text-primary)]"
          >
            <span className="text-[var(--text-accent)]">&gt;</span> {tech}
          </span>
        ))}
      </div>
    </BentoCard>
  );
}
