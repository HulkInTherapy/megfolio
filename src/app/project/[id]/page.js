import { projects } from "@/data/mock";
import { notFound } from "next/navigation";
import ProjectDetail from "@/views/ProjectDetail";

const SITE_URL = "https://meghavi.me";

export function generateStaticParams() {
  return projects.map((p) => ({ id: p.id }));
}

export async function generateMetadata({ params }) {
  const { id } = await params;
  const project = projects.find((p) => p.id === id);
  if (!project) return {};
  return {
    title: project.title,
    description: `${project.shortDesc} — A project by Meghavi Rao, Applied AI Engineer. Built with ${project.tech.slice(0, 3).join(", ")}.`,
    alternates: { canonical: `${SITE_URL}/project/${id}` },
    openGraph: {
      title: `${project.title} | Meghavi Rao`,
      description: project.shortDesc,
      url: `${SITE_URL}/project/${id}`,
      type: "article",
    },
  };
}

function ProjectJsonLd({ project }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareSourceCode",
    name: project.title,
    description: project.shortDesc,
    url: `${SITE_URL}/project/${project.id}`,
    codeRepository: project.link,
    author: {
      "@type": "Person",
      name: "Meghavi Rao",
      alternateName: "Meghavi",
      url: SITE_URL,
    },
    programmingLanguage: project.tech,
    dateCreated: `${project.year}-01-01`,
    keywords: project.tech.join(", "),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

export default async function ProjectPage({ params }) {
  const { id } = await params;
  const project = projects.find((p) => p.id === id);
  if (!project) notFound();

  const currentIndex = projects.findIndex((p) => p.id === id);
  const nextProject = projects[(currentIndex + 1) % projects.length];

  return (
    <>
      <ProjectJsonLd project={project} />
      <ProjectDetail
        project={project}
        nextProject={nextProject}
        currentIndex={currentIndex}
      />
    </>
  );
}
