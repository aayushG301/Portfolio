import { ArrowLeft, ExternalLink, Github } from "lucide-react";
import { Container } from "@/components/common/Container";
import { Chip } from "@/components/common/Chip";
import { Reveal } from "@/components/common/Reveal";
import { FlowDiagram } from "@/components/diagram/FlowDiagram";
import { Link, useRouteParam } from "@/lib/navigation";
import { getProjectBySlug } from "@/data/projects";
import { usePageMeta } from "@/lib/seo";
import NotFound from "./NotFound";

function Block({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <Reveal className="border-t border-line pt-6">
      <h2 className="text-h3">{title}</h2>
      <div className="mt-3 max-w-prose text-muted">{children}</div>
    </Reveal>
  );
}

function List({ items }: { items: string[] }) {
  return (
    <ul className="space-y-2">
      {items.map((item) => (
        <li key={item} className="relative pl-4">
          <span aria-hidden className="absolute left-0 top-[0.7em] h-1 w-1 rounded-full bg-accent" />
          {item}
        </li>
      ))}
    </ul>
  );
}

export default function ProjectDetail() {
  const slug = useRouteParam("slug");
  const project = slug ? getProjectBySlug(slug) : undefined;

  usePageMeta({
    title: project ? `${project.title} — Case study` : "Project not found",
    description: project?.shortDescription,
  });

  if (!project) return <NotFound />;

  return (
    <article className="py-12 sm:py-16">
      <Container className="max-w-3xl">
        <Link href="/projects" className="inline-flex items-center gap-1.5 text-meta text-muted hover:text-ink">
          <ArrowLeft className="h-3.5 w-3.5" strokeWidth={2} />
          All projects
        </Link>

        <header className="mt-8">
          <p className="font-mono text-meta text-accent">
            {project.category} · {project.year}
          </p>

          <h1 className="mt-3 font-display text-h2 sm:text-h1">{project.title}</h1>
          <p className="mt-3 text-lead text-muted">{project.tagline}</p>

          <p className="mt-6 max-w-prose text-muted">{project.description}</p>

          <div className="mt-6 flex flex-wrap gap-1.5">
            {project.technologies.map((tech) => (
              <Chip key={tech}>{tech}</Chip>
            ))}
          </div>

          {(project.links.github || project.links.live) && (
            <div className="mt-6 flex flex-wrap gap-3">
              {project.links.github && (
                <Link
                  href={project.links.github}
                  className="inline-flex items-center gap-2 rounded-soft border border-line px-3 py-2 text-meta transition-colors hover:border-accent hover:text-accent"
                >
                  <Github className="h-4 w-4" strokeWidth={1.6} />
                  Source
                </Link>
              )}
              {project.links.live && (
                <Link
                  href={project.links.live}
                  className="inline-flex items-center gap-2 rounded-soft border border-line px-3 py-2 text-meta transition-colors hover:border-accent hover:text-accent"
                >
                  <ExternalLink className="h-4 w-4" strokeWidth={1.6} />
                  Live demo
                </Link>
              )}
            </div>
          )}
        </header>

        <div className="mt-14 space-y-12">
          {project.problem && <Block title="The problem">{project.problem}</Block>}

          {project.solution && <Block title="The approach">{project.solution}</Block>}

          {project.architecture && (
            <Reveal className="border-t border-line pt-6">
              <h2 className="text-h3">Architecture</h2>

              {project.architecture.summary && (
                <p className="mt-3 max-w-prose text-muted">{project.architecture.summary}</p>
              )}

              <div className="mt-8">
                <FlowDiagram nodes={project.architecture.flow} />
              </div>
            </Reveal>
          )}

          {project.features && (
            <Block title="What it does">
              <List items={project.features} />
            </Block>
          )}

          {project.decisions && (
            <Reveal className="border-t border-line pt-6">
              <h2 className="text-h3">Engineering decisions</h2>

              <div className="mt-5 space-y-6">
                {project.decisions.map((decision) => (
                  <div key={decision.title} className="max-w-prose">
                    <h3 className="font-mono text-meta font-medium text-ink">{decision.title}</h3>
                    <p className="mt-1.5 text-muted">{decision.body}</p>
                  </div>
                ))}
              </div>
            </Reveal>
          )}

          {project.challenges && (
            <Block title="What was hard">
              <List items={project.challenges} />
            </Block>
          )}

          {project.learnings && (
            <Block title="What I took away">
              <List items={project.learnings} />
            </Block>
          )}

          {project.futureImprovements && (
            <Block title="What's next">
              <List items={project.futureImprovements} />
            </Block>
          )}
        </div>
      </Container>
    </article>
  );
}
