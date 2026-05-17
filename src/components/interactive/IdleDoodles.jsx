"use client";

import React, { useEffect, useRef, useState, useCallback } from 'react';
import { getRough } from '@/lib/rough';




/**
 * IdleDoodles - Margin doodles that appear when user is idle
 *
 * After a few seconds of no mouse movement, small hand-drawn doodles
 * (spirals, stars, hearts, question marks) slowly appear in the margins,
 * like your hand doodling while your mind wanders.
 */

// Doodle drawing functions using rough.js
const doodleDrawers = {
  spiral: (rc, x, y, size) => {
    const points = [];
    for (let i = 0; i < 3 * Math.PI; i += 0.3) {
      const r = (i / (3 * Math.PI)) * size;
      points.push([x + r * Math.cos(i), y + r * Math.sin(i)]);
    }
    return rc.curve(points, {
      roughness: 1.5,
      stroke: '#718093',
      strokeWidth: 1.2,
    });
  },

  star: (rc, x, y, size) => {
    const points = [];
    for (let i = 0; i < 5; i++) {
      const outerAngle = (i * 2 * Math.PI) / 5 - Math.PI / 2;
      const innerAngle = outerAngle + Math.PI / 5;
      points.push([
        x + size * Math.cos(outerAngle),
        y + size * Math.sin(outerAngle),
      ]);
      points.push([
        x + (size * 0.4) * Math.cos(innerAngle),
        y + (size * 0.4) * Math.sin(innerAngle),
      ]);
    }
    points.push(points[0]); // Close the shape
    return rc.polygon(points, {
      roughness: 1.5,
      stroke: '#E8A87C',
      strokeWidth: 1.2,
      fill: 'none',
    });
  },

  heart: (rc, x, y, size) => {
    const s = size * 0.5;
    const path = `M ${x} ${y + s * 0.3}
      C ${x} ${y - s * 0.5}, ${x - s} ${y - s * 0.5}, ${x - s} ${y + s * 0.2}
      C ${x - s} ${y + s * 0.8}, ${x} ${y + s * 1.2}, ${x} ${y + s * 1.2}
      C ${x} ${y + s * 1.2}, ${x + s} ${y + s * 0.8}, ${x + s} ${y + s * 0.2}
      C ${x + s} ${y - s * 0.5}, ${x} ${y - s * 0.5}, ${x} ${y + s * 0.3}`;
    return rc.path(path, {
      roughness: 1.5,
      stroke: '#CD6853',
      strokeWidth: 1.2,
      fill: 'none',
    });
  },

  questionMark: (rc, x, y, size) => {
    const elements = [];
    // The curved part
    const curvePath = `M ${x - size * 0.3} ${y - size * 0.5}
      Q ${x - size * 0.3} ${y - size}, ${x} ${y - size}
      Q ${x + size * 0.5} ${y - size}, ${x + size * 0.5} ${y - size * 0.5}
      Q ${x + size * 0.5} ${y}, ${x} ${y}
      L ${x} ${y + size * 0.3}`;
    elements.push(rc.path(curvePath, {
      roughness: 1.5,
      stroke: '#8B7EB8',
      strokeWidth: 1.5,
    }));
    // The dot
    elements.push(rc.circle(x, y + size * 0.7, size * 0.15, {
      roughness: 1,
      stroke: '#8B7EB8',
      strokeWidth: 1,
      fill: '#8B7EB8',
      fillStyle: 'solid',
    }));
    return elements;
  },

  squiggle: (rc, x, y, size) => {
    const points = [];
    for (let i = 0; i < 4; i++) {
      const px = x + (i * size) / 3;
      const py = y + Math.sin(i * Math.PI) * (size * 0.3);
      points.push([px, py]);
    }
    return rc.curve(points, {
      roughness: 2,
      stroke: '#7A9E7E',
      strokeWidth: 1.2,
    });
  },

  arrow: (rc, x, y, size) => {
    const elements = [];
    // Main line
    elements.push(rc.line(x, y, x + size, y - size * 0.5, {
      roughness: 1.5,
      stroke: '#718093',
      strokeWidth: 1.2,
    }));
    // Arrow head
    elements.push(rc.line(x + size, y - size * 0.5, x + size * 0.7, y - size * 0.3, {
      roughness: 1.5,
      stroke: '#718093',
      strokeWidth: 1.2,
    }));
    elements.push(rc.line(x + size, y - size * 0.5, x + size * 0.8, y - size * 0.8, {
      roughness: 1.5,
      stroke: '#718093',
      strokeWidth: 1.2,
    }));
    return elements;
  },
};

const doodleTypes = Object.keys(doodleDrawers);

