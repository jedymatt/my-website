import { BentoCard } from "./bento-card";

export function AboutCard() {
  return (
    <BentoCard>
      <h2 className="text-sm font-medium text-neutral-400">About</h2>
      <p className="mt-3 text-sm leading-relaxed text-neutral-300">
        I&apos;m a software engineer from the Philippines who loves building tools that make
        people&apos;s lives easier. From mobile barcode scanners to bill
        reminder apps, I enjoy shipping products that solve real problems.
      </p>
    </BentoCard>
  );
}
