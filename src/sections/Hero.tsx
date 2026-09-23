import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Container } from "@/components/common/Container";
import { ButtonLink } from "@/components/common/Button";
import { HeroPipeline } from "@/components/diagram/HeroPipeline";
import { usePrefersReducedMotion } from "@/hooks/useReducedMotion";
import { profile } from "@/data/profile";
import { projects } from "@/data/projects";

function RotatingPhrase({ phrases }: { phrases: readonly string[] }) {
  const [index, setIndex] = useState(0);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    if (reduced) return;

    const id = setInterval(() => setIndex((i) => (i + 1) % phrases.length), 2800);

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
    <section className="border-b border-line pb-16 pt-14 sm:pb-24 sm:pt-20">
      <Container>
        <div className="grid items-center gap-12 lg:grid-cols-[1.15fr_0.85fr] lg:gap-16">
          <motion.div
            initial={reduced ? false : { opacity: 0, y: 14 }}
            animate={reduced ? undefined : { opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="font-mono text-meta text-muted">
              {profile.role} · {profile.location.split(",")[0]}
            </p>

            <h1 className="mt-5 text-h1">
              I build{" "}
              <RotatingPhrase phrases={profile.rotatingPhrases} />
            </h1>

            <p className="mt-6 max-w-prose text-lead text-muted">{profile.tagline}</p>

            <div className="mt-8 flex flex-wrap gap-3">
              <ButtonLink href="/projects">View projects</ButtonLink>
              <ButtonLink href={profile.resumeUrl} variant="outline">
                Resume
              </ButtonLink>
              <ButtonLink href="https://github.com/aayushG301" variant="outline">
                GitHub
              </ButtonLink>
            </div>

            {building && (
              <p className="mt-8 border-t border-line pt-5 text-meta text-muted">
                Currently building{" "}
                <a href={`/projects/${building.slug}`} className="link-underline font-medium">
                  {building.title}
                </a>{" "}
                — {building.tagline.toLowerCase()}.
              </p>
            )}
          </motion.div>

          <motion.div
            initial={reduced ? false : { opacity: 0, y: 14 }}
            animate={reduced ? undefined : { opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
          >
            <HeroPipeline />
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
