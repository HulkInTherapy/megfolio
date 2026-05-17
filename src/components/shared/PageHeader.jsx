"use client";

import React from 'react';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

/**
 * PageHeader - Reusable header for detail pages
 * Includes back navigation and page number in Living Sketchbook style
 */
const PageHeader = ({
  backTo = "/",
  backText = "back to notebook",
  pageNumber = null
}) => {
  return (
    <div className="page-header">
      <Link href={backTo} className="back-link handwritten">
        <ArrowLeft size={18} />
        <span>← {backText}</span>
      </Link>

      {pageNumber && (
        <span className="page-number handwritten-sm">
          pg. {String(pageNumber).padStart(2, '0')}
        </span>
      )}

      <style>{`
        .page-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 20px 0;
          margin-bottom: 24px;
        }

        .back-link {
          display: flex;
          align-items: center;
          gap: 8px;
          color: var(--pencil);
          font-size: 1.1rem;
          text-decoration: none;
          transition: color 0.2s ease, transform 0.2s ease;
        }

        .back-link:hover {
          color: var(--ink);
          transform: translateX(-4px);
        }

        .back-link svg {
          opacity: 0;
          transition: opacity 0.2s ease;
        }

        .back-link:hover svg {
          opacity: 1;
        }

        .page-number {
          color: var(--pencil);
          font-style: italic;
        }
      `}</style>
    </div>
  );
};

export default PageHeader;
