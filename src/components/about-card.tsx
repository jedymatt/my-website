import { BentoCard } from "./bento-card";

interface AboutCardProps {
  style?: React.CSSProperties;
}

export function AboutCard({ style }: AboutCardProps) {
  return (
    <BentoCard className="animate-fade-in-up" style={style}>
      <p className="font-[family-name:var(--font-mono)] text-xs uppercase tracking-[0.2em] text-[var(--text-accent)]">
        // about
      </p>
      <p className="mt-3 text-sm leading-relaxed text-[var(--text-secondary)]">
        I&apos;m a software engineer from the Philippines who loves building
        tools that make people&apos;s lives easier. From mobile barcode scanners
        to bill reminder apps, I enjoy shipping products that solve real
        problems.
      </p>
    </BentoCard>
  );
}
