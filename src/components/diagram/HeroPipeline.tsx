import { motion } from "motion/react";
import { usePrefersReducedMotion } from "@/hooks/useReducedMotion";

const STAGES = ["upload", "api", "queue", "worker", "db"];

/**
 * The single orchestrated motion moment on the site: a record travelling through
 * a processing pipeline, looping slowly. It is the hero's visual subject because
 * it is literally what the portfolio is claiming its author can build.
 */
export function HeroPipeline() {
  const reduced = usePrefersReducedMotion();

  return (
    <div
      className="relative w-full select-none rounded-soft border border-line bg-surface p-5"
      role="img"
      aria-label="Diagram of a data processing pipeline: upload, API, queue, worker, database"
    >
      <p className="mb-4 font-mono text-micro text-muted">request lifecycle</p>

      <div className="space-y-3">
        {STAGES.map((stage, i) => (
          <div key={stage} className="flex items-center gap-3">
            <span className="w-16 shrink-0 font-mono text-micro text-muted">{stage}</span>

            <div className="relative h-[2px] flex-1 overflow-hidden bg-line">
              {!reduced && (
                <motion.span
                  className="absolute inset-y-0 w-10 bg-accent"
                  initial={{ x: "-40px" }}
                  animate={{ x: ["-40px", "100%"] }}
                  transition={{
                    duration: 1.1,
                    delay: i * 0.55,
                    repeat: Infinity,
                    repeatDelay: STAGES.length * 0.55 - 1.1,
                    ease: "linear",
                  }}
                />
              )}
              {reduced && <span className="absolute inset-y-0 left-0 w-10 bg-accent" />}
            </div>

            <span className="h-2 w-2 shrink-0 rotate-45 border border-line" />
          </div>
        ))}
      </div>

      <p className="mt-5 border-t border-line pt-4 text-meta text-muted">
        Work that takes minutes shouldn&apos;t happen inside a request. This is the pattern most of
        my recent work is built around.
      </p>
    </div>
  );
}
