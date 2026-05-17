"use client";

import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, ArrowRight, ExternalLink } from 'lucide-react';
import Layout from '../components/Layout';
import { SketchyBox, SketchyDivider } from '../components/sketchy';
import { ScrollDoodle, WrenchDoodle, StarBurstDoodle, PageFlipDoodle } from '../components/doodles';

const useScrollReveal = (threshold = 0.1) => {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [threshold]);

  return [ref, isVisible];
};

const ProjectDetail = ({ project, nextProject, currentIndex }) => {
  const [ref, isVisible] = useScrollReveal();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [project.id]);

  if (!project) {
    return (
      <Layout>
        <section className="container" style={{ minHeight: '60vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
          <h1 className="handwritten-lg">oops... page not found</h1>
          <p className="margin-note" style={{ marginTop: '16px' }}>
            (I probably moved it and forgot to update the link)
          </p>
          <Link href="/" className="contact-link" style={{ marginTop: '32px' }}>
            <ArrowLeft size={16} />
            <span>back to the notebook</span>
          </Link>
        </section>
      </Layout>
    );
  }

  return (
    <Layout>
      <section className="container">
        <div ref={ref} className={`reveal ${isVisible ? 'visible' : ''}`}>
          <Link href="/#projects" className="contact-link" style={{ marginBottom: '32px', display: 'inline-flex' }}>
            <ArrowLeft size={16} />
            <span>back to projects</span>
          </Link>

          <div style={{ marginTop: '24px' }}>
            <span className="handwritten-sm text-pencil">
              project {String(currentIndex + 1).padStart(2, '0')} &bull; {project.year}
            </span>
            <h1 className="handwritten-lg" style={{ marginTop: '8px', marginBottom: '8px' }}>
              {project.title}
            </h1>
            <SketchyDivider width="200px" stroke="var(--pencil)" />
            <p className="handwritten text-spark" style={{ fontSize: '1.2rem', marginTop: '16px' }}>
              &ldquo;{project.shortDesc}&rdquo;
            </p>
          </div>

          <div style={{ marginTop: '48px' }}>
            <SketchyBox padding={24} roughness={1} stroke="var(--pencil)">
              <h2 className="handwritten" style={{ fontSize: '1.3rem', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '12px' }}>
                <ScrollDoodle size={35} />
                the story
              </h2>
              <div style={{ whiteSpace: 'pre-line', lineHeight: '1.8' }}>
                {project.fullDesc}
              </div>
              {project.marginNote && (
                <p className="margin-note" style={{ marginTop: '24px' }}>
                  {project.marginNote}
                </p>
              )}
            </SketchyBox>
          </div>

          <div style={{ marginTop: '32px' }}>
            <h2 className="handwritten" style={{ fontSize: '1.2rem', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '10px' }}>
              <WrenchDoodle size={30} />
              tools I used
            </h2>
            <div>
              {project.tech.map((tech) => (
                <span key={tech} className="tech-tag">
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {project.insight && (
            <div style={{ marginTop: '32px' }}>
              <SketchyBox padding={20} roughness={1.5} stroke="var(--spark)">
                <p className="handwritten-sm text-pencil" style={{ marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <StarBurstDoodle size={24} />
                  key insight:
                </p>
                <p className="handwritten text-spark" style={{ fontSize: '1.1rem' }}>
                  &ldquo;{project.insight}&rdquo;
                </p>
              </SketchyBox>
            </div>
          )}

          {project.link && (
            <div style={{ marginTop: '32px' }}>
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="contact-link"
                style={{ fontSize: '1.1rem' }}
              >
                <span>view the code</span>
                <ExternalLink size={16} />
              </a>
            </div>
          )}

          <div style={{ marginTop: '64px', paddingTop: '32px', borderTop: '2px dashed var(--pencil)' }}>
            <span className="handwritten-sm text-pencil" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <PageFlipDoodle size={28} />
              next up:
            </span>
            <Link href={`/project/${nextProject.id}`} prefetch={true} className="paper-lift" style={{ display: 'flex', alignItems: 'center', gap: '12px', marginTop: '12px' }}>
              <span className="handwritten-lg">{nextProject.title}</span>
              <ArrowRight size={24} className="text-spark" />
            </Link>
            <p className="margin-note" style={{ marginTop: '8px' }}>
              (click to flip the page)
            </p>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default ProjectDetail;
