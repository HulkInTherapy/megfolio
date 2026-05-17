"use client";

import { getRough } from '@/lib/rough';
import React, { useEffect, useRef } from 'react';

const CoffeeCupIcon = ({
  size = 20,
  className = '',
  style = {},
}) => {
  const svgRef = useRef(null);
  const width = size;
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
      const scale = size / 20;

      const cupBody = rc.path(`
        M ${3 * scale} ${6 * scale}
        L ${4 * scale} ${17 * scale}
        Q ${10 * scale} ${19 * scale}, ${16 * scale} ${17 * scale}
        L ${17 * scale} ${6 * scale}
        Z
      `, {
        stroke: '#2F3640',
        strokeWidth: Math.max(1, 1.2 * scale),
        roughness: 0.8,
        fill: '#FDFBF7',
        fillStyle: 'solid',
      });
      svg.appendChild(cupBody);

      const rim = rc.ellipse(10 * scale, 6 * scale, 14 * scale, 4 * scale, {
        stroke: '#2F3640',
        strokeWidth: Math.max(1, 1.2 * scale),
        roughness: 0.6,
        fill: '#E8A87C',
        fillStyle: 'solid',
      });
      svg.appendChild(rim);

      const handle = rc.arc(
        17 * scale, 10 * scale, 6 * scale, 8 * scale,
        -Math.PI / 2, Math.PI / 2, false,
        {
          stroke: '#2F3640',
          strokeWidth: Math.max(1, 1.2 * scale),
          roughness: 0.8,
        }
      );
      svg.appendChild(handle);

      const steam1 = rc.path(`
        M ${8 * scale} ${3 * scale}
        Q ${7 * scale} ${1 * scale}, ${9 * scale} ${0.5 * scale}
      `, { stroke: '#718093', strokeWidth: Math.max(0.8, scale), roughness: 1 });
      svg.appendChild(steam1);

      const steam2 = rc.path(`
        M ${12 * scale} ${3 * scale}
        Q ${13 * scale} ${1 * scale}, ${11 * scale} ${0.5 * scale}
      `, { stroke: '#718093', strokeWidth: Math.max(0.8, scale), roughness: 1 });
      svg.appendChild(steam2);
    });

    return () => { cancelled = true; };
  }, [size, width, height]);

  return (
    <svg
      ref={svgRef}
      width={width}
      height={height}
      className={`coffee-cup-icon ${className}`}
      style={{
        overflow: 'visible',
        display: 'inline-block',
        verticalAlign: 'middle',
        ...style,
      }}
      aria-hidden="true"
    />
  );
};

export default CoffeeCupIcon;
