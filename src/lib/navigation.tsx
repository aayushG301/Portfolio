/**
 * THE NEXT.JS SEAM.
 *
 * No component in this project imports react-router directly. They all import
 * Link / useRouteParam / useScrollToTop from here. When you migrate to Next.js,
 * you rewrite THIS FILE ONLY:
 *
 *   Link            -> next/link
 *   useRouteParam   -> useParams() from next/navigation
 *   useScrollToTop  -> delete it, the App Router handles this
 *
 * Every section, page and component keeps working untouched.
 */
import { useEffect } from "react";
import { Link as RouterLink, useLocation, useParams } from "react-router-dom";

interface LinkProps {
  href: string;
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  "aria-label"?: string;
}

// Any path that looks like a real file (ends in an extension) is a static
// asset in /public, not an app route — it must never go through the router,
// or React Router's own "no match" page swallows it.
const ASSET_PATTERN = /\.[a-z0-9]+$/i;

export function Link({ href, children, ...rest }: LinkProps) {
  const isExternal = href.startsWith("http") || href.startsWith("mailto:");
  const isBareAnchor = href.startsWith("#");
  const isAsset = !isExternal && ASSET_PATTERN.test(href);

  if (isExternal) {
    return (
      <a href={href} target="_blank" rel="noreferrer noopener" {...rest}>
        {children}
      </a>
    );
  }

  if (isAsset) {
    // A real browser navigation, e.g. /resume/resume.pdf — opens the file
    // directly instead of being matched against the client-side routes.
    return (
      <a href={href} target="_blank" rel="noreferrer" {...rest}>
        {children}
      </a>
    );
  }

  if (isBareAnchor) {
    return (
      <a href={href} {...rest}>
        {children}
      </a>
    );
  }

  // In Next.js: <NextLink href={href} {...rest}>{children}</NextLink>
  return (
    <RouterLink to={href} {...rest}>
      {children}
    </RouterLink>
  );
}

export function useRouteParam(name: string): string | undefined {
  // In Next.js: return useParams()[name] as string | undefined;
  return useParams()[name];
}

/**
 * On every navigation: if the URL carries a hash (e.g. "/#projects"), scroll
 * to that section instead of resetting to the top — this is what makes the
 * navbar's About/Skills/Experience/Contact links actually work. Otherwise,
 * behaves like a normal route-change scroll reset.
 */
export function useScrollToTop() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const id = hash.slice(1);
      // Give the destination page a frame to mount before we look for the node.
      const raf = requestAnimationFrame(() => {
        document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
      });

      return () => cancelAnimationFrame(raf);
    }

    window.scrollTo(0, 0);
  }, [pathname, hash]);
}

/** True when the current route is this href or a descendant of it. */
export function useIsActivePath(href: string): boolean {
  const { pathname } = useLocation();

  if (href === "/") return pathname === "/";

  return pathname === href || pathname.startsWith(`${href}/`);
}
