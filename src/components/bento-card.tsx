import { ReactNode } from "react";

interface BentoCardProps {
  children: ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

export function BentoCard({ children, className = "", style }: BentoCardProps) {
  return (
    <div
      className={`card-noise relative rounded-[4px] border border-[var(--border)] bg-[var(--bg-card)] p-6 transition-all duration-300 hover:border-[var(--border-glow)] hover:shadow-[0_0_24px_var(--accent-dim)] ${className}`}
      style={style}
    >
      {children}
    </div>
  );
}
