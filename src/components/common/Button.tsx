import { cn } from "@/lib/cn";
import { Link } from "@/lib/navigation";

type Variant = "solid" | "outline" | "ghost";

interface ButtonProps {
  href: string;
  children: React.ReactNode;
  variant?: Variant;
  className?: string;
  onClick?: () => void;
}

const base =
  "inline-flex items-center justify-center gap-2 rounded-soft px-4 py-2 text-meta font-medium transition-colors duration-200";

const variants: Record<Variant, string> = {
  solid: "bg-accent text-paper hover:opacity-90",
  outline: "border border-line bg-surface text-ink hover:border-accent hover:text-accent",
  ghost: "text-muted hover:text-ink",
};

export function ButtonLink({ href, children, variant = "solid", className, onClick }: ButtonProps) {
  return (
    <Link href={href} className={cn(base, variants[variant], className)} onClick={onClick}>
      {children}
    </Link>
  );
}
