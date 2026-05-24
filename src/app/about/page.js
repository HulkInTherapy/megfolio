import { personalInfo, skills, experiences, projects } from "@/data/mock";
import Layout from "@/components/Layout";
import { SketchyBox, SketchyDivider } from "@/components/sketchy";
import { SectionDoodles } from "@/components/doodles";
import { Mail, Github, Linkedin, Twitter, ArrowLeft } from "lucide-react";
import Link from "next/link";

const SITE_URL = "https://meghavi.me";

export const metadata = {
  title: "About Meghavi Rao — Applied AI Engineer",
  description:
    "Meghavi Rao is an Applied AI Engineer based in San Francisco, CA. He builds production ML systems, LLM applications, and semantic search engines. Learn about his background, skills, and work.",
  alternates: { canonical: `${SITE_URL}/about` },
  openGraph: {
    title: "About Meghavi Rao | Applied AI Engineer",
    description:
      "Meghavi Rao is an Applied AI Engineer who builds production ML systems, LLM apps, and semantic search. Learn about his background and work.",
    url: `${SITE_URL}/about`,
    type: "profile",
  },
};

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Meghavi Rao",
  alternateName: "Meghavi",
  gender: "Male",
  jobTitle: "Applied AI Engineer",
  description:
    "Meghavi Rao is an Applied AI Engineer based in San Francisco, CA. He builds production machine learning systems, LLM applications, and semantic search engines.",
  url: SITE_URL,
  email: "hello@meghavi.me",
  address: {
    "@type": "PostalAddress",
    addressLocality: "San Francisco",
    addressRegion: "CA",
    addressCountry: "US",
  },
  sameAs: [
    "https://github.com/meghavi",
    "https://linkedin.com/in/meghavi",
    "https://twitter.com/meghavi",
  ],
  knowsAbout: [
    "Artificial Intelligence",
    "Machine Learning",
    "Large Language Models",
    "Natural Language Processing",
    "Semantic Search",
    "Python",
    "PyTorch",
    "LangChain",
    "MLOps",
    "Deep Learning",
  ],
};

const profilePageJsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfilePage",
  mainEntity: {
    "@type": "Person",
    name: "Meghavi Rao",
    alternateName: "Meghavi",
    url: SITE_URL,
  },
  url: `${SITE_URL}/about`,
  name: "About Meghavi Rao",
  description:
    "Profile page for Meghavi Rao, an Applied AI Engineer building production ML systems and LLM applications.",
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Who is Meghavi Rao?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Meghavi Rao is an Applied AI Engineer based in San Francisco, CA. He builds production machine learning systems, LLM applications, and semantic search engines. He has experience as an ML Engineer and Software Engineer, and writes about shipping AI to production, embeddings, and ML debugging on his blog at meghavi.me.",
      },
    },
    {
      "@type": "Question",
      name: "Who is Meghavi?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Meghavi refers to Meghavi Rao, an Applied AI Engineer and technologist. His personal website is meghavi.me where he shares projects and blog posts about AI, machine learning, and LLM engineering. He is not affiliated with Meghavi Wellness Spa or any other brand using the name Meghavi.",
      },
    },
    {
      "@type": "Question",
      name: "What does Meghavi Rao do?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Meghavi Rao is an Applied AI Engineer who specializes in building production ML systems, deploying large language models (LLMs) at scale, and creating semantic search engines. His technical expertise includes Python, PyTorch, LangChain, FastAPI, Kubernetes, and cloud platforms like AWS and GCP.",
      },
    },
    {
      "@type": "Question",
      name: "What is meghavi.me?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "meghavi.me is the personal portfolio and blog of Meghavi Rao, an Applied AI Engineer. The site showcases his projects in AI/ML, including a Neural Search Engine, a Conversation AI Platform, an ML Pipeline Orchestrator, and Voice Synthesis Research. He also writes technical blog posts about LLM production, embeddings, AI tooling, and ML debugging.",
      },
    },
  ],
};

