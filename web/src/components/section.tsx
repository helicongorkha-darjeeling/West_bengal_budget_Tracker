import type { ReactNode } from "react";

interface SectionProps {
  id: string;
  eyebrow?: string;
  title: string;
  description?: ReactNode;
  children: ReactNode;
}

/** A page section with an anchored id and an accessible heading. */
export function Section({ id, eyebrow, title, description, children }: SectionProps) {
  const titleId = `${id}-title`;
  return (
    <section id={id} aria-labelledby={titleId} className="border-t border-line py-12 sm:py-16">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          {eyebrow ? <p className="text-sm font-semibold text-accent">{eyebrow}</p> : null}
          <h2 id={titleId} className="mt-1.5 text-2xl font-semibold tracking-tight text-ink sm:text-3xl">
            {title}
          </h2>
          {description ? (
            <p className="mt-3 text-base leading-relaxed text-ink-2 sm:text-lg">{description}</p>
          ) : null}
        </div>
        <div className="mt-8">{children}</div>
      </div>
    </section>
  );
}
