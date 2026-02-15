import { BentoCard } from "./bento-card";

export function HeroCard() {
  return (
    <BentoCard className="sm:col-span-2 flex flex-col justify-end">
      <div className="animate-fade-in-up">
        <p className="text-sm font-medium text-neutral-400">Hey, I&apos;m</p>
        <h1 className="mt-1 text-4xl font-bold tracking-tight text-white sm:text-5xl">
          Jedy Matt Tabasco
        </h1>
        <p className="mt-3 text-lg text-neutral-300">
          Software Engineer from the Philippines
        </p>
        <p className="mt-2 max-w-md text-sm text-neutral-500">
          I build web and mobile applications with Laravel, Flutter, Next.js, and
          more. I enjoy solving problems and shipping useful tools.
        </p>
      </div>
    </BentoCard>
  );
}
