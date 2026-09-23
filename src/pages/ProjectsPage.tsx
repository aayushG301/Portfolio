import { useMemo, useState } from "react";
import { Section } from "@/components/common/Section";
import { ProjectCard } from "@/components/projects/ProjectCard";
import { ProjectFilters } from "@/components/projects/ProjectFilters";
import { Reveal } from "@/components/common/Reveal";
import { projectCategories, projects } from "@/data/projects";
import { usePageMeta } from "@/lib/seo";
import { profile } from "@/data/profile";

export default function ProjectsPage() {
  const [active, setActive] = useState("All");

  usePageMeta({
    title: `Projects — ${profile.name}`,
    description: "Full-stack and backend projects, each with an architecture write-up.",
  });

  const visible = useMemo(
    () => (active === "All" ? projects : projects.filter((p) => p.category === active)),
    [active],
  );

  return (
    <Section
      title="Projects"
      intro="Everything I've built that's worth writing about, newest first."
      className="pt-12"
    >
      <ProjectFilters categories={projectCategories} active={active} onChange={setActive} />

      {visible.length === 0 ? (
        <p className="mt-12 text-muted">
          Nothing here under {active} yet. Try another category.
        </p>
      ) : (
        <div className="mt-12 grid gap-10 md:grid-cols-2">
          {visible.map((project, i) => (
            <Reveal key={project.slug} delay={i * 0.05}>
              <ProjectCard project={project} />
            </Reveal>
          ))}
        </div>
      )}
    </Section>
  );
}
