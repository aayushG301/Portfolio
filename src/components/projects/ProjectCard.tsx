import { useState } from "react";
import { ArrowUpRight } from "lucide-react";
import type { Project } from "@/types";
import { Link } from "@/lib/navigation";
import { Chip } from "@/components/common/Chip";

const statusLabel: Record<Project["status"], string> = {
  building: "In progress",
  live: "Shipped",
  archived: "Archived",
};

export function ProjectCard({ project }: { project: Project }) {
  const [imageFailed, setImageFailed] = useState(false);

  return (
    <article className="group relative -mx-4 border-t border-line px-4 pt-5 pb-1 transition-all duration-300 hover:-translate-y-0.5 hover:border-accent hover:bg-surface">
      <Link
        href={`/projects/${project.slug}`}
        className="relative mb-5 block aspect-[16/9] overflow-hidden rounded-soft border border-line bg-accent-soft"
        aria-label={`View the ${project.title} case study`}
      >
        <div className="absolute inset-0 flex items-center justify-center bg-[linear-gradient(135deg,rgb(var(--c-accent-soft)),rgb(var(--c-surface)))] px-8">
          <p className="text-center font-display text-2xl font-semibold text-ink sm:text-3xl">
            {project.title}
          </p>
        </div>
        {project.image && !imageFailed && (
          <img
            src={project.image}
            alt={`${project.title} project preview`}
            className="relative h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
            loading="lazy"
            onError={() => setImageFailed(true)}
          />
        )}
        <span className="absolute bottom-3 left-3 rounded-sharp border border-white/20 bg-ink/80 px-2 py-1 font-mono text-micro text-paper backdrop-blur-sm">
          {project.year}
        </span>
      </Link>

      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <h3 className="text-h3">
            <Link href={`/projects/${project.slug}`} className="link-underline">
              {project.title}
            </Link>
          </h3>
          <p className="mt-1 text-meta text-muted">{project.tagline}</p>
        </div>

        <span className="shrink-0 font-mono text-micro text-muted">
          {statusLabel[project.status]}
        </span>
      </div>

      <p className="mt-4 max-w-prose text-meta text-muted">
        {project.shortDescription}
      </p>

      <div className="mt-4 flex flex-wrap gap-1.5">
        {project.technologies.slice(0, 6).map((tech) => (
          <Chip key={tech}>{tech}</Chip>
        ))}
      </div>

      <Link
        href={`/projects/${project.slug}`}
        className="mt-5 inline-flex items-center gap-1 text-meta font-medium text-accent"
        aria-label={`Read the ${project.title} case study`}
      >
        Read the case study
        <ArrowUpRight
          className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
          strokeWidth={2}
        />
      </Link>
    </article>
  );
}
