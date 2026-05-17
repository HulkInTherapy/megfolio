"use client";

import { useState, useEffect, useCallback, useRef } from 'react';

/**
 * Hook to track scroll progress of the page or a specific element
 * @param {Object} options - Configuration options
 * @param {React.RefObject} options.targetRef - Ref to element to track (optional, tracks page if not provided)
 * @param {number} options.offset - Offset from top before progress starts (default: 0)
 * @returns {Object} Scroll progress information
 */
export const useScrollProgress = ({ targetRef = null, offset = 0 } = {}) => {
  const [progress, setProgress] = useState(0);
  const [scrollY, setScrollY] = useState(0);
  const [direction, setDirection] = useState('down');
  const lastScrollY = useRef(0);

  const handleScroll = useCallback(() => {
    const currentScrollY = window.scrollY;

    // Determine scroll direction
    setDirection(currentScrollY > lastScrollY.current ? 'down' : 'up');
    lastScrollY.current = currentScrollY;
    setScrollY(currentScrollY);

    if (targetRef?.current) {
      // Track progress of specific element
      const element = targetRef.current;
      const rect = element.getBoundingClientRect();
      const elementTop = rect.top + window.scrollY;
      const elementHeight = rect.height;
      const windowHeight = window.innerHeight;

      // Calculate how far through the element we've scrolled
      const scrolledPast = currentScrollY - elementTop + windowHeight - offset;
      const totalScrollDistance = elementHeight + windowHeight;
      const elementProgress = Math.max(0, Math.min(1, scrolledPast / totalScrollDistance));

      setProgress(elementProgress);
    } else {
      // Track overall page progress
      const documentHeight = document.documentElement.scrollHeight;
      const windowHeight = window.innerHeight;
      const maxScroll = documentHeight - windowHeight;
      const pageProgress = maxScroll > 0 ? currentScrollY / maxScroll : 0;

      setProgress(Math.max(0, Math.min(1, pageProgress)));
    }
  }, [targetRef, offset]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial call

    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  return {
    progress,      // 0-1 progress through page/element
    scrollY,       // Current scroll position
    direction,     // 'up' or 'down'
    percentage: Math.round(progress * 100), // 0-100 percentage
  };
};

/**
 * Hook to check if an element is in viewport
 * @param {React.RefObject} ref - Ref to element to observe
 * @param {Object} options - IntersectionObserver options
 * @returns {Object} Visibility state
 */
export const useInViewport = (ref, options = {}) => {
  const [isInView, setIsInView] = useState(false);
  const [hasBeenInView, setHasBeenInView] = useState(false);

  // Destructure options with defaults to avoid dependency issues
  const { threshold = 0.1, rootMargin = '0px' } = options;

  useEffect(() => {
    const element = ref?.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
        if (entry.isIntersecting) {
          setHasBeenInView(true);
        }
      },
      {
        threshold,
        rootMargin,
      }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [ref, threshold, rootMargin]);

  return { isInView, hasBeenInView };
};

/**
 * Hook for parallax-style scroll effects
 * @param {Object} options - Configuration
 * @param {number} options.speed - Parallax speed (0.5 = half speed, 2 = double)
 * @param {string} options.direction - 'vertical' or 'horizontal'
 * @returns {Object} Transform values for parallax
 */
export const useParallax = ({ speed = 0.5, direction = 'vertical' } = {}) => {
  const [offset, setOffset] = useState(0);
  const ref = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!ref.current) return;

      const rect = ref.current.getBoundingClientRect();
      const viewportCenter = window.innerHeight / 2;
      const elementCenter = rect.top + rect.height / 2;
      const distanceFromCenter = elementCenter - viewportCenter;

      setOffset(distanceFromCenter * (1 - speed));
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, [speed]);

  const transform = direction === 'vertical'
    ? `translateY(${offset}px)`
    : `translateX(${offset}px)`;

  return { ref, offset, transform };
};

/**
 * Hook for section-based navigation
 * @param {string[]} sectionIds - Array of section IDs to track
 * @returns {Object} Current section info
 */
export const useSectionProgress = (sectionIds) => {
  const [currentSection, setCurrentSection] = useState(0);
  const [sectionProgress, setSectionProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      const viewportCenter = scrollY + windowHeight / 2;

      for (let i = sectionIds.length - 1; i >= 0; i--) {
        const element = document.getElementById(sectionIds[i]);
        if (element) {
          const rect = element.getBoundingClientRect();
          const elementTop = rect.top + scrollY;

          if (viewportCenter >= elementTop) {
            setCurrentSection(i);

            // Calculate progress within current section
            const elementHeight = rect.height;
            const progressInSection = (viewportCenter - elementTop) / elementHeight;
            setSectionProgress(Math.max(0, Math.min(1, progressInSection)));
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, [sectionIds]);

  return {
    currentSection,
    currentSectionId: sectionIds[currentSection],
    sectionProgress,
    totalSections: sectionIds.length,
  };
};

export default useScrollProgress;
