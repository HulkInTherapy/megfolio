import React from 'react';
import { CoffeeCupIcon } from '../doodles';

/**
 * ReadingTime - Coffee cup reading time indicator
 * Shows how many cups of coffee you'll need to read this
 */
const ReadingTime = ({ cups = 3, readTime = '5 min' }) => {
  return (
    <div className="reading-time">
      <div className="coffee-cups">
        {Array.from({ length: cups }).map((_, i) => (
          <span key={i} className="coffee-cup">
            <CoffeeCupIcon size={18} />
          </span>
        ))}
      </div>
      <span className="time-text handwritten-sm">
        {readTime} read
      </span>
      <span className="coffee-note handwritten-sm">
        (you'll need this much coffee)
      </span>

      <style>{`
        .reading-time {
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          gap: 12px;
          margin: 16px 0;
        }

        .coffee-cups {
          display: flex;
          gap: 4px;
        }

        .coffee-cup {
          font-size: 1.2rem;
          animation: steam 2s ease-in-out infinite;
        }

        @keyframes steam {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-2px); }
        }

        .time-text {
          color: var(--ink);
          font-size: 1.1rem;
        }

        .coffee-note {
          color: var(--pencil);
          font-style: italic;
        }

        @media (max-width: 480px) {
          .reading-time {
            flex-direction: column;
            align-items: flex-start;
            gap: 8px;
          }
        }
      `}</style>
    </div>
  );
};

export default ReadingTime;
