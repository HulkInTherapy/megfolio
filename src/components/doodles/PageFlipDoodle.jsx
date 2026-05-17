"use client";

import { getRough } from '@/lib/rough';
import React, { useEffect, useRef, useState } from 'react';

const PageFlipDoodle = ({
  size = 40,
  className = '',
  style = {},
}) => {
  const svgRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);

  const width = size * 1.2;
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

      svg.appendChild(rc.rectangle(width * 0.05, height * 0.1, width * 0.6, height * 0.8, {
        stroke: '#2F3640', strokeWidth: 1.5, roughness: 1.2,
        fill: '#FDFBF7', fillStyle: 'solid',
      }));

      const corner = rc.path(`
        M ${width * 0.65} ${height * 0.1}
        Q ${width * 0.85} ${height * 0.15}, ${width * 0.9} ${height * 0.3}
        L ${width * 0.9} ${height * 0.9}
        L ${width * 0.65} ${height * 0.9}
        Z
      `, {
        stroke: '#2F3640', strokeWidth: 1.5, roughness: 1,
        fill: '#F5EBE0', fillStyle: 'solid',
      });
      corner.classList.add('page-corner');
      svg.appendChild(corner);

      svg.appendChild(rc.line(width * 0.65, height * 0.1, width * 0.65, height * 0.3, {
        stroke: '#2F3640', strokeWidth: 1, roughness: 1,
      }));

      svg.appendChild(rc.line(width * 0.15, height * 0.3, width * 0.55, height * 0.3, {
        stroke: '#718093', strokeWidth: 1, roughness: 1.2,
      }));
      svg.appendChild(rc.line(width * 0.15, height * 0.45, width * 0.55, height * 0.45, {
        stroke: '#718093', strokeWidth: 1, roughness: 1.2,
      }));
      svg.appendChild(rc.line(width * 0.15, height * 0.6, width * 0.4, height * 0.6, {
        stroke: '#718093', strokeWidth: 1, roughness: 1.2,
      }));

      svg.appendChild(rc.path(`
        M ${width * 0.75} ${height * 0.55}
        L ${width * 0.82} ${height * 0.65}
        L ${width * 0.75} ${height * 0.65}
      `, {
        stroke: '#E8A87C', strokeWidth: 1, roughness: 1,
      }));
    });

    return () => { cancelled = true; };
  }, [width, height, size]);

  return (
    <svg
      ref={svgRef}
      width={width}
      height={height}
      className={`dev-doodle pageflip-doodle ${isHovered ? 'hovered' : ''} ${className}`}
      style={{ overflow: 'visible', ...style }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      aria-hidden="true"
    >
      <style>{`
        .pageflip-doodle.hovered .page-corner {
          animation: cornerFlip 0.5s ease-in-out infinite alternate;
          transform-origin: left top;
        }
        @keyframes cornerFlip {
          0% { transform: rotateY(0deg); }
          100% { transform: rotateY(15deg) translateX(-2px); }
        }
      `}</style>
    </svg>
  );
};

export default PageFlipDoodle;
