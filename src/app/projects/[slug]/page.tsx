import { notFound } from "next/navigation";
export const dynamic = "force-dynamic";
import type { Metadata } from "next";

import Auluxe from "@/funnel/components/Work/Projects/Auluxe/page";
import Opulent from "@/funnel/components/Work/Projects/Opulent/page";
import Urban from "@/funnel/components/Work/Projects/Urban/page";
import Nova from "@/funnel/components/Work/Projects/Nova/page";
import ArchSphere from "@/funnel/components/Work/Projects/ArchSphere/page";
import Harmony from "@/funnel/components/Work/Projects/Harmony/page";
import { projects } from "@/funnel/components/Work/data";

import ProjectClient from "./ProjectClient";

const projectComponentMap: Record<string, React.ComponentType> = {
  "auluxe": Auluxe,
  "opulent-interiors": Opulent,
  "urban-odyssey": Urban,
  "novadrive": Nova,
  "archsphere": ArchSphere,
  "harmony-beats": Harmony,
};

export function generateStaticParams() {
  return projects.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((item) => item.slug === slug);

  if (!project) {
    return { title: "Project Not Found" };
  }

  return {
    title: `${project.title} | Projects`,
    description: project.description,
    openGraph: {
      title: `${project.title} | Projects`,
      description: project.description,
      url: `https://picasso-fusion.vercel.app/projects/${slug}`,
      siteName: "Picasso Fusion",
      images: [
        {
          url: project.image,
          width: 1200,
          height: 630,
          alt: project.title,
        },
      ],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: `${project.title} | Projects`,
      description: project.description,
      images: [project.image],
    },
    alternates: {
      canonical: `https://picasso-fusion.vercel.app/projects/${slug}`,
    },
  };
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const ProjectComponent = projectComponentMap[slug];
  const project = projects.find((item) => item.slug === slug);

  if (!ProjectComponent || !project) {
    notFound();
  }

  // JSON-LD structured data for the project
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: project.title,
    description: project.description,
    image: project.image,
    url: `https://picasso-fusion.vercel.app/projects/${slug}`,
    creator: {
      "@type": "Organization",
      name: "Picasso Fusion",
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ProjectClient>
        <ProjectComponent />
      </ProjectClient>
    </>
  );
}
