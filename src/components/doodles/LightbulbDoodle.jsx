"use client";

import { getRough } from '@/lib/rough';
import React, { useEffect, useRef, useState } from 'react';

const LightbulbDoodle = ({
  size = 60,
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
      const bulbTop = height * 0.12;
      const bulbBottom = height * 0.58;
      const bulbW = width * 0.55;

      if (isHovered) {
        const rayConfigs = [
          { angle: -90, length: 12 },
          { angle: -45, length: 10 },
          { angle: 0, length: 12 },
          { angle: -135, length: 10 },
          { angle: 180, length: 12 },
        ];
        rayConfigs.forEach(({ angle, length }, i) => {
          const rad = (angle * Math.PI) / 180;
          const startR = bulbW / 2 + 5;
          const sx = cx + startR * Math.cos(rad);
          const sy = (bulbTop + bulbBottom) / 2 + startR * Math.sin(rad);
          const ray = rc.line(
            sx, sy,
            sx + length * Math.cos(rad), sy + length * Math.sin(rad),
            { stroke: '#E8A87C', strokeWidth: 2, roughness: 1.5 }
          );
          ray.style.animation = `rayAppear 0.3s ease-out ${i * 0.1}s both`;
          svg.appendChild(ray);
        });
      }

      const bulb = rc.path(`
        M ${cx} ${bulbBottom}
        C ${cx - bulbW / 2} ${bulbBottom - 10}, ${cx - bulbW / 2} ${bulbTop + bulbW / 3}, ${cx} ${bulbTop}
        C ${cx + bulbW / 2} ${bulbTop + bulbW / 3}, ${cx + bulbW / 2} ${bulbBottom - 10}, ${cx} ${bulbBottom}
      `, {
        stroke: '#2F3640',
        strokeWidth: 1.5,
        roughness: 1.2,
        fill: isHovered ? '#E8A87C' : '#FDFBF7',
        fillStyle: isHovered ? 'solid' : 'hachure',
        hachureGap: 4,
      });
      svg.appendChild(bulb);

      const baseTop = bulbBottom + 2;
      const baseH = height * 0.22;
      const baseW = bulbW * 0.65;

      svg.appendChild(rc.rectangle(cx - baseW / 2, baseTop, baseW, baseH, {
        stroke: '#2F3640',
        strokeWidth: 1.5,
        roughness: 1,
        fill: '#718093',
        fillStyle: 'zigzag',
        hachureGap: 3,
      }));

      svg.appendChild(rc.polygon([
        [cx - baseW / 3, baseTop + baseH],
        [cx + baseW / 3, baseTop + baseH],
        [cx, baseTop + baseH + 8],
      ], {
        stroke: '#2F3640',
        strokeWidth: 1.5,
        roughness: 1,
        fill: '#718093',
        fillStyle: 'solid',
      }));

      const fy = (bulbTop + bulbBottom) / 2;
      svg.appendChild(rc.path(`
        M ${cx - 8} ${fy + 5}
        Q ${cx - 4} ${fy - 8}, ${cx} ${fy + 3}
        Q ${cx + 4} ${fy - 8}, ${cx + 8} ${fy + 5}
      `, {
        stroke: isHovered ? '#CD6853' : '#718093',
        strokeWidth: 1.5,
        roughness: 1.5,
      }));
    });

    return () => { cancelled = true; };
  }, [isHovered, width, height]);

  return (
    <svg
      ref={svgRef}
      width={width}
      height={height}
      className={`dev-doodle lightbulb-doodle ${className}`}
      style={{
        overflow: 'visible',
        filter: isHovered ? 'drop-shadow(0 0 8px rgba(232, 168, 124, 0.5))' : 'none',
        transition: 'filter 0.3s ease',
        ...style,
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      aria-hidden="true"
    >
      <style>{`
        @keyframes rayAppear {
          from {
            opacity: 0;
            transform: scale(0.5);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
      `}</style>
    </svg>
  );
};

export default LightbulbDoodle;
