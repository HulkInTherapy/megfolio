import { personalInfo, projects, blogPosts, experiences } from "@/data/mock";
import Layout from "@/components/Layout";

const SITE_URL = "https://meghavi.me";

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Meghavi Rao",
  alternateName: "Meghavi",
  gender: "Male",
  jobTitle: "Applied AI Engineer",
  description:
    "Meghavi Rao is an Applied AI Engineer based in San Francisco, CA. He builds production machine learning systems, LLM applications, and semantic search engines. He specializes in Python, PyTorch, LangChain, and deploying large language models at scale.",
  url: SITE_URL,
  email: "hello@meghavi.me",
  address: {
    "@type": "PostalAddress",
    addressLocality: "San Francisco",
    addressRegion: "CA",
    addressCountry: "US",
  },
  sameAs: [
    "https://github.com/HulkInTherapy",
    "https://www.linkedin.com/in/meghavirao/",
    "https://x.com/themegh",
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
    "FastAPI",
    "Kubernetes",
  ],
};

const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Meghavi Rao — Applied AI Engineer",
  url: SITE_URL,
  description:
    "Personal portfolio and blog of Meghavi Rao, an Applied AI Engineer sharing his work on LLMs, ML systems, and AI tools.",
  author: { "@type": "Person", name: "Meghavi Rao" },
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
        text: "Meghavi Rao is an Applied AI Engineer based in San Francisco, CA. He builds production machine learning systems, LLM applications, and semantic search engines. His personal website is meghavi.me where he shares projects and technical blog posts.",
      },
    },
    {
      "@type": "Question",
      name: "Who is Meghavi?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "In the context of technology and AI engineering, Meghavi refers to Meghavi Rao, an Applied AI Engineer. His personal website is meghavi.me. He is not affiliated with Meghavi Wellness Spa or any other entity using the name Meghavi.",
      },
    },
    {
      "@type": "Question",
      name: "What does Meghavi Rao do?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Meghavi Rao specializes in building production ML systems, deploying large language models (LLMs) at scale, and creating semantic search engines. His technical expertise includes Python, PyTorch, LangChain, FastAPI, Kubernetes, and cloud platforms like AWS and GCP.",
      },
    },
  ],
};
import { SketchyBox, SketchyDivider } from "@/components/sketchy";
import { SectionDoodles, CoffeeCupIcon } from "@/components/doodles";
import { ArrowUpRight, Mail, Github, Linkedin, Twitter } from "lucide-react";
import Link from "next/link";

