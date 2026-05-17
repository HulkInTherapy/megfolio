"use client";

import { getRough } from '@/lib/rough';
import React, { useEffect, useRef, useState } from 'react';

const QuillDoodle = ({
  size = 50,
  className = '',
  style = {},
}) => {
  const svgRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);

  const width = size;
  const height = size * 1.6;

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
        M ${cx} ${height * 0.05}
        Q ${cx + width * 0.35} ${height * 0.15}, ${cx + width * 0.1} ${height * 0.7}
        L ${cx} ${height * 0.95}
        L ${cx - width * 0.1} ${height * 0.7}
        Q ${cx - width * 0.35} ${height * 0.15}, ${cx} ${height * 0.05}
      `, {
        stroke: '#2F3640', strokeWidth: 1.5, roughness: 1.2,
        fill: '#FDFBF7', fillStyle: 'solid',
      }));

      svg.appendChild(rc.line(cx, height * 0.3, cx, height * 0.8, {
        stroke: '#718093', strokeWidth: 1, roughness: 1,
      }));

      svg.appendChild(rc.path(`
        M ${cx} ${height * 0.8}
        L ${cx - 2} ${height * 0.95}
        L ${cx} ${height * 0.85}
        L ${cx + 2} ${height * 0.95}
        Z
      `, {
        stroke: '#2F3640', strokeWidth: 1, roughness: 0.8,
        fill: '#2F3640', fillStyle: 'solid',
      }));

      const barbOffsets = [0.25, 0.35, 0.45, 0.55];
      barbOffsets.forEach((yFrac) => {
        const y = height * yFrac;
        svg.appendChild(rc.line(cx, y, cx + width * 0.2, y - 5, {
          stroke: '#718093', strokeWidth: 0.8, roughness: 1.2,
        }));
        svg.appendChild(rc.line(cx, y, cx - width * 0.2, y - 5, {
          stroke: '#718093', strokeWidth: 0.8, roughness: 1.2,
        }));
      });

      if (isHovered) {
        const inkDrip = rc.ellipse(cx, height * 0.98, 5, 3, {
          stroke: '#2F3640', strokeWidth: 1, roughness: 0.8,
          fill: '#2F3640', fillStyle: 'solid',
        });
        inkDrip.classList.add('ink-drip');
        svg.appendChild(inkDrip);
      }
    });

    return () => { cancelled = true; };
  }, [isHovered, width, height]);

  return (
    <svg
      ref={svgRef}
      width={width}
      height={height}
      className={`dev-doodle quill-doodle ${className}`}
      style={{
        overflow: 'visible',
        transform: 'rotate(25deg)',
        ...style,
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      aria-hidden="true"
    >
      <style>{`
        .ink-drip {
          animation: inkDrip 0.5s ease-out both;
        }
        @keyframes inkDrip {
          0% { opacity: 0; transform: translateY(-3px) scale(0.5); }
          60% { opacity: 1; transform: translateY(2px) scale(1.1); }
          100% { opacity: 1; transform: translateY(0) scale(1); }
        }
      `}</style>
    </svg>
  );
};

export default QuillDoodle;
