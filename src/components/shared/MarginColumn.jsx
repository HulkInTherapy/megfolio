import React from 'react';
import { IllustrationPaths } from '../../assets/illustrations';

/**
 * MarginColumn - Sidebar with margin notes and decorations
 * Appears on the right side of content for annotations
 */
const MarginColumn = ({
  notes = [],
  insight = null,
  relatedLinks = [],
  showCoffeeStain = true,
  showPushPin = false
}) => {
  return (
    <aside className="margin-column">
      {/* Margin notes */}
      {notes.map((note, index) => (
        <div
          key={note.id || index}
          className="margin-note-item handwritten-sm"
          style={{ '--delay': `${index * 0.1}s` }}
        >
          <span className="note-marker">*</span>
          <span className="note-content">{note.content}</span>
        </div>
      ))}

      {/* Coffee stain decoration */}
      {showCoffeeStain && (
        <img
          src={IllustrationPaths.coffeeRingStain}
          alt=""
          aria-hidden="true"
          className="margin-coffee-stain"
        />
      )}

      {/* Key insight box */}
      {insight && (
        <div className="insight-box">
          {showPushPin && (
            <img
              src={IllustrationPaths.pushPin}
              alt=""
              aria-hidden="true"
              className="insight-pin"
            />
          )}
          <p className="insight-label handwritten-sm">key insight:</p>
          <p className="insight-text handwritten">"{insight}"</p>
        </div>
      )}

      {/* Related links */}
      {relatedLinks.length > 0 && (
        <div className="related-section">
          <p className="related-label handwritten-sm">related thoughts:</p>
          {relatedLinks.map((link, index) => (
            <a
              key={index}
              href={link.href}
              className="related-link handwritten-sm"
            >
              → {link.title}
            </a>
          ))}
        </div>
      )}

      <style>{`
        .margin-column {
          position: relative;
          padding: 20px;
          padding-left: 24px;
          border-left: 2px dashed var(--pencil);
          opacity: 0.9;
        }

        .margin-note-item {
          display: flex;
          gap: 8px;
          margin-bottom: 20px;
          color: var(--pencil);
          font-style: italic;
          transform: rotate(-1deg);
          animation: fadeIn 0.5s ease-out backwards;
          animation-delay: var(--delay);
        }

        @keyframes fadeIn {
          from { opacity: 0; transform: translateX(10px) rotate(-1deg); }
          to { opacity: 1; transform: translateX(0) rotate(-1deg); }
        }

        .note-marker {
          color: var(--spark);
          font-weight: bold;
        }

        .note-content {
          line-height: 1.5;
        }

        .margin-coffee-stain {
          position: absolute;
          right: 0;
          top: 40%;
          width: 70px;
          opacity: 0.4;
          pointer-events: none;
          transform: rotate(15deg);
        }

        .insight-box {
          position: relative;
          margin-top: 32px;
          padding: 16px;
          background: var(--paper-aged);
          border-radius: 4px;
          transform: rotate(0.5deg);
        }

        .insight-pin {
          position: absolute;
          top: -12px;
          left: 50%;
          transform: translateX(-50%);
          width: 24px;
          z-index: 1;
        }

        .insight-label {
          color: var(--ink-faded);
          margin-bottom: 8px;
          text-transform: lowercase;
        }

        .insight-text {
          color: var(--ink);
          font-size: 1.1rem;
          line-height: 1.6;
        }

        .related-section {
          margin-top: 32px;
        }

        .related-label {
          color: var(--ink-faded);
          margin-bottom: 12px;
        }

        .related-link {
          display: block;
          color: var(--calm);
          text-decoration: none;
          margin-bottom: 8px;
          transition: color 0.2s ease, transform 0.2s ease;
        }

        .related-link:hover {
          color: var(--spark);
          transform: translateX(4px);
        }

        @media (max-width: 768px) {
          .margin-column {
            border-left: none;
            border-top: 2px dashed var(--pencil);
            padding-left: 0;
            padding-top: 24px;
            margin-top: 32px;
          }

          .margin-coffee-stain {
            top: 20px;
            right: 10px;
          }
        }
      `}</style>
    </aside>
  );
};

export default MarginColumn;
