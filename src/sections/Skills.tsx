import { Section } from "@/components/common/Section";
import { Chip } from "@/components/common/Chip";
import { Reveal } from "@/components/common/Reveal";
import { skills } from "@/data/skills";

export function Skills() {
  return (
    <Section id="skills" index="02" title="Skills">
      <dl className="grid gap-x-10 gap-y-8 sm:grid-cols-2">
        {skills.map((group, i) => (
          <Reveal key={group.category} delay={i * 0.05} className="border-t border-line pt-4">
            <dt className="font-mono text-micro text-accent">{group.category}</dt>
            <dd className="mt-3 flex flex-wrap gap-1.5">
              {group.items.map((item) => (
                <Chip key={item}>{item}</Chip>
              ))}
            </dd>
          </Reveal>
        ))}
      </dl>
    </Section>
  );
}
