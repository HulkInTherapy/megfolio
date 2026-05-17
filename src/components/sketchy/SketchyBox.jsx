"use client";

import React, { useEffect, useRef, useState, useId } from 'react';

import { getRough } from '@/lib/rough';



/**
 * SketchyBox - A hand-drawn rectangle/box component using Rough.js
 * Creates an imperfect, sketchy border that feels hand-drawn
 */
const SketchyBox = ({
  children,
  width = '100%',
  height = 'auto',
  padding = 20,
  roughness = 1.5,
  bowing = 1,
  stroke = '#2C2C2C',
  strokeWidth = 1.5,
  fill = 'none',
  fillStyle = 'hachure',
  hachureGap = 4,
  className = '',
  style = {},
  animate = false,
  animationDuration = 1.5,
  ...props
}) => {
  const containerRef = useRef(null);
  const svgRef = useRef(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [pathData, setPathData] = useState('');
  const instanceId = useId();

  // Update dimensions when container size changes
  useEffect(() => {
    const updateDimensions = () => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        setDimensions({ width: rect.width, height: rect.height });
      }
    };

    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    return () => window.removeEventListener('resize', updateDimensions);
  }, [children]);

  useEffect(() => {
    const svg = svgRef.current;

    if (dimensions.width <= 0 || dimensions.height <= 0 || !svg) {
      return;
    }

    let cancelled = false;
    let container = null;

    getRough().then(rough => {
      if (cancelled || !svg) return;

      const rc = rough.svg(svg);
      const margin = strokeWidth + 2;

      const rectangle = rc.rectangle(
        margin,
        margin,
        dimensions.width - margin * 2,
        dimensions.height - margin * 2,
        {
          roughness,
          bowing,
          stroke,
          strokeWidth,
          fill,
          fillStyle,
          hachureGap,
        }
      );

      const paths = rectangle.querySelectorAll('path');
      let allPaths = '';
      paths.forEach(path => {
        allPaths += path.getAttribute('d') + ' ';
      });
      setPathData(allPaths);

      container = document.createElementNS('http://www.w3.org/2000/svg', 'g');
      container.setAttribute('data-sketchy-id', instanceId);
      container.appendChild(rectangle);

      while (svg.firstChild) {
        svg.removeChild(svg.firstChild);
      }
      svg.appendChild(container);

      if (animate) {
        const pathElements = svg.querySelectorAll('path');
        pathElements.forEach(path => {
          const length = path.getTotalLength();
          path.style.strokeDasharray = length;
          path.style.strokeDashoffset = length;
          path.style.animation = `sketchyDraw ${animationDuration}s ease forwards`;
        });
      }
    });

    return () => {
      cancelled = true;
      if (svg && container && container.parentNode === svg) {
        try {
          svg.removeChild(container);
        } catch (e) {
        }
      }
    };
  }, [dimensions, roughness, bowing, stroke, strokeWidth, fill, fillStyle, hachureGap, animate, animationDuration, instanceId]);

  return (
    <div
      ref={containerRef}
      className={`sketchy-box ${className}`}
      style={{
        position: 'relative',
        width,
        height,
        padding,
        ...style,
      }}
      {...props}
    >
      <svg
        ref={svgRef}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          pointerEvents: 'none',
          overflow: 'visible',
        }}
      />
      <div style={{ position: 'relative', zIndex: 1 }}>
        {children}
      </div>
      <style>{`
        @keyframes sketchyDraw {
          to {
            stroke-dashoffset: 0;
          }
        }
      `}</style>
    </div>
  );
};

export default SketchyBox;
