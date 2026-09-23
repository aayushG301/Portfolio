import { Section } from "@/components/common/Section";
import { Reveal } from "@/components/common/Reveal";
import { experience } from "@/data/experience";

export function Experience() {
  if (experience.length === 0) return null;

  return (
    <Section id="experience" index="04" title="Experience">
      <div className="space-y-10">
        {experience.map((entry, i) => (
          <Reveal
            key={entry.role}
            delay={i * 0.08}
            className="grid gap-2 border-t border-line pt-5 sm:grid-cols-[10rem_1fr] sm:gap-8"
          >
            <p className="font-mono text-micro text-muted">{entry.period}</p>

            <div>
              <h3 className="text-h3">{entry.role}</h3>
              <p className="mt-0.5 text-meta text-muted">{entry.organization}</p>

              <ul className="mt-3 max-w-prose space-y-1.5 text-meta text-muted">
                {entry.points.map((point) => (
                  <li key={point} className="relative pl-4">
                    <span
                      aria-hidden
                      className="absolute left-0 top-[0.6em] h-1 w-1 rounded-full bg-accent"
                    />
                    {point}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
