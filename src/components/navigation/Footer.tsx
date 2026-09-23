import { Container } from "@/components/common/Container";
import { Link } from "@/lib/navigation";
import { profile } from "@/data/profile";

export function Footer() {
  return (
    <footer className="border-t border-line py-10">
      <Container className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-meta text-muted">
          {profile.name} — Portfolio 
        </p>

        <Link href="/links" className="text-meta font-medium text-accent link-underline">
          All links
        </Link>
      </Container>
    </footer>
  );
}
