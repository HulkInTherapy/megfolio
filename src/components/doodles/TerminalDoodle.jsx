"use client";

import { getRough } from '@/lib/rough';
import React, { useEffect, useRef, useState } from 'react';

const TerminalDoodle = ({
  size = 80,
  className = '',
  style = {},
}) => {
  const svgRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);

  const width = size;
  const height = size * 0.75;

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
      const p = 4;

      svg.appendChild(rc.rectangle(p, p, width - p * 2, height - p * 2, {
        stroke: '#2F3640', strokeWidth: 1.5, roughness: 1.2,
        fill: '#718093', fillStyle: 'solid',
      }));

      svg.appendChild(rc.rectangle(p, p, width - p * 2, 14, {
        stroke: '#2F3640', strokeWidth: 1, roughness: 0.8,
        fill: '#2F3640', fillStyle: 'solid',
      }));

      const btnY = p + 7;
      svg.appendChild(rc.circle(p + 10, btnY, 5, {
        stroke: '#CD6853', strokeWidth: 1, fill: '#CD6853', fillStyle: 'solid', roughness: 0.5,
      }));
      svg.appendChild(rc.circle(p + 22, btnY, 5, {
        stroke: '#E8A87C', strokeWidth: 1, fill: '#E8A87C', fillStyle: 'solid', roughness: 0.5,
      }));
      svg.appendChild(rc.circle(p + 34, btnY, 5, {
        stroke: '#7A9E7E', strokeWidth: 1, fill: '#7A9E7E', fillStyle: 'solid', roughness: 0.5,
      }));

      const cy = p + 22;
      svg.appendChild(rc.line(p + 8, cy, p + 14, cy + 4, {
        stroke: '#7A9E7E', strokeWidth: 1.5, roughness: 1,
      }));
      svg.appendChild(rc.line(p + 8, cy + 8, p + 14, cy + 4, {
        stroke: '#7A9E7E', strokeWidth: 1.5, roughness: 1,
      }));

      const cursor = rc.line(p + 20, cy, p + 20, cy + 10, {
        stroke: '#E8A87C', strokeWidth: 2, roughness: 0.5,
      });
      cursor.classList.add('terminal-cursor');
      svg.appendChild(cursor);

      if (isHovered) {
        const textLine1 = rc.line(p + 24, cy + 2, p + 50, cy + 2, {
          stroke: '#A8C4D9', strokeWidth: 1.5, roughness: 1,
        });
        textLine1.style.animation = 'fadeIn 0.3s ease-out both';
        svg.appendChild(textLine1);

        const textLine2 = rc.line(p + 8, cy + 16, p + 42, cy + 16, {
          stroke: '#7A9E7E', strokeWidth: 1.5, roughness: 1,
        });
        textLine2.style.animation = 'fadeIn 0.3s ease-out 0.15s both';
        svg.appendChild(textLine2);

        const prompt2ChevY = cy + 24;
        svg.appendChild(rc.line(p + 8, prompt2ChevY, p + 14, prompt2ChevY + 4, {
          stroke: '#7A9E7E', strokeWidth: 1.5, roughness: 1,
        }));
        svg.appendChild(rc.line(p + 8, prompt2ChevY + 8, p + 14, prompt2ChevY + 4, {
          stroke: '#7A9E7E', strokeWidth: 1.5, roughness: 1,
        }));
      }
    });

    return () => { cancelled = true; };
  }, [isHovered, width, height]);

  return (
    <svg
      ref={svgRef}
      width={width}
      height={height}
      className={`dev-doodle terminal-doodle ${className}`}
      style={{ overflow: 'visible', ...style }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      aria-hidden="true"
    >
      <style>{`
        .terminal-cursor {
          animation: cursorBlink 1s step-end infinite;
        }
        @keyframes cursorBlink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
      `}</style>
    </svg>
  );
};

export default TerminalDoodle;
