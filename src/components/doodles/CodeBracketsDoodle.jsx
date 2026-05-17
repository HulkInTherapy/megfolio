"use client";

import { getRough } from '@/lib/rough';
import React, { useEffect, useRef, useState } from 'react';

const CodeBracketsDoodle = ({
  size = 70,
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
      const bh = height * 0.5;

      svg.appendChild(rc.path(`
        M ${cx - 8} ${cy - bh / 2}
        Q ${cx - 20} ${cy - bh / 2}, ${cx - 22} ${cy}
        Q ${cx - 20} ${cy + bh / 2}, ${cx - 8} ${cy + bh / 2}
      `, {
        stroke: '#8B7EB8', strokeWidth: 2.5, roughness: 1.5,
      }));

      svg.appendChild(rc.path(`
        M ${cx + 8} ${cy - bh / 2}
        Q ${cx + 20} ${cy - bh / 2}, ${cx + 22} ${cy}
        Q ${cx + 20} ${cy + bh / 2}, ${cx + 8} ${cy + bh / 2}
      `, {
        stroke: '#8B7EB8', strokeWidth: 2.5, roughness: 1.5,
      }));

      const lineColors = isHovered
        ? ['#CD6853', '#7A9E7E', '#E8A87C', '#A8C4D9']
        : ['#718093', '#718093', '#718093', '#718093'];

      const lines = [
        { x1: cx - 6, x2: cx + 6, y: cy - 8 },
        { x1: cx - 3, x2: cx + 8, y: cy - 2 },
        { x1: cx - 5, x2: cx + 5, y: cy + 4 },
        { x1: cx - 4, x2: cx + 4, y: cy + 10 },
      ];

      lines.forEach(({ x1, x2, y }, i) => {
        const line = rc.line(x1, y, x2, y, {
          stroke: lineColors[i], strokeWidth: 1.5, roughness: 1,
        });
        if (isHovered) {
          line.style.animation = `fadeIn 0.2s ease-out ${i * 0.1}s both`;
        }
        svg.appendChild(line);
      });
    });

    return () => { cancelled = true; };
  }, [isHovered, width, height]);

  return (
    <svg
      ref={svgRef}
      width={width}
      height={height}
      className={`dev-doodle code-brackets-doodle ${className}`}
      style={{
        overflow: 'visible',
        transform: isHovered ? 'scale(1.05)' : 'scale(1)',
        transition: 'transform 0.3s ease',
        ...style,
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      aria-hidden="true"
    >
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateX(-3px); }
          to { opacity: 1; transform: translateX(0); }
        }
      `}</style>
    </svg>
  );
};

export default CodeBracketsDoodle;
