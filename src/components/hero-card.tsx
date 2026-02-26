import { BentoCard } from "./bento-card";

interface HeroCardProps {
  style?: React.CSSProperties;
}

export function HeroCard({ style }: HeroCardProps) {
  return (
    <BentoCard
      className="animate-fade-in-up sm:col-span-2 lg:col-span-3 lg:row-span-1 flex flex-col justify-end"
      style={style}
    >
      <div>
        <p className="font-[family-name:var(--font-mono)] text-xs uppercase tracking-[0.2em] text-[var(--text-accent)]">
          {"// hello world"}
        </p>
        <h1 className="mt-3 font-[family-name:var(--font-mono)] text-4xl font-bold uppercase tracking-tight text-white sm:text-5xl">
          Jedy Matt Tabasco
        </h1>
        <p className="mt-3 text-lg text-[var(--text-secondary)]">
          Software Engineer
          <span className="animate-blink ml-1 text-[var(--text-accent)]">
            ▊
          </span>
        </p>
        <p className="mt-2 max-w-lg text-sm text-[var(--text-secondary)]">
          I build web and mobile applications with Laravel, Flutter, Next.js, and
          more. I enjoy solving problems and shipping useful tools.
        </p>
      </div>
    </BentoCard>
  );
}
