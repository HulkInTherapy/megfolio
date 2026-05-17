import { projects } from "@/data/mock";
import { notFound } from "next/navigation";
import ProjectDetail from "@/views/ProjectDetail";

export function generateStaticParams() {
  return projects.map((p) => ({ id: p.id }));
}

export default async function ProjectPage({ params }) {
  const { id } = await params;
  const project = projects.find((p) => p.id === id);
  if (!project) notFound();

  const currentIndex = projects.findIndex((p) => p.id === id);
  const nextProject = projects[(currentIndex + 1) % projects.length];

  return (
    <ProjectDetail
      project={project}
      nextProject={nextProject}
      currentIndex={currentIndex}
    />
  );
}
