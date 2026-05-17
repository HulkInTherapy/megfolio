import React from 'react';

/**
 * TechTag - Sketchy tech stack tag with random rotation
 * Each tag looks hand-drawn and slightly tilted
 */
const TechTag = ({ children, index = 0, color = 'var(--ink)' }) => {
  // Deterministic rotation based on index
  const rotations = [-2.5, 1.5, -1, 2, -1.5, 1, -2, 0.5, 1.8, -0.8];
  const rotation = rotations[index % rotations.length];

  return (
    <span
      className="tech-tag handwritten"
      style={{
        '--rotation': `${rotation}deg`,
        '--tag-color': color
      }}
    >
      {children}

      <style>{`
        .tech-tag {
          display: inline-block;
          padding: 8px 16px;
          background: var(--paper);
          border: 2px solid var(--tag-color, var(--ink));
          border-radius: 4px 6px 5px 7px;
          font-size: 1rem;
          color: var(--ink);
          transform: rotate(var(--rotation, 0deg));
          transition: all 0.2s ease;
          cursor: default;
          position: relative;
        }

        .tech-tag::before {
          content: '';
          position: absolute;
          inset: -1px;
          border: 1px solid var(--tag-color, var(--ink));
          border-radius: 5px 4px 6px 5px;
          opacity: 0.3;
          transform: rotate(0.5deg);
          pointer-events: none;
        }

        .tech-tag:hover {
          transform: rotate(0deg) translateY(-2px);
          box-shadow: 2px 4px 8px rgba(0, 0, 0, 0.1);
          background: var(--paper-morning);
        }
      `}</style>
    </span>
  );
};

export default TechTag;
