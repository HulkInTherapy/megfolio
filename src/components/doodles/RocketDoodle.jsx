"use client";

import { getRough } from '@/lib/rough';
import React, { useEffect, useRef, useState } from 'react';

const RocketDoodle = ({
  size = 55,
  className = '',
  style = {},
}) => {
  const svgRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);

  const width = size;
  const height = size * 1.4;

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

      svg.appendChild(rc.path(`
        M ${cx - width * 0.2} ${height * 0.5}
        Q ${cx - width * 0.4} ${height * 0.55}, ${cx - width * 0.35} ${height * 0.7}
        L ${cx - width * 0.15} ${height * 0.6}
      `, {
        stroke: '#2F3640', strokeWidth: 1.5, roughness: 1,
        fill: '#CD6853', fillStyle: 'solid',
      }));

      svg.appendChild(rc.path(`
        M ${cx + width * 0.2} ${height * 0.5}
        Q ${cx + width * 0.4} ${height * 0.55}, ${cx + width * 0.35} ${height * 0.7}
        L ${cx + width * 0.15} ${height * 0.6}
      `, {
        stroke: '#2F3640', strokeWidth: 1.5, roughness: 1,
        fill: '#CD6853', fillStyle: 'solid',
      }));

      svg.appendChild(rc.path(`
        M ${cx} ${height * 0.05}
        Q ${cx + width * 0.25} ${height * 0.25}, ${cx + width * 0.2} ${height * 0.6}
        L ${cx - width * 0.2} ${height * 0.6}
        Q ${cx - width * 0.25} ${height * 0.25}, ${cx} ${height * 0.05}
      `, {
        stroke: '#2F3640', strokeWidth: 1.5, roughness: 1.2,
        fill: '#FDFBF7', fillStyle: 'solid',
      }));

      svg.appendChild(rc.ellipse(cx, height * 0.35, width * 0.2, width * 0.2, {
        stroke: '#2F3640', strokeWidth: 1.5, roughness: 1,
        fill: '#A8C4D9', fillStyle: 'solid',
      }));

      svg.appendChild(rc.circle(cx - 2, height * 0.33, 3, {
        stroke: '#FDFBF7', strokeWidth: 0.5, roughness: 0.5,
        fill: '#FDFBF7', fillStyle: 'solid',
      }));

      svg.appendChild(rc.line(cx - width * 0.12, height * 0.18, cx + width * 0.12, height * 0.18, {
        stroke: '#CD6853', strokeWidth: 1.5, roughness: 1,
      }));

      svg.appendChild(rc.line(cx - width * 0.18, height * 0.6, cx + width * 0.18, height * 0.6, {
        stroke: '#2F3640', strokeWidth: 1, roughness: 1,
      }));

      if (isHovered) {
        const flamePaths = [
          `M ${cx - 6} ${height * 0.62} Q ${cx - 8} ${height * 0.72}, ${cx - 3} ${height * 0.85}`,
          `M ${cx} ${height * 0.62} Q ${cx + 3} ${height * 0.75}, ${cx} ${height * 0.9}`,
          `M ${cx + 6} ${height * 0.62} Q ${cx + 8} ${height * 0.72}, ${cx + 3} ${height * 0.85}`,
        ];
        flamePaths.forEach((path, i) => {
          const flame = rc.path(path, {
            stroke: i === 1 ? '#E8A87C' : '#CD6853',
            strokeWidth: 2,
            roughness: 2,
            fill: 'none',
          });
          flame.style.animation = `flameFlicker 0.4s ease-in-out ${i * 0.1}s infinite alternate`;
          svg.appendChild(flame);
        });
      }
    });

    return () => { cancelled = true; };
  }, [isHovered, width, height]);

  return (
    <svg
      ref={svgRef}
      width={width}
      height={height}
      className={`dev-doodle rocket-doodle ${className}`}
      style={{
        overflow: 'visible',
        transform: isHovered ? 'translateY(-8px)' : 'translateY(0)',
        transition: 'transform 0.3s ease',
        ...style,
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      aria-hidden="true"
    >
      <style>{`
        @keyframes flameFlicker {
          0% { opacity: 0.6; transform: scaleY(0.9); }
          100% { opacity: 1; transform: scaleY(1.1); }
        }
      `}</style>
    </svg>
  );
};

export default RocketDoodle;