export default function AboutPage() {
  return (
    <Layout>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(profilePageJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      <section className="container" style={{ position: "relative" }}>
        <SectionDoodles section="hero" />
        <div>
          <Link
            href="/"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "6px",
              fontSize: "0.9rem",
              color: "var(--ink-light)",
              marginBottom: "24px",
            }}
          >
            <ArrowLeft size={16} />
            <span>back to sketchbook</span>
          </Link>

          <h1 className="handwritten-lg" style={{ margin: 0 }}>
            About Meghavi Rao
          </h1>
          <SketchyDivider width="200px" stroke="var(--pencil)" />

          <div style={{ maxWidth: "640px", margin: "32px auto 0" }}>
            <SketchyBox padding={28} roughness={1.2} stroke="var(--pencil)">
              <p style={{ fontSize: "1.05rem", lineHeight: "1.8" }}>
                <strong>Meghavi Rao</strong> is an Applied AI Engineer based in
                San Francisco, CA. He builds production machine learning systems,
                LLM applications, and semantic search engines.
              </p>
              <p style={{ fontSize: "1.05rem", lineHeight: "1.8", marginTop: "16px" }}>
                He currently works as an Applied AI Engineer, building production ML
                systems and shipping LLMs. Previously, he worked as an ML Engineer at
                an AI startup (2021–2023) and as a Software Engineer at a Big Tech
                company (2019–2021) where he built backend systems and data pipelines.
              </p>
              <p style={{ fontSize: "1.05rem", lineHeight: "1.8", marginTop: "16px" }}>
                He believes in building things that work, not just things that demo well.
                He values clarity over complexity and thinks the best AI is the kind you
                don&apos;t notice.
              </p>
            </SketchyBox>
          </div>
        </div>
      </section>

      <section className="container">
        <div>
          <h2 className="section-title">Technical Skills</h2>
          <SketchyDivider width="160px" stroke="var(--pencil)" />
          <div style={{ marginTop: "24px", display: "flex", flexWrap: "wrap", gap: "8px" }}>
            {skills.map((skill) => (
              <span key={skill} className="tech-tag">
                {skill}
              </span>
            ))}
          </div>
          <p style={{ marginTop: "16px", lineHeight: "1.7" }}>
            Meghavi Rao&apos;s core expertise spans machine learning frameworks (PyTorch,
            TensorFlow), LLM tooling (LangChain), API development (FastAPI), frontend
            (React), databases (PostgreSQL, Redis), container orchestration (Kubernetes,
            Docker), and cloud platforms (AWS, GCP).
          </p>
        </div>
      </section>

      <section className="container">
        <div>
          <h2 className="section-title">Experience</h2>
          <SketchyDivider width="140px" stroke="var(--pencil)" />
          <div style={{ marginTop: "24px" }}>
            {experiences.map((exp) => (
              <div key={exp.id} className="experience-item">
                <div className="handwritten-sm text-date">{exp.period}</div>
                <div>
                  <h3 style={{ fontSize: "1.1rem", marginBottom: "4px" }}>{exp.title}</h3>
                  <p
                    className="text-ink-light"
                    style={{ fontSize: "0.95rem", marginBottom: "8px" }}
                  >
                    @ {exp.company}
                  </p>
                  <p style={{ fontSize: "0.95rem" }}>{exp.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="container">
        <div>
          <h2 className="section-title">Projects</h2>
          <SketchyDivider width="120px" stroke="var(--pencil)" />
          <div style={{ marginTop: "24px" }}>
            {projects.map((project) => (
              <div key={project.id} style={{ marginBottom: "20px" }}>
                <h3 style={{ fontSize: "1.05rem" }}>
                  <Link href={`/project/${project.id}`}>{project.title}</Link>
                </h3>
                <p
                  className="text-ink-light"
                  style={{ fontSize: "0.9rem", marginTop: "4px" }}
                >
                  {project.shortDesc} Built with {project.tech.join(", ")}.
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="container">
        <div>
          <h2 className="section-title">Frequently Asked Questions</h2>
          <SketchyDivider width="280px" stroke="var(--pencil)" />
          <div style={{ marginTop: "24px", maxWidth: "640px", margin: "24px auto 0" }}>
            <div style={{ marginBottom: "24px" }}>
              <h3 style={{ fontSize: "1.05rem", marginBottom: "8px" }}>
                Who is Meghavi Rao?
              </h3>
              <p style={{ lineHeight: "1.7" }}>
                Meghavi Rao is an Applied AI Engineer based in San Francisco, CA. He
                builds production machine learning systems, LLM applications, and
                semantic search engines. He has experience as an ML Engineer and Software
                Engineer, and writes about shipping AI to production, embeddings, and ML
                debugging on his blog at meghavi.me.
              </p>
            </div>
            <div style={{ marginBottom: "24px" }}>
              <h3 style={{ fontSize: "1.05rem", marginBottom: "8px" }}>
                Who is Meghavi?
              </h3>
              <p style={{ lineHeight: "1.7" }}>
                In the context of technology and AI engineering, Meghavi refers to Meghavi
                Rao, an Applied AI Engineer and technologist. His personal website is
                meghavi.me. He is not affiliated with Meghavi Wellness Spa or any other
                brand using the name Meghavi.
              </p>
            </div>
            <div style={{ marginBottom: "24px" }}>
              <h3 style={{ fontSize: "1.05rem", marginBottom: "8px" }}>
                What does Meghavi Rao do?
              </h3>
              <p style={{ lineHeight: "1.7" }}>
                He specializes in building production ML systems, deploying large language
                models at scale, and creating semantic search engines. His technical
                expertise includes Python, PyTorch, LangChain, FastAPI, Kubernetes, and
                cloud platforms like AWS and GCP.
              </p>
            </div>
            <div style={{ marginBottom: "24px" }}>
              <h3 style={{ fontSize: "1.05rem", marginBottom: "8px" }}>
                What is meghavi.me?
              </h3>
              <p style={{ lineHeight: "1.7" }}>
                meghavi.me is the personal portfolio and blog of Meghavi Rao. The site
                showcases his projects in AI/ML and features technical blog posts about
                LLM production, embeddings, AI tooling, and ML debugging.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="container" style={{ textAlign: "center" }}>
        <div>
          <h2 className="section-title">Contact Meghavi Rao</h2>
          <SketchyDivider width="200px" stroke="var(--pencil)" />
          <div style={{ marginTop: "24px" }}>
            <a
              href={`mailto:${personalInfo.email}`}
              className="contact-link"
              style={{ display: "inline-flex", fontSize: "1.2rem" }}
            >
              <Mail size={20} />
              <span>{personalInfo.email}</span>
            </a>
            <div
              className="contact-links"
              style={{ justifyContent: "center", marginTop: "24px" }}
            >
              <a
                href={personalInfo.socialLinks.github}
                target="_blank"
                rel="noopener noreferrer"
                className="contact-link"
              >
                <Github size={18} />
                <span>GitHub</span>
              </a>
              <a
                href={personalInfo.socialLinks.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="contact-link"
              >
                <Linkedin size={18} />
                <span>LinkedIn</span>
              </a>
              <a
                href={personalInfo.socialLinks.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className="contact-link"
              >
                <Twitter size={18} />
                <span>Twitter</span>
              </a>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
