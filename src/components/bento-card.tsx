import { ReactNode } from "react";

interface BentoCardProps {
  children: ReactNode;
  className?: string;
}

export function BentoCard({ children, className = "" }: BentoCardProps) {
  return (
    <div
      className={`rounded-2xl border border-neutral-800 bg-neutral-900 p-6 transition-colors hover:border-neutral-700 ${className}`}
    >
      {children}
    </div>
  );
}
