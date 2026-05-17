"use client";

import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import Layout from '../components/Layout';
import { SketchyBox, SketchyDivider } from '../components/sketchy';
import { QuillDoodle, BookmarkDoodle, PaperClipDoodle, ThoughtBubbleDoodle, CoffeeCupIcon, CoffeeCupDoodle } from '../components/doodles';

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

const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};

const ContentRenderer = React.memo(({ content }) => {
  const lines = content.split('\n');
  const elements = [];
  let currentParagraph = [];

  const flushParagraph = () => {
    if (currentParagraph.length > 0) {
      elements.push(
        <p key={`p-${elements.length}`} style={{ marginBottom: '16px', lineHeight: '1.8' }}>
          {currentParagraph.join('\n')}
        </p>
      );
      currentParagraph = [];
    }
  };

  lines.forEach((line, index) => {
    const trimmed = line.trim();

    if (trimmed.startsWith('## ')) {
      flushParagraph();
      elements.push(
        <h2 key={`h2-${index}`} className="handwritten" style={{ fontSize: '1.4rem', marginTop: '32px', marginBottom: '16px' }}>
          {trimmed.replace('## ', '')}
        </h2>
      );
    }
    else if (trimmed.startsWith('### ')) {
      flushParagraph();
      elements.push(
        <h3 key={`h3-${index}`} className="handwritten" style={{ fontSize: '1.2rem', marginTop: '24px', marginBottom: '12px' }}>
          {trimmed.replace('### ', '')}
        </h3>
      );
    }
    else if (trimmed.startsWith('> ')) {
      flushParagraph();
      elements.push(
        <blockquote key={`quote-${index}`} style={{
          margin: '24px 0',
          padding: '16px 20px',
          borderLeft: '3px solid var(--spark)',
          background: 'var(--paper-aged)',
          fontStyle: 'italic',
        }}>
          &ldquo;{trimmed.replace('> ', '').replace(/"/g, '')}&rdquo;
        </blockquote>
      );
    }
    else if (trimmed.startsWith('- ') || trimmed.startsWith('**')) {
      flushParagraph();
      const text = trimmed.replace('- ', '').replace(/\*\*/g, '');
      elements.push(
        <li key={`li-${index}`} style={{ marginLeft: '24px', marginBottom: '8px', lineHeight: '1.6' }}>
          {text}
        </li>
      );
    }
    else if (trimmed === '') {
      flushParagraph();
    }
    else {
      currentParagraph.push(line);
    }
  });

  flushParagraph();
  return <div>{elements}</div>;
});

const BlogDetail = ({ post, relatedPosts }) => {
  const [ref, isVisible] = useScrollReveal();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [post.id]);

  if (!post) {
    return (
      <Layout>
        <section className="container" style={{ minHeight: '60vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
          <h1 className="handwritten-lg">hmm... can&apos;t find that post</h1>
          <p className="margin-note" style={{ marginTop: '16px' }}>
            (maybe I deleted it during a 3am cleanup)
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
      <article className="container" style={{ paddingTop: '70px' }}>
        <div ref={ref} className={`reveal ${isVisible ? 'visible' : ''}`}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '32px' }}>
            <Link href="/#blog" className="contact-link" style={{ display: 'inline-flex' }}>
              <ArrowLeft size={16} />
              <span>back to thoughts</span>
            </Link>
            <QuillDoodle size={45} />
          </div>

          <header>
            <time className="handwritten-sm text-pencil">
              {formatDate(post.date)}
            </time>
            <h1 className="handwritten-lg" style={{ marginTop: '8px', marginBottom: '8px' }}>
              {post.title}
            </h1>
            <SketchyDivider width="200px" stroke="var(--pencil)" />
            <div style={{ marginTop: '16px', display: 'flex', gap: '16px', alignItems: 'center' }}>
              <span className="handwritten-sm text-pencil">{post.readTime}</span>
              <span style={{ display: 'flex', gap: '4px', alignItems: 'center' }}>
                {Array.from({ length: Math.min(post.coffeeCups, 4) }).map((_, i) => (
                  <CoffeeCupIcon key={i} size={16} />
                ))}
              </span>
            </div>
          </header>

          <div style={{ marginTop: '32px' }}>
            <SketchyBox padding={24} roughness={1} stroke="var(--spark)">
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                <ThoughtBubbleDoodle size={35} />
                <p className="handwritten text-spark" style={{ fontSize: '1.1rem', flex: 1 }}>
                  &ldquo;{post.excerpt}&rdquo;
                </p>
              </div>
            </SketchyBox>
          </div>

          <div style={{ marginTop: '32px' }}>
            <ContentRenderer content={post.content} />
          </div>

          {post.marginNotes && post.marginNotes.length > 0 && (
            <div style={{ marginTop: '32px' }}>
              <SketchyBox padding={20} roughness={1.5} stroke="var(--pencil)">
                <p className="handwritten-sm text-pencil" style={{ marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <PaperClipDoodle size={20} />
                  margin scribbles:
                </p>
                {post.marginNotes.map((note) => (
                  <p key={note.id} className="margin-note" style={{ marginBottom: '8px' }}>
                    &mdash; {note.content}
                  </p>
                ))}
              </SketchyBox>
            </div>
          )}

          <div style={{ marginTop: '48px', textAlign: 'center' }}>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '12px' }}>
              <CoffeeCupDoodle size={35} />
              <p className="handwritten" style={{ fontSize: '1.3rem' }}>
                thanks for reading!
              </p>
            </div>
            <p className="margin-note" style={{ marginTop: '8px' }}>
              → found this useful? let me know at hello@meghavi.dev
            </p>
          </div>

          {relatedPosts.length > 0 && (
            <div style={{ marginTop: '48px', paddingTop: '32px', borderTop: '2px dashed var(--pencil)' }}>
              <p className="handwritten-sm text-pencil" style={{ marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <BookmarkDoodle size={24} />
                more thoughts:
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {relatedPosts.map((relatedPost) => (
                  <Link
                    key={relatedPost.id}
                    href={relatedPost.link}
                    prefetch={true}
                    className="paper-lift"
                    style={{
                      padding: '16px',
                      background: 'var(--paper-aged)',
                      borderRadius: '4px',
                    }}
                  >
                    <h3 className="handwritten" style={{ fontSize: '1.1rem' }}>
                      {relatedPost.title}
                    </h3>
                    <p className="text-ink-light" style={{ fontSize: '0.9rem', marginTop: '4px' }}>
                      {relatedPost.readTime}
                    </p>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </article>
    </Layout>
  );
};

export default BlogDetail;
