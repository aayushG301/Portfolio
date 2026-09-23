import { Section } from "@/components/common/Section";
import { Chip } from "@/components/common/Chip";
import { Reveal } from "@/components/common/Reveal";
import { profile } from "@/data/profile";

export function About() {
  return (
    <Section id="about" index="01" title="About">
      <div className="grid gap-10 lg:grid-cols-[1.4fr_1fr]">
        <Reveal className="max-w-prose space-y-4 text-muted">
          {profile.about.map((paragraph) => (
            <p key={paragraph.slice(0, 24)}>{paragraph}</p>
          ))}
        </Reveal>

        <Reveal delay={0.1} className="space-y-6">
          <div>
            <p className="font-mono text-micro text-muted">Education</p>
            <p className="mt-2 font-medium text-ink">{profile.education.institution}</p>
            <p className="text-meta text-muted">{profile.education.degree}</p>
            <p className="text-meta text-muted">{profile.education.period}</p>
          </div>

          <div>
            <p className="font-mono text-micro text-muted">Currently exploring</p>
            <div className="mt-2 flex flex-wrap gap-1.5">
              {profile.currentlyExploring.map((item) => (
                <Chip key={item}>{item}</Chip>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
