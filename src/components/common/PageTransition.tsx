import { motion } from "motion/react";
import { useLocation } from "react-router-dom";
import { usePrefersReducedMotion } from "@/hooks/useReducedMotion";

/**
 * A short fade-and-rise on every route change — Home to Projects, a project's
 * detail page, the Links page. Keyed by pathname so it replays on real page
 * changes but stays silent for hash-only navigation (e.g. "/#about"), since
 * that's a scroll, not a new page.
 *
 * Deliberately has no exit animation: the new page mounts immediately, so
 * useScrollToTop's hash-scrolling can always find its target in the DOM.
 */
export function PageTransition({ children }: { children: React.ReactNode }) {
  const { pathname } = useLocation();
  const reduced = usePrefersReducedMotion();

  if (reduced) return <>{children}</>;

  return (
    <motion.div
      key={pathname}
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}
