import { Section } from "@/components/common/Section";
import { Reveal } from "@/components/common/Reveal";
import { achievements } from "@/data/achievements";

export function Achievements() {
  // No filler. If the data is empty, the section doesn't exist.
  if (achievements.length === 0) return null;

  return (
    <Section id="achievements" index="05" title="Highlights">
      <div className="grid gap-8 sm:grid-cols-2">
        {achievements.map((item, i) => (
          <Reveal key={item.title} delay={i * 0.06} className="border-t border-line pt-4">
            <div className="flex items-baseline justify-between gap-4">
              <h3 className="text-lead font-display font-semibold">{item.title}</h3>
              <span className="shrink-0 font-mono text-micro text-muted">{item.date}</span>
            </div>

            {item.organization && (
              <p className="mt-1 font-mono text-micro text-accent">{item.organization}</p>
            )}

            <p className="mt-2 max-w-prose text-meta text-muted">{item.description}</p>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
