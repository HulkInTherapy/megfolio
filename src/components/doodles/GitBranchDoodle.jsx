"use client";

import { getRough } from '@/lib/rough';
import React, { useEffect, useRef, useState } from 'react';

const GitBranchDoodle = ({
  size = 70,
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
      const startX = width * 0.3;
      const startY = height * 0.85;

      svg.appendChild(rc.line(startX, startY, startX, height * 0.15, {
        stroke: '#2F3640', strokeWidth: 2, roughness: 1,
      }));

      svg.appendChild(rc.path(`
        M ${startX} ${height * 0.5}
        Q ${startX + 10} ${height * 0.45}, ${width * 0.65} ${height * 0.35}
      `, {
        stroke: '#7A9E7E', strokeWidth: 2, roughness: 1.5,
      }));

      const commitPositions = [
        { x: startX, y: height * 0.15, color: '#A8C4D9', stroke: '#2F3640' },
        { x: startX, y: height * 0.35, color: '#A8C4D9', stroke: '#2F3640' },
        { x: startX, y: height * 0.55, color: '#A8C4D9', stroke: '#2F3640' },
        { x: startX, y: startY, color: '#E8A87C', stroke: '#2F3640' },
        { x: width * 0.65, y: height * 0.35, color: '#7A9E7E', stroke: '#7A9E7E' },
        { x: width * 0.65, y: height * 0.5, color: '#7A9E7E', stroke: '#7A9E7E' },
      ];

      commitPositions.forEach(({ x, y, color, stroke }, i) => {
        const commit = rc.circle(x, y, 8, {
          stroke, strokeWidth: 1.5, fill: color, fillStyle: 'solid', roughness: 0.8,
        });
        if (isHovered) {
          commit.style.animation = `pulse 1s ease-in-out ${i * 0.15}s infinite`;
        }
        svg.appendChild(commit);
      });

      if (isHovered) {
        const mainLabel = document.createElementNS('http://www.w3.org/2000/svg', 'text');
        mainLabel.setAttribute('x', startX - 2);
        mainLabel.setAttribute('y', height * 0.08);
        mainLabel.setAttribute('font-size', '8');
        mainLabel.setAttribute('fill', '#2F3640');
        mainLabel.setAttribute('font-family', 'monospace');
        mainLabel.setAttribute('text-anchor', 'middle');
        mainLabel.textContent = 'main';
        mainLabel.style.animation = 'fadeIn 0.3s ease-out both';
        svg.appendChild(mainLabel);

        const featureLabel = document.createElementNS('http://www.w3.org/2000/svg', 'text');
        featureLabel.setAttribute('x', width * 0.65);
        featureLabel.setAttribute('y', height * 0.27);
        featureLabel.setAttribute('font-size', '8');
        featureLabel.setAttribute('fill', '#7A9E7E');
        featureLabel.setAttribute('font-family', 'monospace');
        featureLabel.setAttribute('text-anchor', 'middle');
        featureLabel.textContent = 'feature';
        featureLabel.style.animation = 'fadeIn 0.3s ease-out 0.1s both';
        svg.appendChild(featureLabel);
      }
    });

    return () => { cancelled = true; };
  }, [isHovered, width, height]);

  return (
    <svg
      ref={svgRef}
      width={width}
      height={height}
      className={`dev-doodle git-branch-doodle ${className}`}
      style={{ overflow: 'visible', ...style }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      aria-hidden="true"
    >
      <style>{`
        @keyframes pulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.3); }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
      `}</style>
    </svg>
  );
};

export default GitBranchDoodle;
