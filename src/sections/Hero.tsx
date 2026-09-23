import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Container } from "@/components/common/Container";
import { ButtonLink } from "@/components/common/Button";
import { HeroPipeline } from "@/components/diagram/HeroPipeline";
import { usePrefersReducedMotion } from "@/hooks/useReducedMotion";
import { profile } from "@/data/profile";
import { projects } from "@/data/projects";

function RotatingPhrase({ phrases }: Readonly<{ phrases: readonly string[] }>) {
  const [index, setIndex] = useState(0);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    if (reduced) return;

    const id = setInterval(
      () => setIndex((i) => (i + 1) % phrases.length),
      2800,
    );

    return () => clearInterval(id);
  }, [phrases.length, reduced]);

  if (reduced) return <span className="text-accent">{phrases[0]}</span>;

  return (
    <span className="relative inline-block align-top">
      {/* Reserves the width of the longest phrase so the headline never reflows. */}
      <span aria-hidden className="invisible block">
        {phrases.reduce((a, b) => (a.length >= b.length ? a : b))}
      </span>

      <AnimatePresence mode="wait">
        <motion.span
          key={phrases[index]}
          className="absolute inset-0 text-accent"
          initial={{ opacity: 0, y: "0.25em" }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: "-0.25em" }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        >
          {phrases[index]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}

export function Hero() {
  const building = projects.find((p) => p.status === "building");
  const reduced = usePrefersReducedMotion();

  return (
    <section className="relative overflow-hidden border-b border-line pb-16 pt-14 sm:pb-24 sm:pt-20">
      <div className="pointer-events-none absolute -right-20 top-16 h-48 w-48 rounded-full border border-accent/20 sm:h-72 sm:w-72" />
      <div className="pointer-events-none absolute right-8 top-32 h-px w-40 bg-accent/50 signal-line sm:right-24 sm:w-64" />
      <Container>
        <div className="grid items-center gap-12 lg:grid-cols-[1.15fr_0.85fr] lg:gap-16">
          <motion.div
            initial={reduced ? false : { opacity: 0, y: 14 }}
            animate={reduced ? undefined : { opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="inline-flex items-center gap-2 rounded-full border border-line bg-surface/80 px-3 py-1 font-mono text-micro text-muted backdrop-blur">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-teal" />
              Building robust backend systems and end-to-end full-stack products · {profile.location.split(",")[0]}
            </div>

            <h1 className="mt-6 max-w-4xl text-h1">
              I build <RotatingPhrase phrases={profile.rotatingPhrases} />
            </h1>

            <p className="mt-6 max-w-prose text-lead text-muted">
              {profile.tagline}
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <ButtonLink href="/projects">View projects</ButtonLink>
              <ButtonLink href={profile.resumeUrl} variant="outline">
                Resume
              </ButtonLink>
              <ButtonLink
                href="https://github.com/aayushG301"
                variant="outline"
              >
                GitHub
              </ButtonLink>
            </div>

            {building && (
              <p className="mt-8 max-w-xl border-t border-line pt-5 text-meta text-muted">
                Currently building{" "}
                <a
                  href={`/projects/${building.slug}`}
                  className="link-underline font-medium"
                >
                  {building.title}
                </a>{" "}
                — {building.tagline.toLowerCase()}.
              </p>
            )}
          </motion.div>

          <motion.div
            initial={reduced ? false : { opacity: 0, y: 14 }}
            animate={reduced ? undefined : { opacity: 1, y: 0 }}
            transition={{
              duration: 0.5,
              delay: 0.12,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            <HeroPipeline />
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
