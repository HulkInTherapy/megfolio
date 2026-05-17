"use client";

import { getRough } from '@/lib/rough';
import React, { useEffect, useRef, useState } from 'react';

const WrenchDoodle = ({
  size = 40,
  className = '',
  style = {},
}) => {
  const svgRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);

  const width = size;
  const height = size * 1.3;

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
        M ${cx - 12} ${height * 0.1}
        Q ${cx - 15} ${height * 0.02}, ${cx} ${height * 0.02}
        Q ${cx + 15} ${height * 0.02}, ${cx + 12} ${height * 0.1}
        L ${cx + 12} ${height * 0.35}
        L ${cx + 4} ${height * 0.35}
        L ${cx + 4} ${height * 0.2}
        Q ${cx} ${height * 0.15}, ${cx - 4} ${height * 0.2}
        L ${cx - 4} ${height * 0.35}
        L ${cx - 12} ${height * 0.35}
        Z
      `, {
        stroke: '#2F3640', strokeWidth: 1.5, roughness: 1.2,
        fill: '#B0B0B0', fillStyle: 'solid',
      }));

      svg.appendChild(rc.line(cx - 12, height * 0.35, cx + 12, height * 0.35, {
        stroke: '#2F3640', strokeWidth: 1, roughness: 0.8,
      }));

      svg.appendChild(rc.rectangle(cx - 4, height * 0.35, 8, height * 0.55, {
        stroke: '#2F3640', strokeWidth: 1.5, roughness: 1,
        fill: '#718093', fillStyle: 'solid',
      }));

      for (let i = 0; i < 3; i++) {
        const gy = height * 0.5 + i * (height * 0.12);
        svg.appendChild(rc.line(cx - 3, gy, cx + 3, gy, {
          stroke: '#2F3640', strokeWidth: 1, roughness: 1,
        }));
      }
    });

    return () => { cancelled = true; };
  }, [width, height]);

  return (
    <svg
      ref={svgRef}
      width={width}
      height={height}
      className={`dev-doodle wrench-doodle ${className}`}
      style={{
        overflow: 'visible',
        transform: isHovered ? 'rotate(-15deg)' : 'rotate(0deg)',
        transition: 'transform 0.3s ease',
        ...style,
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      aria-hidden="true"
    />
  );
};

export default WrenchDoodle;
