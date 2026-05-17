"use client";

import { getRough } from '@/lib/rough';
import React, { useEffect, useRef, useState } from 'react';

const CoffeeCupDoodle = ({
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
      const centerX = width / 2;
      const cupTop = height * 0.35;
      const cupBottom = height * 0.78;
      const cupWidth = width * 0.55;

      if (isHovered) {
        const steamPaths = [
          `M ${centerX - 8} ${cupTop - 5} Q ${centerX - 12} ${cupTop - 18}, ${centerX - 6} ${cupTop - 30} Q ${centerX - 2} ${cupTop - 40}, ${centerX - 8} ${cupTop - 50}`,
          `M ${centerX} ${cupTop - 8} Q ${centerX + 5} ${cupTop - 20}, ${centerX - 2} ${cupTop - 32} Q ${centerX + 3} ${cupTop - 42}, ${centerX} ${cupTop - 55}`,
          `M ${centerX + 8} ${cupTop - 5} Q ${centerX + 12} ${cupTop - 15}, ${centerX + 6} ${cupTop - 28} Q ${centerX + 10} ${cupTop - 38}, ${centerX + 5} ${cupTop - 48}`,
        ];

        steamPaths.forEach((path, i) => {
          const steam = rc.path(path, {
            stroke: '#718093',
            strokeWidth: 1.5,
            roughness: 2,
            fill: 'none',
          });
          steam.style.opacity = '0';
          steam.style.animation = `steamRise 2s ease-in-out ${i * 0.3}s infinite`;
          svg.appendChild(steam);
        });
      }

      const cup = rc.path(`
        M ${centerX - cupWidth / 2} ${cupTop}
        L ${centerX - cupWidth / 2 + 5} ${cupBottom}
        Q ${centerX} ${cupBottom + 5}, ${centerX + cupWidth / 2 - 5} ${cupBottom}
        L ${centerX + cupWidth / 2} ${cupTop}
        L ${centerX - cupWidth / 2} ${cupTop}
      `, {
        stroke: '#2F3640',
        strokeWidth: 1.5,
        roughness: 1.2,
        fill: '#E8A87C',
        fillStyle: 'hachure',
        hachureGap: 4,
      });
      svg.appendChild(cup);

      const coffeeTop = rc.ellipse(centerX, cupTop + 3, cupWidth - 4, 10, {
        stroke: '#2F3640',
        strokeWidth: 1,
        roughness: 1,
        fill: '#8B6B4B',
        fillStyle: 'solid',
      });
      svg.appendChild(coffeeTop);

      const handleStartY = cupTop + 10;
      const handleEndY = cupBottom - 15;
      const handle = rc.path(`
        M ${centerX + cupWidth / 2 - 2} ${handleStartY}
        Q ${centerX + cupWidth / 2 + 18} ${handleStartY + 5},
          ${centerX + cupWidth / 2 + 18} ${(handleStartY + handleEndY) / 2}
        Q ${centerX + cupWidth / 2 + 18} ${handleEndY - 5},
          ${centerX + cupWidth / 2 - 2} ${handleEndY}
      `, {
        stroke: '#2F3640',
        strokeWidth: 2,
        roughness: 1.5,
        fill: 'none',
      });
      svg.appendChild(handle);

      const saucerY = cupBottom + 8;
      const saucer = rc.ellipse(centerX, saucerY, width * 0.75, 14, {
        stroke: '#2F3640',
        strokeWidth: 1.5,
        roughness: 1,
        fill: '#D5CEC4',
        fillStyle: 'solid',
      });
      svg.appendChild(saucer);

      const decoration = rc.line(
        centerX - cupWidth / 4,
        cupTop + 15,
        centerX + cupWidth / 4,
        cupTop + 15,
        {
          stroke: '#CD6853',
          strokeWidth: 1.5,
          roughness: 1.5,
        }
      );
      svg.appendChild(decoration);
    });

    return () => { cancelled = true; };
  }, [isHovered, width, height]);

  return (
    <svg
      ref={svgRef}
      width={width}
      height={height}
      className={`dev-doodle coffee-cup-doodle ${className}`}
      style={{
        overflow: 'visible',
        ...style,
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      aria-hidden="true"
    >
      <style>{`
        @keyframes steamRise {
          0% {
            opacity: 0;
            transform: translateY(0) scaleY(0.8);
          }
          20% {
            opacity: 0.6;
          }
          80% {
            opacity: 0.4;
          }
          100% {
            opacity: 0;
            transform: translateY(-15px) scaleY(1.2);
          }
        }
      `}</style>
    </svg>
  );
};

export default CoffeeCupDoodle;
