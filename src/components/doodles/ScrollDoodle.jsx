"use client";

import { getRough } from '@/lib/rough';
import React, { useEffect, useRef, useState } from 'react';

const ScrollDoodle = ({
  size = 50,
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

      svg.appendChild(rc.rectangle(width * 0.15, height * 0.1, width * 0.7, height * 0.8, {
        stroke: '#2F3640', strokeWidth: 1.5, roughness: 1.2,
        fill: '#F5EBE0', fillStyle: 'solid',
      }));

      const curlLeft = rc.path(`
        M ${width * 0.15} ${height * 0.1}
        Q ${width * 0.05} ${height * 0.1}, ${width * 0.08} ${height * 0.25}
        L ${width * 0.15} ${height * 0.25}
      `, {
        stroke: '#2F3640', strokeWidth: 1.5, roughness: 1,
        fill: '#E8A87C', fillStyle: 'solid',
      });
      curlLeft.classList.add('scroll-curl-left');
      svg.appendChild(curlLeft);

      const curlRight = rc.path(`
        M ${width * 0.85} ${height * 0.9}
        Q ${width * 0.95} ${height * 0.9}, ${width * 0.92} ${height * 0.75}
        L ${width * 0.85} ${height * 0.75}
      `, {
        stroke: '#2F3640', strokeWidth: 1.5, roughness: 1,
        fill: '#E8A87C', fillStyle: 'solid',
      });
      curlRight.classList.add('scroll-curl-right');
      svg.appendChild(curlRight);

      for (let i = 0; i < 4; i++) {
        const ly = height * 0.28 + i * (height * 0.14);
        const lineWidth = i === 3 ? width * 0.35 : width * 0.5;
        svg.appendChild(rc.line(width * 0.25, ly, width * 0.25 + lineWidth, ly, {
          stroke: '#718093', strokeWidth: 1, roughness: 1.2,
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
      className={`dev-doodle scroll-doodle ${isHovered ? 'hovered' : ''} ${className}`}
      style={{ overflow: 'visible', ...style }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      aria-hidden="true"
    >
      <style>{`
        .scroll-doodle.hovered .scroll-curl-left {
          animation: curlFlutterLeft 0.5s ease-in-out infinite alternate;
          transform-origin: right center;
        }
        .scroll-doodle.hovered .scroll-curl-right {
          animation: curlFlutterRight 0.5s ease-in-out 0.2s infinite alternate;
          transform-origin: left center;
        }
        @keyframes curlFlutterLeft {
          0% { transform: rotate(0deg) scaleX(1); }
          100% { transform: rotate(-3deg) scaleX(1.1); }
        }
        @keyframes curlFlutterRight {
          0% { transform: rotate(0deg) scaleX(1); }
          100% { transform: rotate(3deg) scaleX(1.1); }
        }
      `}</style>
    </svg>
  );
};

export default ScrollDoodle;