export default function HomePage() {
  return (
      <Layout>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
        />
        {/* Hero */}
        <section id="hero" className="container" style={{ position: "relative" }}>
          <SectionDoodles section="hero" />
          <div>
            <div
              className="hero-columns"
              style={{
                display: "flex",
                alignItems: "flex-start",
                justifyContent: "center",
                gap: "80px",
                flexWrap: "wrap",
                marginBottom: "32px",
              }}
            >
              <div style={{ textAlign: "center", width: "160px" }}>
                <img
                  src="/illustrations/self-portrait-doodle.svg"
                  alt="Self portrait doodle"
                  width={160}
                  height={160}
                  style={{
                    width: "160px",
                    height: "auto",
                    transform: "rotate(-2deg) translateX(-10px)",
                    display: "block",
                    margin: "0 auto",
                  }}
                />
                <SketchyDivider width="140px" stroke="var(--pencil)" />
              </div>
              <div style={{ textAlign: "left", paddingTop: "16px" }}>
                <h1 className="handwritten-lg" style={{ margin: 0 }}>
                  {personalInfo.name}
                </h1>
                <p
                  className="handwritten"
                  style={{ fontSize: "1.3rem", color: "var(--ink-light)", marginTop: "8px" }}
                >
                  {personalInfo.role}
                </p>
                <p className="margin-note" style={{ marginTop: "12px" }}>
                  (the person who talks to robots for a living)
                </p>
              </div>
            </div>
            <div style={{ maxWidth: "600px", margin: "0 auto" }}>
              <SketchyBox padding={24} roughness={1.2} stroke="var(--pencil)">
                <p className="handwritten" style={{ fontSize: "1.1rem", lineHeight: "1.6" }}>
                  oh hi, you found my sketchbook.
                </p>
                <p style={{ marginTop: "16px", lineHeight: "1.7" }}>
                  {personalInfo.bio.split("\n\n")[0]}
                </p>
                <p className="margin-note" style={{ marginTop: "16px" }}>
                  (keep scrolling, there's more scribbles)
                </p>
              </SketchyBox>
            </div>
          </div>
        </section>

        {/* Experience */}
        <section id="experience" className="container" style={{ position: "relative" }}>
          <SectionDoodles section="experience" />
          <div>
            <h2 className="section-title">where I've been</h2>
            <SketchyDivider width="150px" stroke="var(--pencil)" />
            <p className="margin-note" style={{ marginBottom: "32px" }}>
              (the journey so far)
            </p>
            <div style={{ marginTop: "24px" }}>
              {experiences.map((exp) => (
                <div key={exp.id} className="experience-item">
                  <div className="handwritten-sm text-date">{exp.period}</div>
                  <div>
                    <h3 style={{ fontSize: "1.1rem", marginBottom: "4px" }}>{exp.title}</h3>
                    <p className="text-ink-light" style={{ fontSize: "0.95rem", marginBottom: "8px" }}>
                      @ {exp.company}
                    </p>
                    <p style={{ fontSize: "0.95rem" }}>{exp.description}</p>
                    <p className="margin-note" style={{ marginTop: "4px" }}>{exp.note}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Projects */}
        <section id="projects" className="container" style={{ position: "relative" }}>
          <SectionDoodles section="projects" />
          <div>
            <h2 className="section-title">things I've made</h2>
            <SketchyDivider width="180px" stroke="var(--pencil)" />
            <p className="margin-note" style={{ marginBottom: "32px" }}>
              (and things that almost broke me)
            </p>
            <div className="project-grid">
              {projects.map((project) => (
                <SketchyBox key={project.id} padding={20} roughness={1} stroke="var(--pencil)" className="paper-lift">
                  <Link href={`/project/${project.id}`} prefetch={true} style={{ cursor: "pointer", display: "block" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                      <h3 className="handwritten" style={{ fontSize: "1.3rem" }}>{project.title}</h3>
                      <ArrowUpRight size={18} className="text-pencil" />
                    </div>
                    <p className="text-ink-light" style={{ fontSize: "0.9rem", marginTop: "8px" }}>
                      {project.shortDesc}
                    </p>
                    <div style={{ marginTop: "12px" }}>
                      {project.tech.slice(0, 3).map((tech) => (
                        <span key={tech} className="tech-tag">{tech}</span>
                      ))}
                    </div>
                    <p className="handwritten-sm text-date" style={{ marginTop: "12px", fontSize: "0.85rem" }}>
                      {project.year}
                    </p>
                  </Link>
                </SketchyBox>
              ))}
            </div>
          </div>
        </section>

        {/* Blog */}
        <section id="blog" className="container" style={{ position: "relative" }}>
          <SectionDoodles section="blog" />
          <div>
            <h2 className="section-title">thoughts that escaped the notebook</h2>
            <SketchyDivider width="280px" stroke="var(--pencil)" />
            <p className="margin-note" style={{ marginBottom: "32px" }}>(the loose pages)</p>
            <div className="blog-list">
              {blogPosts.map((post) => (
                <Link
                  key={post.id}
                  href={`/blog/${post.id}`}
                  prefetch={true}
                  className="paper-lift"
                  style={{ padding: "20px", background: "var(--paper-aged)", borderRadius: "4px", display: "block" }}
                >
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                    <div>
                      <h3 className="handwritten" style={{ fontSize: "1.2rem" }}>{post.title}</h3>
                      <p className="text-ink-light" style={{ fontSize: "0.9rem", marginTop: "8px" }}>
                        &quot;{post.excerpt}&quot;
                      </p>
                      <div style={{ marginTop: "12px", display: "flex", gap: "16px" }}>
                        <span className="handwritten-sm text-date">
                          {new Date(post.date).toLocaleDateString("en-US", { month: "short", year: "numeric" })}
                        </span>
                        <span className="handwritten-sm" style={{ color: "var(--ink-light)" }}>
                          {post.readTime}
                        </span>
                        <span style={{ display: "flex", gap: "4px", alignItems: "center" }}>
                          {Array.from({ length: Math.min(post.coffeeCups, 4) }).map((_, i) => (
                            <CoffeeCupIcon key={i} size={14} />
                          ))}
                        </span>
                      </div>
                    </div>
                    <ArrowUpRight size={18} className="text-pencil" />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Contact */}
        <section id="contact" className="container" style={{ position: "relative" }}>
          <SectionDoodles section="contact" />
          <div>
            <h2 className="section-title">say hello</h2>
            <SketchyDivider width="120px" stroke="var(--pencil)" />
            <div style={{ maxWidth: "500px", margin: "32px auto", textAlign: "center" }}>
              <SketchyBox padding={32} roughness={1.5} stroke="var(--link)">
                <p className="handwritten" style={{ fontSize: "1.3rem", marginBottom: "16px" }}>
                  if you're reading this, you made it to the end.
                </p>
                <p className="text-ink-light">that means something. let's make something together.</p>
                <a
                  href={`mailto:${personalInfo.email}`}
                  className="contact-link"
                  style={{ display: "inline-flex", marginTop: "24px", fontSize: "1.4rem" }}
                >
                  <Mail size={20} />
                  <span>{personalInfo.email}</span>
                </a>
                <p className="margin-note" style={{ marginTop: "8px" }}>
                  (weird ideas especially welcome)
                </p>
              </SketchyBox>
              <div className="contact-links" style={{ justifyContent: "center", marginTop: "32px" }}>
                <a href={personalInfo.socialLinks.github} target="_blank" rel="noopener noreferrer" className="contact-link">
                  <Github size={18} /><span>github</span>
                </a>
                <a href={personalInfo.socialLinks.linkedin} target="_blank" rel="noopener noreferrer" className="contact-link">
                  <Linkedin size={18} /><span>linkedin</span>
                </a>
                <a href={personalInfo.socialLinks.twitter} target="_blank" rel="noopener noreferrer" className="contact-link">
                  <Twitter size={18} /><span>twitter</span>
                </a>
              </div>
              <p className="margin-note" style={{ marginTop: "48px", fontSize: "1rem" }}>
                p.s. — thanks for scrolling this far. most people don't. you're cool. — M
              </p>
            </div>
          </div>
        </section>
      </Layout>
  );
}
