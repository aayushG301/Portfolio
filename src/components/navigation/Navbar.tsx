import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { Link, useIsActivePath } from "@/lib/navigation";
import { Container } from "@/components/common/Container";
import { ThemeToggle } from "@/components/common/ThemeToggle";
import { cn } from "@/lib/cn";
import { profile } from "@/data/profile";

const links = [
  { label: "About", href: "/#about" },
  { label: "Skills", href: "/#skills" },
  { label: "Projects", href: "/projects" },
  { label: "Experience", href: "/#experience" },
  { label: "Links", href: "/links" },
  { label: "Contact", href: "/#contact" },
];

function NavItem({
  href,
  children,
  onClick,
  className,
}: {
  href: string;
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
}) {
  // Only real routes (no "#") have a meaningful "active" state.
  const isRoute = !href.includes("#");
  const isActive = useIsActivePath(isRoute ? href : "__none__");

  return (
    <Link
      href={href}
      onClick={onClick}
      className={cn(
        "transition-colors",
        isActive ? "text-ink font-medium" : "text-muted hover:text-ink",
        className,
      )}
    >
      {children}
    </Link>
  );
}

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={
        "sticky top-0 z-50 bg-paper/85 backdrop-blur transition-colors " +
        (scrolled ? "border-b border-line" : "border-b border-transparent")
      }
    >
      <Container className="flex h-16 items-center justify-between gap-6">
        <Link
          href="/"
          className="flex items-center gap-2 font-display text-lead font-semibold tracking-tight"
        >
          <img
            src="/image.jpg"
            alt=""
            className="h-8 w-8 rounded-full border border-line object-cover"
            aria-hidden="true"
          />
          <span>{profile.name}</span>
        </Link>

        <nav className="hidden items-center gap-6 md:flex" aria-label="Main">
          {links.map((link) => (
            <NavItem key={link.href} href={link.href} className="text-meta">
              {link.label}
            </NavItem>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <ThemeToggle />

          <button
            type="button"
            className="rounded-soft border border-line p-2 text-muted md:hidden"
            aria-expanded={open}
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </Container>

      {open && (
        <nav className="border-t border-line md:hidden" aria-label="Mobile">
          <Container className="flex flex-col py-2">
            {links.map((link) => (
              <NavItem
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="py-2.5 text-meta"
              >
                {link.label}
              </NavItem>
            ))}
          </Container>
        </nav>
      )}
    </header>
  );
}
