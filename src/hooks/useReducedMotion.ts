import { useEffect, useState } from "react";

/** Every animated component checks this before moving anything. */
export function usePrefersReducedMotion() {
  const [prefers, setPrefers] = useState(false);

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");

    setPrefers(query.matches);

    const onChange = () => setPrefers(query.matches);

    query.addEventListener("change", onChange);

    return () => query.removeEventListener("change", onChange);
  }, []);

  return prefers;
}
