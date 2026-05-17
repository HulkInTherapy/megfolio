"use client";

import { getRough } from '@/lib/rough';
import React, { useEffect, useRef, useState } from 'react';

const ThoughtBubbleDoodle = ({
  size = 45,
  className = '',
  style = {},
}) => {
  const svgRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);

  const width = size * 1.3;
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
      const cy = height * 0.4;

      svg.appendChild(rc.ellipse(cx - width * 0.12, cy - 2, width * 0.45, height * 0.42, {
        stroke: '#2F3640', strokeWidth: 1.5, roughness: 1.5,
        fill: '#FDFBF7', fillStyle: 'solid',
      }));
      svg.appendChild(rc.ellipse(cx + width * 0.12, cy - 2, width * 0.45, height * 0.42, {
        stroke: '#2F3640', strokeWidth: 1.5, roughness: 1.5,
        fill: '#FDFBF7', fillStyle: 'solid',
      }));
      svg.appendChild(rc.ellipse(cx, cy - height * 0.1, width * 0.5, height * 0.35, {
        stroke: '#2F3640', strokeWidth: 1.5, roughness: 1.5,
        fill: '#FDFBF7', fillStyle: 'solid',
      }));
      svg.appendChild(rc.ellipse(cx, cy + height * 0.05, width * 0.55, height * 0.3, {
        stroke: '#2F3640', strokeWidth: 1.5, roughness: 1.5,
        fill: '#FDFBF7', fillStyle: 'solid',
      }));

      const trailPositions = [
        { x: cx - width * 0.15, y: height * 0.72, size: 6 },
        { x: cx - width * 0.22, y: height * 0.82, size: 5 },
        { x: cx - width * 0.28, y: height * 0.9, size: 4 },
      ];
      trailPositions.forEach(({ x, y, size: s }, i) => {
        const dot = rc.circle(x, y, s, {
          stroke: '#2F3640', strokeWidth: 1, roughness: 1,
          fill: '#FDFBF7', fillStyle: 'solid',
        });
        dot.classList.add('thought-dot');
        dot.style.animationDelay = `${i * 0.15}s`;
        svg.appendChild(dot);
      });

      svg.appendChild(rc.line(cx - width * 0.2, cy, cx + width * 0.2, cy, {
        stroke: '#718093', strokeWidth: 1, roughness: 1.2,
      }));
      svg.appendChild(rc.line(cx - width * 0.15, cy + 6, cx + width * 0.15, cy + 6, {
        stroke: '#718093', strokeWidth: 1, roughness: 1.2,
      }));

      svg.appendChild(rc.polygon([
        [cx + width * 0.15, cy - 8],
        [cx + width * 0.2, cy - 4],
        [cx + width * 0.12, cy - 4],
      ], {
        stroke: '#E8A87C', strokeWidth: 1, roughness: 1,
        fill: '#E8A87C', fillStyle: 'solid',
      }));
    });

    return () => { cancelled = true; };
  }, [width, height]);

  return (
    <svg
      ref={svgRef}
      width={width}
      height={height}
      className={`dev-doodle thought-bubble-doodle ${isHovered ? 'hovered' : ''} ${className}`}
      style={{ overflow: 'visible', ...style }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      aria-hidden="true"
    >
      <style>{`
        .thought-bubble-doodle.hovered {
          animation: thoughtFloat 1s ease-in-out infinite;
        }
        .thought-bubble-doodle.hovered .thought-dot {
          animation: dotBounce 0.6s ease-in-out infinite alternate;
        }
        @keyframes thoughtFloat {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-4px); }
        }
        @keyframes dotBounce {
          0% { transform: scale(1); }
          100% { transform: scale(1.3); }
        }
      `}</style>
    </svg>
  );
};

export default ThoughtBubbleDoodle;
