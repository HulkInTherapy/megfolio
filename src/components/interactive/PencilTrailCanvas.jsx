"use client";

import React, { useEffect, useRef, useState, useContext, useMemo } from 'react';
import ArtSuppliesContext from './ArtSuppliesContext';

const DEFAULT_TOOL = { id: 'pencil', lineWidth: 1.5, opacity: 0.15, fadeTime: 4000, roughness: 1.2 };

const PencilTrailCanvas = ({
  opacity = 0.15,
  fadeTime = 4000,
  strokeColor = '#718093',
  maxPoints = 100,
}) => {
  const canvasRef = useRef(null);
  const pointsRef = useRef([]);
  const animationRef = useRef(null);
  const lastPosRef = useRef({ x: null, y: null, time: null });
  const pendingMouseRef = useRef(null);
  const rafThrottleRef = useRef(false);
  const [isMobile, setIsMobile] = useState(false);

  const context = useContext(ArtSuppliesContext);
  const currentTool = useMemo(
    () => context?.currentTool || DEFAULT_TOOL,
    [context?.currentTool]
  );
  const currentColor = useMemo(
    () => context?.currentColor || { hex: strokeColor },
    [context?.currentColor, strokeColor]
  );

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768 || 'ontouchstart' in window);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile, { passive: true });
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    if (isMobile) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas, { passive: true });

    const scheduleFrame = () => {
      if (animationRef.current) return;
      animationRef.current = requestAnimationFrame(animate);
    };

    const processMouseMove = () => {
      rafThrottleRef.current = false;
      const e = pendingMouseRef.current;
      if (!e) return;
      pendingMouseRef.current = null;

      const x = e.clientX;
      const y = e.clientY;
      const now = Date.now();
      const last = lastPosRef.current;

      if (last.x !== null && last.y !== null) {
        const dx = x - last.x;
        const dy = y - last.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const timeDelta = now - (last.time || now);
        const velocity = timeDelta > 0 ? dist / timeDelta : 0;

        if (dist > 5) {
          const angle = Math.atan2(dy, dx);

          pointsRef.current.push({
            x1: last.x,
            y1: last.y,
            x2: x,
            y2: y,
            timestamp: now,
            velocity,
            angle,
            tool: currentTool.id,
            color: currentColor.hex,
            toolConfig: { ...currentTool },
            offset: (Math.random() - 0.5) * 2,
            seed: Math.random(),
          });

          if (pointsRef.current.length > maxPoints) {
            pointsRef.current.shift();
          }

          scheduleFrame();
        }
      }

      lastPosRef.current = { x, y, time: now };
    };

    const handleMouseMove = (e) => {
      pendingMouseRef.current = e;
      if (!rafThrottleRef.current) {
        rafThrottleRef.current = true;
        requestAnimationFrame(processMouseMove);
      }
    };

    const drawPencil = (ctx, point, pointOpacity) => {
      ctx.strokeStyle = point.color;
      ctx.globalAlpha = pointOpacity;
      ctx.lineWidth = 1.5;
      ctx.lineCap = 'round';

      const wobble1 = Math.sin(point.timestamp * 0.01) * point.offset;
      const wobble2 = Math.cos(point.timestamp * 0.01) * point.offset;

      ctx.beginPath();
      ctx.moveTo(point.x1 + wobble1, point.y1 + wobble2);
      ctx.lineTo(point.x2 - wobble1, point.y2 - wobble2);
      ctx.stroke();
    };

    const drawMarker = (ctx, point, pointOpacity) => {
      const config = point.toolConfig;
      const baseWidth = config.lineWidth || 12;
      const angleEffect = Math.abs(Math.cos(point.angle));
      const width = baseWidth * (0.4 + angleEffect * 0.6);

      ctx.strokeStyle = point.color;
      ctx.globalAlpha = pointOpacity * 0.5;
      ctx.lineWidth = width;
      ctx.lineCap = 'square';
      ctx.lineJoin = 'miter';

      ctx.beginPath();
      ctx.moveTo(point.x1, point.y1);
      ctx.lineTo(point.x2, point.y2);
      ctx.stroke();

      ctx.globalAlpha = pointOpacity * 0.15;
      ctx.lineWidth = width * 0.8;
      ctx.stroke();
    };

    const drawWatercolor = (ctx, point, pointOpacity) => {
      const config = point.toolConfig;
      const baseWidth = config.lineWidth || 20;
      const bleedFactor = Math.max(0.7, 1.2 - point.velocity * 3);
      const width = baseWidth * bleedFactor;

      ctx.strokeStyle = point.color;
      ctx.lineCap = 'round';

      const layers = [
        { widthMul: 1.8, alpha: 0.1 },
        { widthMul: 1.4, alpha: 0.15 },
        { widthMul: 1.0, alpha: 0.25 },
        { widthMul: 0.6, alpha: 0.35 },
      ];

      for (const layer of layers) {
        ctx.globalAlpha = pointOpacity * layer.alpha;
        ctx.lineWidth = width * layer.widthMul;
        ctx.beginPath();
        ctx.moveTo(point.x1, point.y1);
        ctx.lineTo(point.x2, point.y2);
        ctx.stroke();
      }
    };

    const drawCrayon = (ctx, point, pointOpacity) => {
      const config = point.toolConfig;
      const baseWidth = config.lineWidth || 10;

      ctx.strokeStyle = point.color;
      ctx.lineCap = 'round';

      const dx = point.x2 - point.x1;
      const dy = point.y2 - point.y1;
      const dist = Math.sqrt(dx * dx + dy * dy);

      if (dist < 0.1) return;

      const perpX = -dy / dist;
      const perpY = dx / dist;

      const numStrokes = 3;
      const spread = baseWidth * 0.6;

      for (let s = 0; s < numStrokes; s++) {
        const offset = (s - (numStrokes - 1) / 2) * (spread / numStrokes);
        const ox = perpX * offset;
        const oy = perpY * offset;

        const steps = Math.max(1, Math.floor(dist / 3));

        for (let i = 0; i < steps; i++) {
          if (Math.random() < 0.3) continue;

          const t = i / steps;
          const x = point.x1 + dx * t + ox;
          const y = point.y1 + dy * t + oy;

          const jitterX = (Math.random() - 0.5) * 2;
          const jitterY = (Math.random() - 0.5) * 2;

          ctx.globalAlpha = pointOpacity * (0.3 + Math.random() * 0.5);
          ctx.lineWidth = 2 + Math.random() * 2;

          ctx.beginPath();
          ctx.moveTo(x + jitterX, y + jitterY);
          ctx.lineTo(x + jitterX + 1.5, y + jitterY + 1.5);
          ctx.stroke();
        }
      }

      if (Math.random() > 0.7) {
        ctx.globalAlpha = pointOpacity * 0.6;
        ctx.lineWidth = baseWidth * 0.4;
        ctx.beginPath();
        ctx.moveTo(point.x1, point.y1);
        ctx.lineTo(point.x2, point.y2);
        ctx.stroke();
      }
    };

    const animate = () => {
      animationRef.current = null;
      const now = Date.now();

      if (pointsRef.current.length === 0) return;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      pointsRef.current = pointsRef.current.filter(point => {
        const config = point.toolConfig;
        const toolFadeTime = config.fadeTime || fadeTime;
        const age = now - point.timestamp;

        if (age > toolFadeTime) return false;

        const baseOpacity = config.opacity || opacity;
        const pointOpacity = baseOpacity * (1 - age / toolFadeTime);

        switch (point.tool) {
          case 'marker':
            drawMarker(ctx, point, pointOpacity);
            break;
          case 'watercolor':
            drawWatercolor(ctx, point, pointOpacity);
            break;
          case 'crayon':
            drawCrayon(ctx, point, pointOpacity);
            break;
          case 'pencil':
          default:
            drawPencil(ctx, point, pointOpacity);
            break;
        }

        return true;
      });

      ctx.globalAlpha = 1;

      if (pointsRef.current.length > 0) {
        scheduleFrame();
      }
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('mousemove', handleMouseMove);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isMobile, opacity, fadeTime, strokeColor, maxPoints, currentTool, currentColor.hex]);

  if (isMobile) return null;

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 0,
      }}
      aria-hidden="true"
    />
  );
};

export default PencilTrailCanvas;
