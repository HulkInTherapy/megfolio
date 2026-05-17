"use client";

import React, { useEffect, useRef, useState } from 'react';
import { getRough } from '@/lib/rough';




/**
 * SketchyButton - A hand-drawn button component using Rough.js
 * Creates an imperfect, sketchy button that feels hand-drawn
 */
const SketchyButton = ({
  children,
  onClick,
  variant = 'default', // 'default', 'primary', 'ghost'
  size = 'medium', // 'small', 'medium', 'large'
  roughness = 1.2,
  bowing = 0.8,
  disabled = false,
  animate = true,
  className = '',
  style = {},
  ...props
}) => {
  const buttonRef = useRef(null);
  const svgRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  // Size configurations
  const sizeConfig = {
    small: { padding: '8px 16px', fontSize: '0.875rem' },
    medium: { padding: '12px 24px', fontSize: '1rem' },
    large: { padding: '16px 32px', fontSize: '1.125rem' },
  };

  // Variant configurations
  const variantConfig = {
    default: {
      stroke: '#2C2C2C',
      fill: 'none',
      textColor: '#2C2C2C',
      hoverFill: '#F5F0E6',
    },
    primary: {
      stroke: '#C4956A',
      fill: '#C4956A',
      textColor: '#FDFBF7',
      hoverFill: '#9B7350',
    },
    ghost: {
      stroke: '#9B9B9B',
      fill: 'none',
      textColor: '#6B6B6B',
      hoverFill: 'none',
    },
  };

  const config = variantConfig[variant] || variantConfig.default;
  const sizeStyles = sizeConfig[size] || sizeConfig.medium;

  useEffect(() => {
    const updateDimensions = () => {
      if (buttonRef.current) {
        const rect = buttonRef.current.getBoundingClientRect();
        setDimensions({ width: rect.width, height: rect.height });
      }
    };

    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    return () => window.removeEventListener('resize', updateDimensions);
  }, [children, size]);

  useEffect(() => {
    const svg = svgRef.current;
    if (dimensions.width <= 0 || dimensions.height <= 0 || !svg) return;

    let cancelled = false;
    let container = null;

    getRough().then(rough => {
      if (cancelled || !svg) return;

      const rc = rough.svg(svg);
      const margin = 2;

      const rectangle = rc.rectangle(
        margin,
        margin,
        dimensions.width - margin * 2,
        dimensions.height - margin * 2,
        {
          roughness,
          bowing,
          stroke: config.stroke,
          strokeWidth: 1.5,
          fill: config.fill,
          fillStyle: config.fill !== 'none' ? 'solid' : 'hachure',
        }
      );

      container = document.createElementNS('http://www.w3.org/2000/svg', 'g');
      container.appendChild(rectangle);

      while (svg.firstChild) {
        svg.removeChild(svg.firstChild);
      }
      svg.appendChild(container);

      if (animate) {
        const paths = svg.querySelectorAll('path');
        paths.forEach((path, index) => {
          if (index === 0) {
            const length = path.getTotalLength();
            path.style.strokeDasharray = length;
            path.style.strokeDashoffset = length;
            path.style.animation = 'sketchyButtonDraw 0.8s ease forwards';
          }
        });
      }
    });

    return () => {
      cancelled = true;
      if (svg && container && container.parentNode === svg) {
        svg.removeChild(container);
      }
    };
  }, [dimensions, roughness, bowing, config, animate]);

  return (
    <button
      ref={buttonRef}
      onClick={onClick}
      disabled={disabled}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`sketchy-button-wrapper ${className}`}
      style={{
        position: 'relative',
        ...sizeStyles,
        background: 'transparent',
        border: 'none',
        fontFamily: "'Syne', sans-serif",
        fontWeight: 500,
        color: config.textColor,
        cursor: disabled ? 'not-allowed' : 'pointer',
        opacity: disabled ? 0.5 : 1,
        transition: 'transform 0.2s ease, color 0.2s ease',
        transform: isHovered ? 'translateY(-2px)' : 'translateY(0)',
        ...style,
      }}
      {...props}
    >
      <svg
        ref={svgRef}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          pointerEvents: 'none',
          overflow: 'visible',
        }}
      />
      <span style={{ position: 'relative', zIndex: 1 }}>
        {children}
      </span>
      <style>{`
        @keyframes sketchyButtonDraw {
          to {
            stroke-dashoffset: 0;
          }
        }
        .sketchy-button-wrapper:hover svg {
          filter: brightness(0.92);
        }
        .sketchy-button-wrapper:active {
          transform: translateY(0) !important;
        }
      `}</style>
    </button>
  );
};

/**
 * SketchyLink - A hand-drawn link with sketchy underline on hover
 */
export const SketchyLink = ({
  children,
  href,
  color = '#2C2C2C',
  underlineColor = '#C4956A',
  external = false,
  className = '',
  style = {},
  ...props
}) => {
  const linkRef = useRef(null);
  const svgRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const svg = svgRef.current;
    if (!svg) return;

    while (svg.firstChild) {
      svg.removeChild(svg.firstChild);
    }

    if (!linkRef.current || !isHovered) return;

    let cancelled = false;
    let container = null;

    getRough().then(rough => {
      if (cancelled || !svg) return;

      const rc = rough.svg(svg);
      const width = linkRef.current.offsetWidth;
      const height = linkRef.current.offsetHeight;

      const underline = rc.line(0, height + 2, width, height + 2, {
        roughness: 0.8,
        stroke: underlineColor,
        strokeWidth: 2,
        bowing: 0.3,
      });

      container = document.createElementNS('http://www.w3.org/2000/svg', 'g');
      container.appendChild(underline);
      svg.appendChild(container);

      const paths = svg.querySelectorAll('path');
      paths.forEach(path => {
        const length = path.getTotalLength();
        path.style.strokeDasharray = length;
        path.style.strokeDashoffset = length;
        path.style.animation = 'sketchyUnderlineDraw 0.3s ease forwards';
      });
    });

    return () => {
      cancelled = true;
      if (svg && container && container.parentNode === svg) {
        svg.removeChild(container);
      }
    };
  }, [isHovered, underlineColor]);

  const linkProps = external
    ? { target: '_blank', rel: 'noopener noreferrer' }
    : {};

  return (
    <a
      ref={linkRef}
      href={href}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`sketchy-link ${className}`}
      style={{
        position: 'relative',
        display: 'inline-block',
        color,
        textDecoration: 'none',
        cursor: 'pointer',
        ...style,
      }}
      {...linkProps}
      {...props}
    >
      {children}
      <svg
        ref={svgRef}
        style={{
          position: 'absolute',
          bottom: -4,
          left: 0,
          width: '100%',
          height: '20px',
          pointerEvents: 'none',
          overflow: 'visible',
        }}
      />
      <style>{`
        @keyframes sketchyUnderlineDraw {
          to {
            stroke-dashoffset: 0;
          }
        }
      `}</style>
    </a>
  );
};

export default SketchyButton;
