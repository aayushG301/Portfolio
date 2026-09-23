import { cn } from "@/lib/cn";
import { Container } from "./Container";

interface SectionProps {
  id?: string;
  /** Short label shown on the rail. Sentence case, not all caps. */
  index?: string;
  title?: string;
  intro?: string;
  children: React.ReactNode;
  className?: string;
}

/**
 * The page's structural unit. The hairline rail on the left is the site's one
 * recurring motif — it marks where each section starts, like a schematic.
 */
export function Section({ id, index, title, intro, children, className }: SectionProps) {
  return (
    <section id={id} className={cn("relative scroll-mt-24 py-16 sm:py-24", className)}>
      <Container>
        <div className="relative sm:pl-10">
          <span aria-hidden className="rail hidden sm:block" />
          <span aria-hidden className="rail-node hidden sm:block" style={{ top: "0.55rem" }} />

          {(title || index) && (
            <header className="mb-10 max-w-prose">
              {index && (
                <span className="mb-2 block font-mono text-micro text-accent">{index}</span>
              )}
              {title && <h2 className="text-h2">{title}</h2>}
              {intro && <p className="mt-3 text-muted text-lead">{intro}</p>}
            </header>
          )}

          {children}
        </div>
      </Container>
    </section>
  );
}
