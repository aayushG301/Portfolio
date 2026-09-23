import { Section } from "@/components/common/Section";
import { Reveal } from "@/components/common/Reveal";
import { Link } from "@/lib/navigation";
import { SocialIcon } from "@/components/common/Icon";
import { professionalLinks } from "@/data/links";
import { profile } from "@/data/profile";

export function Contact() {
  return (
    <Section id="contact" index="06" title="Get in touch">
      <Reveal>
        <p className="max-w-prose text-lead text-muted">
          I&apos;m looking for software engineering internships, and I&apos;m always happy to talk
          about backend architecture or review something you&apos;re building.
        </p>

        <a
          href={`mailto:${profile.email}`}
          className="mt-8 inline-block font-display text-h2 text-ink link-underline"
        >
          {profile.email}
        </a>

        <div className="mt-10 flex flex-wrap items-center gap-3">
          {professionalLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="inline-flex items-center gap-2 rounded-soft border border-line px-3 py-2 text-meta text-ink transition-colors hover:border-accent hover:text-accent"
            >
              <SocialIcon name={link.icon} className="h-4 w-4" />
              {link.label}
            </Link>
          ))}

          <Link href="/links" className="text-meta text-muted link-underline">
            See all my links
          </Link>
        </div>
      </Reveal>
    </Section>
  );
}
