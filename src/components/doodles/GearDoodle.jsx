"use client";

import { getRough } from '@/lib/rough';
import React, { useEffect, useRef, useState } from 'react';

const GearDoodle = ({
  size = 60,
  className = '',
  style = {},
}) => {
  const svgRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);
  const width = size;
  const height = size;

  useEffect(() => {
    const svg = svgRef.current;
    if (!svg) return;

    let cancelled = false;
    getRough().then(rough => {
      if (cancelled) return;

      while (svg.firstChild) {
        svg.removeChild(svg.firstChild);
      }

      const rc = rough.svg(svg);
      const cx = width / 2;
      const cy = height / 2;
      const outerR = width * 0.38;
      const innerR = width * 0.22;
      const teeth = 8;

      const points = [];
      for (let i = 0; i < teeth; i++) {
        const a1 = (i * 2 * Math.PI) / teeth - 0.15;
        const a2 = (i * 2 * Math.PI) / teeth + 0.15;
        const a3 = ((i + 0.5) * 2 * Math.PI) / teeth - 0.15;
        const a4 = ((i + 0.5) * 2 * Math.PI) / teeth + 0.15;
        points.push([cx + outerR * Math.cos(a1), cy + outerR * Math.sin(a1)]);
        points.push([cx + outerR * Math.cos(a2), cy + outerR * Math.sin(a2)]);
        points.push([cx + innerR * Math.cos(a3), cy + innerR * Math.sin(a3)]);
        points.push([cx + innerR * Math.cos(a4), cy + innerR * Math.sin(a4)]);
      }

      svg.appendChild(rc.polygon(points, {
        stroke: '#2F3640',
        strokeWidth: 1.5,
        roughness: 1.2,
        fill: '#718093',
        fillStyle: 'hachure',
        hachureGap: 4,
      }));

      svg.appendChild(rc.circle(cx, cy, innerR * 0.7, {
        stroke: '#2F3640',
        strokeWidth: 1.5,
        roughness: 1,
        fill: '#FDFBF7',
        fillStyle: 'solid',
      }));

      svg.appendChild(rc.line(cx - innerR * 0.2, cy, cx + innerR * 0.2, cy, {
        stroke: '#2F3640', strokeWidth: 1, roughness: 0.8,
      }));
      svg.appendChild(rc.line(cx, cy - innerR * 0.2, cx, cy + innerR * 0.2, {
        stroke: '#2F3640', strokeWidth: 1, roughness: 0.8,
      }));
    });

    return () => { cancelled = true; };
  }, [width, height]);

  return (
    <svg
      ref={svgRef}
      width={width}
      height={height}
      className={`dev-doodle gear-doodle ${className}`}
      style={{
        overflow: 'visible',
        transform: isHovered ? 'rotate(45deg)' : 'rotate(0deg)',
        transition: 'transform 0.6s ease',
        ...style,
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      aria-hidden="true"
    />
  );
};

export default GearDoodle;
