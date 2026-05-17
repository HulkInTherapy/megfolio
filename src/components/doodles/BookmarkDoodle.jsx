"use client";

import { getRough } from '@/lib/rough';
import React, { useEffect, useRef, useState } from 'react';

const BookmarkDoodle = ({
  size = 30,
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

      const ribbon = rc.path(`
        M ${width * 0.15} ${height * 0.05}
        L ${width * 0.85} ${height * 0.05}
        L ${width * 0.85} ${height * 0.9}
        L ${width * 0.5} ${height * 0.7}
        L ${width * 0.15} ${height * 0.9}
        Z
      `, {
        stroke: '#CD6853', strokeWidth: 1.5, roughness: 1.2,
        fill: '#CD6853', fillStyle: 'solid',
      });
      ribbon.classList.add('bookmark-ribbon');
      svg.appendChild(ribbon);

      svg.appendChild(rc.line(width * 0.3, height * 0.2, width * 0.7, height * 0.2, {
        stroke: '#FDFBF7', strokeWidth: 1, roughness: 1,
      }));
      svg.appendChild(rc.line(width * 0.3, height * 0.35, width * 0.65, height * 0.35, {
        stroke: '#FDFBF7', strokeWidth: 1, roughness: 1,
      }));
    });

    return () => { cancelled = true; };
  }, [width, height]);

  return (
    <svg
      ref={svgRef}
      width={width}
      height={height}
      className={`dev-doodle bookmark-doodle ${isHovered ? 'hovered' : ''} ${className}`}
      style={{ overflow: 'visible', ...style }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      aria-hidden="true"
    >
      <style>{`
        .bookmark-doodle.hovered .bookmark-ribbon {
          animation: ribbonSway 0.5s ease-in-out infinite alternate;
          transform-origin: top center;
        }
        @keyframes ribbonSway {
          0% { transform: rotate(-3deg); }
          100% { transform: rotate(3deg); }
        }
      `}</style>
    </svg>
  );
};

export default BookmarkDoodle;
