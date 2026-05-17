"use client";

import { getRough } from '@/lib/rough';
import React, { useEffect, useRef, useState } from 'react';

const PaperClipDoodle = ({
  size = 25,
  className = '',
  style = {},
}) => {
  const svgRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);

  const width = size;
  const height = size * 2;

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
        M ${cx + 3} ${height * 0.15}
        L ${cx + 3} ${height * 0.8}
        Q ${cx + 3} ${height * 0.95}, ${cx} ${height * 0.95}
        Q ${cx - 5} ${height * 0.95}, ${cx - 5} ${height * 0.8}
        L ${cx - 5} ${height * 0.25}
        Q ${cx - 5} ${height * 0.12}, ${cx} ${height * 0.12}
        Q ${cx + 3} ${height * 0.12}, ${cx + 3} ${height * 0.15}
      `, {
        stroke: '#718093', strokeWidth: 1.5, roughness: 1.2,
      }));

      svg.appendChild(rc.path(`
        M ${cx + 1} ${height * 0.2}
        L ${cx + 1} ${height * 0.75}
        Q ${cx + 1} ${height * 0.88}, ${cx - 1} ${height * 0.88}
        Q ${cx - 3} ${height * 0.88}, ${cx - 3} ${height * 0.75}
        L ${cx - 3} ${height * 0.28}
      `, {
        stroke: '#718093', strokeWidth: 1, roughness: 1,
      }));

      svg.appendChild(rc.line(cx + 2, height * 0.18, cx + 2, height * 0.35, {
        stroke: '#A8C4D9', strokeWidth: 0.8, roughness: 0.8,
      }));
    });

    return () => { cancelled = true; };
  }, [width, height]);

  return (
    <svg
      ref={svgRef}
      width={width}
      height={height}
      className={`dev-doodle paperclip-doodle ${className}`}
      style={{
        overflow: 'visible',
        transform: isHovered ? 'rotate(15deg)' : 'rotate(0deg)',
        transition: 'transform 0.3s ease',
        ...style,
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      aria-hidden="true"
    />
  );
};

export default PaperClipDoodle;
