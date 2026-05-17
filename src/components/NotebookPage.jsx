import React, { useRef } from 'react';
import { useInViewport } from '../hooks/useScrollProgress';
import { useImperfectStyle } from '../hooks/useRandomRotation';

/**
 * NotebookPage - Wrapper component for consistent notebook-style layout
 * Each section of the site should be wrapped in this component
 *
 * Features:
 * - Consistent 900px max-width centered content
 * - Optional page number
 * - Optional margin notes
 * - Slight imperfections for hand-drawn feel
 * - Scroll-triggered reveal animation
 */
const NotebookPage = ({
  children,
  pageNumber,
  id,
  className = '',
  marginNotes = [],
  showDivider = false,
  paperVariant = 'default', // 'morning', 'afternoon', 'evening', 'default'
  style = {},
}) => {
  const pageRef = useRef(null);
  const { isInView, hasBeenInView } = useInViewport(pageRef, { threshold: 0.1 });

  // Get slight imperfection for this page
  const pageStyle = useImperfectStyle(id || pageNumber || 'page', {
    includeRotation: false, // We don't rotate the whole page
    subtle: true,
  });

  // Paper variant background
  const getPaperBg = () => {
    switch (paperVariant) {
      case 'morning':
        return 'var(--paper-morning)';
      case 'afternoon':
        return 'var(--paper-afternoon)';
      case 'evening':
        return 'var(--paper-evening)';
      default:
        return 'transparent';
    }
  };

  return (
    <>
      <section
        ref={pageRef}
        id={id}
        className={`notebook-page ${className} ${hasBeenInView ? 'revealed' : ''}`}
        data-page={pageNumber ? `pg. ${String(pageNumber).padStart(2, '0')}` : undefined}
        style={{
          ...style,
          backgroundColor: getPaperBg(),
          ...pageStyle,
        }}
      >
        {/* Left margin notes */}
        {marginNotes.filter(note => note.side === 'left').length > 0 && (
          <div className="margin-notes left">
            {marginNotes
              .filter(note => note.side === 'left')
              .map((note, i) => (
                <div
                  key={i}
                  className="margin-note-item"
                  style={{ top: note.top || `${20 + i * 80}px` }}
                >
                  {note.content}
                </div>
              ))}
          </div>
        )}

        {/* Main content */}
        <div className="notebook-page-content">
          {children}
        </div>

        {/* Right margin notes */}
        {marginNotes.filter(note => note.side === 'right').length > 0 && (
          <div className="margin-notes right">
            {marginNotes
              .filter(note => note.side === 'right')
              .map((note, i) => (
                <div
                  key={i}
                  className="margin-note-item"
                  style={{ top: note.top || `${20 + i * 80}px` }}
                >
                  {note.content}
                </div>
              ))}
          </div>
        )}
      </section>

      {/* Optional section divider */}
      {showDivider && <div className="section-divider" />}

      <style>{`
        .notebook-page {
          max-width: var(--content-max, 900px);
          margin: 0 auto;
          padding: 80px var(--container-padding, 80px);
          position: relative;
          opacity: 0;
          transform: translateY(20px);
          transition: opacity 0.6s ease, transform 0.6s ease;
        }

        .notebook-page.revealed {
          opacity: 1;
          transform: translateY(0);
        }

        .notebook-page-content {
          position: relative;
          z-index: 1;
        }

        /* Page number positioning */
        .notebook-page[data-page]::before {
          content: attr(data-page);
          position: absolute;
          top: 30px;
          left: 30px;
          font-family: 'Caveat', cursive;
          font-size: 0.9rem;
          color: var(--pencil);
          opacity: 0.5;
          transform: rotate(-2deg);
        }

        /* Decorative corner fold */
        .notebook-page::after {
          content: '';
          position: absolute;
          top: 0;
          right: 0;
          width: 0;
          height: 0;
          border-style: solid;
          border-width: 0 30px 30px 0;
          border-color: transparent var(--paper-evening) transparent transparent;
          opacity: 0.3;
        }

        /* Revealed state animations */
        .notebook-page.revealed .margin-note-item {
          animation: note-fade-in 0.5s ease forwards;
          animation-delay: 0.3s;
          opacity: 0;
        }

        @keyframes note-fade-in {
          from {
            opacity: 0;
            transform: translateX(-10px) rotate(-5deg);
          }
          to {
            opacity: 1;
            transform: translateX(0) rotate(-3deg);
          }
        }

        /* Responsive adjustments */
        @media (max-width: 1200px) {
          .margin-notes {
            display: none;
          }
        }

        @media (max-width: 768px) {
          .notebook-page {
            padding: 60px var(--container-padding, 24px);
          }

          .notebook-page[data-page]::before {
            top: 20px;
            left: 20px;
            font-size: 0.8rem;
          }

          .notebook-page::after {
            border-width: 0 20px 20px 0;
          }
        }
      `}</style>
    </>
  );
};

