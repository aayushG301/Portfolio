import { Section } from "@/components/common/Section";
import { LinkRow } from "@/components/common/LinkRow";
import { codingProfiles, professionalLinks, contactLinks, resumeLink } from "@/data/links";
import { usePageMeta } from "@/lib/seo";
import { profile } from "@/data/profile";

function Group({ label, links }: { label: string; links: typeof codingProfiles }) {
  return (
    <div>
      <p className="font-mono text-micro text-accent">{label}</p>
      <div className="mt-3">
        {links.map((link) => (
          <LinkRow key={link.label} link={link} />
        ))}
      </div>
    </div>
  );
}

export default function LinksPage() {
  usePageMeta({
    title: `Links — ${profile.name}`,
    description: "Every place to find code, contest history and contact details for Aayush Garg.",
  });

  return (
    <Section
      title="Links"
      intro="Everything in one place — code and contest history, the resume, and how to reach me."
      className="pt-12"
    >
      <div className="max-w-xl space-y-10">
        <Group label="Proof of work" links={codingProfiles} />
        <Group label="Professional" links={professionalLinks} />
        <Group label="Resume" links={[resumeLink]} />
        <Group label="Contact" links={contactLinks} />
      </div>
    </Section>
  );
}