const IdleDoodles = ({
  idleTime = 5000,      // Time before doodles start appearing (ms)
  maxDoodles = 4,        // Maximum number of doodles on screen
  doodleLifetime = 12000, // How long each doodle stays (ms)
  marginWidth = 80,      // Width of margin area for doodles
}) => {
  const containerRef = useRef(null);
  const [doodles, setDoodles] = useState([]);
  const [isIdle, setIsIdle] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const idleTimerRef = useRef(null);
  const doodleIntervalRef = useRef(null);

  // Check for mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Reset idle timer on any activity
  const resetIdleTimer = useCallback(() => {
    setIsIdle(false);

    if (idleTimerRef.current) {
      clearTimeout(idleTimerRef.current);
    }

    idleTimerRef.current = setTimeout(() => {
      setIsIdle(true);
    }, idleTime);
  }, [idleTime]);

  // Set up activity listeners
  useEffect(() => {
    if (isMobile) return;

    const events = ['mousemove', 'mousedown', 'keydown', 'scroll', 'touchstart'];
    events.forEach(event => {
      window.addEventListener(event, resetIdleTimer, { passive: true });
    });

    // Start the initial idle timer
    resetIdleTimer();

    return () => {
      events.forEach(event => {
        window.removeEventListener(event, resetIdleTimer);
      });
      if (idleTimerRef.current) {
        clearTimeout(idleTimerRef.current);
      }
    };
  }, [resetIdleTimer, isMobile]);

  // Add doodles when idle
  useEffect(() => {
    if (isMobile) return;

    if (isIdle && doodles.length < maxDoodles) {
      const addDoodle = () => {
        if (doodles.length >= maxDoodles) return;

        const viewportHeight = window.innerHeight;
        const viewportWidth = window.innerWidth;

        // Random position in left or right margin
        const isLeft = Math.random() > 0.5;
        const x = isLeft
          ? Math.random() * marginWidth + 20
          : viewportWidth - marginWidth - 20 + Math.random() * marginWidth;
        const y = Math.random() * (viewportHeight - 200) + 100;

        const newDoodle = {
          id: Date.now() + Math.random(),
          type: doodleTypes[Math.floor(Math.random() * doodleTypes.length)],
          x,
          y,
          size: 15 + Math.random() * 15,
          rotation: (Math.random() - 0.5) * 30,
          timestamp: Date.now(),
        };

        setDoodles(prev => [...prev, newDoodle]);
      };

      // Add first doodle after a short delay
      const timeout = setTimeout(addDoodle, 1000);

      // Then add more periodically
      doodleIntervalRef.current = setInterval(() => {
        addDoodle();
      }, 3000);

      return () => {
        clearTimeout(timeout);
        if (doodleIntervalRef.current) {
          clearInterval(doodleIntervalRef.current);
        }
      };
    } else {
      if (doodleIntervalRef.current) {
        clearInterval(doodleIntervalRef.current);
      }
    }
  }, [isIdle, doodles.length, maxDoodles, marginWidth, isMobile]);

  // Remove old doodles
  useEffect(() => {
    const cleanup = setInterval(() => {
      const now = Date.now();
      setDoodles(prev =>
        prev.filter(doodle => now - doodle.timestamp < doodleLifetime)
      );
    }, 1000);

    return () => clearInterval(cleanup);
  }, [doodleLifetime]);

  if (isMobile) return null;

  return (
    <div
      ref={containerRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 1,
        overflow: 'hidden',
      }}
      aria-hidden="true"
    >
      {doodles.map(doodle => (
        <Doodle
          key={doodle.id}
          {...doodle}
          doodleLifetime={doodleLifetime}
        />
      ))}
    </div>
  );
};

// Individual doodle component
const Doodle = ({ type, x, y, size, rotation, timestamp, doodleLifetime }) => {
  const svgRef = useRef(null);
  const [opacity, setOpacity] = useState(0);

  useEffect(() => {
    const svg = svgRef.current;
    if (!svg) return;

    let cancelled = false;
    let fadeIn, fadeOut;

    getRough().then(rough => {
      if (cancelled || !svg) return;

      const rc = rough.svg(svg);
      const drawer = doodleDrawers[type];
      if (!drawer) return;

      while (svg.firstChild) {
        svg.removeChild(svg.firstChild);
      }

      const result = drawer(rc, size + 10, size + 10, size);
      if (Array.isArray(result)) {
        result.forEach(el => svg.appendChild(el));
      } else {
        svg.appendChild(result);
      }

      fadeIn = setTimeout(() => setOpacity(1), 50);
      fadeOut = setTimeout(() => setOpacity(0), doodleLifetime - 1000);
    });

    return () => {
      cancelled = true;
      clearTimeout(fadeIn);
      clearTimeout(fadeOut);
    };
  }, [type, size, doodleLifetime]);

  const age = Date.now() - timestamp;
  const progress = age / doodleLifetime;
  const currentOpacity = opacity * (progress > 0.8 ? (1 - progress) * 5 : 1);

  return (
    <svg
      ref={svgRef}
      width={size * 2 + 20}
      height={size * 2 + 20}
      style={{
        position: 'absolute',
        left: x - size - 10,
        top: y - size - 10,
        transform: `rotate(${rotation}deg)`,
        opacity: currentOpacity,
        transition: 'opacity 1s ease',
        overflow: 'visible',
      }}
    />
  );
};

export default IdleDoodles;