/**
 * PageSpread - Two-page layout for projects and detailed content
 */
export const PageSpread = ({
  leftContent,
  rightContent,
  pageNumbers = [null, null],
  id,
  className = '',
}) => {
  const spreadRef = useRef(null);
  const { hasBeenInView } = useInViewport(spreadRef, { threshold: 0.1 });

  return (
    <div
      ref={spreadRef}
      id={id}
      className={`page-spread ${className} ${hasBeenInView ? 'revealed' : ''}`}
    >
      <div className="page-spread-left" data-page={pageNumbers[0] ? `pg. ${String(pageNumbers[0]).padStart(2, '0')}` : undefined}>
        {leftContent}
      </div>
      <div className="page-spread-binding" />
      <div className="page-spread-right" data-page={pageNumbers[1] ? `pg. ${String(pageNumbers[1]).padStart(2, '0')}` : undefined}>
        {rightContent}
      </div>

      <style>{`
        .page-spread {
          display: grid;
          grid-template-columns: 1fr 20px 1fr;
          max-width: 1200px;
          margin: 60px auto;
          padding: 0 40px;
          opacity: 0;
          transition: opacity 0.6s ease;
        }

        .page-spread.revealed {
          opacity: 1;
        }

        .page-spread-left,
        .page-spread-right {
          position: relative;
          padding: 40px;
          background: var(--paper);
          min-height: 400px;
        }

        .page-spread-left {
          border-radius: 4px 0 0 4px;
          box-shadow: -4px 0 8px rgba(0, 0, 0, 0.05);
        }

        .page-spread-right {
          border-radius: 0 4px 4px 0;
          box-shadow: 4px 0 8px rgba(0, 0, 0, 0.05);
        }

        .page-spread-left[data-page]::before,
        .page-spread-right[data-page]::before {
          content: attr(data-page);
          position: absolute;
          bottom: 20px;
          font-family: 'Caveat', cursive;
          font-size: 0.85rem;
          color: var(--pencil);
          opacity: 0.5;
        }

        .page-spread-left[data-page]::before {
          left: 20px;
        }

        .page-spread-right[data-page]::before {
          right: 20px;
        }

        .page-spread-binding {
          background: linear-gradient(
            to right,
            var(--paper-evening),
            var(--ink-faded) 40%,
            var(--ink-faded) 60%,
            var(--paper-evening)
          );
          position: relative;
        }

        /* Binding "holes" */
        .page-spread-binding::before {
          content: '';
          position: absolute;
          top: 20%;
          left: 50%;
          transform: translateX(-50%);
          width: 8px;
          height: 60%;
          background: repeating-linear-gradient(
            to bottom,
            var(--ink) 0px,
            var(--ink) 6px,
            transparent 6px,
            transparent 30px
          );
          border-radius: 2px;
        }

        @media (max-width: 900px) {
          .page-spread {
            grid-template-columns: 1fr;
            gap: 20px;
          }

          .page-spread-binding {
            display: none;
          }

          .page-spread-left,
          .page-spread-right {
            border-radius: 4px;
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
          }
        }
      `}</style>
    </div>
  );
};

export default NotebookPage;
