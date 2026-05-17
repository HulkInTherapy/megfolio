"use client";

import { getRough } from '@/lib/rough';
import React, { useEffect, useRef, useState } from 'react';

const StarBurstDoodle = ({
  size = 35,
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
      const outerR = width * 0.45;
      const innerR = width * 0.2;

      const points = [];
      for (let i = 0; i < 8; i++) {
        const a = (i * Math.PI) / 4;
        points.push([cx + outerR * Math.cos(a), cy + outerR * Math.sin(a)]);
        const a2 = a + Math.PI / 8;
        points.push([cx + innerR * Math.cos(a2), cy + innerR * Math.sin(a2)]);
      }

      const star = rc.polygon(points, {
        stroke: '#E8A87C', strokeWidth: 1.5, roughness: 1.5,
        fill: '#E8A87C', fillStyle: 'solid',
      });
      star.classList.add('star-main');
      svg.appendChild(star);

      svg.appendChild(rc.circle(cx, cy, width * 0.15, {
        stroke: '#CD6853', strokeWidth: 1, roughness: 0.8,
        fill: '#CD6853', fillStyle: 'solid',
      }));

      const sparkleAngles = [0, Math.PI / 2, Math.PI, Math.PI * 1.5];
      sparkleAngles.forEach((angle) => {
        const sx = cx + (outerR + 4) * Math.cos(angle);
        const sy = cy + (outerR + 4) * Math.sin(angle);
        const ray = rc.line(sx, sy, sx + 5 * Math.cos(angle), sy + 5 * Math.sin(angle), {
          stroke: '#E8A87C', strokeWidth: 1, roughness: 1.5,
        });
        ray.classList.add('sparkle-ray');
        svg.appendChild(ray);
      });
    });

    return () => { cancelled = true; };
  }, [width, height, size]);

  return (
    <svg
      ref={svgRef}
      width={width}
      height={height}
      className={`dev-doodle starburst-doodle ${isHovered ? 'hovered' : ''} ${className}`}
      style={{ overflow: 'visible', ...style }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      aria-hidden="true"
    >
      <style>{`
        .starburst-doodle.hovered .star-main {
          animation: starPulse 0.6s ease-in-out infinite;
          transform-origin: center center;
        }
        .starburst-doodle.hovered .sparkle-ray {
          animation: rayPulse 0.4s ease-in-out infinite alternate;
        }
        @keyframes starPulse {
          0%, 100% { transform: scale(1) rotate(0deg); }
          50% { transform: scale(1.1) rotate(5deg); }
        }
        @keyframes rayPulse {
          0% { opacity: 0.5; }
          100% { opacity: 1; }
        }
      `}</style>
    </svg>
  );
};

export default StarBurstDoodle;
