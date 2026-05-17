"use client";

import { getRough } from '@/lib/rough';
import React, { useEffect, useRef, useState } from 'react';

const BugDoodle = ({
  size = 55,
  className = '',
  style = {},
}) => {
  const svgRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);

  const width = size;
  const height = size * 1.2;

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
      const cy = height * 0.55;

      const antennaLeft = rc.line(cx - 5, height * 0.22, cx - 12, height * 0.08, {
        stroke: '#2F3640', strokeWidth: 1.2, roughness: 1.5,
      });
      antennaLeft.classList.add('antenna-left');
      svg.appendChild(antennaLeft);

      const antennaRight = rc.line(cx + 5, height * 0.22, cx + 12, height * 0.08, {
        stroke: '#2F3640', strokeWidth: 1.2, roughness: 1.5,
      });
      antennaRight.classList.add('antenna-right');
      svg.appendChild(antennaRight);

      svg.appendChild(rc.circle(cx - 12, height * 0.06, 4, {
        stroke: '#CD6853', strokeWidth: 1, fill: '#CD6853', fillStyle: 'solid', roughness: 0.8,
      }));
      svg.appendChild(rc.circle(cx + 12, height * 0.06, 4, {
        stroke: '#CD6853', strokeWidth: 1, fill: '#CD6853', fillStyle: 'solid', roughness: 0.8,
      }));

      for (let i = 0; i < 3; i++) {
        const ly = cy - 8 + i * 8;
        const legLeft = rc.line(cx - width * 0.25, ly, cx - width * 0.45, ly - 4 + i * 2, {
          stroke: '#2F3640', strokeWidth: 1.2, roughness: 1.5,
        });
        legLeft.classList.add(`leg-left-${i}`);
        svg.appendChild(legLeft);

        const legRight = rc.line(cx + width * 0.25, ly, cx + width * 0.45, ly - 4 + i * 2, {
          stroke: '#2F3640', strokeWidth: 1.2, roughness: 1.5,
        });
        legRight.classList.add(`leg-right-${i}`);
        svg.appendChild(legRight);
      }

      svg.appendChild(rc.ellipse(cx, cy, width * 0.5, height * 0.4, {
        stroke: '#2F3640', strokeWidth: 1.5, roughness: 1.2,
        fill: '#7A9E7E', fillStyle: 'hachure', hachureGap: 3,
      }));

      svg.appendChild(rc.line(cx, cy - height * 0.15, cx, cy + height * 0.15, {
        stroke: '#2F3640', strokeWidth: 1, roughness: 1,
      }));

      svg.appendChild(rc.ellipse(cx, height * 0.3, width * 0.3, height * 0.18, {
        stroke: '#2F3640', strokeWidth: 1.5, roughness: 1,
        fill: '#2F3640', fillStyle: 'solid',
      }));

      if (isHovered) {
        const eyeLeft = rc.circle(cx - 5, height * 0.28, 4, {
          stroke: '#FDFBF7', strokeWidth: 1, fill: '#FDFBF7', fillStyle: 'solid', roughness: 0.5,
        });
        eyeLeft.style.animation = 'eyeAppear 0.3s ease-out both';
        svg.appendChild(eyeLeft);

        const eyeRight = rc.circle(cx + 5, height * 0.28, 4, {
          stroke: '#FDFBF7', strokeWidth: 1, fill: '#FDFBF7', fillStyle: 'solid', roughness: 0.5,
        });
        eyeRight.style.animation = 'eyeAppear 0.3s ease-out 0.1s both';
        svg.appendChild(eyeRight);
      }
    });

    return () => { cancelled = true; };
  }, [isHovered, width, height]);

  return (
    <svg
      ref={svgRef}
      width={width}
      height={height}
      className={`dev-doodle bug-doodle ${isHovered ? 'hovered' : ''} ${className}`}
      style={{ overflow: 'visible', ...style }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      aria-hidden="true"
    >
      <style>{`
        .bug-doodle.hovered .antenna-left {
          animation: antennaWiggle 0.4s ease-in-out infinite alternate;
          transform-origin: bottom center;
        }
        .bug-doodle.hovered .antenna-right {
          animation: antennaWiggle 0.4s ease-in-out 0.2s infinite alternate-reverse;
          transform-origin: bottom center;
        }
        .bug-doodle.hovered [class^="leg-left-"] {
          animation: legWiggleLeft 0.3s ease-in-out infinite alternate;
          transform-origin: right center;
        }
        .bug-doodle.hovered [class^="leg-right-"] {
          animation: legWiggleRight 0.3s ease-in-out infinite alternate;
          transform-origin: left center;
        }
        @keyframes antennaWiggle {
          0% { transform: rotate(-5deg); }
          100% { transform: rotate(5deg); }
        }
        @keyframes legWiggleLeft {
          0% { transform: rotate(-3deg); }
          100% { transform: rotate(3deg); }
        }
        @keyframes legWiggleRight {
          0% { transform: rotate(3deg); }
          100% { transform: rotate(-3deg); }
        }
        @keyframes eyeAppear {
          from { opacity: 0; transform: scale(0); }
          to { opacity: 1; transform: scale(1); }
        }
      `}</style>
    </svg>
  );
};

export default BugDoodle;
