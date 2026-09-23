import { motion } from "motion/react";
import type { FlowNode } from "@/types";
import { usePrefersReducedMotion } from "@/hooks/useReducedMotion";

/**
 * Renders a project's architecture as a vertical pipeline. Nodes come straight
 * from `project.architecture.flow`, so documenting a new system is a data edit.
 *
 * The animation is doing a job here: it traces the path a record takes through
 * the system, which is the thing the section is trying to explain.
 */
export function FlowDiagram({ nodes }: { nodes: FlowNode[] }) {
  const reduced = usePrefersReducedMotion();

  return (
    <ol className="relative ml-1 space-y-0" aria-label="System architecture">
      {nodes.map((node, i) => (
        <motion.li
          key={node.label}
          className="relative grid grid-cols-[auto_1fr] gap-x-4 pb-8 last:pb-0"
          initial={reduced ? false : { opacity: 0, x: -8 }}
          whileInView={reduced ? undefined : { opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.4, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="relative flex flex-col items-center">
            <span className="z-10 h-3 w-3 rounded-full border-2 border-accent bg-paper" />
            {i < nodes.length - 1 && (
              <span aria-hidden className="absolute top-3 h-full w-px bg-line" />
            )}
          </div>

          <div className="-mt-[3px] min-w-0">
            <p className="font-mono text-meta font-medium text-ink">{node.label}</p>
            {node.note && <p className="mt-1 max-w-prose text-meta text-muted">{node.note}</p>}
          </div>
        </motion.li>
      ))}
    </ol>
  );
}
