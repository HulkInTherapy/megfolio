"use client";

import React, { useEffect, useState } from 'react';
import { useArtSupplies } from './ArtSuppliesContext';

/**
 * ToolBadge - Floating corner indicator showing current tool and color
 */
const ToolBadge = () => {
  const { currentTool, currentColor } = useArtSupplies();
  const [isAnimating, setIsAnimating] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Tool icons
  const toolIcons = {
    pencil: '✏️',
    marker: '🖊️',
    watercolor: '🎨',
    crayon: '🖍️',
  };

  // Check for mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Animate on tool/color change
  useEffect(() => {
    setIsAnimating(true);
    const timer = setTimeout(() => setIsAnimating(false), 300);
    return () => clearTimeout(timer);
  }, [currentTool.id, currentColor.id]);

  return (
    <div
      style={{
        position: 'fixed',
        top: isMobile ? 'auto' : '20px',
        bottom: isMobile ? '20px' : 'auto',
        left: '20px',
        zIndex: 9998,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '4px',
        padding: '8px',
        background: 'var(--paper)',
        borderRadius: '12px',
        border: '2px solid var(--pencil)',
        boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
        transition: 'transform 0.3s ease',
        transform: isAnimating ? 'scale(1.1)' : 'scale(1)',
        pointerEvents: 'none',
      }}
    >
      {/* Tool icon */}
      <div
        style={{
          fontSize: '24px',
          lineHeight: 1,
          animation: isAnimating ? 'toolBob 0.3s ease' : 'none',
        }}
      >
        {toolIcons[currentTool.id]}
      </div>

      {/* Color dot */}
      <div
        style={{
          width: '16px',
          height: '16px',
          borderRadius: '50%',
          background: currentColor.hex,
          border: '2px solid var(--ink)',
          transition: 'background 0.3s ease',
        }}
      />

      {/* Hint text (only show initially) */}
      <div
        className="badge-hint"
        style={{
          fontSize: '10px',
          color: 'var(--pencil)',
          fontFamily: 'var(--font-handwritten)',
          marginTop: '4px',
          textAlign: 'center',
          maxWidth: '60px',
          lineHeight: 1.2,
        }}
      >
        hold to switch
      </div>

      <style>{`
        @keyframes toolBob {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-4px); }
        }

        .badge-hint {
          opacity: 1;
          animation: fadeHint 10s ease forwards;
        }

        @keyframes fadeHint {
          0%, 80% { opacity: 1; }
          100% { opacity: 0; }
        }
      `}</style>
    </div>
  );
};

export default ToolBadge;
