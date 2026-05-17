"use client";

import React, { useState, useEffect, useRef } from 'react';

/**
 * ReadingProgress - A reading progress indicator bar
 * Shows how far the user has scrolled through the article content
 * Inspired by Medium, Substack, and other premium reading experiences
 */
const ReadingProgress = ({ contentRef, color = 'var(--spark)' }) => {
  const [progress, setProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const calculateProgress = () => {
      if (!contentRef?.current) return;

      const element = contentRef.current;
      const elementTop = element.offsetTop;
      const elementHeight = element.offsetHeight;
      const windowHeight = window.innerHeight;
      const scrollY = window.scrollY;

      // Start tracking when user scrolls past the article start
      const startOffset = elementTop - windowHeight * 0.2;
      // End when user reaches the article end
      const endOffset = elementTop + elementHeight - windowHeight * 0.8;

      if (scrollY < startOffset) {
        setProgress(0);
        setIsVisible(false);
      } else if (scrollY >= endOffset) {
        setProgress(100);
        setIsVisible(true);
      } else {
        const progressValue = ((scrollY - startOffset) / (endOffset - startOffset)) * 100;
        setProgress(Math.min(100, Math.max(0, progressValue)));
        setIsVisible(true);
      }
    };

    // Initial calculation
    calculateProgress();

    // Throttled scroll handler for performance
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          calculateProgress();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', calculateProgress, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', calculateProgress);
    };
  }, [contentRef]);

  return (
    <>
      <div
        className={`reading-progress-container ${isVisible ? 'visible' : ''}`}
        role="progressbar"
        aria-valuenow={Math.round(progress)}
        aria-valuemin="0"
        aria-valuemax="100"
        aria-label="Reading progress"
      >
        <div
          className="reading-progress-bar"
          style={{
            width: `${progress}%`,
            backgroundColor: color
          }}
        />
      </div>

      <style>{`
        .reading-progress-container {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          height: 3px;
          background: transparent;
          z-index: 1000;
          opacity: 0;
          transition: opacity 0.3s ease;
        }

        .reading-progress-container.visible {
          opacity: 1;
        }

        .reading-progress-bar {
          height: 100%;
          border-radius: 0 2px 2px 0;
          transition: width 0.1s ease-out;
          box-shadow: 0 0 8px rgba(var(--spark-rgb, 232, 126, 80), 0.4);
        }

        /* Add subtle glow effect at the end */
        .reading-progress-bar::after {
          content: '';
          position: absolute;
          right: 0;
          top: 0;
          width: 40px;
          height: 100%;
          background: linear-gradient(to right, transparent, currentColor);
          opacity: 0.6;
        }
      `}</style>
    </>
  );
};

export default ReadingProgress;
