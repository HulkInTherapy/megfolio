"use client";

import React, { useEffect, useRef } from 'react';
import { getRough } from '@/lib/rough';




/**
 * SketchyLine - A hand-drawn line component using Rough.js
 * Creates an imperfect, wobbly line that feels hand-drawn
 */
const SketchyLine = ({
  x1 = 0,
  y1 = 0,
  x2 = 100,
  y2 = 0,
  roughness = 1.5,
  bowing = 1,
  stroke = '#2C2C2C',
  strokeWidth = 1.5,
  animate = false,
  animationDuration = 1,
  animationDelay = 0,
  className = '',
  style = {},
  ...props
}) => {
  const svgRef = useRef(null);

  // Calculate SVG dimensions with padding
  const padding = 10;
  const minX = Math.min(x1, x2) - padding;
  const minY = Math.min(y1, y2) - padding;
  const width = Math.abs(x2 - x1) + padding * 2;
  const height = Math.max(Math.abs(y2 - y1), 20) + padding * 2;

  // Adjust coordinates for the SVG viewBox
  const adjustedX1 = x1 - minX;
  const adjustedY1 = y1 - minY;
  const adjustedX2 = x2 - minX;
  const adjustedY2 = y2 - minY;

  useEffect(() => {
    const svg = svgRef.current;
    if (!svg) return;

    let cancelled = false;
    let container = null;

    getRough().then(rough => {
      if (cancelled || !svg) return;

      const rc = rough.svg(svg);
      const line = rc.line(adjustedX1, adjustedY1, adjustedX2, adjustedY2, {
        roughness,
        bowing,
        stroke,
        strokeWidth,
      });

      container = document.createElementNS('http://www.w3.org/2000/svg', 'g');
      container.appendChild(line);

      while (svg.firstChild) {
        svg.removeChild(svg.firstChild);
      }
      svg.appendChild(container);

      if (animate) {
        const paths = svg.querySelectorAll('path');
        paths.forEach(path => {
          const length = path.getTotalLength();
          path.style.strokeDasharray = length;
          path.style.strokeDashoffset = length;
          path.style.animation = `sketchyLineDraw ${animationDuration}s ease ${animationDelay}s forwards`;
        });
      }
    });

    return () => {
      cancelled = true;
      if (svg && container && container.parentNode === svg) {
        svg.removeChild(container);
      }
    };
  }, [adjustedX1, adjustedY1, adjustedX2, adjustedY2, roughness, bowing, stroke, strokeWidth, animate, animationDuration, animationDelay]);

  return (
    <>
      <svg
        ref={svgRef}
        width={width}
        height={height}
        viewBox={`0 0 ${width} ${height}`}
        className={`sketchy-line ${className}`}
        style={{
          overflow: 'visible',
          ...style,
        }}
        {...props}
      />
      <style>{`
        @keyframes sketchyLineDraw {
          to {
            stroke-dashoffset: 0;
          }
        }
      `}</style>
    </>
  );
};

/**
 * SketchyDivider - A horizontal divider line with sketchy style
 */
export const SketchyDivider = ({
  width = '100%',
  roughness = 1,
  stroke = '#9B9B9B',
  strokeWidth = 1,
  animate = false,
  className = '',
  style = {},
}) => {
  const containerRef = useRef(null);
  const svgRef = useRef(null);

  useEffect(() => {
    const svg = svgRef.current;
    if (!containerRef.current || !svg) return;

    let cancelled = false;
    let container = null;
    const containerWidth = containerRef.current.offsetWidth;

    getRough().then(rough => {
      if (cancelled || !svg) return;

      const rc = rough.svg(svg);
      const line = rc.line(0, 10, containerWidth, 10, {
        roughness,
        stroke,
        strokeWidth,
        bowing: 0.5,
      });

      container = document.createElementNS('http://www.w3.org/2000/svg', 'g');
      container.appendChild(line);

      while (svg.firstChild) {
        svg.removeChild(svg.firstChild);
      }
      svg.appendChild(container);

      if (animate) {
        const paths = svg.querySelectorAll('path');
        paths.forEach(path => {
          const length = path.getTotalLength();
          path.style.strokeDasharray = length;
          path.style.strokeDashoffset = length;
          path.style.animation = 'sketchyLineDraw 1s ease forwards';
        });
      }
    });

    return () => {
      cancelled = true;
      if (svg && container && container.parentNode === svg) {
        svg.removeChild(container);
      }
    };
  }, [roughness, stroke, strokeWidth, animate]);

  return (
    <div
      ref={containerRef}
      className={`sketchy-divider ${className}`}
      style={{ width, ...style }}
    >
      <svg
        ref={svgRef}
        width="100%"
        height="20"
        style={{ overflow: 'visible' }}
      />
    </div>
  );
};

/**
 * SketchyUnderline - An underline that appears to be hand-drawn
 */
export const SketchyUnderline = ({
  children,
  color = '#C4956A',
  strokeWidth = 2,
  roughness = 0.8,
  animate = false,
  className = '',
}) => {
  const containerRef = useRef(null);
  const svgRef = useRef(null);

  useEffect(() => {
    const svg = svgRef.current;
    if (!containerRef.current || !svg) return;

    let cancelled = false;
    let container = null;
    const rect = containerRef.current.getBoundingClientRect();

    getRough().then(rough => {
      if (cancelled || !svg) return;

      const rc = rough.svg(svg);
      const y = rect.height - 2;
      const line = rc.line(0, y, rect.width, y, {
        roughness,
        stroke: color,
        strokeWidth,
        bowing: 0.3,
      });

      container = document.createElementNS('http://www.w3.org/2000/svg', 'g');
      container.appendChild(line);

      while (svg.firstChild) {
        svg.removeChild(svg.firstChild);
      }
      svg.appendChild(container);

      if (animate) {
        const paths = svg.querySelectorAll('path');
        paths.forEach(path => {
          const length = path.getTotalLength();
          path.style.strokeDasharray = length;
          path.style.strokeDashoffset = length;
          path.style.animation = 'sketchyLineDraw 0.6s ease forwards';
        });
      }
    });

    return () => {
      cancelled = true;
      if (svg && container && container.parentNode === svg) {
        svg.removeChild(container);
      }
    };
  }, [color, strokeWidth, roughness, animate, children]);

  return (
    <span
      ref={containerRef}
      className={`sketchy-underline-wrapper ${className}`}
      style={{ position: 'relative', display: 'inline-block' }}
    >
      {children}
      <svg
        ref={svgRef}
        style={{
          position: 'absolute',
          bottom: -4,
          left: 0,
          width: '100%',
          height: '100%',
          pointerEvents: 'none',
          overflow: 'visible',
        }}
      />
    </span>
  );
};

export default SketchyLine;
