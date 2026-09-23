import { motion } from "motion/react";
import { usePrefersReducedMotion } from "@/hooks/useReducedMotion";

const STAGES = [
  { name: "api", target: "80%" },
  { name: "queue", target: "110%" },
  { name: "worker", target: "140%" },
  { name: "db", target: "180%" },
];

/**
 * The single orchestrated motion moment on the site: a record travelling through
 * a processing pipeline, looping slowly. It is the hero's visual subject because
 * it is literally what the portfolio is claiming its author can build.
 */
export function HeroPipeline() {
  const reduced = usePrefersReducedMotion();

  return (
    <div
      className="ambient-panel relative w-full select-none overflow-hidden rounded-soft border border-line p-5 sm:p-7"
      role="img"
      aria-label="Diagram of a data processing pipeline: upload, API, queue, worker, database"
    >
      <div className="mb-6 flex items-center justify-between gap-3">
        <p className="font-mono text-micro uppercase tracking-[0.16em] text-muted">
          request lifecycle
        </p>
        <span className="rounded-full border border-teal/30 px-2 py-1 font-mono text-micro text-teal">
          live system
        </span>
      </div>

      <div className="space-y-3">
        {STAGES.map((stage, i) => (
          <div key={stage.name} className="flex items-center gap-3">
            <span className="w-10 shrink-0 font-mono text-micro text-muted">
              {stage.name}
            </span>

            <div className="relative h-[3px] flex-1 overflow-hidden bg-line">
              {!reduced && (
                <motion.span
                  className="absolute inset-y-0 w-20 bg-accent"
                  initial={{ x: "-40px" }}
                  animate={{
                    x: ["-40px", `calc(${stage.target} - 40px)`],
                  }}
                  transition={{
                    duration: 1.1,
                    delay: i * 0.55,
                    repeat: Infinity,
                    repeatDelay: STAGES.length * 0.55 - 1.1,
                    ease: "linear",
                  }}
                />
              )}
              {reduced && (
                <span
                  className="absolute inset-y-0 w-10 bg-accent"
                  style={{ left: `calc(${stage.target} - 40px)` }}
                />
              )}
            </div>

            <span className="h-2 w-2 shrink-0 rotate-45 border border-line" />
          </div>
        ))}
      </div>

      <p className="mt-5 border-t border-line pt-4 text-meta text-muted">
        Heavy processes shouldn't block HTTP requests. I build systems around
        asynchronous queues and workers to handle background execution
        seamlessly.
      </p>
    </div>
  );
}
