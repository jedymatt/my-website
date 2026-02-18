import { BentoCard } from "./bento-card";

const links = [
  { label: "GitHub", href: "https://github.com/jedymatt" },
  { label: "LinkedIn", href: "https://linkedin.com/in/jedymatt" },
  { label: "Email", href: "mailto:hello@jedymatt.dev" },
];

interface ContactCardProps {
  className?: string;
  style?: React.CSSProperties;
}

export function ContactCard({ className, style }: ContactCardProps) {
  return (
    <BentoCard
      className={`animate-fade-in-up flex flex-col justify-between ${className ?? ""}`}
      style={style}
    >
      <p className="font-[family-name:var(--font-mono)] text-xs uppercase tracking-[0.2em] text-[var(--text-accent)]">
        // contact
      </p>
      <ul className="mt-3 space-y-1.5">
        {links.map((link) => (
          <li key={link.label}>
            <a
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center rounded-[2px] px-2 py-1 font-[family-name:var(--font-mono)] text-sm text-[var(--text-primary)] transition-colors hover:bg-[var(--accent)] hover:text-[var(--bg-deep)]"
            >
              <span className="mr-2 text-[var(--text-accent)] group-hover:text-[var(--bg-deep)]">
                $
              </span>
              {link.label}
            </a>
          </li>
        ))}
      </ul>
    </BentoCard>
  );
}
