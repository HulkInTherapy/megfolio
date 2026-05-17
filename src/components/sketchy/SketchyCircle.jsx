"use client";

import React, { useEffect, useRef } from 'react';
import { getRough } from '@/lib/rough';




/**
 * SketchyCircle - A hand-drawn circle component using Rough.js
 * Creates an imperfect, sketchy circle that feels hand-drawn
 */
const SketchyCircle = ({
  size = 100,
  cx,
  cy,
  roughness = 1.5,
  bowing = 1,
  stroke = '#2C2C2C',
  strokeWidth = 1.5,
  fill = 'none',
  fillStyle = 'hachure',
  hachureGap = 4,
  animate = false,
  animationDuration = 1.5,
  animationDelay = 0,
  className = '',
  style = {},
  ...props
}) => {
  const svgRef = useRef(null);
  const padding = 10;
  const diameter = size;
  const svgSize = diameter + padding * 2;
  const centerX = cx ?? svgSize / 2;
  const centerY = cy ?? svgSize / 2;

  useEffect(() => {
    const svg = svgRef.current;
    if (!svg) return;

    let cancelled = false;
    let container = null;

    getRough().then(rough => {
      if (cancelled || !svg) return;

      const rc = rough.svg(svg);
      const circle = rc.circle(centerX, centerY, diameter, {
        roughness,
        bowing,
        stroke,
        strokeWidth,
        fill,
        fillStyle,
        hachureGap,
      });

      container = document.createElementNS('http://www.w3.org/2000/svg', 'g');
      container.appendChild(circle);

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
          path.style.animation = `sketchyCircleDraw ${animationDuration}s ease ${animationDelay}s forwards`;
        });
      }
    });

    return () => {
      cancelled = true;
      if (svg && container && container.parentNode === svg) {
        svg.removeChild(container);
      }
    };
  }, [centerX, centerY, diameter, roughness, bowing, stroke, strokeWidth, fill, fillStyle, hachureGap, animate, animationDuration, animationDelay]);

  return (
    <>
      <svg
        ref={svgRef}
        width={svgSize}
        height={svgSize}
        viewBox={`0 0 ${svgSize} ${svgSize}`}
        className={`sketchy-circle ${className}`}
        style={{
          overflow: 'visible',
          ...style,
        }}
        {...props}
      />
      <style>{`
        @keyframes sketchyCircleDraw {
          to {
            stroke-dashoffset: 0;
          }
        }
      `}</style>
    </>
  );
};

/**
 * SketchyEllipse - A hand-drawn ellipse component
 */
export const SketchyEllipse = ({
  width = 100,
  height = 60,
  roughness = 1.5,
  bowing = 1,
  stroke = '#2C2C2C',
  strokeWidth = 1.5,
  fill = 'none',
  fillStyle = 'hachure',
  animate = false,
  animationDuration = 1.5,
  className = '',
  style = {},
}) => {
  const svgRef = useRef(null);
  const padding = 10;
  const svgWidth = width + padding * 2;
  const svgHeight = height + padding * 2;

  useEffect(() => {
    const svg = svgRef.current;
    if (!svg) return;

    let cancelled = false;
    let container = null;

    getRough().then(rough => {
      if (cancelled || !svg) return;

      const rc = rough.svg(svg);
      const ellipse = rc.ellipse(svgWidth / 2, svgHeight / 2, width, height, {
        roughness,
        bowing,
        stroke,
        strokeWidth,
        fill,
        fillStyle,
      });

      container = document.createElementNS('http://www.w3.org/2000/svg', 'g');
      container.appendChild(ellipse);

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
          path.style.animation = `sketchyCircleDraw ${animationDuration}s ease forwards`;
        });
      }
    });

    return () => {
      cancelled = true;
      if (svg && container && container.parentNode === svg) {
        svg.removeChild(container);
      }
    };
  }, [width, height, roughness, bowing, stroke, strokeWidth, fill, fillStyle, animate, animationDuration, svgWidth, svgHeight]);

  return (
    <svg
      ref={svgRef}
      width={svgWidth}
      height={svgHeight}
      viewBox={`0 0 ${svgWidth} ${svgHeight}`}
      className={`sketchy-ellipse ${className}`}
      style={{ overflow: 'visible', ...style }}
    />
  );
};

/**
 * SketchyHighlight - A circular highlight/emphasis marker
 */
export const SketchyHighlight = ({
  children,
  color = '#C4956A',
  roughness = 2,
  strokeWidth = 2,
  padding = 8,
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
      const width = rect.width + padding * 2;
      const height = rect.height + padding * 2;

      const highlight = rc.ellipse(width / 2, height / 2, width, height, {
        roughness,
        stroke: color,
        strokeWidth,
        fill: 'none',
      });

      container = document.createElementNS('http://www.w3.org/2000/svg', 'g');
      container.appendChild(highlight);

      while (svg.firstChild) {
        svg.removeChild(svg.firstChild);
      }
      svg.appendChild(container);
    });

    return () => {
      cancelled = true;
      if (svg && container && container.parentNode === svg) {
        svg.removeChild(container);
      }
    };
  }, [color, roughness, strokeWidth, padding, children]);

  return (
    <span
      ref={containerRef}
      className={`sketchy-highlight ${className}`}
      style={{ position: 'relative', display: 'inline-block' }}
    >
      {children}
      <svg
        ref={svgRef}
        style={{
          position: 'absolute',
          top: -padding,
          left: -padding,
          width: `calc(100% + ${padding * 2}px)`,
          height: `calc(100% + ${padding * 2}px)`,
          pointerEvents: 'none',
          overflow: 'visible',
        }}
      />
    </span>
  );
};

/**
 * SketchyBullet - A hand-drawn bullet point
 */
export const SketchyBullet = ({
  size = 8,
  color = '#2C2C2C',
  filled = true,
  className = '',
  style = {},
}) => {
  const svgRef = useRef(null);

  useEffect(() => {
    const svg = svgRef.current;
    if (!svg) return;

    let cancelled = false;
    let container = null;

    getRough().then(rough => {
      if (cancelled || !svg) return;

      const rc = rough.svg(svg);
      const padding = 4;
      const centerX = size / 2 + padding;
      const centerY = size / 2 + padding;

      const bullet = rc.circle(centerX, centerY, size, {
        roughness: 1,
        stroke: color,
        strokeWidth: 1,
        fill: filled ? color : 'none',
        fillStyle: 'solid',
      });

      container = document.createElementNS('http://www.w3.org/2000/svg', 'g');
      container.appendChild(bullet);

      while (svg.firstChild) {
        svg.removeChild(svg.firstChild);
      }
      svg.appendChild(container);
    });

    return () => {
      cancelled = true;
      if (svg && container && container.parentNode === svg) {
        svg.removeChild(container);
      }
    };
  }, [size, color, filled]);

  return (
    <svg
      ref={svgRef}
      width={size + 8}
      height={size + 8}
      className={`sketchy-bullet ${className}`}
      style={{ display: 'inline-block', verticalAlign: 'middle', ...style }}
    />
  );
};

export default SketchyCircle;
