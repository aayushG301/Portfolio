import { ArrowUpRight } from "lucide-react";
import type { SocialLink } from "@/types";
import { Link } from "@/lib/navigation";
import { SocialIcon } from "./Icon";

/**
 * One row per link: icon, label, what it's for, and an arrow that shows
 * whether it opens a new tab or a file. Used by the /links page.
 */
export function LinkRow({ link }: { link: SocialLink }) {
  return (
    <Link
      href={link.href}
      className="group flex items-center justify-between gap-4 border-t border-line py-4 first:border-t-0"
    >
      <div className="flex min-w-0 items-center gap-3.5">
        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-soft border border-line text-muted transition-colors group-hover:border-accent group-hover:text-accent">
          <SocialIcon name={link.icon} className="h-4 w-4" />
        </span>

        <div className="min-w-0">
          <p className="font-medium text-ink">{link.label}</p>
          {link.description && (
            <p className="truncate text-meta text-muted">{link.description}</p>
          )}
        </div>
      </div>

      <ArrowUpRight
        className="h-4 w-4 shrink-0 text-muted transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent"
        strokeWidth={1.8}
      />
    </Link>
  );
}
