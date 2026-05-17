"use client";

import React from 'react';
import { useArtSupplies } from './ArtSuppliesContext';

/**
 * ToolToast - Bottom-center notification for tool/color changes
 */
const ToolToast = () => {
  const { toast } = useArtSupplies();

  if (!toast) return null;

  return (
    <div
      style={{
        position: 'fixed',
        bottom: '80px',
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: 9999,
        padding: '12px 24px',
        background: 'var(--paper)',
        border: '2px solid var(--pencil)',
        borderRadius: '20px',
        boxShadow: '0 4px 16px rgba(0,0,0,0.15)',
        fontFamily: 'var(--font-handwritten)',
        fontSize: '1rem',
        color: 'var(--ink)',
        whiteSpace: 'nowrap',
        animation: 'toastIn 0.3s ease, toastOut 0.3s ease 1.7s forwards',
        pointerEvents: 'none',
      }}
    >
      {toast}

      <style>{`
        @keyframes toastIn {
          from {
            opacity: 0;
            transform: translateX(-50%) translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateX(-50%) translateY(0);
          }
        }

        @keyframes toastOut {
          from {
            opacity: 1;
            transform: translateX(-50%) translateY(0);
          }
          to {
            opacity: 0;
            transform: translateX(-50%) translateY(-10px);
          }
        }
      `}</style>
    </div>
  );
};

export default ToolToast;
