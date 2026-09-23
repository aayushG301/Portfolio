import { ArrowRight } from "lucide-react";
import { Section } from "@/components/common/Section";
import { ProjectCard } from "@/components/projects/ProjectCard";
import { Reveal } from "@/components/common/Reveal";
import { Link } from "@/lib/navigation";
import { featuredProjects, projects } from "@/data/projects";

export function FeaturedProjects() {
  const remaining = projects.length - featuredProjects.length;

  return (
    <Section
      id="projects"
      index="03"
      title="Selected work"
      intro="Each one has a write-up covering the problem, the architecture and what I'd do differently."
    >
      <div className="grid gap-10 md:grid-cols-2">
        {featuredProjects.map((project, i) => (
          <Reveal key={project.slug} delay={i * 0.07}>
            <ProjectCard project={project} />
          </Reveal>
        ))}
      </div>

      {remaining > 0 && (
        <Link
          href="/projects"
          className="mt-12 inline-flex items-center gap-1.5 text-meta font-medium text-accent"
        >
          All projects ({projects.length})
          <ArrowRight className="h-3.5 w-3.5" strokeWidth={2} />
        </Link>
      )}
    </Section>
  );
}
