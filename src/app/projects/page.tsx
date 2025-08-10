import Image from "next/image";
import Link from "next/link";
import { projectsData as base } from "@/lib/constants";
import SpotlightCard from "@/components/ui/SpotlightCard";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";

const extraProjects = Array.from({ length: 9 }).map((_, i) => ({
  title: `AutoGen Ops ${i + 1}`,
  description: "AI-assisted internal tooling to streamline release workflows and code reviews.",
  technologies: ["Next.js", "Node.js", "OpenAI", "PostgreSQL"],
  features: ["PR summarization", "automated changelogs", "CI hints"],
  githubUrl: "#",
  liveUrl: "#",
  image: "/projects/insight-api.svg",
}));

const projects = [...base, ...extraProjects];

export default function ProjectsIndex() {
  return (
    <div className="section container">
      <div className="mb-8 flex items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight">All Projects</h1>
          <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
            A selection of shipped work, experiments, and learning projects. Use this page as a running log — I’ll keep adding more as I build.
          </p>
        </div>
        <Button asChild variant="outline"><Link href="/">← Back</Link></Button>
      </div>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {projects.map((p) => (
          <SpotlightCard key={`${p.title}-${p.image}`} className="p-4">
            <div className="relative aspect-video w-full overflow-hidden rounded-lg border border-border/40">
              <Image src={p.image} alt={p.title} fill className="object-cover" />
            </div>
            <h3 className="mt-4 text-lg font-medium">{p.title}</h3>
            <p className="mt-2 text-sm text-muted-foreground">{p.description}</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {p.technologies.map((t) => (
                <Badge key={t}>{t}</Badge>
              ))}
            </div>
            <div className="mt-4 flex gap-2">
              <Button asChild variant="outline"><a href={p.githubUrl} target="_blank" rel="noreferrer">GitHub</a></Button>
              <Button asChild><a href={p.liveUrl} target="_blank" rel="noreferrer">Live</a></Button>
            </div>
          </SpotlightCard>
        ))}
      </div>
    </div>
  );
}
