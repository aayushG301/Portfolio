import { Section } from "@/components/common/Section";
import { ButtonLink } from "@/components/common/Button";
import { usePageMeta } from "@/lib/seo";

export default function NotFound() {
  usePageMeta({ title: "Page not found" });

  return (
    <Section title="This page doesn't exist" className="pt-16">
      <p className="max-w-prose text-muted">
        The link may be out of date, or the page may have been renamed.
      </p>

      <ButtonLink href="/" className="mt-6">
        Back to home
      </ButtonLink>
    </Section>
  );
}
