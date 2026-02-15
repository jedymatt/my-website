import { BentoCard } from "./bento-card";

const links = [
  { label: "GitHub", href: "https://github.com/jedymatt" },
  { label: "LinkedIn", href: "https://linkedin.com/in/jedymatt" },
  { label: "Email", href: "mailto:hello@jedymatt.dev" },
];

export function ContactCard() {
  return (
    <BentoCard className="flex flex-col justify-between">
      <h2 className="text-sm font-medium text-neutral-400">Get in Touch</h2>
      <ul className="mt-3 space-y-2">
        {links.map((link) => (
          <li key={link.label}>
            <a
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-neutral-300 underline-offset-2 hover:text-white hover:underline"
            >
              {link.label} &rarr;
            </a>
          </li>
        ))}
      </ul>
    </BentoCard>
  );
}
